export function storeToken(tokenValue){
    localStorage.setItem("token",tokenValue);
}

export function getToken(){
    return localStorage.getItem("token");
}

export function removeToken(){
    localStorage.removeItem("token");
}