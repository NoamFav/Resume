FROM rust:latest AS builder

WORKDIR /usr/src/app
COPY . .

RUN apt-get update && apt-get install -y libmariadb-dev
RUN cargo build --release

FROM debian:buster-slim
COPY --from=builder /usr/src/app/target/release/my_resume /usr/local/bin/my_resume

CMD ["my_resume"]
