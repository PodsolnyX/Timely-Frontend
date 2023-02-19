import {create} from "zustand";
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

    //Данные для модального окна редактирования пар
    lessonEditModal: {
        isShow: false,
        currentLesson: {
            curLessonNameId: null,
            curGroupId: null,
            curAudienceId: null,
            curTeacherId: null,
            curLessonTagId: null
        }
    }
};

export const useZustandStore = create((set, get) => ({
    ...initialState,
    init: () => {
        if (localStorage.getItem("jwt")) {
            set({isAuth: true});
        }
    },
    login: async (email, password) => {
        set({isLoading: true});
        try {
            const request = await axios.post("/login", {
                email,
                password
            });
            localStorage.setItem("jwt", request.data.token);
            set({isAuth: true});
        } finally {
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
        } finally {
            set({isAuth: false});
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
            set({isAuth: true});
        } finally {
            set({isLoading: false});
        }
    },
    //////////////Методы для модального окна редактирования пар//////////////////
    lessonEditModalClose: () => {
        set((state) => {
            return {
                ...state, lessonEditModal: {...state.lessonEditModal, isShow: false}
            };
        })
    },
    lessonEditModalOpen: (isLesson, selectLesson) => {
        if (isLesson) {
            const _selectLesson= {
                    curLessonNameId: selectLesson.lessonName.value,
                    curGroupId: selectLesson.group.value,
                    curAudienceId: selectLesson.audience.value,
                    curTeacherId: selectLesson.teacher.value,
                    curLessonTagId: selectLesson.lessonTag.value
            };
            set((state) => {
                return {
                    ...state,
                    lessonEditModal: {
                        ...state.lessonEditModal,
                        isShow: true,
                        currentLesson: _selectLesson,
                    }
                };
            })
        }
        else {
            set((state) => {
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
                            curLessonTagId: null
                        },
                    }
                };
            })
        }

    },
    //////////////////////////////////////////////////////////////////////////////
    activate: async () => {
    },
    getProfile: async () => {
    },
    editProfile: async () => {
    },
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