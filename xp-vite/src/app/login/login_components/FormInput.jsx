/* eslint-disable react/prop-types */
import Validation from "@/utils/FormValidations"

const FormInput = ({ register, errors, register_key, label, type = "text", inputProps, labelPorps }) => {
    return (
        <>
            <label htmlFor={register_key} {...labelPorps} >{label}</label>
            <input
                {...register(register_key, Validation[register_key])}
                id={register_key}
                type={type}
                {...inputProps}
            />
            {errors[register_key] && (
                <span
                    style={{ fontSize: ".7rem", fontWeight: "700", color: "red" }}
                >
                    {errors[register_key]?.message || "Validation Error"}
                </span>
            )}
        </>
    )
}

export default FormInput