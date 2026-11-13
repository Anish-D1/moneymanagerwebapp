import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import { AppContext } from "../context/AppContextValue.jsx";
import { LoaderCircle, LogIn } from "lucide-react";
import Header from "../components/Header.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    if (!validateEmail(email.trim())) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email: email.trim(),
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      } else {
        setError("Unable to sign in. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Unable to sign in. Please check your details and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#080B16] text-white">
      <Header />

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
        {/* Background image */}
        <img
          src={assets.login_bg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-20 blur-sm"
        />

        {/* Aurora Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#080B16]/95 via-[#101629]/90 to-[#17102D]/95" />

        <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-violet-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        {/* Login card */}
        <div className="relative z-10 w-full max-w-xl">
          <div className="rounded-3xl border border-white/10 bg-[#101629]/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9">
            {/* App branding */}
            <div className="mb-7 flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-violet-950/30 sm:h-20 sm:w-20">
                <img
                  src={assets.appIcon}
                  alt="Money Manager wallet icon"
                  className="h-12 w-12 object-contain sm:h-16 sm:w-16"
                />
              </div>

              <span className="mb-3 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-200">
                WELCOME BACK
              </span>

              <h1 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Sign in to Money Manager
              </h1>

              <p className="mt-2 max-w-sm text-center text-sm leading-6 text-slate-400">
                Your finances, all in one place. Sign in to continue managing
                your money with clarity.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Account details */}
              <div className="space-y-4">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email Address"
                  placeholder="name@example.com"
                  type="text"
                />

                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
              </div>

              {/* Login errors */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300"
                >
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                disabled={isLoading}
                type="submit"
                className={`flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-950/30 transition duration-200 hover:from-violet-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#101629] ${
                  isLoading
                    ? "cursor-not-allowed opacity-60"
                    : "active:scale-[0.99]"
                }`}
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </>
                )}
              </button>

              <p className="text-center text-sm text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  Create an account
                </Link>
              </p>
            </form>
          </div>

          <p className="mt-5 text-center text-xs tracking-wide text-slate-500">
            MONEY MANAGER · YOUR FINANCES, MORE CLEARLY
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
