import "./editorsChoice.css"
import ArticleCard from "../articleCard/articleCard";

const EditorsChoice = () => {
    return (
        <div className="editorsChoiceWrapper">
            <div className="blackBackground"></div>
            <div className="topSection">
                <p className="secionTitle">Редакцын сонголт</p>
                <div className="controllerDiv">
                    <button className="previousBtn">&lt;</button>
                    <button className="nextBtn">&gt;</button>
                </div>
            </div>

            <div className="bottomSection">
                <ArticleCard
                    title={"Намар нээлтээ хийх бүтээлүүдээс онцлох 10 кино"}
                    viewCount={7360}
                    commentCount={0}
                    category={"ЧӨЛӨӨТ"}
                    readTime={"6 мин"}
                />

                <ArticleCard
                    title={"Намар нээлтээ хийх бүтээлүүдээс онцлох 10 кино"}
                    viewCount={7360}
                    commentCount={0}
                    category={"ЧӨЛӨӨТ"}
                    readTime={"6 мин"}
                />

                <ArticleCard
                    title={"Намар нээлтээ хийх бүтээлүүдээс онцлох 10 кино"}
                    viewCount={7360}
                    commentCount={0}
                    category={"ЧӨЛӨӨТ"}
                    readTime={"6 мин"}
                />

                <ArticleCard
                    title={"Намар нээлтээ хийх бүтээлүүдээс онцлох 10 кино"}
                    viewCount={7360}
                    commentCount={0}
                    category={"ЧӨЛӨӨТ"}
                    readTime={"6 мин"}
                />

                <ArticleCard
                    title={"Намар нээлтээ хийх бүтээлүүдээс онцлох 10 кино"}
                    viewCount={7360}
                    commentCount={0}
                    category={"ЧӨЛӨӨТ"}
                    readTime={"6 мин"}
                />
            </div>
        </div>
    )
}

export default EditorsChoice;