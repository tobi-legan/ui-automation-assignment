
<br />
<div align="center">
  <h3 align="center">Read Me File</h3>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>Folder Structure With Descriptions
        <li><a href="folder-structure-with-descriptions">Folder Structure With Descriptions</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running-the-tests-on-local">Running the tests On Local</a></li>
        <li><a href="#running-the-tests-in-the-pipeline-with-github-actions">Running the tests in the pipeline with Github actions</a></li>
        <li><a href="#how-to-check-out-errors-in-a-failed-cypress-test-in-the-pipeline">How To check out errors in a failed cypress test in the pipeline</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

cypress automation of some functionalities in the app https://alphapay.netlify.app/

The functionalities include:
* Sign Up
* Log out
* Sign In
* Change Password
* Update profile


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

The automation project was done with Cypress and i used Page objects and what i will call API objects. 
The github actions used to set up the pipeline for the tests were done with the [Cypress split plugin](https://github.com/bahmutov/cypress-split). so this splits our jobs automatically for free so we can run the tests/spec files in parallel

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Folder Structure With Descriptions

|                   |               |                                                                                          |
| ----------------- | ------------- | ---------------------------------------------------------------------------------------- |
| /cypress          |               | The automated testing framework                                                          |
|                   | /e2e          | Contains all the tests                                                                   |
|                   | /fixtures     | Test data used inside the tests                                                          |
|                   | /plugins      | Hook and extend [Cypress behavior](https://docs.cypress.io/api/plugins/writing-a-plugin) |
|                   | /support      | Contains the logic of the tests and all the helper methods                               |
|                   | jsconfig.json | Eslint settings                                                                          |
| .gitignore        |               | Git ignored files                                                                        |
| /.github.         | /workflows    | Github actions configurations                                                            |
| cypress.config.js |               | [Cypress configurations](https://docs.cypress.io/api/cypress-api/config)                 |
| package.json      |               | Scripts and libraries                                                                    |



To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/tobi-legan/ui-automation-assignment.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
   

### Running the tests On Local


1. Open terminal on the roo folder of the cloned repo and run 
   ```sh
   npx cypress open --e2e
   ```
2. Select a browser and then click 'Start E2E Testing' button
3. Click on any of the spec files to run any of the tests


### Running the tests in the pipeline with Github actions

#### A bit of background on the github actions configuration.
to see the file, go to ./github/workflows/e2e-tests.yml
![Screenshot 2023-02-23 at 3 34 48 AM](https://user-images.githubusercontent.com/69557328/220810202-fc94be02-587f-48de-b80f-2da5038631de.png)

1. It is triggered on push and when I create a pr automatically in this repo so you can also push some code to this repo and it will trigger the actions as seen in the screen shot below for one of the PRs
![Screenshot 2023-02-23 at 2 27 45 AM](https://user-images.githubusercontent.com/69557328/220811359-9d23296f-6c4d-41b5-8a4b-048ea7ce2726.png)

2. The cypress split free plugin is called here under the strategy and env lines.. for more info checkout the docs for [Cypress split plugin](https://github.com/bahmutov/cypress-split) 
3. For generating the videos for the runs and screenshots for failed tests i used the 'if failure()' for screenshots because we only need screenshots when the tests fail.

#### To run it now without pushing any code to the repo

1. Click the Actions menu bar in github for the repo
![Screenshot 2023-02-23 at 3 26 41 AM](https://user-images.githubusercontent.com/69557328/220809585-e67aaa23-8e7d-4d71-bbb5-360ba887fd5b.png)

2. Click on the latest run for the 'Main' branch

3. Click on the re-run button on the page
![Screenshot 2023-02-23 at 3 40 05 AM](https://user-images.githubusercontent.com/69557328/220809999-fe9c774d-bc47-46ce-bf9b-ab41e7005481.png)

4. It should start running and you should see the results when its done like this below with the cypress split plugin showing us the breakdown of the tests 
![Screenshot 2023-02-23 at 3 28 54 AM](https://user-images.githubusercontent.com/69557328/220810944-be892c45-1c49-4f9f-b3b9-9caff1107e29.png)

5. You can click on the videos artifact to download the videos for each test file, to see how it ran

### How To check out errors in a failed cypress test in the pipeline

1. You will see the pipeline like this below
![Screenshot 2023-02-23 at 3 29 48 AM](https://user-images.githubusercontent.com/69557328/220811186-a2c07ac0-f6af-4027-b778-75be84e961a4.png)

2. You can download the screenshot artifact to see the screenshot of the page where the error is happening and the command that failed

3. You can also view the video too


<p align="right">(<a href="#readme-top">back to top</a>)</p>


























