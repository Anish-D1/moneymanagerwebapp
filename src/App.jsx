import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Income = lazy(() => import("./pages/Income.jsx"));
const Expense = lazy(() => import("./pages/Expense.jsx"));
const Category = lazy(() => import("./pages/Category.jsx"));
const Filter = lazy(() => import("./pages/Filter.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));

const App = () => {
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-[#080B16] text-white">
              <div className="text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
                <p className="text-sm text-slate-400">Loading page...</p>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Root />} />

            <Route path="/home" element={<LandingPage />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/category" element={<Category />} />
            <Route path="/filter" element={<Filter />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/home" replace />
  );
};

export default App;
