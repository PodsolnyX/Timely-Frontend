const FormPairField = ({ formState, setFormState, validators, placeholders, formIds, labels, index, ...props }) => {
    return (
        <>
            <div className="col-12">
                <label htmlFor={formIds[0]} className={"text-white"}>{labels[0]}</label>
                <input
                    {...props}
                    id={formIds[0]}
                    value={formState[formIds[0]]}
                    onChange={(e) => setFormState(formIds[0], e.target.value)}
                    onBlur={() => {
                        validators[0]();
                        validators[1]();
                    }}
                    tabIndex={index}
                    className={formState[formIds[0] + "Error"] || formState[formIds[1] + "Error"] ? "form-control my-2 is-invalid" : "form-control my-2"}
                    placeholder={placeholders[0]}
                />
            </div>
            <p className="text-danger fw-bold small">{formState[formIds[0] + "Error"]}</p>

            <div className="col-12">
                <label htmlFor={formIds[1]} className={"text-white"}>{labels[1]}</label>
                <input
                    {...props}
                    id={formIds[1]}
                    value={formState[formIds[1]]}
                    onChange={(e) => setFormState(formIds[1], e.target.value)}
                    onBlur={() => {
                        validators[0]();
                        validators[1]();
                    }}
                    tabIndex={+index+1}
                    className={formState[formIds[0] + "Error"] || formState[formIds[1] + "Error"] ? "form-control my-2 is-invalid" : "form-control my-2"}
                    placeholder={placeholders[1]}
                />
            </div>
            <p className="text-danger fw-bold small">{formState[formIds[1] + "Error"]}</p>
        </>

    );
}

export default FormPairField;