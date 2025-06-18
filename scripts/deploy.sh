#!/bin/bash

# Deployment script for Kampvuurkring Scout website
# Usage: ./scripts/deploy.sh [dev|prod]

set -e

MODE=${1:-dev}
PROJECT_NAME="kampvuurkring"

echo "🚀 Deploying $PROJECT_NAME in $MODE mode..."

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Docker is installed
if ! command_exists docker; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check Docker Compose is installed
if ! command_exists docker-compose && ! docker compose version >/dev/null 2>&1; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Load environment variables
if [ -f .env ]; then
    echo "✅ Loading environment variables from .env"
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "❌ .env file not found. Please create one from .env.example"
    exit 1
fi

case $MODE in
    dev)
        echo "🔧 Starting development environment..."
        docker compose down
        docker compose up --build
        ;;
    
    prod)
        echo "🏭 Starting production environment..."
        
        # Stop any running containers
        docker compose -f docker-compose.prod.yml down
        
        # Build production images
        echo "📦 Building production images..."
        docker compose -f docker-compose.prod.yml build
        
        # Start production containers
        echo "🚀 Starting production containers..."
        docker compose -f docker-compose.prod.yml up -d
        
        # Wait for services to be ready
        echo "⏳ Waiting for services to be ready..."
        sleep 10
        
        # Check if services are running
        if docker compose -f docker-compose.prod.yml ps | grep -q "Up"; then
            echo "✅ Production services are running!"
            echo "📍 Frontend: http://localhost:${PORT:-3000}"
            echo "📍 Database: localhost:${POSTGRES_PORT:-5432}"
            echo "📍 Supabase Studio: http://localhost:${STUDIO_PORT:-54323}"
            echo ""
            echo "⚠️  Note: Supabase Studio is included for database management."
            echo "   Consider restricting access in production environments."
        else
            echo "❌ Failed to start production services"
            docker compose -f docker-compose.prod.yml logs
            exit 1
        fi
        ;;
    
    *)
        echo "❌ Invalid mode: $MODE"
        echo "Usage: $0 [dev|prod]"
        exit 1
        ;;
esac