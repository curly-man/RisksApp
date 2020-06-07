import USERS_DB_URL from './config'

class UserService {
    constructor() {
        this.url = USERS_DB_URL
    }

    async makeRequest(methodType, data){
        const response = await fetch(this.url, {
            method: methodType,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'},
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    getUser(userName) {
        return this.makeRequest("GET", undefined)
    }

    createUser(userName, userPassword) {
        return this.makeRequest("POST", {name: userName, password: userPassword})
    }
}

export default UserService