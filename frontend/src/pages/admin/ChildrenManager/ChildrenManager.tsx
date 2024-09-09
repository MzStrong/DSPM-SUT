import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { changeParent, createChild, deleteChild, editChild, getChild } from "../../../services/admin/childService";
import { Button, Card, Divider, Form, message, Modal, Table } from "antd";
import style from "./Children.module.css"
import { ChildInterface } from "../../../interfaces/Ichild";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import CreateChildModal from "../../../components/admin/ChildManagement/CreateChildModal/CreateChildModal";
import EditChildModal from "../../../components/admin/ChildManagement/EditChildModal/EditChildModal";
import dayjs from "dayjs";
import ChangeParentChildModal from "../../../components/admin/ChildManagement/ChangeParentChildModal/ChangeParentChildModal";
import { FaRegUser } from "react-icons/fa6";
// import ChangeParentChildModal from "../../../components/admin/ChildManagement/ChangeParentChildModal/ChangeParentChildModal";

const ChildrenManager = () => {

  const location = useLocation();
  const user = location.state;

  const [childs, setChilds] = useState([]);
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [changeParentOpen, setChangeParentOpen] = useState(false)
  const [form] = Form.useForm();
  const [editform] = Form.useForm();
  const [changeParentform] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [refresh, setRefresh] = useState(false);
  // const [selectedChild, setSelectedChild] = useState<ChildInterface | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      const res = await getChild(user.id)
      setChilds(res)
    }
    fetchData()
  }, [user.id, refresh]);

  const handleCreate = async (values: ChildInterface) => {
    values.userId = user.id;
    try {
      await createChild(values);
      messageApi.open({
        type: 'success',
        content: 'เพิ่มบุตรเรียบร้อย',
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

  const handleEdit = async (values: ChildInterface) => {
    try {
      await editChild(editform.getFieldValue('id'), values);
      messageApi.open({
        type: 'success',
        content: 'อัปเดตบุตรเรียบร้อย',
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

  const handleChangeParent = async (values: ChildInterface) => {
    try {
      await changeParent(changeParentform.getFieldValue('id'), values);
      messageApi.open({
        type: 'success',
        content: 'เปลี่ยนผู้ปกครองผ่านเรียบร้อย',
      });
      setChangeParentOpen(false);
      changeParentform.resetFields();
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: 'เปลี่ยนผู้ปกครองผ่านไม่สำเร็จ',
      });
    }
  };

  const handleDelete = async (id: number, firstname: string, lastname: string) => {
    Modal.confirm({
      title: 'ลบบุตรใช่ไหม?',
      content: `ชื่อ : ${firstname} ${lastname} ?`,
      okText: 'ลบ',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      onOk: async () => {
        try {
          await deleteChild(id);
          messageApi.open({
            type: 'success',
            content: 'ลบบุตรแล้ว',
          });
          setRefresh(!refresh)
        } catch (error) {
          console.error('Delete error:', error);
          messageApi.open({
            type: 'error',
            content: 'ลบบุตรไม่สำเร็จ',
          });
        }
      }, onCancel() {
      },
    });
  }

  const openEditModal = (child: ChildInterface) => {
    const updatedChild = {
      ...child,
      birthday: typeof child.birthday === 'string' ? dayjs(child.birthday) : child.birthday,
    };
    editform.setFieldsValue(updatedChild);

    setEditOpen(true);
  };
  const openChangeParentModal = (child: ChildInterface) => {
    changeParentform.setFieldsValue(child);
    setChangeParentOpen(true);
    // console.log(child);
  };

  const columns = [
    {
      title: 'HN',
      dataIndex: 'hn',
      key: 'hn',
      align: 'center' as const,
      ellipsis: true,
      // render: (text: string) => <div style={{ textAlign: 'left'}}>{text}</div>,
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
      dataIndex: 'gender',
      key: 'phone',
      align: 'center' as const,
      ellipsis: true,
      render: (gender: { name: string }) => <div>{gender.name}</div>,
    },
    {
      title: 'ความสัมพันธ์ (ผู้ปกครอง)',
      dataIndex: 'relationship',
      key: 'relationship',
      align: 'center' as const,
      ellipsis: true,
      render: (relationship: { name: string }) => <div>{relationship.name}</div>,
    },
    {
      title: 'การจัดการ',
      key: 'action',
      width: 150,
      render: (_: string, record: ChildInterface) => (
        <div className={style.optionBtn}>
          <Button
            type='text'
            onClick={() => openEditModal(record)}
            icon={<IoSettingsOutline style={{ fontSize: '25px', color: '#007DF9' }} />}
          />
          <Button
            type='text'
            onClick={() => openChangeParentModal(record)}
            icon={<FaRegUser style={{ fontSize: '23px', color: '#C89333' }} />}
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

  return !user ? <div>Error</div> : (
    <>
      <CreateChildModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
        form={form}
      />

      <EditChildModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onEdit={handleEdit}
        form={editform}
      // child={selectedChild}
      />

      <ChangeParentChildModal
        open={changeParentOpen}
        onClose={() => setChangeParentOpen(false)}
        onEdit={handleChangeParent}
        form={changeParentform}
      // child={selectedChild}
      />

      <Card style={{ width: '100%' }}>
        <div className={style.head} style={{ padding: '10px 30px 0 30px' }}>
          {contextHolder}
          <h2>จัดการบุตร ({user.firstname} {user.lastname})</h2>

          <button
            type="button"
            className="btn btn-outline-success "
            onClick={() => { setCreateOpen(true) }}
          >
            เพิ่มบุตร
          </button>

        </div>

        <Divider />

        <div style={{ padding: '0px 30px' }}>
          <Table
            columns={columns}
            dataSource={childs}
            rowKey="id"
          />
        </div>

      </Card>
    </>
  )
}

export default ChildrenManager