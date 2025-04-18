import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const LoginSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [typeOfUser, setTypeOfUser] = useState<string>("user");

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwrodRef = useRef<HTMLInputElement | null>(null);
  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(emailRef.current?.value + " " + passwrodRef.current?.value);
  };
  useEffect(() => {
    const userType = location.state?.userType;
    setTypeOfUser(userType ? userType : "user");
  }, []);
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center items-center gap-6 p-6 md:flex-row">
      <div className=" p-4  leading-13">
        <h1 className="text-4xl text-left font-extrabold leading-13 max-w-md">
          Welcome to MediSync <br /> Login to continue
        </h1>
		<h2 className="text-green-600" >
			THIS IS <span className="text-orange-600" >{typeOfUser.toUpperCase()}</span> LOGIN PAGE
		</h2>
        {typeOfUser == "user" ? (
          <>
            <h2 className="">
              Don't have account?{" "}
              <Link to="/signup" className="text-blue-600">
                register
              </Link>{" "}
            </h2>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="w-96 h-3/4 bg-slate-950 rounded-md p-4">
        <div>
          <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-950 dark:text-gray-100">
            <h1 className="text-2xl font-bold text-center font-white"> Login</h1>
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="space-y-1 text-sm">
                <label htmlFor="username" className="block dark:text-gray-600">
                  User email
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  name="useremail"
                  id="useremail"
                  placeholder="User email"
                  className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                  required
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="password" className="block dark:text-gray-600">
                  Password
                </label>
                <input
                  ref={passwrodRef}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                  required
                />
                <div className="flex justify-end text-xs dark:text-gray-400">
                  <a rel="noopener noreferrer" href="#">
                    Forgot Password?
                  </a>
                </div>
              </div>
              <button className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600 hover:cursor-pointer ">
                Log in
              </button>
            </form>
            {typeOfUser == "user" ? (
              <>
                <p className="text-xs text-center sm:px-6 dark:text-gray-500">
                  Don't have an account?
                  <Link
                    rel="noopener noreferrer"
                    to="/signup"
                    className="underline dark:text-gray-400 hover:cursor-pointer"
                  >
                    Sign up
                  </Link>
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
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
