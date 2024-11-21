import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import { useState } from "react";
import {SignIn} from "@/pages/sign-in.jsx";

import SignUp from "@/pages/sign-up.jsx";
import { ForgotPasswordProvider } from "./context/context";


function App() {
  const { pathname } = useLocation();

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleOpenSignIn = () => setShowSignIn(true);
  const handleOpenSignUp = () => setShowSignUp(true);
  const handleCloseSignIn = () => setShowSignIn(false);
  const handleCloseSignUp = () => setShowSignUp(false);


  return (
    <>
      {!(pathname == '/sign-in' || pathname == '/sign-up') && (
        // <div className="container absolute  left-2/4 z-10  -translate-x-2/4 p-1 w-full">
          <div className="container absolute  left-2/4 z-10  -translate-x-2/4 p-1 w-full">
          <Navbar routes={routes} onSignInClick={handleOpenSignIn} onSignUpClick={handleOpenSignUp}/>
        </div>
      )
      }
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      {showSignIn && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[500px] h-[90vh] bg-white p-6 rounded shadow-lg">
          <ForgotPasswordProvider>
          <SignIn onSignUpClick={handleOpenSignUp} closeSignIn={handleCloseSignIn}/>
    </ForgotPasswordProvider>
            
            <button onClick={handleCloseSignIn} className="absolute top-2 right-2 text-gray-600 text-3xl p-3">
              &times;
              {/* close */}
            </button>
          </div>
        </div>
      )}
      {showSignUp && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[500px] h-[90vh] bg-white p-6 rounded shadow-lg">
            <SignUp onSignInClick={handleOpenSignIn} closeSignUp={handleCloseSignUp}/>
            <button onClick={handleCloseSignUp} className="absolute top-2 right-2 text-gray-600 text-3xl p-3">
              &times;
              {/* close */}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
