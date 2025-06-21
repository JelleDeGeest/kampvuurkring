# Scouts Sint-Johannes Website

Modern website for Scouts Sint-Johannes, built with Next.js and Docker.

## Features

- 🚀 Modern Next.js 15 application
- 🎨 Beautiful UI with custom styling
- 📱 Fully responsive design
- 🐳 Dockerized development environment
- 🌐 Dutch language support
- 🎯 SEO optimized
- 📝 Payload CMS for content management

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **CMS**: Payload CMS with PostgreSQL
- **Styling**: Tailwind CSS, CSS Variables
- **Development**: Docker, Docker Compose
- **Deployment**: Docker (production ready)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Docker and Docker Compose
- Git

### Development Setup

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

### Production Deployment

1. **Setup Environment Variables**:
   ```bash
   cp env.production.example .env.production
   # Edit .env.production with your production values
   ```

2. **Deploy to Production**:
   ```bash
   # Build and start production services
   docker compose -f docker-compose.prod.yml up -d --build
   
   # View logs
   docker compose -f docker-compose.prod.yml logs -f
   
   # Stop production services
   docker compose -f docker-compose.prod.yml down
   ```

3. **Access Production Services**:
   - Frontend: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin`
   - Database Studio: `http://localhost:54323`

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
│   ├── collections/      # Payload CMS collections
│   ├── public/          # Static assets
│   └── styles/          # Global styles
├── docker-compose.yml    # Development Docker configuration
├── docker-compose.prod.yml # Production Docker configuration
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