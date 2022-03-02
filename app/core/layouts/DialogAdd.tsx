import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { ShikiForm, FORM_ERROR } from "app/shikis/components/ShikiForm"
import createShiki from "app/shikis/mutations/createShiki"
import getShikis from "app/shikis/queries/getShikis"
import { invalidateQuery, useMutation, useRouter } from "blitz"
import React, { HtmlHTMLAttributes, useState } from "react"

interface DialogProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}
interface AddForm {
  name: string
  image: string
}
export default function DialogAdd({ isOpen, onOpen, onClose }: DialogProps) {
  //   const { isOpen, onOpen, onClose } = useDisclosure()
  const [formData, setFormData] = useState<AddForm>({
    name: "",
    image: "",
  })

  const [createShikiMutation] = useMutation(createShiki)

  const [file, setFile] = useState<any>(null)
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value })
  }
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setFormData({ ...formData, image: e.target.files[0]?.name as string })
    setFile(e.target.files[0])
  }

  const submitForm = async () => {
    try {
      await createShikiMutation(formData).then(() => {
        invalidateQuery(getShikis)
        setFormData({ name: "", image: "" })
        setFile(null)
        onClose()
      })
    } catch (error: any) {
      console.error(error)
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
    // console.log(formData)
    // console.log(file)
  }
  return (
    <>
      <Button onClick={onOpen}>Thêm thức thần</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thêm thức thần</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input
              variant="outline"
              placeholder="Tên thức thần"
              value={formData.name}
              onChange={handleInput}
            />

            <input
              className="inputfile"
              type="file"
              id="file"
              placeholder="Tên thức thần"
              onChange={handleFile}
            />
            <label htmlFor="file">Choose a file</label>

            {/* <ShikiForm
              submitText="Create Shiki"
              // TODO use a zod schema for form validation
              //  - Tip: extract mutation's schema into a shared `validations.ts` file and
              //         then import and use it here
              // schema={CreateShiki}
              // initialValues={{}}
              onSubmit={async (values) => {
                try {
                  const shiki = await createShikiMutation(values)
                  router.push(Routes.ShowShikiPage({ shikiId: shiki.id }))
                } catch (error: any) {
                  console.error(error)
                  return {
                    [FORM_ERROR]: error.toString(),
                  }
                }
              }}
            /> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitForm}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
function createShikiMutation(values: any) {
  throw new Error("Function not implemented.")
}
