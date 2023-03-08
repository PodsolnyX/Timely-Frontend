import Field from "../../Field";
import FormLayout from "../../FormLayout";
const ProfileMisc = ({ profile }) => {
  return (
    <FormLayout header={"Другое"}>
      <h5>Здесь приведены данные, которые Вы не можете править</h5>
      <Field label="Полный логин" type="text" value={profile.userName} />
      <Field label="Почта" type="text" value={profile.email} />
      <Field
        label="Статус"
        type="text"
        value={profile.isEmailConfirmed ? "Подтвержден" : "Не подтвержден"}
      />
      <Field
        label="Преподаватель"
        type="text"
        value={profile.teacher ? "Да" : "Нет"}
      />
      <Field
        label="Роли"
        type="text"
        value={profile.roles?.length ? profile.roles.join(", ") : "Нет"}
      />
    </FormLayout>
  );
};

export default ProfileMisc;
