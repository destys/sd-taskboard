import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { useModalContext } from '../../context/modal-context';

const { Header } = Layout;

const HeaderBlock = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { showModal } = useModalContext();

    return (
        <Header className="flex justify-between items-center mx-4 px-3 lg:px-6 !rounded-t-none" style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
        }}>
            <Button onClick={() => showModal('NewProjectModal', {}, { title: "Новый проект" })}>Создать проект</Button>
            <div className="flex gap-2">
                <Button icon={<UserOutlined />} onClick={() => navigate('/profile')}>Профиль</Button>
                <Button icon={<LogoutOutlined />} danger onClick={logout}>Выход</Button>
            </div>
        </Header>
    )
}

export default HeaderBlock;