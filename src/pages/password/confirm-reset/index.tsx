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
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message || 'Password reset failed. Please try again.';
                console.error('Password reset failed:', errorMessage);
                alert(errorMessage);
            } else {
                console.error("An unknown error occurred:", error);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFFD9]">
            <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-[#FCAE49]">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Reset Password</h2>

                <form onSubmit={submitPassword} className="space-y-4">
                <div>
                    <label htmlFor="psw" className="block font-semibold text-gray-900 mb-1">
                    Password
                    </label>
                    <input
                    type="password"
                    placeholder="Enter Password"
                    name="psw"
                    id="psw"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-[#A1A1A1] rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5531]"
                    />
                </div>

                <div>
                    <label htmlFor="psw-confirm" className="block font-semibold text-gray-900 mb-1">
                    Confirm Password
                    </label>
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    name="psw-confirm"
                    id="psw-confirm"
                    value={conPass}
                    onChange={(e) => setConPass(e.target.value)}
                    required
                    className="w-full p-2 border border-[#A1A1A1] rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5531]"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 rounded-md bg-[#FF5531] text-white font-semibold shadow-md hover:bg-[#e14a28] disabled:opacity-50"
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
                </form>
            </div>
        </div>
    );
};

export default ConfirmResetPassword;
