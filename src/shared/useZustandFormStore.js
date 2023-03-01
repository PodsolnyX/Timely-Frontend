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
    },
    changePassword: {
        newPassword: "",
        newPasswordRepeat: "",
        oldPassword: "",
        newPasswordError: "",
        newPasswordRepeatError: "",
        oldPasswordError: "",
        formMsg: {
            err: "",
            msg: ""
        }
    },
    confirm: {
        msg: "Отправить ещё раз",
        sent: false,
        err: false
    },
    fullName: {
        edit: false,
        fullName: "",
        fullNameError: "",
        err: "",
        msg: ""
    },
    group: {
        edit: false,
        groupId: "",
        groupName: "",
        err: "",
        msg: ""
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
    },
    setChangePasswordData: (key, value) => {
        set((state) => ({
            changePassword: {
                ...state.changePassword,
                [key]: value
            }
        }));
    },
    setConfirmData: (value) => {
        set(() => ({
            confirm: value
        }));
    },
    setFullNameData: (value) => {
        set((state) => ({
            fullName: {
                ...state.fullName,
                ...value
            }
        }));
    },
    setGroupData: (value) => {
        set((state) => ({
            group: {
                ...state.group,
                ...value
            }
        }));
    },
    reset: () => set(initialState)
}));