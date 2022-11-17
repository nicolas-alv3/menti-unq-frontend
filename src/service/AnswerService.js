import Service from "./Service";

class AnswerService extends Service {
  create({ values, slide }) {
    return fetch(`${this.baseUrl}/api/answer/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.getAccessToken(),
      },
      body: JSON.stringify({ values, slide }),
    }).then((data) => data.json());
  }

  getAnswersBySlideId(slideId) {
    return fetch(`${this.baseUrl}/api/answer/${slideId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.getAccessToken(),
      },
    }).then((data) => data.json());
  }
}

export default new AnswerService();
