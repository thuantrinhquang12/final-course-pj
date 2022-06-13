import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import './Table.scss'

const CommonTable = ({
  data,
  remove,
  columns,
  page,
  pagination,
  sorter,
  scroll,
  styleHead,
  styleBody,
  className,
}) => {
  const [dataSource, setDataSource] = useState(null)
  const [columnS, setColumnS] = useState(null)
  // console.log('data', data, columns)
  useEffect(() => {
    let dataValid = data
    let removeHeader = remove

    if (columns !== undefined) {
      const headerData = data && data.length > 0 ? Object.keys(data[0]) : []
      const headerColumns = columns.map((item) => {
        return item.dataIndex
      })
      const filterHeader = headerData.filter((item) => {
        return item !== 'key' && !headerColumns.includes(item)
      })
      removeHeader = [...removeHeader, ...filterHeader]
    }

    if (removeHeader && removeHeader.length > 0) {
      dataValid = dataValid.map((itemParent) => {
        removeHeader.map((itemChild) => {
          console.log('itemchild', itemChild)
          delete itemParent[itemChild]
          return itemChild
        })
        return itemParent
      })
    }
    const key = Object.keys(dataValid[0] ? dataValid[0] : {}).filter((item) => {
      return item !== 'key'
    })

    const column =
      columns !== undefined && columns.length !== 0
        ? columns.filter((item) => {
            return key.includes(item.key)
          })
        : key.map((item) => {
            return {
              title: item.toUpperCase(),
              key: item,
              dataIndex: item,
            }
          })

    if (sorter) {
      column.map((item) => {
        if (sorter[item.key] !== undefined) {
          switch (sorter[item.key]) {
            case 'string':
              item.sorter = (a, b) => {
                console.log(a.subject)
                return a[item.key].localeCompare(b[item.key])
              }
              break
            case 'number':
              item.sorter = (a, b) => {
                return Number(a[item.key]) - Number(b[item.key])
              }
              break
            case 'date':
              item.sorter = (a, b) => {
                const prevDate = new Date(a[item.key])
                const NowDate = new Date(b[item.key])
                return prevDate.getTime() - NowDate.getTime()
              }
              break
            default:
              throw new Error('Invalid Sorter!')
          }
        }
        return item
      })
    }

    if (styleHead) {
      column.map((item) => {
        if (styleHead[item.key]) {
          const position = styleHead[item.key].position
            ? styleHead[item.key].position
            : ''
          const className = styleHead[item.key].className
            ? styleHead[item.key].className
            : ''
          item.title = (
            <div className={`${position} ${className}`}>{item.title}</div>
          )
        }
        return item
      })
    }

    if (styleBody) {
      column.map((item) => {
        if (styleHead[item.key]) {
          item.render = (payload) => {
            const position = styleBody[item.key].position
              ? styleBody[item.key].position
              : ''
            const className = styleBody[item.key].className
              ? styleBody[item.key].className
              : ''
            item.title = (
              <div className={`${position} ${className}`}>{payload}</div>
            )
            return <div className={`${position} ${className}`}>{payload}</div>
          }
        }
        return item
      })
    }

    setColumnS(column)
    setDataSource(() => {
      return dataValid.map((item, index) => {
        return { ...item, key: index }
      })
    })
  }, [data, columns, remove, sorter, styleHead, styleBody])

  if ((data || []).length === 0) {
    return null
  }
  return (
    <>
      <Table
        className={className ? className : ''}
        pagination={
          pagination
            ? {
                ...pagination,
                position: ['bottomCenter'],
                pageSizeOptions: [10, 20, 50],
                showTotal: pagination.showTotal
                  ? pagination.showTotal
                  : (total) => `Total ${total} items`,
              }
            : {
                pageSize: page ? page : 10,
                position: ['bottomCenter'],
                pageSizeOptions: [10, 20, 50],
                showTotal: pagination?.showTotal
                  ? pagination?.showTotal
                  : (total) => `Total ${total} items`,
              }
        }
        columns={columnS}
        dataSource={dataSource}
        scroll={
          scroll
            ? scroll
            : {
                x: 1000,
                y: 200,
              }
        }
      />
    </>
  )
}

