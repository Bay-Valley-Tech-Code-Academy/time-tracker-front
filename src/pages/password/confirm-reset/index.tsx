import React from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

const ConfirmResetPassword = () => {
    const [loading, setLoading] = React.useState<boolean>(false);

    //Account
    const [password, setPassword] = React.useState('');
    const [conPass, setConPass] = React.useState('');
    const [accountId, setAccountId] = React.useState('');

    //Router
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    //In effect when the component loads
    React.useEffect(() => {
        const fetchAccountId = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/accounts?email=${email}`);
                setAccountId(response.data._id);
            } catch (error) {
                console.error("Error fetching account:", error);
                alert("Account not found. Please go back to the forgot password page.");
                navigate("/forgot-password");
            }
        };
        fetchAccountId();
    }, [email, navigate]);


    const submitPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !accountId) {
            alert("Account information is missing. Please try again.");
            return;
        }

        if (password !== conPass) {
            alert("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.patch(`http://localhost:5000/api/accounts/${accountId}`, { password });
            alert(response.data.message || 'Password successfully reset.');

            navigate("/");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Password reset failed:', error.message);
                alert(error.message || 'Password reset failed. Please try again.');
            } else {
                console.error("An unknown error occurred:", error);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Reset Password</h2>

            <form onSubmit={submitPassword}>
                <label htmlFor="psw"><b>Password</b></label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    name="psw"
                    id="psw"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label htmlFor="psw-confirm"><b>Confirm Password</b></label>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="psw-confirm"
                    id="psw-confirm"
                    value={conPass}
                    onChange={(e) => setConPass(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
};

export default ConfirmResetPassword;
