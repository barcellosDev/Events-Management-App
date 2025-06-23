import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useApi from "../helpers/useApi"

export default function Event() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { get } = useApi()
    const [event, setEvent] = useState({})

    console.log(id)

    useEffect(() => {
        const getEvent = async () => {
            const response = await get(`/events/${id}`)

            if (response !== null) {
                setEvent(response)
            }
        }

        getEvent()
    }, [])

    return (
        <>
        <div id="event-data">
            <div id="title">
                {event.title}
            </div>
            <div id="title">
                {event.description}
            </div>
            <div id="title">
                {event.location}
            </div>
            <div id="title">
                {event.startTime}
            </div>
            <div id="title">
                {event.endTime}
            </div>
            <div id="category-data">
                {event.category?.name}
            </div>
        </div>
        <div>
            <button onClick={() => navigate('/events')}>Go back</button>
        </div>
        </>
    )
}