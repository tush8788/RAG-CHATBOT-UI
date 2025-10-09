import { Dropdown, Menu, Spin } from "antd"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getChatList, updateChatList } from "../../../store/slice/dashboardSlice";
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { deleteChat } from "../../../services/AiService";
import { cloneDeep } from "lodash";
import { LoadingOutlined } from '@ant-design/icons';
import { BsThreeDotsVertical } from "react-icons/bs";





const ChatList = ({ onSelect }: { onSelect: () => void }) => {
    const { chatList } = useAppSelector((state) => state.dashboard)
    const { sidebarCollapsed } = useAppSelector((state) => state.utils)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { chatId } = useParams();

    useEffect(() => {
        dispatch(getChatList());
    }, [])

    const DeleteChat = ({ chatIdInner }: { chatIdInner: string }) => {
        // const [open, setOpen] = useState(false)
        const [loading, setLoading] = useState(false)

        const onDeleteChat = async () => {
            try {
                setLoading(true);
                await deleteChat({ chatId: chatIdInner })
                let cloneChatList = cloneDeep(chatList);
                cloneChatList = cloneChatList.filter((c) => c.chatId != chatIdInner)
                // if (chatId == chatIdInner) {
                navigate('/');
                // }
                dispatch(updateChatList(cloneChatList));
                setLoading(false);
                // setOpen(false)
                onSelect();

            } catch (err) {
                setLoading(false);
                // setOpen(false)
                console.log("error", err);
            }
        }

        return (
            <>

                <Dropdown menu={{ items: [{ label: 'Delete', key: 'delete', icon: <MdDeleteOutline size={20} /> }], onClick: (key) => { onDeleteChat() } }}>
                    {loading ? <Spin indicator={<LoadingOutlined spin />} size="small" /> : <BsThreeDotsVertical />}
                </Dropdown>
            </>
        )
    }

    const items: any = [
        {
            key: 'grp',
            label: 'Chats',
            type: 'group',
            children: chatList.map((chat) => ({ key: chat.chatId, label: <div className="truncate">{chat.title}</div>, extra: <DeleteChat chatIdInner={chat.chatId} /> })),
        },
    ];

    const NavigatePage = (chat_id: string) => {
        console.log("window.location.pathname ==> ",)
        if (window.location.pathname.includes('mindmap'))
            navigate(`mindmap/${chat_id}`)
        else
            navigate(`chat/${chat_id}`)
    }

    return (
        <>
            <Menu
                defaultSelectedKeys={[`${chatId}`]}
                onSelect={(info) => { NavigatePage(info.key); onSelect(); }}
                mode="inline"
                inlineCollapsed={false}
                items={sidebarCollapsed ? [] : items}
                className="h-[79vh]  overflow-y-auto !bg-transparent !border-none"
            />
        </>
    )
}

export default React.memo(ChatList)