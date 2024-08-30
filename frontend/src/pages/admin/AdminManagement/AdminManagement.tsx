import { useEffect, useState } from "react";
import { changePasswordAdmin, createAdmin, deleteAdmin, editAdmin, getAllAdmin } from "../../../services/admin/adminService";
import { Button, Card, Divider, Form, message, Modal, Table } from "antd";
import style from "./Admin.module.css"
import CreateAdminModal from "../../../components/admin/AdminManagement/CreateAdminModal/CreateAdminModal";
import { AdminInterface } from "../../../interfaces/Iadmin";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import EditAdminModal from "../../../components/admin/AdminManagement/EditAdminModal/EditAdminModal";
import { RiLockPasswordLine } from "react-icons/ri";
import ChangePasswordAdminModal from "../../../components/admin/AdminManagement/ChangePasswordAdminModal/ChangePasswordAdminModal";

const AdminManagement = () => {

  const [admins, setAdmins] = useState([]);
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [changePassOpen, setChangePassOpen] = useState(false)
  const [form] = Form.useForm();
  const [editform] = Form.useForm();
  const [changePassform] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [refresh, setRefresh] = useState(false);
  // const [selectedAdmin, setSelectedAdmin] = useState<AdminInterface | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAdmin()
      setAdmins(res)
    }
    fetchData()
  }, [refresh]);

  const handleCreate = async (values: AdminInterface) => {
    try {
      await createAdmin(values);
      messageApi.open({
        type: 'success',
        content: 'เพิ่ม Admin เรียบร้อย',
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

  const handleEdit = async (values: AdminInterface) => {
    try {
      await editAdmin(editform.getFieldValue('id'), values);
      messageApi.open({
        type: 'success',
        content: 'อัปเดต Admin เรียบร้อย',
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
  };
  const handleChangePass = async (values: AdminInterface) => {
    try {
      await changePasswordAdmin(changePassform.getFieldValue('id'), values);
      messageApi.open({
        type: 'success',
        content: 'เปลี่ยนรหัสผ่านเรียบร้อย',
      });
      setChangePassOpen(false);
      changePassform.resetFields();
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
      });
    }
  };

  const handleDelete = async (id: number, firstname: string, lastname: string) => {
    Modal.confirm({
      title: 'ลบ Admin ใช่ไหม?',
      content: `ชื่อ : ${firstname} ${lastname} ?`,
      okText: 'ลบ',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      onOk: async () => {
        try {
          await deleteAdmin(id);
          messageApi.open({
            type: 'success',
            content: 'ลบ Admin แล้ว',
          });
          setRefresh(!refresh)
        } catch (error) {
          console.error('Delete error:', error);
          messageApi.open({
            type: 'error',
            content: 'ลบ Admin ไม่สำเร็จ',
          });
        }
      }, onCancel() {
      },
    });
  }

  const openEditModal = (admin: AdminInterface) => {
    editform.setFieldsValue(admin);
    setEditOpen(true);
  };
  const openChangePassModal = (admin: AdminInterface) => {
    changePassform.setFieldsValue(admin);
    setChangePassOpen(true);
  };

  const columns = [
    {
      title: 'ชื่อ-สกุล',
      key: 'name',
      align: 'center' as const,
      ellipsis: true,
      render: (record: { firstname: string; lastname: string }) => <div>{`${record.firstname} ${record.lastname}`}</div>,
    },
    {
      title: 'อีเมล',
      dataIndex: 'email',
      key: 'email',
      align: 'center' as const,
      ellipsis: true,
      // render: (text: string) => <div style={{ textAlign: 'left'}}>{text}</div>,
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center' as const,
      ellipsis: true,
      // render: (text: string) => <div style={{ textAlign: 'left' }}>{text}</div>,
    },
    {
      title: 'การจัดการ',
      key: 'action',
      width: 150,
      render: (_: string, record: AdminInterface) => (
        <div className={style.optionBtn}>
          <Button
            type='text'
            onClick={() => openEditModal(record)}
            icon={<IoSettingsOutline style={{ fontSize: '25px', color: '#007DF9' }} />}
          />
          <Button
            type='text'
            onClick={() => openChangePassModal(record)}
            icon={<RiLockPasswordLine style={{ fontSize: '25px', color: '#C89333' }} />}
          />
          <Button
            type='text'
            onClick={() => handleDelete(record.id, record.firstname, record.lastname)}
            icon={<AiOutlineDelete style={{ fontSize: '25px', color: '#C82333' }} />}
          />
        </div>
      ),
      align: 'center' as const,
    },
  ];

  return (
    <>
      <CreateAdminModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
        form={form}
      />

      <EditAdminModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onEdit={handleEdit}
        form={editform}
      // admin={selectedAdmin}
      />

      <ChangePasswordAdminModal
        open={changePassOpen}
        onClose={() => setChangePassOpen(false)}
        onEdit={handleChangePass}
        form={changePassform}
      // admin={selectedAdmin}
      />

      <Card style={{ width: '100%' }}>
        <div className={style.head}>
          {contextHolder}
          <h2>Admin Management</h2>

          <button
            type="button"
            className="btn btn-outline-success "
            onClick={() => { setCreateOpen(true) }}
          >
            เพิ่ม Admin
          </button>

        </div>

        <Divider />

        <div style={{ padding: '0px 30px' }}>
          <Table
            columns={columns}
            dataSource={admins}
            rowKey="id"
          />
        </div>

      </Card>
    </>
  )
}

export default AdminManagement