locals {
  environment = "${lookup(var.workspace_to_environment_map, terraform.workspace, "dev")}"
}

provider "digitalocean" {
}

resource "digitalocean_kubernetes_cluster" "splitity-k8s-cluster" {
  name    = "${local.environment}-web-k8s-cluster"
  region  = "nyc1"
  version = "1.16.2-do.3"

  node_pool {
    name       = "autoscale-worker-pool"
    size       = "s-1vcpu-1gb"
    auto_scale = true
    min_nodes  = 1
    max_nodes  = 5
  }

  tags = ["splitity", "${local.environment}"]
}

resource "digitalocean_database_cluster" "postgres-cluster" {
  name       = "${local.environment}-postgres-cluster"
  engine     = "pg"
  version    = "12"
  size       = "db-s-1vcpu-1gb"
  region     = "nyc1"
  node_count = 1

  tags = ["splitity", "${local.environment}"]
}

resource "digitalocean_database_cluster" "redis-cluster" {
  name       = "${local.environment}-redis-cluster"
  engine     = "redis"
  size       = "db-s-1vcpu-1gb"
  region     = "nyc1"
  node_count = 1

  tags = ["splitity", "${local.environment}"]
}
