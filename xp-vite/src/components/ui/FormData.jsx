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
                                <li className="flex-column" data-render-type={field.field_Type} key={field.label}>
                                    <label>{field.label}</label>
                                    <div className={"flex"}>
                                        {field.field_Type === "input" ? <>
                                            <input type="text" {...register(`${field?.register_key}`)} />
                                        </>
                                            : field.values.map((value) => {
                                                const unique_id = field.register_key + "_" + value.value
                                                return (
                                                    <div className={"flex-col " + field.view_Type} key={value.value}>
                                                        <input type="radio" id={unique_id} value={value.value} {...register(`${field?.register_key}`)} />
                                                        <label className="flex-col" htmlFor={unique_id}>
                                                            {value.iconURL && <img className="image-icon round-md" height={60} width={60} src={value.iconURL} alt={value.label} />}
                                                            <span className={field.view_Type}> {value.label}</span></label>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </>
    );
};

export default FormDataComponent