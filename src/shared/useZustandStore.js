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
        set({isLoading: true});
        try {
            const request = await axios.post("/login", {
                email,
                password
            });
            localStorage.setItem("jwt", request.data.token);
        }
        finally {
            set({isLoading: false});
        }
        //
        /*!!!установить юзера*/
    },
    logout: async () => {
        const jwt = localStorage.getItem("jwt");
        localStorage.removeItem("jwt");
        try {
            await axios.post("/logout", null, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
        }
        finally {
            window.location.reload();
        }

    },
    register: async (email, password, fullName, role) => {
        set({isLoading: true});
        try {
            const request = await axios.post("/register", {
                fullName,
                role,
                email,
                password
            });
            localStorage.setItem("jwt", request.data.token);
        }
        finally {
            set({isLoading: false});
        }
    },
    activate: async () => {},
    getProfile: async () => {},
    editProfile: async () => {},
/*
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