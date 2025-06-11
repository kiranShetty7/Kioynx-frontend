import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as classes from "./SignUp.module.css";
import { signUpOperation } from "../../services/apiHandler";

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = React.useState({
    password: false,
    confirmPassword: false,
  });

  const [serverMessage, setServerMessage] = React.useState({
    type: "",
    text: "",
  });

  const handleClickShowPassword = (field) => () => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = async (data) => {
    setServerMessage({
      type: "",
      text: "",
    });
    const { name, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setServerMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    try {
      const response = await signUpOperation({ name, email, password });

      if (response?.data?.success) {
        const { name, email, token, userId } = response?.data?.data;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
      } else {
        setServerMessage({
          type: "error",
          text: response?.data?.message || "Signup failed",
        });
      }
    } catch (error) {
      setServerMessage({
        type: "error",
        text: error?.response?.data?.message || "Signup request failed",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.container}>
          {serverMessage.text && (
            <div className={classes.error}>{serverMessage.text}</div>
          )}
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            sx={{
              width: "100%",
              input: { color: "white" },
              label: { color: "white" },
            }}
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            id="email"
            label="Email id"
            sx={{
              width: "100%",
              m: 1,
              input: { color: "white" },
              label: { color: "white" },
            }}
            className={errors.email ? "error" : ""}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <FormControl
            sx={{
              m: 1,
              width: "100%",
              input: { color: "white" },
              label: { color: "white" },
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword.password ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
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
              label="Conjure your secret code!"
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
            />
            <span className={classes.error}>
              {errors.password && errors.password.message}
            </span>
          </FormControl>
          <FormControl
            sx={{
              m: 1,
              width: "100%",
              input: { color: "white" },
              label: { color: "white" },
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-confirm-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="confirmPassword"
              type={showPassword.confirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
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
              label="Validate Sorcery!"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              error={!!errors.confirmPassword}
            />
            <span className={classes.error}>
              {errors.confirmPassword && errors.confirmPassword.message}
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
            disabled={Object.keys(errors).length > 0}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
