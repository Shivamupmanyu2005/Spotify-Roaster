
# Roast My Spotify

A humorous web application that analyzes your Spotify listening habits and generates brutal, AI-powered roasts of your musical taste.

## Features

- **Spotify Authentication**: Secure login via Spotify OAuth
- **Music Analysis**: Fetches your top tracks and recent listening history
- **AI-Generated Roasts**: Uses AI to create personalized, witty roasts based on your music
- **Animated UI**: Smooth GSAP animations throughout the application
- **User Dashboard**: View your profile and music statistics before the roast

## Tech Stack

- **Frontend**: React, Redux, React Router
- **Styling**: Tailwind CSS
- **Animations**: GSAP
- **API Integration**: Spotify Web API
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js (v14+)
- Spotify Developer Account

### Installation

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file with your Spotify credentials:
    ```
    VITE_SPOTIFY_CLIENT_ID=your_client_id
    VITE_API_URL=your_backend_url
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

1. Click "Login with Spotify" on the home page
2. Authorize the application
3. View your top and recent tracks on the dashboard
4. Click "Generate Roast" to receive your personalized roast
5. Share your roast or logout

## Project Structure

- `/src/components` - React components (Dashboard, UserProfile, Roastresult)
- `/src/store` - Redux state management
- `/src/services` - API integration
- `/src/assets` - Images and sounds
