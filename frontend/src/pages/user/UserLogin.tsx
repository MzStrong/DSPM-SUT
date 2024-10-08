import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import Logo from "../../assets/SUTHLOGO-01.png"
import "../../styles/user/userLogin.css"
import { login } from "../../services/user/authService"
import { LoginAdminInterface } from '../../interfaces/Iauth';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const handleLogin = async (values: LoginAdminInterface) => {
        try {
            await login(values);
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
            content: 'Login successful',
        });
    };

    const failAlert = () => {
        messageApi.open({
            type: 'error',
            content: 'Invalid email or password',
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
            <div className="login-root">
                <div className="content">
                    <Card style={{ width: 400 }}>
                        <div className="login-container">
                            <div className="logo-login">
                                <img src={Logo} alt="" style={{ width: '150px' }} />
                            </div>
                            {contextHolder}
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={handleLogin}
                            >
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
                                        prefix={<UserOutlined className="site-form-item-icon custom-login-icon" />}
                                        maxLength={13} // Prevent more than 13 characters from being entered
                                        onChange={handleCardIDChange}
                                        onInput={handleCardIDChange} // Additional event handling for input
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'กรุณาป้อนรหัสผ่าน!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined
                                            className="site-form-item-icon custom-login-icon" />}
                                        type="password"
                                        placeholder="รหัสผ่าน"
                                    />
                                </Form.Item>

                                {/* BTN */}
                                <Form.Item className='btn-group'>
                                    <center>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                เข้าสู่ระบบ
                                            </Button>
                                        </Form.Item>
                                    </center>
                                    <center>
                                        <a className="login-form-forgot text-decoration-none" href="">
                                            ลืมรหัสผ่าน
                                        </a>
                                        &nbsp;หรือ&nbsp;
                                        <a className="login-form-forgot text-decoration-none" href="/register">
                                            ลงทะเบียน
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

export default UserLogin