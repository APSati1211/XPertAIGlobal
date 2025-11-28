import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPageContent } from "../api";
// Saare icons import kar rahe hain taaki dynamic naam se pick kar sakein
import * as LucideIcons from "lucide-react"; 
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPageContent("home")
      .then((res) => {
        if (res && res.data) {
          setData(res.data);
        } else {
          setError("No data received from API");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Home data fetch error:", err);
        setError(err.message || "Failed to load content");
        setLoading(false);
      });
  }, []);

  // Helper to render dynamic icon
  const renderIcon = (iconName) => {
    const IconComponent = LucideIcons[iconName] || LucideIcons.Star; // Default to Star if not found
    return <IconComponent size={30} className="text-blue-500" />;
  };

  // Fallback/default data structure
  const defaultHero = {
    title: "Empowering Global Enterprises with AI-Driven Financial Intelligence",
    subtitle: "Transform your financial operations with cutting-edge AI technology, automated auditing, and strategic insights that drive business growth.",
    cta_text: "Get Started",
    image: null
  };

  const defaultStats = [
    { value: "500+", label: "Global Clients" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support Available" },
    { value: "50+", label: "Expert Team" }
  ];

  const defaultFeatures = [
    {
      title: "AI-Powered Analytics",
      description: "Leverage advanced artificial intelligence to gain deep insights into your financial data and make informed decisions.",
      icon_name: "Brain"
    },
    {
      title: "Automated Auditing",
      description: "Streamline your audit processes with intelligent automation that saves time and reduces errors.",
      icon_name: "ShieldCheck"
    },
    {
      title: "Strategic Consulting",
      description: "Get expert guidance from our team of financial advisors to optimize your business strategy.",
      icon_name: "TrendingUp"
    }
  ];

  const defaultCta = {
    title: "Ready to Transform Your Financial Operations?",
    text: "Join thousands of companies that trust XpertAI Global for their financial intelligence needs.",
    button_text: "Contact Us Today"
  };

  // Use API data if available, otherwise use defaults
  const hero = data?.hero || defaultHero;
  const stats = data?.stats && data.stats.length > 0 ? data.stats : defaultStats;
  const features = data?.features && data.features.length > 0 ? data.features : defaultFeatures;
  const cta = data?.cta || defaultCta;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-32 md:pt-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="bg-blue-500/20 text-blue-300 px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase border border-blue-500/30">
              Future of Finance
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mt-6 leading-tight drop-shadow-lg">
              {hero.title}
            </h1>
            <p className="mt-6 text-lg text-slate-300 max-w-lg leading-relaxed">{hero.subtitle}</p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-105">
                {hero.cta_text} <ArrowRight size={20} />
              </Link>
              <Link to="/services" className="border border-slate-500 hover:border-white text-slate-300 hover:text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 text-center">
                View Services
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30"></div>
            {hero.image ? (
              <img src={hero.image} alt="Hero Visual" className="relative rounded-2xl shadow-2xl w-full object-cover border border-slate-700/50 max-h-[500px]" />
            ) : (
              <div className="relative rounded-2xl shadow-2xl w-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-slate-700/50 max-h-[500px] h-[500px] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-slate-300 text-lg">Financial Intelligence Platform</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      {stats && stats.length > 0 && (
        <section className="bg-white py-12 border-b border-slate-100 relative z-20 shadow-sm">
          <div className="container mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center md:text-left">
                <h3 className="text-4xl font-extrabold text-slate-900">{stat.value}</h3>
                <p className="text-slate-500 font-medium mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FEATURES SECTION */}
      {features && features.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Us?</h2>
              <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ y: -10 }} 
                  className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-slate-100">
                    {renderIcon(feature.icon_name)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      {cta && (
        <section className="py-20 px-6">
          <div className="container mx-auto bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">{cta.title}</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">{cta.text}</p>
            
            <Link to="/contact" className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg relative z-10 hover:shadow-xl transform hover:-translate-y-1">
              {cta.button_text}
            </Link>
          </div>
        </section>
      )}

      {/* Error message (only shown if API fails and we're using defaults) */}
      {error && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-6 my-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Note:</strong> Using default content. API connection issue: {error}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
