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
            pathname: "/events",
            search: "?my-events",
            name: "My events"
        },
        {
            pathname: "/create-event",
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

        if (decoded.role === 'Admin') {
            authenticatedLinks = authenticatedLinks.filter(link => {
                let pass = true

                if (link.pathname === "/create-event")
                    pass = false

                if (link.pathname === "/events" && link?.search && link.search === '?my-events')
                    pass = false

                return pass
            })
        }
    }

    return {
        authenticatedLinks,
        homeLinks
    }
}