import FormLayout from "../../FormLayout";
import ProfileButton from "./profile-button";
import Select from "react-select";
const ProfileEditGroup = ({ profile, groups, changeGroup, removeGroup, groupBtnRef, groupState, setGroupState }) => {
  const customStyles = {
    singleValue: (styles) => {
      return {
        ...styles,
        color: "black",
      };
    },
    option: (styles) => {
      return {
        ...styles,
        color: "black",
      };
    },
  };

  const tryChangeGroup = async (event) => {
    event.preventDefault();
    if (!groupState.edit) {
      setGroupState({ edit: true });
      return;
    }
    setGroupState({ err: "", msg: "" });
    groupBtnRef.current.classList.add("disabled");
    try {
      if (groupState.groupId === "group-none") await removeGroup();
      else await changeGroup(groupState.groupId, groupState.groupName);
      setGroupState({ err: "", msg: "Успешно!" });
    } catch (err) {
      groupBtnRef.current.classList.remove("disabled");
      if (!err.response) {
        setGroupState({ err: "Ошибка соединения", msg: "" });
      } else {
        setGroupState({ err: "Неизвестная ошибка", msg: "" });
      }
    }
  };
  return (
    <FormLayout header={"Группа"}>
      <Select
        options={[{ label: "Не выбрано", value: "group-none" }, ...groups]}
        styles={customStyles}
        isDisabled={!groupState.edit || groupState.msg}
        value={
          groupState.groupId
            ? { value: groupState.groupId, label: groupState.groupName }
            : { value: "group-none", label: "Не выбрано" }
        }
        onChange={(e) =>
          setGroupState({ groupId: e.value, groupName: e.label })
        }
        placeholder="Выберите группу"
      />
      <ProfileButton
        state={groupState}
        ref={groupBtnRef}
        handler={tryChangeGroup}
      />
      <p className="text-danger fw-bold">{groupState.err}</p>
      <p className="text-success fw-bold">{groupState.msg}</p>
    </FormLayout>
  );
};

export default ProfileEditGroup;
