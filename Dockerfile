FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive
# install git and nodejs
RUN apt-get update && apt-get install -y curl git-core && \
curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
apt-get install -y nodejs
RUN npm install -g yarn

# download our code and install dependencies using npm
RUN git clone --depth 1 https://github.com/dieterwarson/ReportingSystem.git /srv/psopv-2020-groep1
WORKDIR /srv/psopv-2020-groep1/ReportingSystem
RUN cd /srv/psopv-2020-groep1/ReportingSystem/reportingsystemVue && npm install && yarn build --dest ../reportingsystemExpress/src/public && cd -
RUN cd /srv/psopv-2020-groep1/ReportingSystem/reportingsystemExpress && npm install
# fixes problem mysql-server not starting on Windows due to CRLF characters
RUN  apt-get update && apt-get install -y dos2unix && dos2unix startServerDev.sh

# install mysql server with default password, start it and insert testdata
RUN apt-key update && apt-get update

RUN echo 'mysql-server mysql-server/root_password password mysqlroot' | debconf-set-selections
RUN echo 'mysql-server mysql-server/root_password_again password mysqlroot' | debconf-set-selections

RUN apt-get install -y mysql-server

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir /node_modules
RUN npm i puppeteer \
    # Add user so we don't need --no-sandbox.
    # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
    && groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /node_modules



# run the servers
RUN chmod +x startServer.sh
CMD ./startServer.sh

