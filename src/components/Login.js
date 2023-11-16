import React, { useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { AVATAR, BACKGROUND_LOGO } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = user;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "_" + errorMessage);
          navigate("/error");
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "_" + errorMessage);
          navigate("/error");
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div>
        <img src={BACKGROUND_LOGO} alt="background-logo" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-70 p-8 rounded-md w-full max-w-sm">
            <h1 className="text-2xl text-white font-semibold mb-4">
              {isSignInForm ? "Sign In" : "Sign up"}
            </h1>

            <form onSubmit={(e) => e.preventDefault()}>
              {!isSignInForm && (
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-white text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    required
                    ref={name}
                    type="text"
                    id="name"
                    className="w-full p-2 rounded-md border border-gray-300"
                    placeholder="John Doe"
                  />
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white text-sm font-medium"
                >
                  Email
                </label>
                <input
                  ref={email}
                  type="email"
                  id="email"
                  placeholder="example@example.com"
                  className="w-full p-2 rounded-md border border-gray-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-white text-sm font-medium"
                >
                  Password
                </label>
                <input
                  ref={password}
                  type="password"
                  id="password"
                  placeholder="Your Secret Password"
                  className="w-full p-2 rounded-md border border-gray-300"
                />
              </div>
              <p className="text-red-500 font-semibold mt-2">{errorMessage}</p>
              <div className="flex items-center justify-between mb-4">
                <label className="text-white">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <button className="text-white text-sm">Forgot Password?</button>
              </div>
              <button
                type="submit"
                onClick={handleButtonClick}
                className="bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                {isSignInForm ? "Sign In" : "Sign up"}
              </button>
            </form>

            {!isSignInForm ? (
              <div className="mt-4">
                <p className="text-white text-sm">
                  Already registered?{" "}
                  <button className="text-red-500" onClick={toggleSignInForm}>
                    Sign In
                  </button>
                </p>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-white text-sm">
                  New to Netflix?{" "}
                  <button className="text-red-500" onClick={toggleSignInForm}>
                    Sign up now.
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
