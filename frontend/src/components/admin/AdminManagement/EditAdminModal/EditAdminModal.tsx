/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { AdminInterface } from '../../../../interfaces/Iadmin';


interface EditAdminModalProps {
  open: boolean;
  onClose: () => void;
  onEdit: (values: AdminInterface) => void;
  form: any;
  // admin: AdminInterface | null;
}

const EditAdminModal: React.FC<EditAdminModalProps> = ({ open, onClose, onEdit, form }) => {

  return (
    <Modal
      open={open}
      closeIcon={null}
      footer={null}
      onCancel={onClose}
    >
      <div className="head-modal">
        อัปเดต Admin
      </div>
      <Divider />
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={form || {}}
        onFinish={onEdit}
      >
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

        <h6>อีเมล :</h6>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'กรุณากรอกอีเมล!' }]}
        >
          <Input placeholder="อีเมล" />
        </Form.Item>

        <h6>เบอร์โทร :</h6>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: 'กรุณากรอกวิธีประเมิน!' }]}
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

export default EditAdminModal;
