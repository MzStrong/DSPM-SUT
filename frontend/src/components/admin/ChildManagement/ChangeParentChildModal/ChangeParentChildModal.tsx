/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Modal, Select } from 'antd';
// import { AdminInterface } from '../../../../interfaces/Iadmin';
import { ChildInterface } from '../../../../interfaces/Ichild';
import { UserInterface } from '../../../../interfaces/Iuser';
import { getAllUser } from '../../../../services/admin/userService';


interface EditChildModalProps {
  open: boolean;
  onClose: () => void;
  onEdit: (values: ChildInterface) => void;
  form: any;
  // admin: AdminInterface | null;
}

const ChangeParentChildModal: React.FC<EditChildModalProps> = ({ open, onClose, onEdit, form }) => {

  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const u = await getAllUser();
      console.log(u);
      console.log("Hiii");
      
      setUsers(u);
    }
    fetchData()
  }, [form]);

  return (
    <Modal
      open={open}
      closeIcon={null}
      footer={null}
      onCancel={onClose}
    >
      <div className="head-modal">
        เปลี่ยนผู้ปกครอง
      </div>
      <div>
        <center>{form.getFieldValue('firstname')} {form.getFieldValue('lastname')}</center>
      </div>
      <Divider />
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        // initialValues={form}
        onFinish={onEdit}

      // form={form}
      // name="normal_login"
      // className="login-form"
      // onFinish={onEdit}
      >

        <h6>ผู้ปกครองใหม่ :</h6>
        <Form.Item
          name="userId"
          rules={[{ required: true, message: 'กรุณาเลือกผู้ปกครองใหม่!' }]}
        >
          <Select placeholder="Please select">
            {users.map((user) => (
              <Select.Option key={user.id} value={user.id}>
                {user.firstname} {user.lastname} {user.id === form.getFieldValue('userId') ? '(ปัจจุบัน)' : ''}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <center>
            <Form.Item className="create-btn-group">
              <Button type="primary" htmlType="submit" style={{ margin: '10px 10px 0 0' }}>
                เปลี่ยนผู้ปกครอง
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

export default ChangeParentChildModal;
