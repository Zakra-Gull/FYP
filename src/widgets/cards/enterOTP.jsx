import React, { useState } from "react";
import { useForgotPassword } from '../../context/context';

export function EnterOtp() {
  const [otpInput, setOtpInput] = useState("");

  const {email, closeEnterOtp, openResetPassword} = useForgotPassword();
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {

    console.log("OTP verified")

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpInput }),
      });

      if (response.ok) {
        console.log("otp verified");
        closeEnterOtp();
        openResetPassword(); // Move to Reset Password step
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }finally {
      setLoading(false); // Stop loading
    }

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 h-80 overflow-hidden">
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
        <p>We’ve sent an OTP to your email: </p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value)}
          className="border rounded w-full mt-4 p-2"
        />
        <div className="flex justify-between mt-4">
          <button className="text-blue-500" onClick={closeEnterOtp}>
            Back
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleVerifyOtp}
          >
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
              "Verify OTP"
            )}
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnterOtp;
