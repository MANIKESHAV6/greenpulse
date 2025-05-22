import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BillUploader from "@/components/BillUploader";
import ApplianceSelector from "@/components/ApplianceSelector";
import { Appliance, BillData } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Steps, Step } from "@/components/ui/steps";
import { updateProfileWithBillData } from "@/utils/profileUtils";

const BillUpload = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [bill, setBill] = useState<{
    file: File | null;
    amount: number | null;
    units: number | null;
  }>({
    file: null,
    amount: null,
    units: null,
  });
  const [selectedAppliances, setSelectedAppliances] = useState<Appliance[]>([]);

  const handleBillUpload = (file: File, amount: number, units: number) => {
    setBill({
      file,
      amount,
      units,
    });
    setStep(2);
  };

  const handleApplianceSubmit = (appliances: Appliance[]) => {
    setSelectedAppliances(appliances);
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser) {
      const mockBillData: BillData = {
        id: Math.random().toString(36).substring(2, 9),
        userId: currentUser.id,
        month: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear(),
        amount: bill.amount!,
        unitsConsumed: bill.units!,
        imagePath: URL.createObjectURL(bill.file!),
        uploadDate: new Date(),
      };
      
      // Store bill data
      localStorage.setItem("billData", JSON.stringify(mockBillData));
      localStorage.setItem("selectedAppliances", JSON.stringify(appliances));
      
      // Update user profile with bill data
      const userProfileKey = `profile_${currentUser.id}`;
      const storedProfile = localStorage.getItem(userProfileKey);
      
      if (storedProfile) {
        try {
          const currentProfile = JSON.parse(storedProfile);
          // Convert date strings back to Date objects
          currentProfile.joinedAt = new Date(currentProfile.joinedAt);
          currentProfile.carbonFootprint.history = currentProfile.carbonFootprint.history.map(
            (item: { date: string; value: number }) => ({
              ...item,
              date: new Date(item.date)
            })
          );
          
          // Update profile with new bill data
          const updatedProfile = updateProfileWithBillData(currentProfile, mockBillData);
          
          // Store updated profile
          localStorage.setItem(userProfileKey, JSON.stringify(updatedProfile));
        } catch (error) {
          console.error("Error updating profile with bill data:", error);
        }
      }
    }
    
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Upload Your Bill</h1>
        
        <Steps value={step} className="mb-8">
          <Step value={1}>Upload Bill Image</Step>
          <Step value={2}>Select Appliances</Step>
          <Step value={3}>View Dashboard</Step>
        </Steps>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 ? "Upload Your Electricity Bill" : "Select Your Appliances"}
            </CardTitle>
            <CardDescription>
              {step === 1 
                ? "Upload a photo of your electricity bill and enter the details" 
                : "Select the appliances you use at home and their usage patterns"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <BillUploader onUpload={handleBillUpload} />
            ) : (
              <ApplianceSelector onSubmit={handleApplianceSubmit} />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BillUpload;
