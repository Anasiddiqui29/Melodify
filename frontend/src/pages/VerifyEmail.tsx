import React, { useEffect,  useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";



export default function VerifyEmail() {

    const hasVerified = useRef(false);

    const {token} = useParams();
    const navigate = useNavigate();

    const[status , setStatus] = useState("verifying")
    const[message , setMessage] = useState("")

    useEffect(() => {

    console.log("USE EFFECT RUNNING");
    console.log("TOKEN:", token);
    console.log("HAS VERIFIED:", hasVerified.current);

    if (hasVerified.current) {
        console.log("RETURNING - ALREADY VERIFIED");
        return;
    }

    hasVerified.current = true;

    const verifyEmail = async () => {

        console.log("SENDING VERIFICATION REQUEST");

        if (!token) {
            setStatus("error");
            setMessage("Invalid Verification Link");
            return;
        }

        try {

            const response = await api.get(
                `/auth/verify-email/${token}`
            );

            console.log("VERIFICATION SUCCESS:", response.data);

            setStatus("success");
            setMessage(response.data.message);

        } catch (err: any) {

            console.log("VERIFICATION FAILED:", err);
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);

            setStatus("error");

            setMessage(
                err.response?.data?.message ||
                "Verification failed. The link may be invalid or expired."
            );
        }
    };

    verifyEmail();

}, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center">

            <div className="text-center">

                {status === "verifying" && (
                    <>
                        <h1 className="text-2xl font-bold">
                            Verifying your email...
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Please wait.
                        </p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <h1 className="text-2xl font-bold text-green-600">
                            Email Verified!
                        </h1>

                        <p className="mt-2">
                            {message}
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            className="mt-5 px-5 py-2 bg-green-600 text-white rounded"
                        >
                            Go to Login
                        </button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <h1 className="text-2xl font-bold text-red-600">
                            Verification Failed
                        </h1>

                        <p className="mt-2">
                            {message}
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            className="mt-5 px-5 py-2 bg-gray-800 text-white rounded"
                        >
                            Go to Login
                        </button>
                    </>
                )}

            </div>

        </div>
    );

}