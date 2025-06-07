FROM golang:1.23-alpine3.19

WORKDIR /app

# Install required packages
RUN apk add --no-cache gcc musl-dev

# Copy go mod and sum files first
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the application
COPY . .

# Build the application
RUN go build -o main ./cmd/api

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["./main"]