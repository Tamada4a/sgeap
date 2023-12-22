import React from "react";
import './Notifications.css'
import { useState, useEffect } from "react";

function Notifications({ props }) {
    const toastList = props;
    const [list, setList] = useState(toastList);


    useEffect(() => {
        setList(toastList);
    }, [toastList, list]);


    useEffect(() => {
        if (toastList.length > 5) deleteToast();
    }, [toastList, list]);


    function deleteToast() {
        list.splice(0, 1);
        toastList.splice(0, 1);
        setList([...list]);
    }


    useEffect(() => {
        const interval = setInterval(() => {
            if (toastList.length || list.length)
                deleteToast();

        }, 3000);

        return () => {
            clearInterval(interval);
        }

    }, [toastList]);


    return (
        <div className="notification-container top-right">
            {
                list.map((toast, i) =>
                    <div className={`notification-toast column-wrap align-center top-right gap-wrapper-10px ${toast.border}`} key={`notification${i}`}>
                        <p className="color-white lcg-medium-12">{toast.description}</p>
                    </div>
                )
            }
        </div>
    )
}

export default Notifications;