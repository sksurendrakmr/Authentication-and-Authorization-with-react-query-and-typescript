import { AxiosResponse } from "axios"
import { axiosInstance, getJWTHeader } from "../../api"
import { getUserEndPoint } from "../../api/constant"
import { UserResponseType } from "../types"


const getUser = async(user:UserResponseType | null):Promise<UserResponseType | null> => {
    if(!user) return null;
    const {data}:AxiosResponse<{user:UserResponseType}> =  await axiosInstance.get(getUserEndPoint,{headers:getJWTHeader(user.token)});
    return data.user;
}


export const useUser = () => {
    
}