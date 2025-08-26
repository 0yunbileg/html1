import "./articleCard.css"
import Image from "next/image";

const ArticleCard = ({
    image,
    title,
    viewCount,
    commentCount,
    category,
    readTime
}) => {
    return (
        <div className="card">
            <div className="cardImgDiv">
                <Image className="cardImg" src={image} alt="cardImg" width={350} height={350} />
            </div>
            <div className="cardContentWrapper">
                <div className="cardTopSection">
                    <div className="cardProgressBar"></div>
                    <p>{readTime}</p>
                </div>
                <div className="cardBottomSection">
                    <div className="cardCounts">
                        <div className="cardViewWrapper">
                            <Image className="cardViewIcon" src={"/images/viewsIcon.png"} alt="views icon" width={21} height={12} />
                            <p>{viewCount}</p>
                        </div>
                        <div className="cardCommentWrapper">
                            <Image className="cardCommentIcon" src={"/images/commentsIcon.png"} alt="comments icon" width={15} height={13} />
                            <p>{commentCount}</p>
                        </div>
                    </div>
                    <div className="cardTitle">{title}</div>
                    <div className="cardCategoryDiv">{category.toUpperCase()}</div>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard;