// import React, { useContext } from "react";
// // import ReactDOM from "react-dom";
// import { useForm } from "react-hook-form";
// import "../styles/RegistrationForm.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BetContext } from "../ContextApi/BetContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const { userProfile, setUserProfile } = useContext(BetContext);

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("email", data.email);
//     formData.append("password", data.password);
//    
//     try {
//       // await axios
//       //   .post("https://1ten365.online/api/login",{

//       //   })
//       //   .then((res) =>);

//       await axios({
//         url: "https://1ten365.online/api/login",
//         method: "POST",
//         headers: {
//           Accept: "Application/json",
//           "X-Requested-With": "XMLHttpRequest",
//         },
//         data: formData,
//       }).then((res) => {
//         if (res.data) {
//           setUserProfile({
//             userId: res.data.user.id,
//             name: res.data.user.username,
//             email: res.data.user.email,
//           });
//           localStorage.setItem("token", res.data.token);
//           localStorage.setItem("user", JSON.stringify(res.data.user));

//          
//           navigate("/home");
//         }
//       });
//     } catch (error) {
//       
//     }
//   };

//   return (
//     <div className="h-screen">
//       <div className="form-wrapper w-[500px]  p-7 rounded-md mx-auto bg-orange-600 mt-[100px]">
//         <h1 className="text-white font-bold text-2xl">Login</h1>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <label>Email</label>
//           <input
//             {...register("email", { required: "Email Address is required" })}
//             aria-invalid={errors.mail ? "true" : "false"}
//           />
//           {errors.mail && <p role="alert">{errors.mail.message}</p>}
//           <label>Password</label>
//           <input
//             type="password"
//             {...register(
//               "password"
//               // {
//               //   required: true,
//               //   minLength: 8,
//               //   pattern: /^[A-Za-z]+$/i,
//               // }
//             )}
//           />
//           {/* {errors?.password?.type === "required" && (
//             <p>This field is required</p>
//           )} */}
//           {/* {errors?.password?.type === "minLength" && (
//             <p>password should be atleast 6 characters</p>
//           )}
//           {errors?.password?.type === "pattern" && (
//             <p>Alphabetical characters only</p>
//           )} */}
//           <input type="submit" />
//           <div>
//             <span>
//               Don't have any account? Please{" "}
//               <Link to="/registration" className="underline font-bold">
//                 Registration
//               </Link>
//             </span>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
