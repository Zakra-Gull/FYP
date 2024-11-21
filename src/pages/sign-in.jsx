import React, { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import ForgotPassword from "./forgetpassword.jsx";
import EnterOtp from "@/widgets/cards/enterotp";
import ResetPassword from "@/widgets/cards/resetPassword.jsx";
import { useForgotPassword } from '../context/context';

export function SignIn({ onSignUpClick, closeSignIn }) {

  const {
    isForgotPasswordOpen,
    openForgotPassword,
    closeForgotPassword,
    isEnterOtpOpen,
    closeEnterOtp,
    openEnterOtp,
    isResetPasswordOpen,
    closeResetPassword,
  } = useForgotPassword();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const [loading, setLoading] = useState(false);


  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 5) {
      newErrors.password = "Password must be at least 5 characters long.";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully");
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Sign-in failed:", errorData.message);
          alert(errorData.message || "Sign-in failed. Please try again.");
        } else {
          const data = await response.json();
          console.log("Sign-in successful:", data);
          localStorage.setItem("authToken", data.token);
          alert("Sign-in successful!");
        }
      } catch (error) {
        console.error("Error occurred during sign-in:", error);
        alert("An error occurred. Please try again.");
      }finally {
        setLoading(false); // Stop loading
      }
    }
  };

  const handleCreateAccount = () => {
    onSignUpClick();
    closeSignIn();
  };


  return (
    <section className="m-1 w-full lg:w-full mt-10">
      <div className="text-center">
        <Typography variant="h2" className="font-bold mb-4">
          Sign In
        </Typography>
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="text-lg font-normal"
        >
          Enter your email and password to sign in.
        </Typography>
      </div>
      <form
        className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-4/5"
        onSubmit={handleSignIn}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography
            variant="small"
            color="blue-gray"
            className="-mb-3 font-medium"
          >
            Your email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <Typography
              variant="small"
              color="red"
              className="text-xs font-medium"
            >
              {errors.email}
            </Typography>
          )}
          <Typography
            variant="small"
            color="blue-gray"
            className="-mb-3 font-medium"
          >
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <Typography
              variant="small"
              color="red"
              className="text-xs font-medium"
            >
              {errors.password}
            </Typography>
          )}
        </div>

        <Typography
          variant="small"
          className="font-medium text-gray-900 p-2 text-right"
        >
          <button type="button" onClick={openForgotPassword}>
            Forgot Password
          </button>
        </Typography>

        <Button type="submit" className="mt-6" fullWidth >
        {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white inline"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Sign in"
            )}
        </Button>

        <Typography
          variant="paragraph"
          className="text-center text-blue-gray-500 font-medium mt-4"
        >
          Not registered?
          <button
            className="text-gray-900 ml-1"
            onClick={handleCreateAccount}
            type="button"
            
          >
            Create account
          </button>
        </Typography>
      </form>

    
      {isForgotPasswordOpen && ( <ForgotPassword/>)}
      {isEnterOtpOpen && <EnterOtp  />}
      {isResetPasswordOpen && <ResetPassword />}
    </section>
  );
}

export default SignIn;
