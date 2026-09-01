import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpSchema, SignUpType } from "../../schema/SignUp.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bounce, toast } from "react-toastify";
import Link from "next/link";

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
        <Card className="w-xs gap-3">
            
        <CardHeader className="border-b">
          <CardTitle>Create New Account</CardTitle>
          <CardDescription>
            If You Already Have an Account, So Login To It
          </CardDescription>
          <CardAction>
            <Button onClick={()=> router.push("/login")}>Login</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 h-18">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your Name"
            {...register("name")}
            className=" border border-purple-700 rounded-2xl py-1.5 px-3 ml-0.5"
          />
          {errors.name && (
            <p className="text-red-600 text-xs relative -top-2">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 h-18">
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
        <div className="flex flex-col gap-2 h-18">
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
        <div className="flex flex-col gap-2 h-18">
          <label htmlFor="confirmPass">Confirm Password:</label>
          <input
            id="confirmPass"
            type="password"
            placeholder="Confirm your Password"
            {...register("confirmPassword")}
            className=" border border-purple-700 rounded-2xl py-1.5 px-3 ml-0.5"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-xs relative -top-2">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {/* <p className="text-gray-500 text-sm">
          if you already have an account-
          <Link href={"/login"} className="text-blue-500 ">
            click here
          </Link>
        </p>
        <p></p> */}
        {/* <button
          disabled={isSubmitting}
          type="submit"
          className="bg-lime-500 w-1/3 rounded-2xl py-1 cursor-pointer focus:scale-95 hover:opacity-85"
        >
          {isSubmitting ? "signing up..." : "Sign Up"}
        </button> */}
      </form>
        </CardContent>
            <CardFooter className="border-t relative py-10 -mt-6 -bottom-6 rounded-b-none  bg-mauve-400 w-full h-25  ">
              <CardAction onClick={handleSubmit(onSubmit)} className="w-full">

              <Button
                disabled={isSubmitting}
                type="submit"
                className="bg-lime-500 w-full h-full rounded-2xl py-1.5 cursor-pointer focus:scale-95 hover:opacity-85"
                >
                {isSubmitting ? "signing in..." : "Sign In"}
              </Button>
                  </CardAction>
            </CardFooter>
      </Card>
    </div>
  )
}

export default SignUp