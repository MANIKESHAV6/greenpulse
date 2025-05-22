
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on auth state
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <Card className="w-[350px]">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-primary mb-2">Loading...</h1>
            <p className="text-muted-foreground">Redirecting you to the right place</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
