import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Container from "../ui/Container.jsx";
import Button from "../ui/Button.jsx";

function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        reset();
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An error occurred. Please try again later.");
    }
    setIsSubmitting(false);
  };

  return (
    <Container>
      <div className="container mx-auto sm:mt-32">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-blue-950 p-8 rounded-lg shadow-md max-w-md mx-auto"
        >
          <h1 className="text-blue-300 font-bold text-xl mb-8 text-center">
            Contact Us
          </h1>
          <div className="mb-6">
            <label
              className="block text-blue-300 text-md font-medium mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              {...register("name", { required: "Name is required" })}
              type="text"
              className="bg-blue-950 text-blue-300 border border-blue-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-300"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-400 text-xs italic">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-blue-300 text-md font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="bg-blue-950 text-blue-300 border border-blue-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-300"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-400 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-blue-300 text-md font-medium mb-2"
              htmlFor="comments"
            >
              Comments
            </label>
            <textarea
              id="comments"
              {...register("comments", { required: "Comments are required" })}
              rows="4"
              className="bg-blue-950 text-blue-300 border border-blue-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-300"
              disabled={isSubmitting}
            />
            {errors.comments && (
              <p className="text-red-400 text-xs italic">
                {errors.comments.message}
              </p>
            )}
          </div>

          <div className="flex justify-center my-3">
            <Button submit="submit" type="primary" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default ContactUs;
