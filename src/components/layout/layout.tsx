import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useAuth } from '../../context/auth-context';
import useProjects from '../../hooks/use-projects';
import HeaderBlock from '../header/header';

const { Content, Footer, Sider } = Layout;

interface ILayoutComponent {
    children: ReactNode
}

const LayoutComponent: React.FC<ILayoutComponent> = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);
    const { role } = useAuth();
    const navigate = useNavigate();
    const { data } = useProjects();

    const items = [{
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: `Все проекты`,
        onClick: () => navigate('/')
    }]

    if (role === 'admin') {
        items.push({
            key: 'contractors',
            icon: <TeamOutlined />,
            label: `Сотрудники`,
            onClick: () => navigate('/contractors')
        }, {
            key: 'clients',
            icon: <TeamOutlined />,
            label: `Клиенты`,
            onClick: () => navigate('/clients')
        })
    }

    data?.data?.map(project => {
        const item = {
            key: 'project-' + project.id,
            icon: <></>,
            label: project.title,
            onClick: () => navigate(`/project/${project.id}`)
        }

        items.push(item);
    })

    return (
        <Layout className="min-h-[100vh]">
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                collapsed={collapsed} onCollapse={setCollapsed}
            >
                <div className="flex justify-center mb-10 demo-logo-vertical">
                    <img src="/images/logo.png" alt="" className="max-h-40" />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout className="flex flex-col">
                <HeaderBlock />
                <Content className="mt-6 mx-4 flex-auto ">
                    <div className="h-full p-3 lg:p-6"
                        style={{
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Some Development ©{new Date().getFullYear()} Created by Some Development
                </Footer>
            </Layout>
        </Layout>
    );
};

export default LayoutComponent;