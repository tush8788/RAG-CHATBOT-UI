import { useEffect, useState } from "react";
import appConfig from "../app.config";
import { io, Socket as SocketIOClient } from "socket.io-client";
import { useAppSelector } from "../../store/hooks";

const SOCKET_SERVER_URL = appConfig.apiUrl.replace(/\/api\/?$/, "");

const useSocket = () => {

    const [Socket, setSocket] = useState<SocketIOClient | null>(null);
    const { token } = useAppSelector((state) => state.user);
    useEffect(() => {
        if (!token) return;

        const newSocket = io(SOCKET_SERVER_URL, {
            auth: { token },
            transports: ["websocket"],
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [token]);

    useEffect(() => {
        if (!Socket) return;

        const handleChatList = (data: any) => {
            console.log("chat list", data);
        };

        Socket.on("chat_list", handleChatList);

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