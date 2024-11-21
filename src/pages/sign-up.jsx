import React, { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";

export function SignUp({ onSignInClick, closeSignUp }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }else if (formData.name.length < 3) {
      newErrors.name = "User name must be at least 3 characters.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Registration failed:", errorData.message);
          setSuccessMessage("");
          alert(errorData.message || "Registration failed. Please try again.");
        } else {
          const data = await response.json();
          console.log("Registration successful:", data);
          setSuccessMessage("Registration successful! Please log in.");
          setFormData({ name: "", email: "", password: "" });
        }
      } catch (error) {
        console.error("Error during registration:", error);
        setSuccessMessage("");
        alert("An error occurred. Please try again.");
      }finally {
        setLoading(false); // Stop loading
      }
    }
  };

  const handleLogin = () => {
    console.log("Login is opening");
    onSignInClick();
    closeSignUp();
  };

  return (
    <section className="m-1 w-full lg:w-full mt-10">
      <div className="text-center">
        <Typography variant="h2" className="font-bold mb-4">
          Create your account
        </Typography>
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="text-lg font-normal"
        >
          Enter your name, email and password to register.
        </Typography>
      </div>
      <form
        className="mt-5 mb-2 mx-auto w-80 max-w-screen-lg lg:w-4/5"
        onSubmit={handleRegister}
      >
        <div className="mb-1 flex flex-col gap-5">
          <Typography
            variant="small"
            color="blue-gray"
            className="-mb-3 font-medium"
          >
            Your name
          </Typography>
          <div className="nameContainer">
          <Input
            size="lg"
            placeholder="Harry"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
              errors.name ? "!border-red-500" : ""
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.name && (
            <Typography
            variant="small"
            color="red"
            className="mt-1 text-xs font-medium text-red-500 leading-tight"
          >
              {errors.name}
            </Typography>
          )}
          </div>

          <Typography
            variant="small"
            color="blue-gray"
            className="-mb-3 font-medium"
          >
            Your email
          </Typography>

          <div className="emailContainer">
          <Input
            size="lg"
            placeholder="name@mail.com"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
              errors.email ? "!border-red-500" : ""
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.email && (
            <Typography
            variant="small"
            color="red"
            className="mt-1 text-xs font-medium text-red-500 leading-tight"
          >
              {errors.email}
            </Typography>
          )}
          </div>


          <Typography
            variant="small"
            color="blue-gray"
            className="-mb-3 font-medium"
          >
            Password
          </Typography>
          <div className="passwordContainer">
          <Input
            type="password"
            size="lg"
            placeholder="********"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
              errors.password ? "!border-red-500" : ""
            }`}
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.password && (
            <Typography
            variant="small"
            color="red"
            className="mt-1 text-xs font-medium text-red-500 leading-tight"
          >
              {errors.password}
            </Typography>
          )}
          </div>
        </div>

        <Button type="submit" className="mt-6" fullWidth>
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
              "Register Now"
            )}
         
        </Button>
        {successMessage && (
          <Typography color="green" className="text-sm mt-4 text-center">
            {successMessage}
          </Typography>
        )}

        <Typography
          variant="paragraph"
          className="text-center text-blue-gray-500 font-medium mt-4"
        >
          Already have an account?
          <button className="text-gray-900 ml-1" onClick={handleLogin}>
            Login
          </button>
        </Typography>
      </form>
    </section>
  );
}

export default SignUp;
