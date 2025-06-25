import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useApi from "../helpers/useApi"
import useJwt from "../helpers/useJwt"

export default function Event() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { get, post } = useApi()
    const jwt = useJwt()
    const [event, setEvent] = useState({})

    useEffect(() => {
        const getEvent = async () => {
            const response = await get(`/events/${id}`)

            if (response !== null) {
                setEvent(response)
            }
        }

        getEvent()
    }, [])

    async function registerToEvent() {
        const response = await post(`/events/${id}/register`)

        if (response !== null) {
            const newEvent = {...event}
            newEvent.registeredUserId = jwt.id
            setEvent(newEvent)
        }
    }

    async function deleteUseRegistration() {
        const response = await post(`/events/${id}/remove-registration`)

        if (response !== null) {
            const newEvent = {...event}
            delete newEvent.registeredUserId
            setEvent(newEvent)
        }
    }

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
            <button onClick={() => navigate(-1)}>Go back</button>
            {
                jwt?.role === "Attendee" && 
                jwt.id != event?.registeredUserId &&
                <button onClick={registerToEvent}>Register</button>
            }
            {
                jwt.id == event?.registeredUserId &&
                <button onClick={deleteUseRegistration}>Desvincular do evento</button>
            }
        </div>
        </>
    )
}