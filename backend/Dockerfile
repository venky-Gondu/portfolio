# Backend-Only Dockerfile for Render/Railway
# This serves ONLY the Flask API (no frontend)

FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application code
COPY app.py ./
COPY middleware/ ./middleware/
COPY routes/ ./routes/
COPY create_test_admin.py ./
COPY create_venky_admin.py ./

# Copy database module from parent directory
COPY ../database/ ./database/

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PATH=/root/.local/bin:$PATH

# Expose port
EXPOSE 5000

# Run with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "--timeout", "120", "app:app"]
