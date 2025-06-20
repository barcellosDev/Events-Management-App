export default function Event(props) {
    return (
        <div className="event-card">
            <div className="title">
                <span>{props.data.title}</span>
            </div>
            <div className="description">
                <span>{props.data.description}</span>
            </div>
            <div className="location">
                <span>{props.data.location}</span>
            </div>
            <div className="startTime">
                <span>{props.data.startTime}</span>
            </div>
            <div className="endTime">
                <span>{props.data.endTime}</span>
            </div>
        </div>
    )
}