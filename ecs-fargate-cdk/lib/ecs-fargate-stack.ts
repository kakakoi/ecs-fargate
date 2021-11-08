import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam'
import * as ecsp from '@aws-cdk/aws-ecs-patterns';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecr from '@aws-cdk/aws-ecr';
import * as rds from '@aws-cdk/aws-rds';

import { TaskDefinition } from '@aws-cdk/aws-ecs';
import { SubnetType } from '@aws-cdk/aws-ec2';

interface EcsFargateProps extends cdk.StackProps {
  vpc: ec2.Vpc,
  rdsCredentials: rds.Credentials,
}

export class EcsFargateStack extends cdk.Stack {
  public vpc: ec2.Vpc

  constructor(scope: cdk.Construct, id: string, props: EcsFargateProps) {
    super(scope, id, props);

    // Amazon ECRのリポジトリを指定。事前に作成してpushしておきます。
    const repository = new ecr.Repository(this, createResourceName(scope, 'ecr-id'), {
      repositoryName: createResourceName(scope, "ecr-name"),
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const taskIamRole = new iam.Role(this, createResourceName(scope, "AppRoleId"), {
      roleName: createResourceName(scope, "AppRoleName"),
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });

    const taskDefinition = new ecs.FargateTaskDefinition(this, createResourceName(scope, 'Task'), {
      taskRole: taskIamRole,
    });

    taskDefinition.addContainer(createResourceName(scope, 'container'), {
      image: ecs.ContainerImage.fromAsset('../app'),
      portMappings: [{ containerPort: 80 }],
      memoryReservationMiB: 256,
      cpu : 256,
      secrets: {

      },
      environment: {// TODO: https://dev.to/michaelfecher/i-tell-you-a-secret-provide-database-credentials-to-an-ecs-fargate-task-in-aws-cdk-5f4
        // DB_USER: props.rdsCredentials.username,
        // DB_PW: props.rdsCredentials.password,
        // NODE_ENV: "production",
        // DB_DIALECT: "postgres",
        // DB_HOST: props.rdsCredentials.,
        // DB_PORT: props.dbPort,
        // DB_NAME: props.dbName,
      },
    });

    new ecsp.ApplicationLoadBalancedFargateService(this, createResourceName(scope, "alf-id"), {
      vpc: this.vpc,
      taskDefinition: taskDefinition,
      desiredCount: 1,
      serviceName: createResourceName(scope, 'service'),
      assignPublicIp: true,
      publicLoadBalancer: true,
    })

  }
}

function createResourceName(scope: cdk.Construct, originalName: string): string {
  const systemName = scope.node.tryGetContext('systemName');
  const envType = scope.node.tryGetContext('envType');
  const resourceNamePrefix = `${systemName}-${envType}-`;

  return `${resourceNamePrefix}${originalName}`;
}