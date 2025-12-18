# Unified Dockerfile for Single Deployment
# Builds Next.js frontend and serves it with Flask backend

# Stage 1: Build Next.js Frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /frontend

# Set build-time environment variable for Next.js
ARG NEXT_PUBLIC_API_URL=/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Copy frontend package files
COPY frontend/package*.json ./

# Install ALL dependencies (including devDependencies needed for build)
RUN npm ci

# Copy frontend source
COPY frontend/ ./

# Build Next.js for production
RUN npm run build

# Stage 2: Python Backend with Frontend
FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application code
COPY backend/app.py ./
COPY backend/middleware/ ./middleware/
COPY backend/routes/ ./routes/

# Copy database module
COPY database/ ./database/

# Copy built frontend from frontend-builder stage
# Next.js export creates an 'out' directory with static HTML files
COPY --from=frontend-builder /frontend/out ./public

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PATH=/root/.local/bin:$PATH

# Expose port
EXPOSE 5000

# Run with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "--timeout", "120", "app:app"]
