# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any needed dependencies specified in requirements.txt
# Using --no-cache-dir to reduce image size
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application's code to the working directory
COPY . .

# Expose port 8000 to the Docker host
# FastAPI default port is 8000 if not specified otherwise by Uvicorn
EXPOSE 8000

# Command to run the Uvicorn server
# For development with auto-reload (ensure 'watchdog' is in requirements.txt):
# CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
#
# For production (without auto-reload):
# CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
#
# DEV_NOTE: The specific command might depend on whether you want auto-reload.
# For a typical Docker build, auto-reload is less common unless the volume mount strategy supports it well.
# The command below is a standard production-like command.
# If using Gunicorn as a process manager for Uvicorn workers (more robust for production):
# CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "-c", "gunicorn_conf.py", "backend.main:app"]
# (This would require a gunicorn_conf.py and gunicorn in requirements.txt)

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
