const FormField = ({ formState, setFormState, validator, formId, label, ...props}) => {
    return (
        <>
            <div className="col-12">
                <label htmlFor={formId}>{label}</label>
                <input
                    {...props}
                    id={formId}
                    className={formState[formId + "Error"] ? "form-control my-2 is-invalid" : "form-control my-2"}
                    value={formState[formId]}
                    onChange={(e) => setFormState(formId, e.target.value)}
                    onBlur={validator} />
            </div>
            <p className="text-danger fw-bold">{formState[formId + "Error"]}</p>
        </>
    );
}

export default FormField;