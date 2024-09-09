/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Divider, Form, Input, Modal, Select } from 'antd';
import { ChildInterface } from '../../../../interfaces/Ichild';
import { getGenders, getRelationships } from '../../../../services/public/publicService';
import { GenderInterface } from '../../../../interfaces/Igender';
import { RelationshipInterface } from '../../../../interfaces/Irelationship';


interface CreateChildModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (values: ChildInterface) => void;
  form: any;
}

const CreateChildModal: React.FC<CreateChildModalProps> = ({ open, onClose, onCreate, form }) => {

  const [genders, setGenders] = useState<GenderInterface[]>([]);
  const [relationships, setRelationships] = useState<RelationshipInterface[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {

        const gender = await getGenders();
        setGenders(gender.data)

        const relationship = await getRelationships();
        setRelationships(relationship.data)

      } catch (error) {
        console.log(error);
      }
    }
    getData();

  }, []);

  const handleHNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    // Remove all non-digit characters
    const numericValue = input.replace(/\D/g, '');
    // Limit to 13 digits
    if (numericValue.length <= 13) {
      event.target.value = numericValue;
    }
  };

  return (
    <Modal
      open={open}
      closeIcon={null}
      footer={null}
      onCancel={onClose}
    >
      <div className="head-modal">
        เพิ่มบุตร
      </div>
      <Divider />
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        // initialValues={{ remember: true }}
        onFinish={onCreate}
      >

        <h6>HN :</h6>
        <Form.Item
          name="hn"
          rules={[
            { required: true, message: 'กรุณากรอก HN!' },
            { len: 10, message: 'เลข HN ต้องมี 10 หลัก!' },
          ]}
        >
          <Input
            placeholder="HN"
            maxLength={10}
            onInput={handleHNChange}
          />
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <h6>ชื่อ :</h6>
            <Form.Item
              name="firstname"
              rules={[{ required: true, message: 'กรุณากรอกชื่อ!' }]}
            >
              <Input placeholder="ชื่อ" />
            </Form.Item>
          </div>
          <div style={{ flex: 1 }}>
            <h6>นามสกุล :</h6>
            <Form.Item
              name="lastname"
              rules={[{ required: true, message: 'กรุณากรอกนามสกุล!' }]}
            >
              <Input placeholder="นามสกุล" />
            </Form.Item>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <h6>เพศ :</h6>
            <Form.Item
              name="genderId"
              rules={[{ required: true, message: 'กรุณาเลือกเพศ!' }]}
            >
              <Select placeholder="Please select">
                {genders.map((gender) => (
                  <Select.Option key={gender.id} value={gender.id}>
                    {gender.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div style={{ flex: 1 }}>
            <h6>วันเกิด (ค.ศ.) :</h6>
            <Form.Item
              name="birthday"
              rules={[{ required: true, message: 'กรุณากรอกวันเกิด!' }]}
            >
              <DatePicker
                format={{
                  format: 'D/M/YYYY',
                }}
              />
            </Form.Item>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <h6>ความสัมพันธ์ (ผู้ปกครอง) :</h6>
            <Form.Item
              name="relationshipId"
              rules={[{ required: true, message: 'กรุณาเลือกความสัมพันธ์!' }]}
            >
              <Select placeholder="Please select">
                {relationships.map((relationship) => (
                  <Select.Option key={relationship.id} value={relationship.id}>
                    {relationship.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div style={{ flex: 1 }}>
            <h6>โรคประจำตัว (ถ้ามี) :</h6>
            <Form.Item
              name="congenital_disease"
            >
              <Input placeholder="โรคประจำตัว" />
            </Form.Item>
          </div>
        </div>



        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <h6>น้ำหนัก (กิโลกรัม) :</h6>
            <Form.Item
              name="weight"
              rules={[{ required: true, message: 'กรุณากรอกน้ำหนัก!' }]}
            >
              <Input placeholder="น้ำหนัก" />
            </Form.Item>
          </div>
          <div style={{ flex: 1 }}>
            <h6>ส่วนสูง (เซ็นติเมตร) :</h6>
            <Form.Item
              name="height"
              rules={[{ required: true, message: 'กรุณากรอกส่วนสูง!' }]}
            >
              <Input placeholder="ส่วนสูง" />
            </Form.Item>
          </div>
        </div>

        <Form.Item>
          <center>
            <Form.Item className="create-btn-group">
              <Button type="primary" htmlType="submit" style={{ margin: '10px 10px 0 0', width: '75px' }}>
                เพิ่ม
              </Button>
              <Button onClick={onClose} style={{ margin: '10px 0 0 10px', width: '75px' }}>
                ยกเลิก
              </Button>
            </Form.Item>
          </center>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateChildModal;
