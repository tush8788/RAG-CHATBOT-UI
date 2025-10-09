import { Empty } from "antd"
import { useAppSelector } from "../../store/hooks"

const Temp = () => {
    const {mode} = useAppSelector((state)=>state.utils.theme)
    return (
        <div className={`h-full flex items-center justify-center ${mode == 'dark' && 'bg-black'}`}>
            <Empty className="" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
    )
}

export default Temp