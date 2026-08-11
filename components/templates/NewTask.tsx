"use client";

import { SubmitHandler, useForm } from "react-hook-form";

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
type Inputs = {
  title: string;
  description: string;
};
const NewTask = () => {
  const {register,handleSubmit,watch,formState:{errors}} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
  console.log(watch("title"))
  console.log(errors)
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input {...register("title")} className="border-sky-400 border rounded-2xl  placeholder-gray-400 text-white  bg-gray-700 px-3 py-0.5 " />
        </div>
        <div>
          <label>Description</label>
          <input className="border-sky-400 border rounded-2xl  placeholder-gray-400 text-white  bg-gray-700 px-3 py-0.5 " {...register("description",{required:true})} />
          {errors.description && <span>enter your description</span>}
        </div>
        <button type="submit" >send</button>
      </form>
    </div>
  );
};

export default NewTask;
