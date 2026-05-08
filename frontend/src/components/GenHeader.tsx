import { useNavigate, useLocation } from "react-router-dom"

const HPHeader = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const navLinks = [
        { label: 'Features', path: '/' },
        { label: 'Use Cases', path: '/uses' },
        { label: 'Pricing', path: '/pricing' },
    ]

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-md">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-16">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                        <div className="size-8 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl icon-gradient-text">calendar_month</span>
                        </div>
                        <span className="text-white text-xl font-bold tracking-tight">Calhi</span>
                    </div>
                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.path}
                                className={`text-sm font-medium transition-colors ${
                                    location.pathname === link.path
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                                onClick={() => navigate(link.path)}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>
                    {/* CTA */}
                    <div className="flex items-center gap-4">
                        <button
                            className="text-sm font-medium text-white transition-colors hidden sm:block"
                            onClick={() => navigate("/login")}
                        >
                            Log in
                        </button>
                        <button
                            className="btn-gradient text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-primary/20"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HPHeader;
