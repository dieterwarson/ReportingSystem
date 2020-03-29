FROM ubuntu:latest
# install git and nodejs
RUN apt-get update && apt-get install -y curl git-core && \
curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
apt-get install -y nodejs

# download our code and install dependencies using npm
RUN git clone --depth 1 https://dieter.warson:***REMOVED***@didactiek-scm.edm.uhasselt.be:8181/scm/git/psopv-2020-groep1 /srv/psopv-2020-groep1
RUN cd /srv/psopv-2020-groep1/ReportingSystem/reportingsystemVue && npm install && cd ../..
RUN cd /srv/psopv-2020-groep1/ReportingSystem/reportingsystemExpress && npm install

# run the servers
CMD ["./ReportingSystem/startServer.sh"]

