import {Button, Container} from "react-bootstrap";
import {useZustandStore} from "../../shared/useZustandStore";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";

const ConfirmEmailPage = () => {

    const confirmEmail = useZustandStore(state => state.confirmEmail);
    const isLoading = useZustandStore(state => state.isLoadingConfirmEmail);
    const error = useZustandStore(state => state.confirmEmailError);

    const [search, setSearch] = useSearchParams();
    const [isConfirm, setIsConfirm] = useState(false);

    const onConfirm = () => {
        confirmEmail(search.get("token").replaceAll(" ", "+"))
            .then(() => {
                if (useZustandStore.getState().confirmEmailError === "") setIsConfirm(true)
            })
    }

    return (
        <Container className={"mt-5 col-12 col-lg-6"}>
            <div className="card p-0 mx-auto my-4 reg bold">
                <div className="card-body schedule-page-container text-center">
                    {isConfirm
                        ? <>
                            <h3 className={"my-5"}>Почта успешно подтверждена!</h3>
                        </>
                        : <>
                            <h3 className={"mt-5 mb-4"}>Для подтверждения почты нажмите на кнопку</h3>
                            {isLoading ? <h6 className={"mb-4"}>LOADING...</h6> : null}
                            {error !== "" ? <h5 className={"mb-4 text-danger"}>Ошибка: {error}</h5> : null}
                            <Button
                                variant={"outline-primary"}
                                className={"mb-5"}
                                onClick={onConfirm}
                                disabled={isLoading ? "disabled" : null}
                            >
                                Подтвердить
                            </Button>
                        </>
                    }
                </div>
            </div>
        </Container>
    );
}

export default ConfirmEmailPage;