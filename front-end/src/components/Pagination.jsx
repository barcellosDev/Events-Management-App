import styles from './css/pagination.module.css'

export default function Pagination({ pageNumber, pageSize, totalCount, changePageFn }) {
    const numberOfPages = Math.ceil(totalCount / pageSize)
    const Page = ({ num, selectedPage }) => (
        <div onClick={() => changePageFn(num)} className={`${styles.page} ${num == selectedPage ? styles['selected-page'] : ''}`}>
            <span>{num}</span>
        </div>
    )

    const pages = []
    for (let index = 0; index < numberOfPages; index++) {
        pages.push(<Page key={index} selectedPage={pageNumber} num={index+1} />)
    }

    return (
        <div id={styles.pages}>
            {[...pages]}
        </div>
    )
}