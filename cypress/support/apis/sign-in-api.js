import { API_BASE_URL } from "../../fixtures/constants/index";

export class SignInApi {
    signIn = (email, password) => {
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}/auth/login`,
            body: {
                email: email,
                password: password,
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eql("Authentication Successful");
            expect(response.body.data.access_token).to.not.be.empty;
            cy.wrap(response.body.data.access_token).as("token");
        });
    };
}
