import { Avatar, Dropdown, Menu, Typography } from "antd"
import Sider from "antd/es/layout/Sider"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { PiNotePencil } from "react-icons/pi"
import ConditionalRender from "../../../components/shared/ConditionalRender"
import { useState } from "react"
import CreateNewChat from "./CreateNewChat"
import { Bot } from "lucide-react"
import { IoIosLogOut } from "react-icons/io"
import ChatList from "./ChatList"
import { updateThemeMode } from "../../../store/slice/utilsSlice"
import { GoMoon, GoSun } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6"
import useAuth from "../../../utils/hooks/useAuth"


const Sidebar = () => {
    const { utils,user } = useAppSelector((state) => state)
    const {sidebarCollapsed} = utils
    const [openNewChat, setOpenNewChat] = useState(false)
    const dispatch = useAppDispatch()
    const {signOut} = useAuth()
   
    const MenuSelect = (elem: any) => {
        if (elem.key == 'new_chat') {
            setOpenNewChat(true);
        }
    }

    const itemsq: any = [
        {
            label: 'Profile',
            key: 'profile',
            icon: <FaRegUser />,
            disabled: true,
        },
        {
            label: utils.theme.mode == 'dark'? 'Light' : 'Dark',
            key: 'theme',
            icon: utils.theme.mode == 'dark' ?<GoSun size={20}/> :<GoMoon size={20}/>,
            onclick:()=>{console.log("clieck")}
        },
        {
            label: 'Log out',
            key: 'logout',
            icon: <IoIosLogOut size={20}/>,
        },
        
        // {
        //     label: '4rd menu item',
        //     key: '4',
        //     // icon: <UserOutlined />,
        //     danger: true,
        //     disabled: true,
        // },
    ];

    const menuProps = {
        items: itemsq,
        onClick: (e: any) => { 
            switch(e.key){
                case 'logout':
                    signOut();
                    break;
                case 'theme':
                    let themeMode = utils.theme.mode == 'dark' ? 'light' : 'dark';
                    dispatch(updateThemeMode(themeMode))
                    break;
            }
         },
    };

    return (
        <>
            <Sider width={250} trigger={null} theme="light" collapsible collapsed={sidebarCollapsed}>
                <div className="flex items-center space-x-3 demo-logo-vertical p-2 pl-5">
                    <div className="demo-logo-vertical bg-blue-500 rounded-full p-2">
                        <Bot className="text-xl text-white" />
                    </div>
                    <ConditionalRender condition={() => !sidebarCollapsed}>
                        <Typography.Title level={4} className="text-xl font-semibold text-gray-800 !mb-0">RAG.AI</Typography.Title>
                        {/* <h1 className="text-xl font-semibold text-gray-800">RAG.AI</h1> */}
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

                <ChatList />

                <Dropdown menu={menuProps}>
                    <div className="flex items-center gap-2 space-x-3 demo-logo-vertical p-2 pl-5">
                        <Avatar src={user.profileImage} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}/>
                        <ConditionalRender condition={() => !sidebarCollapsed}>
                            <Typography.Paragraph className="!mb-0">{user.name}</Typography.Paragraph>
                            {/* <div className="font-semibold text-gray-800">{user.name}</div> */}
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