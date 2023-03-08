import { Image } from "react-bootstrap";
import FormField from "../../FormField";
import FormLayout from "../../FormLayout";
import ProfileButton from "./profile-button";
import { validator, checkLink, checkImage } from "../../../helpers/validation";
const ProfileEditAvatar = ({
  profile,
  changeAvatar,
  removeAvatar,
  avatarState,
  setAvatarState,
  avatarBtnRef,
}) => {
  const validateLink = validator(
    checkLink,
    avatarState,
    (k, v) => setAvatarState({ [k]: v }),
    "avatar"
  );
  const tryChangeAvatar = async (event) => {
    event.preventDefault();
    if (!avatarState.edit) {
      setAvatarState({ edit: true });
      return;
    }
    setAvatarState({ err: "", msg: "" });
    if (!validateLink()) return;
    avatarBtnRef.current.classList.add("disabled");
    try {
      if (!(await checkImage(avatarState.avatar))) {
        await removeAvatar();
      } else await changeAvatar(avatarState.avatar);
      setAvatarState({ err: "", msg: "Успешно!" });
    } catch (err) {
      avatarBtnRef.current.classList.remove("disabled");
      if (!err.response) {
        setAvatarState({ err: "Ошибка соединения", msg: "" });
      } else {
        setAvatarState({ err: "Неизвестная ошибка", msg: "" });
      }
    }
  };
  return (
    <FormLayout header={"Аватар"}>
      <div className="text-center mb-3">
        <Image
          fluid
          src={profile.avatarLink}
          className={"user-profile-avatar"}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://i.ibb.co/kDw4Sd3/photo243703137-457255699.jpg";
          }}
        />
      </div>
      <FormField
        tabIndex="1"
        formId="avatar"
        formState={avatarState}
        setFormState={(k, v) => setAvatarState({ [k]: v })}
        validator={validateLink}
        label="Ссылка на изображение"
        disabled={!avatarState.edit || avatarState.msg}
        type="text"
        placeholder="Введите адрес"
      />
      <ProfileButton
        state={avatarState}
        ref={avatarBtnRef}
        handler={tryChangeAvatar}
      />
      <p className="text-danger fw-bold">{avatarState.err}</p>
      <p className="text-success fw-bold">{avatarState.msg}</p>
    </FormLayout>
  );
};

export default ProfileEditAvatar;
