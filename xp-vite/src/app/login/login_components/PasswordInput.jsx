import { useState } from "react";

// eslint-disable-next-line react/prop-types
const PasswordInput = ({ register }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-area">
      <i
        onClick={() => setShowPassword((pre) => !pre)}
        className={showPassword ? "pi pi-eye" : "pi pi-eye-slash"}
      ></i>
      <input
        {...register("password", {
          required: "Password is required",
          pattern: {
            value: /^[A-Za-z\d!@#$%^&*()_+-=]{6,}$/,
            message: "Password must contain at least 6 characters, including letters (uppercase and lowercase), digits, and symbols like !@#$%^&*()_+-="
          },
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
          maxLength: {
            value: 30,
            message: "Password length cannot exceed 30 characters",
          },
        })}
        id="password"
        type={showPassword ? "text" : "password"}
      />
    </div>
  );
};
export default PasswordInput;
