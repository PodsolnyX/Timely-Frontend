import { create } from "zustand";
import axios from "axios";
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
    login: async (email, password) => {
        const request = await axios.post("/account/login", {
            email,
            password
        });
        localStorage.setItem("jwt", request.data.token);
        window.location.href = "/schedule"; //
        return true;

        /*!!!установить юзера*/
    },/*
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
*/
}));