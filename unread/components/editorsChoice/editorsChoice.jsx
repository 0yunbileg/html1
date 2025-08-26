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
                    viewCount={6122}
                    commentCount={0}
                    category={"ЧӨЛӨӨТ"}
                    readTime={"6 мин"}
                    image={"/images/article1.jpg"}
                />

                <ArticleCard
                    title={"Эрүүл мэндийн шидэт ундаануудын шид нь юундаа байна вэ?"}
                    viewCount={7360}
                    commentCount={0}
                    category={"Мэдүүштэй"}
                    readTime={"9 мин"}
                    image={"/images/article2.jpg"}
                />

                <ArticleCard
                    title={"Хиймэл оюун биднийг амьтадтай ярихад тусалж чадах уу?"}
                    viewCount={7360}
                    commentCount={0}
                    category={"Мэдүүштэй"}
                    readTime={"6 мин"}
                    image={"/images/article3.jpg"}
                />

                <ArticleCard
                    title={"Unpacked 2025: Биднийг унтаж байхад Самсунгийн танилцуулсан бүх зүйл"}
                    viewCount={7360}
                    commentCount={0}
                    category={"Techworm"}
                    readTime={"4 мин"}
                    image={"/images/article4.jpeg"}
                />

                <ArticleCard
                    title={"Unread туршив: Шатрын сайт, аппууд"}
                    viewCount={7360}
                    commentCount={0}
                    category={"Мэдүүштэй"}
                    readTime={"7 мин"}
                    image={"/images/article5.png"}
                />
            </div>
        </div>
    )
}

export default EditorsChoice;