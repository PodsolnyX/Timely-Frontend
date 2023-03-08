import FormField from "../../FormField";
import FormLayout from "../../FormLayout";
import ProfileButton from "./profile-button";
import { validator, checkFullName } from "../../../helpers/validation";
const ProfileEditName = ({ index, profile, changeFullName, fullNameState, setFullNameState, fullNameBtnRef }) => {
  const validateFullName = validator(
    checkFullName,
    fullNameState,
    (k, v) => setFullNameState({ [k]: v }),
    "fullName"
  );
  const tryChangeFullName = async (event) => {
    event.preventDefault();
    if (!fullNameState.edit) {
      setFullNameState({ edit: true });
      return;
    }
    setFullNameState({ err: "", msg: "" });
    if (!validateFullName()) return;
    fullNameBtnRef.current.classList.add("disabled");
    try {
      await changeFullName(fullNameState.fullName);
      setFullNameState({ err: "", msg: "Успешно!" });
    } catch (err) {
      fullNameBtnRef.current.classList.remove("disabled");
      if (!err.response) {
        setFullNameState({ err: "Ошибка соединения", msg: "" });
      } else {
        setFullNameState({ err: "Неизвестная ошибка", msg: "" });
      }
    }
  };
  return (
    <FormLayout header={"ФИО"}>
      <FormField
        tabIndex={index}
        formId="fullName"
        formState={fullNameState}
        setFormState={(k, v) => setFullNameState({ [k]: v })}
        validator={validator}
        label="ФИО"
        disabled={!fullNameState.edit || fullNameState.msg}
        type="text"
        placeholder="Введите ФИО"
      />
      <ProfileButton
        state={fullNameState}
        ref={fullNameBtnRef}
        handler={tryChangeFullName}
      />
      <p className="text-danger fw-bold">{fullNameState.err}</p>
      <p className="text-success fw-bold">{fullNameState.msg}</p>
    </FormLayout>
  );
};

export default ProfileEditName;
