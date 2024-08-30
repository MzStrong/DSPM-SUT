/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { PolicyInterface } from '../../interfaces/Ipolicy';

const { TextArea } = Input;

interface CreatePolicyModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (values: PolicyInterface) => void;
  form: any;
}

const CreatePolicyModal: React.FC<CreatePolicyModalProps> = ({ open, onClose, onCreate, form }) => {
  return (
    <Modal
      open={open}
      closeIcon={null}
      footer={null}
      onCancel={onClose}
    >
      <div className="head-modal">
        สร้าง Policy
      </div>
      <Divider />
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        // initialValues={{ remember: true }}
        onFinish={onCreate}
      >
        <h6>หัวข้อ :</h6>
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'กรุณากรอกหัวข้อ!' }]}
        >
          <Input placeholder="หัวข้อ" />
        </Form.Item>
        <h6>รายละเอียด :</h6>
        <Form.Item
          name="description"
          rules={[{ required: true, message: 'กรุณากรอกรายละเอียด!' }]}
        >
          <TextArea
            placeholder="รายละเอียด"
            autoSize={{ minRows: 4, maxRows: 10 }}
          />
        </Form.Item>
        <Form.Item>
          <center>
            <Form.Item className="create-btn-group">
              <Button type="primary" htmlType="submit" style={{ margin: '10px 10px 0 0' }}>
                สร้าง
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

export default CreatePolicyModal;
