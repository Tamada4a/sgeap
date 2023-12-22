import React, { useState, useRef, useEffect } from "react";
import "./Selector.css";

function Selector({ data, placeHolder, value, setValue, style, setSecondValue }) {
    const [isActive, setIsActive] = useState(false);
    const wrapperRef = useRef(null);

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsActive(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }


    function filterListElem(text) {
        if (text.includes("\n")) {
            let splitted = text.split("\n");
            return <span>{splitted[0]}<br />{splitted[1]}</span>
        }
        return <span>{text}</span>
    }


    function changeSecondValue() {
        if (setSecondValue)
            setSecondValue("");
    }

    useOutsideAlerter(wrapperRef);

    return (
        <div className="selector" style={style} onClick={() => { setIsActive(!isActive) }} ref={wrapperRef}>
            <div className="text-field pointer non-select">
                <input className="lcg-regular-16 color-white" type="text" placeholder={placeHolder} defaultValue={value.replaceAll("\n", " ")} />
                <img src="../../img/arrow.svg" className={`pre-rotate ${isActive ? "rotate" : ""}`} alt="arrow" />
            </div>
            <ul className={`select-list ${!isActive ? "hide" : ""}`}>
                {data && data.map((elem) =>
                    <li className="list-item flex-start flex-start-text pointer center display-flex color-white lcg-regular-14" key={elem} onClick={() => { setIsActive(false); setValue(elem); changeSecondValue() }}>
                        {filterListElem(elem)}
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Selector;