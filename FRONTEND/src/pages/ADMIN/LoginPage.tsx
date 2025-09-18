import logo from "../../assets/images/logo.png";
import { useState } from "react";
import GradientButton from "../../components/UI/GradientButton";
import axios, { AdminLoginApi } from "../../utils/AxiosInstance";
import { showtoast } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [LoginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginData({
      ...LoginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(AdminLoginApi, LoginData);

      const { SECRET_TOKEN, message } = response?.data;

      if (SECRET_TOKEN) {
        localStorage.setItem("adminToken", SECRET_TOKEN);

        showtoast("Success", "You have successfully logged in!", "success");
        navigate("/admin");
      } else {
        showtoast("Invalid response", "Token not received", "error");
      }
    } catch (error: any) {
      const errordata = error?.response?.data;
      showtoast(
        errordata?.errorCode || "Login Failed",
        errordata?.message || "Invalid credentials",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-secondarylight">
        <div className="sm:mt-24 mt-20 relative w-full bg-white rounded-lg shadow md:mt-10 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center items-center mb-10">
              <img
                className="absolute -top-10 w-20 h-20 bg-primary rounded-full p-1"
                src={logo}
                alt="logo"
              />
              <h1 className="text-xl mt-5 text-center font-bold leading-tight tracking-tight text-primary md:text-2xl">
                Sign in to your admin Account
              </h1>
            </div>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-primary">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  autoComplete="username"
                  onChange={handleChange}
                  className="bg-secondarylight border border-gray-300 text-primary rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="Username"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-primary">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  onChange={handleChange}
                  className="bg-secondarylight border border-gray-300 text-primary rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm font-medium text-primary hover:underline"
                  onClick={() =>
                    showtoast(
                      "Contact site owner",
                      "Email the site owner to recover your password.",
                      "warning"
                    )
                  }
                >
                  Forgot password?
                </a>
              </div>
              <GradientButton
                type="submit"
                variant="primary"
                size="md"
                iconPosition="right"
                loading={loading}
                className="shadow-md w-full"
                disabled={loading}
              >
                {loading ? "Authorizing..." : "Sign In"}
              </GradientButton>
              <p className="text-sm font-medium text-primary text-center">
                Only authorized admins can sign in.
              </p>
              <GradientButton
                onClick={() => navigate("/")}
                variant="outline"
                size="md"
                iconPosition="left"
                icon={ArrowLeft}
                className="shadow-md w-full"
              >
                Back to HomePage
              </GradientButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
