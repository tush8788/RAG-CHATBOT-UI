import { Route, Routes } from "react-router-dom"
import ProtectedLayout from "../commonLayouts/ProtectedLayout.tsx"
import { AuthenticatedPaths, unAuthticatedPaths } from "./paths.ts"
import UnProtectedLayout from "../commonLayouts/UnProtectedLayout.tsx"
import RootLayout from "../commonLayouts/RootLayout.tsx"
import Dashboard from "../../../views/dashbaord/index.tsx"

const Navigation = () => {

    return (
        <Routes>
            <Route element={<RootLayout/>}>
                <Route element={<ProtectedLayout />}>
                    <Route element={<Dashboard />}>
                        {AuthenticatedPaths.map((route, index) => (
                            <Route
                                key={index}
                                Component={route.component}
                                path={route.path}
                            />
                        ))}
                    </Route>

                </Route>
                <Route element={<UnProtectedLayout />}>
                    {unAuthticatedPaths.map((route, index) => (
                        <Route
                            key={index}
                            Component={route.component}
                            path={route.path}
                        />
                    ))}
                </Route>
            </Route>
        </Routes>
    )
}

export default Navigation