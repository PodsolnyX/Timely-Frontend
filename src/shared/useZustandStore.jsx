import { create } from "zustand";
import axios from "axios";

const searchApi = "http://timely.markridge.space/api/search/";

const initialState = {
  isAuth: false,
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
};

export const useZustandStore = create(set => ({
  ...initialState,
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
}));
