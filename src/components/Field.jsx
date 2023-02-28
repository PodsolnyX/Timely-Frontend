const Field = ({ formId, label, ...props}) => {
    return (
        <>
            <div className="col-12">
                <label htmlFor={formId} className={"text-white"}>{label}</label>
                <input
                    {...props}
                    id={formId}
                    className={"form-control my-2"}
                    disabled={true}/>
            </div>
        </>
    );
}

export default Field;