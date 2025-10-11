import { Button, theme } from "antd"
import { Header } from "antd/es/layout/layout"
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    WechatWorkOutlined,
} from '@ant-design/icons';
import { updateSidebarCollapsed } from "../../../store/slice/utilsSlice";
import { RiMindMap } from "react-icons/ri";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const HeaderUi = () => {
    const { utils } = useAppSelector((state) => state)
    const disptch = useAppDispatch()
    const { token: { colorBgContainer }, } = theme.useToken();
    const { chatId } = useParams();
    const navigate = useNavigate()
    const isMindMapShow = useMemo(() => { return window?.location?.pathname?.includes('mindmap') }, [chatId])
    const [isMindMap, setMindMap] = useState(isMindMapShow ? isMindMapShow :false)


    const showMindMap = () => {
        if (isMindMap) {
            setMindMap(false);
            navigate(`/chat/${chatId}`)
        } else {
            setMindMap(true);
            navigate(`/mindmap/${chatId}`)
        }

    }

    return (
        <Header style={{ padding: 0, background: colorBgContainer }} className={`flex justify-between w-full items-center !h-[52px] ${utils.theme.mode == 'light' && "border-b border-gray-200"}`}>
            <Button
                type="text"
                icon={utils.sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => disptch(updateSidebarCollapsed(!utils.sidebarCollapsed))}
                style={{
                    fontSize: '16px',
                    // width: 64, 
                    // height: 64,
                }}
            />
            {chatId &&
                <Button
                    type="dashed"
                    className="mr-4"
                    icon={isMindMap ? <WechatWorkOutlined /> : <RiMindMap size={21} />}
                    onClick={() => showMindMap()}
                    style={{
                        fontSize: '16px',
                        // height: 64,
                    }}
                >
                    {isMindMap ? 'Chat' : 'Mindmap'}
                </Button>
            }
        </Header>
    )
}

export default HeaderUi