# Deployment & DevOps Guide

## Deployment Architecture

```
┌─────────────────┐
│   Git Repository │
│    (GitHub)      │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  CI/CD Pipeline  │
│  (GitHub Actions)│
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────┐
│      Testing & Builds        │
│  - Unit Tests                │
│  - Build Docker Images       │
│  - Security Scans            │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│    Docker Registry           │
│   (Docker Hub / ECR)         │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│  Production Environment      │
│  - AWS/Azure/DigitalOcean    │
│  - Docker Containers         │
│  - Load Balancer             │
│  - Monitoring & Logging      │
└──────────────────────────────┘
```

## Environment Setup

### Development Environment
- **Server**: Local machine
- **Database**: Local MongoDB or MongoDB Atlas dev
- **API URL**: http://localhost:5000
- **Frontend URL**: http://localhost:5173

### Staging Environment
- **Server**: AWS EC2 / Azure VM
- **Database**: MongoDB Atlas (staging)
- **SSL**: Self-signed or staging certificate
- **Backups**: Automated daily

### Production Environment
- **Server**: AWS / Azure / DigitalOcean
- **Database**: MongoDB Atlas (production, replicated)
- **SSL**: Valid SSL certificate (Let's Encrypt)
- **CDN**: CloudFlare
- **Backups**: Automated hourly
- **Monitoring**: 24/7

## Docker Setup

### Backend Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "index.js"]
```

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=development
      - MONGODB_URI=mongodb://mongo:27017/ecommerce
    depends_on:
      - mongo
    networks:
      - app-network

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - app-network

  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    networks:
      - app-network

volumes:
  mongo_data:

networks:
  app-network:
    driver: bridge
```

### Build and Run
```bash
# Build Docker images
docker-compose build

# Run containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## CI/CD Pipeline (GitHub Actions)

### `.github/workflows/deploy.yml`
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd backend && npm ci
          cd ../frontend && npm ci
      
      - name: Run tests
        run: |
          cd backend && npm test
          cd ../frontend && npm test
      
      - name: Build applications
        run: |
          cd backend && npm run build
          cd ../frontend && npm run build
      
      - name: Build Docker images
        run: |
          docker build -t backend:latest ./backend
          docker build -t frontend:latest ./frontend
      
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push backend:latest
          docker push frontend:latest
      
      - name: Deploy to production
        run: |
          # Deploy commands here
          ssh user@server 'cd /app && docker-compose pull && docker-compose up -d'
```

## Database Backup & Recovery

### Automated Backups
```bash
# Backup MongoDB
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/ecommerce" \
          --out=./backup_$(date +%Y%m%d_%H%M%S)

# Backup with compression
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/ecommerce" \
          --archive=backup.archive --gzip

# Restore from backup
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net/ecommerce" \
             --archive=backup.archive --gzip
```

### Backup Schedule
- **Daily**: Full database backup
- **Hourly**: Incremental backup
- **Retention**: 30 days for daily, 7 days for hourly

## Monitoring & Logging

### Application Monitoring
```javascript
// Backend monitoring with Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'ecommerce-api' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Server Monitoring
- **CPU Usage**: Alert if > 80%
- **Memory**: Alert if > 85%
- **Disk Space**: Alert if < 10% free
- **Uptime**: Monitor 99.5% SLA

### Application Performance Monitoring
- **Response Times**: Track API endpoint latency
- **Error Rate**: Monitor error logs
- **Request Count**: Track traffic patterns
- **Database Performance**: Query execution times

### Alerts
- Immediate: Server down, critical error rate
- 1 hour: High memory usage, slow queries
- Daily: Backup failures, security updates

## Scaling Strategy

### Horizontal Scaling
```yaml
# Load balancer configuration
upstream backend {
  server api1.example.com;
  server api2.example.com;
  server api3.example.com;
}

server {
  listen 80;
  server_name api.example.com;
  
  location / {
    proxy_pass http://backend;
  }
}
```

### Database Scaling
- **Replica Sets**: 3 nodes for high availability
- **Sharding**: Partition data by user ID
- **Read Replicas**: Scale read operations

### Caching Strategy
- **Redis**: Cache frequently accessed data
- **CDN**: Serve static assets
- **Browser Cache**: Set appropriate headers

## Security in Production

### HTTPS/SSL
```bash
# Generate SSL certificate (Let's Encrypt)
certbot certonly --standalone -d api.example.com

# Nginx configuration
server {
  listen 443 ssl;
  ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;
}
```

### Environment Variables
- Store in `.env` file (not in code)
- Use secrets management (AWS Secrets Manager, Azure Key Vault)
- Never commit secrets to git

### Network Security
- Firewall rules
- VPC/Security groups
- API rate limiting
- DDoS protection

## Maintenance & Updates

### Scheduled Maintenance
- **Weekly**: Security updates
- **Monthly**: Database optimization
- **Quarterly**: Major updates
- **Annual**: Infrastructure review

### Update Procedure
1. Create backup
2. Deploy to staging
3. Run full test suite
4. Deploy to production
5. Monitor for issues

### Rollback Procedure
```bash
# If deployment fails
docker-compose down
docker image rm backend:latest frontend:latest
# Restore from previous backup
docker pull backend:v1.0
docker-compose up -d
```

## Cost Optimization

### Resources
- **Compute**: Use auto-scaling
- **Storage**: Archive old data
- **Transfer**: Use CDN for static content
- **Database**: Optimize queries

### Cost Monitoring
- Set budget alerts
- Regular cost reviews
- Resource optimization audit
