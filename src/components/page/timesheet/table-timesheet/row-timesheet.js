const Table = antd.Table
const Button = antd.Button

class App extends React.Component {
  render() {
    const dataSource = [
      {
        email: 'sunil@gmail.com',
        active: true,
      },
      {
        email: 'anil@gmail.com',
        active: false,
      },
    ]
    const columns = [
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        align: 'center',
        render: (text, record, index) => (
          <div
            className="btn-wrap"
            style={{
              width: '200px',
            }}
          >
            {' '}
            <Button
              onClick={(e) => {
                console.log('corresponding email is :', record.email)
              }}
            >
              {' '}
              Click{' '}
            </Button>
          </div>
        ),
      },
    ]

    return (
      <div>
        <Table columns={columns} dataSource={dataSource} />{' '}
      </div>
    )
  }
}
