import './lesson-card.css'

const LessonCard = (props) => {
    if (props.data) {
        return (
            <div className={ `td-lesson lesson-red` }
                 onClick={() => props.handleShow(true, props.date, props.data,)}
            >
                <span>{props.data.name.name}</span>
                <span className={`audience-num group-num-red`}>{props.data.group.name}</span>
                <span className={`audience-num audience-num-red`}>{props.data.classroom.name}</span>
            </div>
        )
    }
}

export default LessonCard;