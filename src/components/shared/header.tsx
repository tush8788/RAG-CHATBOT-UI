import { Bot } from 'lucide-react';
import useAuth from '../../utils/hooks/useAuth';
import axios from 'axios';
import appConfig from '../../utils/app.config';

const Header = ({clearMessages}:{clearMessages:()=>void}) => {
    const{signOut,token}=useAuth()
    const clearSession = async () => {
        try{
            let resp = await axios.get(`${appConfig.apiUrl}/ai/clear-chat`,{headers:{
                'x-rag-chatbot-token':token
            }});
            if(!resp.data.status) throw new Error("Error in clear chat")
            clearMessages();
        }catch(err){
            console.log(err);
        }
    }

    return (<>
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex justify-between">
            <div className="flex items-center space-x-3">
                <div className="bg-blue-500 rounded-full p-2">
                    <Bot className="text-xl text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
                    <p className="text-sm text-gray-500">Online</p>
                </div>
            </div>
            <div className='flex gap-1 '>
                <button onClick={clearSession} className='font-semibold  !text-blue-500 p-2 rounded-xl !cursor-pointer'>Clear session</button>
                <button onClick={()=>{signOut()}} className='font-semibold !text-white bg-blue-500 p-2  rounded-xl !cursor-pointer'>Sign out</button>
            </div>
            
        </div>
    </>
    )
}

export default Header