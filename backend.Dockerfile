FROM ruby:2.7.0-slim

WORKDIR /backend

COPY backend/ /backend/

RUN apt-get update

RUN apt-get -y install wget

# Install remote_syslog2 for papertrail
RUN wget https://github.com/papertrail/remote_syslog2/releases/download/v0.20/remote-syslog2_0.20_amd64.deb
RUN dpkg -i remote-syslog2_0.20_amd64.deb
COPY infra/logging/backend/papertrail_log_files.yml /etc/log_files.yml

# nokogiri
RUN apt-get install -y libxml2-dev libxslt1-dev
# Rugged
RUN apt-get -y install cmake
RUN apt-get install -y pkg-config
RUN apt-get install -y git
# Database clients
RUN apt-get install -y libsqlite3-dev
RUN apt-get install -y libpq-dev

RUN gem install bundler:2.1.4
RUN bundle install

EXPOSE 3000

CMD remote_syslog && rails s
