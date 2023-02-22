import { API_BASE_URL } from "../../fixtures/constants/index";
export class SignUpApis {
    signUpRequest = (bodyToUse) => {
        cy.request({
            method: "POST",
            url: `${API_BASE_URL}/auth/signup`,
            body: bodyToUse,
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    };
}
