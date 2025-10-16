FROM alpine:3.20

RUN apk add --no-cache \
    bash \
    ca-certificates \
    curl \
    coreutils \
    postgresql16-client \
    rclone \
    tzdata \
 && curl -fsSL https://dl.min.io/client/mc/release/linux-amd64/mc -o /usr/local/bin/mc \
 && chmod +x /usr/local/bin/mc

COPY entrypoint.sh /entrypoint.sh
COPY backup.sh /usr/local/bin/backup.sh

RUN chmod +x /entrypoint.sh /usr/local/bin/backup.sh

ENTRYPOINT ["/entrypoint.sh"]
