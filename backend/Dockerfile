FROM rust:1.56 as builder

WORKDIR /usr/src/app
COPY . .

RUN apt-get update && apt-get install -y libmysqlclient-dev
RUN cargo build --release

FROM debian:buster-slim
COPY --from=builder /usr/src/app/target/release/my_rust_project /usr/local/bin/my_rust_project

CMD ["my_rust_project"]
