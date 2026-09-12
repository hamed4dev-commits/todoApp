"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { newTaskSchema } from "../../schema/NewTask.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

// import { useState } from "react";
// // import { validation } from "../helpers/helper";

// type FormState = {
//   title: string;
//   description: string;
// };

// type ErrorState = {
//   eTitle: string;
//   eDescription: string;
// };

// const NewTask = () => {
//   const [form, setForm] = useState<FormState>({
//     title: "",
//     description: "",
//   });
//   const [touched, setTouched] = useState<boolean>(false)
//   const [error, setError] = useState<ErrorState>({
//     eTitle: "",
//     eDescription: "",
//   })
// //   console.log(form);
//   const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setTouched(true);

//     if (name.trim().length < 5) {
//       return setError((prev) => ({
//         ...prev,
//         eTitle: "your Title doesn't feel good",
//       }));
//     }

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(form);
//     // setForm({ title: "", description: "" });
//   };
//   return (
//     <div>
//       <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-5">
//         <div className="flex flex-col max-w-1/2 gap-2">
//           <label htmlFor="title">Title</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={form.title}
//             onChange={changeHandler}
//             placeholder="Enter Title"
//             className="border-sky-400 border rounded-2xl  placeholder-gray-400 text-white  bg-gray-700 px-3 py-0.5 "
//           />
//           <span>{touched}</span>
//         </div>
//         <div className="flex flex-col max-w-1/2 gap-2">
//           <label htmlFor="desc">Description</label>
//           <input
//             type="text"
//             id="desc"
//             name="description"
//             value={form.description}
//             onChange={changeHandler}
//             placeholder="Enter Description"
//             className="border-sky-400 border rounded-2xl  placeholder-gray-400 text-white  bg-gray-700 px-3 py-0.5 "
//           />
//         </div>
//         <button type="submit" className="bg-sky-400 w-fit px-5 py-1 rounded-xl">send</button>
//       </form>
//     </div>
//   );
// };

// export default NewTask;

type Inputs = z.infer<typeof newTaskSchema>;

const NewTask = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(newTaskSchema),
    mode: "onChange",
    defaultValues: { title: "", completed: true },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const baseUrl = process.env.BASE_URL;
    console.log(baseUrl);
    try {
      const res = await fetch(`http://localhost:3001/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(res);
      if (!res?.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Something went wrong");
      }
      const result = await res.json();
      console.log("Success:", result);
      toast("Todo created successfully",{
        position: "top-center",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
      router.push("/task")
      if (res?.ok) return reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // console.log(watch("title"))
  // console.log(errors);
  // console.log(isSubmitting);
  return (
    <div className="h-11/12 grid place-items-center">
      <Card className="w-xs gap-4 bg-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-200">New Task</CardTitle>
          <CardDescription>here you can create a Todo</CardDescription>
        </CardHeader>
        <Separator />
        <form
          onSubmit={handleSubmit(onSubmit)}
          // className="flex flex-col gap-5 mt-10"
        >
          <CardContent className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-3  h-20">
              <label htmlFor="title" className="text-gray-200">
                Todo
              </label>
              <input
                id="title"
                {...register("title")}
                placeholder="Enter your Todo"
                className="focus:ring-3 outline focus:ring-green-400 focus:bg-green-200 rounded-2xl  placeholder-gray-400 text-black  bg-gray-700 px-3 py-0.5 ml-0.5 "
              />
              {errors.title && (
                <p className="text-red-600 relative -top-1.5 text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>
            {/* <div className="flex flex-col gap-3 w-1/2 h-22">
              <label htmlFor="desc">Description</label>
              <input
                id="desc"
                className="border-sky-400 border rounded-2xl  placeholder-gray-400 text-white  bg-gray-700 px-3 py-0.5 ml-0.5 "
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-600 -h-5 text-sm">
                  {errors?.description.message}
                </p>
              )}
            </div> */}
            <div className="flex flex-col gap-3  h-22">
              <label htmlFor="status" className="text-gray-200">
                Status
              </label>
              <select
                id="status"
                // defaultChecked="true"
                {...register("completed", {
                  setValueAs: (value) => {
                    if (value === "" || value === undefined) return undefined;
                    return value === "true";
                  },
                })}
                defaultValue=" "
                className="border-sky-400 border rounded-2xl  placeholder-gray-400 text-white  bg-gray-700 px-3 py-0.5 ml-0.5 "
              >
                <option value=" ">
                  status?
                </option>
                <option value="true">completed</option>
                <option value="false">pending</option>
              </select>
              {errors.completed && (
                <p className="text-red-600 -h-5 text-sm">
                  {errors?.completed?.message}
                </p>
              )}
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-fit py-2 px-10 text-white bg-emerald-600 hover:bg-emerald-700 transition-colors font-semibold mt-3 cursor-pointer rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-600  "
            >
              {isSubmitting ? "sending..." : "send"}
            </button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default NewTask;
