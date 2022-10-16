import Service from "./Service";

class PresentationService extends Service {

    create(presentation) {
        return fetch(`${this.baseUrl}/api/presentation/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.getAccessToken(),
            },
            body: JSON.stringify(presentation)
        }).then(data => data.json());
    }

    getPresentations() {
        let url = new URL(`${this.baseUrl}/api/presentation/individual`);
        return fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.getAccessToken(),
            },
        }).then(data => data.json());
    }

    getById(id) {
        let url = new URL(`${this.baseUrl}/public/presentation/${id}`);
        return fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.getAccessToken(),
            },
        }).then(data => data.json());
    }

    delete(id) {
        return fetch(`${this.baseUrl}/api/presentation/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.getAccessToken(),
            },
        });
    }
}

export default new PresentationService();