import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";

const AdminLogin = () => {

    const { adminLogin, authLoading, isAdminAuthenticated } = useContext(AdminAuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            setLoading(true)
            await adminLogin(email, password)
            navigate('/verify-otp')
        } catch (error) {
            setError(error.response?.data?.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!authLoading && isAdminAuthenticated) {
            navigate('/admin/dashboard')
        }
    }, [authLoading, isAdminAuthenticated, navigate])



    return (
        <section className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-[#fffdf8] to-[#f8f1e7] px-4">
            <div className=" max-w-md m-auto bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl border border-[#f1e7d8] p-8">

                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#f6e7d8] flex items-center justify-center shadow-md">
                        <span className="text-2xl font-bold text-[#8b5e3c]">
                            A
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-[#4b3425]">
                        Admin Portal
                    </h1>

                    <p className="text-[#8c735d] mt-2 text-sm">
                        Welcome back! Please login to continue.
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-[#5c4332]">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="admin@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-[#eadfce] bg-[#fffaf4] text-[#4b3425] placeholder-[#b89f88] focus:outline-none focus:ring-2 focus:ring-[#d6bfa7] transition-all duration-300"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-[#5c4332]">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-[#eadfce] bg-[#fffaf4] text-[#4b3425] placeholder-[#b89f88] focus:outline-none focus:ring-2 focus:ring-[#d6bfa7] transition-all duration-300"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-2xl bg-[#b08968] hover:bg-[#9c7555] text-white font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] "
                    >
                        {loading ? "Loading" : "Sign In"}
                        {/* Sign In */}
                    </button>
                </form>
            </div>
        </section>



    );
};

export default AdminLogin;
