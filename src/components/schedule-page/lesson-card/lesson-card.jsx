import './lesson-card.css'

const LessonCard = (props) => {
    if (props.type) {
        return (
            <div className={ `td-lesson lesson-${props.type}` } onClick={() => props.handleShow(true, props.lesson, props.audienceNum, props.groupNum)}>
                <span>{props.lesson}</span>
                <span className={`audience-num audience-num-${props.type}`}>{props.audienceNum}</span>
                <span className={`audience-num group-num-${props.type}`}>{props.groupNum}</span>
            </div>
        )
    }
}

export default LessonCard;