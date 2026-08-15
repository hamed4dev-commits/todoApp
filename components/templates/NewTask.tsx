"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormState, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

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
type Inputs = z.infer<typeof schema>;
const schema = z.object({
  title: z
    .string()
    .trim()
    .min(5, { message: "Title must be at least 5 characters long" })
    .refine((value) => !/\d/.test(value), {
      message: "Title must not contain numbers",
    }),
  description: z
    .string()
    .trim()
    .min(10, { message: "Description must be at least 10 characters long" })
    .refine((value) => !/\d/.test(value), {
      message: "Description must not contain numbers",
    }),
});

const NewTask = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ resolver: zodResolver(schema), mode: "onChange" });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  // console.log(watch("title"))
  // console.log(errors);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mt-10"
      >
        <div className="flex flex-col gap-3 w-1/2 h-22">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            {...register("title")}
            className="border-sky-400 border rounded-2xl  placeholder-gray-400 text-white  bg-gray-700 px-3 py-0.5 ml-0.5 "
          />
          {errors.title && (
            <p className="text-red-600 -h-5 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-3 w-1/2 h-22">
          <label htmlFor="desc">Description</label>
          <input
            id="desc"
            className="border-sky-400 border rounded-2xl  placeholder-gray-400 text-white  bg-gray-700 px-3 py-0.5 ml-0.5 "
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-600 -h-5 text-sm">{errors.description.message}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-fit py-2 px-10 bg-emerald-600 font-semiboldbold mt-3 cursor-pointer rounded-2xl"
        >
          {isSubmitting ? "sending..." : "send"}
        </button>
      </form>
    </div>
  );
};

export default NewTask;
