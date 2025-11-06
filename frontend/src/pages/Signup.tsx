import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser, type RegisterDto } from "@/api/user";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";

export default function Signup() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ email: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>();
  const [message, setMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setMessage("Registration successful!");
      navigate("/login");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      setMessage(err.response?.data?.message || "An error occurred.");
    },
  });

  const onSubmit = (data: RegisterDto) => mutation.mutate(data);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setProfile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader email={profile?.email} onLogout={handleLogout} />

      <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label>Email</label>
            <Input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Email invalid" },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label>Password</label>
            <Input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 chars" },
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Registering..." : "Sign Up"}
          </Button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold">
            Log In
          </Link>
        </p>

        {message && <p className="mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
