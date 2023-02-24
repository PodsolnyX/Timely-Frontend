import { create } from "zustand";
import axios from "axios";
const initialState = {
    isAuth: !!localStorage.getItem("jwt"),
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
    register: async (email, password, fullName) => {
        set({ isLoading: true });
        try {
            const request = await axios.post("account/register", {
                fullName,
                email,
                password
            });
            localStorage.setItem("jwt", request.data.token);
            set({ isAuth: true });
        }
        finally {
            set({ isLoading: false });
        }
    },
    sendEmail: async () => {
        const jwt = localStorage.getItem("jwt");
        await axios.post("account/send-email-confirmation", null, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
    },
    confirmEmail: async (token) => {
        const jwt = localStorage.getItem("jwt");
        await axios.post("account/confirm-email",
            {
                token
            },
            {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
    },
    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const request = await axios.post("account/login", {
                email,
                password
            });
            localStorage.setItem("jwt", request.data.token);
            set({ isAuth: true });
        }
        finally {
            set({ isLoading: false });
        }
    },
    logout: async () => {
        const jwt = localStorage.getItem("jwt");
        localStorage.removeItem("jwt");
        try {
            await axios.post("account/logout", null, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
        }
        finally {
            set({ isAuth: false });
        }
    },
    editProfile: async (fullName) => {
        const jwt = localStorage.getItem("jwt");
        await axios.put("account/profile",
            {
                fullName
            },
            {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            }
        )
    },
    changePassword: async (currentPassword, newPassword) => {
        const jwt = localStorage.getItem("jwt");
        await axios.put("account/password-change",
            {
                currentPassword,
                newPassword
            },
            {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            }
        )
    },
    setGroup: async (groupId) => {
        const jwt = localStorage.getItem("jwt");
        await axios.put("account/group/set",
            {
                groupId,
            },
            {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            }
        )
    },
    removeGroup: async () => {
        const jwt = localStorage.getItem("jwt");
        await axios.delete("account/group/remove", {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
    },
    
    createTeacher: async (name) => await admin("create", "teacher", { name }),
    editTeacher: async (id, name) => await admin("edit", "teacher", id, { name }),
    deleteTeacher: async (id) => await admin("delete", "teacher", id),

    createDomain: async (url) => await admin("create", "domain", { url }),
    editDomain: async (id, url) => await admin("edit", "domain", id, { url }),
    deleteDomain: async (id) => await admin("delete", "domain", id),

    createClassroom: async (name) => await admin("create", "classroom", { name }),
    editClassroom: async (id, name) => await admin("edit", "classroom", id, { name }),
    deleteClassroom: async (id) => await admin("delete", "classroom", id),

    createGroup: async (name) => await admin("create", "group", { name }),
    editGroup: async (id, name) => await admin("edit", "group", id, { name }),
    deleteGroup: async (id) => await admin("delete", "group", id),

    createLessonName: async (name) => await admin("create", "lessonName", { name }),
    editLessonName: async (id, name) => await admin("edit", "lessonName", id, { name }),
    deleteLessonName: async (id) => await admin("delete", "lessonName", id),

    createLessonTag: async (name) => await admin("create", "lessonTag", { name }),
    editLessonTag: async (id, name) => await admin("edit", "lessonTag", id, { name }),
    deleteLessonTag: async (id) => await admin("delete", "lessonTag", id),

    createTimeInterval: async (startTime, endTime) => await admin("create", "timeInterval", { startTime, endTime }),
    editTimeInterval: async (id, startTime, endTime) => await admin("edit", "timeInterval", id, { startTime, endTime }),
    deleteTimeInterval: async (id) => await admin("delete", "timeInterval", id),

    createLesson: async (
        nameId,
        tagId,
        groupId,
        teacherId,
        timeIntervalId,
        date,
        classroomId
    ) => await admin("create", "lesson", { 
        nameId,
        tagId,
        groupId,
        teacherId,
        timeIntervalId,
        date,
        classroomId
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
    ) => await admin("edit", "lesson", id, {
        nameId,
        tagId,
        groupId,
        teacherId,
        timeIntervalId,
        date,
        classroomId
    }),
    deleteLesson: async (id) => await admin("delete", "lesson", id)
}));

async function admin(action, ...params) {
    const jwt = localStorage.getItem("jwt");
    const headers = {
        headers: {
            "Authorization": `Bearer ${jwt}`
        }
    };
    switch(action) {
        case "create":
            await axios.post(`admin/${params[0]}/create`, params[1], headers);
            break;
        case "edit":
            await axios.put(`admin/${params[0]}/edit/${params[1]}`, params[2], headers);
            break;
        case "delete":
            await axios.delete(`admin/${params[0]}/delete/${params[1]}`, headers);
            break;
    }
}