import React, { useContext } from "react";
// import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import "../styles/RegistrationForm.css";
import { Link } from "react-router-dom";
import { BetContext } from "../ContextApi/BetContext";

const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  }; // your form submit function which will invoke after successful validation

  return (
    <div className="h-screen">
      <div className="form-wrapper w-[500px] bg-orange-500  p-7 rounded-md mx-auto mt-[100px]">
        <h1 className="text-black font-bold text-2xl">Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Username</label>
          <input
            {...register("username", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            })}
          />
          {errors?.firstName?.type === "required" && (
            <p>This field is required</p>
          )}
          {errors?.firstName?.type === "maxLength" && (
            <p>First name cannot exceed 20 characters</p>
          )}
          {errors?.firstName?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
          <label>Email</label>
          <input
            {...register("mail", { required: "Email Address is required" })}
            aria-invalid={errors.mail ? "true" : "false"}
          />
          {errors.mail && <p role="alert">{errors.mail.message}</p>}
          <label>Password</label>
          <input {...register("password")} />
          {/* {errors?.password?.type === "required" && <p>This field is required</p>}
        {errors?.password?.type === "minLength" && (
          <p>password should be atleast 6 characters</p>
        )} */}
          <input type="submit" />
          <div>
            <span>
              Already have an account? Please{" "}
              <Link to="/login" className="underline font-bold">
                Log in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
