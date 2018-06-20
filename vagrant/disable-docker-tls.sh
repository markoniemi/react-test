disable_docker_tls() {
  echo "Disable docker TLS checking."
  sudo -i
  echo "DOCKER_TLS=no" >> /var/lib/boot2docker/profile
  /etc/init.d/docker restart
}
