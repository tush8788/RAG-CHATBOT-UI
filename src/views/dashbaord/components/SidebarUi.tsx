import { Avatar, Drawer, Dropdown, Grid, Menu, Typography } from "antd"
import Sider from "antd/es/layout/Sider"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { PiNotePencil } from "react-icons/pi"
import ConditionalRender from "../../../components/shared/ConditionalRender"
import { useState } from "react"
import CreateNewChat from "./CreateNewChat"
import { Bot } from "lucide-react"
import { IoIosHelpCircleOutline, IoIosLogOut } from "react-icons/io"
import ChatList from "./ChatList"
import { updateSidebarCollapsed, updateThemeMode } from "../../../store/slice/utilsSlice"
import { GoMoon, GoSun } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6"
import useAuth from "../../../utils/hooks/useAuth"
import { useNavigate } from "react-router-dom"

const InnerElements = ({ sidebarCollapsed, openNewChat, MenuSelect, menuProps, user, type, onClose,theme }: any) => {
    return ( 
        <div className={`${(type =='desktop' && theme.mode=='light') ? "border-r border-gray-200 bg-[#F9F9F9]": (type =='desktop' && theme.mode=='dark') ? 'bg-[#1b1b1b]':''} h-full`}>
            <div className="flex items-center space-x-3 demo-logo-vertical p-2 pl-5">
                <div className="demo-logo-vertical bg-blue-500 rounded-full p-2">
                    <Bot className="text-xl text-white" size={20}/>
                </div>
                <ConditionalRender condition={() => !sidebarCollapsed}>
                    <Typography.Title level={5} className="text-xl font-semibold text-gray-800 !mb-0">RAG.AI</Typography.Title>
                </ConditionalRender>
            </div>

            <Menu
                theme="light"
                mode="inline"
                className={`!border-none !bg-transparent`}
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

            <ChatList onSelect={() => { type == 'mobile' && onClose() }} />

            <Dropdown menu={menuProps}>
                <div className="flex items-center gap-2 space-x-3 demo-logo-vertical p-2 pl-5 cursor-pointer">
                    <Avatar src={user.profileImage} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}/>
                    <ConditionalRender condition={() => !sidebarCollapsed}>
                        <Typography.Paragraph className="!mb-0">{user.name}</Typography.Paragraph>
                    </ConditionalRender>
                </div>
            </Dropdown>
        </div>
    )
}


const Sidebar = () => {
    const { utils, user } = useAppSelector((state) => state)
    const { sidebarCollapsed,theme } = utils
    const [openNewChat, setOpenNewChat] = useState(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { signOut } = useAuth()
    const { useBreakpoint } = Grid;

    const MenuSelect = (elem: any) => {
        if (elem.key == 'new_chat') {
            // setOpenNewChat(true);
            navigate('/')
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
            label: theme.mode == 'dark' ? 'Light' : 'Dark',
            key: 'theme',
            icon: theme.mode == 'dark' ? <GoSun size={20} /> : <GoMoon size={20} />,
        },
        {
            label: 'Help',
            key: 'help',
            icon: <IoIosHelpCircleOutline size={23} />,
        },
        {
            label: 'Log out',
            key: 'logout',
            icon: <IoIosLogOut size={20} />,
        },
    ];

    const menuProps = {
        items: itemsq,
        onClick: (e: any) => {
            switch (e.key) {
                case 'logout':
                    signOut();
                    break;
                case 'theme':
                    let themeMode = utils.theme.mode == 'dark' ? 'light' : 'dark';
                    dispatch(updateThemeMode(themeMode))
                    break;
                case 'help':
                    return window.open('https://portfolio-nu-wheat-87.vercel.app/')
                    break;
            }
        },
    };

    return (
        <>
            <ConditionalRender condition={() => useBreakpoint()?.xs == true}>
                <Drawer
                    placement={'left'}
                    closable={false}
                    onClose={() => { console.log("called"); dispatch(updateSidebarCollapsed(!sidebarCollapsed)) }}
                    width={300}
                    className="[&>div]:!p-0"
                    open={!sidebarCollapsed}
                    key={'left'}
                >
                    <InnerElements
                        sidebarCollapsed={sidebarCollapsed}
                        openNewChat={openNewChat}
                        MenuSelect={MenuSelect}
                        menuProps={menuProps}
                        user={user}
                        className="!cursor-pointer"
                        type='mobile'
                        onClose={() => { dispatch(updateSidebarCollapsed(!sidebarCollapsed)) }}
                        theme={theme}
                    />
                </Drawer>
            </ConditionalRender>
            <ConditionalRender condition={() => useBreakpoint()?.xs != true}>
                <Sider width={250} trigger={null} theme="light" collapsible collapsed={sidebarCollapsed}>
                    <InnerElements
                        sidebarCollapsed={sidebarCollapsed}
                        openNewChat={openNewChat}
                        MenuSelect={MenuSelect}
                        menuProps={menuProps}
                        user={user}
                        type='desktop'
                        onClose={() => { }}
                        theme={theme}
                    />
                </Sider>
            </ConditionalRender>
            <ConditionalRender condition={() => openNewChat}>
                <CreateNewChat open={openNewChat} setClose={() => setOpenNewChat(false)} />
            </ConditionalRender>
        </>
    )
}

export default Sidebar