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
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpSchema, SignUpType } from "../../schema/SignUp.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bounce, toast } from "react-toastify";


const SignUp = () => {
  const router = useRouter();
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
        console.log(res);
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Something went wrong");
      }
      const result = await res.json();
      console.log("Success:", result);
      toast(result?.message, {
        position: "top-center",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.replace("/login");
      if (res?.ok) return reset();
    } catch (error) {
      console.log("error:", typeof error);
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
      <Card className="w-xs gap-3">
        <CardHeader className="border-b border-b-gray-300 bg-gray-200 pt-5 relative -mt-5 ">
          <CardTitle>Create New Account</CardTitle>
          <CardDescription>
            If You Already Have an Account, So Login To It
          </CardDescription>
          <CardAction>
            <Button onClick={() => router.push("/login")}>Login</Button>
          </CardAction>
        </CardHeader>
        <form 
        onSubmit={handleSubmit(onSubmit)} 
        // className="flex flex-col gap-3"
        >
          <CardContent className="flex flex-col gap-1 mb-2">
            <div className="flex flex-col gap-1.5 h-18">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your Name"
                {...register("name")}
                className=" focus:ring-3 outline focus:ring-lime-300 focus:bg-lime-100  rounded-2xl py-1.5 px-3 ml-0.5"
              />
              {errors.name && (
                <p className="text-red-600 text-xs relative -top-1.5">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 h-18">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your E-mail"
                {...register("email")}
                className="focus:ring-3 outline focus:ring-lime-300 focus:bg-lime-100  rounded-2xl py-1.5 px-3 ml-0.5"
              />
              {errors.email && (
                <p className="text-red-600 text-xs relative -top-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 h-18">
              <label htmlFor="pass">Password:</label>
              <input
                id="pass"
                type="password"
                placeholder="Enter your Password"
                {...register("password")}
                className="focus:ring-3 outline focus:ring-lime-300 focus:bg-lime-100  rounded-2xl py-1.5 px-3 ml-0.5"
              />
              {errors.password && (
                <p className="text-red-600 text-xs relative -top-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5 h-18">
              <label htmlFor="confirmPass">Confirm Password:</label>
              <input
                id="confirmPass"
                type="password"
                placeholder="Confirm your Password"
                {...register("confirmPassword")}
                className="focus:ring-3 outline focus:ring-lime-300 focus:bg-lime-100  rounded-2xl py-1.5 px-3 ml-0.5"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs relative -top-1.5">
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
          </CardContent>
          <CardFooter className="border-t border-t-gray-300 relative py-7 -mt-6 -bottom-6 rounded-b-none w-full  bg-gray-200 ">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-lime-500 text-amber-200 w-full h-full rounded-2xl py-1.5 cursor-pointer focus:scale-95 hover:opacity-85"
            >
              {isSubmitting ? "signing up..." : "Sign Up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
