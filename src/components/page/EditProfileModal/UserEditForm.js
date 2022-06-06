import { Form, Input, DatePicker, Select, Button, Modal } from 'antd'
import 'antd/dist/antd.min.css'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './UserEditForm.module.scss'
import UserAvatar from './UserAvatar'
import UserDescription from './UserDescription'

const API = 'https://6295d111810c00c1cb685f53.mockapi.io/'

const UserEditForm = () => {
  const [componentSize, setComponentSize] = useState('default')
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size)
  }
  const [modalVisible, setModalVisible] = useState(false)
  const [profileInfo, setProfileInfo] = useState([])
  useEffect(() => {
    axios.get(API + 'user_info/1').then((res) => {
      setProfileInfo(res.data)
    })
  }, [])

  const onSubmit = (values) => {
    axios.put(API + 'user_info/1', values).then((res) => {
      console.log(res.data)
    })
  }

  return (
    <>
      <h3 onClick={() => setModalVisible(true)}>Edit Profile</h3>
      <Modal
        style={{
          top: 20,
        }}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        width="90%"
        footer={null}
      >
        <fieldset className={styles.fieldset}>
          <legend>Your Profile</legend>
          <Form
            layout="horizontal"
            initialValues={{
              gender: profileInfo.gender,
              nickname: profileInfo.nickname,
              identity_number: profileInfo.identity_number,
              place_of_issue: profileInfo.place_of_issue,
              passport_number: profileInfo.passport_number,
              nationality: profileInfo.nationality,
              other_email: profileInfo.other_email,
              skype: profileInfo.skype,
              facebook: profileInfo.facebook,
              bank_name: profileInfo.bank_name,
              bank_account: profileInfo.bank_account,
              marital_status: profileInfo.marial_status,
              academic_level: profileInfo.academic_level,
              permanent_address: profileInfo.permanent_address,
              temporary_address: profileInfo.temporary_address,
              tax_identification: profileInfo.tax_identification,
              insurance_number: profileInfo.insurance_number,
              healthcare_provider: profileInfo.healthcare_provider,
              tax_identification_full: profileInfo.tax_identification_full,
              emergency_contact_name: profileInfo.emergency_contact_name,
              emergency_contact_relationship:
                profileInfo.emergency_contact_relationship,
              emergency_contact_number: profileInfo.emergency_contact_number,
            }}
            onValuesChange={onFormLayoutChange}
            onFinish={onSubmit}
            size={componentSize}
            labelCol={{
              span: 13,
            }}
          >
            <div className={styles.form}>
              <div className={styles.infoForm}>
                <div className={styles.infoBasicRow}>
                  <div className={styles.infoAvatar}>
                    <UserAvatar />
                  </div>
                  <div className={styles.infoDescription}>
                    <UserDescription />
                  </div>
                </div>
                <br />
                <hr style={{ backgroundColor: 'gray', width: '100%' }} />
                <div className={styles.infoRowContainer}>
                  <div className={styles.infoLeftCol}>
                    <Form.Item
                      label="Gender:"
                      required="true"
                      labelAlign="left"
                      name="gender"
                    >
                      <Select>
                        <Select.Option value="Male">Male</Select.Option>
                        <Select.Option value="Female">Female</Select.Option>
                        <Select.Option value="Other">Other</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Birth Date:"
                      required="true"
                      labelAlign="left"
                      name="birth_date"
                    >
                      <DatePicker format="DD-MM-YYYY" />
                    </Form.Item>
                    <Form.Item
                      label="Identity Number:"
                      labelAlign="left"
                      name="identity_number"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Identity Number!',
                        },
                        {
                          type: 'number',
                          message:
                            'Characters or special symbols are not allowed',
                        },
                        {
                          max: 12,
                          message: 'This field must be maximum 12 characters.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Date of issue Identity: "
                      required="true"
                      labelAlign="left"
                      name="date_of_issue"
                    >
                      <DatePicker format="DD-MM-YYYY" />
                    </Form.Item>
                    <Form.Item
                      label="Place of issue Identity: "
                      labelAlign="left"
                      name="place_of_issue"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Place of issue Identity!',
                        },
                        {
                          max: 50,
                          message: 'This field must be maximum 50 characters.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Passport Number: "
                      labelAlign="left"
                      name="passport_number"
                      rules={[
                        {
                          max: 20,
                          message: 'This field must be maximum 20 characters.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Passport Expiration: "
                      labelAlign="left"
                      name="passport_expiration"
                    >
                      <DatePicker format="DD-MM-YYYY" />
                    </Form.Item>
                    <Form.Item
                      label="Nationality: "
                      labelAlign="left"
                      name="nationality"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Place of issue Identity!',
                        },
                        {
                          max: 50,
                          message: 'This field must be maximum 50 characters.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className={styles.infoRightCol}>
                    <Form.Item
                      label="Nick name: "
                      name="nickname"
                      labelAlign="left"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Other email: "
                      required="true"
                      labelAlign="left"
                      name="other_email"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Skype: "
                      labelAlign="left"
                      name="skype"
                      rules={[
                        {
                          max: 30,
                          message: 'This field must be maximum 30 characters.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Facebook: "
                      labelAlign="left"
                      name="facebook"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Bank Name: "
                      labelAlign="left"
                      name="bank_name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Bank Name!',
                        },
                        {
                          max: 70,
                          message: 'This field must be maximum 70 characters.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Bank Account: "
                      labelAlign="left"
                      name="bank_account"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Bank Account!',
                        },
                        {
                          max: 20,
                          message: 'This field must be maximum 20 characters.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Marital Status: "
                      labelAlign="left"
                      name="marital_status"
                    >
                      <Select>
                        <Select.Option value="Married">Married</Select.Option>
                        <Select.Option value="Single">Single</Select.Option>
                        <Select.Option value="Divorced">Divorced</Select.Option>
                        <Select.Option value="Other">Other</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Academic Level: "
                      labelAlign="left"
                      name="academic_level"
                      rules={[
                        {
                          max: 50,
                          message: 'This field must be maximum 50 characters.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                </div>

                <Form.Item
                  label="Permanent Address: "
                  labelAlign="left"
                  name="permanent_address"
                  labelCol={{
                    span: 6,
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Permanent Address!',
                    },
                    {
                      max: 255,
                      message: 'This field must be maximum 255 characters.',
                    },
                  ]}
                >
                  <Input className={styles.addressInput} />
                </Form.Item>
                <Form.Item
                  label="Temporary Address: "
                  labelAlign="left"
                  name="temporary_address"
                  labelCol={{
                    span: 6,
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Temporary Address!',
                    },
                    {
                      max: 255,
                      message: 'This field must be maximum 255 characters.',
                    },
                  ]}
                >
                  <Input className={styles.addressInput} />
                </Form.Item>

                <br />
                <hr style={{ backgroundColor: 'gray', width: '100%' }} />
                <div className={styles.infoRowContainer}>
                  <div className={styles.infoLeftCol}>
                    <Form.Item
                      label="Tax Identification: "
                      labelAlign="left"
                      name="tax_identification"
                      rules={[
                        {
                          max: 20,
                          message: 'This field must be maximum 20 characters.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Insurance Number: "
                      labelAlign="left"
                      name="insurance_number"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Healthcare Provider: "
                      labelAlign="left"
                      name="healthcare_provider"
                      rules={[
                        {
                          max: 30,
                          message: 'This field must be maximum 30 characters.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Tax Identification: "
                      labelAlign="left"
                      name="tax_identification_full"
                      rules={[
                        {
                          max: 20,
                          message: 'This field must be maximum 20 characters.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className={styles.infoRightCol}>
                    <Form.Item
                      label="Emergency Contact Name: "
                      labelAlign="left"
                      name="emergency_contact_name"
                      rules={[
                        {
                          required: true,
                          message:
                            'Please input your Emergency Contact Relationship!',
                        },
                        {
                          max: 70,
                          message: 'This field must be maximum 70 characters.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Emergency Contact Relationship: "
                      labelAlign="left"
                      name="emergency_contact_relationship"
                      rules={[
                        {
                          required: true,
                          message:
                            'Please input your Emergency Contact Relationship!',
                        },
                        {
                          max: 50,
                          message: 'This field must be maximum 50 characters.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Emergency Contact Number: "
                      labelAlign="left"
                      name="emergency_contact_number"
                      rules={[
                        {
                          required: true,
                          message:
                            'Please input your Emergency Contact Relationship!',
                        },
                        {
                          max: 20,
                          message: 'This field must be maximum 20 characters.',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Start Date: "
                      labelAlign="left"
                      name="start_date"
                    >
                      <DatePicker format="DD-MM-YYYY" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <Button className={styles.button} htmlType="submit">
                  Update
                </Button>
              </div>
            </div>
          </Form>
        </fieldset>
      </Modal>
    </>
  )
}

export default UserEditForm
