"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { SignUpSchema, SignUpType } from "../../schema/SignUp.schema";


const SignUp = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });
  const onSubmit: SubmitHandler<SignUpType> = async (data) => {
    try {
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res?.ok) {
        console.log(res)
        const errorData = await res.json().catch(() => ({}
        ));
        throw new Error(errorData.message || "Something went wrong");
      }
      const result = await res.json();
      router.replace("/login")
      console.log("Success:",result);
      toast(result?.message, {
        position: "top-center",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      if (res?.ok) return reset();
    } catch (error) {
      console.log("error:",typeof error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                                                     
      toast(errorMessage, {
        position: "top-center",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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
        <p className="text-gray-500 text-sm">
          if you already have an account-
          <Link href={"/login"} className="text-blue-500 ">
            click here
          </Link>
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
