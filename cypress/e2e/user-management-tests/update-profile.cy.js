//use curl to create new user
//go to update page and update profile
//do some edge cases, like when fullname/username is empty or taken
import {
    SignInPage,
    SharedTopNavAllPages,
    SettingsPage,
} from "./../../support/pages";
import { UserApi } from "../../support/apis/index";
import { updateProfileAndPasswordTest } from "../../fixtures/constants";

const signInPage = new SignInPage();
const sharedTopNavAllPages = new SharedTopNavAllPages();
const settingPage = new SettingsPage();
const userApi = new UserApi();
const fullNameUpdate = "Updated Full name";
const userNameUpdate = "updated_user_name";
const interceptName = "intercept";

describe("Update profile Tests", () => {
    beforeEach(() => {
        signInPage.visitSignInPage();
        signInPage.signInValidFlow(
            updateProfileAndPasswordTest.email,
            updateProfileAndPasswordTest.password,
            "loginIntercept"
        );
        sharedTopNavAllPages.clickImageProfileLink();
    });

    it("Check that user's full name and username can be updated", () => {
        settingPage.checkThatProfilePageIsOpenByDefault();
        settingPage.checkThatProfilePageIsOpenAndFieldsHaveCorrectValues(
            updateProfileAndPasswordTest
        );

        settingPage.updateFullName(fullNameUpdate);
        settingPage.updateUserName(userNameUpdate);
        settingPage.interceptUpdateUserRequest(interceptName);
        settingPage.clickUpdateDetailsButton();
        settingPage.waitForUpdateUserInterceptToReturnStatusCode(
            interceptName,
            200
        );
        settingPage.checkThatUpdateIsCompleted();
        sharedTopNavAllPages.clickImageProfileLink(); //this refreshes the page so i can see that the data is actually still there
        settingPage.checkThatProfilePageIsOpenAndFieldsHaveCorrectValues({
            email: updateProfileAndPasswordTest.email,
            fullName: fullNameUpdate,
            userName: userNameUpdate,
            phoneNumber: updateProfileAndPasswordTest.phoneNumber,
        });

        //then this will be code to reset my user back to the initial fullname and username so it won't fail when someone else is running it
        cy.get("@token").then((token) => {
            userApi.updateUser(
                {
                    full_name: updateProfileAndPasswordTest.fullName,
                    username: updateProfileAndPasswordTest.userName,
                },
                token
            );
        });
    });
});
