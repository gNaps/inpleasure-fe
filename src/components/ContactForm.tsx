import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (formData: any) => {
    console.log("formData", formData);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.message) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: "", email: "", message: "" });
    }
  }, [formState, reset]);

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex-50 flex flex-col gap-10"
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white">Name</span>
          </label>
          <input
            type="text"
            className="input w-full bg-red-light rounded-lg border-0 white focus:ring-red"
            {...register("name", { required: true })}
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <input
            type="text"
            className="input w-full bg-red-light rounded-lg border-0 white focus:ring-red"
            {...register("email", { required: true })}
          />
        </div>
        <div className="form-control flex flex-col">
          <label className="label">
            <span className="label-text text-white">Message</span>
          </label>
          <textarea
            className="textarea h-32 bg-red-light rounded-lg border-0 p-2 text-white focus:ring-red"
            {...register("message", { required: true })}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg border shadow-md px-3 py-2 text-white font-semibold text-center mt-auto"
        >
          Contattaci
        </button>
      </form>
    </>
  );
}
