import { Link } from "react-router-dom"
import styles from './css/header.module.css'

export default function Header({ links, title }) {
    title = title ?? 'Welcome to the Events Management Application'

    const linksComponents = links.map((link, index) => {
        return <Link key={index} to={{pathname: link.pathname}}>{link.name}</Link>
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