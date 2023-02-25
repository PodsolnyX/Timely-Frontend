
export const data = {
    universityData : {
        groups : [
            { value: '1', label: '972101' },
            { value: '2', label: '972102' },
            { value: '3', label: '972103' }
        ],
        audience : [
            { value: '1', label: '302 (2) Учебная аудитория' },
            { value: '2', label: '235 (2) Учебная аудитория' },
            { value: '3', label: '212 (2) Учебная аудитория' },
            { value: '4', label: '228 (2) Учебная аудитория' },
            { value: '5', label: '204 (2) Учебная аудитория' }
        ],
        teachers : [
            { value: '1', label: 'Хакимова Альфия Амировна' },
            { value: '2', label: 'Змеев Денис Олегович' },
            { value: '3', label: 'Змеев Олег Алексеевич' },
            { value: '4', label: 'Шаврин Валерий Викторович' },
            { value: '5', label: 'Зубов Данил Романович' },
        ],
        lessonsName : [
            { value: '1', label: 'Машинное обучение' },
            { value: '2', label: 'Математический анализ' },
            { value: '3', label: 'Тестирование' },
            { value: '4', label: 'Web-программирование' },
        ],
        lessonsTypes : [
            { value: '1', label: 'Лекция' },
            { value: '2', label: 'Семинар' },
            { value: '3', label: 'Практика' },
            { value: '4', label: 'Лабораторная' },
            { value: '5', label: 'Экзамен' }
        ]
    },
    lessonsTime : ["8:45", "10:35", "12:25", "14:45", "16:35", "18:25", "20:15"],
    lessonsDays : ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
    lessons : [
        [{
            lessonName: {
                value: "1",
                title: "Машинное обучение"
            },
            group: {
                value: "3",
                title: "972103"
            },
            audience: {
                value: "3",
                title: "212 (2) Учебная аудитория"
            },
            teacher: {
                value: "1",
                title: "Хакимова Альфия Амировна"
            },
            lessonTag: {
                value: "1",
                title: "red"
            }
        }, null, null, null, null, null],
        [{
            lessonName: {
                value: "2",
                title: "Математический анализ"
            },
            group: {
                value: "3",
                title: "972103"
            },
            audience: {
                value: "2",
                title: "235 (2) Учебная аудитория"
            },
            teacher: {
                value: "5",
                title: "Шаврин Валерий Викторович"
            },
            lessonTag: {
                value: "2",
                title: "orange"
            }
        }, null, null, null, {
            lessonName: {
                value: "3",
                title: "Тестирование"
            },
            group: {
                value: "3",
                title: "972103"
            },
            audience: {
                value: "5",
                title: "204 (2) Учебная аудитория"
            },
            teacher: {
                value: "3",
                title: "Змеев Олег Алексеевич"
            },
            lessonTag: {
                value: "4",
                title: "cian"
            }
        }, null],
        [null, null, null, null, null, null],
        [null, {
            lessonName: {
                value: "4",
                title: "Web-программирование"
            },
            group: {
                value: "3",
                title: "972103"
            },
            audience: {
                value: "4",
                title: "235 (2) Учебная аудитория"
            },
            teacher: {
                value: "5",
                title: "Зубов Данил Романович"
            },
            lessonTag: {
                value: "3",
                title: "blue"
            }
        }, null, null, null, null],
        [null, null, null, null, {
            lessonName: {
                value: "1",
                title: "Машинное обучение"
            },
            group: {
                value: "3",
                title: "972103"
            },
            audience: {
                value: "4",
                title: "228 (2) Учебная аудитория"
            },
            teacher: {
                value: "5",
                title: "228 (2) Учебная аудитория"
            },
            lessonTag: {
                value: "5",
                title: "purple"
            }
        }, null],
        [null, null, null, null, null, {
            lessonName: {
                value: "2",
                title: "Математический анализ"
            },
            group: {
                value: "3",
                title: "972103"
            },
            audience: {
                value: "1",
                title: "302 (2) Учебная аудитория"
            },
            teacher: {
                value: "1",
                title: "Хакимова Альфия Амировна"
            },
            lessonTag: {
                value: "3",
                title: "blue"
            }
        }],
        [null, null, {
            lessonName: {
                value: "4",
                title: "Web-программирование"
            },
            group: {
                value: "3",
                title: "972103"
            },
            audience: {
                value: "4",
                title: "228 (2) Учебная аудитория"
            },
            teacher: {
                value: "2",
                title: "Змеев Денис Олегович"
            },
            lessonTag: {
                value: "3",
                title: "green"
            }
        }, null, null, null]
    ]
}

