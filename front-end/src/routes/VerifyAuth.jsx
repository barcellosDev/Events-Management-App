import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";


const loginRoutes = ['/', '/login', '/register']
const authenticatedRoutes = ['/', '/events', '/my-events', '/events/create', '/dashboard']

export default function VerifyAuth() {
    const accessToken = sessionStorage.getItem("access_token")
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (loginRoutes.includes(location.pathname) && accessToken) {
            navigate('/events')
        }

        if (authenticatedRoutes.includes(location.pathname) && !accessToken) {
            navigate('/login')
        }
    }, [location, accessToken])


    return <Outlet />
}