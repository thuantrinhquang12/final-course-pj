import { Table } from 'antd'
import React from 'react'
const { Column } = Table

const CommonTable = (props) => {
  const { handleCells, datas, keys } = props
  return (
    <Table dataSource={props}>
      {handleCells.map((handleCell) => (
        <Column title={handleCell.id} dataIndex={datas} key={keys}></Column>
      ))}
    </Table>
  )
}
export default CommonTable
