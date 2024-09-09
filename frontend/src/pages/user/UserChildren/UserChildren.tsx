// import { Button, Card, Divider, message, Table } from "antd";
// import { useEffect, useState } from "react";
// import { AiOutlineDelete } from "react-icons/ai";
// import { FaYoutube } from "react-icons/fa6";
// import { IoSettingsOutline } from "react-icons/io5";

// const UserChildren = () => {
//   const [messageApi, contextHolder] = message.useMessage();
//   const [evaluations, setEvaluations] = useState<EvaluationInterface[]>([])
//   // const [selectedEvaluation, setSelectedEvaluation] = useState<EvaluationInterface | null>(null);
//   const [createOpen, setCreateOpen] = useState(false)
//   const [editOpen, setEditOpen] = useState(false)
//   const [refresh, setRefresh] = useState(false);
//   const [form] = Form.useForm();
//   const [editform] = Form.useForm();

//   useEffect(() => {
//     document.title = "DSPM - Evaluation";
//     return () => {
//       document.title = "DSPM";
//     };
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getEvaluations();
//       setEvaluations(res)
//     }
//     fetchData();
//   }, [refresh]);

//   const handleCreate = async (values: EvaluationInterface) => {
//     try {
//       await createEvaluation(values);
//       messageApi.open({
//         type: 'success',
//         content: 'สร้าง Evaluation เรียบร้อย',
//       });
//       setCreateOpen(false)
//       form.resetFields()
//       setRefresh(!refresh)

//     } catch (error) {
//       console.log(error);
//       messageApi.open({
//         type: 'error',
//         content: 'สร้างไม่สำเร็จ',
//       });
//     }
//   }

//   const handleEdit = async (values: EvaluationInterface) => {
//     try {
//       await editEvaluation(editform.getFieldValue('id'), values);
//       messageApi.open({
//         type: 'success',
//         content: 'อัปเดต Evaluation เรียบร้อย',
//       });
//       setEditOpen(false);
//       editform.resetFields();
//       setRefresh(!refresh);
//     } catch (error) {
//       console.log(error);
//       messageApi.open({
//         type: 'error',
//         content: 'อัปเดตไม่สำเร็จ',
//       });
//     }
//   };

//   const handleDelete = async (id: number, skill: string) => {
//     Modal.confirm({
//       title: 'ลบ Evaluation ใช่ไหม?',
//       content: `ทักษะ : ${skill} ?`,
//       okText: 'ลบ',
//       okType: 'danger',
//       cancelText: 'ยกเลิก',
//       onOk: async () => {
//         try {
//           await deleteEvaluation(id);
//           messageApi.open({
//             type: 'success',
//             content: 'ลบ Evaluation แล้ว',
//           });
//           setRefresh(!refresh)
//         } catch (error) {
//           console.error('Delete error:', error);
//           messageApi.open({
//             type: 'error',
//             content: 'ลบ Evaluation ไม่สำเร็จ',
//           });
//         }
//       }, onCancel() {
//       },
//     });
//   }

//   // const toggleStatus = async (id: number, status: boolean) => {
//   //   try {
//   //     await updateEvaluationStatus(id, status);
//   //     messageApi.open({
//   //       type: 'success',
//   //       content: 'อัปเดตสถานะ Evaluation เรียบร้อย',
//   //     });
//   //     setRefresh(!refresh);
//   //   } catch (error) {
//   //     console.error('Update status error:', error);
//   //     messageApi.open({
//   //       type: 'error',
//   //       content: 'อัปเดตสถานะไม่สำเร็จ',
//   //     });
//   //   }
//   // };

//   const openEditModal = (evaluation: EvaluationInterface) => {
//     // setSelectedEvaluation(evaluation);
//     editform.setFieldsValue(evaluation);
//     setEditOpen(true);
//   };

//   const columns = [
//     {
//       title: 'อายุ (เดือน)',
//       key: 'age',
//       align: 'center' as const,
//       width: 150,
//       render: (record: { start_age_months: number; to_age_months: number }) =>
//         <div>
//           {`${record.start_age_months === record.to_age_months ?
//             `${record.start_age_months === 0 ? 'แรกเกิด' : record.start_age_months}` :
//             `${record.start_age_months === 0 ? 'แรกเกิด' : record.start_age_months} - ${record.to_age_months}`
//             }`}
//         </div>,
//     },
//     {
//       title: 'ทักษะ',
//       dataIndex: 'skill',
//       key: 'skill',
//       align: 'center' as const,
//       // width: 200,
//       render: (text: string) => <div style={{ textAlign: 'left' }}>{text}</div>,
//     },
//     // {
//     //   title: 'วิธีประเมิน',
//     //   dataIndex: 'evaluation_method',
//     //   key: 'evaluation_method',
//     //   align: 'center' as const,
//     //   ellipsis: true,
//     //   // render: (text: string) => <div style={{ textAlign: 'left'}}>{text}</div>,
//     // },
//     // {
//     //   title: 'วิธีฝึกทักษะ',
//     //   dataIndex: 'practice_skills',
//     //   key: 'practice_skills',
//     //   align: 'center' as const,
//     //   ellipsis: true,
//     //   // render: (text: string) => <div style={{ textAlign: 'left'}}>{text}</div>,
//     // },
//     {
//       title: 'วิดีโอ',
//       dataIndex: 'link_video',
//       key: 'practice_skills',
//       align: 'center' as const,
//       ellipsis: true,
//       width: 80,
//       render: (text: string) => (
//         <Button
//           type="text"
//           style={{ color: 'red', fontSize: '30px' }}
//           onClick={() => window.open(text, '_blank')}
//           icon={<FaYoutube className={style.optionBtn} style={{ alignItems: 'center' }} />}
//         />
//       ),
//     },
//     {
//       title: 'การจัดการ',
//       key: 'action',
//       width: 150,
//       render: (_: string, record: EvaluationInterface) => (
//         <div className={style.optionBtn}>
//           <Button
//             type='text'
//             onClick={() => openEditModal(record)}
//             icon={<IoSettingsOutline style={{ fontSize: '25px', color: '#007DF9' }} />}
//           />
//           <Button
//             type='text'
//             onClick={() => handleDelete(record.id, record.skill)}
//             icon={<AiOutlineDelete style={{ fontSize: '25px', color: '#C82333' }} />}
//           />
//         </div>
//       ),
//       align: 'center' as const,
//     },
//   ];

//   return (
//     <>
//       {/* <CreateEvaluationModal
//         open={createOpen}
//         onClose={() => setCreateOpen(false)}
//         onCreate={handleCreate}
//         form={form}
//       /> */}

//       {/* <EditEvaluationModal
//         open={editOpen}
//         onClose={() => setEditOpen(false)}
//         onEdit={handleEdit}
//         form={editform}
//       // evaluation={selectedEvaluation}
//       /> */}
//       <Card style={{ width: '100%' }}>
//         <div className={style.head}>
//           {contextHolder}
//           <h2>Evaluation</h2>

//           <button
//             type="button"
//             className="btn btn-outline-success "
//             onClick={() => { setCreateOpen(true) }}
//           >
//             สร้าง Evaluation
//           </button>

//         </div>

//         <Divider />

//         <div style={{ padding: '0px 30px' }}>
//           <Table
//             columns={columns}
//             dataSource={evaluations}
//             rowKey="id" // กำหนด key สำหรับแต่ละแถว
//           />
//         </div>

//       </Card>
//     </>
//   )
// }

// export default UserChildren


function UserChildren() {
  return (
    <div>UserChildren</div>
  )
}

export default UserChildren