import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Button, Space, Form, DatePicker } from 'antd'
import { Typography } from 'antd'
import { Radio } from 'antd'
import { Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './searchField.scss'
import 'antd/dist/antd.min.css'
import Timesheet from './tableTimesheet'
import { useDispatch, useSelector } from 'react-redux'
import { getTimesheet } from './slice/slice'
const { Option } = Select
const { Text, Title } = Typography
const dateFormat = 'DD/MM/YYYY'
export default function SearchField() {
  const [choose, setChoose] = useState(1)
  const dispatch = useDispatch()
  const [params, setParams] = useState({
    page: 3,
    sort: 'ascending',
    start: '',
    end: '',
  })
  useEffect(() => {
    dispatch(getTimesheet({ params }))
  }, [params])
  const worksheet = useSelector((state) => {
    return state.timesheet.worksheet
  })
  const onFinish = (values) => {
    if (values.sort === 'ascending') {
      if (values.selected === 1) {
        if (values.selecteddate === 1) {
          setParams({ page: 3, sort: 'ascending', start: '', end: '' })
        } else if (values.selecteddate === 2) {
          setParams({ page: 2, sort: 'ascending', start: '', end: '' })
        } else {
          setParams({ page: 1, sort: 'ascending', start: '', end: '' })
        }
      }
    } else {
      if (values.selected === 2) {
        setParams({
          page: '',
          sort: 'descending',
          start: moment(values.startdate).format('YYYY-MM-DD'),
          end: moment(values.enddate).format('YYYY-MM-DD'),
        })
      }
    }
  }

  const handleReset = () => {
    form.resetFields()
    setParams({ page: 3, sort: 'ascending', start: '', end: '' })
  }
  const [form] = Form.useForm()
  const onChangeChoose = (e) => {
    setChoose(e.target.value)
  }

  return (
    <>
      <div className="search-field">
        <fieldset>
          <legend>My Time Sheet</legend>
          <Form
            form={form}
            layout="horizontal"
            name="form_searchList"
            className="searchList"
            onFinish={onFinish}
            scrollToFirstError
            initialValues={{
              selecteddate: 3,
              selected: 1,
              sort: 'ascending',
              startdate: moment('01/03/2022', dateFormat),
              enddate: moment('30/03/2022', dateFormat),
              radioGroup: 2,
            }}
          >
            <div className="search-form">
              <div className="selected_choose">
                <Form.Item name="selected">
                  <Radio.Group
                    name="radioGroup"
                    onChange={onChangeChoose}
                    value={choose}
                  >
                    <Space direction="vertical" size={35}>
                      <Radio value={1}>Choose from list</Radio>
                      <Radio value={2}>Choose start, end</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
                <div className="selected_data">
                  <Form.Item name="selecteddate">
                    <Select style={{ width: 150 }} disabled={choose === 2}>
                      <Option value={3}>This month</Option>
                      <Option value={2}>Last month</Option>
                      <Option value={1}>Last year</Option>
                    </Select>
                  </Form.Item>
                  <Space direction="horizontal" size={25} align="center">
                    <Form.Item name="startdate">
                      <DatePicker format={dateFormat} disabled={choose === 1} />
                      <span style={{ marginLeft: 20 }}>To</span>
                    </Form.Item>

                    <Form.Item name="enddate">
                      <DatePicker format={dateFormat} disabled={choose === 1} />
                    </Form.Item>
                  </Space>
                </div>
              </div>

              <div className="selected_sort">
                <Text>Sort by work date</Text>
                <Form.Item name="sort">
                  <Select style={{ width: 150 }}>
                    <Option value="ascending">Ascending</Option>
                    <Option value="descending">Descending</Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="button-form-search">
              <Button
                type="primary"
                icon={<SearchOutlined />}
                size="large"
                htmlType="submit"
              >
                Search
              </Button>
              <Button size="large" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </Form>
        </fieldset>
        <>
          <Title level={5}>
            Total number of record :{' '}
            {worksheet.per_page ? worksheet.per_page : ''}
          </Title>
        </>
        <>
          <Timesheet row={worksheet.data}></Timesheet>
        </>
      </div>
    </>
  )
}
