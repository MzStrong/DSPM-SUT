/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { UserInterface } from '../../../../interfaces/Iuser';


interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  onEdit: (values: UserInterface) => void;
  form: any;
  // user: UserInterface | null;
}

const ChangePasswordUserModal: React.FC<EditUserModalProps> = ({ open, onClose, onEdit, form }) => {

  return (
    <Modal
      open={open}
      closeIcon={null}
      footer={null}
      onCancel={onClose}
    >
      <div className="head-modal">
        เปลี่ยนรหัสผ่าน
      </div>
      <div>
        <center>{form.getFieldValue('email')}</center>
      </div>
      <Divider />
      <Form
        form={form}
        initialValues={form || {}}
        onFinish={onEdit}
      >

        <h6>รหัสผ่านใหม่ :</h6>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'กรุณากรอกรหัสผ่านใหม่!' }]}
        >
          <Input type='password' placeholder="รหัสผ่านใหม่" />
        </Form.Item>

        <Form.Item>
          <center>
            <Form.Item className="create-btn-group">
              <Button type="primary" htmlType="submit" style={{ margin: '10px 10px 0 0' }}>
                เปลี่ยนรหัสผ่าน
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

export default ChangePasswordUserModal;
