import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam'
import * as ecsp from '@aws-cdk/aws-ecs-patterns';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecr from '@aws-cdk/aws-ecr';

import { TaskDefinition } from '@aws-cdk/aws-ecs';
import { SubnetType } from '@aws-cdk/aws-ec2';

export class NetworkStack extends cdk.Stack {
  public vpc: ec2.Vpc
  public bastionSecurityGroup: ec2.SecurityGroup
  public dbIngressSecurityGroup: ec2.SecurityGroup

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ステージごとの切り替え
    const stage: string | undefined = this.node.tryGetContext('stage')
    if (stage !== 'staging' && stage !== 'production')
      throw Error(`invalid stage: ${stage}`)

    this.vpc = new ec2.Vpc(this, 'VPC', { 
        natGateways: 0,
        subnetConfiguration: [
          { cidrMask: 24, subnetType: ec2.SubnetType.PUBLIC, name: 'ingress' }
        ] });

    // 踏み台ホストためのセキュリティグループ
    this.bastionSecurityGroup = new ec2.SecurityGroup(this, "bastionSg", {
      securityGroupName: createResourceName(scope, 'bastion-sg'),
      vpc: this.vpc
    });

    // RDSに接続するためのセキュリティグループ
    this.dbIngressSecurityGroup = new ec2.SecurityGroup(this, "dbIngressSg", {
      securityGroupName: createResourceName(scope, 'db-ingress-sg'),
      vpc: this.vpc
    });
  }
}

function createResourceName(scope: cdk.Construct, originalName: string): string {
  const systemName = scope.node.tryGetContext('systemName');
  const envType = scope.node.tryGetContext('envType');
  const resourceNamePrefix = `${systemName}-${envType}-`;

  return `${resourceNamePrefix}${originalName}`;
}