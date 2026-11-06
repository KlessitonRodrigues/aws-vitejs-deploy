import * as cdk from 'aws-cdk-lib';
import * as cloudFront from 'aws-cdk-lib/aws-cloudfront';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';

import { createS3Bucket } from './lib/s3/bucket';
import { createCloudFrontDistribution } from './lib/cloudfront/distribution';
import { paths } from './constants/paths';
import { resources } from './constants/resources';

export class WebAppStack extends cdk.Stack {
  constructor(scope: cdk.App, props?: cdk.StackProps) {
    super(scope, resources.stackName, props);

    const distBucket = createS3Bucket(this, resources.nameBucket);

    const distOrigin = new cloudFront.OriginAccessIdentity(this, resources.nameOriginAccessIdentity);
    distBucket.grantRead(distOrigin);

    const distribution = createCloudFrontDistribution(this, resources.nameCloudFront, {
      bucket: distBucket,
      originAccessIdentity: distOrigin,
    });

    new s3Deploy.BucketDeployment(this, resources.nameBucketDeployment, {
      sources: [s3Deploy.Source.asset(paths.profilePagePath)],
      destinationBucket: distBucket,
      distribution,
    });
  }
}

const app = new cdk.App();
new WebAppStack(app);
