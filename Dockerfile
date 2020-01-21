##########################################################################
# Base image begin
##########################################################################
# This is the default base image
FROM ubuntu:18.04

##########################################################################
# Base image end
##########################################################################



##########################################################################
# ENV VAR begin
##########################################################################
ARG RAILS_ENV=development
ENV DEBIAN_FRONTEND noninteractive
##########################################################################
# ENV VAR end
##########################################################################



##########################################################################
# Install core dependencies begin
##########################################################################
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get -y dist-upgrade

RUN apt-get install -y sudo wget curl cron htop ntp nano unzip

RUN apt-get install -y \
    git-core nodejs mysql-client \
    libsqlite3-dev \
    build-essential libpq-dev zlib1g-dev libxml2-dev \
    libxslt-dev libpcre3 libpcre3-dev uuid-dev iputils-ping
##########################################################################
# Install core dependencies end
##########################################################################



##########################################################################
# Install ubuntu dependencies begin
##########################################################################
# Only enable following if install using ubuntu
RUN apt-get install -y software-properties-common
RUN apt-add-repository ppa:brightbox/ruby-ng
RUN apt-get update -qq
RUN apt-get install -y net-tools nscd
RUN apt-get install -y libmysqlclient-dev
RUN apt-get install -y ruby2.5 ruby2.5-dev
##########################################################################
# Install ubuntu dependencies end
##########################################################################



##########################################################################
# Setup app dependencies begin
##########################################################################
# set current dir
WORKDIR /app/ABT-server
ENV PWD /app/ABT-server

# install minimim bundler
RUN gem install bundler -v 2.0.1
RUN gem install rake -v 12.3.2

# copy src code
COPY . /app/ABT-server

# bundle
RUN bundle install
##########################################################################
# Setup app dependencies end
##########################################################################



##########################################################################
# Starting commands begin
##########################################################################
# start null service
CMD ["tail", "-f", "/dev/null"]

# start web service
# CMD ["rails", "s", "-p", "3000"]
##########################################################################
# Starting commands end
##########################################################################

