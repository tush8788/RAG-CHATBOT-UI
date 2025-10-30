import { useEffect, useRef, useState } from "react";
import { Send, User, Bot } from 'lucide-react';
import useSocket from "../../utils/hooks/useSocket";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Avatar } from "antd";
import ReactMarkdown from "react-markdown";
import { updateChatList, updateCreateMindmap, updateCreateNewChat } from "../../store/slice/dashboardSlice";

type MessageType = {
    role: 'user' | 'model' | 'error',
    text: string,
}

type FirstChatObj = {
    chatId: string
    title: string
    message: MessageType
}

const ChatUi = () => {
    const { chatId = '' } = useParams();
    const { mode } = useAppSelector((state) => state.utils.theme)
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch();
    const { Socket, makeEvent } = useSocket(chatId);
    const { createNewChat, chatList } = useAppSelector((state) => state.dashboard)

    useEffect(() => {
        if (createNewChat) setIsTyping(true);
        Socket?.on('chat_history', (allMessages: MessageType[]) => {
            setMessages(allMessages)
        })

        Socket?.on('ai_message', (messageObj: MessageType) => {
            setMessages((prev) => [...prev, messageObj])
            setIsTyping(false);
        })

        Socket?.on('first_chat', (firstChatObj: FirstChatObj) => {
            let upChatList = chatList.map((chatL) => {
                if (chatL.chatId != firstChatObj.chatId) return chatL;
                else return {
                    ...chatL,
                    title: firstChatObj.title
                }

            })
            dispatch(updateChatList(upChatList))
            dispatch(updateCreateNewChat(false));
            setMessages((prev) => [...prev, firstChatObj.message])
            setIsTyping(false);
        })

        Socket?.on('first_chat_done', () => {
            dispatch(updateCreateMindmap(false))
        })

    }, [Socket])

    const [messages, setMessages] = useState<MessageType[]>([]);

    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<any>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e: Event) => {
        e.preventDefault();

        if (inputMessage.trim() === '') return;

        const userMessage: MessageType = {
            role: 'user',
            text: inputMessage,
        };

        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);
        makeEvent('user_message', { message: inputMessage })
        setInputMessage('');
    };


    return (
        <>
            <div className={` flex flex-col h-full  ${mode == 'dark' && '!bg-black'}`}>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role == 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.role == 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                <div className="flex-shrink-0">
                                    {message.role == 'user' ? (
                                        <div className="rounded-full p-1.5">
                                            <Avatar size={35} src={user.profileImage} icon={<User className="text-lg text-white" />} />
                                        </div>
                                    ) : (
                                        <div className="bg-blue-500 rounded-full p-1.5">
                                            <Bot className="text-lg text-white" />
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`rounded-2xl px-4 py-2 ${message.role == 'user'
                                        ? 'bg-blue-500 text-white rounded-br-sm'
                                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed">
                                        <ReactMarkdown>
                                            {message.text || ''}
                                        </ReactMarkdown>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                                <div className="flex-shrink-0">
                                    <div className="bg-blue-500 rounded-full p-1.5">
                                        <Bot className="text-lg text-white" />
                                    </div>
                                </div>
                                <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-sm shadow-sm px-4 py-3">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <div className={`bg-white border-t border-gray-200 px-6 py-4 ${mode == 'dark' && 'border-none !bg-[#141414]'}`}>
                    <div className="flex items-center space-x-3">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your message here..."
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={isTyping}
                                onKeyDown={(e: any) => {
                                    if (e.key === 'Enter') {
                                        handleSendMessage(e);
                                    }
                                }}
                            />
                        </div>
                        <button
                            onClick={(e: any) => handleSendMessage(e)}
                            disabled={inputMessage.trim() === '' || isTyping}
                            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors duration-200"
                        >
                            <Send className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatUi