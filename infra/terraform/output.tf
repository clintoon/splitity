output "splitity_redis_cluster_password" {
  value = "${digitalocean_database_cluster.splitity-postgres-cluster.password}",
  sensitive   = true
}

output "splitity_redis_cluster_password" {
  value = "${digitalocean_database_cluster.splitity-redis-cluster.password}",
  sensitive   = true
}
