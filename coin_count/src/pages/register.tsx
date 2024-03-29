import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  GithubFilled,
  GoogleCircleFilled,
} from "@ant-design/icons";
import storage from "@/utils/auth/localStorage";
import { login } from "@/store/slices/authSlice";
import { signIn } from "next-auth/react";
import getAxiosInstance from "@/utils/axios/getAxiosInstance";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const auth = useSelector((state: any) => state.auth); // Replace 'any' with your RootState type if you have it
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState<string>("");

  const handleRegister = async (e: React.FormEvent) => {
    const axiosInstance = getAxiosInstance();
    setError("");
    e.preventDefault();
    try {
      if (form.password !== form.password_confirmation) {
        setError("Passwords do not match");
        return;
      }
      const res = await axiosInstance.post("/register", form);
      let { token, user } = res.data;
      user = {
        username: user.username,
        email: user.email,
        watchlist: user.watchlist,
        id: user._id,
      };
      if (res.status === 201) {
        dispatch(
          login({
            token,
            user,
          })
        );
      }
      await storage.saveToLocalStorage("t", token);
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  const handleSocialLogin = async (provider: string) => {
    try {
      const res = await signIn(provider, { callbackUrl: "/" });
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (auth.token) {
      router.push("/"); // Redirect to home if already logged in
    }
  }, [auth, router]);

  return (
    <div className="flex h-screen">
      {/* Your page layout */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white">
        <form className="w-96 p-8 py-4">
          <h2 className="text-2xl font-bold mb-4">Register</h2>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={handleTogglePassword}
              >
                {!showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Confirm your password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password_confirmation"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={handleTogglePassword}
              >
                {!showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleRegister}
          >
            Sign Up
          </button>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </form>
        <div className="flex-row items-center justify-center">
          <p className="text-gray-600">Or sign up with:</p>
          <div className="flex mt-2">
            <button
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition ease-in-out duration-150 mr-2"
              onClick={() => handleSocialLogin("github")}
            >
              <span className="inline-flex items-center">
                <GithubFilled />
              </span>
            </button>
            <button
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition ease-in-out duration-150 mr-2"
              onClick={() => handleSocialLogin("google")}
            >
              <span className="inline-flex items-center">
                <GoogleCircleFilled />
              </span>
            </button>
          </div>
        </div>
        <div className="mt-4 flex">
          <p className="text-gray-600 mr-2">Already have an account?</p>
          <Link
            href={"/login"}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-gradient-to-r from-sky-500 to-indigo-500"></div>
    </div>
  );
};

export default RegisterPage;
