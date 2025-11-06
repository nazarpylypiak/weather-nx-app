# Weather App - Angular + Nx

Welcome! 👋 This is my solution to the **Frontend Mentor Weather App Challenge**.
The app allows users to search for weather information and view current, hourly, and 7-day forecasts using the Open-Meteo API.

**Live demo:** [https://nazarpylypiak.github.io/weather-nx-app/#/weather-now](https://nazarpylypiak.github.io/weather-nx-app/#/weather-now)
**Repository:** [GitHub Repo](https://github.com/nazarpylypiak/weather-nx-app)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [API](#api)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Author](#author)

---

## Overview

This project is a **Weather App** built using **Angular + Nx**. It was developed as part of the Frontend Mentor coding challenge to practice building realistic projects with HTML, CSS, and JavaScript frameworks.

The app is fully responsive and works on both **mobile and desktop** screens. Users can easily switch between Metric and Imperial units and explore hourly and weekly forecasts.

---

## Features

- Search for weather by location
- View current weather (temperature, icon, location)
- See additional metrics: feels like, humidity, wind speed, precipitation
- Browse 7-day forecast with daily highs and lows
- View hourly forecast with day selector
- Toggle between Metric and Imperial units
- Fully responsive layout
- Hover and focus states for interactive elements

---

## Technologies

- **Angular 20**
- **Nx Workspace**
- **TypeScript**
- **SCSS / Tailwind CSS**
- **Open-Meteo API** for weather data
- **GitHub Pages** for deployment

---

## API

The app uses [Open-Meteo API](https://open-meteo.com/en/docs) for fetching weather data. No API key is required.
Example request for current weather:

```
https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true
```

---

## Getting Started

### Prerequisites

- Node.js >= 20
- Angular CLI
- Nx CLI

### Installation

1. Clone the repo:

```bash
git clone https://github.com/nazarpylypiak/weather-nx-app.git
cd weather-nx-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the app locally:

```bash
nx serve weather-app
```

4. Open your browser and go to `http://localhost:4200`

---

## Deployment

The app is deployed on **GitHub Pages**:

```bash
nx run weather-app:deploy
```

**Live version:** [https://nazarpylypiak.github.io/weather-nx-app/#/weather-now](https://nazarpylypiak.github.io/weather-nx-app/#/weather-now)

---

## Screenshots

_(You can add screenshots here using Markdown)_

---

## Author

**Nazar Pylypiak**

- GitHub: [https://github.com/nazarpylypiak](https://github.com/nazarpylypiak)
- Frontend Mentor: [https://www.frontendmentor.io/profile/nazarpylypiak](https://www.frontendmentor.io/profile/nazarpylypiak)
- LinkedIn: [https://www.linkedin.com/in/nazarpylypiak](https://www.linkedin.com/in/nazarpylypiak)
