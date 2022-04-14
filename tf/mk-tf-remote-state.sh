#!/usr/bin/env bash

# mk-remote-state-tf-dev.sh
# Generates a file named ./tf/remote-state.tf 
# to store the Terraform State about Heroku App Creation 
# 

cat << EOF > ./tf/remote-state.tf
terraform {
  backend "remote" {
    hostname = "app.terraform.io"   #For SaaS use "app.terraform.io"
    organization = "${TFE_ORG_NAME}"
    
    // remember to set Execution Mode to Local on the Terraform Dashboard
    workspaces {
      name = "${TFE_WS_NAME}"
    }
  }
}
EOF