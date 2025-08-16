import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = React.useState("");
    const [isEmailSent, setIsEmailSent] = React.useState(false);
    const navigate = useNavigate();

    const checkEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:5000/api/accounts?email=${email}`);
            setIsEmailSent(true);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Email not found:', error.message);
                alert(error.message || 'Email not found. Please check your email address.');
            } else {
                console.error("An unknown error occurred:", error);
            }
        }

    };

    const handleGoToResetPage = () => {
        navigate("/reset-password");
    };

    return (
        <div>
            {!isEmailSent ? (
                <div className="fPass">
                    <div className="fText">
                        <h2>Forgot Your Password</h2>
                        <p>Enter your email address and an email will be sent!</p>
                    </div>

                    <form onSubmit={checkEmail}>
                        <label htmlFor="email"><b>Email</b></label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button id="button">Send Code</button>
                    </form>
                </div>
            ) : (
                <div className="email-sent-confirmation">
                    <h2>Check Your Email</h2>
                    <div className="fake-email">
                        <div className="email-header">
                            <p><strong>Subject:</strong> Bay Valley Tech Timesheets – Password Reset</p>
                        </div>
                        <div className="email-body">
                            <p>You've requested that the password be reset for your account.</p>
                            <p>To reset your password, click the link below:</p>
                            <button onClick={handleGoToResetPage}>Reset Password</button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ForgotPassword;
