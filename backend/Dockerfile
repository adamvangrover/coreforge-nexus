FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5001
# For production, Gunicorn is recommended. Example:
# CMD ["gunicorn", "--bind", "0.0.0.0:5001", "agent:app"]
# For development, Flask's built-in server can be used:
CMD ["python", "agent.py"]
