import { Avatar, Button, Dropdown, Menu, Space } from "antd"
import Sider from "antd/es/layout/Sider"
import { useAppSelector } from "../../../store/hooks"
import { PiNotePencil } from "react-icons/pi"
import ConditionalRender from "../../../components/shared/ConditionalRender"
import { useEffect, useState } from "react"
import CreateNewChat from "./CreateNewChat"
import { Bot } from "lucide-react"
import { IoIosLogOut } from "react-icons/io"
import ChatList from "./ChatList"

const Sidebar = () => {
    const { utils,user } = useAppSelector((state) => state)
    const {sidebarCollapsed} = utils
    const [openNewChat, setOpenNewChat] = useState(false)
   
    const MenuSelect = (elem: any) => {
        if (elem.key == 'new_chat') {
            setOpenNewChat(true);
        }
    }

    const itemsq: any = [
        {
            label: '1st menu item',
            key: '1',
            // icon: <UserOutlined />,
        },
        {
            label: '2nd menu item',
            key: '2',
            // icon: <UserOutlined />,
        },
        {
            label: 'Log out',
            key: 'logout',
            icon: <IoIosLogOut size={20}/>,
        },
        
        {
            label: '4rd menu item',
            key: '4',
            // icon: <UserOutlined />,
            danger: true,
            disabled: true,
        },
    ];

    const menuProps = {
        items: itemsq,
        onClick: (e: any) => { },
    };

    return (
        <>
            <Sider width={250} trigger={null} theme="light" collapsible collapsed={sidebarCollapsed}>
                <div className="flex items-center space-x-3 demo-logo-vertical p-2 pl-5">
                    <div className="demo-logo-vertical bg-blue-500 rounded-full p-2">
                        <Bot className="text-xl text-white" />
                    </div>
                    <ConditionalRender condition={() => !sidebarCollapsed}>
                        <h1 className="text-xl font-semibold text-gray-800">RAG.AI</h1>
                    </ConditionalRender>
                </div>

                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={openNewChat ? ["new_chat"] : []}
                    onSelect={MenuSelect}
                    defaultSelectedKeys={[]}
                    items={[
                        {
                            key: 'new_chat',
                            icon: <PiNotePencil size={20} />,
                            label: 'New Chat',
                        }
                    ]}
                />

                <ChatList/>

                <Dropdown menu={menuProps}>
                    <div className="flex items-center gap-2 space-x-3 demo-logo-vertical p-2 pl-5">
                        <Avatar src={user.profileImage} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}/>
                        <ConditionalRender condition={() => !sidebarCollapsed}>
                            <div className="font-semibold text-gray-800">{user.name}</div>
                        </ConditionalRender>
                    </div>
                </Dropdown>
            </Sider>
            <ConditionalRender condition={() => openNewChat}>
                <CreateNewChat open={openNewChat} setClose={() => setOpenNewChat(false)} />
            </ConditionalRender>
        </>
    )
}

export default Sidebar