import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode";

export default function useHeaderLinks() {
    const navigate = useNavigate()
    const accessToken = sessionStorage.getItem("access_token")

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

    if (accessToken) {
        const decoded = jwtDecode(accessToken);

        const myEventsCond = (link) => link.pathname === "/my-events"
        const createEventCond = (link) => link.pathname === "/events/create"
        const dashboardCond = (link) => link.pathname === "/dashboard"

        if (decoded.role === 'Admin') {
            authenticatedLinks = authenticatedLinks.filter(link => {
                let pass = true

                if (createEventCond(link))
                    pass = false

                if (myEventsCond(link))
                    pass = false

                return pass
            })
        }

        if (decoded.role === "Organizer") {
            authenticatedLinks = authenticatedLinks.filter((link) => !myEventsCond(link) && !dashboardCond(link))
        }

        if (decoded.role === "Attendee") {
            authenticatedLinks = authenticatedLinks.filter((link) => !createEventCond(link))
        }
    }

    return {
        authenticatedLinks,
        homeLinks
    }
}