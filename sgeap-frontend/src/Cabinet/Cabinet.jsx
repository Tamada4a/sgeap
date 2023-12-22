import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Cabinet.css";
import CabinetInfoLine from "../Components/CabinetInfoLine/CabinetInfoLine";
import PreLoader from "../Components/PreLoader/PreLoader";
import { request, applHeaders } from "../Utils/MyAxios";

function Cabinet() {
    const [userInfo, setUserInfo] = useState(null);
    const params = useParams();


    useEffect(() => {
        getUserInfo();
    }, []);


    async function getUserInfo() {
        try {
            let resp = await request("GET", `/getUserInfo/${params.id}`, {}, applHeaders);
            setUserInfo(resp.data);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            {userInfo === null ?
                <PreLoader />
                :
                <div className="cabinet-wrapper column-wrap gap-wrapper-15px">
                    <span className="lcg-medium-18 color-white">{`${userInfo.name} ${userInfo.surname}`}</span>
                    <CabinetInfoLine title="Институт" info={userInfo.institute} />
                    <CabinetInfoLine title="Направление" info={userInfo.direction} />
                    <CabinetInfoLine title="Курс" info={userInfo.course} />
                    <CabinetInfoLine title="Группа" info={userInfo.group} />
                </div>}
        </>
    );
}

export default Cabinet;