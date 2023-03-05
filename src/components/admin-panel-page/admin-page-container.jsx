import {useZustandStore} from "../../shared/useZustandStore";
import AdminPage from "./admin-page";

const AdminPageContainer = (props) => {

    return (
        <AdminPage

            getTeachers={useZustandStore((state) => state.getTeachers)}
            createTeacher={useZustandStore((state) => state.createTeacher)}
            editTeacher={useZustandStore((state) => state.editTeacher)}
            deleteTeacher={useZustandStore((state) => state.deleteTeacher)}

            getClassrooms={useZustandStore((state) => state.getClassrooms)}
            createClassroom={useZustandStore((state) => state.createClassroom)}
            editClassroom={useZustandStore((state) => state.editClassroom)}
            deleteClassroom={useZustandStore((state) => state.deleteClassroom)}

            getLessonNames={useZustandStore((state) => state.getLessonNames)}
            createLessonName={useZustandStore((state) => state.createLessonName)}
            editLessonName={useZustandStore((state) => state.editLessonName)}
            deleteLessonName={useZustandStore((state) => state.deleteLessonName)}

            getGroups={useZustandStore((state) => state.getGroups)}
            createGroup={useZustandStore((state) => state.createGroup)}
            editGroup={useZustandStore((state) => state.editGroup)}
            deleteGroup={useZustandStore((state) => state.deleteGroup)}

            getLessonTags={useZustandStore((state) => state.getLessonTags)}
            createLessonTag={useZustandStore((state) => state.createLessonTag)}
            editLessonTag={useZustandStore((state) => state.editLessonTag)}
            deleteLessonTag={useZustandStore((state) => state.deleteLessonTag)}

            getDomains={useZustandStore((state) => state.getDomains)}
            createDomain={useZustandStore((state) => state.createDomain)}
            editDomain={useZustandStore((state) => state.editDomain)}
            deleteDomain={useZustandStore((state) => state.deleteDomain)}

            getTimeIntervals={useZustandStore((state) => state.getTimeIntervals)}
            createTimeInterval={useZustandStore((state) => state.createTimeInterval)}
            editTimeInterval={useZustandStore((state) => state.editTimeInterval)}
            deleteTimeInterval={useZustandStore((state) => state.deleteTimeInterval)}

            teachers={useZustandStore((state) => state.teachers)}
            classrooms={useZustandStore((state) => state.classrooms)}
            lessonNames={useZustandStore((state) => state.lessonNames)}
            groups={useZustandStore((state) => state.groups)}
            lessonTags={useZustandStore((state) => state.lessonTags)}
            domains={useZustandStore((state) => state.domains)}
            timeIntervals={useZustandStore((state) => state.timeIntervals)}

            teacherErrors={useZustandStore((state) => state.teacherErrors)}
            classroomErrors={useZustandStore((state) => state.classroomErrors)}
            lessonNameErrors={useZustandStore((state) => state.lessonNameErrors)}
            groupErrors={useZustandStore((state) => state.groupErrors)}
            lessonTagErrors={useZustandStore((state) => state.lessonTagErrors)}
            domainErrors={useZustandStore((state) => state.domainErrors)}
            timeIntervalErrors={useZustandStore((state) => state.timeIntervalErrors)}

        />
    )
}

export default AdminPageContainer;