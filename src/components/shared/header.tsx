import { Bot } from 'lucide-react';
import useAuth from '../../utils/hooks/useAuth';
import axios from 'axios';
import appConfig from '../../utils/app.config';
import LoadingUi from './LoadingUi';
import { useState } from 'react';
import ConditionalRender from './ConditionalRender';

const Header = ({ clearMessages }: { clearMessages: () => void }) => {
    const { signOut, token } = useAuth()
    const [loading, setLoading] = useState(false)
    const clearSession = async () => {
        try {
            setLoading(true)
            let resp = await axios.get(`${appConfig.apiUrl}/ai/clear-chat`, {
                headers: {
                    'x-rag-chatbot-token': token
                }
            });
            if (!resp.data.status) throw new Error("Error in clear chat")
            clearMessages();
            setLoading(false)
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    return (<>
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex justify-between">
            <div className="flex items-center space-x-3">
                <div className="bg-blue-500 rounded-full p-2">
                    <Bot className="text-xl text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">RAG Chatbot</h1>
                    <p className="text-sm text-gray-500">Online</p>
                </div>
            </div>
            <div className='flex gap-1 '>
                <button onClick={clearSession} disabled={loading} className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                    <ConditionalRender condition={()=>!loading}>
                         <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-black group-hover:text-white rounded-md group-hover:bg-transparent">
                         Clear session
                    </span>
                    </ConditionalRender>
                    <ConditionalRender condition={()=>loading}>
                        <span className='relative px-1 py-1 transition-all ease-in duration-75 bg-white text-black rounded-md '>
                        <LoadingUi />
                    </span>
                    </ConditionalRender>
                </button>
                <button onClick={() => { signOut() }} type="button" className=" cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Signout</button>
            </div>
        </div>
    </>
    )
}

export default Header