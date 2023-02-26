import { create } from "zustand";
import axios from "axios";

const searchApi = "http://timely.markridge.space/api/search/";

const initialState = {
  isAuth: !!localStorage.getItem("jwt"),
  isLoading: false,
  error: "",
  profile: {
    fullName: "",
    userName: "",
    email: "",
    group: {
      id: "",
      name: "",
    },
    teacher: {
      id: "",
      name: "",
    },
    roles: [],
  },

  shedule: {},
  teachers: [],
  groups: [],
  classrooms: [],
  timeIntervals: [],
  lessonNames: [],
  lessonTags: [],

  //Данные для модального окна редактирования пар
  lessonEditModal: {
    isShow: false,
    currentLesson: {
      curLessonNameId: null,
      curGroupId: null,
      curAudienceId: null,
      curTeacherId: null,
      curLessonTagId: null,
    },
  },
};

export const useZustandStore = create((set, get) => ({
  ...initialState,

  // getProfile () coming soon

  getGroups: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${searchApi}groups`);
      const groups = response.data;
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
      const response = await axios.get(`${searchApi}teachers`);
      const teachers = response.data;
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
      const response = await axios.get(`${searchApi}classrooms`);
      const classrooms = response.data;
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
      const response = await axios.get(`${searchApi}timeIntervals`);
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
      const response = await axios.get(`${searchApi}lessonNames`);
      const lessonNames = response.data;
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
      const response = await axios.get(`${searchApi}lessonTags`);
      const lessonTags = response.data;
      set({ lessonTags: lessonTags, error: "" });
    } catch (error) {
      set({ error: error.message, lessonTags: [] }); // Update the state with the error message and clear the groups and isAuth
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
  logout: async () => {
    const jwt = localStorage.getItem("jwt");
    localStorage.removeItem("jwt");
    try {
      await axios.post("account/logout", null, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    } finally {
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
  setGroup: async groupId => {
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
  },
  removeGroup: async () => {
    const jwt = localStorage.getItem("jwt");
    await axios.delete("account/group/remove", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
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
  ) =>
    await admin("create", "lesson", {
      nameId,
      tagId,
      groupId,
      teacherId,
      timeIntervalId,
      date,
      classroomId,
    }),
  editLesson: async (
    id,
    nameId,
    tagId,
    groupId,
    teacherId,
    timeIntervalId,
    date,
    classroomId
  ) =>
    await admin("edit", "lesson", id, {
      nameId,
      tagId,
      groupId,
      teacherId,
      timeIntervalId,
      date,
      classroomId,
    }),
  deleteLesson: async id => await admin("delete", "lesson", id),
  //////////////Методы для модального окна редактирования пар//////////////////
  lessonEditModalClose: () => {
    set(state => {
      return {
        ...state,
        lessonEditModal: { ...state.lessonEditModal, isShow: false },
      };
    });
  },
  lessonEditModalOpen: (isLesson, selectLesson) => {
    if (isLesson) {
      const _selectLesson = {
        curLessonNameId: selectLesson.lessonName.value,
        curGroupId: selectLesson.group.value,
        curAudienceId: selectLesson.audience.value,
        curTeacherId: selectLesson.teacher.value,
        curLessonTagId: selectLesson.lessonTag.value,
      };
      set(state => {
        return {
          ...state,
          lessonEditModal: {
            ...state.lessonEditModal,
            isShow: true,
            currentLesson: _selectLesson,
          },
        };
      });
    } else {
      set(state => {
        return {
          ...state,
          lessonEditModal: {
            ...state.lessonEditModal,
            isShow: true,
            currentLesson: {
              curLessonNameId: null,
              curGroupId: null,
              curAudienceId: null,
              curTeacherId: null,
              curLessonTagId: null,
            },
          },
        };
      });
    }
  },
}));

async function admin(action, ...params) {
  const jwt = localStorage.getItem("jwt");
  const headers = {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
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
  }
}
