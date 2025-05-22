import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { FileImage, Upload } from "lucide-react";

interface BillUploaderProps {
  onUpload: (file: File, amount: number, units: number) => void;
}

const BillUploader: React.FC<BillUploaderProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [units, setUnits] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      if (!selectedFile.type.includes('image/')) {
        setError("Please upload an image file");
        return;
      }
      
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError("Please upload a bill image");
      return;
    }
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid bill amount");
      return;
    }
    
    if (!units || isNaN(Number(units)) || Number(units) <= 0) {
      setError("Please enter valid units consumed");
      return;
    }
    
    onUpload(file, Number(amount), Number(units));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="bill-image">Upload Electricity Bill Image</Label>
        <div className="flex items-center justify-center w-full">
          <Label 
            htmlFor="bill-image"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors"
          >
            {preview ? (
              <img 
                src={preview} 
                alt="Bill preview" 
                className="h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileImage size={40} className="text-muted-foreground mb-4" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG or JPEG (MAX. 10MB)
                </p>
              </div>
            )}
            <Input 
              id="bill-image" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </Label>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bill-amount">Bill Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
            <Input 
              id="bill-amount" 
              type="number" 
              placeholder="0.00" 
              className="pl-8" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="units-consumed">Units Consumed</Label>
          <div className="relative">
            <Input 
              id="units-consumed" 
              type="number" 
              placeholder="0" 
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              min="0"
              step="1"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">kWh</span>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="text-destructive text-sm">{error}</div>
      )}
      
      <Button type="submit" className="w-full" disabled={!file}>
        <Upload size={16} className="mr-2" />
        Upload Bill
      </Button>
    </form>
  );
};

export default BillUploader;
