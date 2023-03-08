const FormSelect = ({options, label, hidden, formId, ...props}) => {
    return (
        <div className="col-12">
            <label htmlFor={formId}>{label}</label>
            <select className="form-select form-select my-2" id={formId} {...props}>
                {options.map((opt, index) => <option key={index} value={opt.value}>{opt.name}</option>)}
            </select>
        </div>

    );
}

export default FormSelect;