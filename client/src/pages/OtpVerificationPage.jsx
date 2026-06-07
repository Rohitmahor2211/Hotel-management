import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../context/AdminAuthContext";

const OtpVerification = () => {
    const navigate = useNavigate()
    const { verifyOtp } = useContext(AdminAuthContext)
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            setError("")
            await verifyOtp(otp)
            navigate('/admin/dashboard')
        } catch (error) {
            setError(error.response?.data?.message || "OTP verification failed")
        } finally {
            setLoading(false)
        }
    }


    return (
        <section className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-[#fffdf8] via-[#f8f1e7] to-[#eef4ff] px-4">

            {/* OTP Card */}
            <div className="max-w-md m-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-[#e8edf7] p-8">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-[#dbeafe] to-[#bfdbfe] flex items-center justify-center shadow-lg">
                        <span className="text-3xl text-[#2563eb] font-bold">
                            🔐
                        </span>
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#3d2f25]">
                        OTP Verification
                    </h1>

                    <p className="text-[#7c6a5d] mt-3 text-sm leading-relaxed">
                        We have sent a 6-digit verification code to your email.
                        Please enter it below to continue.
                    </p>
                </div>

                {/* OTP Inputs */}
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-3 mb-4 pl-4 pr-4">
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="verification code"
                            className="w-full p-2 border border-black rounded-sm text-center"
                        />
                    </div>

                    {error && (
                        <p className="mb-4 text-center text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Verify Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-2xl bg-linear-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>

                {/* Resend */}
                <div className="text-center mt-6">
                    <p className="text-sm text-[#7c6a5d]">
                        Didn’t receive the code?{" "}
                        <span className="text-[#2563eb] font-semibold cursor-pointer hover:underline">
                            Resend OTP
                        </span>
                    </p>
                </div>

            </div>
        </section>
    );
};

export default OtpVerification;
