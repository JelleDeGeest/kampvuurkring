# Production Deployment Guide

This guide covers deploying the Scouts Sint-Johannes website to production using Docker.

## Quick Start

### 1. Environment Setup

```bash
# Copy the production environment template
cp env.production.example .env.production

# Edit the environment variables
nano .env.production
```

### 2. Deploy to Production

```bash
# Build and start all production services
docker compose -f docker-compose.prod.yml up -d --build

# View logs in real-time
docker compose -f docker-compose.prod.yml logs -f

# View logs for specific service
docker compose -f docker-compose.prod.yml logs -f frontend
```

### 3. Access Your Services

- **Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Database Studio**: http://localhost:54323

## Common Commands

### Start Services
```bash
# Start in background
docker compose -f docker-compose.prod.yml up -d

# Start with logs
docker compose -f docker-compose.prod.yml up
```

### Stop Services
```bash
# Stop and remove containers
docker compose -f docker-compose.prod.yml down

# Stop and remove containers + volumes
docker compose -f docker-compose.prod.yml down -v
```

### Rebuild Services
```bash
# Rebuild without cache
docker compose -f docker-compose.prod.yml build --no-cache

# Rebuild and restart
docker compose -f docker-compose.prod.yml up -d --build
```

### View Status
```bash
# Check service status
docker compose -f docker-compose.prod.yml ps

# Check service health
docker compose -f docker-compose.prod.yml ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `POSTGRES_PASSWORD` | Database password | `secure_password_123` |
| `POSTGRES_DB` | Database name | `scouts_production` |
| `PAYLOAD_SECRET` | Payload CMS secret | `your-secret-key-here` |
| `PAYLOAD_PUBLIC_SERVER_URL` | Public server URL | `https://your-domain.com` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Frontend port | `3000` |
| `POSTGRES_PORT` | Database port | `5432` |
| `STUDIO_PORT` | Database studio port | `54323` |

## Troubleshooting

### Service Won't Start

1. **Check logs**:
   ```bash
   docker compose -f docker-compose.prod.yml logs frontend
   ```

2. **Check environment variables**:
   ```bash
   docker compose -f docker-compose.prod.yml config
   ```

3. **Restart with fresh build**:
   ```bash
   docker compose -f docker-compose.prod.yml down
   docker compose -f docker-compose.prod.yml up -d --build
   ```

### Database Connection Issues

1. **Check database health**:
   ```bash
   docker compose -f docker-compose.prod.yml exec db pg_isready -U postgres
   ```

2. **Check database logs**:
   ```bash
   docker compose -f docker-compose.prod.yml logs db
   ```

### Port Conflicts

If you get port conflicts, change the ports in `.env.production`:

```bash
PORT=3001
POSTGRES_PORT=5433
STUDIO_PORT=54324
```

### Memory Issues

If you encounter memory issues during build:

```bash
# Increase Docker memory limit in Docker Desktop
# Or use build with memory limit
docker compose -f docker-compose.prod.yml build --memory=4g
```

## Production Considerations

### Security

1. **Use strong passwords** for all environment variables
2. **Set up SSL certificates** for HTTPS
3. **Configure firewall rules** to restrict access
4. **Regular security updates** for base images

### Performance

1. **Use a reverse proxy** (nginx) for SSL termination
2. **Set up CDN** for static assets
3. **Configure database connection pooling**
4. **Enable gzip compression**

### Monitoring

1. **Set up health checks** (already configured)
2. **Configure log aggregation**
3. **Set up monitoring alerts**
4. **Regular backup strategy**

### Backup Strategy

```bash
# Backup database
docker compose -f docker-compose.prod.yml exec db pg_dump -U postgres scouts_production > backup.sql

# Backup media files
tar -czf media-backup.tar.gz frontend/media/
```

## Next Steps

1. **Domain Configuration**: Update DNS to point to your server
2. **SSL Setup**: Configure HTTPS with Let's Encrypt or similar
3. **Reverse Proxy**: Set up nginx for better performance
4. **Monitoring**: Implement application monitoring
5. **Backup Automation**: Set up automated backups 