import { Menu, Popconfirm } from "antd"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getChatList, updateChatList } from "../../../store/slice/dashboardSlice";
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { deleteChat } from "../../../services/AiService";
import { cloneDeep } from "lodash";
import { QuestionCircleOutlined } from '@ant-design/icons';





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
        const [open, setOpen] = useState(false)
        const [loading, setLoading] = useState(false)

        const onDeleteChat = async () => {
            try {
                setLoading(true);
                await deleteChat({ chatId: chatIdInner })
                let cloneChatList = cloneDeep(chatList);
                cloneChatList = cloneChatList.filter((c) => c.chatId != chatIdInner)
                if (chatId == chatIdInner) {
                    navigate('/');
                }
                dispatch(updateChatList(cloneChatList));
                setLoading(false);
                setOpen(false)
                onSelect();

            } catch (err) {
                setLoading(false);
                setOpen(false)
                console.log("error", err);
            }
        }

        return (<>
            <Popconfirm
                title="Delete the chat"
                description="Are you sure to delete this chat?"
                open={open}
                onConfirm={onDeleteChat}
                okButtonProps={{ loading: loading }}
                onCancel={() => setOpen(false)}
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
                <div
                    className="absolute top-3 right-1 backdrop-blur-md"
                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); setOpen(true) }}
                >
                    <MdDeleteOutline size={20} />
                </div>
            </Popconfirm>
        </>)
    }

    const items: any = [
        {
            key: 'grp',
            label: 'Chats',
            type: 'group',
            children: chatList.map((chat) => ({ key: chat.chatId, label: chat.title, extra: <DeleteChat chatIdInner={chat.chatId} /> })),
        },
    ];

    const NavigatePage = (chat_id: string) => {
        navigate(`/chat/${chat_id}`)
    }

    return (
        <>
            <Menu
                defaultSelectedKeys={[`${chatId}`]}
                onSelect={(info) => { NavigatePage(info.key); onSelect(); }}
                mode="inline"
                inlineCollapsed={false}
                items={sidebarCollapsed ? [] : items}
                className="h-[79vh]  overflow-y-auto"
            />
        </>
    )
}

export default React.memo(ChatList)