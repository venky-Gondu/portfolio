# Unified Dockerfile for Single Deployment
# Builds Next.js frontend and serves it with Flask backend

# Stage 1: Build Next.js Frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /frontend

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm ci --only=production

# Copy frontend source
COPY frontend/ ./

# Build Next.js for production (static export)
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
COPY backend/create_test_admin.py ./
COPY backend/create_venky_admin.py ./

# Copy database module
COPY database/ ./database/

# Copy built frontend from frontend-builder stage
COPY --from=frontend-builder /frontend/.next/standalone ./frontend/
COPY --from=frontend-builder /frontend/.next/static ./frontend/.next/static
COPY --from=frontend-builder /frontend/public ./frontend/public

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PATH=/root/.local/bin:$PATH

# Expose port
EXPOSE 5000

# Run with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "--timeout", "120", "app:app"]
