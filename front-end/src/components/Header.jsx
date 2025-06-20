import { Link } from "react-router-dom"
import styles from './css/header.module.css'

export default function Header({ links, title }) {
    title = title ?? 'Welcome to the Events Management Application'

    const linksComponents = links.map((link, index) => {
        const to_options = { pathname: link.pathname }

        if (link?.search)
            to_options.search = link.search

        if (link?.action)
            return <Link onClick={link.action} key={index} to={to_options}>{link.name}</Link>

        return <Link
            key={index}
            to={to_options}>
            {link.name}
        </Link>
    })

    return (
        <header id={styles['main-header']}>
            <div>
                <span>{title}</span>
            </div>
            <div id={styles.links}>
                {linksComponents}
            </div>
        </header>
    )
}