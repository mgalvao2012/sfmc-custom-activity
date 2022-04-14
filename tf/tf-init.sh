#!/usr/bin/env bash
./tf/terraform init \
    -no-color \
    -input=false \
    -backend-config="token=$TFE_CREDENTIALS" \
    -var "SOURCE_PATH=$SOURCE_PATH" \
    ./tf/