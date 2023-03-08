import React from 'react';
import {useZustandStore} from "../../../shared/useZustandStore";
import {useScheduleModalStore} from "../../../shared/useScheduleModalStore";
import LessonEditModal from "./lesson-edit-modal";

const LessonEditModalContainer = (props) => {
    return (
        <LessonEditModal
            currentLesson={useScheduleModalStore((state) => state.lessonEditModal.currentLesson)}
            dateTitle={useScheduleModalStore((state) => state.lessonEditModal.dateTitle)}
            isShow={useScheduleModalStore((state) => state.lessonEditModal.isShow)}
            lessonId={useScheduleModalStore((state) => state.lessonEditModal.lessonId)}
            lessonEditModalClose={useScheduleModalStore((state) => state.lessonEditModalClose)}
            isLoadingLesson={useZustandStore((state) => state.isLoadingLesson)}
            lessonError={useZustandStore((state) => state.lessonError)}
            isLesson={useScheduleModalStore((state) => state.lessonEditModal.isLesson)}

            setLessonNameId={useScheduleModalStore((state) => state.setLessonNameId)}
            setTeacherId={useScheduleModalStore((state) => state.setTeacherId)}
            setGroupId={useScheduleModalStore((state) => state.setGroupId)}
            setAudienceId={useScheduleModalStore((state) => state.setAudienceId)}
            setLessonTagId={useScheduleModalStore((state) => state.setLessonTagId)}

            getTeachers={useZustandStore((state) => state.getTeachers)}
            getClassrooms={useZustandStore((state) => state.getClassrooms)}
            getLessonNames={useZustandStore((state) => state.getLessonNames)}
            getGroups={useZustandStore((state) => state.getGroups)}
            getLessonTags={useZustandStore((state) => state.getLessonTags)}

            teachers={useZustandStore((state) => state.teachers)}
            classrooms={useZustandStore((state) => state.classrooms)}
            lessonNames={useZustandStore((state) => state.lessonNames)}
            groups={useZustandStore((state) => state.groups)}
            lessonTags={useZustandStore((state) => state.lessonTags)}

            createLesson={useZustandStore((state) => state.createLesson)}
            editLesson={useZustandStore((state) => state.editLesson)}
            deleteLesson={useZustandStore((state) => state.deleteLesson)}
            resetLessonError={useZustandStore((state) => state.resetLessonError)}

        />
    )

}

export default LessonEditModalContainer;

