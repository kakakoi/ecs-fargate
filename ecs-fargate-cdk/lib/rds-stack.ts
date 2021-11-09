import * as cdk from '@aws-cdk/core';
import * as rds from '@aws-cdk/aws-rds';
import * as ec2 from '@aws-cdk/aws-ec2';
import { Duration, Tags } from '@aws-cdk/core';

const paramsConfig = {
  staging: {
    vpcId: "",
    dbParams: {
      name: "ecsfargatestaging",
      username: "ecsfargateasset",
      identifier: "ecsfargatestaging"
    }
  },
  production: {
    vpcId: "",
    dbParams: {
      name: "ecsfargateproduction",
      username: "ecsfargateasset",
      identifier: "ecsfargateproduction"
    }
  }
}

interface RdsStackProps extends cdk.StackProps {
  vpc: ec2.Vpc,
  bastionSecurityGroup: ec2.SecurityGroup
  dbIngressSecurityGroup: ec2.SecurityGroup
}

export class RdsStack extends cdk.Stack {
  public dbInstance: rds.DatabaseInstance
  public rdsCredentials: rds.Credentials
  public dbParams: {
    name: string,
    username: string,
    identifier: string
  }

  constructor(scope: cdk.Construct, id: string, props?: RdsStackProps) {
    super(scope, id, props)

    // ステージごとの切り替え
    const stage: string | undefined = this.node.tryGetContext('stage')
    if (stage !== 'staging' && stage !== 'production')
      throw Error(`invalid stage: ${stage}`)
    const params = paramsConfig[stage]
    this.dbParams = params.dbParams

    /*
    const vpc = ec2.Vpc.fromLookup(this, 'vpc', {
      vpcId: params.vpcId,
    })
    */
    const vpc = props!.vpc

    const securityGroupDatabase = new ec2.SecurityGroup(this, "sgDb", {
      vpc: vpc,
      description: 'SG for ecs-fargate db',
      securityGroupName: 'ecs-fargate-db-sg-' + stage
    })
    Tags.of(securityGroupDatabase).add("Name", 'ecs-fargate-db-sg-' + stage)
    Tags.of(securityGroupDatabase).add("Environment", stage)
    Tags.of(securityGroupDatabase).add("Project", 'ecs-fargate')
    securityGroupDatabase.addIngressRule(
      props!.bastionSecurityGroup,
      ec2.Port.tcp(5432),
    )
    securityGroupDatabase.addIngressRule(
      props!.dbIngressSecurityGroup,
      ec2.Port.tcp(5432),
    )

    this.rdsCredentials = rds.Credentials.fromGeneratedSecret(params.dbParams.username, {
      secretName: 'rds-db-credentials/ecs-fargate_asset_secret_' + stage
    });

    this.dbInstance = new rds.DatabaseInstance(this, 'db', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_12_5
      }),
      vpc: vpc,
      allocatedStorage: 20,
      autoMinorVersionUpgrade: true,
      availabilityZone: 'ap-northeast-1a',
      preferredBackupWindow: "03:00-06:00",
      backupRetention: Duration.days(3),
      preferredMaintenanceWindow: "Mon:00:00-Mon:03:00",
      databaseName: params.dbParams.name,
      deletionProtection: false,
      credentials: this.rdsCredentials,
      instanceIdentifier: params.dbParams.identifier,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      enablePerformanceInsights: true,
      performanceInsightRetention: rds.PerformanceInsightRetention.DEFAULT,
      maxAllocatedStorage: 1000,
      securityGroups: [securityGroupDatabase],
      storageEncrypted: false,
      storageType: rds.StorageType.GP2,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC
      }
    });
  }
}