import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function ForgotPassword(){

    const [email , setEmail] = useState("");
    const [message , setMessage] = useState("");
    const [error , setError] = useState("");
    const [loading , setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()

        setMessage("");
        setError("");
        setLoading(true);

        try{
            const response = await api.post(
                "/auth/forgot-password",
                {email}
            );

            setMessage(response.data.message);
    
        }catch(err:any){

            setError(
                err.response?.data?.message ||
                "Something went wrong. Please try again."
            );


        }finally {
            setLoading(false);
        }

    }
    
    return (
        <div className="min-h-screen flex items-center justify-center">

            <div className="w-full max-w-md p-6">

                <h1 className="text-3xl font-bold text-center">
                    Forgot Password?
                </h1>

                <p className="text-center text-black-500 mt-2">
                    Enter your email and we'll send you a password reset link.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-4"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border rounded px-4 py-2 bg-gray-800 text-white placeholder-gray-400"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>

                </form>

                {message && (
                    <p className="mt-4 text-center text-green-600">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="mt-4 text-center text-red-600">
                        {error}
                    </p>
                )}

                <div className="text-center mt-6">
                    <Link
                        to="/login"
                        className="text-green-600"
                    >
                        Back to Login
                    </Link>
                </div>

            </div>

        </div>
    );
    
}