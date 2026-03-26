import axios from "axios"

export const login=async (email:string, password:string):Promise<{success:boolean, message:string}>=>{
    try {
        const apiObj={
            email,
            password
        }
        await axios({
            method:"POST",
            url: `${import.meta.env.VITE_BACKEND_USER}/login`,
            data: apiObj,
            withCredentials: true,
        })
        return {success:true, message:"Logged in"}
    } catch (err: any) {
        return {success:false, message:err.response?.data?.message || 'Login failed. Please check your credentials and try again.'}
    }
}

export const register=async(email:string, password:string, name:string):Promise<{success:boolean, message:string}>=>{
    let response
    try {
        const apiObj={
            email,
            password,
            name
        }
        response=await axios({
            method:"POST",
            url: `${import.meta.env.VITE_BACKEND_USER}/register`,
            data: apiObj,
            withCredentials: true,
        })
        console.log(response)
        return {success:true, message:"Signed up"}
    } catch (err: any) {
        console.log(response)
        return {success:false, message:err.response?.data?.message || 'Sign up failed.'}
    }
}