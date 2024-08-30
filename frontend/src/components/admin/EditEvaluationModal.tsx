/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Modal, Select } from 'antd';
import { EvaluationInterface } from '../../interfaces/Ievaluation';
import { TopicInterface } from '../../interfaces/Itopic';
import { getTopics } from '../../services/publicService';

const { TextArea } = Input;

interface EditEvaluationModalProps {
  open: boolean;
  onClose: () => void;
  onEdit: (values: EvaluationInterface) => void;
  form: any;
  // evaluation: EvaluationInterface | null;
}

const EditEvaluationModal: React.FC<EditEvaluationModalProps> = ({ open, onClose, onEdit, form }) => {

  const [topics, setTopics] = useState<TopicInterface[]>([]);

  useEffect(() => {
    const getRegD = async () => {
      try {
        const regData = await getTopics();
        setTopics(regData.data)
      } catch (error) {
        console.log(error);
      }
    }
    getRegD();

  }, []);

  return (
    <Modal
      open={open}
      closeIcon={null}
      footer={null}
      onCancel={onClose}
    >
      <div className="head-modal">
        อัปเดต Evaluation
      </div>
      <Divider />
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={form || {}}
        onFinish={onEdit}
      >
        <h6>กลุ่มทักษะ :</h6>
        <Form.Item
          name="topicId"
          rules={[{ required: true, message: 'กรุณาเลือกกลุ่มทักษะ!' }]}
        >
          <Select placeholder="กลุ่มทักษะ">
            {topics.map((topic) => (
              <Select.Option key={topic.id} value={topic.id}>
                {topic.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <h6>ทักษะ :</h6>
        <Form.Item
          name="skill"
          rules={[{ required: true, message: 'กรุณากรอกทักษะ!' }]}
        >
          <Input placeholder="ทักษะ" />
        </Form.Item>

        <h6>อายุ (เดือน) :</h6>
        <Form.Item
          name="age_months"
          rules={[{ required: true, message: 'กรุณาเลือกอายุ!' }]}
        >
          <Select placeholder="อายุ (เดือน)">
            {(() => {
              const options = [];
              for (let i = 0; i <= 80; i++) {
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

        <h6>ลิงค์วิดีโอ :</h6>
        <Form.Item
          name="link_video"
          rules={[{ required: true, message: 'กรุณากรอกลิงค์วิดีโอ!' }]}
        >
          <Input placeholder="ลิงค์วิดีโอ" />
        </Form.Item>

        <h6>วิธีประเมิน :</h6>
        <Form.Item
          name="evaluation_method"
          rules={[{ required: true, message: 'กรุณากรอกวิธีประเมิน!' }]}
        >
          <TextArea
            placeholder="วิธีประเมิน"
            autoSize={{ minRows: 4, maxRows: 10 }}
          />
        </Form.Item>

        <h6>วิธีฝึกทักษะ :</h6>
        <Form.Item
          name="practice_skills"
          rules={[{ required: true, message: 'กรุณากรอกวิธีฝึกทักษะ!' }]}
        >
          <TextArea
            placeholder="วิธีฝึกทักษะ"
            autoSize={{ minRows: 4, maxRows: 10 }}
          />
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

export default EditEvaluationModal;
