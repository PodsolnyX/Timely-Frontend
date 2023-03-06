import './lesson-card.css'

const LessonCard = (props) => {
    if (props.data) {

        const onClickCard = props.isReadOnly
            ? () => props.handleShow(props.date, props.data)
            : () => props.handleShow(true, props.date, props.timeInterval, props.data.date, props.data);

        return (
            <div className={ `td-lesson lesson-red` }
                 onClick={onClickCard}
            >
                <span>{props.data.name.name}</span>
                <span className={`audience-num audience-num-red`}>{props.data.classroom.name}</span>
                <span className={`audience-num group-num-red`}>
                    {props.data.group.map((g, i) => i === props.data.group.length - 1 ? `${g.name}` : `${g.name}, `)}
                </span>
            </div>
        )
    }
}

export default LessonCard;