/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Modal, Select } from 'antd';
import { UserInterface } from '../../../../interfaces/Iuser';
import { GenderInterface } from '../../../../interfaces/Igender';
import { getGenders } from '../../../../services/public/publicService';


interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  onEdit: (values: UserInterface) => void;
  form: any;
  // user: UserInterface | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ open, onClose, onEdit, form }) => {

  const [genders, setGenders] = useState<GenderInterface[]>([]);

  useEffect(() => {
    const getRegD = async () => {
        try {
            const genders = await getGenders();
            setGenders(genders.data)
        } catch (error) {
            console.log(error);
        }
    }
    getRegD();

}, []);

  const handleCardIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        อัปเดตข้อมูล
      </div>
      <Divider />
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={form || {}}
        onFinish={onEdit}
      >
        <h6>เลขบัตรประชาชน :</h6>
        <Form.Item
          name="cardid"
          rules={[
            { required: true, message: 'กรุณากรอกเลขบัตรประชาชน!' },
            { len: 13, message: 'เลขบัตรประชาชนต้องมี 13 หลัก!' },
          ]}
        >
          <Input
            placeholder="เลขบัตรประชาชน"
            maxLength={13}
            onInput={handleCardIDChange}
          />
        </Form.Item>

        <h6>ชื่อ :</h6>
        <Form.Item
          name="firstname"
          rules={[{ required: true, message: 'กรุณากรอกชื่อ!' }]}
        >
          <Input placeholder="ชื่อ" />
        </Form.Item>

        <h6>นามสกุล :</h6>
        <Form.Item
          name="lastname"
          rules={[{ required: true, message: 'กรุณากรอกนามสกุล!' }]}
        >
          <Input placeholder="นามสกุล" />
        </Form.Item>

        <h6>อายุ :</h6>
        <Form.Item
          name="age"
        // rules={[{ required: true, message: 'กรุณากรอกอายุ!' }]}
        >
          <Select placeholder="Please select">
            {(() => {
              const options = [];
              for (let i = 18; i <= 80; i++) {
                options.push(
                  <Select.Option key={i} value={i}>
                    {i}
                  </Select.Option>
                );
              }
              return options;
            })()}
          </Select>
        </Form.Item>

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

        <h6>เบอร์โทร :</h6>
        <Form.Item
          name="telnum"
          rules={[{ required: true, message: 'กรุณากรอกเบอร์โทร!' }]}
        >
          <Input placeholder="เบอร์โทร" />
        </Form.Item>

        <Form.Item>
          <center>
            <Form.Item className="create-btn-group">
              <Button type="primary" htmlType="submit" style={{ margin: '10px 10px 0 0' }}>
                อัพเดต
              </Button>
              <Button onClick={onClose} style={{ margin: '10px 0 0 10px' }}>
                ยกเลิก
              </Button>
            </Form.Item>
          </center>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
