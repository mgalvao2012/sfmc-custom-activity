#!/usr/bin/env bash
./tf/terraform $1 $2 \
    -no-color \
    -compact-warnings \
    -input=false \
    -var "HEROKU_EMAIL=$HEROKU_CREDENTIALS_USR" \
    -var "HEROKU_API_KEY=$HEROKU_CREDENTIALS_PSW" \
    -var "HEROKU_APP_NAME=$HEROKU_APP_NAME" \
    -var "HEROKU_ORG_NAME=$HEROKU_ORG_NAME" \
    -var "HEROKU_STACK=$HEROKU_STACK" \
    -var "HEROKU_REGION=$HEROKU_REGION" \
    -var "HEROKU_FORMATION_TYPE=$HEROKU_FORMATION_TYPE" \
    -var "HEROKU_FORMATION_QTY=$HEROKU_FORMATION_QTY" \
    -var "HEROKU_FORMATION_SIZE=$HEROKU_FORMATION_SIZE" \
    -var "AUTH_URL=$AUTH_URL" \
    -var "FRUSQ=$FRUSQ" \
    -var "REDIS_URL=$REDIS_URL" \
    -var "CLIENT_SECRET=$CLIENT_SECRET" \
    -var "REDIRECT_URI=$REDIRECT_URI" \
    -var "NODE_ENV=${NODE_ENV}" \
    -var "SOURCE_PATH=$SOURCE_PATH" \
    ./tf/
