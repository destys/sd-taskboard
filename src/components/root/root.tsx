import { Outlet } from 'react-router-dom'
import LayoutComponent from '../layout/layout'
import { useAuth } from '../../context/auth-context';
import LoginPage from '../../pages/login-page/login-page';


const Root = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <LayoutComponent>
            <Outlet />
        </LayoutComponent>
    ) : (
        <LoginPage />
    );
}

export default Root