# Build Stage
FROM rust AS build

RUN USER=root cargo new --bin edible
WORKDIR /edible

COPY ./Cargo.lock ./Cargo.lock
COPY ./Cargo.toml ./Cargo.toml

RUN cargo build --release
RUN rm src/*.rs

COPY ./src ./src
COPY ./templates ./templates

RUN rm ./target/release/deps/edible*
RUN cargo build --release

# Bundle Stage
FROM rust

WORKDIR /edible
COPY --from=build /edible/target/release/edible .
COPY ./assets ./assets
COPY ./config ./config
COPY ./templates ./templates

ENV FRUGAL_SERVER__PORT=80

ENTRYPOINT ["./edible"]
