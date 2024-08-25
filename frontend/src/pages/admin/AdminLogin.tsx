import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, message } from 'antd';
import Logo from "../../assets/SUTHLOGO-01.png"
import "../../styles/admin/adminLogin.css"
import { login } from "../../services/admin/authService"
import { LoginAdminInterface } from '../../interfaces/Iauth';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const handleLogin = async (values: LoginAdminInterface) => {
        try {
            await login(values);
            successAlert();
            setTimeout(() => {
                navigate("/admin");
            }, 1000);
        } catch (error) {
            failAlert();
            console.error(error);
        }
    };

    const successAlert = () => {
        messageApi.open({
            type: 'success',
            content: 'ล็อกอินสำเร็จ',
        });
    };

    const failAlert = () => {
        messageApi.open({
            type: 'error',
            content: 'รหัสผ่าน/อีเมล ไม่ถูกต้อง',
        });
    };

    return (
        <>
            <div className="login-root">
                <div className="content">
                    <Card style={{ width: 400 }}>
                        <div className="login-container">
                            <div className="login-text">
                                Admin Login
                            </div>
                            <div className="admin-logo-login">
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
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon custom-login-icon" />} placeholder="email" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon custom-login-icon" />}
                                        type="password"
                                        placeholder="password"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <center>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                Login Admin
                                            </Button>
                                        </Form.Item>
                                    </center>
                                    {/* <center>
                                        <a className="login-form-forgot text-decoration-none" href="">
                                            Forgot password
                                        </a>
                                    </center> */}
                                </Form.Item>


                            </Form>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default AdminLogin