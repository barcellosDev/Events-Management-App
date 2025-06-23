import { useEffect, useState } from "react"
import useApi from "../helpers/useApi"
import Pagination from "../components/Pagination"
import EventCard from "../components/EventCard"

export default function Events() {
    const [myEventsFlag, setMyEventsFlag] = useState(false)
    const [events, setEvents] = useState([])
    const [pageNumber, setPageNumber] = useState(1)

    const pageSize = 10

    const { get } = useApi()

    useEffect(() => {
        const myEventsQueryParam = myEventsFlag ? '&myEvents=true' : ''
        const getEvents = async () => {
            const response = await get(`/events?pageSize=${pageSize}&pageNumber=${pageNumber}${myEventsQueryParam}`)

            if (response !== null) {
                setEvents(response)
            }
        }

        getEvents()
    }, [pageNumber, pageSize, myEventsFlag])

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
            <h1>Eventos</h1>

            <div id="filters">
                <p>Filtrar por: </p>
                <label htmlFor="myEvents">Meus eventos</label>
                <input type="checkbox" onClick={() => setMyEventsFlag(!myEventsFlag)} name="myEvents" />
            </div>

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