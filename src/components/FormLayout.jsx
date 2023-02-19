const FormLayout = ({children, header}) => {
    return (
        <div className={"container"}>
            <h1 className={"text-center"}>{header}</h1>
            <div className="card p-0 mx-auto my-4 reg w-75 bold">
                <div className="card-body">
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