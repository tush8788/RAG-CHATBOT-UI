import { type ReactNode } from "react"

type CRType = {
    condition:()=>boolean,
    children:ReactNode
}

const ConditionalRender = ({condition,children}:CRType) => {
    return condition() ? children : null
}

export default ConditionalRender