import { useNavigate, Link } from "react-router-dom"
import GenFooter from "../components/GenFooter"
import HPHeader from "../components/GenHeader"
import { login } from "../funcs/UserFuncs"
import { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    const navigate=useNavigate()
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
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
            
            <main className="grow flex items-center justify-center relative overflow-hidden py-32">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px] z-0"></div>
                <div className="absolute top-1/4 -left-1/4 w-150 h-150 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 -right-1/4 w-150 h-150 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
                
                {/* Login Card */}
                <div className="relative z-10 w-full max-w-md px-6">
                    <div className="glass-card p-10 rounded-2xl shadow-2xl">
                        <div className="mb-10 text-center">
                            <h1 className="text-4xl font-black tracking-tight text-white mb-2">Welcome Back</h1>
                            <p className="text-gray-400 text-sm tracking-wide">Enter your credentials to access your account.</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Email Address</label>
                                <div className="relative group">
                                    <input 
                                        className="w-full bg-[#111111] border border-white/5 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300" 
                                        placeholder="name@company.com" 
                                        type="email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Password</label>
                                    <a className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-white transition-colors" href="#">Forgot Password?</a>
                                </div>
                                <div className="relative group">
                                    <input 
                                        className="w-full bg-[#111111] border border-white/5 rounded-xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300 pr-12" 
                                        placeholder="••••••••" 
                                        type="password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <span className="material-symbols-outlined absolute right-4 top-4 text-gray-600 group-focus-within:text-primary transition-colors cursor-pointer hover:text-white">visibility</span>
                                </div>
                            </div>
                            <button 
                                className="w-full btn-gradient text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed" 
                                type="submit"
                                disabled={isLoading}
                            >
                                <span>{isLoading ? 'Logging In...' : 'Log In'}</span>
                                {!isLoading && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
                            </button>
                        </form>

                        <div className="mt-8 pt-8 border-t border-white/5 text-center">
                            <p className="text-sm text-gray-400">
                                Don't have an account? <Link className="text-white font-bold hover:text-primary transition-colors underline-offset-4 underline" to="/register">Register</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            
            <GenFooter/>
        </div>
    )
}

export default Login
