import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";
import ForgotPassword from "../../components/ForgotPassword/ForgotPassword";
import ResetPassword from "../../components/ResetPassword/ResetPassword";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as classes from "./AuthLayout.module.css";
import KionyxLogo from "../../assets/kionyx_logo.png";

console.log('CSS Module classes:', classes);

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AuthLayout = () => {
  const [value, setValue] = React.useState(0);
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);
  const [isResetMode, setIsResetMode] = React.useState(false);
  console.log(classes, "classes");

  React.useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/reset-password/") || path.includes("/token/")) {
      setIsResetMode(true);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setShowForgotPassword(false);
  };

  const onBack = () => setShowForgotPassword(false);

  return (
    <div className={classes.background}>
      <div className={classes.content}>
        <img src={KionyxLogo} alt="onyx_logo" className={classes.logo} />
        <Card className={`${classes.card} ${classes.glassmorphism}`}>
          <CardContent>
            <Box sx={{ width: "100%" }}>
              {isResetMode ? (
                <ResetPassword />
              ) : showForgotPassword ? (
                <ForgotPassword onBack={onBack} />
              ) : (
                <>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="auth tabs"
                    centered
                    textColor="white"
                  >
                    <Tab
                      label="Login"
                      sx={{ textTransform: "initial", color: "#fff" }}
                    />
                    <Tab
                      label="Sign Up"
                      sx={{ textTransform: "initial", color: "#fff" }}
                    />
                  </Tabs>
                  <CustomTabPanel value={value} index={0}>
                    <Login />
                    <p
                      style={{
                        cursor: "pointer",
                        color: "#fff",
                        textAlign: "center",
                      }}
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot Password?
                    </p>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <SignUp />
                  </CustomTabPanel>
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
