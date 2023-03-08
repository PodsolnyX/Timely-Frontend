const FormLayout = ({children, header}) => {
    return (
        <div className={"container"}>
            <h2 className={"text-center text-white"}>{header}</h2>
            <div className="card p-0 mx-auto my-4 reg bold">
                <div className="card-body schedule-page-container">
                    <div className="row">
                        <form>
                            {children}
                        </form>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default FormLayout;