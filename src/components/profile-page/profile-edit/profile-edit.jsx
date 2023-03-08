import React, { useRef, useEffect } from "react";
import { useZustandFormStore } from "../../../shared/useZustandFormStore";
import { useZustandStore } from "../../../shared/useZustandStore";
import ProfileMisc from "../profile-layout/profile-edit-misc";
import ProfileEditName from "../profile-layout/profile-edit-fullName";
import ProfileEditAvatar from "../profile-layout/profile-edit-avatar";
import ProfileEditGroup from "../profile-layout/profile-edit-group";
import "./profile-edit.css";
const ProfileEdit = () => {
  const profile = useZustandStore((store) => store.profile);
  useEffect(() => {
    if (!fullNameState.fullName) {
      setFullNameState({
        fullName: profile.fullName,
      });
    }
    if (!groupState.groupId) {
      setGroupState({
        groupId: profile.group?.id,
        groupName: profile.group?.name,
      });
    }
    if (!avatarState.avatar) {
      setAvatarState({
        avatar: profile.avatarLink,
      });
    }
  }, []);

  const changeAvatar = useZustandStore((store) => store.setAvatar);
  const removeAvatar = useZustandStore((store) => store.removeAvatar);
  const avatarBtnRef = useRef();
  const avatarState = useZustandFormStore((store) => store.avatar);
  const setAvatarState = useZustandFormStore((store) => store.setAvatarData);

  const changeFullName = useZustandStore((store) => store.editProfile);
  const fullNameBtnRef = useRef();
  const fullNameState = useZustandFormStore((store) => store.fullName);
  const setFullNameState = useZustandFormStore(
    (store) => store.setFullNameData
  );

  const groups = useZustandStore((store) => store.groups);
  const changeGroup = useZustandStore((store) => store.setGroup);
  const removeGroup = useZustandStore((store) => store.removeGroup);
  const groupBtnRef = useRef();
  const groupState = useZustandFormStore((store) => store.group);
  const setGroupState = useZustandFormStore((store) => store.setGroupData);

  const avatarProps = {
    profile,
    changeAvatar,
    removeAvatar,
    avatarBtnRef,
    avatarState,
    setAvatarState,
  };
  const fullNameProps = {
    profile,
    changeFullName,
    fullNameBtnRef,
    fullNameState,
    setFullNameState,
  };
  const groupProps = {
    profile,
    groups,
    changeGroup,
    removeGroup,
    groupBtnRef,
    groupState,
    setGroupState,
  };

  return (
    <div className={"container schedule-page-container text-white"}>
      <div style={{ padding: 20, margin: "50px 0", color: "black" }}>
        <h2 className={"text-white"}>Данные</h2>
        <hr style={{ color: "white" }} />
        <ProfileEditAvatar {...avatarProps} />
        <ProfileEditName {...fullNameProps} />
        {profile.roles?.includes("Student") && (
          <ProfileEditGroup {...groupProps} />
        )}
        <ProfileMisc profile={profile} />
      </div>
    </div>
  );
};

export default ProfileEdit;
