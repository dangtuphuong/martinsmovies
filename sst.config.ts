import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "nextjs-lambda-app",
      region: "ap-southeast-2", // Sydney, Australia
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        // Direct environment variables (simple approach)
        environment: {
          NODE_ENV: app.stage === "production" ? "production" : "development",
          TMDB_BEARER_TOKEN: process.env.TMDB_BEARER_TOKEN || "",
        },

        // Lambda function configuration
        server: {
          runtime: "nodejs18.x",
          memorySize: 128,
          timeout: "10 seconds",
        },

        buildCommand: "npm run build",

        // Optimize for minimal CloudFront usage
        cdk: { distribution: { priceClass: "PriceClass_100" } },
      });

      stack.addOutputs({ SiteUrl: site.url });
    });
  },
} satisfies SSTConfig;
