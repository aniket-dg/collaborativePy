# Why not alpine? Having issue with scipy related to system build packages
# gcc, libpq-dev, python3-dev are build-requirements of psycopg2 (possible requirements for other pkg also eg. pycurl, scipy)
# libcurl4-openssl-dev, libssl-dev are build-requirements for pycurl
FROM python:3.9-slim AS builder
RUN apt-get update -y && apt-get install --no-install-recommends -y \
    gcc \
    libpq-dev \
    python3-dev \
    libcurl4-openssl-dev \
    libssl-dev

ENV VIRTUAL_ENV=/opt/venv
ENV APP_HOME=/opt/app
WORKDIR ${APP_HOME}
ADD requirements.txt .

# Install project dependencies in virtual env and add venv path
RUN python -m venv ${VIRTUAL_ENV}
ENV PATH="${VIRTUAL_ENV}/bin:$PATH"
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt


# Build image for development purpose which installs all development only libraries
FROM builder AS development
RUN apt-get update -y && apt-get install --no-install-recommends -y gettext
ADD requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
