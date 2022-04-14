variable "TFE_TOKEN" {
  type        = string
  description = "Terraform Enterprise Access Token"
  default     = ""
}

variable "HEROKU_EMAIL" {
  type        = string
  description = "The email account for Llogin on Heroku"
  default     = ""
}

variable "HEROKU_API_KEY" {
  type        = string
  description = "API key for Heroku"
  default     = ""
}

variable "HEROKU_APP_NAME" {
  type        = string
  description = "Name of the Heroku app to be provisioned"
  default     = ""
}

variable "HEROKU_ORG_NAME" {
  type        = string
  description = "Team (antigamente Organization) no Heroku"
  default     = ""
}

variable "HEROKU_STACK" {
  type        = string
  description = "Versao do Heroku Stack"
  default     = ""
}

variable "HEROKU_REGION" {
  type        = string
  description = "Nome da Regiao Heroku"
  default     = ""
}
variable "HEROKU_FORMATION_TYPE" {
  type        = string
  description = "Tipo da formacao do Heroku. Default: web"
  default     = ""
}

variable "HEROKU_FORMATION_QTY" {
  type        = string
  description = "Quantidade de Dynos"
  default     = ""
}

variable "HEROKU_FORMATION_SIZE" {
  type        = string
  description = "Tamanho do Dyno: private-s, private-m, private-l"
  default     = ""
}

variable "AUTH_URL" {
  type        = string
  description = "URL do Auth Provider"
  default     = ""
}

variable "FRUSQ" {
  type        = string
  description = "frente uc squad"
  default     = ""
}

variable "REDIS_URL" {
  type        = string
  description = "URL da instancia do redis"
  default     = ""
}

variable "CLIENT_SECRET" {
  type        = string
  description = "Secret do cliente"
  default     = ""
}

variable "REDIRECT_URI" {
  type        = string
  description = ""
  default     = ""
}

variable "NODE_ENV" {
  type        = string
  description = "Token"
  default     = ""
}

variable "SOURCE_PATH" {
  type        = string
  description = "App code URL"
  default     = ""
}

