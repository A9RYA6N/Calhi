import { useNavigate, Link } from "react-router-dom";
import GenFooter from "../components/GenFooter"
import HPHeader from "../components/GenHeader"
import { useState, useEffect } from "react";
import { register } from "../funcs/UserFuncs";
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const navigate=useNavigate()
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [name, setName]=useState("");
    const [isLoading, setIsLoading]=useState(false);
    const [error, setError]=useState("")

    useEffect(() => {
        if (error) {
            toast.error(error, {
                style: {
                    background: '#171717',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.2)'
                }
            });
        }
    }, [error]);

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
            navigate('/dashboard')
        }
        else{
            setError(response.message)
        }
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
            <Toaster position="top-center" />
            <HPHeader/>
            
            <main className="grow flex items-center justify-center px-6 pt-32 pb-24 relative overflow-hidden">
                {/* Ambient Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
                
                <div className="w-full max-w-md relative z-10">
                    {/* Glassmorphism Card */}
                    <div className="glass-card rounded-2xl p-8 md:p-12 shadow-2xl hover:scale-[1.01] transition-transform duration-500">
                        <div className="mb-10 text-center">
                            <h1 className="text-4xl font-black tracking-tighter mb-3 bg-linear-to-br from-white to-gray-400 bg-clip-text text-transparent">Create Account</h1>
                            <p className="text-gray-400 text-sm tracking-wide">Enter your details to build your workspace</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleRegister}>
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
                                <div className="relative group">
                                    <input 
                                        className="w-full bg-[#111111] border border-white/5 rounded-xl py-4 pr-4 pl-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" 
                                        placeholder="John Doe" 
                                        type="text"
                                        value={name}
                                        onChange={(e)=>setName(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            
                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
                                <div className="relative group">
                                    <input 
                                        className="w-full bg-[#111111] border border-white/5 rounded-xl py-4 pr-4 pl-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" 
                                        placeholder="name@company.com" 
                                        type="email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            
                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Secure Password</label>
                                <div className="relative group">
                                    <input 
                                        className="w-full bg-[#111111] border border-white/5 rounded-xl py-4 pr-12 pl-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300" 
                                        placeholder="••••••••" 
                                        type="password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors flex items-center" type="button">
                                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Sign Up Button */}
                            <button 
                                className="w-full btn-gradient text-white font-bold py-4 rounded-xl active:scale-95 transition-all duration-300 mt-4 tracking-tight disabled:opacity-50 disabled:cursor-not-allowed" 
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </form>
                        
                        <div className="mt-8 text-center pt-8 border-t border-white/5">
                            <p className="text-gray-400 text-sm">
                                Already have an account? 
                                <Link className="text-primary font-semibold hover:text-white transition-colors ml-1" to="/login">Log in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            
            <GenFooter/>
        </div>
    )
}

export default Register
