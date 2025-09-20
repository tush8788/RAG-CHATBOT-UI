import { Bot } from "lucide-react"

    let Navbar = () => {
        return (
            <>
                <nav className="bg-white border-gray-200 fixed">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 gap-2">
                        <div className="bg-blue-500 rounded-full p-1.5">
                            <Bot className="text-lg text-white" />
                        </div>
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap ">RAG CHATBOT</span>
                        </div>
                    </div>
                </nav>
            </>
        )
    }

    export default Navbar