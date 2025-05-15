import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/passwordService";
import PageTitle from "../components/PageTitle";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const isFormValid = password.length > 0 && confirmPassword.length > 0;

  useEffect(() => {
    let token = searchParams.get("access_token");
    if (!token && window.location.hash) {
      const match = window.location.hash.match(/access_token=([^&]+)/);
      if (match) token = match[1];
    }
    setAccessToken(token);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!accessToken) {
      setError("Invalid or missing token.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    const result = await resetPassword(password);
    if (result.success) {
      setSuccess("Password updated successfully! You can now log in.");
      setTimeout(() => navigate("/auth/login"), 2000);
    } else {
      setError(result.error || "Failed to reset password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 font-mono">
      <div className="w-full max-w-md rounded-md shadow-sm space-y-6 font-mono">
        <PageTitle />
        <h4 className="mt-4 text-center text-medium text-white">
          Reset Password
        </h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors disabled:opacity-50 text-sm font-medium"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
        {success && (
          <div className="mt-4 text-green-400 text-center">{success}</div>
        )}
        {error && <div className="mt-4 text-red-400 text-center">{error}</div>}
      </div>
    </div>
  );
}

export default ResetPassword;
