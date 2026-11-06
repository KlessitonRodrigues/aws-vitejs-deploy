export const stackName = 'website-stack';

export const resources = {
  stackName,
  nameCloudFront: `${stackName}-cloudfront`,
  nameBucket: `${stackName}-bucket`,
  nameOriginAccessIdentity: `${stackName}-origin-access-identity`,
  nameBucketDeployment: `${stackName}-bucket-deployment`,
} as const;
