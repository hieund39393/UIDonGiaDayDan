import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Sidebar from '~/components/sidebar/Sidebar';
import { Breadcrumb, Layout, Menu, theme, Avatar, Dropdown } from 'antd';
import logo from '~/images/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';

const { Content, Header, Sider } = Layout;

export { PrivateRoute };

function PrivateRoute({ children, title, parentTitle, currentUser, permissionCode }) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');

    if (
        accessToken == null ||
        currentUser.loggedIn !== true
        // || !currentUser.user.permissions.includes(permissionCode)
    ) {
        return <Navigate to="/login" />;
    }

    const logoutHandler = () => {
        localStorage.clear();
        navigate('/login');
    };

    const userMenu = (
        <Menu>
            <Menu.Item key="1">Thông tin tài khoản</Menu.Item>
            <Menu.Item key="2">Đổi mật khẩu</Menu.Item>
            <Menu.Item key="3" onClick={() => logoutHandler()}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );
    return (
        <Layout style={{ height: '100vh' }}>
            <Header
                className="header"
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                <div className="logo header-left">
                    <span className="logo" onClick={() => navigate('/')}>
                        <img style={{ width: 145 }} src={logo} alt="logo" />
                    </span>
                    <span className="top-bar-title">HỆ THỐNG TỰ ĐỘNG CẬP NHẬT ĐƠN GIÁ DÂY DẪN SAU CÔNG TƠ</span>
                </div>

                <div className="header-right">
                    <span className="user-name">Admin</span>
                    <Dropdown overlay={userMenu} trigger={['hover']}>
                        <Avatar icon={<UserOutlined />} className="user-avatar" />
                    </Dropdown>
                </div>
            </Header>
            <Layout>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    style={{
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        maxWidth: '260px',
                    }}
                    width={250}
                >
                    <Sidebar />
                </Sider>
                <Layout className="site-layout">
                    <Content
                        style={{
                            overflowBlock: 'auto',
                            margin: '10px 10px 5px 10px',
                            padding: '20px 5px 0px 15px',
                            minHeight: 280,
                            background: colorBgContainer,
                            boxShadow: '4px 2px 8px rgba(0, 0, 0, 0.15)',
                            height: 'calc(100vh - 80px)',
                        }}
                    >
                        <div className="nav-breadcrumb">
                            <Breadcrumb>
                                <Breadcrumb.Item style={{ marginLeft: 7, color: 'black' }}>
                                    {parentTitle}
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    <a href="#" style={{ marginLeft: 4, color: 'black' }}>
                                        {title}
                                    </a>
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
