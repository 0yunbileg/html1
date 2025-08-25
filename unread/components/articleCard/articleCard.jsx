import "./articleCard.css"

const ArticleCard = ({
    image,
    title,
    viewCount,
    commentCount,
    category,
    readTime
}) => {
    return <div className="card">{title}</div>
}

export default ArticleCard;