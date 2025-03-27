"use client";
import { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { Register } from "@/store/slice/authSlice/authSlice";
import { useRouter } from "next/navigation";

const registerSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  username: Yup.string()
    .min(6, "Username must be at least 6 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function useRegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading: reduxLoading } = useAppSelector((state) => state.auth);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email,
      username,
      password,
      confirmPassword,
    };

    try {
      await registerSchema.validate(
        { email, username, password, confirmPassword },
        { abortEarly: false }
      );
      const result = await dispatch(Register(data)).unwrap();
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message || "Registration successful");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      router.push("/login");
    } catch (error) {
      let errorMessage = "Error processing request";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      if (error instanceof Yup.ValidationError) {
        toast.error(error.errors.join(", "));
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleRegister,
    loading: loading || reduxLoading,
    user,
  };
}
