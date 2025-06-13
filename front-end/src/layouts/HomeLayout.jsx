import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import useHeaderLinks from "../helpers/useHeaderLinks"

export default function HomeLayout() {
    const { homeLinks } = useHeaderLinks()

    return (
        <div id="home">
            <Header links={homeLinks} />
            <Outlet />
        </div>
    )
}