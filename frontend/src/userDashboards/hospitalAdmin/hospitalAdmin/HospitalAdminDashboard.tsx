import React, { useState } from "react";
import {Hospital,Menu,Home,LogOut,X,} from "lucide-react";
import { HospitalAdminHome } from "./component/HospitalAdminHome";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../../../store/useAuthStore";
import { HospitaladminHeader } from "./component/HospitaladminHeader";


const HospitalAdminDashboard: React.FC = () => {
  // Toggle menu
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Toaster />
      <div className="min-w-screen min-h-screen mx-auto rounded-lg overflow-hidden border border-emerald-500/30">
        {/* Header */}
        <HospitaladminHeader/>
        
        {/* Main Content */}
        <HospitalAdminHome />
      </div>
    </div>
  );
};


export default HospitalAdminDashboard;
