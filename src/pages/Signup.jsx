
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import Input from "../components/Input.jsx";
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { LoaderCircle, UserPlus } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../util/uploadProfileImage.js";
import Header from "../components/Header.jsx";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";

        // Prevent duplicate submissions.
        if (isLoading) return;

        setIsLoading(true);
        setError(null);

        // Basic validation.
        if (!fullName.trim()) {
            setError("Please enter your full name.");
            setIsLoading(false);
            return;
        }

        if (!validateEmail(email)) {
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
            // Upload the profile photo only when one is selected.
            if (profilePhoto) {
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }

            const response = await axiosConfig.post(
                API_ENDPOINTS.REGISTER,
                {
                    fullName: fullName.trim(),
                    email: email.trim(),
                    password,
                    profileImageUrl,
                }
            );

            if (response.status === 201) {
                toast.success("Profile created successfully.");
                navigate("/login");
            }
        } catch (err) {
            console.error("Signup failed:", err);

            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message ||
                "Unable to create your account. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-[#080B16] text-white">
            <Header />

            <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-10 sm:px-6">
                {/* Background image and Aurora Glass overlay */}
                <img
                    src={assets.login_bg}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-20 blur-sm"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-[#080B16]/95 via-[#101629]/90 to-[#17102D]/95" />

                <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-violet-600/15 blur-3xl" />
                <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative z-10 w-full max-w-xl">
                    <div className="rounded-3xl border border-white/10 bg-[#101629]/90 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-9">
                        {/* App branding */}
                        <div className="mb-6 flex flex-col items-center">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-violet-950/30 sm:h-20 sm:w-20">
                                <img
                                    src={assets.appIcon}
                                    alt="Money Manager wallet icon"
                                    className="h-12 w-12 object-contain sm:h-16 sm:w-16"
                                />
                            </div>

                            <h1 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                Create Your Account
                            </h1>

                            <p className="mt-2 max-w-sm text-center text-sm leading-6 text-slate-400">
                                Start managing your money with clarity.
                                Create an account to track your finances.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Profile photo */}
                            <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
                                <p className="mb-3 text-sm font-medium text-slate-300">
                                    Profile Photo
                                    <span className="ml-1 font-normal text-slate-500">
                                        (optional)
                                    </span>
                                </p>

                                <ProfilePhotoSelector
                                    image={profilePhoto}
                                    setImage={setProfilePhoto}
                                />
                            </div>

                            {/* Account details */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <Input
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        label="Full Name"
                                        placeholder="John Doe"
                                        type="text"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <Input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        label="Email Address"
                                        placeholder="name@example.com"
                                        type="text"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <Input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        label="Password"
                                        placeholder="Create a password"
                                        type="password"
                                    />
                                </div>
                            </div>

                            {/* Validation and API errors */}
                            {error && (
                                <div
                                    role="alert"
                                    className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300"
                                >
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                disabled={isLoading}
                                className={`flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-950/30 transition duration-200 hover:from-violet-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#101629] ${
                                    isLoading
                                        ? "cursor-not-allowed opacity-60"
                                        : "active:scale-[0.99]"
                                }`}
                                type="submit"
                            >
                                {isLoading ? (
                                    <>
                                        <LoaderCircle className="h-5 w-5 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="h-5 w-5" />
                                        Create Account
                                    </>
                                )}
                            </button>

                            <p className="text-center text-sm text-slate-400">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                                >
                                    Log in
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

export default Signup;
