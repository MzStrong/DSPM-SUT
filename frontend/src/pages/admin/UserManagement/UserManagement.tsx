import { useEffect, useState } from "react";
import { changePasswordUser, deleteUser, editUser, getAllUser } from "../../../services/admin/userService";
import { Button, Card, Divider, Form, message, Modal, Table } from "antd";
import style from "./UserManagement.module.css"
import { UserInterface } from "../../../interfaces/Iuser";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import EditUserModal from "../../../components/admin/UserManagement/EditUserModal/EdiUserModal";
import ChangePasswordUserModal from "../../../components/admin/UserManagement/ChangePasswordUserModal/ChangePasswordUserModal";
// import { FaChildren } from "react-icons/fa6";
import { TbMoodKid } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [editOpen, setEditOpen] = useState(false)
  const [changePassOpen, setChangePassOpen] = useState(false)
  // const [form] = Form.useForm();
  const [editform] = Form.useForm();
  const [changePassform] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [refresh, setRefresh] = useState(false);
  // const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUser()
      setUsers(res)
    }
    fetchData()
  }, [refresh]);


  const handleEdit = async (values: UserInterface) => {
    try {
      await editUser(editform.getFieldValue('id'), values);
      messageApi.open({
        type: 'success',
        content: 'อัปเดตผู้ใช้เรียบร้อย',
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
  const handleChangePass = async (values: UserInterface) => {
    try {
      await changePasswordUser(changePassform.getFieldValue('id'), values);
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
      title: 'ลบผู้ใช้ใช่ไหม?',
      content: `ชื่อ : ${firstname} ${lastname} ?`,
      okText: 'ลบ',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      onOk: async () => {
        try {
          await deleteUser(id);
          messageApi.open({
            type: 'success',
            content: 'ลบผู้ใช้แล้ว',
          });
          setRefresh(!refresh)
        } catch (error) {
          console.error('Delete error:', error);
          messageApi.open({
            type: 'error',
            content: 'ลบผู้ใช้ไม่สำเร็จ',
          });
        }
      }, onCancel() {
      },
    });
  }

  const openEditModal = (user: UserInterface) => {
    editform.setFieldsValue(user);
    setEditOpen(true);
  };
  const openChangePassModal = (user: UserInterface) => {
    changePassform.setFieldsValue(user);
    setChangePassOpen(true);
  };
  const gotoChildPage = (user: UserInterface) => {
    navigate('/admin/usermanage/children', { state: user });
  }

  const columns = [
    {
      title: 'เลขบัตรประชาชน',
      dataIndex: 'cardid',
      key: 'cardid',
      align: 'center' as const,
      ellipsis: true,
    },
    {
      title: 'ชื่อ-สกุล',
      key: 'name',
      align: 'center' as const,
      ellipsis: true,
      render: (record: { firstname: string; lastname: string }) => <div>{`${record.firstname} ${record.lastname}`}</div>,
    },
    {
      title: 'เพศ',
      dataIndex: 'genderName',
      key: 'gender',
      align: 'center' as const,
      ellipsis: true,
      // render: (text: string) => <div style={{ textAlign: 'left'}}>{text}</div>,
    },
    {
      title: 'อายุ (ปี)',
      dataIndex: 'age',
      key: 'age',
      align: 'center' as const,
      ellipsis: true,
      // render: (text: string) => <div style={{ textAlign: 'left'}}>{text}</div>,
    },
    {
      title: 'เบอร์โทร',
      dataIndex: 'telnum',
      key: 'telnum',
      align: 'center' as const,
      ellipsis: true,
      // render: (text: string) => <div style={{ textAlign: 'left' }}>{text}</div>,
    },
    {
      title: 'การจัดการ',
      key: 'action',
      width: 150,
      render: (_: string, record: UserInterface) => (
        <div className={style.optionBtn}>
          <Button
            type='text'
            onClick={() => gotoChildPage(record)}
            icon={<TbMoodKid style={{ fontSize: '25px', color: '#3FAE45' }} />}
          />
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

      <EditUserModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onEdit={handleEdit}
        form={editform}
      // user={selectedUser}
      />

      <ChangePasswordUserModal
        open={changePassOpen}
        onClose={() => setChangePassOpen(false)}
        onEdit={handleChangePass}
        form={changePassform}
      // user={selectedUser}
      />

      <Card style={{ width: '100%' }}>
        <div className={style.head} style={{ padding: '10px 30px 0 30px' }}>
          {contextHolder}
          <h2>จัดการผู้ใช้</h2>
        </div>

        <Divider />

        <div style={{ padding: '0px 30px' }}>
          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
          />
        </div>

      </Card>
    </>
  )
}

export default UserManagement