import { Typography } from "antd"
import { useAppSelector } from "../../store/hooks"
import { FileText, Upload, Youtube } from "lucide-react";
import { useState } from "react";
import CreateChat from "./components/CreateChat";

export const chatTypes = [
    {
        id: 'article',
        title: 'Chat with Article',
        icon: FileText,
        placeholder: 'Enter or paste article URL',
        description: 'Paste a URL to any article or webpage'
    },
    {
        id: 'youtube',
        title: 'Chat with YouTube',
        icon: Youtube,
        placeholder: 'Enter YouTube video URL',
        description: 'Paste a YouTube video link'
    },
    {
        id: 'pdf',
        title: 'Chat with PDF',
        icon: Upload,
        placeholder: 'Upload PDF file',
        description: 'Upload a PDF document to chat with'
    }
];

const CreateNewChat = () => {
    const [chat,setChat] = useState<any>({
        isOpen:false,
        type:''
    })
    const { mode } = useAppSelector((state) => state.utils.theme)
    return (
        <div className={`h-full flex flex-1  ${mode == 'dark' && 'bg-black'}`}>
            <div className="flex-1 overflow-y-auto p-2">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center py-8">
                        <Typography.Title level={3} className="text-2xl font-semibold text-gray-800 mb-4">Start a New Conversation</Typography.Title>
                        <Typography.Paragraph className="!mb-8"> Choose how you'd like to chat </Typography.Paragraph>

                        <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
                            {chatTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => {setChat({isOpen:true,type:type.id})}}
                                        className=" border-2 border-gray-200 hover:border-blue-500 rounded-xl p-6 transition-all hover:shadow-lg group"
                                    >
                                        <div className="flex flex-col items-center space-y-3">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                                                <Icon className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                            </div>
                                            <div>
                                                <Typography.Title className="font-semibold mb-1" level={4}>{type.title}</Typography.Title>
                                                <Typography.Text className="text-sm text-gray-500">{type.description}</Typography.Text>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {chat.isOpen && <CreateChat open={chat.isOpen} selectedType={chat.type} setClose={()=>{setChat({isOpen:false,type:''})}}/>}
         </div>
    )
}

export default CreateNewChat