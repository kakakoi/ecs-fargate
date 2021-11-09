import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam'
import * as ecsp from '@aws-cdk/aws-ecs-patterns';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecr from '@aws-cdk/aws-ecr';
import * as rds from '@aws-cdk/aws-rds';
import * as logs from '@aws-cdk/aws-logs';

interface EcsFargateProps extends cdk.StackProps {
  vpc: ec2.Vpc,
  rdsCredentials: rds.Credentials,
  rdsInstance: rds.DatabaseInstance,
  dbParams: {
    name: string,
    username: string,
    identifier: string
  },
}

export class EcsFargateStack extends cdk.Stack {
  public vpc: ec2.Vpc

  constructor(scope: cdk.Construct, id: string, props: EcsFargateProps) {
    super(scope, id, props);

    // ステージごとの切り替え
    const stage: string | undefined = this.node.tryGetContext('stage')
    if (stage !== 'staging' && stage !== 'production')
      throw Error(`invalid stage: ${stage}`)

    const secret = props.rdsInstance.secret
    if (secret == undefined)
      throw Error('rdssecret is undefined')

    // Amazon ECRのリポジトリを指定。事前に作成してpushしておきます。
    const repository = new ecr.Repository(this, createResourceName(scope, 'ecr-id'), {
      repositoryName: createResourceName(scope, "ecr-name"),
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const taskIamRole = new iam.Role(this, createResourceName(scope, "AppRoleId"), {
      roleName: createResourceName(scope, "AppRoleName"),
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });
    const usernameSecret = props.rdsCredentials.username;
    const passwordSecret = props.rdsCredentials.password;

    const taskDefinition = new ecs.FargateTaskDefinition(this, createResourceName(scope, 'Task'), {
      taskRole: taskIamRole,
    });

    const logGroup = new logs.LogGroup(this, 'ServiceLogGroup', {
      logGroupName: this.node.tryGetContext('serviceName')
      })

    taskDefinition.addContainer(createResourceName(scope, 'container'), {
      image: ecs.ContainerImage.fromAsset('../app'),
      portMappings: [{ containerPort: 80 }],
      memoryReservationMiB: 256,
      cpu : 256,
      environment: {// TODO: https://dev.to/michaelfecher/i-tell-you-a-secret-provide-database-credentials-to-an-ecs-fargate-task-in-aws-cdk-5f4
        NODE_ENV: stage,
        DB_USER: usernameSecret,
        DB_DIALECT: "postgres",
        DB_HOST: props.rdsInstance.instanceEndpoint.hostname,
        DB_PORT: props.rdsInstance.instanceEndpoint.port.toString(),
        DB_NAME: props.dbParams.name,
      },
      secrets: {
        DB_SECRET: ecs.Secret.fromSecretsManager(secret),
      },
      logging: ecs.LogDriver.awsLogs({
        streamPrefix: this.node.tryGetContext('systemName'),
        logGroup,
      }),
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