//since the tests are't a lot i have all the data in this one file

export const signInTestData = {
    signIn_ValidTest : {
        email : 'collect-citizen@c6qaaekn.mailosaur.net',
        password : 'Password123$'
    },

    signIn_ValidEmailWrongPassword : {
        email : 'collect-citizen@c6qaaekn.mailosaur.net',
        password : 'Password123'
    },

    signIn_InvalidEmailWrongPassword : {
        email : 'collect-citize@c6qaaekn.mailosaur.net',
        password : 'Password123$'
    }
}