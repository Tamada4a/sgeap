export function getAuthToken() {
    return window.localStorage.getItem("authToken");
};


export function setAuthToken(token) {
    window.localStorage.setItem("authToken", token);
};


export function getStoredUserNick() {
    return window.localStorage.getItem("userNick");
};


export function setStoredUserNick(nick) {
    window.localStorage.setItem("userNick", nick);
};


export function resetRef(ref) {
    if (ref !== "") {
        ref.current.value = "";
    }
}