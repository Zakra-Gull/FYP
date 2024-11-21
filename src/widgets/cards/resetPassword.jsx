import React, { useState } from "react";
import { useForgotPassword } from '../../context/context';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [verifyNewPassword, setVerifyNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { email, closeResetPassword,openForgotPassword} = useForgotPassword();
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    const validationErrors = {};

    // Validate fields
    if (!newPassword) {
      validationErrors.newPassword = "New password is required.";
    }
    if (!verifyNewPassword) {
      validationErrors.verifyNewPassword = "Please confirm your new password.";
    }
    if (newPassword && verifyNewPassword && newPassword !== verifyNewPassword) {
      validationErrors.mismatch = "Passwords do not match.";
    }

    setErrors(validationErrors);

    // If no validation errors, proceed
    // if (Object.keys(validationErrors).length === 0) {
    //   alert("Password changed successfully!");
    //   closeResetPassword();
    //   // Here, you can add the API call logic if needed.
    // }


    setLoading(true);
        try {
      const response = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      if (response.ok) {
        alert("Password reset successful!");
        closeResetPassword();
        // Redirect to login page or close overlay
      } else {
        alert("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }finally {
      setLoading(false); // Stop loading
    }


  };

  const handleBackButton= ()=>{
    closeResetPassword();
    openForgotPassword();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 h-80 overflow-hidden">
        <h2 className="text-xl font-bold mb-0">Set New Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border rounded w-full mt-2 p-2"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-0">{errors.newPassword}</p>
        )}

        <h2 className="text-xl font-bold mt-4">Re-Enter New Password</h2>
        <input
          type="password"
          placeholder="Re-enter new password"
          value={verifyNewPassword}
          onChange={(e) => setVerifyNewPassword(e.target.value)}
          className="border rounded w-full mt-2 p-2"
        />
        {errors.verifyNewPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.verifyNewPassword}</p>
        )}
        {errors.mismatch && (
          <p className="text-red-500 text-sm mt-1">{errors.mismatch}</p>
        )}

        <div className="flex justify-between mt-4">
          <button className="text-blue-500" onClick={handleBackButton}>
            Back
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleResetPassword}
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
              "Reset Password"
            )}
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
