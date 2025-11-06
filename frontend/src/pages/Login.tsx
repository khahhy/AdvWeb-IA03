import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { loginUser, type RegisterDto } from "@/api/user";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ email: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setMessage(null);
    setLoading(true);
    try {
      const res = await loginUser(data as RegisterDto);
      localStorage.setItem("access_token", res.access_token);
      setProfile({ email: data.email });
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || "Login failed: Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setProfile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader email={profile?.email} onLogout={handleLogout} />
      <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label>Email</label>
            <Input
              type="email"
              {...register("email", { required: "Email required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label>Password</label>
            <Input
              type="password"
              {...register("password", { required: "Password required" })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-bold">
            Sign Up
          </Link>
        </p>
        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
