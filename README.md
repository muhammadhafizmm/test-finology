# test-finology

React + Vite + Chakra UI + TypeScript deployed to AWS using **SST StaticSite**.  
Purpose: **Assignment Test for Finology**.

---

## 🚀 Tech Stack
- **Frontend:** Vite, React 18, Chakra UI, TypeScript  
- **Infra & Deployment:** SST → S3 + CloudFront + Route 53  
- **Package Manager:** pnpm

---

## 📋 Prerequisites
- Node.js **18+**
- [pnpm](https://pnpm.io/) installed
- AWS credentials (SSO or access keys) with permissions to create:
  - S3
  - CloudFront
  - Route53
  - ACM (certificate)
- Domain hosted in Route 53
- ACM certificate in **us-east-1** (must be in *Issued* state)

---

## 🛠️ Getting Started

### 1. Install dependencies
```bash
pnpm install
```

### 2. Run locally
```bash
pnpm dev
```
App will start at [http://localhost:5173](http://localhost:5173).

### 3. Build for production
```bash
pnpm build
```

---

## 🌍 Deployment (SST)

### Local / CLI
```bash
pnpm sst:deploy --stage dev
```

### Required Environment Variables
Create a `.env` file (or set via CI/CD environment secrets):

```env
# ACM certificate (must be in us-east-1 and in ISSUED state)
CERT_ARN=arn:aws:acm:us-east-1:123456789012:certificate/xxxxxx

# Hosted zone ID from Route 53
HOSTED_ZONE=Z123456ABCDEFG
```

---

## ⚙️ SST Config (snippet)

```ts
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "test-finology",
      home: "aws",
    };
  },
  async run() {
    new sst.aws.StaticSite("Web", {
      build: {
        command: "pnpm run build",
        output: "dist",
      },
      domain: {
        name: `${YOUR_DOMAIN}`,
        dns: sst.aws.dns({
          zone: process.env.HOSTED_ZONE!,
        }),
        cert: process.env.CERT_ARN!,
      }
    });
  },
});
```

---

## 📜 Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "sst:deploy": "npx sst deploy"
  }
}
```

---

## 📂 Project Structure

```
src/
  ├── assets/              # Static assets
  ├── components/          # Reusable UI components
  │   └── ui/              # Chakra UI Starter
  ├── constant/            # App constants
  ├── hooks/               # Custom React hooks
  ├── types/               # TypeScript types
  ├── utils/               # Utility functions
  ├── App.tsx              # Root app component
  └── main.tsx             # Entry point
```

---

## ✨ Features & Testing

This project implements **loading**, **empty state**, **error state**, and **happy flow** for fetching all users.  

You can manually reproduce each state:

- **Loading State** → Simulate a network throttling by using your browser DevTools:
  1. Open **Network tab**  
  2. Click throttling dropdown → **Select 3G**
  3. Refresh → You will see the loading state.

- **Error State** → Simulate a blocked API by using your browser DevTools:
  1. Open **Network tab**  
  2. Right-click the API request → **Block request URL**  
  3. Refresh → You will see the error state.

- **Empty State** → Use the search input and enter a query that doesn’t exist (e.g., `xxxx`).  
  This will show the empty results UI.

- **Happy Flow** → Default behavior when fetching users successfully.

---
