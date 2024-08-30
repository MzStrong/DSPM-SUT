import { Button, Card, Divider, Form, message, Modal, Switch, Table, Tag } from "antd"
import "../../../styles/policy.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { getPolicys } from "../../../services/admin/policyService";
import { useEffect, useState } from "react";
import { PolicyInterface } from "../../../interfaces/Ipolicy";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { createPolicy, deletePolicy, editPolicy, updatePolicyStatus } from "../../../services/admin/policyService";
import CreatePolicyModal from "../../../components/admin/CreatePolicyModal";
import EditPolicyModal from "../../../components/admin/EditPolicyModal";

// const { TextArea } = Input;

const Policy = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [policies, setPolicies] = useState<PolicyInterface[]>([])
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyInterface | null>(null);
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [refresh, setRefresh] = useState(false);
  const [form] = Form.useForm();
  const [editform] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPolicys();
      setPolicies(res)
    }
    fetchData();
  }, [refresh]);

  const handleCreate = async (values: PolicyInterface) => {
    try {
      await createPolicy(values);
      messageApi.open({
        type: 'success',
        content: 'สร้าง Policy เรียบร้อย',
      });
      setCreateOpen(false)
      form.resetFields()
      setRefresh(!refresh)

    } catch (error) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: 'สร้างไม่สำเร็จ',
      });
    }
  }

  const handleEdit = async (values: PolicyInterface) => {
    if (selectedPolicy) {
      try {
        await editPolicy(selectedPolicy.id, values);
        messageApi.open({
          type: 'success',
          content: 'อัปเดต Policy เรียบร้อย',
        });
        setEditOpen(false);
        editform.resetFields();
        setRefresh(!refresh);
      } catch (error) {
        console.log(error);
        messageApi.open({
          type: 'error',
          content: 'อัปเดตไม่สำเร็จ',
        });
      }
    }
  };

  const handleDelete = async (id: number, title: string) => {
    Modal.confirm({
      title: 'คุณต้องการที่จะลบ Policy ใช่ไหม?',
      content: `หัวข้อ : ${title} ?`,
      okText: 'ลบ',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      onOk: async () => {
        try {
          await deletePolicy(id);
          messageApi.open({
            type: 'success',
            content: 'ลบ Policy แล้ว',
          });
          setRefresh(!refresh)
        } catch (error) {
          console.error('Delete error:', error);
          messageApi.open({
            type: 'error',
            content: 'ลบ Policy ไม่สำเร็จ',
          });
        }
      }, onCancel() {
      },
    });
  }

  const toggleStatus = async (id: number, status: boolean) => {
    try {
      await updatePolicyStatus(id, status);
      messageApi.open({
        type: 'success',
        content: 'อัปเดตสถานะ Policy เรียบร้อย',
      });
      setRefresh(!refresh);
    } catch (error) {
      console.error('Update status error:', error);
      messageApi.open({
        type: 'error',
        content: 'อัปเดตสถานะไม่สำเร็จ',
      });
    }
  };

  const openEditModal = (policy: PolicyInterface) => {
    setSelectedPolicy(policy);
    editform.setFieldsValue(policy);
    setEditOpen(true);
  };

  const columns = [
    {
      title: 'หัวข้อ',
      dataIndex: 'title',
      key: 'title',
      align: 'center' as const,
      width: 200,
      render: (text: string) => <div style={{ textAlign: 'left' }}>{text}</div>,
    },
    {
      title: 'รายละเอียด',
      dataIndex: 'description',
      key: 'description',
      align: 'center' as const,
      ellipsis: true,
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (_: boolean, record: PolicyInterface) => (
        <div style={{ whiteSpace: 'pre-line' }}>
          {record.status ? <Tag color="success">ใช้งาน</Tag> : <Tag color="error">ไม่ใช้งาน</Tag>}
        </div>
      ),
      width: 110,
      align: 'center' as const,

    },
    {
      title: 'การจัดการ',
      key: 'action',
      width: 150,
      render: (_: string, record: PolicyInterface) => (
        <div className="option-btn">
          <Switch
            checked={record.status}
            onChange={(checked) => toggleStatus(record.id, checked)}
          />
          <Button
            type='text'
            onClick={() => openEditModal(record)}
            icon={<IoSettingsOutline style={{ fontSize: '25px', color: '#007DF9' }} />}
            style={{ marginLeft: '5px' }}
          />
          <Button
            type='text'
            onClick={() => handleDelete(record.id, record.title)}
            icon={<AiOutlineDelete style={{ fontSize: '25px', color: '#C82333' }} />}
          />
        </div>
      ),
      align: 'center' as const,
    },
  ];

  return (
    <>
      <CreatePolicyModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
        form={form}
      />

      <EditPolicyModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onEdit={handleEdit}
        form={editform}
        policy={selectedPolicy}
      />
      <Card style={{ width: '100%' }}>
        <div className="head">
          {contextHolder}
          <h2>Policy</h2>

          <button
            type="button"
            className="btn btn-outline-success "
            onClick={() => { setCreateOpen(true) }}
          >
            สร้าง Policy
          </button>

        </div>

        <Divider />

        <div style={{ padding: '0px 30px' }}>
          <Table
            columns={columns}
            dataSource={policies}
            rowKey="id" // ระบุ key สำหรับแต่ละแถว
          />
        </div>

      </Card>
    </>
  )
}

export default Policy