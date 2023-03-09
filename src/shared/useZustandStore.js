import { create } from "zustand";
import axios from "axios";
import { sheduleMatrix } from "../helpers/sheduleMatrix";
import { useZustandFormStore } from "./useZustandFormStore";

const initialState = {
  isAuth: !!localStorage.getItem("jwt"),
  isLoading: false,
  isLoadingLesson: false,
  isLoadingSchedule: false,
  isLoadingConfirmEmail: false,
  confirmEmailError: "",
  error: "",
  lessonError: "",
  profile: JSON.parse(localStorage.getItem("profile")) || {},

  groupSchedule: null,
  classroomSchedule: null,
  teacherSchedule: null,

  teachers: [],
  groups: [],
  classrooms: [],
  domains: [],

  users: [],
  roles: [],

  timeIntervals: [],
  lessonNames: [],
  lessonTags: [],

  adminErrors: {},
  teacherErrors: {},
  domainErrors: {},
  classroomErrors: {},
  groupErrors: {},
  lessonTagErrors: {},
  lessonNameErrors: {},
  timeIntervalErrors: {},
};

export const useZustandStore = create(set => ({
  ...initialState,

  editUserRoles: async (email, roles) => {
    set({ isLoading: true });
    const jwt = localStorage.getItem("jwt");
    try {
      await axios.put(
        `admin/user-roles`,
        {
          email,
          roles,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (error) {
      set({ adminErrors: error.response.data.title });
    } finally {
      set({ isLoading: false });
    }
  },

  getUsers: async () => {
    set({ isLoading: true });
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.get(`admin/users`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const users = response.data;
      set({ users: users, error: "" });
    } catch (error) {
      set({ error: error.message, users: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  getRoles: async () => {
    set({ isLoading: true });
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.get(`admin/roles`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const roles = response.data;
      set({ roles: roles, error: "" });
    } catch (error) {
      set({ error: error.message, roles: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  getTeacherSchedule: async (date, teacherID) => {
    set({ isLoading: true });
    try {
      const timeIntervals = await axios.get(`search/timeIntervals`);
      const schedule = await axios.get(`schedule/teacher/${teacherID}`, {
        params: {
          date,
        },
      });
      set({
        teacherSchedule: sheduleMatrix(schedule.data, timeIntervals.data),
        error: "",
      });
    } catch (error) {
      set({ error: error.message, teacherSchedule: null });
    } finally {
      set({ isLoading: false });
    }
  },

  getClassroomSchedule: async (date, classroomID) => {
    set({ isLoading: true });
    try {
      const timeIntervals = await axios.get(`search/timeIntervals`);
      const schedule = await axios.get(`schedule/classroom/${classroomID}`, {
        params: {
          date,
        },
      });
      set({
        classroomSchedule: sheduleMatrix(schedule.data, timeIntervals.data),
        error: "",
      });
    } catch (error) {
      set({ error: error.message, classroomSchedule: null });
    } finally {
      set({ isLoading: false });
    }
  },

  getGroupSchedule: async (date, groupID) => {
    set({ isLoadingSchedule: true });
    try {
      const timeIntervals = await axios.get(`search/timeIntervals`);
      const schedule = await axios.get(`schedule/group/${groupID}`, {
        params: {
          date,
        },
      });
      set({
        groupSchedule: sheduleMatrix(schedule.data, timeIntervals.data),
        error: "",
      });
    } catch (error) {
      set({ error: error.message, groupSchedule: null });
    } finally {
      set({ isLoadingSchedule: false });
    }
  },

  getProfile: async () => {
    set({ isLoading: true });
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await axios.get(`account/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const profile = response.data;
      set({ profile: profile, error: "" });
      localStorage.setItem("profile", JSON.stringify(profile));
    } catch (error) {
      set({ error: error.message, profile: {} });
    } finally {
      set({ isLoading: false });
    }
  },

  getGroups: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`search/groups`);
      const groups = response.data;
      groups.forEach(el => {
        delete Object.assign(el, {
          ["value"]: el["id"],
          ["label"]: el["name"],
        })["id"];
        delete el["name"];
      });
      set({ groups: groups, error: "" });
    } catch (error) {
      set({ error: error.message, groups: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  getTeachers: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`search/teachers`);
      const teachers = response.data;
      teachers.forEach(el => {
        delete Object.assign(el, {
          ["value"]: el["id"],
          ["label"]: el["name"],
        })["id"];
        delete el["name"];
      });
      set({ teachers: teachers, error: "" });
    } catch (error) {
      set({ error: error.message, teachers: [] }); // Update the state with the error message and clear the groups and isAuth
    } finally {
      set({ isLoading: false });
    }
  },

  getClassrooms: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`search/classrooms`);
      const classrooms = response.data;
      classrooms.forEach(el => {
        delete Object.assign(el, {
          ["value"]: el["id"],
          ["label"]: el["name"],
        })["id"];
        delete el["name"];
      });
      set({ classrooms: classrooms, error: "" });
    } catch (error) {
      set({ error: error.message, classrooms: [] }); // Update the state with the error message and clear the groups and isAuth
    } finally {
      set({ isLoading: false });
    }
  },

  getTimeIntervals: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`search/timeIntervals`);
      const timeIntervals = response.data;
      set({ timeIntervals: timeIntervals, error: "" });
    } catch (error) {
      set({ error: error.message, timeIntervals: [] }); // Update the state with the error message and clear the groups and isAuth
    } finally {
      set({ isLoading: false });
    }
  },

  getLessonNames: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`search/lessonNames`);
      const lessonNames = response.data;
      lessonNames.forEach(el => {
        delete Object.assign(el, {
          ["value"]: el["id"],
          ["label"]: el["name"],
        })["id"];
        delete el["name"];
      });
      set({ lessonNames: lessonNames, error: "" });
    } catch (error) {
      set({ error: error.message, lessonNames: [] }); // Update the state with the error message and clear the groups and isAuth
    } finally {
      set({ isLoading: false });
    }
  },

  getLessonTags: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`search/lessonTags`);
      const lessonTags = response.data;
      lessonTags.forEach(el => {
        delete Object.assign(el, {
          ["value"]: el["id"],
          ["label"]: el["name"],
        })["id"];
        delete el["name"];
      });
      set({ lessonTags: lessonTags, error: "" });
    } catch (error) {
      set({ error: error.message, lessonTags: [] }); // Update the state with the error message and clear the groups and isAuth
    } finally {
      set({ isLoading: false });
    }
  },

  getDomains: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`search/domains`);
      const domains = response.data;
      domains.forEach(el => {
        delete Object.assign(el, {
          ["value"]: el["id"],
          ["label"]: el["url"],
        })["id"];
        delete el["url"];
      });
      set({ domains: domains, error: "" });
    } catch (error) {
      set({ error: error.message, domains: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (email, password, fullName) => {
    set({ isLoading: true });
    try {
      const request = await axios.post("account/register", {
        fullName,
        email,
        password,
      });
      localStorage.setItem("jwt", request.data.token);
      set({ isAuth: true });
    } finally {
      set({ isLoading: false });
    }
  },

  sendEmail: async () => {
    const jwt = localStorage.getItem("jwt");
    await axios.post("account/send-email-confirmation", null, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  },

  confirmEmail: async token => {
    const jwt = localStorage.getItem("jwt");
    set({ isLoadingConfirmEmail: true, confirmEmailError: "" });
    try {
      await axios.post(
        "account/confirm-email",
        {
          token,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (error) {
      set({ confirmEmailError: error.response.data.title });
    } finally {
      set({ isLoadingConfirmEmail: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const request = await axios.post("account/login", {
        email,
        password,
      });
      localStorage.setItem("jwt", request.data.token);
      set({ isAuth: true });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async (force = false) => {
    const jwt = localStorage.getItem("jwt");
    localStorage.removeItem("jwt");
    localStorage.removeItem("profile");
    try {
      if (!force) {
        await axios.post("account/logout", null, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
      }
    } finally {
      useZustandFormStore.getState().reset();
      set({ isAuth: false });
    }
  },

  editProfile: async fullName => {
    const jwt = localStorage.getItem("jwt");
    await axios.put(
      "account/profile",
      {
        fullName,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    set(state => ({
      profile: {
        ...state.profile,
        fullName,
      },
    }));
  },

  changePassword: async (currentPassword, newPassword) => {
    const jwt = localStorage.getItem("jwt");
    await axios.put(
      "account/password-change",
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  },

  setGroup: async (groupId, gorupName) => {
    const jwt = localStorage.getItem("jwt");
    await axios.put(
      "account/group/set",
      {
        groupId,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    set(state => ({
      profile: {
        ...state.profile,
        group: {
          name: gorupName,
          id: groupId,
        },
      },
    }));
  },

  removeGroup: async () => {
    const jwt = localStorage.getItem("jwt");
    await axios.delete("account/group/remove", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    set(state => ({
      profile: {
        ...state.profile,
        group: null,
      },
    }));
  },

  setAvatar: async avatarLink => {
    const jwt = localStorage.getItem("jwt");
    await axios.put(
      "account/avatar/set",
      {
        avatarLink,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    set(state => ({
      profile: {
        ...state.profile,
        avatarLink,
      },
    }));
  },

  removeAvatar: async () => {
    const jwt = localStorage.getItem("jwt");
    await axios.delete("account/avatar/remove", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    set(state => ({
      profile: {
        ...state.profile,
        avatarLink: "https://i.ibb.co/kDw4Sd3/photo243703137-457255699.jpg",
      },
    }));
  },

  createTeacher: async name => await admin("create", "teacher", { name }),
  editTeacher: async (id, name) => await admin("edit", "teacher", id, { name }),
  deleteTeacher: async id => await admin("delete", "teacher", id),

  createDomain: async url => await admin("create", "domain", { url }),
  editDomain: async (id, url) => await admin("edit", "domain", id, { url }),
  deleteDomain: async id => await admin("delete", "domain", id),

  createClassroom: async name => await admin("create", "classroom", { name }),
  editClassroom: async (id, name) =>
    await admin("edit", "classroom", id, { name }),
  deleteClassroom: async id => await admin("delete", "classroom", id),

  createGroup: async name => await admin("create", "group", { name }),
  editGroup: async (id, name) => await admin("edit", "group", id, { name }),
  deleteGroup: async id => await admin("delete", "group", id),

  createLessonName: async name => await admin("create", "lessonName", { name }),
  editLessonName: async (id, name) =>
    await admin("edit", "lessonName", id, { name }),
  deleteLessonName: async id => await admin("delete", "lessonName", id),

  createLessonTag: async name => await admin("create", "lessonTag", { name }),
  editLessonTag: async (id, name) =>
    await admin("edit", "lessonTag", id, { name }),
  deleteLessonTag: async id => await admin("delete", "lessonTag", id),

  createTimeInterval: async (startTime, endTime) =>
    await admin("create", "timeInterval", { startTime, endTime }),
  editTimeInterval: async (id, startTime, endTime) =>
    await admin("edit", "timeInterval", id, { startTime, endTime }),
  deleteTimeInterval: async id => await admin("delete", "timeInterval", id),

  createLesson: async (
    nameId,
    tagId,
    groupId,
    teacherId,
    timeIntervalId,
    date,
    classroomId
  ) => {
    try {
      set({ lessonError: "", isLoadingLesson: true });
      await admin("create", "lesson", {
        nameId,
        tagId,
        groupId,
        teacherId,
        timeIntervalId,
        date,
        classroomId,
      });
    } catch (error) {
      set({ lessonError: error.response.data.title });
    } finally {
      set({ isLoadingLesson: false });
    }
  },
  editLesson: async (
    id,
    nameId,
    tagId,
    groupId,
    teacherId,
    timeIntervalId,
    date,
    classroomId
  ) => {
    try {
      set({ lessonError: "", isLoadingLesson: true });
      await admin("edit", "lesson", id, {
        nameId,
        tagId,
        groupId,
        teacherId,
        timeIntervalId,
        date,
        classroomId,
      });
    } catch (error) {
      set({ lessonError: error.response.data.title });
    } finally {
      set({ isLoadingLesson: false });
    }
  },
  deleteLesson: async id => {
    try {
      set({ lessonError: "", isLoadingLesson: true });
      await admin("delete", "lesson", id);
    } catch (error) {
      set({ lessonError: error.response.data.title });
    } finally {
      set({ isLoadingLesson: false });
    }
  },
  resetLessonError: () => {
    set({ lessonError: "" });
  },
}));

async function admin(action, ...params) {
  const jwt = localStorage.getItem("jwt");
  const headers = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  try {
    adminErrHandler(action, null, ...params);
    switch (action) {
      case "create":
        await axios.post(`admin/${params[0]}/create`, params[1], headers);
        break;
      case "edit":
        await axios.put(
          `admin/${params[0]}/edit/${params[1]}`,
          params[2],
          headers
        );
        break;
      case "delete":
        await axios.delete(`admin/${params[0]}/delete/${params[1]}`, headers);
        break;
      default:
        throw Error();
    }
  } catch (error) {
    adminErrHandler(action, error, ...params);
    throw error;
  }
}

function adminErrHandler(action, error, ...params) {
  //if (!error.isAxiosError && error !== null) return;
  let errName = error ? error.response?.data?.title : "";
  if (!errName && errName !== "") errName = "Нет соединения";
  const errKey = `${params[0]}Errors`;
  if (action === "create") {
    useZustandStore.setState(state => ({
      [errKey]: {
        ...state[errKey],
        create: errName,
      },
    }));
    return;
  }
  useZustandStore.setState(state => ({
    [errKey]: {
      ...state[errKey],
      [params[1]]: errName,
    },
  }));
}
