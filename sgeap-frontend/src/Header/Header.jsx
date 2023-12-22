import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { NavLink, Link } from "react-router-dom";
import PopUp from "../Components/PopUp/PopUp";
import Selector from "../Components/Selector/Selector";
import Notifications from "../Components/Notifications/Notificaions";
import { resetRef, setAuthToken, getAuthToken, setStoredUserNick, getStoredUserNick } from "../Utils/Utils";
import { request, applHeaders } from "../Utils/MyAxios";

function Header() {
    const [isLoginWindowActive, setIsLoginWindowActive] = useState(false);
    const [isRegisterWindowActive, setIsRegisterWindowActive] = useState(false);
    const [isRememberMe, setIsRememberMe] = useState(false);

    const [userNotificationsList, setUserNotificationsList] = useState([]);

    const nickRefLogin = useRef(null);
    const passwordRefLogin = useRef(null);
    const nickRefRegistration = useRef(null);
    const passwordRefRegistration = useRef(null);
    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const groupRef = useRef(null);

    const [isAuthorized, setIsAuthorized] = useState(isVarEmpty(getAuthToken()));

    const [directionValue, setDirectionValue] = useState("");
    const [instituteValue, setInstituteValue] = useState("");
    const [courseValue, setCourseValue] = useState("");

    const [userNickname, setUserNickname] = useState(isVarEmpty(getAuthToken()) && isVarEmpty(getStoredUserNick()) ? getStoredUserNick() : "");

    const [institutes, setInstitutes] = useState(null);

    const courses = ["1 курс", "2 курс", "3 курс", "4 курс", "5 курс", "Магистратура", "Аспирантура"];


    useEffect(() => {
        getInstitutes();
    }, []);


    async function getInstitutes() {
        try {
            let resp = await request("GET", "/getInstitutes", {}, applHeaders);
            setInstitutes(resp.data.reduce((obj, institute) => ({ ...obj, [institute.name]: institute.directions }), {}));
        } catch (err) {
            if (err.response.data.message && err.response.data.message === "Не авторизован") {
                setIsAuthorized(false);
                setAuthToken(null);
                setStoredUserNick(null);
            }
        }
    }


    function isVarEmpty(variable) {
        return variable !== null && variable !== "null" && variable !== "undefined" && variable !== undefined;
    }


    function resetInputs() {
        resetRef(nickRefLogin);
        resetRef(passwordRefLogin);
        resetRef(nickRefRegistration);
        resetRef(passwordRefRegistration);
        resetRef(nameRef);
        resetRef(surnameRef);
        resetRef(groupRef);

        setDirectionValue("");
        setInstituteValue("")
        setCourseValue("");

        document.getElementById("loginkeeping").checked = false;
        setIsRememberMe(false);
    }


    function showNotification(desc, border) {
        let toastProperties = {
            description: desc,
            border: border
        };
        setUserNotificationsList([...userNotificationsList, toastProperties]);
    }


    function isRefEmpty(ref) {
        return ref.current.value === "" || ref.current.value === null || ref.current.value === undefined;
    }


    async function onLogin() {
        if (isRefEmpty(nickRefLogin)) {
            showNotification("Вы не ввели никнейм", "warn");
        } else if (isRefEmpty(passwordRefLogin)) {
            showNotification("Вы не ввели пароль", "warn")
        } else {
            try {
                let resp = await request("POST", "/auth/login", {
                    password: passwordRefLogin.current.value,
                    nick: nickRefLogin.current.value,
                    isRememberMe: isRememberMe
                });
                setIsAuthorized(true);
                setUserNickname(resp.data.nickname);
                setAuthToken(resp.data.token);
                setStoredUserNick(resp.data.nickname);

                showNotification("Вы успешно вошли", "ok");

                setIsLoginWindowActive(false);
            } catch (err) {
                showNotification(err.response.data.message, "warn");
                setAuthToken(null);
            }
        }
    }


    async function onRegistration() {
        if (isRefEmpty(nickRefRegistration)) {
            showNotification("Вы не ввели никнейм", "warn");
        } else if (isRefEmpty(passwordRefRegistration)) {
            showNotification("Вы не ввели пароль", "warn")
        } else if (isRefEmpty(nameRef)) {
            showNotification("Вы не ввели имя", "warn")
        } else if (isRefEmpty(surnameRef)) {
            showNotification("Вы не ввели фамилию", "warn")
        } else if (instituteValue === "") {
            showNotification("Вы не ввели институт", "warn")
        } else if (directionValue === "") {
            showNotification("Вы не ввели направление", "warn")
        } else if (courseValue === "") {
            showNotification("Вы не ввели курс", "warn")
        } else if (isRefEmpty(groupRef)) {
            showNotification("Вы не ввели группу", "warn")
        } else {
            try {
                let resp = await request("POST", "/auth/register",
                    {
                        name: nameRef.current.value,
                        surname: surnameRef.current.value,
                        password: passwordRefRegistration.current.value,
                        nickname: nickRefRegistration.current.value,
                        direction: directionValue,
                        institute: instituteValue,
                        course: courseValue,
                        group: groupRef.current.value
                    });
                setIsAuthorized(true);
                setAuthToken(resp.data.token);
                setStoredUserNick(resp.data.nickname);
                setUserNickname(resp.data.nickname);

                showNotification("Вы успешно зарегистрировались", "ok");

                setIsRegisterWindowActive(false);
            } catch (err) {
                showNotification(err.response.data.message, "warn");
                setIsAuthorized(false);
                setAuthToken(null);
            }
        }
    }


    return (
        <header className="header">
            <div className="header-content row-wrap">
                <div className="header-logo">
                    <Link to="/">
                        <img src='../img/logos/header.svg' alt="header logo" />
                    </Link>
                </div>
                <nav className="gap-wrapper-35px row-wrap">
                    <NavLink className="nav-title lcg-medium-16" to='/' style={({ isActive }) => ({  // Если вкладка активна, то текст становится белым
                        color: isActive ? 'white' : 'var(--base-02)'
                    })}>
                        Карта кампусов
                    </NavLink>
                    <NavLink className="nav-title lcg-medium-16" to='/info' style={({ isActive }) => ({  // Если вкладка активна, то текст становится белым
                        color: isActive ? 'white' : 'var(--base-02)'
                    })}>
                        Информация
                    </NavLink>
                </nav>
                {isAuthorized ?
                    <div className="row-wrap gap-wrapper-5px authorized">
                        <Link to={`/cabinet/${userNickname}`}>
                            <button className="authorized-btn pointer">
                                <span className="lcg-medium-14 color-white">{userNickname}</span>
                            </button>
                        </Link>
                        <div className="login-btn-icon pointer login-btn" onClick={() => { setIsAuthorized(false); setAuthToken(null); setStoredUserNick(null) }}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.4674 4.49769C10.5238 4.27849 10.5779 4.21386 10.6862 4.08461C10.9595 3.75817 11.3053 3.48953 11.6801 3.30592C12.3045 3 13.1163 3 14.7399 3H16.2599C17.8835 3 18.6952 3 19.3197 3.30592C19.9176 3.59882 20.4011 4.08229 20.694 4.68018C20.9999 5.30464 20.9999 6.11642 20.9999 7.74V16.26C20.9999 17.8836 20.9999 18.6954 20.694 19.3198C20.4011 19.9177 19.9176 20.4012 19.3197 20.6941C18.6952 21 17.8835 21 16.2599 21H14.7399C13.1163 21 12.3045 21 11.6801 20.6941C11.3053 20.5105 10.9595 20.2418 10.6862 19.9154C10.5779 19.7861 10.5238 19.7215 10.4674 19.5023C10.4271 19.3459 10.4501 19.0195 10.512 18.8702C10.5986 18.6611 10.7155 18.556 10.9491 18.3457L17.174 12.7433C17.6154 12.346 17.6154 11.6539 17.174 11.2567L10.9491 5.65434C10.7155 5.44402 10.5986 5.33886 10.512 5.12976C10.4501 4.98051 10.4271 4.65414 10.4674 4.49769ZM14.5 12C14.5 11.5899 14.253 11.2374 13.8997 11.0831L10.6402 8.36687C9.98886 7.8241 9 8.28725 9 9.13509V11L3 11.0001C2.44771 11.0001 2 11.4478 2 12.0001C2 12.5523 2.44772 13.0001 3 13.0001L9 13V14.865C9 15.7128 9.98886 16.176 10.6402 15.6332L13.8997 12.917C14.253 12.7627 14.5 12.4102 14.5 12Z" />
                            </svg>
                        </div>
                    </div>
                    :
                    <button className="login-btn align-center" onClick={() => { setIsLoginWindowActive(true); resetInputs() }}>
                        <span className="login-btn-name" >
                            <a className="lcg-medium-14">Личный кабинет</a>
                        </span>
                        <div className="login-btn-icon">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M10.4674 4.49769C10.5238 4.27849 10.5779 4.21386 10.6862 4.08461C10.9595 3.75817 11.3053 3.48953 11.6801 3.30592C12.3045 3 13.1163 3 14.7399 3H16.2599C17.8835 3 18.6952 3 19.3197 3.30592C19.9176 3.59882 20.4011 4.08229 20.694 4.68018C20.9999 5.30464 20.9999 6.11642 20.9999 7.74V16.26C20.9999 17.8836 20.9999 18.6954 20.694 19.3198C20.4011 19.9177 19.9176 20.4012 19.3197 20.6941C18.6952 21 17.8835 21 16.2599 21H14.7399C13.1163 21 12.3045 21 11.6801 20.6941C11.3053 20.5105 10.9595 20.2418 10.6862 19.9154C10.5779 19.7861 10.5238 19.7215 10.4674 19.5023C10.4271 19.3459 10.4501 19.0195 10.512 18.8702C10.5986 18.6611 10.7155 18.556 10.9491 18.3457L17.174 12.7433C17.6154 12.346 17.6154 11.6539 17.174 11.2567L10.9491 5.65434C10.7155 5.44402 10.5986 5.33886 10.512 5.12976C10.4501 4.98051 10.4271 4.65414 10.4674 4.49769ZM14.5 12C14.5 11.5899 14.253 11.2374 13.8997 11.0831L10.6402 8.36687C9.98886 7.8241 9 8.28725 9 9.13509V11L3 11.0001C2.44771 11.0001 2 11.4478 2 12.0001C2 12.5523 2.44772 13.0001 3 13.0001L9 13V14.865C9 15.7128 9.98886 16.176 10.6402 15.6332L13.8997 12.917C14.253 12.7627 14.5 12.4102 14.5 12Z" />
                            </svg>
                        </div>
                    </button>
                }
            </div>
            <div className="header-space-block" />

            <Notifications props={userNotificationsList} />

            <PopUp active={isLoginWindowActive} setActive={setIsLoginWindowActive}>
                <div className="align-center gap-wrapper-30px column-wrap">
                    <div className="flex-start gap-wrapper-20px column-wrap">
                        <div className="align-center gap-wrapper-10px column-wrap">
                            <div className="text-field full">
                                <input className="lcg-regular-16 color-white" type="text" name="nickLogin" id="nickLogin" placeholder="Никнейм пользователя" ref={nickRefLogin} />
                            </div>
                            <div className="text-field full">
                                <input className="lcg-regular-16 color-white" type="password" name="passwordLogin" id="passwordLogin" placeholder="Пароль" ref={passwordRefLogin} />
                            </div>
                        </div>
                        <div className="keeplogin align-center row-wrap">
                            <input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" />
                            <label className="lcg-regular-14" htmlFor="loginkeeping">Запомнить меня</label>
                        </div>
                    </div>
                    <div className="align-center gap-wrapper-20px column-wrap">
                        <button className="transparent-btn color-white lcg-regular-14" onClick={() => { onLogin() }}>Войти</button>
                        <button className="transparent-btn color-white lcg-regular-14" onClick={() => { setIsLoginWindowActive(false); setIsRegisterWindowActive(true); resetInputs() }}>Регистрация</button>
                    </div>
                </div>
            </PopUp>

            <PopUp active={isRegisterWindowActive} setActive={setIsRegisterWindowActive}>
                <div className="align-center gap-wrapper-30px column-wrap">
                    <div className="column-wrap gap-wrapper-20px align-center">
                        <div className="row-wrap gap-wrapper-5px align-center">
                            <div className="text-field half">
                                <input className="lcg-regular-16 color-white" type="text" name="nickRegistration" id="nickRegistration" placeholder="Никнейм пользователя" ref={nickRefRegistration} />
                            </div>
                            <div className="text-field half">
                                <input className="lcg-regular-16 color-white" type="password" name="passwordRegistration" id="passwordRegistration" placeholder="Пароль" ref={passwordRefRegistration} />
                            </div>
                        </div>
                        <div className="row-wrap gap-wrapper-5px align-center">
                            <div className="text-field half">
                                <input className="lcg-regular-16 color-white" type="text" name="name" id="name" placeholder="Имя пользователя" ref={nameRef} />
                            </div>
                            <div className="text-field half">
                                <input className="lcg-regular-16 color-white" type="text" name="surname" id="surname" placeholder="Фамилия пользователя" ref={surnameRef} />
                            </div>
                        </div>
                        <div className={`row-wrap gap-wrapper-5px ${instituteValue.length ? "align-center" : "flex-start"}`} style={{ width: instituteValue.length ? null : "459px", zIndex: 2 }}>
                            {institutes && <Selector data={Object.keys(institutes)} placeHolder="Институт" value={instituteValue} setValue={setInstituteValue} setSecondValue={setDirectionValue} />}
                            {instituteValue.length ? <Selector data={institutes[instituteValue]} placeHolder="Направление" value={directionValue} setValue={setDirectionValue} /> : <></>}
                        </div>
                        <div className="row-wrap gap-wrapper-5px align-center" style={{ zIndex: 1 }}>
                            <Selector data={courses} placeHolder="Курс" value={courseValue} setValue={setCourseValue} />
                            <div className="text-field half">
                                <input className="lcg-regular-16 color-white" type="text" name="group" id="group" placeholder="Группа" ref={groupRef} />
                            </div>
                        </div>
                    </div>
                    <button className="transparent-btn color-white lcg-regular-14" onClick={() => { onRegistration() }}>Зарегистрироваться</button>
                </div>
            </PopUp>
        </header>
    );
}

export default Header;