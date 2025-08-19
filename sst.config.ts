// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

import * as dotenv from "dotenv";
dotenv.config();

export default $config({
  app(input) {
    return {
      name: "martinsmovies",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Nextjs("MyWeb", {
      environment: {
        TMDB_BEARER_TOKEN: process.env.TMDB_BEARER_TOKEN!,
      },
    });
  },
});
