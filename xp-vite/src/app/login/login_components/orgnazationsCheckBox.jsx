/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { getCategoryAndSubCategories } from "@/api/Main_Api";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const Orgnazations = ({ category_Id, register, errors, businessType, isCreatingAccount, setBusinessType }) => {

    const [categoriesAndSub, setCategoriesAndSub] = useState([])
    const [isError, setIsError] = useState(null)
    useEffect(() => {
        categories()
    }, [])
    async function categories() {
        try {
            const categoryRes = await getCategoryAndSubCategories()
            if (categoryRes.data.success) {
                setCategoriesAndSub(categoryRes.data.data)
            }
            else {
                setIsError(true)
            }
        } catch (error) {
            setIsError(true)
            console.log(error.message);
            toast.error(error.message)
        }
    }

    if (categoriesAndSub.length === 0 && isError === null) {
        return <p style={{ paddingTop: "1rem", color: "red" }}>Loading...</p>
    }
    if (isError) {
        return <p style={{ paddingTop: "1rem", color: "red" }}>Error: Unable to get organizations and organizations subCategories</p>
    }

    const formattedResults = {};
    categoriesAndSub.forEach((item) => {
        formattedResults[item._id] = item.subCategories;
    });
    return (
        <>
            <div data-state={isCreatingAccount} className="radio-btn">
                {categoriesAndSub.map((category, ind) => {
                    const isActive = businessType === category._id ? true : false;
                    return <div data-tooltip={category._id} onClick={() => setBusinessType(category._id)} key={ind} className="box">
                        <img height={60} width={60} src={category.icon[0].includes("http") ? category.icon[0] : "/assets/account/" + category.icon[0]} alt={category._id} />
                        {isActive && <i
                            style={{ color: "var(--star-color)" }}
                            className="pi pi-check-circle"
                        ></i>}
                    </div>
                })}
            </div>
            {businessType == null && (
                <span
                    style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
                >
                    Organisation is Required
                </span>
            )}
            <div id="subCategory" data-state={isCreatingAccount} className="flex-column subCategory">
                <label>Organisation Sub Category:</label>
                <div className="items">
                    {!businessType &&
                        <div className="item" >
                            <input type="radio" defaultChecked={true} value={""} />
                            <label >Select Organization</label>
                        </div>}
                    {businessType && formattedResults[businessType]?.map((category, index) => (
                        <div className="item" key={index}>
                            <input id={category} type="radio" value={category} defaultChecked={category_Id?.subCategory === category ? true : false} {...register('organization_SubCategory')} />
                            <label htmlFor={category} className="r-label"></label>
                            <label htmlFor={category}>{category}</label>
                        </div>
                    ))}
                </div>
                {/* <select {...register('organization_SubCategory', {
                    required: "Organization Category is required",
                })}>
                    {!businessType && <option value="">Select organization sub category</option>}
                    {businessType && subCategories[businessType]?.map((org) => (
                        <option key={org} value={org}>
                            {org}
                        </option>
                    ))}
                </select> */}
                {errors?.organization_SubCategory && (
                    <span
                        style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
                    >
                        {errors.organization_SubCategory.message || "Validation Error"}
                    </span>
                )}
            </div>
        </>
    )
}

export default Orgnazations



