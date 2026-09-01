"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/src/stores/authStore";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, loginType } from "../../schema/Login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bounce, toast } from "react-toastify";
import Link from "next/link";
import { Link2 } from "lucide-react";

const SignIn = () => {
  const { user, setUser, checkAuth } = useAuthStore();
  const router = useRouter();
  // console.log(user)

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

  const onSubmit: SubmitHandler<loginType> = async (data) => {
    try {
      const res = await fetch("api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res?.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData.message || "Something went wrong";
        throw new Error(errorMessage);
      }
      const result = await res.json();
      setUser(result.user);
      console.log("Success:", result);
      router.replace("/");
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
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
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
      <Card className="w-xs">
        <CardHeader>
          <CardTitle>Login To Your Account</CardTitle>
          <CardDescription>
            If You Don't Have an Account, So Create It
          </CardDescription>
          <CardAction>
            <Button onClick={()=> router.push("/signup")}>Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2.5"
          >
            <div className="flex flex-col gap-2 h-20">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your E-mail"
                {...register("email")}
                className=" border border-purple-700 rounded-2xl py-1.5 px-3 ml-0.5"
              />
              {errors.email && (
                <p className="text-red-600 text-xs relative -top-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 h-20">
              <label htmlFor="pass">Password:</label>
              <input
                id="pass"
                type="password"
                placeholder="Enter your Password"
                {...register("password")}
                className=" border border-purple-700 rounded-2xl py-1.5 px-3 ml-0.5"
              />
              {errors.password && (
                <p className="text-red-600 text-xs relative -top-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* <p className="text-gray-500 text-sm">
              if you want to create an account-
              <Link href={"/signup"} className="text-blue-500 ">
                click here
              </Link>
            </p> */}
            <CardFooter>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="bg-lime-500 rounded-2xl py-1 cursor-pointer focus:scale-95 hover:opacity-85"
              >
                {isSubmitting ? "signing in..." : "Sign In"}
              </Button>
            </CardFooter>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
