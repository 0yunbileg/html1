import "./articlesByDate.css"
import ArticleBox from "../articleBox/articleBox";

const ArticlesByDate = () => {
    return (
        <div className="articlesByDateWrapper">
            <div className="dateControlWrapper">
                <div className="dateChoice">Өнгөрсөн 7 хоногт</div>
                <div className="dateChoice">08/11 - 08/17</div>
                <div className="dateChoice">08/04 - 08/10</div>
                <div className="dateChoice">07/28 - 08/03</div>
            </div>

            <div className="articlesGroupWrapper">
                <div className="articlesLeftGroup">
                    <div className="articleDiv article1">
                        <ArticleBox
                            title={"Намар нээлтээ хийх бүтээлүүдээс онцлох 10 кино"}
                            category={"ЧӨЛӨӨТ"}
                            readTime={"6 мин"}
                            image={"/images/article11.jpg"}
                        />
                    </div>

                    <div className="articleDiv article1">
                        <ArticleBox
                            title={"Намар нээлтээ хийх бүтээлүүдээс онцлох 10 кино"}
                            category={"ЧӨЛӨӨТ"}
                            readTime={"6 мин"}
                            image={"/images/article3.jpg"}
                        />
                    </div>

                    <div className="articleDiv article1">
                        <ArticleBox
                            title={"Намар нээлтээ хийх бүтээлүүдээс онцлох 10 кино"}
                            category={"ЧӨЛӨӨТ"}
                            readTime={"6 мин"}
                            image={"/images/article3.jpg"}
                        />
                    </div>
                </div>

                <div className="articlesRightGroup">
                    <div className="articleDiv article1">
                        <ArticleBox
                            title={"Намар нээлтээ хийх бүтээлүүдээс онцлох 10 кино"}
                            category={"ЧӨЛӨӨТ"}
                            readTime={"6 мин"}
                            image={"/images/article3.jpg"}
                        />
                    </div>

                    <div className="articleDiv article1">
                        <ArticleBox
                            title={"Намар нээлтээ хийх бүтээлүүдээс онцлох 10 кино"}
                            category={"ЧӨЛӨӨТ"}
                            readTime={"6 мин"}
                            image={"/images/article3.jpg"}
                        />
                    </div>

                    <div className="articleDiv article1">
                        <ArticleBox
                            title={"Намар нээлтээ хийх бүтээлүүдээс онцлох 10 кино"}
                            category={"ЧӨЛӨӨТ"}
                            readTime={"6 мин"}
                            image={"/images/article3.jpg"}
                        />
                    </div>


                    <div className="articleDiv article1">
                        <ArticleBox
                            title={"Намар нээлтээ хийх бүтээлүүдээс онцлох 10 кино"}
                            category={"ЧӨЛӨӨТ"}
                            readTime={"6 мин"}
                            image={"/images/article3.jpg"}
                        />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ArticlesByDate;