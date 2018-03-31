FROM ruby:2.4
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev imagemagick
RUN mkdir /myapp
WORKDIR /myapp
RUN apt-get update && apt-get install -y wget
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.2.0/dockerize-linux-amd64-v0.2.0.tar.gz
RUN tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.2.0.tar.gz
RUN apt-get update && apt-get install -y nodejs --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y mysql-client postgresql-client sqlite3 --no-install-recommends && rm -rf /var/lib/apt/lists/*
ADD config/database.yml config/database.yml
ADD config/secrets.yml config/secrets.yml
ENV RAILS_ENV development
ADD . /myapp