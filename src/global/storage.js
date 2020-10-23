export function saveToken(token = "") {
    if (!token) return 'token is required'
    localStorage.setItem('authorization', token)
}

export function getToken() {
    const authorization = localStorage.getItem('authorization')
    return authorization
}

export function removeToken() {
    localStorage.removeItem('authorization')
}