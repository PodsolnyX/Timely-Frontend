const FormPairField = ({ formState, setFormState, validators, placeholders, formIds, labels, index, ...props }) => {
    return (
        <>
            <div className="col-12">
                <label htmlFor="password">{labels[0]}</label>
                <input
                    {...props}
                    id={formIds[0]}
                    value={formState[formIds[0]]}
                    onChange={(e) => setFormState((state) => ({ ...state, [formIds[0]]: e.target.value }))}
                    onBlur={() => {
                        validators[0]();
                        validators[1]();
                    }}
                    tabIndex={index}
                    className={formState[formIds[0] + "Error"] || formState[formIds[1] + "Error"] ? "form-control my-2 is-invalid" : "form-control my-2"}
                    placeholder={placeholders[0]}
                />
            </div>
            <p className="text-danger fw-bold">{formState.passwordError}</p>

            <div className="col-12">
                <label htmlFor="passwordRepeat">{labels[1]}</label>
                <input
                    {...props}
                    id={formIds[1]}
                    value={formState[formIds[1]]}
                    onChange={(e) => setFormState((state) => ({ ...state, [formIds[1]]: e.target.value }))}
                    onBlur={() => {
                        validators[0]();
                        validators[1]();
                    }}
                    tabIndex={+index+1}
                    className={formState[formIds[0] + "Error"] || formState[formIds[1] + "Error"] ? "form-control my-2 is-invalid" : "form-control my-2"}
                    placeholder={placeholders[1]}
                />
            </div>
            <p className="text-danger fw-bold">{formState.passwordRepeatError}</p>
        </>

    );
}

export default FormPairField;