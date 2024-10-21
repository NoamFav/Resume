# Use the latest Rust image for building
FROM rust:latest AS builder

WORKDIR /usr/src/app

# Copy the Cargo.toml and Cargo.lock files first
COPY Cargo.toml Cargo.lock ./

# Copy the src directory
COPY src ./src

# Install build dependencies
RUN apt-get update && apt-get install -y libmariadb-dev

# Build dependencies to cache them
RUN cargo build --release --bin my_resume

# Copy the rest of the source code
COPY . .

# Build the application
RUN cargo build --release --bin my_resume

# Runtime stage
FROM debian:bookworm-slim

# Install runtime dependencies
RUN apt-get update && apt-get install -y libmariadb-dev

# Copy the compiled binary from the builder stage
COPY --from=builder /usr/src/app/target/release/my_resume /usr/local/bin/my_resume

# Expose the application port
EXPOSE 8000

# Set the command to run your application
CMD ["my_resume"]
