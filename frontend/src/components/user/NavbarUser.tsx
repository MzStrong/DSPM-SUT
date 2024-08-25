import React, { useState } from 'react';
import "../../styles/navbar.css"
import { Button, Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { MdChecklistRtl } from 'react-icons/md';
import { RiDashboard2Line } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa6';
import { IoLogOutOutline } from 'react-icons/io5';
// import { useAdmin } from '../../middlewares/AdminRequireAuth';
import { useUser } from '../../middlewares/UserRequireAuth';

const { Header, Sider, Content } = Layout;

const NavbarUser: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { User } = useUser();

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className='logo'>
                    <div className="logo-icon">
                        DSPM
                    </div>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<RiDashboard2Line />}>
                        <Link className="text-decoration-none" to="/">หน้าแรก</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<MdChecklistRtl />}>
                        <Link className="text-decoration-none" to="/evaluation">แบบทดสอบ</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FaRegUser />}>
                        <Link className="text-decoration-none" to="/account">จัดการบัญชี</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="header" >
                    <Button
                        type='text'
                        onClick={toggle}
                        icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: '24px' }} /> :
                            <MenuFoldOutlined style={{ fontSize: '24px' }} />}
                    />
                    <div className="rightHead">
                        <div className='headName'>
                            {User ? `${User.firstname} ${User.lastname}` : 'Unknown User'}
                        </div>

                        <Button
                            type='text'
                            onClick={handleLogout}
                            icon={<IoLogOutOutline style={{ fontSize: '30px', color: '#C82333' }} />}
                        />
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
                    {/* {children} */}
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default NavbarUser;
