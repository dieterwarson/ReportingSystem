FROM ubuntu:latest
# install git and nodejs
RUN apt-get update && apt-get install -y curl git-core && \
curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
apt-get install -y nodejs
RUN npm install -g yarn

# download our code and install dependencies using npm
RUN git clone --depth 1 https://github.com/dieterwarson/ReportingSystem.git /srv/psopv-2020-groep1
RUN cd /srv/psopv-2020-groep1/ReportingSystem/reportingsystemVue && npm install
RUN yarn build --dest ../reportingsystemExpress/src/public && cd -
RUN cd /srv/psopv-2020-groep1/ReportingSystem/reportingsystemExpress && npm install

# run the servers
RUN chmod +x /srv/psopv-2020-groep1/ReportingSystem/startServer.sh
WORKDIR /srv/psopv-2020-groep1/ReportingSystem
CMD ./startServer.sh

