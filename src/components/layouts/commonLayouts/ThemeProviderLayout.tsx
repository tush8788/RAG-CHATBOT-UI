import { ConfigProvider, theme } from "antd"
import { useAppSelector } from "../../../store/hooks"

const ThemeProviderLayout = ({children}:any) => {
    const { mode } = useAppSelector((state)=>state.utils.theme)

    return (
        <ConfigProvider
            theme={{
                algorithm: mode == 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
                // components: {
                //     Card: {
                //         colorBgContainer: mode == 'dark' ? '' : '#F7F9FB'
                //     }
                // }
            }}>
                {children}
        </ConfigProvider>
    )
}

export default ThemeProviderLayout