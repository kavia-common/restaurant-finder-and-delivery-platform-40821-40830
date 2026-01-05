#!/bin/bash
cd /home/kavia/workspace/code-generation/restaurant-finder-and-delivery-platform-40821-40830/frontend_react_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

