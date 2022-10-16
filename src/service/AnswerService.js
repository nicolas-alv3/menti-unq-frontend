import Service from "./Service";

class AnswerService extends Service {

    create({values, questionId}) {
        return fetch(`${this.baseUrl}/api/presentation/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.getAccessToken(),
            },
            body: JSON.stringify({values, questionId})
        }).then(data => data.json());
    }
}

export default new AnswerService();