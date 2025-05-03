import * as React from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, CircularProgress, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import classes from "./ForgotPassword.module.css";
import { forgotPasswordOperation } from "../../services/apiHandler";

const ForgotPassword = ({ onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      await forgotPasswordOperation(data);

      setSuccessMessage("Password reset link sent to your email.");
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Failed to send reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.container}>
          {successMessage && (
            <Typography
              color="primary"
              variant="body2"
              sx={{ mb: 1, color: "#fff" }}
            >
              {successMessage}
            </Typography>
          )}
          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mb: 1 }}>
              {errorMessage}
            </Typography>
          )}

          <TextField
            id="email"
            label="Email"
            className={classes.emailInput}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Button
            type="submit"
            variant="contained"
            className="onyxBlackColour"
            sx={{
              width: "100%",
              backgroundColor: "#232424",
              textTransform: "none",
              mt: 2,
            }}
            disabled={loading || Object.keys(errors).length > 0}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Send Reset Link"
            )}
          </Button>

          <Button
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={onBack}
            sx={{
              marginTop: "1rem",
              color: "#fff",
              textTransform: "none",
            }}
          >
            Back to Login / Sign Up
          </Button>
        </div>
      </form>
    </>
  );
};

export default ForgotPassword;
