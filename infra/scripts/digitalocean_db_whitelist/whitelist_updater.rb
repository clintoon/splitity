#!/usr/bin/env ruby
# frozen_string_literal: true

require 'rubygems'
require 'commander/import'
require 'http'
require 'droplet_kit'

program :name, 'whitelist_updater'
program :version, '0.0.1'
program :description, 'Updates the digitalocean postgres whitelist'

def my_ip_addr
  HTTP.get('https://checkip.amazonaws.com/').to_s.strip
end

def database_cluster_id(do_client, db_name)
  clusters = do_client.databases.all_clusters

  selected_dbs = clusters.filter do |db_cluster|
    db_cluster.name == db_name
  end

  abort('Unable to find db_name') if selected_dbs.empty?

  selected_dbs[0].id
end

def list_ip_whitelist(do_client, id:)
  do_client.databases.list_firewall_rules(id: id).map do |rule|
    DropletKit::DatabaseFirewallRule.new(type: rule.type, value: rule.value)
  end
end

def filtered_out_whitelist(whitelisted_ips, filter_out_ip)
  whitelisted_ips.filter do |rule|
    rule.value != filter_out_ip
  end
end

def print_whitelist(whitelisted_ips)
  whitelisted_ips.each do |rule|
    puts "type: #{rule.type}, value: #{rule.value}"
  end
end

command :add do |c|
  c.syntax = 'whitelist_updater add [options]'
  c.option '--access-token TOKEN', String, 'Digitalocean access token'
  c.option '--db-name NAME', String, 'Database cluster name'

  c.action do |_args, options|
    do_client = DropletKit::Client.new(access_token: options.access_token)
    db_id = database_cluster_id(do_client, options.db_name)

    whitelisted_ips = list_ip_whitelist(do_client, id: db_id)
    whitelisted_ips.push(
      DropletKit::DatabaseFirewallRule.new(type: 'ip_addr', value: my_ip_addr)
    )
    do_client.databases.set_firewall_rules(whitelisted_ips, id: db_id)

    puts 'Updated database cluster whitelist:'
    print_whitelist(whitelisted_ips)
  end
end

command :remove do |c|
  c.syntax = 'whitelist_updater remove [options]'
  c.option '--access-token TOKEN', String, 'Digitalocean access token'
  c.option '--db-name NAME', String, 'Database cluster name'

  c.action do |_args, options|
    do_client = DropletKit::Client.new(access_token: options.access_token)
    db_id = database_cluster_id(do_client, options.db_name)

    whitelisted_ips = list_ip_whitelist(do_client, id: db_id)
    whitelisted_ips = filtered_out_whitelist(whitelisted_ips, my_ip_addr)
    do_client.databases.set_firewall_rules(whitelisted_ips, id: db_id)

    puts 'Updated database cluster whitelist:'
    print_whitelist(whitelisted_ips)
  end
end
