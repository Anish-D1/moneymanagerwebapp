import Header from "../components/Header.jsx";
import HeroSection from "../components/HeroSection.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import Footer from "../components/Footer.jsx";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-[#080B16] font-sans text-white">
            <Header />
            <main>
                <HeroSection />
                <FeaturesSection />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;