import { Button, Card, Form, Input, message, Select } from 'antd';
import Logo from "../../assets/SUTHLOGO-01.png"
import "../../styles/user/userRegister.css"
import { register, getRegData } from "../../services/user/authService"
import { RegisterInterface } from '../../interfaces/Iauth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GenderInterface } from '../../interfaces/Igender';

const UserRegister = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [genders, setGenders] = useState<GenderInterface[]>([]);

    useEffect(() => {
        const getRegD = async () => {
            try {
                const regData = await getRegData();
                setGenders(regData.genders)
            } catch (error) {
                console.log(error);
            }
        }
        getRegD();

    }, []);

    const handleRegister = async (values: RegisterInterface) => {
        // console.log(values);

        try {
            await register(values);
            successAlert();
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            failAlert();
            console.error(error);
        }
    };

    const successAlert = () => {
        messageApi.open({
            type: 'success',
            content: 'ลงทะเบียนสำเร็จ',
        });
    };

    const failAlert = () => {
        messageApi.open({
            type: 'error',
            content: 'มีผู้ใช้ในระบบแล้ว',
        });
    };

    const handleCardIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        // Remove all non-digit characters
        const numericValue = input.replace(/\D/g, '');
        // Limit to 13 digits
        if (numericValue.length <= 13) {
            event.target.value = numericValue;
        }
    };

    return (
        <>
            <div className="register-root">
                <div className="content">
                    <Card style={{ width: 400 }}>
                        <div className="register-container">
                            <div className="logo-register">
                                <img src={Logo} alt="" style={{ width: '150px' }} />
                            </div>
                            {contextHolder}
                            <Form
                                name="normal_register"
                                className="register-form"
                                initialValues={{ remember: true }}
                                onFinish={handleRegister}
                            >
                                <div className='label-input'>เลขบัตรประชาชน :</div>
                                <Form.Item
                                    name="cardid"
                                    rules={[
                                        { required: true, message: 'กรุณากรอกเลขบัตรประชาชน!' },
                                        { len: 13, message: 'เลขบัตรประชาชนต้องมี 13 หลัก!' },
                                        // { pattern: /^\d{13}$/, message: 'เลขบัตรประชาชนต้องเป็นตัวเลขทั้งหมด!' }
                                    ]}
                                >
                                    <Input
                                        placeholder="เลขบัตรประชาชน"
                                        maxLength={13} // Prevent more than 13 characters from being entered
                                        onChange={handleCardIDChange}
                                        onInput={handleCardIDChange} // Additional event handling for input
                                    />
                                </Form.Item>

                                <div className='label-input'>รหัสผ่าน :</div>
                                <Form.Item
                                    name="password"
                                // rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน!' }]}
                                >
                                    <Input type='password' placeholder="รหัสผ่าน" />
                                </Form.Item>

                                <div className='label-input'>ชื่อ :</div>
                                <Form.Item
                                    name="firstname"
                                // rules={[{ required: true, message: 'กรุณากรอกชื่อ!' }]}
                                >
                                    <Input placeholder="ชื่อ" />
                                </Form.Item>

                                <div className='label-input'>นามสกุล :</div>
                                <Form.Item
                                    name="lastname"
                                // rules={[{ required: true, message: 'กรุณากรอกนามสกุล!' }]}
                                >
                                    <Input placeholder="นามสกุล" />
                                </Form.Item>

                                <div className='label-input'>อายุ :</div>
                                <Form.Item
                                    name="age"
                                // rules={[{ required: true, message: 'กรุณากรอกอายุ!' }]}
                                >
                                    <Select placeholder="Please select">
                                        {(() => {
                                            const options = [];
                                            for (let i = 18; i <= 80; i++) {
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

                                <div className='label-input'>เพศ :</div>
                                <Form.Item
                                    name="genderId"
                                    rules={[{ required: true, message: 'กรุณากรอก genderId!' }]}
                                >
                                    <Select placeholder="Please select">
                                        {genders.map((gender) => (
                                            <Select.Option key={gender.id} value={gender.id}>
                                                {gender.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <div className='label-input'>เบอร์โทร :</div>
                                <Form.Item
                                    name="telnum"
                                // rules={[{ required: true, message: 'กรุณากรอกเบอร์โทร!' }]}
                                >
                                    <Input placeholder="เบอร์โทร" />
                                </Form.Item>

                                <Form.Item>
                                    <center>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" className="register-form-button">
                                                Register
                                            </Button>
                                        </Form.Item>
                                    </center>
                                    <center>
                                        มีบัญชีแล้ว?&nbsp;
                                        <a className="login-form-forgot text-decoration-none" href="/login">
                                            เข้าสู่ระบบ
                                        </a>
                                    </center>

                                </Form.Item>


                            </Form>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default UserRegister