export default CommonTable

// import React, { useEffect, useState } from 'react'
// import { Table } from 'antd'
// import './Table.scss'

// const CommonTable = ({
//   data,
//   remove,
//   columns,
//   page,
//   pagination,
//   sorter,
//   scroll,
//   styleHead,
//   styleBody,
//   className,
// }) => {
//   const [dataSource, setDataSource] = useState(null)
//   const [columnS, setColumnS] = useState(null)
//   console.log('data', data, columns)
//   useEffect(() => {
//     let dataValid = data
//     let removeHeader = remove

//     if (columns !== undefined) {
//       const headerData = data && data.length > 0 ? Object.keys(data[0]) : []
//       const headerColumns = columns.map((item) => {
//         return item.dataIndex
//       })
//       const filterHeader = headerData.filter((item) => {
//         return item !== 'key' && !headerColumns.includes(item)
//       })
//       removeHeader = [...removeHeader, ...filterHeader]
//     }

//     if (removeHeader && removeHeader.length > 0) {
//       dataValid = dataValid.map((itemParent) => {
//         removeHeader.map((itemChild) => {
//           delete itemParent[itemChild]
//           return itemChild
//         })
//         return itemParent
//       })
//     }
//     const key = Object.keys(dataValid[0]).filter((item) => {
//       return item !== 'key'
//     })

//     const column =
//       columns !== undefined && columns.length !== 0
//         ? columns.filter((item) => {
//             return key.includes(item.key)
//           })
//         : key.map((item) => {
//             return {
//               title: item.toUpperCase(),
//               key: item,
//               dataIndex: item,
//             }
//           })

//     if (sorter) {
//       column.map((item) => {
//         if (sorter[item.key] !== undefined) {
//           switch (sorter[item.key]) {
//             case 'string':
//               item.sorter = (a, b) => {
//                 console.log(a.subject)
//                 return a[item.key].localeCompare(b[item.key])
//               }
//               break
//             case 'number':
//               item.sorter = (a, b) => {
//                 return Number(a[item.key]) - Number(b[item.key])
//               }
//               break
//             case 'date':
//               item.sorter = (a, b) => {
//                 const prevDate = new Date(a[item.key])
//                 const NowDate = new Date(b[item.key])
//                 return prevDate.getTime() - NowDate.getTime()
//               }
//               break
//             default:
//               throw new Error('Invalid Sorter!')
//           }
//         }
//         return item
//       })
//     }

//     if (styleHead) {
//       column.map((item) => {
//         if (styleHead[item.key]) {
//           const position = styleHead[item.key].position
//             ? styleHead[item.key].position
//             : ''
//           const className = styleHead[item.key].className
//             ? styleHead[item.key].className
//             : ''
//           item.title = (
//             <div className={`${position} ${className}`}>{item.title}</div>
//           )
//         }
//         return item
//       })
//     }

//     if (styleBody) {
//       column.map((item) => {
//         if (styleHead[item.key]) {
//           item.render = (payload) => {
//             const position = styleBody[item.key].position
//               ? styleBody[item.key].position
//               : ''
//             const className = styleBody[item.key].className
//               ? styleBody[item.key].className
//               : ''
//             item.title = (
//               <div className={`${position} ${className}`}>{payload}</div>
//             )
//             return <div className={`${position} ${className}`}>{payload}</div>
//           }
//         }
//         return item
//       })
//     }

//     setColumnS(column)
//     setDataSource(() => {
//       return dataValid.map((item, index) => {
//         return { ...item, key: index }
//       })
//     })
//   }, [data, columns, remove, sorter, styleHead, styleBody])

//   if ((data || []).length === 0) {
//     return null
//   }
//   return (
//     <>
//       <Table
//         className={className ? className : ''}
//         pagination={pagination ? pagination : { pageSize: page ? page : 10 }}
//         columns={columnS}
//         dataSource={dataSource}
//         scroll={
//           scroll
//             ? scroll
//             : {
//                 x: 1000,
//                 y: 200,
//               }
//         }
//       />
//     </>
//   )
// }

// export default CommonTable
