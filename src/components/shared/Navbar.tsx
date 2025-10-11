import { Typography } from "antd"
import { Bot } from "lucide-react"

    let Navbar = () => {
        return (
            <>
                <nav className="fixed">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 gap-2">
                        <div className="bg-blue-500 rounded-full p-1.5">
                            <Bot className="text-lg text-white" />
                        </div>
                            <Typography.Title className="!mb-0" level={4}> RAG.AI </Typography.Title>
                    </div>
                </nav>
            </>
        )
    }

    export default Navbar