# Rick and Morty Character Explorer

A React + TypeScript web application that displays characters from the Rick and Morty API with infinite scrolling, filters, and detailed character profiles.

## Technologies Used
- React 18
- TypeScript
- React Router
- Axios (for API calls)
- React Testing Library + Vitest (testing)
- CSS Modules
- Intersection Observer API (infinite scroll)

## Features

- **Infinite scrolling** to load more characters as you scroll down
- **Filtering** by character name, status (alive, dead, unknown), and gender
- **Character detail page** showing detailed info, origin and location details, and episodes they appear in
- **React Router** for navigation between list and profile pages
- Uses **TypeScript** for type safety
- Unit and integration tests with **React Testing Library** and **Vitest**

## Demo

*(Add your deployed link or GIF/demo screenshot here)*

## Getting Started

### Prerequisites

- Node.js (22.14.0)
- npm package manager

### Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/rick-and-morty-explorer.git
cd rick-and-morty-explorer
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

Open http://localhost:3000 to view it in your browser.

4. Running Tests
```
npm test
```

## Project Structure
```
src/
├── components/           # Reusable UI components (CharacterCard, Filters, EpisodeList, etc.)
├── pages/                # Pages (CharactersPage, CharacterProfile)
├── services/             # API service setup (axios instance)
├── types/                # TypeScript interfaces/types
├── App.tsx               # Main app with router
└── index.tsx             # ReactDOM entry

```
