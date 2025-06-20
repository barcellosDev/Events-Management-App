import { useEffect, useState } from "react"
import useApi from "../helpers/useApi"
import Pagination from "../components/Pagination"
import Event from "../components/Event"
import { useLocation } from "react-router-dom"

export default function Events() {
    const location = useLocation()
    const isMyEventsFlagActive = location.search.split('?').includes('my-events')

    const [events, setEvents] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const pageSize = 10

    const { get } = useApi()

    useEffect(() => {
        const uri = isMyEventsFlagActive ? '/mine' : ''
        const getEvents = async () => {
            const response = await get(`/events${uri}?pageSize=${pageSize}&pageNumber=${pageNumber}`)

            if (response !== null) {
                setEvents(response)
            }
        }

        getEvents()
    }, [pageNumber, pageSize, isMyEventsFlagActive])

    function changePage(newPageNumber) {
        setPageNumber(newPageNumber)
    }

    function ListEvents() {
        if (events.events) {
            return events.events.map(event => (
                <Event key={event.id} data={event} />
            ))
        }
    }

    return (
        <div id="main-events-container">
            <h1>Eventos</h1>

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