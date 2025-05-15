import { useState } from "react";
import { requestPasswordReset } from "../services/passwordService";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const isEmailValid = /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);
    const result = await requestPasswordReset(email);
    if (result.success) {
      setSuccess("If the email exists, a reset link was sent.");
    } else {
      setError(result.error || "Failed to send reset link.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-md shadow-sm space-y-6 font-mono">
        <PageTitle />
        <h4 className="mt-4 text-center text-medium text-white">
          Forgot Password
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full mx-auto block px-4 py-2 rounded text-sm bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading || !isEmailValid}
            className="w-full mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {success && (
          <div className="mt-4 text-green-400 text-center">{success}</div>
        )}
        {error && <div className="mt-4 text-red-400 text-center">{error}</div>}
        <div className="flex justify-center">
          <Link
            to="/auth/login"
            className="text-xs text-blue-700 hover:text-blue-500"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
