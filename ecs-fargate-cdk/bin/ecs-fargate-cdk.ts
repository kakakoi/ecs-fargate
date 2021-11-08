#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { EcsFargateStack } from '../lib/ecs-fargate-stack';
import { NetworkStack } from '../lib/network-stack';
import { RdsStack } from '../lib/rds-stack';

const app = new cdk.App();

const networkStack = new NetworkStack(app, 'NetworkStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

const rdsStack = new RdsStack(app, 'RdsStack', {
  vpc: networkStack.vpc,
  bastionSecurityGroup: networkStack.bastionSecurityGroup,
  dbIngressSecurityGroup: networkStack.dbIngressSecurityGroup,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});

const ecsStack = new EcsFargateStack(app, 'EcsFargateStack', {
  vpc: networkStack.vpc,
  rdsCredentials: rdsStack.rdsCredentials,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});