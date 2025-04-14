# Scouts Sint-Johannes Website

Modern website for Scouts Sint-Johannes, built with Next.js and Docker.

## Features

- 🚀 Modern Next.js 14 application
- 🎨 Beautiful UI with custom styling
- 📱 Fully responsive design
- 🐳 Dockerized development environment
- 🌐 Dutch language support
- 🎯 SEO optimized

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, CSS Variables
- **Development**: Docker, Docker Compose
- **Deployment**: Docker (production ready)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/kampvuurkring.git
   cd kampvuurkring
   ```

2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Start the development environment:
   ```bash
   docker compose up
   ```

The website will be available at `http://localhost:3000`

### Development

To run the development server:

```bash
docker compose up
```

This will start the Next.js development server with hot reloading enabled.

### Building for Production

To build the production Docker image:

```bash
docker compose -f docker-compose.prod.yml build
```

## Project Structure

```
kampvuurkring/
├── frontend/              # Next.js application
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── public/          # Static assets
│   └── styles/          # Global styles
├── docker-compose.yml    # Development Docker configuration
└── README.md            # Project documentation
```

## Pages

- **Home**: Landing page with introduction
- **Over**: Information about the scouting group
- **Activiteiten**: Overview of activities
- **Ratel**: Information about the Ratel group
- **Verhuur Lokaal**: Local rental information
- **Lid Worden**: Membership application form

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact the development team. 