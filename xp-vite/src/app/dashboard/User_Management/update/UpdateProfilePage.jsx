import "./style.scss";
import FormInput from "@/app/login/login_components/FormInput";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AddressForm from "@/app/login/login_components/AddressForm";
import Orgnazations from "@/app/login/login_components/orgnazationsCheckBox";
import { getStaffDetailsHandler, updateStaffDetailsHandler } from "@/api/User_Management/api";
import { useParams } from "react-router-dom";
import BackButton from "@/components/ui/BackButton";
import { toast } from "react-toastify"

const Staff_Profile_Update_Page = () => {
    const [businessType, setBusinessType] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const { id } = useParams();

    async function get_UserDataHandler() {
        setLoading(true);
        try {
            const res = await getStaffDetailsHandler(id);
            if (res.data.success || res.status == 200) {
                const staffData = res.data.data;
                setUser(staffData);
                setBusinessType(staffData?.category_Id?.category);
            }
        } catch (error) {
            console.log(error.error);
        }
        setLoading(false);
    }

    useEffect(() => {
        get_UserDataHandler();
    }, []);



    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {},
    });

    useEffect(() => {
        if (user) {
            const {
                firstName,
                lastName,
                country,
                state,
                city,
                pinCode,
                email,
                phoneNumber,
                category_Id,
                role,
            } = user;
            const y = {
                firstName,
                lastName,
                country,
                state,
                city,
                pinCode,
                email,
                role,
                phoneNumber,
                category_Id,
            };
            objMap(y);
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

    function objMap(obj) {
        Object.keys(obj).forEach((key) => {
            setValue(key, obj[key]);
        });
    }
    const onSubmit = async (data) => {
        try {
            const res = await updateStaffDetailsHandler({
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                pinCode: data.pinCode,
                country: data.country,
                state: data.state,
                city: data.city,
                organization_SubCategory: data.organization_SubCategory, organization: businessType, staff_id: id
            })
            if (res.data.success) {
                setUser(pre => {
                    const x = { ...pre }
                    return { ...x, ...data }
                })
                toast.success("Data Updated Successfully")
                setTimeout(() => {
                    window.location.pathname = "/dashboard/User_Management/"
                }, 1200);
            } else {
                toast.error(res.data.data)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };
    return (
        <div className="update_profile_page">
            <div
                style={{ textAlign: "left", width: "100%", padding: "0px 2rem" }}
                className="div"
            >
                <BackButton href="/dashboard/User_Management/" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Update Staff Profile</h3>
                <div className="flex-column">
                    <FormInput
                        register={register}
                        errors={errors}
                        register_key={"firstName"}
                        label={"First Name"}
                    />
                </div>
                <div className="flex-column">
                    <FormInput
                        register={register}
                        errors={errors}
                        register_key={"lastName"}
                        label={"Last Name"}
                    />
                </div>
                <div className="flex-column">
                    <FormInput
                        register={register}
                        errors={errors}
                        inputProps={{ disabled: true }}
                        register_key={"email"}
                        label={"Email Address"}
                    />
                </div>
                <div className="flex-column">
                    <FormInput
                        register={register}
                        errors={errors}
                        register_key={"phoneNumber"}
                        label={"Phone Number"}
                    />
                </div>
                <div className="flex-column">
                    <label>Business Name</label>
                    <input type="text" value={user.business_Id.name} />
                </div>
                <AddressForm
                    setValue={setValue}
                    errors={errors}
                    register={register}
                    profileUpdateData={{
                        country: user.country,
                        state: user.state,
                        city: user.city,
                    }}
                />
                <div className="flex-column">
                    <FormInput
                        register={register}
                        errors={errors}
                        register_key={"pinCode"}
                        label={"Zip/Pin Code"}
                        type="number"
                    />
                </div>
                <Orgnazations
                    errors={errors}
                    category_Id={user.category_Id}
                    setBusinessType={setBusinessType}
                    register={register}
                    businessType={businessType}
                />
                <div className="flex-column subCategory">
                    <label>Role</label>

                    <div className="items">
                        <div className="item">
                            <input disabled={true} id={"admin"} type="radio" value={"admin"}  {...register('role')} />
                            <label htmlFor={"admin"} className="r-label"></label>
                            <label htmlFor={"admin"}>Admin</label>
                        </div>
                        <div className="item">
                            <input disabled={true} id={"staff"} type="radio" value={"staff"}  {...register('role')} />
                            <label htmlFor={"staff"} className="r-label"></label>
                            <label htmlFor={"staff"}>Staff</label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="start link">
                    Update
                </button>
            </form>
        </div>
    );
};

export default Staff_Profile_Update_Page;
