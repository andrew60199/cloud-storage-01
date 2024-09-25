# Cloud Storage Exploration

## Description
This repository has been created to tap into the knowledge of an expert to learn how to go about using cloud storage to hold an applications images.

## Prerequisites
Since this application connects to a Postgres database, please create a database to use before starting up the web app.

## Installation
Firstly run
`npm i`

Then
`npm run install`

## Usage
To begin, create a `.env` file with the following keys
```bash
DB_NAME
DB_USER
DB_PASSWORD
```

To run the front and back end concurrently, use the command
`npm run start` 

## Acceptance Criteria
### Scenario 1
Given entry to the web app.
When I enter the site.

#### 1
Then I am presented with a logo loaded from a publicly accessible cloud storage bucket.

#### 2
Then I am presented an option to log in.

#### 3
Then I am presented with a list of photos uploaded by users of the web app who set their upload to publicly accessible.

### Scenario 2 
Given I am logged in to the web app.
When logged in.

#### 1 
Then I am presented with the option to log out.

#### 2
Then I am presented with a form to upload a photo to the cloud.

#### 3
Then I am presented with a list of photos I have uploaded.

#### 4 
Then I am presented with a list of photos I have access to view with the details as to whether that photo was shared with me or is publicly accessible.

### Scenario 3
When filling in the form.

#### 1
Then I am presented with an option to select a photo to upload, decide who can see the photo (specify specific users or everyone) and submit it to the cloud storage.

### Scenario 4
When viewing a photo I uploaded.

#### 1
Then I have the option to delete it so it is no longer stored on the cloud storage.

## Technology
### Client
- HTML
- CSS
- Typescript
- React

### Server
- Javascript
- Express.js
- dotenv
- Postgres
- Sequelize
- bcrypt