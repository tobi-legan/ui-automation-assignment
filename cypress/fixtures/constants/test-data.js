//since the tests are't a lot i have all the data in this one file

export const signInTestData = {
    signIn_ValidTest: {
        email: "collect-citizen@c6qaaekn.mailosaur.net",
        password: "Password123$",
    },

    signIn_ValidEmailWrongPassword: {
        email: "collect-citizen@c6qaaekn.mailosaur.net",
        password: "Password123",
    },

    signIn_InvalidEmailWrongPassword: {
        email: "collect-citize@c6qaaekn.mailosaur.net",
        password: "Password123$",
    },
};

export const signUpTestData = {
    signUpValidTest: {
        fullName: "",
        username: "",
        phoneNumber: "",
        email: "",
        password: "Password123$",
    },

    signUpForDetailsthatAlreadyExist: {
        fullName: "Dr. Genevieve Wyman",
        username: "6199958893.Haag",
        phoneNumber: "92697951182",
        email: "Heather46@c6qaaekn.mailosaur.net",
        password: "Password123$",
    },
};

export const updateProfileAndPasswordTest = {
    email: "Merl.Kshlerin@c6qaaekn.mailosaur.net",
    password: "Password123$",
    fullName: "Ms. Brandi Hauck",
    userName: "7067918846_Boyle",
    phoneNumber: "13199362850",
};
