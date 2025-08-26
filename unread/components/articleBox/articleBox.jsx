import "./articleBox.css"
import Image from "next/image";

const ArticleBox = ({
    image,
    title,
    category,
    readTime
}) => {
    return (
        <div className="box">
            <div className="boxImgDiv">
                <Image className="boxImg" src={image} alt="boxImg" width={500} height={500} />
            </div>

            <div className="boxContentWrapper">
                <div className="boxReadTime">{readTime}</div>
                <div className="boxCategory">{category}</div>
                <div className="boxTitle">{title}</div>
            </div>
        </div>
    )
}

export default ArticleBox;