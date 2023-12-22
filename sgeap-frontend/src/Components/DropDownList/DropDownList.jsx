import React, { useState } from "react";
import "./DropDownList.css";

function DropDownList({ question, children }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="column-wrapper gap-wrapper-3px">
            <div className="pointer non-select row-wrap gap-wrapper-10px" onClick={() => { setIsActive(!isActive) }}>
                <span className="lcg-medium-14 color-white">{`В: ${question}`}</span>
                <img src="../img/arrow.svg" className={`pre-rotate ${isActive ? "rotate" : null}`} alt="arrow" />
            </div>
            <div className={isActive ? "" : "hide"}>
                {children}
            </div>
        </div>
    );
}

export default DropDownList;