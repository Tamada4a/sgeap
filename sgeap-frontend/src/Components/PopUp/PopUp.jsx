import React from "react";
import "./PopUp.css";

function PopUp({ active, setActive, children }) {
    return (
        <div className={active ? "popup-main active" : "popup-main"} onClick={() => setActive(false)} >
            <div className={active ? "popup active" : "popup"} onClick={e => e.stopPropagation()}>
                <div className="row-wrap align-center logo-popup">
                    <img src="../img/logos/sgeap_logo.svg" />
                    <div className="close-icon pointer" onClick={() => setActive(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 72 72">
                            <path d="M 19 15 C 17.977 15 16.951875 15.390875 16.171875 16.171875 C 14.609875 17.733875 14.609875 20.266125 16.171875 21.828125 L 30.34375 36 L 16.171875 50.171875 C 14.609875 51.733875 14.609875 54.266125 16.171875 55.828125 C 16.951875 56.608125 17.977 57 19 57 C 20.023 57 21.048125 56.609125 21.828125 55.828125 L 36 41.65625 L 50.171875 55.828125 C 51.731875 57.390125 54.267125 57.390125 55.828125 55.828125 C 57.391125 54.265125 57.391125 51.734875 55.828125 50.171875 L 41.65625 36 L 55.828125 21.828125 C 57.390125 20.266125 57.390125 17.733875 55.828125 16.171875 C 54.268125 14.610875 51.731875 14.609875 50.171875 16.171875 L 36 30.34375 L 21.828125 16.171875 C 21.048125 15.391875 20.023 15 19 15 z"></path>
                        </svg>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default PopUp;