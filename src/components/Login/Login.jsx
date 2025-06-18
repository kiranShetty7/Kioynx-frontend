import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  CircularProgress,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as classes from "./Login.module.css";
import { loginOperation } from "../../services/apiHandler";
import { useSnackbar } from "../../context/SnackbarContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { showSuccess, showError } = useSnackbar();

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await loginOperation(data);
      console.log(response?.data?.success);

      if (response?.data?.success) {
        const { token, name, email, userId } = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ name, email, userId }));
        
        // Show success message
        showSuccess("Login successful! Welcome!");
        
        // Call the onLoginSuccess callback
        // onLoginSuccess();
      } else {
        showError(response?.data?.message || "Login failed");
      }

      // You can add navigation or context update here
    } catch (err) {
      if (err?.response?.status === 401) {
        showError("Unauthorized: Incorrect email or password");
      } else {
        console.log(err);
        showError(err?.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.container}>
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

          <FormControl
            variant="outlined"
            className={classes.passwordInput}
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "#fff" }} />
                    ) : (
                      <Visibility sx={{ color: "#fff" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
            />
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            className="onyxBlackColour"
            sx={{
              width: "100%",
              backgroundColor: "#232424",
              textTransform: "none",
            }}
            disabled={loading || Object.keys(errors).length > 0}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
