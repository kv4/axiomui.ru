module.exports = {
  apps: [
    {
      name: "telegram-bot",
      script: "telegram/index.js",
      env: {
        NODE_OPTIONS: "--use-openssl-ca",
        NODE_EXTRA_CA_CERTS: "/etc/ssl/certs/ca-certificates.crt",
      },
    },
    {
      name: "max-bot",
      script: "max/index.js",
      env: {
        NODE_OPTIONS: "--use-openssl-ca",
        NODE_EXTRA_CA_CERTS: "/etc/ssl/certs/ca-certificates.crt",
      },
    },
  ],
};
