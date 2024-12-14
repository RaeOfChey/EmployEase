# EmployEase

### Status: In Progress

![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Tools and Technologies](#tools-and-technologies)
6. [Dependencies and Installs](#dependencies-and-installs)
7. [Future Enhancements](#future-enhancements)
8. [License](#license)
9. [Contributing](#contributing)
10. [Contact Us](#contact-us)
11. [Tests](#tests)
12. [Questions](#questions)
13. [Credits and Acknowledgements](#credits-and-acknowledgements)

## Description
Employ-Ease is a job-tracking platform designed to help users organize and manage their job applications. Built with the MERN stack, the application integrates with The Muse API to fetch job data and allows users to save, filter, and track their applications seamlessly. Employ-Ease features a responsive user interface and secure authentication using JSON Web Tokens (JWT).

To view the application, simply navigate to the live website at https://employease-hubi.onrender.com/.

## Features
- Integration with The Muse API for job data.
- CRUD functionality for managing job applications:
   - Users: Create accounts, log in, and securely manage session data.
   - Jobs: Save, filter, and track job applications.
- Responsive and clean UI for seamless user experience.
- Authentication using JSON Web Tokens (JWT).
- Fully deployed on Render with a MongoDB Atlas database.

## Installation
To use the application, follow these steps:

- Step 1: Clone the repository.
- Step 2: Navigate to the project directory by typing `cd employ-ease`.
- Step 3: Install the required dependencies by running `npm install` in both the root and client directories..

## Usage
To start the application, run the following command: `npm run develop`.

Open the application in your browser to use its features or test API endpoints with a tool like Insomnia.

Features:
- User Authentication: Sign up, log in, and maintain secure sessions.
- Job Tracking: Save and track job applications with detailed notes.
- Search and Filter: Find jobs using integrated API data and custom filters.

## Tools and Technologies
**Programming Language**:
- TypeScript

**Libraries & Frameworks**:
- React
- Express.js
- Apollo Server (GraphQL)

**Development Environment**:
  - MongoDB Atlas

## Dependencies and Installs

**NPM Packages**:
- `@apollo/client` - GraphQL client for the React front-end.
- `apollo-server-express` - Integrates Apollo Server with Express.js.
- `bcrypt` - Hashes user passwords for secure authentication.
- `jsonwebtoken` - Handles user tokenization for secure sessions.
- `mongoose` - ODM for MongoDB, managing schema and data validation.

## Future Enhancements
- Allow users to export their tracked jobs into a resume format, leveraging the JSON-based resume standard.
- Expand data sources by integrating LinkedIn and Indeed APIs for richer job listings.
- Include salary ranges, company reviews, and other job details not currently available through The Muse API.
- Provide users with visual insights into their job application trends, success rates, and follow-up reminders.
- Enable users to share job opportunities or application statuses with peers or mentors for feedback.
- Develop a mobile-friendly version or a standalone app for on-the-go job tracking.

## License
This project is licensed under the MIT License, which allows you to freely use, modify, and distribute this software, provided proper attribution is given.

## Contributing
This project is part of a coding bootcamp assignment and is not open for contributions. To comply with the course requirements, I must complete this project individually without outside assistance. Therefore, pull requests, issues, or other contributions will not be accepted. Thank you for understanding!

## Contact Us
**Avery Jacobson**:
- https://github.com/

**Cheyenna**:
- https://github.com/RaeOfChey
- https://cheyenna-raelynn-portfolio.netlify.app/
- cheyennaraelynn@gmail.com

**Chris Persaud-Cox**:
- https://github.com/ChristopherP-C

**Jayce Thoreson**:
- https://github.com/

## Tests
GitHub Actions were utilized for continuous integration, ensuring the codebase remained functional with every push or pull request. Additional manual testing was conducted to validate the application's features.

## Questions
If you have any questions reguarding this application, feel free to reach out to any of the contributors of the project. Contact info can be found on each individuals GitHub page (listed above).

## Credits and Acknowledgements
- **University of Minnesota** — For providing foundational resources, guidance, and support throughout the development of this project.
- **[TheMuse API](https://www.themuse.com/developers/api)** — For supplying jobs
- **Render** — For a seamless and reliable deployment platform, making it easy to host, manage, and scale the application.
- **Atlas** — For its scalable and developer-friendly database solution, supporting robust data storage and retrieval for mongo databases.
- **[Bootstrap](https://getbootstrap.com/)** - Open-source front-end framework
