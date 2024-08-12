/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

const BusinessForm = ({ errors, register, isCreatingAccount, setBusinessType, businessType }) => {
  const industries = ["Restaurant", "Retail", "Fashion", "Lifestyle", "Health", "Fintech", "Services"];

  const subCategories = {
    "Restaurant": ["Dining", "Cafe", "Fast Food", "Fine Dining", "Food Truck"],
    "Retail": ["Clothing", "Electronics", "Home Goods", "Sporting Goods", "Books"],
    "Fashion": ["Apparel", "Accessories", "Footwear", "Jewelry", "Handbags"],
    "Lifestyle": ["Fitness", "Travel", "Beauty", "Home Decor", "Outdoor"],
    "Health": ["Medical", "Fitness Centers", "Nutrition", "Mental Health", "Pharmacies"],
    "Fintech": ["Payments", "Lending", "Investments", "Blockchain", "Insurance"],
    "Services": ["Consulting", "Cleaning", "Legal", "Marketing", "Event Planning"]
  };


  const handle_Org_Change = (e) => {
    setBusinessType(e.target.value);
  };

  return (
    <>
      <div data-state={isCreatingAccount} className="flex-column">
        <label>Organization:</label>
        <select {...register('organization', {
          required: "Organization is required",
        })} defaultValue={businessType} onChange={handle_Org_Change}>
          <option value="">Select organization</option>
          {industries.map((org) => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
        {errors?.organization && (
          <span
            style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
          >
            {errors.organization.message || "Validation Error"}
          </span>
        )}
      </div>
      <div data-state={isCreatingAccount} className="flex-column">
        <label>Organization Sub Category:</label>
        <select {...register('organization_SubCategory', {
          required: "Organization Category is required",
        })}>
          <option value="">Select organization sub category</option>
          {businessType && subCategories[businessType]?.map((org) => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
        {errors?.organization_SubCategory && (
          <span
            style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
          >
            {errors.organization_SubCategory.message || "Validation Error"}
          </span>
        )}
      </div>
    </>)
};

export default BusinessForm;