import React from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (typeOfUser:any) => {
    setAnchorEl(null);
    if (typeOfUser) navigate("/login", { state: { typeOfUser } });
  };

  return (
    <>
      <StyledButton onClick={handleClick}>Login</StyledButton>
      <Menu 
      anchorEl={anchorEl} 
      open={open} onClose={() => handleClose(null)} 
      disableScrollLock={true} 
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#2c2c2c", // Dark background
          color: "#fff", // White text
        },
      }}
      >
        <StyledMenuItem  sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }} onClick={() => handleClose("user")}>User</StyledMenuItem>
        <StyledMenuItem  sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }} onClick={() => handleClose("doctor")}>Doctor</StyledMenuItem>
        <StyledMenuItem  sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }} onClick={() => handleClose("inventory_manager")}>Inventory Manager</StyledMenuItem>
        <StyledMenuItem  sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }} onClick={() => handleClose("hospital_admin")}>Hospital Admin</StyledMenuItem>
        <StyledMenuItem  sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }} onClick={() => handleClose("super_admin")}>Super Admin</StyledMenuItem>
      </Menu>
    </>
  );
};

const StyledButton = styled(Button)({
  fontFamily: "IBM Plex Sans, sans-serif",
  fontWeight: 600,
  fontSize: "0.875rem",
  padding: "8px 16px",
  borderRadius: "8px",
  color: "white",
  background: "#007fff",
  border: "1px solid #0059b3",
  cursor: "pointer",
  transition: "all 150ms ease",
  '&:hover': {
    background: "#000000",
  },
});

const StyledMenuItem = styled(MenuItem)({
  padding: "8px",
  borderRadius: "8px",
  cursor: "pointer",
  userSelect: "none",
  '&:focus': {
    backgroundColor: "#0000",
  },
});

export default LoginButton;
