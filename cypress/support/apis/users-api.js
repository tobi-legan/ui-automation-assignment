import { API_BASE_URL } from "../../fixtures/constants/index";

export class UserApi {
    getUser = (bodyToUse) => {
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}`,
            headers: { Authorization: "Bearer " + authToken },
            body: bodyToUse,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.event.name).to.eql(
                eventName + " - Event name"
            );
        });
    };

    updateUser = (bodyToUse, authToken) => {
        cy.request({
            method: "PATCH",
            url: `${API_BASE_URL}/auth/update`,
            headers: { Authorization: "Bearer " + authToken },
            body: bodyToUse,
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    };
}
