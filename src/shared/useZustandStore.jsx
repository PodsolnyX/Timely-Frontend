import { create } from "zustand";

const initialState = {
  isAuth: false,
  isLoading: false,
  error: "",
  user: {
    name: "",
    role: [],
    group: 0,
    email: "",
  },
  


};

export const useZustandStore = create(set => ({
  ...initialState,
  login: (email, password) => {
    set((user.isLoading = true));
    // axios.get("https://www.database")..........
    // if (response.ok) {error = "", user = data.user, set(isAuth=true)}
    // else {error = data.error}
    set((user.isLoading = false));
    location.reload();
  },
  register: (name, role, group, email) => {
    set((user.isLoading = true));
    // axios.post("https://www.database")..........
    // if (response.ok) {error = "", user = data.user, set(isAuth=true)}
    // else {error = data.error}
    // localStorage.setItem("auth", true)
    // localStorage.setItem("user", data.user)
    set((user.isLoading = false));
    location.reload();
  },
  logout: () => {
    // localStorage.delete("auth")
    // localStorage.delete("user")
    location.reload();
  },

// пока не трогать
//   confirmMail: () => {},
//   changeProfile: () => {},
  
// // админ
//   addPair: () => {},
//   deletePair: () => {},
//   changePair: () => {},
//   adminChangeEmail: () => {},
//   adminCreateTeacher
}));
