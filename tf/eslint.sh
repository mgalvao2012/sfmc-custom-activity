#!/usr/bin/env bash
node_modules/.bin/eslint --quiet \
    --max-warnings 100 \
    -o eslint-output.$1 \
    -f $1 '*/**/*.{js,ts,tsx}' 