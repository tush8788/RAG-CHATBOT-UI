import { Send, User, Bot } from 'lucide-react';

const Header = () => {

    return (<>
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center space-x-3">
                <div className="bg-blue-500 rounded-full p-2">
                    <Bot className="text-xl text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
                    <p className="text-sm text-gray-500">Online</p>
                </div>
            </div>
        </div>
    </>
    )
}

export default Header