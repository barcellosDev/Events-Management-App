import { useEffect, useState } from "react"
import useApi from "../helpers/useApi"
import Pagination from "../components/Pagination"
import EventCard from "../components/EventCard"
import useJwt from "../helpers/useJwt"

export default function Events({ uri }) {
    const [myEventsFlag, setMyEventsFlag] = useState(false)
    const [events, setEvents] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const pageSize = 10
    const { get } = useApi()
    const jwt = useJwt()

    useEffect(() => {
        const myEventsQueryParam = myEventsFlag ? '&myEvents=true' : ''
        const getEvents = async () => {
            const response = await get(`/${uri ?? "events"}?pageSize=${pageSize}&pageNumber=${pageNumber}${myEventsQueryParam}`)

            if (response !== null) {
                setEvents(response)
            }
        }

        getEvents()
    }, [pageNumber, pageSize, myEventsFlag, uri])

    function changePage(newPageNumber) {
        setPageNumber(newPageNumber)
    }

    function ListEvents() {
        if (events.events) {
            return events.events.map(event => (
                <EventCard key={event.id} data={event} />
            ))
        }
    }

    return (
        <div id="main-events-container">
            <h1>Events</h1>

            {
                jwt?.role === "Organizer" &&
                <div id="filters">
                    <p>Filtrar por: </p>
                    <label htmlFor="myEvents">My Events</label>
                    <input type="checkbox" onClick={() => setMyEventsFlag(!myEventsFlag)} name="myEvents" />
                </div>
            }

            <div id="events-list">
                <ListEvents />
            </div>

            <div id="pagination-container">
                <Pagination 
                    pageNumber={pageNumber}
                    pageSize={pageSize}
                    totalCount={events.totalCount}
                    changePageFn={changePage}
                />
            </div>
        </div>
    )
}