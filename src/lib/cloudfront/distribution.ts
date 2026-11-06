import * as cloudFront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
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
): cloudFront.Distribution {
  const cachePolicy = new cloudFront.CachePolicy(scope, `${id}CachePolicy`, {
    queryStringBehavior: cloudFront.CacheQueryStringBehavior.all(),
    cookieBehavior: cloudFront.CacheCookieBehavior.all(),
  });

  return new cloudFront.Distribution(scope, id, {
    defaultRootObject: 'index.html',
    errorResponses: [
      {
        httpStatus: 404,
        responseHttpStatus: 200,
        responsePagePath: '/index.html',
      },
    ],
    defaultBehavior: {
      origin: origins.S3BucketOrigin.withOriginAccessIdentity(props.bucket, {
        originAccessIdentity: props.originAccessIdentity,
      }),
      compress: true,
      cachePolicy,
    },
  });
}
