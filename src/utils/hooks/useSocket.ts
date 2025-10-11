import { useEffect, useState } from "react";
import appConfig from "../app.config";
import { io, Socket as SocketIOClient } from "socket.io-client";
import { useAppSelector } from "../../store/hooks";
import useAuth from "./useAuth";

const SOCKET_SERVER_URL = appConfig.apiUrl.replace(/\/api\/?$/, "");

const useSocket = (chatId: string) => {
    const {signOut} = useAuth()
    const [Socket, setSocket] = useState<SocketIOClient | null>(null);
    const { token } = useAppSelector((state) => state.user);
    useEffect(() => {
        if (!token) return;

        const newSocket = io(SOCKET_SERVER_URL, {
            auth: { token },
            query: { chatId: chatId },
            transports: ["websocket"],
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [token, chatId]);

    useEffect(() => {
        if (!Socket) return;

        const handleChatList = (data: any) => {
            console.log("chat list", data);
        };

        Socket.on("chat_list", handleChatList);

        Socket.on("connect_error", (err: any) => {
            if(err?.data?.code == 401){
                signOut();
            }
        });

        return () => {
            Socket.off("chat_list", handleChatList);
        };
    }, [Socket]);

    const makeEvent = (event: string, payload: any) => {
        Socket?.emit(event, payload);
    };

    return {
        Socket,
        makeEvent,
    };
}

export default useSocket