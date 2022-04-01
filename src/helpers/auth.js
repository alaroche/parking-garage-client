export async function authWithJwt() {
    var jsonWebToken = localStorage.getItem('jwt')

    if (!jsonWebToken) {
        return false
    }

    var request = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jsonWebToken
        }),
    }

    return await fetch('http://aaronhost:8000/auth/authorize', request)
        .then(response => response.json())
        .catch(error => error)
}