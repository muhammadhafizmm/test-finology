# test-finology

React + Vite + TypeScript deployed to AWS using **SST StaticSite**.  
Purpose: **Assignment Test for Finology**.

## Tech Stack
- Vite
- React 18, TypeScript
- SST (Ion) – StaticSite → S3 + CloudFront, Route 53

## Prerequisites
- Node 18+ and pnpm
- AWS credentials (SSO or access keys) with permissions to create S3/CloudFront/Route53/ACM
- A domain in Route 53 and an ACM certificate in **us-east-1** if you want a custom domain

## Getting Started
Run Locally:

```bash
pnpm install
pnpm dev
```

Build:

```bash
pnpm build
```

## Deploy (SST)

Local/CLI:

```bash
pnpm sst:deploy --stage dev
```

### Required env (examples)
Create `.env` (or set via CI/CD environment secrets):

```
# use an existing ACM & hosted zone (must be in us-east-1 and ISSUED)
HOSTED_ZONE=...
CERT_ARN=arn:aws:acm:us-east-1:...:certificate/...
```


### SST Config (snippet)
```ts
/// <reference path="./.sst/platform/config.d.ts" />

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

```

## Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "sst:deploy": "npx sst deploy",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
}
```
