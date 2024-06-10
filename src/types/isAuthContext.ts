import { Dispatch, SetStateAction } from "react"

export interface IsAuthContext {
    isAuth: boolean
    setIsAuth: Dispatch<SetStateAction<boolean>>
};