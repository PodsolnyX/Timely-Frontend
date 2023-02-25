import { create } from "zustand";
const initialState = {
    login: {
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        formError: ""
    },
    register: {
        fullName: "",
        email: "",
        password: "",
        passwordRepeat: "",
        role: "student",
        fullNameError: "",
        emailError: "",
        passwordError: "",
        passwordRepeatError: "",
        formError: ""
    }
};

export const useZustandFormStore = create(set => ({
    ...initialState,
    setLoginData: (key, value) => {
        set((state) => ({
            login: {
                ...state.login,
                [key]: value
            }
        }));

    },
    setRegisterData: (key, value) => {
        set((state) => ({
            register: {
                ...state.register,
                [key]: value
            }
        }));
    }
}));