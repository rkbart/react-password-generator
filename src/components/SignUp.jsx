import React, { useState } from "react";
import { signup } from "../api/auth";

const SignUp = ({ onSignUp, onToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      onSignUp();
    } catch (err) {
      alert("Signup failed. Please check your input and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full p-5 bg-gray-300">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-center mb-6 text-zinc-800 text-2xl">Sign Up</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-zinc-600 text-sm"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 border border-zinc-300 rounded text-base focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(74,144,226,0.2)]"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-zinc-600 text-sm"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-zinc-300 rounded text-base focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(74,144,226,0.2)]"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="passwordConfirmation"
                className="block mb-2 text-zinc-600 text-sm"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full p-3 border border-zinc-300 rounded text-base focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(74,144,226,0.2)]"
                id="passwordConfirmation"
                placeholder="Re-enter your password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white border-none rounded text-base cursor-pointer mt-2 flex justify-center items-center disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-600 hover:disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="inline-block w-4 h-4 border-2 border-white/30 rounded-full border-t-white animate-spin mr-2"></div>
                  Signing up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>

            <div className="mt-4 text-sm text-center text-zinc-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onToggle}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
