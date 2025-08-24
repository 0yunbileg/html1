"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const user = {
    name: "Bat",
    age: 17
  }

  const [isHidden, setIsHidden] = useState(true);
  const hideBtn = () => {
    setIsHidden(!isHidden)
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logInBtn = () => {
    setIsLoggedIn(!isLoggedIn);
  }

  const greetElement = <h1>hello, {user.name}!</h1>;
  const loginElement = <h1>{isLoggedIn ? 'Welcome back!' : 'Please sign in'}</h1>;
  const loginBtnElement = <button onClick={logInBtn}>{isLoggedIn ? 'Sign out' : 'Sign in'}</button>;

  return (
    <div>
      <div>
        {loginElement}
        {loginBtnElement}
      </div>
      <button onClick={hideBtn}>
        {isHidden ? "show text" : "hide text"}
      </button>
      <p>{isHidden ? "" : greetElement}</p>
    </div>
  );
}
