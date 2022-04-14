terraform {
  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "4.6.0"
    }
  }
}

provider "heroku" {
  email   = var.HEROKU_EMAIL
  api_key = var.HEROKU_API_KEY
}

resource "heroku_app" "this" {
  name   = var.HEROKU_APP_NAME
  region = var.HEROKU_REGION
  stack  = var.HEROKU_STACK

  config_vars = {
    REDIS_URL       = var.REDIS_URL
    FRUSQ           = var.FRUSQ
    REDIRECT_URI    = var.REDIRECT_URI
    NODE_ENV        = var.NODE_ENV
    HEROKU_APP_NAME = var.HEROKU_APP_NAME
  }

  sensitive_config_vars = {
    CLIENT_SECRET = var.CLIENT_SECRET
  }

  organization {
    name = var.HEROKU_ORG_NAME
  }
}

# Build code & release to the app
resource "heroku_build" "this" {
  app = heroku_app.this.name
  #buildpacks = [var.BUILDPACK_URL]

  source {
    path = var.SOURCE_PATH
  }
}

resource "heroku_formation" "this" {
  app        = heroku_app.this.name
  type       = var.HEROKU_FORMATION_TYPE
  quantity   = var.HEROKU_FORMATION_QTY
  size       = var.HEROKU_FORMATION_SIZE
  depends_on = [heroku_build.this]
}
