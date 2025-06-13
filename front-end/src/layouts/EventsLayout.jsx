import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import useHeaderLinks from "../helpers/useHeaderLinks"

export default function EventsLayout() {
    const { authenticatedLinks } = useHeaderLinks()
    
    return (
        <div id="events-layout">
            <Header links={authenticatedLinks} />
            <Outlet />
        </div>
    )
}