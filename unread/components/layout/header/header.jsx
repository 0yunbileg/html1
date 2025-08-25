import Image from "next/image";
import "./header.css"

const Header = () => {
    return (
        <header>
            <div>
                <Image src={"/images/menu.png"} alt={"menu"} width={50} height={50} />
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, quaerat.</p>

        </header>
    )
}

export default Header;