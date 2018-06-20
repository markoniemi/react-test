#!/bin.sh
source /vagrant/vagrant/install-docker-compose.sh
source /vagrant/vagrant/disable-docker-tls.sh

provision() {
  install_docker_compose
  disable_docker_tls
}
