import React, { createContext, useState, useContext } from "react";

const ForgotPasswordContext = createContext();

export const ForgotPasswordProvider = ({ children }) => {
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isEnterOtpOpen, setIsEnterOtpOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [email, setEmail] = useState(""); // Shared email state

  const openForgotPassword = () => setIsForgotPasswordOpen(true);
  const closeForgotPassword = () => setIsForgotPasswordOpen(false);

  const openEnterOtp = () => setIsEnterOtpOpen(true);
  const closeEnterOtp = () => setIsEnterOtpOpen(false);

  const openResetPassword = () => setIsResetPasswordOpen(true);
  const closeResetPassword = () => setIsResetPasswordOpen(false);

  return (
    <ForgotPasswordContext.Provider
      value={{
        isForgotPasswordOpen,
        openForgotPassword,
        closeForgotPassword,
        isEnterOtpOpen,
        openEnterOtp,
        closeEnterOtp,
        isResetPasswordOpen,
        openResetPassword,
        closeResetPassword,
        email,
        setEmail,
      }}
    >
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export const useForgotPassword = () => useContext(ForgotPasswordContext);
