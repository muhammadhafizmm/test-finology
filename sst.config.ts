/// <reference path="./.sst/platform/config.d.ts" />

/**
 * ## React SPA with Vite
 *
 * Deploy a React single-page app (SPA) with Vite to S3 and CloudFront.
 */
export default $config({
  app(input) {
    return {
      name: "test-finology",
      home: "aws",
      removal: "remove",
    };
  },
  async run() {
    new sst.aws.StaticSite("Web", {
      build: {
        command: "pnpm run build",
        output: "dist",
      },
      domain: {
        name: `test-finology.muhammadhafizm.com`,
        dns: sst.aws.dns({
          zone: process.env.HOSTED_ZONE!,
        }),
        cert: process.env.CERT_ARN!,
      }
    });
  },
});
