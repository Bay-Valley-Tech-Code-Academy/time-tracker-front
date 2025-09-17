import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = React.useState('');
    const [isEmailSent, setIsEmailSent] = React.useState(false);

    const navigate = useNavigate();

    const submitEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:5000/api/accounts?email=${email}`);
            alert(response.data.message || "Email address has been found! Sending email... Press OK to read it!");
            setIsEmailSent(true);
        } catch (error: unknown) {
             if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message || 'Email address not found. Please check your email address.';
                console.error("Email address not found:", errorMessage);
                alert(errorMessage || "Email address not found. Please check your email address.");
            } else {
                console.error("An unknown error occurred:", error);
            }
        }

    };

    const handleGoToResetPage = () => {
        navigate("/reset-password", { state: { email } });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFFD9]">
            {!isEmailSent ? (
                <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-[#FCAE49]">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Forgot Your Password</h2>
                    <p className="text-gray-800 mt-2">
                    Enter your email address and an email will be sent!
                    </p>
                </div>

                <form onSubmit={submitEmail} className="space-y-4">
                    <div>
                    <label
                        htmlFor="email"
                        className="block font-semibold text-gray-900 mb-1"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-[#A1A1A1] rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5531]"
                    />
                    </div>

                    <button
                    id="button"
                    type="submit"
                    className="w-full py-2 rounded-md bg-[#FF5531] text-white font-semibold shadow-md hover:bg-[#e14a28]"
                    >
                    Send Code
                    </button>
                </form>
                </div>
            ) : (
                <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-[#FCAE49]">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
                    Check Your Email
                </h2>

                <div className="bg-white border border-[#A1A1A1] rounded-lg shadow-inner p-4">
                    <div className="mb-3 border-b border-[#A1A1A1] pb-2">
                    <p className="text-gray-900">
                        <strong>Subject:</strong> Bay Valley Tech Timesheets – Password Reset
                    </p>
                    </div>
                    <div className="text-gray-800 space-y-2">
                    <p>You've requested that the password be reset for your account.</p>
                    <p>To reset your password, click the link below:</p>
                    <button
                        onClick={handleGoToResetPage}
                        className="mt-2 w-full py-2 rounded-md bg-[#FF5531] text-white font-semibold shadow-md hover:bg-[#e14a28]"
                    >
                        Reset Password
                    </button>
                    </div>
                </div>
            </div>
        )}
        </div> 
    );
};

export default ForgotPassword;
