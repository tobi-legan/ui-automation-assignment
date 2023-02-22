import {
    SignInPage,
    SharedTopNavAllPages,
    SettingsPage,
} from "./../../support/pages";
import { signInTestData } from "../../fixtures/constants";
const signInPage = new SignInPage();
const sharedTopNavAllPages = new SharedTopNavAllPages();
const settingPage = new SettingsPage();

describe("Log out Test", () => {
    beforeEach(() => {
        signInPage.visitSignInPage();
        signInPage.signInValidFlow(
            signInTestData.signIn_ValidTest.email,
            signInTestData.signIn_ValidTest.password,
            "loginIntercept"
        );
    });

    it("Ensure that logged in user can logout successfully", () => {
        sharedTopNavAllPages.clickImageProfileLink();
        settingPage.checkThatProfilePageIsOpenByDefault();
        settingPage.clickLogOutButton();
        settingPage.checkThatUserIsLoggedOut();
    });
});
