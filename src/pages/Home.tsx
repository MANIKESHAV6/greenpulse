import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sun, Battery, Fan } from "lucide-react";

const FloatingLeaf = ({ className = "", size = "lg" }: { className?: string; size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };
  
  return (
    <div className={`absolute pointer-events-none animate-float ${className}`}>
      <Leaf className={`text-green-100/30 ${sizeClasses[size]} transform rotate-45`} strokeWidth={2.5} />
    </div>
  );
};

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col space-y-12">
          {/* Theme Message Card */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-green-400 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group animate-on-scroll">
            {/* Floating leaves background - More leaves, larger and more visible */}
            <FloatingLeaf className="top-10 left-[10%]" size="lg" />
            <FloatingLeaf className="top-1/4 left-[30%]" size="md" />
            <FloatingLeaf className="top-1/3 right-[15%]" size="lg" />
            <FloatingLeaf className="bottom-1/4 left-[20%]" size="md" />
            <FloatingLeaf className="bottom-20 right-[25%]" size="lg" />
            <FloatingLeaf className="top-1/2 right-[40%]" size="sm" />
            
            {/* Enhanced gradient overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_70%)]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/60 to-transparent"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            
            <CardHeader className="relative">
              <div className="flex items-center justify-center mb-8">
                <div className="p-5 bg-white/15 backdrop-blur-sm rounded-full shadow-xl group-hover:shadow-2xl transition-all duration-500 relative">
                  <div className="absolute inset-0 bg-green-400/30 rounded-full animate-ping"></div>
                  <Leaf className="h-14 w-14 text-white group-hover:scale-110 transition-transform duration-500" strokeWidth={2.5} />
                </div>
              </div>
              <CardTitle className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-6 transform group-hover:-translate-y-1 transition-transform duration-500">
                GreenPulse – Powering a smarter tomorrow with every saved watt.
              </CardTitle>
            </CardHeader>
            <CardContent className="relative transform transition-all duration-500">
              <p className="text-lg md:text-xl text-white/90 text-center max-w-3xl mx-auto mb-10 group-hover:text-white">
                GreenPulse tracks and analyzes energy usage in real-time to promote efficient consumption and reduce environmental impact.
                It empowers users to make informed decisions, driving sustainability through data-driven energy management.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="flex items-center justify-center space-x-4 bg-gradient-to-br from-white to-green-50/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] group/item border-2 border-white/20">
                  <Leaf className="h-8 w-8 text-green-600 transform transition-transform duration-300 group-hover/item:rotate-12" strokeWidth={2} />
                  <span className="text-lg font-semibold text-green-700">Real-time Monitoring</span>
                </div>
                <div className="flex items-center justify-center space-x-4 bg-gradient-to-br from-white to-green-50/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] group/item border-2 border-white/20">
                  <Battery className="h-8 w-8 text-green-600 transform transition-transform duration-300 group-hover/item:scale-110" strokeWidth={2} />
                  <span className="text-lg font-semibold text-green-700">Smart Analytics</span>
                </div>
                <div className="flex items-center justify-center space-x-4 bg-gradient-to-br from-white to-green-50/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] group/item border-2 border-white/20">
                  <Sun className="h-8 w-8 text-green-600 transform transition-transform duration-300 group-hover/item:rotate-90" strokeWidth={2} />
                  <span className="text-lg font-semibold text-green-700">Sustainable Future</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Energy Saving Tips Section */}
          <section className="space-y-8 animate-on-scroll">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Quick Energy Saving Tips</h2>
            <div className="grid gap-6 md:gap-8 md:grid-cols-3">
              <Card className="hover-card border-2 border-green-100">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-green-50 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                      <Sun size={32} className="text-green-600 icon-spin" strokeWidth={2} />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-center text-gray-800">Solar Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-600 text-center">
                    Maximize natural light and switch to LED bulbs to save up to 75% on your lighting energy costs annually.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-card border-2 border-green-100">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-green-50 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                      <Battery size={32} className="text-green-600 icon-hover" strokeWidth={2} />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-center text-gray-800">Smart Power Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-600 text-center">
                    Use smart power strips to eliminate phantom energy usage and save up to 10% on bills.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-card border-2 border-green-100">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 bg-green-50 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                      <Fan size={32} className="text-green-600 icon-spin" strokeWidth={2} />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-center text-gray-800">Climate Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-gray-600 text-center">
                    Optimize your HVAC settings to reduce energy usage by up to 10% with smart temperature control.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Did You Know Section */}
          <section className="bg-white rounded-xl p-8 border-2 border-green-100 shadow-lg hover:shadow-xl transition-all duration-300 animate-on-scroll">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Did You Know?</h2>
            <p className="text-lg text-gray-600">
              The average household spends more than ₹1,000 per month on electricity. 
              By following our energy-saving tips and tracking your consumption through the dashboard, 
              you can reduce your energy bills by up to 25%!
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
