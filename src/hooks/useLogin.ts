"use client"
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(2, "Password must be at least 2 characters"),
});

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });

      const login = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (login?.error) {
        toast.error(login.error);
      } else if (login?.ok) {
        toast.success("Login successful");
        router.push('/main')
      } else {
        toast.error("Something went wrong during login");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error(error.errors.join(", "));
      } else {
        toast.error("An unexpected error occurred");
        console.error("Login error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    handleLogin,
    setEmail,
    setPassword,
    loading,
  };
}
