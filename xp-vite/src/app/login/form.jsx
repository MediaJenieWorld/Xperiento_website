import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { login, sendCodeToEmailHandler } from "@/api/Main_Api";
import { toast } from "react-toastify";
import { UserContext } from "@/store/User_Context";
import { Link } from "react-router-dom";
import VerifyEmail_Box from "./login_components/EmailVerify";
import PasswordInput from "./login_components/PasswordInput";
import FormInput from "./login_components/FormInput";
import AddressForm from "./login_components/AddressForm";
// import BusinessForm from "./login_components/BusinessForm";
import Orgnazations from "./login_components/orgnazationsCheckBox";
import SubscriptionPacksDetails from "./login_components/Subscription";

const AccountForm = () => {
  const { signInHandler } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [verifyModelState, setVerifyModelState] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [businessType, setBusinessType] = useState(null);

  useEffect(() => {
    reset();
    if (loading) {
      setLoading(false);
    }
  }, [isCreatingAccount]);

  const toggleForm = () => {
    setIsCreatingAccount((pre) => !pre);
  };

  const onSubmit = async (data) => {
    if (!businessType && isCreatingAccount)
      return toast.warn("Please choose business type!!!");
    const { password, phoneNumber } =
      data;
    if (!password || !phoneNumber) return;
    setLoading(true);

    if (isCreatingAccount && !isVerified) {
      await sendCodeToEmail(data);
      return setLoading(false);
    }
    const res = await login({ id: phoneNumber, password });
    const parseData = res.data || { success: false, data: "testing" };
    if (parseData.success) {
      if (isCreatingAccount) { sessionStorage.setItem("isNew", true) }
      toast.success(
        isCreatingAccount
          ? "Account Created Successfully"
          : "Logged In. Redirecting to the Dashboard... "
      );
      window.location = "/dashboard";
      signInHandler(parseData.data, parseData.token);
    } else {
      toast.error(parseData.data);
    }
    setLoading(false);
  };

  async function sendCodeToEmail(data) {
    if (!businessType) return toast.error("Choose Business Type")
    const { email } = data
    data.industrySegment = data.businessName
    data.organization = businessType
    delete data.businessName
    toast.info(`Sending code to your ${email} email address.`);
    if (email == "" || loading) return toast.error("Email is required");
    let response
    try {
      setLoading(true);
      response = await sendCodeToEmailHandler(data);
      if (response.data.success === true) {
        toast.success(response.data.data);
        setVerifyModelState(true);
      } else {
        console.log("elseBlock", response);
        toast.error(response.data.data);
      }
    } catch (error) {
      console.log("catch Block", response);
      toast.error(error.message);
    }
    setLoading(false);
  }

  if (verifyModelState) {
    return (
      <VerifyEmail_Box
        getValues={getValues}
        setVerifyModelState={setVerifyModelState}
        setIsVerified={setIsVerified}
        signInHandler={signInHandler}
      />
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>
          {isCreatingAccount == false
            ? "New Insights almost every day!"
            : "Complete Your Profile for the right insights."}
        </h3>
        {isCreatingAccount && (
          <div className="signUp">
            <div data-state={isCreatingAccount} className="flex-column">
              <FormInput register={register} errors={errors} register_key={"firstName"} label={"First Name"} />
            </div>
            <div data-state={isCreatingAccount} className="flex-column">
              <FormInput register={register} errors={errors} register_key={"lastName"} label={"Last Name"} />
            </div>
            <div data-state={isCreatingAccount} className="flex-column">
              <FormInput register={register} errors={errors} register_key={"email"} label={"Email Address"} type="email" inputProps={{ disabled: isVerified }} />
            </div>

            <div data-state={isCreatingAccount} className="flex-column">
              <FormInput register={register} errors={errors} register_key={"businessName"} label={"Business Name"} type="text" />
            </div>
          </div>
        )}
        <div className="flex-column">
          <label htmlFor="phoneNumber">
            {isCreatingAccount === true
              ? "Your Mobile Number"
              : "Email Address | Your Mobile Number"}
          </label>
          <input
            {...register(
              "phoneNumber",
              isCreatingAccount === false
                ? {
                  required: "Field is Required",
                  maxLength: {
                    value: 40,
                    message: "Field Limit length excced 40",
                  },
                  minLength: {
                    value: 4,
                    message: "Input length must be greater than 4",
                  },
                }
                : {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message:
                      "Phone number must be exactly 10 digits and contain only numbers",
                  },
                  minLength: {
                    value: 10,
                    message: "Phone number must be exactly 10 digits long",
                  },
                  maxLength: {
                    value: 10,
                    message: "Phone number must be exactly 10 digits long",
                  },
                }
            )}
            id="phoneNumber"
            type={isCreatingAccount === true ? "number" : "text"}
          />
          {errors.phoneNumber && (
            <span
              style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
            >
              {errors.phoneNumber.message}
            </span>
          )}
        </div>
        <div className="flex-column password">
          <label htmlFor="password">Password</label>
          <PasswordInput register={register} />
          {errors.password && (
            <span style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }} >{errors.password.message || "Validation Error"} </span>
          )}
        </div>
        {isCreatingAccount &&
          <div className="signUp">
            <AddressForm isCreatingAccount={isCreatingAccount} setValue={setValue} errors={errors} register={register} />
            <div data-state={isCreatingAccount} className="flex-column">
              <FormInput register={register} errors={errors} register_key={"pinCode"} label={"Zip/Pin Code"} type="number" />
            </div>
            <Orgnazations errors={errors}
              isCreatingAccount={isCreatingAccount}
              setBusinessType={setBusinessType}
              register={register}
              businessType={businessType} />
            <SubscriptionPacksDetails />
          </div>}
        {/* 
        {isCreatingAccount && <BusinessForm
              isCreatingAccount={isCreatingAccount}
              register={register} errors={errors}
              setBusinessType={setBusinessType} businessType={businessType} /> } */}

        {!isCreatingAccount && (
          <div className="forgot">
            <Link to={"/forgot_password"}>forgot password? </Link>
          </div>
        )}

        {loading ? (
          <button className="start " type="button" disabled={true}>
            {" "}
            <i
              style={{ fontSize: "1.5rem" }}
              className="pi pi-spin pi-spinner"
            ></i>
          </button>
        ) : (
          <button className="start" type="submit">
            {isCreatingAccount
              ? isVerified
                ? "Create Account"
                : "Verify Email"
              : "Log In"}
          </button>
        )}
        <button onClick={toggleForm} type="button" className="link">
          {!isCreatingAccount ? "Create Account" : "Login?"}
        </button>
      </form>
    </>
  );
};

export default AccountForm;
