#!/bin/bash
# Gemini CLI post-session hook
echo "Running format and lint fixes..."
pnpm run format
pnpm run lint:fix
echo "Auto-fixes completed successfully."
