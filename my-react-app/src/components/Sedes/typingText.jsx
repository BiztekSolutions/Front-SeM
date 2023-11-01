import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export const TypingEffect = ({ firstText, secondText, medidaWindow }) => {
  const [text1, setText1] = useState("");
  const [text3, setText3] = useState("");

  useEffect(() => {
    function typeText1(text) {
      let index = 0;
      let interval = setInterval(() => {
        setText1(() => text.substring(0, index + 1));
        index++;
        if (index === text.length) {
          clearInterval(interval);
          typeText3(secondText);
        }
      }, 40);
    }

    function typeText3(text) {
      let index = 0;
      let interval = setInterval(() => {
        setText3(() => text.substring(0, index + 1));
        index++;
        if (index === text.length) clearInterval(interval);
      }, 40);
    }

    function handleScroll() {
      const text1Element = document.getElementById("text1");
      const text1Position = text1Element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / medidaWindow;

      if (text1Position < screenPosition) {
        typeText1(firstText);
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [firstText, secondText]);

  return (
    <div style={{ minHeight: "300px" }}>
      <h1
        id="text1"
        className=" ml-10 mt-32 max-w-lg text-2xl font-bold text-customOrangepy-4 text-customOrange"
      >
        {text1}
      </h1>
      <h1
        id="text3"
        className="ml-10 mb-36 max-w-lg text-2xl font-bold text-customOrangepy-4 text-customOrange"
      >
        {text3}
      </h1>
    </div>
  );
};
