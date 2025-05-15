import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { loginSchema, type LoginFormData } from "../schemas/authSchema";
import { ZodError } from "zod";
import PageTitle from "../components/PageTitle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isFormValid = isEmailValid && password.length > 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationError(null);

    try {
      const formData: LoginFormData = { email, password };
      loginSchema.parse(formData);

      await login(formData);
      navigate("/");
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationError(error.errors[0].message);
      } else {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 font-mono">
        <div>
          <PageTitle />
          <h4 className="mt-4 text-center text-medium text-white">
            Sign in to your account
          </h4>
          <p className="mt-1 text-center text-sm text-gray-400">
            or{" "}
            <Link
              to="/register"
              className="font-medium text-blue-500 hover:text-blue-400"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {(error || validationError) && (
            <div className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded-md">
              {validationError || error?.message}
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <Link
              to="/auth/forgot-password"
              className="text-xs text-blue-700 hover:text-blue-500"
            >
              Forgot password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
