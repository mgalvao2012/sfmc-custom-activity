
# outputs para resource "heroku_app" "this" 
output "output_heroku_app_web_url" {
  value = heroku_app.this.web_url
}

output "output_heroku_app_heroku_hostname" {
  value = heroku_app.this.heroku_hostname
}

output "output_heroku_app_all_config_vars" {
  value = heroku_app.this.all_config_vars
}

output "output_heroku_app_id" {
  value = heroku_app.this.id
}

output "output_heroku_app_uuid" {
  value = heroku_app.this.uuid
}

output "output_heroku_app_name" {
  value = heroku_app.this.name
}

output "output_heroku_app_stack" {
  value = heroku_app.this.stack
}

output "output_heroku_app_region" {
  value = heroku_app.this.region
}

# outputs para resource "heroku_build" "this" 
output "output_heroku_build_uuid" {
  value = heroku_build.this.uuid
}

output "output_heroku_build_output_stream_url" {
  value = heroku_build.this.output_stream_url
}

output "output_heroku_build_release_id" {
  value = heroku_build.this.release_id
}

output "output_heroku_build_slug_id" {
  value = heroku_build.this.slug_id
}

output "output_heroku_build_stack" {
  value = heroku_build.this.stack
}

output "output_heroku_build_status" {
  value = heroku_build.this.status
}

# outputs para resource "heroku_formation" "this" 
output "output_heroku_formation_id" {
  value = heroku_formation.this.id
}
