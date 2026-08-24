import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function ResetPassword() {

    const {token} = useParams();

    const navigate = useNavigate();

    const [password , setPassword] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")

    const [message , setMessage] = useState("");
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e : React.FormEvent) => {

        e.preventDefault()

        setMessage("")
        setError("")

        if(password != confirmPassword){
            setError("Passwords do not match");
            return;
        }

        if(password.length < 6){
            setError("Password must be atleast 6 characters")
            return;
        }

        if(!token){
            setError("Invalid Password Reset link");
            return ;
        }

        setLoading(true);

        try{
            const response = await api.post(
                `/auth/reset-password/${token}`,
                {
                    password
                }
            );

            setMessage(response.data.message);

            setPassword("");
            setConfirmPassword("");

            // Give the user a moment to see the success message
            setTimeout(() => {
                navigate("/login");
            }, 2000);


        }catch(err : any){

            setError(
                err.response?.data?.message ||
                "Unable to reset password"
            );

        }finally{
            setLoading(false);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center">

            <div className="w-full max-w-md p-6">

                <h1 className="text-3xl font-bold text-center">
                    Reset Password
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Enter your new password below.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-4"
                >

                    <input
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border rounded px-4 py-2 bg-white text-black placeholder-gray-500"
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full border rounded px-4 py-2 bg-white text-black placeholder-gray-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white py-2 rounded"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
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

            </div>

        </div>
    );

}