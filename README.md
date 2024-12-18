# My Bolt Journey

## Project Overview

**My Bolt Journey** is a web application that allows users to visualize their journey through various projects and achievements. The application provides a user-friendly interface to display project statistics, milestones, and accomplishments, making it easy for users to share their progress with others.

### Features

- **User Profile**: Displays user information, including avatar and username.
- **Project Timeline**: Visual representation of the user's journey, showcasing the first and latest projects.
- **Statistics**: Displays total projects and commits with visually appealing cards.
- **Achievements**: Highlights user achievements with icons and descriptions.
- **Downloadable Journey Image**: Users can download a visual representation of their journey, complete with a watermark.
- **Social Media Sharing**: Users can share their journey on social media platforms (currently, the share functionality is not implemented).

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static types.
- **Vite**: Build tool for faster development and optimized production builds.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **html-to-image**: Library for converting HTML elements to images.


## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/prasanthLalapeta/bolt-wrapped.git
   cd bolt-wrapped
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add your environment variables:
   ```plaintext
   VITE_GITHUB_TOKEN=your_github_token
   VITE_DEPLOYED_URL=your_deployed_url
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Navigate to `http://localhost:5173/` to view the application.

## Usage

- Users can view their project statistics and achievements.
- The "Download My Bolt Journey ⚡" button allows users to download a visual representation of their journey.
- Users can share their journey on social media by downloading the image and sharing it.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

There might be some issues with the codebase structure, Since we used bolt.new and cursor to build this. I'm working on it.

## License

This project is licensed under the MIT License.