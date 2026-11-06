# @services/aws-cloudfront-deploy

AWS CDK application that deploys a Vite.js static website to an S3 bucket served via Amazon CloudFront (Origin Access Identity). Provisions a `WebAppStack` named `ProfileWebsiteStack`.

## Usage as Submodule

Add this repository as a Git submodule to your parent project:

```bash
# Add submodule (adjust path as desired)
git submodule add git@github.com:KlessitonRodrigues/aws-vitejs-deploy.git aws-vitejs-deploy

# Initialize and update submodules (run in parent repo after cloning)
git submodule init
git submodule update --recursive
```

After adding, deploy from the submodule directory:

```bash
cd aws-vitejs-deploy
yarn install
yarn cdk-deploy
```

## Requirements

- Node.js
- Yarn
- AWS CLI configured with appropriate credentials
- AWS CDK CLI (`npm install -g aws-cdk`)

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `cdk-synt` | `cdk synthesize` | Synthesize the CDK stack |
| `cdk-deploy` | `cdk deploy` | Deploy the stack to AWS |

## Project Structure

```
aws-vitejs-deploy/
├── AGENTS.md
├── .gitignore
├── .prettierrc
├── cdk.json              # CDK app entry
├── package.json
├── tsconfig.json
├── yarn.lock
├── awsDeploy.ts          # CDK stack definition & app entrypoint
├── cdk.out/              # Synthesized CDK output (gitignored)
└── node_modules/         # Installed dependencies (gitignored)
```

## Notes

- Assets are sourced from `../../apps/vite-profile-page/dist` relative to `awsDeploy.ts`. Adjust `profilePagePath` in `awsDeploy.ts:7` if your Vite build output lives elsewhere.
- Stack id is `ProfileWebsiteStack`.
