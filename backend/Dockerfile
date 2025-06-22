FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5001
# CMD to run the FastAPI application with Uvicorn
# Uvicorn will listen on port 5001 inside the container.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5001"]
