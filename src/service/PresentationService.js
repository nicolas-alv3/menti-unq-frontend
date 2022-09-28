class PresentationService {

    create(presentation, accessToken) {
        return fetch('http://localhost:8080/api/presentation/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify(presentation)
        }).then(data => data.json());
    }

    getPresentations(accessToken) {
        let url = new URL('http://localhost:8080/api/presentation/individual');
        return fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + accessToken,
            },
        }).then(data => data.json());
    }
}

export default new PresentationService();