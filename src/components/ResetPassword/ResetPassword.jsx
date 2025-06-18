import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as classes from "./ResetPassword.module.css";
import { resetPasswordOperation } from "../../services/apiHandler";
import { useSnackbar } from "../../context/SnackbarContext";

const ResetPassword = ({ onBack }) => {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { showSuccess, showError } = useSnackbar();

  const [showPassword, setShowPassword] = React.useState({
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = React.useState(false);

  const handleClickShowPassword = (field) => () => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  React.useEffect(() => {
    const pathname = window.location.pathname;
    const token = pathname.split("/").pop();
    localStorage.setItem("token", token);
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      password: data.password,
    };

    try {
      setLoading(true);
      const response = await resetPasswordOperation(payload);

      if (response?.data?.success === false) {
        showError("Password reset failed.");
        return;
      }

      showSuccess("Password reset successful!");
      // Clear form fields
      reset();
      // Navigate back to login after 2 seconds
      setTimeout(() => {
        onBack();
      }, 2000);
    } catch (error) {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to reset password.";
      showError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.container}>
          <FormControl
            variant="outlined"
            className={classes.input}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
          >
            <InputLabel htmlFor="password">New Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword.password ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword("password")}
                    edge="end"
                  >
                    {showPassword.password ? (
                      <VisibilityOff sx={{ color: "#fff" }} />
                    ) : (
                      <Visibility sx={{ color: "#fff" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
            <span className={classes.error}>{errors.password?.message}</span>
          </FormControl>

          <FormControl
            variant="outlined"
            className={classes.input}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
          >
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmPassword"
              type={showPassword.confirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword("confirmPassword")}
                    edge="end"
                  >
                    {showPassword.confirmPassword ? (
                      <VisibilityOff sx={{ color: "#fff" }} />
                    ) : (
                      <Visibility sx={{ color: "#fff" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
            <span className={classes.error}>
              {errors.confirmPassword?.message}
            </span>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#232424",
              textTransform: "none",
            }}
            disabled={Object.keys(errors).length > 0 || loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
