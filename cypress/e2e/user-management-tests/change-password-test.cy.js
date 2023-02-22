//use curl to create new user
//go to update page and update profile
//do some edge cases, like when fullname/username is empty or taken
import { faker } from "@faker-js/faker";
import {
    SignInPage,
    SharedTopNavAllPages,
    SettingsPage,
} from "./../../support/pages";
import { SignUpApis } from "../../support/apis/index";
import { updateProfileAndPasswordTest } from "../../fixtures/constants";

const signInPage = new SignInPage();
const sharedTopNavAllPages = new SharedTopNavAllPages();
const settingPage = new SettingsPage();
const signUpApi = new SignUpApis();
const newPassword = "Password123#";
const details = {
    fullName: faker.name.fullName(),
    userName: faker.internet.userName(faker.random.numeric(10)),
    phoneNumber: faker.random.numeric(11),
    email: faker.internet.email("", "", "c6qaaekn.mailosaur.net"),
    password: "Password123$",
};

describe("Update ", () => {
    beforeEach(() => {
        signUpApi.signUpRequest({
            email: details.email,
            password: details.password,
            full_name: details.password,
            username: details.userName,
            phone_number: details.phoneNumber,
        });

        signInPage.visitSignInPage();
        signInPage.signInValidFlow(
            details.email,
            details.password,
            "loginIntercept"
        );
        sharedTopNavAllPages.clickImageProfileLink();
    });

    it("Check that user's full name and username can be updated", () => {
        settingPage.checkThatProfilePageIsOpenByDefault();
        settingPage.checkThatProfilePageIsOpenAndFieldsHaveCorrectValues(
            details
        );
        settingPage.clickSecurityMenuButton();
        settingPage.checkThatSecurityPageIsOpen();
        settingPage.inputOldPassword(details.password);
        settingPage.inputNewPassword(newPassword);
        settingPage.interceptUpdatePasswordRequest("passwordIntercept");
        settingPage.clickChangePasswordButton();
        settingPage.waitForUpdateUserInterceptToReturnStatusCode(
            "passwordIntercept",
            200
        );
        settingPage.checkThatSuccessMessageIsDisplayedAfterSuccessfulPasswordUpdate();

        //now to check that the saved password actually works
        settingPage.clickLogOutButton();
        settingPage.checkThatUserIsLoggedOut();
        signInPage.signInValidFlow(
            details.email,
            newPassword,
            "loginIntercept"
        );
    });
});
