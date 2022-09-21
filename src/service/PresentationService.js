import API from "./API";

class PresentationService {
    baseUrl = "/presentations";

    create(presentation) {
        return API.post(this.baseUrl, presentation);
    }
}

export default new PresentationService();