variable "workspace_to_environment_map" {
  type = map(string)
  default = {
    dev = "dev"
    prod    = "production"
  }
}
