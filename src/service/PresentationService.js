import API from "./API";

class PresentationService {
    baseUrl = "/presentations";

    create(presentation, accessToken) {
        console.log(accessToken)
        return fetch('http://localhost:8080/presentation/private', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify(presentation)
        }).then(data => data.json());
    }

}

export default new PresentationService();