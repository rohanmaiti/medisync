import {
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Dropdown,
  IconButton,
  Avatar,
  Sheet
} from "@mui/joy";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export const Navbar = () => {
  const { authUser, userType, isCheckingAuth, checkAuth } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
   
  }, []);

  const handleLoginUser = (typeOfUser: string) => {
    navigate("/login", { state: { userType: typeOfUser } });
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  const NavLinks = () => (
    <>
      <Link href="#home" underline="none" variant="plain" color="primary" level="body-lg"
        sx={{ "&:hover": { backgroundColor: "#6200ea", color: "white" } }}>
        Home
      </Link>
      <Link href="#services" underline="none" variant="plain" color="primary" level="body-lg"
        sx={{ "&:hover": { backgroundColor: "#6200ea", color: "white" } }}>
        Services
      </Link>
      <Link href="#about" underline="none" variant="plain" color="primary" level="body-lg"
        sx={{ "&:hover": { backgroundColor: "#6200ea", color: "white" } }}>
        About
      </Link>
      <Link underline="none" variant="plain" color="primary" level="body-lg"
        onClick={() => navigate("/book-opd-form")}
        sx={{ "&:hover": { backgroundColor: "#6200ea", color: "white" } }}>
        Book OPD
      </Link>
      <Link href="emergency-service-page" underline="none" variant="solid" color="danger" level="body-lg"
        sx={{ "&:hover": { backgroundColor: "#d32f2f", color: "#eeeeee" } }}>
        Emergency
      </Link>
      {authUser && userType === "super_admin" && (
        <NavLink to="/admindashboard">Admin dashboard</NavLink>
      )}
    </>
  );

  return (
    <>
      {isCheckingAuth ? (
        <div className="flex justify-center items-center h-screen">
          <img src="loading.gif" alt="Loading..." width={100} />
        </div>
      ) : (
        <div className="bg-zinc-900 p-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="logo.png" alt="medisync logo" width={90} className="p-2 hover:cursor-pointer" />
            {/* Search input (hidden on small) */}
            <div className="hidden md:flex items-center gap-10">
              <Input
                placeholder="Search Hospitals"
                variant="outlined"
                color="neutral"
                sx={{
                  border: "1px solid grey",
                  backgroundColor: "#1f2937",
                  color: "white",
                  borderRadius: "8px",
                  width: "20rem",
                }}
              />
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex gap-10 items-center">
            <NavLinks />
          </div>

          {/* Right side (Login/Profile) */}
          <div className="hidden lg:block px-5">
            {authUser ? (
              <Dropdown>
                <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: "plain", color: "primary" } }}>
                  <Avatar alt="Profile" size="md" />
                </MenuButton>
                <Menu placement="bottom-end">
                  <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                  <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: "red" }}>Logout</MenuItem>
                </Menu>
              </Dropdown>
            ) : (
              <Dropdown>
                <MenuButton variant="outlined" color="primary">Login</MenuButton>
                <Menu placement="bottom-end">
                  <MenuItem onClick={() => handleLoginUser("user")}>User</MenuItem>
                  <MenuItem onClick={() => handleLoginUser("doctor")}>Doctor</MenuItem>
                  <MenuItem onClick={() => handleLoginUser("inventory_manager")}>Inventory Manager</MenuItem>
                  <MenuItem onClick={() => handleLoginUser("receptionist")}>Reception</MenuItem>
                  <MenuItem onClick={() => handleLoginUser("hospital_admin")}>Hospital Admin</MenuItem>
                </Menu>
              </Dropdown>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <IconButton variant="plain" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <Sheet
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                bgcolor: "background.level1",
                zIndex: 50,
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2
              }}
              className="lg:hidden"
            >
              <NavLinks />
              {authUser ? (
                <>
                  <Link onClick={() => navigate("/profile")}>Profile</Link>
                  <Link onClick={() => navigate("/dashboard")}>Dashboard</Link>
                  <Link onClick={handleLogout} sx={{ color: "red" }}>Logout</Link>
                </>
              ) : (
                <>
                  <Link onClick={() => handleLoginUser("user")}>Login as User</Link>
                  <Link onClick={() => handleLoginUser("doctor")}>Doctor</Link>
                  <Link onClick={() => handleLoginUser("inventory manager")}>Inventory Manager</Link>
                  <Link onClick={() => handleLoginUser("receptionist")}>Reception</Link>
                  <Link onClick={() => handleLoginUser("hospital admin")}>Hospital Admin</Link>
                </>
              )}
            </Sheet>
          )}
        </div>
      )}
    </>
  );
};
