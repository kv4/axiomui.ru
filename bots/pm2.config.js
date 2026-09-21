module.exports = {
  apps: [
    {
      name: "contact",
      script: "contact/index.js",
      cwd: __dirname,
      env: {
        NODE_OPTIONS: "--use-openssl-ca",
        NODE_EXTRA_CA_CERTS: "/etc/ssl/certs/ca-certificates.crt",
      },
    },
    {
      name: "max-bot",
      script: "max/index.js",
      cwd: __dirname,
      env: {
        NODE_OPTIONS: "--use-openssl-ca",
        NODE_EXTRA_CA_CERTS: "/etc/ssl/certs/ca-certificates.crt",
      },
    },
  ],
};
