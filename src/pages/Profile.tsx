import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { AchievementsCard } from "@/components/profile/AchievementsCard";
import { PerformanceCard } from "@/components/profile/PerformanceCard";
import { CarbonFootprintCard } from "@/components/profile/CarbonFootprintCard";
import { ServiceContributionsCard } from "@/components/profile/ServiceContributionsCard";
import { EnhancedUserProfile } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User, Award } from "lucide-react";
import { createDefaultUserProfile } from "@/utils/profileUtils";

const Profile = () => {
  const [userData, setUserData] = useState<EnhancedUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProfile = () => {
      // Get current user data
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (!currentUser) return null;

      // Get user-specific profile data using the user's ID
      const userProfileKey = `profile_${currentUser.id}`;
      const storedProfile = localStorage.getItem(userProfileKey);
      
      if (storedProfile) {
        // If profile exists, parse and validate it
        try {
          const parsedProfile = JSON.parse(storedProfile);
          // Convert date strings back to Date objects
          parsedProfile.joinedAt = new Date(parsedProfile.joinedAt);
          parsedProfile.carbonFootprint.history = parsedProfile.carbonFootprint.history.map(
            (item: { date: string; value: number }) => ({
              ...item,
              date: new Date(item.date)
            })
          );
          parsedProfile.serviceContributions = parsedProfile.serviceContributions.map(
            (contribution: any) => ({
              ...contribution,
              date: new Date(contribution.date)
            })
          );
          return parsedProfile;
        } catch (error) {
          console.error("Error parsing stored profile:", error);
          return createDefaultUserProfile(currentUser);
        }
      }

      // If no profile exists, create a default one
      const defaultProfile = createDefaultUserProfile(currentUser);

      // Store the default profile
      localStorage.setItem(userProfileKey, JSON.stringify(defaultProfile));
      return defaultProfile;
    };

    try {
      const profile = loadUserProfile();
      setUserData(profile);
    } catch (error) {
      console.error("Error loading user profile:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to update user profile data
  const updateUserProfile = (newData: Partial<EnhancedUserProfile>) => {
    if (!userData) return;

    const updatedProfile = {
      ...userData,
      ...newData
    };

    // Update local state
    setUserData(updatedProfile);

    // Persist to localStorage
    const userProfileKey = `profile_${updatedProfile.id}`;
    localStorage.setItem(userProfileKey, JSON.stringify(updatedProfile));
  };

  if (loading || !userData) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="bg-card dark:bg-card-dark">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Name</label>
                    <p className="font-medium">{userData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Member Since</label>
                    <p className="font-medium">
                      {userData.joinedAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Sustainability Level</label>
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      <p className="font-medium">{userData.sustainabilityLevel}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Impact Rank</label>
                    <p className="font-medium">
                      {userData.impactRank === 0 ? "Not ranked yet" : `#${userData.impactRank}`}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <PerformanceCard metrics={userData.performanceMetrics} />
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AchievementsCard achievements={userData.achievements} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CarbonFootprintCard carbonFootprint={userData.carbonFootprint} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ServiceContributionsCard contributions={userData.serviceContributions} />
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
