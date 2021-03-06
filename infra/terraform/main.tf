locals {
  environment = "${lookup(var.workspace_to_environment_map, terraform.workspace, "staging")}"
}

provider "digitalocean" {
}

resource "digitalocean_kubernetes_cluster" "splitity-k8s-cluster" {
  name    = "splitity-${local.environment}-k8s-cluster"
  region  = "nyc1"
  version = "1.16.6-do.0"

  node_pool {
    name       = "autoscale-worker-pool"
    size       = "s-1vcpu-2gb"
    auto_scale = true
    min_nodes  = 1
    max_nodes  = 5
  }

  tags = ["splitity-${local.environment}"]
}

resource "digitalocean_database_cluster" "splitity-postgres-cluster" {
  name       = "splitity-${local.environment}-postgres-cluster"
  engine     = "pg"
  size       = "db-s-1vcpu-1gb"
  region     = "nyc1"
  node_count = 1

  tags = ["splitity-${local.environment}"]
}

resource "digitalocean_database_cluster" "splitity-redis-cluster" {
  name       = "splitity-${local.environment}-redis-cluster"
  engine     = "redis"
  size       = "db-s-1vcpu-1gb"
  region     = "nyc1"
  version    = "5.0.6"
  node_count = 1

  tags = ["splitity-${local.environment}"]
}
