export default function useHeaderLinks() {
    return {
        authenticatedLinks: [
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
                pathname: "/create-event",
                name: "New event",
            },
            {
                pathname: "/logout",
                name: "Logout"
            }
        ],

        homeLinks: [
            {
                pathname: "/login",
                name: "Login"
            },
            {
                pathname: "/register",
                name: "Register"
            }
        ]
    }
}