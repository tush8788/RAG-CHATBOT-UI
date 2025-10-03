import { Layout, theme } from 'antd';
import Sidebar from './components/SidebarUi';
import HeaderUi from './components/HeaderUi';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const Dashboard = () => {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    return (
        <>
            <Layout className='h-[100vh]'>
                <Sidebar />
                <Layout>
                    <HeaderUi />
                    <Content
                        style={{
                            margin: '24px 16px',
                            // padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default Dashboard