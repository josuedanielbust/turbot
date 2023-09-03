# Build arguments
ARG GO_VERSION=1.21.0
ARG ARG_PORT=3001
ARG PG_USER
ARG PG_PASS
ARG PG_HOST
ARG DATABASE_TEMPLATE="postgres://${PG_USER}:${PG_PASS}@${PG_HOST}:5432/todo?sslmode=disable"

# Build stage
FROM golang:${GO_VERSION}-alpine AS builder
# Build arguments and Environment variables
ARG ARG_PORT
ENV PORT=${ARG_PORT}
# Install build dependencies
RUN go env -w GOPROXY=direct
RUN apk add --no-cache git
RUN apk --no-cache add ca-certificates && update-ca-certificates
# Create workdir
WORKDIR /go/src/
# Copy and download dependency using go mod
COPY ./go.mod ./go.sum ./
RUN go mod download
COPY . .
# Build the Go app
RUN go build -o /back


# Final stage
FROM scratch AS final
# Build arguments
ARG ARG_PORT
ARG DATABASE_TEMPLATE
# Set necessary environmet variables
ENV PORT=${ARG_PORT}
ENV DATABASE_URL=${DATABASE_TEMPLATE}
# Copy our static executable and certs
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY .env ./
COPY --from=builder /back /back
# Expose port to the outside world
EXPOSE $PORT
# Command to run the executable
ENTRYPOINT ["/back", "-dev=false"]
