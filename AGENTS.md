# AGENTS.md

File convention: <parent_folder>.<file_name>.ts
Keep agents.md and readme.md update on change project structure
Commit small changes using "feat/update/fix/refactor/remove:"
Push commits is always manual
Use src/constants for variables
Use src/utils for utilitare code

## Project Overview

This project is an AWS CDK application that deploys a Vite.js static website to an S3 bucket served via Amazon CloudFront (Origin Access Identity). It provisions a `WebAppStack` named `ProfileWebsiteStack`.

## Technologies

- **Runtime**: Node.js
- **Language**: TypeScript (~6.0.3)
- **Framework**: AWS CDK v2 (`aws-cdk-lib` ^2.261.0, `constructs` ^10.5.1)
- **TS execution**: ts-node (via `cdk.json` app entry)
- **Package manager**: Yarn
- **Formatting**: Prettier with `@trivago/prettier-plugin-sort-imports`

## Project Structure

```
aws-vitejs-deploy-service/
├── AGENTS.md
├── .gitignore
├── .prettierrc
├── cdk.json              # CDK app entry: `npx ts-node --prefer-ts-exts src/main.ts`
├── package.json          # aws-vitejs-deploy v1.0.0
├── tsconfig.json         # ES2020 target, CommonJS module, strict mode
├── yarn.lock
├── src/
│   ├── main.ts      # CDK stack definition & app entrypoint
│   ├── constants/
│   │   ├── constants.paths.ts      # Path variables (profilePagePath)
│   │   └── constants.resources.ts  # Resource name constants
│   └── lib/
│       ├── s3/
│       │   └── s3.bucket.ts # S3 bucket construct
│       └── cloudfront/
│           └── cloudfront.distribution.ts # CloudFront distribution construct
├── cdk.out/              # Synthesized CDK output (gitignored)
└── node_modules/         # Installed dependencies (gitignored)
```

## Key Files

### `src/main.ts`
Defines `WebAppStack` (stack id `ProfileWebsiteStack`):
- **S3 Bucket** (`ProfileWebsite`) — `autoDeleteObjects: true`, `removalPolicy: DESTROY`
- **CloudFront Origin Access Identity** — grants S3 read access
- **CloudFront WebDistribution** (`ProfileWebsiteDist`) — `defaultRootObject: index.html`, 404 → `/index.html` SPA fallback, default behavior compresses and forwards query strings + all cookies
- **BucketDeployment** (`ProfileWebsiteBucket`) — deploys assets from `../../apps/vite-profile-page/dist` to the bucket, invalidates the distribution

### `src/constants/constants.paths.ts`
Path variables exported as `paths` object:
- `paths.profilePagePath` — resolves to `../../apps/vite-profile-page/dist` relative to the constants file

### `src/constants/constants.resources.ts`
Resource name constants exported as `resources` object:
- `resources.stackName` — `ProfileWebsiteStack`
- `resources.nameCloudFront` — `ProfileWebsiteDist`
- `resources.nameBucket` — `ProfileWebsite`
- `resources.nameOriginAccessIdentity` — `ProfileWebsiteOrigin`
- `resources.nameBucketDeployment` — `ProfileWebsiteBucket`

### `src/lib/s3/s3.bucket.ts`
`createS3Bucket(scope, id, props?)` — creates an S3 bucket with `autoDeleteObjects: true` and `removalPolicy: DESTROY`.

### `src/lib/cloudfront/cloudfront.distribution.ts`
`createCloudFrontDistribution(scope, id, props)` — creates a CloudFront WebDistribution with SPA fallback and default compressed behavior.

### `cdk.json`
App command: `npx ts-node --prefer-ts-exts src/main.ts`

### `tsconfig.json`
Target ES2020, CommonJS modules, strict type checking, `types: ["node"]`, excludes `node_modules`, `cdk.out`, `dist`.

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `cdk-synt` | `cdk synthesize` | Synthesize the CDK stack |
| `cdk-deploy` | `cdk deploy` | Deploy the stack to AWS |

## Conventions

- Prettier: 2-space indent, single quotes, semicolons, print width 100, arrow parens avoided
- Import ordering enforced via `@trivago/prettier-plugin-sort-imports`
- Gitignored: `node_modules/`, `cdk.out/`
