"use client";

import {  useState } from "react";


type FormState = {
    title: string,
    description: string,
}


const NewTask = () => {
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
  });
//   console.log(form);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
    // setForm({ title: "", description: "" });
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-5">
        <div className="flex flex-col max-w-1/2 gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={changeHandler}
            placeholder="Enter Title"
            className="border-sky-400 border-1 rounded-2xl  placeholder-gray-400 text-white  bg-gray-700 px-3 py-0.5 "
          />
        </div>
        <div className="flex flex-col max-w-1/2 gap-2">
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            id="desc"
            name="description"
            value={form.description}
            onChange={changeHandler}
            placeholder="Enter Description"
            className="border-sky-400 border-1 rounded-2xl  placeholder-gray-400 text-white  bg-gray-700 px-3 py-0.5 "
          />
        </div>
        <button type="submit" className="bg-sky-400 w-fit px-5 py-1 rounded-xl">send</button>
      </form>
    </div>
  );
};

export default NewTask;
