export function storeRole(role){
    localStorage.setItem("role",role);
}

export function getRole(){
    return localStorage.getItem("role");
}

export function removeRole(){
    localStorage.removeItem("role");
}