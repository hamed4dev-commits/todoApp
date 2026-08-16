"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
const SignIn = () => {
  const loginSchema = z.object({
    email: z.string().min(2, "Email is required").trim().email("Enter valid Email"),
    password: z
      .string()
      .min(1, "Password is required")
      .trim()
      .min(6, "Password must have 6 or more character!"),
  });
  type loginType = z.infer<typeof loginSchema>;
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });
  console.log(errors);

  const onSubmit: SubmitHandler<loginType> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 h-20">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your E-mail"
            {...register("email")}
            className="w-1/3 border border-purple-700 rounded-2xl px-3 ml-0.5"
          />
          {errors.email && <p className="text-red-600 text-sm relative -top-2">{errors.email.message}</p>}
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
          {errors.password && <p className="text-red-600 text-sm relative -top-2">{errors.password.message}</p>}
        </div>
        <button disabled={isSubmitting} type="submit" className="bg-lime-500 w-1/3 rounded-2xl py-1 cursor-pointer focus:scale-95 hover:opacity-85" >
          {isSubmitting ? "signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
