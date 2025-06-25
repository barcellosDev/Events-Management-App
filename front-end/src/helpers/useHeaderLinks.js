import { useNavigate } from "react-router-dom"
import useJwt from "./useJwt"

export default function useHeaderLinks() {
    const navigate = useNavigate()
    const jwt = useJwt()

    let authenticatedLinks = [
        {
            pathname: "/dashboard",
            name: "Dashboard"
        },
        {
            pathname: "/events",
            name: "Events"
        },
        {
            pathname: "/my-events",
            name: "My events"
        },
        {
            pathname: "/events/create",
            name: "New event",
        },
        {
            name: "Logout",
            action() {
                sessionStorage.removeItem('access_token')
                sessionStorage.removeItem('refresh_token')
                navigate('/login')
            }
        }
    ]

    let homeLinks = [
        {
            pathname: "/login",
            name: "Login"
        },
        {
            pathname: "/register",
            name: "Register"
        }
    ]

    if (jwt !== null) {
        const myEventsCond = (link) => link.pathname === "/my-events"
        const createEventCond = (link) => link.pathname === "/events/create"
        const dashboardCond = (link) => link.pathname === "/dashboard"

        if (jwt.role === 'Admin') {
            authenticatedLinks = authenticatedLinks.filter(link => {
                let pass = true

                if (createEventCond(link))
                    pass = false

                if (myEventsCond(link))
                    pass = false

                return pass
            })
        }

        if (jwt.role === "Organizer") {
            authenticatedLinks = authenticatedLinks.filter((link) => !myEventsCond(link) && !dashboardCond(link))
        }

        if (jwt.role === "Attendee") {
            authenticatedLinks = authenticatedLinks.filter((link) => !createEventCond(link) && !dashboardCond(link))
        }
    }

    return {
        authenticatedLinks,
        homeLinks
    }
}