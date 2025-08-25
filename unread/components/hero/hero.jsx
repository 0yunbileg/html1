import "./hero.css"
import Image from "next/image"

const Hero = () => {
    return (
        <div className="heroDiv">
            <Image className="heroBackgroundImg" src="/images/heroBackground.jpg" alt="Hero background" width={1920} height={1080} />

            <div className="heroOverlay" />

            <div className="heroContentWrapper">
                <div className="heroImgWrapper">
                    <Image src={"/images/hero.jpg"} alt="hero image" width={500} height={500} className="heroImg" />
                </div>
                <div className="heroTextWrapper">
                    <p>Шинэ</p>
                    <p>Чөлөөт</p>
                    <p>“БОНЗ-ын үнэлгээний цахим платформын нээлтийн арга хэмжээ”-г тоймлох нь</p>
                </div>
            </div>
        </div>
    )
}

export default Hero;