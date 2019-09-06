let config = {
  host: [{
    host: process.env.ELASTICSEARCH_HOST || "localhost",
    auth: "elastic:changeme",
    protocol: "http",
    port: 9200
  }],
  log: "error"
};

if (process.env.NODE_ENV !== "development") {
  config = {
    credentials: {
      accessKeyId: process.env.ELASTICSEARCH_USERID || "",
      secretAccessKey: process.env.ELASTICSEARCH_USERSECRET || ""
    },
    aws: true,
    region: process.env.ELASTICSEARCH_REGION || "ap-southeast-2",
    host: process.env.ELASTICSEARCH_HOST || ""
  };
}

export default config;