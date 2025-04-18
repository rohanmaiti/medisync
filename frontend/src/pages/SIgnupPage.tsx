import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const userEmailRef = useRef<HTMLInputElement | null>(null);
  const userPasswordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const handleSignupSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    alert(usernameRef.current?.value);
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center gap-6 p-6 md:flex-row" >
      <div className=" p-4  leading-13" >
        <h1 className="text-4xl text-left font-extrabold leading-13 max-w-md" >Enter the details to register...</h1>
        <h2>Already have account? <Link className='text-green-600' to="/login">Login</Link> </h2>
      </div>
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-950 dark:text-gray-100">
        <h1 className="text-2xl font-bold text-center font-white">Singup</h1>
        <form  onSubmit={handleSignupSubmit} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block dark:text-gray-600">
              Enter your name
            </label>
            <input
              ref={usernameRef}
              type="text"
              name="username"
              id="username"
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="useremail" className="block dark:text-gray-600">
              User email
            </label>
            <input
              ref={userEmailRef}
              type="email"
              name="useremail"
              id="useremail"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block dark:text-gray-600">
              Password
            </label>
            <input
              ref={userPasswordRef}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="confirmPassword"
              className="block dark:text-gray-600"
            >
              Confirm password
            </label>
            <input
              ref={confirmPasswordRef}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Retype your password"
              required
              className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
            />
          </div>
          <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600 hover:cursor-pointer ">
            Sign up
          </button>
        </form>
        <p className="text-xs text-center sm:px-6 dark:text-gray-500">
          Already have account?
          <Link
            rel="noopener noreferrer"
            to="/login"
            className="underline dark:text-gray-400 hover:cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
      <button
        className="absolute bottom-4 left-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>
    </div>
  );
};
