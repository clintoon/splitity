FROM ruby:2.7.0-slim

WORKDIR /backend

COPY backend/ /backend/

RUN apt-get update

# nokogiri
RUN apt-get install -y libxml2-dev libxslt1-dev

# Rugged
RUN apt-get -y install cmake
RUN apt-get install -y pkg-config
RUN apt-get install -y git

RUN apt-get install -y libsqlite3-dev
RUN apt-get install -y libpq-dev

RUN gem install bundler:2.1.4
RUN bundle install

EXPOSE 3000

CMD rails s
