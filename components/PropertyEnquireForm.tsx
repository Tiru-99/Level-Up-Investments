"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader } from "lucide-react";

interface RentData {
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  duration: string;
}

interface BuyData {
  location: string;
  propertyType: string;
  budget: string;
}

interface Errors {
  name?: string;
  phone?: string;
  email?: string;
  propertyType?: string;
  duration?: string;
  location?: string;
  budget?: string;
}

export default function PropertyEnquiryForm() {
  const [lookingFor, setLookingFor] = useState<"rent" | "buy">("rent");
  const [isLoading, setIsLoading] = useState(false);

  const [rentData, setRentData] = useState<RentData>({
    name: "",
    phone: "",
    email: "",
    propertyType: "",
    duration: "",
  });

  const [buyData, setBuyData] = useState<BuyData>({
    location: "",
    propertyType: "",
    budget: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const validateForm = (): boolean => {
    let formErrors: Errors = {};

    if (lookingFor === "rent") {
      if (!rentData.name) formErrors.name = "Name is required";
      if (!rentData.phone) formErrors.phone = "Phone number is required";
      if (!rentData.email) formErrors.email = "Email is required";
      if (!/^\d{10}$/.test(rentData.phone)) formErrors.phone = "Phone number must be 10 digits";
      if (!rentData.propertyType) formErrors.propertyType = "Property type is required";
      if (!rentData.duration) formErrors.duration = "Duration is required";
    } else if (lookingFor === "buy") {
      if (!buyData.location) formErrors.location = "Location is required";
      if (!buyData.propertyType) formErrors.propertyType = "Property type is required";
      if (!buyData.budget) formErrors.budget = "Budget is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      try {
        const url = "/api/email";
        
        const requestData = {
          lookingFor,
          rentData: lookingFor === "rent" ? rentData : undefined,
          buyData: lookingFor === "buy" ? buyData : undefined,
        };

        const response = await axios.post(url, requestData);

        console.log("Form submitted successfully:", response.data);
        alert("Form submitted successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("There was an error submitting the form. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please fill out all the required fields.");
    }
  };

  const handleRentDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setRentData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleBuyDataChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setBuyData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto p-6 space-y-6" id="contact">
      <h2 className="text-2xl font-semibold text-left">What are you Looking For?</h2>
      <div className="flex justify-start space-x-2">
        <Button
          type="button"
          variant={lookingFor === "rent" ? "default" : "outline"}
          onClick={() => setLookingFor("rent")}
          className="w-24"
        >
          Rent
        </Button>
        <Button
          type="button"
          variant={lookingFor === "buy" ? "default" : "outline"}
          onClick={() => setLookingFor("buy")}
          className="w-24"
        >
          Buy
        </Button>
      </div>

      {lookingFor === "rent" ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={rentData.name}
                onChange={handleRentDataChange}
                required
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex">
                <Select
                  defaultValue="+91"
                  onValueChange={(value) => console.log("Country Code Selected:", value)}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="+91" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+91">+91</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  className="flex-1 ml-2"
                  value={rentData.phone}
                  onChange={handleRentDataChange}
                  required
                />
              </div>
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email ID</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={rentData.email}
                onChange={handleRentDataChange}
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select
                onValueChange={(value) => setRentData((prev) => ({ ...prev, propertyType: value }))}
                required
              >
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                </SelectContent>
              </Select>
              {errors.propertyType && <p className="text-red-500">{errors.propertyType}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select
                onValueChange={(value) => setRentData((prev) => ({ ...prev, duration: value }))}
                required
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="q1-2023">Q1 2023</SelectItem>
                  <SelectItem value="q2-2023">Q2 2023</SelectItem>
                  <SelectItem value="q3-2023">Q3 2023</SelectItem>
                  <SelectItem value="q4-2023">Q4 2023</SelectItem>
                </SelectContent>
              </Select>
              {errors.duration && <p className="text-red-500">{errors.duration}</p>}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter location"
              value={buyData.location}
              onChange={handleBuyDataChange}
              required
            />
            {errors.location && <p className="text-red-500">{errors.location}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select
                onValueChange={(value) => setBuyData((prev) => ({ ...prev, propertyType: value }))}
                required
              >
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                </SelectContent>
              </Select>
              {errors.propertyType && <p className="text-red-500">{errors.propertyType}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                placeholder="Enter budget"
                value={buyData.budget}
                onChange={handleBuyDataChange}
                required
              />
              {errors.budget && <p className="text-red-500">{errors.budget}</p>}
            </div>
          </div>
        </div>
      )}
      <Button 
        type="submit"
        className="bg-yellow-400 hover:bg-orange-500 w-full flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}