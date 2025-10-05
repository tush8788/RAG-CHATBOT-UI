import { Menu } from "antd"
import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getChatList, updateChatList } from "../../../store/slice/dashboardSlice";
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { deleteChat } from "../../../services/AiService";
import { cloneDeep } from "lodash";




const ChatList = () => {
    const { chatList } = useAppSelector((state) => state.dashboard)
    const { sidebarCollapsed } = useAppSelector((state) => state.utils)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { chatId } = useParams();

    useEffect(() => {
        dispatch(getChatList());
    }, [])

    const DeleteChat = ({ chatIdInner }: { chatIdInner: string }) => {
        return (
            <div
                className="absolute top-3 right-1"
                onClick={async (e) => {
                    try {
                        e.stopPropagation();
                        await deleteChat({ chatId: chatIdInner })
                        let cloneChatList = cloneDeep(chatList);
                        cloneChatList = cloneChatList.filter((c)=>c.chatId != chatIdInner)
                        if(chatId == chatIdInner){
                            navigate('/');
                        }
                        dispatch(updateChatList(cloneChatList));                        

                    } catch (err) {
                        console.log(err);
                    }

                }}>
                <MdDeleteOutline size={20} />
            </div>
        )
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
                onSelect={(info) => { NavigatePage(info.key); console.log(info) }}
                mode="inline"
                inlineCollapsed={false}
                items={sidebarCollapsed ? [] : items}
                className="h-[79vh]  overflow-y-auto"
            />
        </>
    )
}

export default React.memo(ChatList)