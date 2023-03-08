import {create} from "zustand";

const initialState = {
    lessonEditModal: {
        isShow: false,
        isLesson: false,
        lessonId: false,
        dateTitle: null,
        currentLesson: {
            lessonNameId: null,
            groupId: null,
            audienceId: null,
            teacherId: null,
            lessonTagId: null,
            timeIntervalId: null,
            lessonDate: null,
        },
    },
    lessonViewModal: {
        isShow: false,
        dateTitle: null,
        lessonData: null,
    }
};

export const useScheduleModalStore = create((set, get) => ({
    ...initialState,

    lessonViewModalOpen: (dateTitle, selectLesson) => {
        set(state => {
            return {
                ...state,
                lessonViewModal: {
                    ...state.lessonViewModal,
                    isShow: true,
                    dateTitle: dateTitle,
                    lessonData: selectLesson
                },
            };
        });
    },

    lessonViewModalClose: () => {
        set(state => {
            return {
                ...state,
                lessonViewModal: { ...state.lessonViewModal, isShow: false },
            };
        });
    },

    lessonEditModalClose: () => {
        set(state => {
            return {
                ...state,
                lessonEditModal: { ...state.lessonEditModal, isShow: false },
            };
        });
    },

    lessonEditModalOpen: (isLesson, dateTitle, timeInterval, dateLesson, selectLesson) => {

        if (isLesson) {
            const _selectLesson= {
                lessonNameId: selectLesson.name.id,
                groupId: selectLesson.group.map((g) => g.id),
                audienceId: selectLesson.classroom.id,
                teacherId: selectLesson.teacher.id,
                lessonTagId: selectLesson.tag.id,
                timeIntervalId: timeInterval.id,
                lessonDate: dateLesson
            };
            set(state => {
                return {
                    ...state,
                    lessonEditModal: {
                        ...state.lessonEditModal,
                        currentLesson: _selectLesson,
                        isShow: true,
                        isLesson: true,
                        lessonId: selectLesson.id,
                        dateTitle: dateTitle,
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
                        isLesson: false,
                        lessonId: false,
                        dateTitle: dateTitle,
                        currentLesson: {
                            lessonNameId: null,
                            groupId: null,
                            audienceId: null,
                            teacherId: null,
                            lessonTagId: null,
                            timeIntervalId: timeInterval.id,
                            lessonDate: dateLesson
                        },
                    },
                };
            });
        }
    },

    setLessonNameId: (id) => {
        set(state => {
            return {
                ...state,
                lessonEditModal: {
                    ...state.lessonEditModal,
                    currentLesson: {
                        ...state.lessonEditModal.currentLesson,
                        lessonNameId: id
                    },
                },
            };
        });
    },

    setTeacherId: (id) => {
        set(state => {
            return {
                ...state,
                lessonEditModal: {
                    ...state.lessonEditModal,
                    currentLesson: {
                        ...state.lessonEditModal.currentLesson,
                        teacherId: id
                    },
                },
            };
        });
    },

    setAudienceId: (id) => {
        set(state => {
            return {
                ...state,
                lessonEditModal: {
                    ...state.lessonEditModal,
                    currentLesson: {
                        ...state.lessonEditModal.currentLesson,
                        audienceId: id
                    },
                },
            };
        });
    },

    setLessonTagId: (id) => {
        set(state => {
            return {
                ...state,
                lessonEditModal: {
                    ...state.lessonEditModal,
                    currentLesson: {
                        ...state.lessonEditModal.currentLesson,
                        lessonTagId: id
                    },
                },
            };
        });
    },

    setGroupId: (id) => {
        set(state => {
            return {
                ...state,
                lessonEditModal: {
                    ...state.lessonEditModal,
                    currentLesson: {
                        ...state.lessonEditModal.currentLesson,
                        groupId: id
                    },
                },
            };
        });
    },
}));