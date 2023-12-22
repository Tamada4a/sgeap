import React from "react";
import "./CabinetInfoLine.css";

function CabinetInfoLine({ title, info }) {
    return (
        <div className="info-line align-center">
            <span className="lcg-medium-16 color-white">{title}</span>
            <span className="lcg-regular-16 color-white">{info}</span>
        </div>
    );
}

export default CabinetInfoLine;