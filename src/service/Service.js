export default class Service {
    baseUrl = 'http://localhost:8080';

    getAccessToken() {
        const loginData = localStorage.getItem("@@auth0spajs@@::0jYDJNY7gVPvMq4XHYEgbbA3sqePLj3C::https://lhazuca.auth0.com/api/v2/::openid profile email offline_access")
        if(loginData) {
            return JSON.parse(loginData).body.access_token;
        } else {
            return "";
        }
    }
}