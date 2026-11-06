import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface S3BucketProps extends s3.BucketProps {}

export function createS3Bucket(scope: Construct, id: string, props?: S3BucketProps): s3.Bucket {
  return new s3.Bucket(scope, id, {
    autoDeleteObjects: true,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    ...props,
  });
}
