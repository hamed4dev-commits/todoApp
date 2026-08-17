"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .trim()
      .min(3, "Name must have 3 or more character!"),
    email: z
      .string()
      .min(2, "Email is required")
      .trim()
      .email("Enter valid Email"),
    password: z
      .string()
      .min(1, "Password is required")
      .trim()
      .min(6, "Password must have 6 or more character!")
      .regex(/^\S+$/, "Password cannot contain spaces"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password")
      .trim()
      .regex(/^\S+$/, "Password cannot contain spaces"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type SignUpType = z.infer<typeof SignUpSchema>;
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });
  const onSubmit: SubmitHandler<SignUpType> = async (data) => {
    try {
      const res=  await fetch("api/auth/signup" , {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(data)
      })
      
      if( !res?.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Something went wrong");
      }
      const result = await res.json();
      console.log("Success:", result);
      if( res?.ok) return reset()
      
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 h-20">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your Name"
            {...register("name")}
            className="w-1/3 border border-purple-700 rounded-2xl px-3 ml-0.5"
          />
          {errors.name && (
            <p className="text-red-600 text-sm relative -top-2">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 h-20">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your E-mail"
            {...register("email")}
            className="w-1/3 border border-purple-700 rounded-2xl px-3 ml-0.5"
          />
          {errors.email && (
            <p className="text-red-600 text-sm relative -top-2">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 h-20">
          <label htmlFor="pass">Password:</label>
          <input
            id="pass"
            type="password"
            placeholder="Enter your Password"
            {...register("password")}
            className="w-1/3 border border-purple-700 rounded-2xl px-3 ml-0.5"
          />
          {errors.password && (
            <p className="text-red-600 text-sm relative -top-2">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3 h-20">
          <label htmlFor="confirmPass">Confirm Password:</label>
          <input
            id="confirmPass"
            type="password"
            placeholder="Confirm your Password"
            {...register("confirmPassword")}
            className="w-1/3 border border-purple-700 rounded-2xl px-3 ml-0.5"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm relative -top-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <p className="text-gray-500 text-sm" >
        if you already have an account-<Link href={"/login"} className="text-blue-500 ">click here</Link>
        </p>
        <p></p>
        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-lime-500 w-1/3 rounded-2xl py-1 cursor-pointer focus:scale-95 hover:opacity-85"
        >
          {isSubmitting ? "signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
