docker run -v /vagrant:/vagrant -w /vagrant circleci/node:8-browsers google-chrome --version
docker run -v /vagrant:/vagrant -w /vagrant circleci/node:8-browsers npm test
