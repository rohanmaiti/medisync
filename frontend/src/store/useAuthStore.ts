import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  // add more fields based on your actual user object
}

interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIng: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  hasParkingSlot?: string;
  userType?: string;

  setUserType: (type: string) => void;
  checkAuth: () => Promise<void>;
  signup: (data: any, navigate: NavigateFunction) => Promise<void>;
  login: (data: any, navigate: NavigateFunction) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  checkParkingStatus: (name: string) => Promise<{ active: boolean }>;
  setParkingSlot: (name: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  hasParkingSlot: undefined,
  userType: undefined,

  setUserType: (type) => {
    set({ userType: type });
  },

  checkAuth: async () => {
    try {
      // console.log("checking auth...");
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error: any) {
      console.log("Error in checkAuth", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data, navigate) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      setTimeout(()=>{
        navigate("/");
      },2000);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data, navigate) => {
    console.log("login authStore");
    try {
      set({ isLoggingIng: true });
      const res = await axiosInstance.post("/auth/login", data);
      console.log("res",res.data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      // redicrect as per user type 
      // for user type "user" redirect to "/"
      if(res.data.userType == "user")
      navigate("/");
      else if(res.data.userType == "doctor")
      navigate("/doctor/dashboard");
      else if(res.data.userType == "inventory_manager")
      navigate("/inventory/dashboard");
      else if(res.data.userType == "receptionist")
      navigate("/receptionist/dashboard");
      else if(res.data.userType == "hospital_admin")  
      navigate("/hospitaladmin/dashboard");
      else if(res.data.userType == "super_admin")
      navigate("/superadmindashboard");
    
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIng: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      console.log(data);
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.log("error in update profile:", error);
      toast.error("Error in updating profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  checkParkingStatus: async (name) => {
    try {
      const data = { name };
      const res = await axiosInstance.post('/parking/status', data);
      console.log("checkParkingStatus", res);
      if (res.data.active) {
        set({ hasParkingSlot: name });
      }
      return res.data;
    } catch (error) {
      console.error('Error checking parking status:', error);
      return { active: false };
    }
  },

  setParkingSlot: (name) => {
    set({ hasParkingSlot: name });
  },
}));
