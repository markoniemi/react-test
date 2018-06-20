#!/bin.sh
# https://gist.github.com/bogdanRada/e5d0a7a3a649cbb363f0237e67b5169c
install_docker_compose() {

DOCKER_COMPOSE_VERSION=1.21.2

# Download docker-compose to the permanent storage
echo 'Downloading docker-compose to the permanent VM storage...'
sudo mkdir -p /var/lib/boot2docker/bin
sudo curl -sL https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-`uname -s`-`uname -m` -o /var/lib/boot2docker/bin/docker-compose
sudo chmod +x /var/lib/boot2docker/bin/docker-compose
sudo ln -sf /var/lib/boot2docker/bin/docker-compose /usr/local/bin/docker-compose

# Making the symlink persistent via bootlocal.sh
echo 'Writing to bootlocal.sh to make docker-compose available on every boot...'
cat <<SCRIPT | sudo tee -a /var/lib/boot2docker/bootlocal.sh > /dev/null
# docker-compose
sudo ln -sf /var/lib/boot2docker/bin/docker-compose /usr/local/bin/docker-compose
SCRIPT
sudo chmod +x /var/lib/boot2docker/bootlocal.sh

echo 'Launching docker-compose...'
docker-compose --version
}
