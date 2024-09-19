import { Fragment, useEffect, useState } from "react";

const FormDataComponent = ({ formData, register }) => {
    return (
        <>
            {/* <h2>{formData.title}</h2> */}
            {formData.sections.map((section) => (
                <div className="tab" key={section.title}>
                    <input type="checkbox" id={section.title} />
                    <label className="title" htmlFor={section.title}>{section.title}
                        <i className="pi pi-minus open"></i>
                        <i className="pi pi-minus close"></i>
                    </label>
                    <div className="content">
                        <ul className="data">
                            {section.fields.map((field) => (
                                <Fragment key={field.label}>
                                    <Section_field field={field} register={register} />
                                </Fragment>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </>
    );
};

const Section_field = ({ field, register }) => {
    const [selected_value, set_selected_value] = useState(null)
    return <>
        <li className="flex-column" data-render-type={field.field_Type}>
            <label>{field.label}</label>
            <div className={"flex"}>
                {field.field_Type === "input" ? <>
                    <input type="text" {...register(`${field?.register_key}`)} />
                </>
                    : field.values.map((value) => {
                        const unique_id = field.register_key + "_" + value.value
                        return (
                            <div className={"flex-col " + field.view_Type} key={value.value}>
                                <input onClick={() => set_selected_value(value)} type={field.field_Type === "multi-select" ? "checkbox" : "radio"} id={unique_id} value={value.value} {...register(`${field?.register_key}`)} />
                                <label className="flex-col" htmlFor={unique_id}>
                                    {value.iconURL && <img className="image-icon round-md" height={60} width={60} src={value.iconURL} alt={value.label} />}
                                    <span className={field.view_Type}> {value.label}</span></label>
                            </div>
                        )
                    })}
            </div>
        </li>
        {selected_value?.children && <Section_field field={selected_value?.children} register={register} />}
    </>
}


export default FormDataComponent