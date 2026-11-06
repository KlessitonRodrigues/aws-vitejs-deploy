import * as cdk from 'aws-cdk-lib';
import * as cloudFront from 'aws-cdk-lib/aws-cloudfront';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface CloudFrontDistributionProps {
  bucket: s3.Bucket;
  originAccessIdentity: cloudFront.OriginAccessIdentity;
}

export function createCloudFrontDistribution(
  scope: Construct,
  id: string,
  props: CloudFrontDistributionProps,
): cloudFront.CloudFrontWebDistribution {
  return new cloudFront.CloudFrontWebDistribution(scope, id, {
    defaultRootObject: 'index.html',
    errorConfigurations: [
      {
        errorCode: 404,
        responseCode: 200,
        responsePagePath: '/index.html',
      },
    ],
    originConfigs: [
      {
        s3OriginSource: {
          s3BucketSource: props.bucket,
          originAccessIdentity: props.originAccessIdentity,
        },
        behaviors: [
          {
            isDefaultBehavior: true,
            compress: true,
            forwardedValues: {
              queryString: true,
              cookies: { forward: 'all' },
            },
          },
        ],
      },
    ],
  });
}
