import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam'
import * as ecsp from '@aws-cdk/aws-ecs-patterns';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecr from '@aws-cdk/aws-ecr';

import { TaskDefinition } from '@aws-cdk/aws-ecs';

export class EcsFargateCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Amazon ECRのリポジトリを指定。事前に作成してpushしておきます。
    const repository = new ecr.Repository(this, 'fargate-rds-cdk-repo-id', {
      repositoryName: "fargate-rds-cdk-repo-name",
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    // const vpc = new ec2.Vpc(this, 'VPC', { 
    //   natGateways: 0,
    //   subnetConfiguration: [
    //     { cidrMask: 24, subnetType: ec2.SubnetType.PUBLIC, name: 'ingress' }
    //   ] });
      
    // const taskIamRole = new iam.Role(this, "AppRole", {
    //   roleName: "AppRole",
    //   assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com')
    // });

    // const taskDefinition = new ecs.FargateTaskDefinition(this, 'Task', {
    //   taskRole: taskIamRole,
    // })

    // taskDefinition.addContainer('MyContainer', {
    //   image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
    //   portMappings: [{ containerPort: 80}],
    //   memoryReservationMiB: 256,
    //   cpu:256,
    // })

    // const service = new ecsp.ApplicationLoadBalancedFargateService(this, 'MyWebServer', {
    //   vpc: vpc,
    //   taskDefinition: taskDefinition,
    //   desiredCount: 1,
    //   serviceName: 'MyWebApp',
    //   assignPublicIp: true,
    //   publicLoadBalancer: true
    // })
    // The code that defines your stack goes here
  }
}
