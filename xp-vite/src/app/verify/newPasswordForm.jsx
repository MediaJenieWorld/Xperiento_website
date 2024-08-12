import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { forgotPasswordEmailVerify } from "@/api/Main_Api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "./styles.scss";
import PasswordInput from "../login/login_components/PasswordInput";

const NewPassword = () => {
  const { token } = useParams();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [isVerified, setIsVerified] = useState(false);

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;
    if (password === confirmPassword) {
      try {
        const response = await forgotPasswordEmailVerify({ token, password });
        if (response.data.success === true) {
          toast.success(response.data.data);
          setIsVerified(true);
        } else {
          toast.error(response.data.data);
          setIsVerified(false);
        }
      } catch (error) {
        setIsVerified(false);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  useEffect(() => {
    if (isVerified) {
      setTimeout(() => {
        window.location = "/";
      }, 2000);
    }
  }, [isVerified]);

  return (
    <div className="NewPassword full">
      <h2>Set New Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <label htmlFor="password">New Password:</label>
          <PasswordInput register={register} />
        </div>
        <div className="flex ">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="input-area">

            <i
              onClick={() => setShowPassword((pre) => !pre)}
              className={showPassword ? "pi pi-eye" : "pi pi-eye-slash"}
            ></i>
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
            />
          </div>
          {errors.confirmPassword && (
            <span
              style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
            >
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <button type="submit">Update Password</button>
      </form>

      {isVerified && (
        <button
          style={{ margin: "0 auto", marginTop: "1rem" }}
          className="link button"
        >
          <Link to={"/"}>Login</Link>
        </button>
      )}
    </div>
  );
};

export default NewPassword;
