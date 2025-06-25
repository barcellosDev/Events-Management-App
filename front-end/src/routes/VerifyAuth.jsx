import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import useJwt from "../helpers/useJwt";

const loginRoutes = ['/', '/login', '/register']
const authenticatedRoutes = ['/', '/events', '/my-events', '/events/create', '/dashboard']

export default function VerifyAuth() {
    const jwt = useJwt()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (jwt && loginRoutes.includes(location.pathname) && (jwt.role === "Organizer" || jwt.role === "Attendee")) {
            navigate('/events')
        }

        if (jwt && loginRoutes.includes(location.pathname) && jwt.role === "Admin") {
            navigate('/dashboard')
        }

        if (jwt === null && authenticatedRoutes.includes(location.pathname)) {
            navigate('/login')
        }
    }, [location, jwt])


    return <Outlet />
}