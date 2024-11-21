import React, { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { useForgotPassword } from '../context/context';


export function ForgotPassword() {
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");

  const { closeForgotPassword, openEnterOtp, setEmail  } = useForgotPassword();
  const [loading, setLoading] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSendEmail = async () => {
    if (!emailInput) {
      setMessage("Please enter your email address.");
      return;
    } else if (!emailPattern.test(emailInput)) {
      setMessage("Invalid email format.");
    } else {
      setEmail(emailInput);
      // setMessage("Email sent!");
      // closeForgotPassword();
      // openEnterOtp();
    }


    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput }),
      });

      if (response.ok) {
        // setEmail(emailInput);
        alert("Email sent! Check your inbox");
        closeForgotPassword();
        openEnterOtp();
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error during email sending:", error);
      setMessage("An error occurred. Please try again later.");
    }finally {
      setLoading(false); // Stop loading
    }

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 h-80 overflow-hidden">
        <Typography variant="h4" className="text-center mb-4">
          Reset your password
        </Typography>
        <Typography variant="small" className="text-center mb-4 text-gray-600">
          If the account exists, we will email you an OTP to reset the password.
        </Typography>
        <div className="mb-4">
          <Typography variant="small" className="font-medium">
            Email
          </Typography>
          <Input
            type="email"
            size="lg"
            placeholder="name@mail.com"
            className="mt-2"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>
        {message && (
          <Typography variant="small" color="red" className="mb-4 text-center">
            {message}
          </Typography>
        )}
        <div className="flex justify-between mt-8">
          <Button
            onClick={closeForgotPassword}
            variant="text"
            className="text-blue-gray-500"
          >
            Return to login
          </Button>
          <Button onClick={handleSendEmail} className="bg-blue-500">
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
              " Send OTP"
            )}
           
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
