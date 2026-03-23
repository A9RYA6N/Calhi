import { useNavigate } from "react-router-dom"
import GenFooter from "../components/GenFooter"
import HPHeader from "../components/HPHeader"
import { login } from "../funcs/UserFuncs"
import { useState } from "react"

const Login = () => {
    const navigate=useNavigate()
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [isLoading, setIsLoading]=useState(false);
    const [error, setError]=useState("")

    const handleLogin=async(e:any)=>{
        e.preventDefault()
        setError("")
        if(!email||!password)
        {
            setError("Please enter both email and password");
            return;
        }
        if (!email.includes('@')) {
            setError('Please enter a valid email address.');
            return;
        }
        setIsLoading(true);
        const response=await login(email, password);
        if(response.success){
            navigate('/')
        }
        else{
            setError(response.message)
        }
        setIsLoading(false);
    }

    return (
        <div>
            <HPHeader/>
            <h2>{error}</h2>
            <form action="" onSubmit={handleLogin}>
                <input type="mail" value={email} placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" value={password} placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" disabled={isLoading}>Log in</button>
            </form>
            <GenFooter/>
        </div>
    )
}

export default Login
