import { useNavigate } from 'react-router-dom'
import styles from './css/event.module.css'

export default function Event(props) {
    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/events/${props.data.id}`)} className={styles['event-card']}>
            <div className="title">
                <span>{props.data.title}</span>
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