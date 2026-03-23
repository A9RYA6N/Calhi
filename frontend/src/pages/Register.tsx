import { useNavigate } from "react-router-dom";
import GenFooter from "../components/GenFooter"
import HPHeader from "../components/HPHeader"
import { useState } from "react";
import { register } from "../funcs/UserFuncs";

const Register = () => {
  const navigate=useNavigate()
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [name, setName]=useState("");
    const [isLoading, setIsLoading]=useState(false);
    const [error, setError]=useState("")

    const handleRegister=async(e: any)=>{
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
        const response=await register(email, password, name);
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
            <form action="" onSubmit={handleRegister}>
                <input type="text" value={name} placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}/>
                <input type="mail" value={email} placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" value={password} placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" disabled={isLoading}>Log in</button>
            </form>
            <GenFooter/>
        </div>
    )
}

export default Register
