
import "./style.scss"
import FormInput from "@/app/login/login_components/FormInput"
import { useForm } from "react-hook-form";
import { viewProfile_Api } from "@/api/Main_Api";
import { useEffect, useState } from "react";
import Orgnazations from "@/app/login/login_components/orgnazationsCheckBox";
import AddressForm from "@/app/login/login_components/AddressForm";
const UpdateProfilePage = () => {
    const [businessType, setBusinessType] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    async function get_UserDataHandler() {
        setLoading(true)
        try {
            const res = await viewProfile_Api()
            if (res.data.success || res.status == 200) {
                setUser(res.data.data)
            }
        } catch (error) {
            console.log(error.error);
        }
        setLoading(false)
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
        },
    });

    useEffect(() => {
        get_UserDataHandler()
        if (user) {
            setBusinessType(user.organization)
        }
    }, []);
    useEffect(() => {
        if (user) {
            setBusinessType(user.organization)
        }
    }, [user]);
    if (isLoading) {
        return (
            <div className="dashboard">
                <h1>Loading...</h1>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="dashboard">
                <h1>Error: User not authenticated!</h1>
            </div>
        );
    }
    if (user) {
        const {
            firstName,
            lastName,
            country,
            state,
            city,
            pinCode,
            organization,
            organization_SubCategory,
            industrySegment,
        } = user
        const y = {
            firstName,
            lastName,
            country,
            state,
            city,
            pinCode,
            organization,
            organization_SubCategory,
            industrySegment,
        }
        objMap(y)
    }


    function objMap(obj) {
        Object.keys(obj).forEach((key) => {
            setValue(key, obj[key]);
        });
    }

    const onSubmit = (data) => {
        console.log("Form Data", data);
    }
    return (
        <div className="update_profile_page">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Update Profile Page</h3>
                <div className="flex-column">
                    <FormInput register={register} errors={errors} register_key={"firstName"} label={"First Name"} />
                </div>
                <div className="flex-column">
                    <FormInput register={register} errors={errors} register_key={"lastName"} label={"Last Name"} />
                </div>
                <div className="flex-column">
                    <FormInput register={register} errors={errors} register_key={"industrySegment"} label={"Business Name"} type="text" />
                </div>
                <AddressForm setValue={setValue} errors={errors} register={register} profileUpdateData={{
                    country: user.country,
                    state: user.state,
                    city: user.city,
                }} />
                <div className="flex-column">
                    <FormInput register={register} errors={errors} register_key={"pinCode"} label={"Zip/Pin Code"} type="number" />
                </div>
                <Orgnazations errors={errors}
                    setBusinessType={setBusinessType}
                    register={register}
                    businessType={businessType} />
                <button type="submit" className="start link">Update</button>
            </form>
        </div>
    )
}

export default UpdateProfilePage