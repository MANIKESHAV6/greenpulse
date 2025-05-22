import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Sun, Battery, Fan } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-green-50/30">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col space-y-12">
          {/* Theme Message Card */}
          <Card className="bg-gray-100 border-gray-200 border-2 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-center mb-2">
                <Leaf className="h-12 w-12 text-green-600 mb-2" />
              </div>
              <CardTitle className="text-4xl font-bold text-center text-green-600 mb-4">
                GreenPulse – Powering a smarter tomorrow with every saved watt.
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-6">
                GreenPulse tracks and analyzes energy usage in real-time to promote efficient consumption and reduce environmental impact.
                It empowers users to make informed decisions, driving sustainability through data-driven energy management.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-center space-x-2 bg-white rounded-lg p-4 shadow-sm">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Real-time Monitoring</span>
                </div>
                <div className="flex items-center justify-center space-x-2 bg-white rounded-lg p-4 shadow-sm">
                  <Battery className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Smart Analytics</span>
                </div>
                <div className="flex items-center justify-center space-x-2 bg-white rounded-lg p-4 shadow-sm">
                  <Sun className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Sustainable Future</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Energy Saving Tips Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-green-600">Quick Energy Saving Tips</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-gray-100 border-gray-200 border-2 shadow-sm transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      <Sun size={24} className="text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="text-center text-base text-gray-800">Solar Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">
                    Maximize natural light and switch to LED bulbs to save up to 75% on your lighting energy costs annually.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-100 border-gray-200 border-2 shadow-sm transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      <Battery size={24} className="text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="text-center text-base text-gray-800">Smart Power Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">
                    Use smart power strips to eliminate phantom energy usage and save up to 10% on bills.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-100 border-gray-200 border-2 shadow-sm transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center mb-2">
                    <div className="p-2 bg-white rounded-full shadow-sm">
                      <Fan size={24} className="text-green-600" />
                    </div>
                  </div>
                  <CardTitle className="text-center text-base text-gray-800">Climate Control</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">
                    Optimize your HVAC settings to reduce energy usage by up to 10% with smart temperature control.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Did You Know Section */}
          <section className="bg-gray-100 rounded-lg p-8 border-gray-200 border-2 shadow-sm">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Did You Know?</h2>
            <p className="text-sm text-gray-600">
              The average household spends more than ₹1,000 per month on electricity. 
              By following our energy-saving tips and tracking your consumption through the dashboard, 
              you can reduce your energy bills by up to 25%!
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
