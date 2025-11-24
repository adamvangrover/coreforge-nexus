#!/bin/bash

# setup_env.sh
# robust setup script for CoreForge Nexus environment

set -e

echo "Starting environment setup..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed."
    exit 1
fi

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "Error: Python3 is not installed."
    exit 1
fi

echo "Node version: $(node -v)"
echo "Python version: $(python3 --version)"

# Setup Backend
echo "Setting up Backend..."
cd backend

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

echo "Installing backend dependencies..."
pip install --upgrade pip
# Retrying pip install to handle intermittent failures
n=0
until [ "$n" -ge 5 ]
do
   pip install -r requirements.txt && break
   n=$((n+1))
   echo "pip install failed. Retrying... ($n/5)"
   sleep 2
done

deactivate
cd ..

# Setup Frontend
echo "Setting up Frontend..."
cd frontend

echo "Installing frontend dependencies..."
# Retrying npm install to handle intermittent failures
n=0
until [ "$n" -ge 5 ]
do
   npm install --legacy-peer-deps && break
   n=$((n+1))
   echo "npm install failed. Retrying... ($n/5)"
   sleep 5
done

cd ..

echo "Environment setup complete!"
echo "To run backend: cd backend && source venv/bin/activate && uvicorn main:app --reload"
echo "To run frontend: cd frontend && npm start"
