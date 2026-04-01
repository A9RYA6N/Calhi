import { useNavigate } from "react-router-dom"

const HPHeader = () => {
    const navigate=useNavigate()
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-16">
            <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="size-8 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-3xl icon-gradient-text">calendar_month</span>
                    </div>
                    <span className="text-white text-xl font-bold tracking-tight cursor-pointer" onClick={()=>navigate("/")}>Calhi</span>
                </div>
                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a className="text-sm font-medium text-gray-300 hover:text-white transition-colors" href="#">Features</a>
                    <a className="text-sm font-medium text-gray-300 hover:text-white transition-colors" href="#">Use Cases</a>
                    <a className="text-sm font-medium text-gray-300 hover:text-white transition-colors" href="#">Pricing</a>
                </div>
                {/* CTA */}
                <div className="flex items-center gap-4">
                    <a className="text-sm font-medium text-white hover:text-primary transition-colors hidden sm:block cursor-pointer" onClick={()=>navigate("/login")}>Log in</a>
                    <button className="btn-gradient text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/20 cursor-pointer" onClick={()=>navigate("/register")}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    </nav>
  );
};

export default HPHeader;
