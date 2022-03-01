import { Suspense, useEffect, useState } from "react"
import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

import { Table, Thead, Tbody, Tfoot, Input, Icon, Tr, Th, Td, TableCaption } from "@chakra-ui/react"
import { MdEdit, MdDelete } from "react-icons/md"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  // const currentUser = useCurrentUser()
  const [search, setSearch] = useState("")
  const [data, setData] = useState([
    {
      id: 1,
      name: "Khong co anh",
      image: "khong co luon",
    },
    {
      id: 2,
      name: "Khong co em ",
      image: "khong co luon",
    },
    {
      id: 3,
      name: "Khong co chung ta",
      image: "khong co luon",
    },
  ])
  const handleSearchInput = () => {
    const dataAfterSearch = data.filter((d) => d.name.toLowerCase().includes(search))
    return dataAfterSearch
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  return (
    <>
      <Input
        variant="flushed"
        placeholder="Tìm kiếm thức thần"
        onChange={handleInput}
        value={search}
      />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Số thứ tự</Th>
            <Th>Tên thức thần</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            handleSearchInput().map((d, index) => (
              <Tr key={index}>
                <Td>{index}</Td>
                <Td>{d.name}</Td>
                <Td>
                  <Icon as={MdEdit} />
                  <Icon as={MdDelete} />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
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
