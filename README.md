
# TV Show Finder

Welcome to **TV Show Finder**! This app lets users discover, search for, and save their favorite TV shows. Built with React, Node.js, and PostgreSQL, this project was part of my learning journey to develop full-stack applications.

---

## Features
- **Search TV Shows**: Easily search for your favorite shows with a responsive search feature.
- **Save to Watchlist**: Add shows to your personalized watchlist for later viewing.
- **View Show Details**: Get detailed information about any show, including its genre, rating, and summary.
- **User-Friendly Design**: Built with a simple and clean UI for an intuitive experience.

---

## Live Application
You can view the deployed application here: [TV Show Finder](https://starter-tv-show-finder-1.onrender.com/)

---

## Tech Stack
- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Hosting**: Backend deployed with Render

---

## Getting Started

### Prerequisites
To run this project locally, make sure you have the following installed:
- Node.js
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahhyanb/starter-tv-show-finder.git
   ```
2. Navigate to the project directory:
   ```bash
   cd starter-tv-show-finder
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the database:
   - Create a PostgreSQL database named `tv_show_finder`.
   - Run the migrations and seed files:
     ```bash
     npm run db:migrate
     npm run db:seed
     ```
5. Start the backend:
   ```bash
   cd backend
   npm start
   ```
6. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

---

## Usage
- Search for TV shows in the search bar.
- Add shows to your watchlist by clicking the "Add to Watchlist" button.
- View show details by clicking on a show's name.

---

## Folder Structure
```
starter-tv-show-finder/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
└── README.md
```

---

## Future Improvements
- Add user authentication for personalized watchlists.
- Implement a rating feature so users can rate shows.
- Enhance the UI for better mobile responsiveness.

---

## Contributing
Feel free to fork the repository and make your own improvements! Submit a pull request if you’d like your changes to be part of the project.

---

## Acknowledgments
This project was a part of my learning journey with Chegg Skills Bootcamp, where I honed my skills in full-stack development.

---

## Contact
If you have any questions or suggestions, feel free to reach out:
- **Email**: rahhyahh@icloud.com
- **GitHub**: [ahhyanb](https://github.com/ahhyanb)

---
