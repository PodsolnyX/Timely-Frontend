import './lesson-card.css'

const LessonCard = (props) => {
    console.log(props)
    if (props.lessonData) {
        return (
            <div className={ `td-lesson lesson-${props.lessonData.lessonTag.title}` }
                 onClick={() => props.handleShow(true, props.lessonData)}
            >
                <span>{props.lessonData.lessonName.title}</span>
                <span className={`audience-num audience-num-${props.lessonData.lessonTag.title}`}>{props.lessonData.audience.title}</span>
                <span className={`audience-num group-num-${props.lessonData.lessonTag.title}`}>{props.lessonData.group.title}</span>
            </div>
        )
    }
}

export default LessonCard;