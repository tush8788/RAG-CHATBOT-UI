import { Menu } from "antd"
import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getChatList } from "../../../store/slice/dashboardSlice";
import { useNavigate, useParams } from "react-router-dom";




const ChatList = () => {
    const { chatList } = useAppSelector((state) => state.dashboard)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { chatId } = useParams(); // 👈 chatId comes from URL

    useEffect(() => {
        dispatch(getChatList());
    }, [])

    const items: any = [
        {
            key: 'grp',
            label: 'Chats',
            type: 'group',
            children: chatList.map((chat) => ({ key: chat.chatId, label: chat.title })),
        },
    ];

    const NavigatePage = (chatId: string) => {
        navigate(`/chat/${chatId}`)
    }

    return (
        <>
            <Menu
                defaultSelectedKeys={[`${chatId}`]}
                onSelect={(info) => { NavigatePage(info.key); console.log(info) }}
                mode="inline"
                items={items}
                className="h-[79vh] overflow-y-auto"
            />
        </>
    )
}

export default React.memo(ChatList)