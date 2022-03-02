import { Suspense, useEffect, useState } from "react"
import { BlitzPage, usePaginatedQuery, useQuery, useRouter } from "blitz"
import Layout from "app/core/layouts/Layout"

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Input,
  Icon,
  Tr,
  Th,
  Td,
  TableCaption,
  useDisclosure,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react"
import { MdEdit, MdDelete } from "react-icons/md"
import DialogAdd from "../layouts/DialogAdd"
import getShikis from "app/shikis/queries/getShikis"
import getShiki from "app/shikis/queries/getShiki"
import DialogEdit from "../layouts/DialogEdit"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */
interface Shikigami {
  id: number
  name: string
  image: string
}
const UserInfo = () => {
  // const currentUser = useCurrentUser()
  const router = useRouter()
  const ITEMS_PER_PAGE = 10
  const page = Number(router.query.page) || 0
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState("")
  const [templateId, setTemplateId] = useState<number>(1)
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const [{ shikis, hasMore }] = usePaginatedQuery(getShikis, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const handleSearchInput = () => {
    const dataAfterSearch = shikis.filter((d) => d.name.toLowerCase().includes(search))
    return dataAfterSearch
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleClickEdit = (id: number) => {
    setTemplateId(id)
    setOpenEdit(true)
  }

  const resetDialog = () => {
    setOpenEdit(false)
  }
  return (
    <>
      <Input
        variant="flushed"
        placeholder="Tìm kiếm thức thần"
        onChange={handleInput}
        value={search}
      />
      <Flex>
        <Spacer />
        <Box>
          <DialogAdd isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </Box>
      </Flex>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Số thứ tự</Th>
            <Th>Tên thức thần</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {shikis &&
            handleSearchInput().map((d, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{d.name}</Td>
                <Td>
                  <Icon
                    as={MdEdit}
                    onClick={() => {
                      handleClickEdit(d.id)
                    }}
                  />
                  <Icon as={MdDelete} />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      <DialogEdit openEdit={openEdit} id={templateId} resetDialog={resetDialog} />
    </>
  )
}

const Dashboard: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

Dashboard.suppressFirstRenderFlicker = true
Dashboard.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Dashboard
