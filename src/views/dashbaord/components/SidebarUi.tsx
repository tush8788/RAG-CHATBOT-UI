import { Avatar, Button, Dropdown, Menu, Space } from "antd"
import Sider from "antd/es/layout/Sider"
import { useAppSelector } from "../../../store/hooks"
import { PiNotePencil } from "react-icons/pi"
import ConditionalRender from "../../../components/shared/ConditionalRender"
import { useState } from "react"
import CreateNewChat from "./CreateNewChat"
import { Bot } from "lucide-react"
import Meta from "antd/es/card/Meta"
import { IoIosLogOut } from "react-icons/io"


const items: any = [
    //   {
    //     key: 'sub1',
    //     label: 'Navigation One',
    //     icon: <MailOutlined />,
    //     children: [
    //       {
    //         key: 'g1',
    //         label: 'Item 1',
    //         type: 'group',
    //         children: [
    //           { key: '1', label: 'Option 1' },
    //           { key: '2', label: 'Option 2' },
    //         ],
    //       },
    //       {
    //         key: 'g2',
    //         label: 'Item 2',
    //         type: 'group',
    //         children: [
    //           { key: '3', label: 'Option 3' },
    //           { key: '4', label: 'Option 4' },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     key: 'sub2',
    //     label: 'Navigation Two',
    //     icon: <AppstoreOutlined />,
    //     children: [
    //       { key: '5', label: 'Option 5' },
    //       { key: '6', label: 'Option 6' },
    //       {
    //         key: 'sub3',
    //         label: 'Submenu',
    //         children: [
    //           { key: '7', label: 'Option 7' },
    //           { key: '8', label: 'Option 8' },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     type: 'divider',
    //   },
    //   {
    //     key: 'sub4',
    //     label: 'Navigation Three',
    //     icon: <SettingOutlined />,
    //     children: [
    //       { key: '9', label: 'Option 9' },
    //       { key: '10', label: 'Option 10' },
    //       { key: '11', label: 'Option 11' },
    //       { key: '12', label: 'Option 12' },
    //     ],
    //   },
    {
        key: 'grp',
        label: 'Chats',
        type: 'group',
        children: [
            { key: '13', label: 'Option 13' },
            { key: '14', label: 'Option 14' },
            { key: '13', label: 'Option 13' },
            { key: '14', label: 'Option 14' },
            { key: '13', label: 'Option 13' },
            { key: '14', label: 'Option 14' },
            { key: '13', label: 'Option 13' },
            { key: '14', label: 'Option 14' },
            { key: '13', label: 'Option 13' },
            { key: '14', label: 'Option 14' },
            { key: '13', label: 'Option 13' },
            { key: '14', label: 'Option 14' },
            { key: '13', label: 'Option 13' },
            { key: '14', label: 'Option 14' },
            { key: '13', label: 'Option 13' },
            { key: '14', label: 'Option 14' },
        ],
    },
];


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

                <Menu
                    // onClick={onClick}
                    // style={{ width: 256 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                    className="max-h-[79vh] overflow-y-auto"
                />

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