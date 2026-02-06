#!/bin/bash
echo "------------------------------------------------"
echo "OpenNezt: Running custom setup script (Unix)..."
echo "------------------------------------------------"

# Get the directory where this script is located (.opennezt folder)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Go up one level to get the project root
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Project root: $PROJECT_ROOT"

# Practical Example: Auto-create .env from .env.example
EXAMPLE_PATH="$PROJECT_ROOT/.env.example"
ENV_PATH="$PROJECT_ROOT/.env"

echo "Checking for: $EXAMPLE_PATH"

if [ -f "$EXAMPLE_PATH" ]; then
    if [ ! -f "$ENV_PATH" ]; then
        echo "Creating .env from .env.example..."
        cp "$EXAMPLE_PATH" "$ENV_PATH"
        echo "SUCCESS: .env file created"
    else
        echo "Note: .env already exists, skipping creation"
    fi
else
    echo "Warning: .env.example not found at $EXAMPLE_PATH"
fi

# Create a test file to verify the script ran
LOG_PATH="$PROJECT_ROOT/setup_test.txt"
echo "Setup script executed successfully on $(date)" > "$LOG_PATH"

echo "SUCCESS: Custom setup complete!"
echo "------------------------------------------------"
