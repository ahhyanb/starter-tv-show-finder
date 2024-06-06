# TV Show Finder

> It can be hard to track TV shows that you want to watch, especially when you want to share those preferences with a partner or friends. This application allows you to find TV shows by name and cast members, make lists of shows you want to watch, and compare those lists with other people to find shows that you can watch together. It uses the [TVMaze API](https://www.tvmaze.com/api) for data about TV shows.

There are no user stories for deployment: it is expected that you will deploy the application to production after you finish a user story.

There are no user stories for logging: it is expected that you will add logging to the application with enough detail to help you diagnose issues in production.

<!-- TOC depthfrom:2 depthto:3 -->

- [Getting started](#getting-started)
  - [Running your application](#running-your-application)
  - [Running the tests](#running-the-tests)
- [Existing files](#existing-files)
  - [The root directory](#the-root-directory)
  - [Backend directory](#backend-directory)
  - [Frontend directory](#frontend-directory)
- [Project requirements](#project-requirements)
  - [Database schema](#database-schema)
  - [API routes](#api-routes)
  - [Frontend views](#frontend-views)
- [User stories](#user-stories)
  - [US-01 - Landing page](#us-01---landing-page)
  - [US-02 - Search Bar](#us-02---search-bar)
  - [US-03 - View show](#us-03---view-show)
  - [US-04 - Create list](#us-04---create-list)
  - [US-05 - View list](#us-05---view-list)
  - [US-06 - Remove show from list](#us-06---remove-show-from-list)
  - [US-07 - Edit list](#us-07---edit-list)
  - [US-08 - Delete a list](#us-08---delete-a-list)
  - [US-09 - View account](#us-09---view-account)
  - [US-10 - Create account](#us-10---create-account)
  - [US-11 - Edit account](#us-11---edit-account)
  - [US-12 - Delete an account](#us-12---delete-an-account)
  - [US-13 - Compare lists](#us-13---compare-lists)
- [Recommended Schedule](#recommended-schedule)
- [Rubric](#rubric)

<!-- /TOC -->

## Getting started

To get started on this project, fork and clone this repository. Keep in mind that you _will not be making a pull request to this repository._

### Running your application

Run the following commands from your command line. Make sure you are in the root directory before running the commands.

```
npm run backend-install
npm run frontend-install
```

To start the project, you have a few different options. View the `package.json` in the root directory to see the scripts available to you.

For development purposes, you will likely want to open up a terminal tab, navigate to the `backend/` directory, and run `npm run dev`. In a different terminal tab you will want to navigate to the `frontend/` directory and run `npm start`.

### Running the tests

To run the tests for the backend, you can use the `npm test` command from the root directory of this project.

## Existing files

As you work through the user stories listed later in this document, you will be writing code that allows your frontend and backend applications to talk to each other. You will also write code to allow your controllers and services to connect to, and query, your PostgreSQL database via [Knex](http://knexjs.org/).

The table below describes the folders in this starter repository:

| Folder/file path | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `./backend`      | The backend project, which runs on `localhost:5001` by default.  |
| `./frontend`     | The frontend project, which runs on `localhost:3000` by default. |

This starter code closely follows the best practices and patterns established in the Robust Server Structure module.

**Note**: Please do not submit a pull request to this repository with your solution.

### The root directory

The root directory (where this file is located) contains the instructions for your project, a `.gitignore` file, and a `package.json` file.

The `package.json` file includes a number of scripts which may be useful for building your project. Before beginning your project, make sure to look through the file.

### Backend directory

The backend directory contains a working server although there are no pre-written routes. The following files and folders are present within it:

#### Configuration files

The following files will aid in configuring your backend project:

- The `package.json` file includes a number of scripts which may be useful for building your project.

- The `.env.sample` file includes the environment variables you will need to complete your project. This file should be copied to a `.env` file and then the values should be replaced.

- The `knexfile.js` file includes configuration details for your [Knex](http://knexjs.org/) installation. Keep in mind that your connection will only work if you define a `DATABASE_URL` within your `.env` file.

#### `src/` directory

The `src/` directory includes two files and two directories.

The `app.js` and `server.js` file will aid in running your application. You will likely not need to make any edits to the `server.js` file, but you will need to make edits to the `app.js` file to add your routes and potentially other middleware.

##### `db/` directory

The `db/` directory contains a `connection.js` file. When you create migrations and seeds, they should appear within this directory under new directories with the same name.

##### `errors/` directory

The two files within this directory will handle errors for your server. They are both used within the `app.js` file.

In order to trigger the function within the `errorHandler` file, you will need to call the `next()` function within a route. An object should be passed into your `next()` function and should have the following shape, although the values should be replaced with appropriate error messages.

```javascript
next({ status: 500, message: "Your error message" });
```

#### `test/` directory

The only automated tests for this project are within this directory. Keep in mind that to run your tests, you must create a test database and provide its URL within your `.env` file.

### Frontend directory

The `frontend/` directory contains a standard React application. Keep in mind that [React Router](https://reactrouter.com/en/6.23.1) is already installed and that the `public/index.html` file includes [Bootstrap 5](https://getbootstrap.com/docs/5.3/getting-started/introduction/) and [Bootstrap Icons](https://icons.getbootstrap.com/).

## Project requirements

The following requirements are _not optional_ for this project. Some tests depend on these structures being in place.

### Database schema

The following two tables are required. You will also need to figure out some way to keep track of the ingredient quantity overall as well as each recipe's ingredients, which may require one or more additional tables.

#### `accounts` table

Each account represents an individual person using the web application.

> **Note:** This project _does not_ require you to implement authentication as part of its requirements. While you may add authentication at a later point, it is not essential to completing the project.

While you made include additional fields to this table, you must have the following fields.

| column name | data type | description                                    |
| ----------- | --------- | ---------------------------------------------- |
| `id`        | `integer` | A unique ID for each account.                  |
| `name`      | `text`    | A title for the account.                       |
| `username`  | `text`    | A unique username that represents the account. |

#### `lists` table

Each list represents a collection of shows from the [TVMaze API](https://www.tvmaze.com/api). Each list is associated with a user.

While you made include additional fields to this table, you must have the following fields.

| column name  | data type | description                                               |
| ------------ | --------- | --------------------------------------------------------- |
| `id`         | `integer` | A unique ID for each list.                                |
| `title`      | `text`    | The title of the list.                                    |
| `account_id` | `integer` | A foreign key the represents which account owns the list. |

#### Additional tables and fields

You will need some way to store _at least_ the IDs of shows from the [TVMaze API](https://www.tvmaze.com/api). It is up to you to determine how you wish to store and access this data.

#### Seed data

Your seed data should include at least 2 accounts. Each accounts should have at least 1 list that should be populated with at least 3 shows.

### API routes

Your API layer should be written in Express and connect to your SQL database using Knex. It should include these routes.

| HTTP method | path                   | description                                                      |
| ----------- | ---------------------- | ---------------------------------------------------------------- |
| `GET`       | `/accounts`            | Returns all accounts within the database.                        |
| `GET`       | `/accounts/:accountId` | Returns a single account with the matching ID.                   |
| `POST`      | `/accounts`            | Should create a new account and return that account with its ID. |
| `PUT`       | `/accounts/:accountId` | Updates an account based on the                                  |
| `DELETE`    | `/accounts/:accountId` | Should delete the specified account.                             |
| `GET`       | `/lists`               | Returns all lists within the database.                           |
| `GET`       | `/lists/:listId`       | Returns a single list with the matching ID.                      |
| `POST`      | `/lists`               | Should create a new list and return that list with its ID.       |
| `PUT`       | `/lists/:listId`       | Updates an list based on the                                     |
| `DELETE`    | `/lists/:listId`       | Should delete the specified list.                                |

Keep in mind that you may need additional routes to manage the process of adding and removing shows from lists.

#### Request and response payloads

Your requests and responses should include a `data` key before any data is sent to or from the server. For example, a response from the server to the `GET /recipes` route could look like the following:

```js
{
  data: [
    {
      id: 1,
      name: "Stephanie Lee",
      username: "stephanie.lee",
    },
    // ...
  ];
}
```

If an error occurs, the `data` key _should not_ be present. See the `backend/src/errors/errorHandler.js` to see how errors should be returned.

### Frontend views

Your application should be written in React and should make requests to your API. It should have these screens.

| path                        | screen name    | description                                                                                            |
| --------------------------- | -------------- | ------------------------------------------------------------------------------------------------------ |
| `/`                         | Home           | The home screen should show all lists created by all accounts.                                         |
| `/accounts`                 | Accounts Index | This page should show all of the accounts.                                                             |
| `/accounts/:accountId/new`  | New Account    | This page should allow for the creation of a new account.                                              |
| `/accounts/:accountId/edit` | Edit Account   | This page should allow for an account to be edited.                                                    |
| `/lists/:listId`            | Show List      | This page should show details about a single list, including all shows.                                |
| `/lists/:listId/new`        | New List       | This page should allow for the creation of a new list.                                                 |
| `/lists/:listId/edit`       | Edit List      | This page should allow for a list to be edited.                                                        |
| `/lists/compare`            | Compare Lists  | This page should allow for multiple lists to be selected and display common shows between those lists. |
| `/shows?q=<search>`         | Search Shows   | This page should display all shows returned from the API based on a search term.                       |
| `/shows/:showId`            | Show Show      | This page should display details about a single show.                                                  |

## User stories

### US-01 - Landing page

As a user<br/>
I want to be able to see all lists created on the application<br/>
to navigate to a specific list.

#### Acceptance criteria

- The homepage (i.e., `/`) displays all lists created in the web application.
- Clicking on a list brings you to that list's show page.

### US-02 - Search Bar

As a user<br/>
I want to be able to search for shows<br/>
so that I can add them to a list.

#### Acceptance criteria

- All pages should include a search bar in the header where a user can search for shows.
- Upon searching they should be brought to a page which includes the search term in the URL (e.g., `/shows?q=<search>`).
- All shows which have a title that matches the search term can be pulled from the [TVMaze API](https://www.tvmaze.com/api) and displayed on the page.
- Clicking on a show brings the user to the specific page for that show.

### US-03 - View show

As a user<br/>
I want to view a show's page<br/>
so that I can see detailed information about that show and add it to a list.

#### Acceptance criteria

- The `/show/:showId` page should display details about the show.
- There should be a way on this page to add the show to any list in the application.
  - If the show is already on the list, an error should display to the user.

### US-04 - Create list

As a user<br/>
I want to be able to create a new list<br/>
so that I can build a collection of shows.

#### Acceptance criteria

- The `/lists/new` page should include a form that allows for the creation of new lists.
  - These lists _do not_ need to include shows. Those can be added from the list's page.
- If the data entered within the form is invalid, an error message should be shown.
- When a list is successfully created, the user should be taken to that list's individual page.

### US-05 - View list

As a user<br/>
I want to view a list's page<br/>
so that I can see detailed information about that list.

#### Acceptance criteria

- The `/lists/:listId` page should show the list with all of its information, including its associated shows and the account it is associated with.
- Links should be present so that a user can click on a link to go to an account's page, and that when clicking on a show they go to that show's specific page.

### US-06 - Remove show from list

As a user<br/>
I want to be able to remove a show from a list<br/>
so that I can keep my list updated.

#### Acceptance criteria

- On the `/lists/:listId` page, there should be a button or link that allows for an show to be removed. When that button is clicked, the relationship between the show and the list is removed from the database.
- The page should visually update to show that the show has been removed.

### US-07 - Edit list

As a user<br/>
I want to be able to edit an existing list<br/>
so that I can keep my list details updated.

#### Acceptance criteria

- The `/lists/:listId/edit` page should include a form that allows for the given list details to be updated.
- If the data entered within the form is invalid, an error message should be shown.
- When a list is successfully updated, the user should be taken to that list's individual page.

### US-08 - Delete a list

As a user<br/>
I want to be able to delete a list<br/>
so that I can clean up outdated information.

#### Acceptance criteria

- On the `/lists/:listId` page, there should be a button that allows for the list to be deleted.
  - Before the list is deleted, a message should appear that asks the user to confirm that they wish to delete the list.
- When the list is deleted, that record should be deleted from the database. If other records depend on the list (e.g., a row within a join table), those records should be deleted as well.
- When the list is deleted, the user should be brought to the `/` page.

### US-09 - View account

As a user<br/>
I want to view an account's page<br/>
so that I can see what lists that account has.

#### Acceptance criteria

- The `/account/:accountId` page should display details about the account, including the account's name and username.
- The lists associated with the account should also be displayed on the page.
- Clicking on a list should bring you to that list's page.

### US-10 - Create account

As a user<br/>
I want to be able to create a new account<br/>
so that I can build a profile of lists.

#### Acceptance criteria

- The `/accounts/new` page should include a form that allows for the creation of new accounts.
- If the data entered within the form is invalid, an error message should be shown.
- When a account is successfully created, the user should be taken to that account's individual page.

### US-11 - Edit account

As a user<br/>
I want to be able to edit an existing account<br/>
so that I can keep my account details updated.

#### Acceptance criteria

- The `/accounts/:accountId/edit` page should include a form that allows for the given account details to be updated.
- If the data entered within the form is invalid, an error message should be shown.
- When a account is successfully updated, the user should be taken to that account's individual page.

### US-12 - Delete an account

As a user<br/>
I want to be able to delete an account<br/>
so that I can clean up outdated information.

#### Acceptance criteria

- On the `/accounts/:accountId` page, there should be a button that allows for the account to be deleted.
  - Before the account is deleted, a message should appear that asks the user to confirm that they wish to delete the account.
- When the account is deleted, that record should be deleted from the database. If other records depend on the account (e.g., a row within a join table), those records should be deleted as well.
- When the account is deleted, the user should be brought to the `/` page.

### US-13 - Compare lists

As a user<br/>
I want to be able to compare two or more lists<br/>
so that I can see what shows those lists have in common.

#### Acceptance criteria

- On the `/lists/compare` page a user should be able to first select an account and then select a list associated with that account.
- The user should be able to select at least two of these lists.
- When two or more lists are selected, all of the common shows between those lists should be displayed to the user.
  - If there are no matches, a message should be shown.
- Clicking on one of those shows should bring the user to the show's page.

## Recommended Schedule

| Time frame        | Goals                                                                                                                                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Week 1, Mon-Tues  | Go through the final capstone lessons. Understand the final capstone requirements. Plan out your project, creating a Kanban board and schedule for your final capstone project. Deploy your application. Design the schema and pages for your household members. |
| Week 1, Wed-Fri   | Complete user stories 1 - 5.                                                                                                                                                                                                                                     |
| Week 2, Mon-Wed   | Re-deploy your application. Complete user stories 6 - 8.                                                                                                                                                                                                         |
| Week 2, Thurs-Fri | Complete user stories 9 - 12. Re-deploy your application.                                                                                                                                                                                                        |
| Week 3, Mon-Wed   | Complete any remaining users stories. Re-deploy your application.                                                                                                                                                                                                |
| Week 3, Thurs-Fri | Complete your README file and clean up your code. Submit your project.                                                                                                                                                                                           |

## Rubric

When your final capstone project is graded, your grader will use the above acceptance criteria and this rubric to assess your work.

1. Are all the tests passing?
2. Are all business rules enforced in UI, API, and (if possible) the database?
3. Do all API calls make use of an AbortController?
4. Do all API calls abort without error in the UI or console (e.g. click a submit button multiple times very quickly)?
5. Do all API calls in React handle errors and display the error message to the user?
6. Do all uses of key= in React loops use a unique value from the entity (key is never the array index)?
7. Are all functions calls using async/await wrapped in a valid asyncErrorBoundary or try/catch block?
8. Note two things that the student could improve upon.
9. Note two things that the student did well.

Your grader may leave additional feedback on your submission once it's reviewed.
