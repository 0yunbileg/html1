import Image from "next/image";
import "./header.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaSearch } from "react-icons/fa";
import { PiXLogoBold } from "react-icons/pi";

const Header = () => {
    return (
        <header>
            <div><Image src={"/images/menu.png"} alt={"menu"} width={24} height={24} /></div>

            <div className="searchWrapper">
                <div><Image src={"/images/logo.png"} alt={"logo"} width={150} height={20} /></div>
                <div className="searchDiv"><FaSearch size={20} color={"gray"} /></div>
                <input className="searchInput" placeholder="Нийтлэл хайх" />
            </div>

            <div className="nextArticleWrapper">
                <p className="nextArticleName">Дараагийн нийтлэл: <span>TECHWORM</span></p>
                <p className="nextArticleDue">Маргааш орно</p>
            </div>

            <div className="linksWrapper">
                <a target="_blank" href="https://www.facebook.com/UnreadToday/"><FaFacebookF size={16} color="gray" /></a>
                <a target="_blank" href="https://www.instagram.com/unreadtoday/"><FaInstagram size={16} color="gray" /></a>
                <a target="_blank" href="https://x.com/UnreadToday"><PiXLogoBold size={16} color="gray" /></a>
                <a target="_blank" href="https://www.linkedin.com/company/unreadmedia"><FaLinkedinIn size={16} color="gray" /></a>
            </div>
        </header>
    )
}

export default Header;