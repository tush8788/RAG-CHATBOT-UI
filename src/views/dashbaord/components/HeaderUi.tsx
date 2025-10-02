import { Button, theme } from "antd"
import { Header } from "antd/es/layout/layout"
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { updateSidebarCollapsed } from "../../../store/slice/utilsSlice";

const HeaderUi = () => {
    const { sidebarCollapsed } = useAppSelector((state) => state.utils)
    const disptch = useAppDispatch()
    const { token: { colorBgContainer }, } = theme.useToken();

    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
                type="text"
                icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => disptch(updateSidebarCollapsed(!sidebarCollapsed))}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </Header>
    )
}

export default HeaderUi