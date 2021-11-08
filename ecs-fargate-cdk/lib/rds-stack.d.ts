import * as cdk from '@aws-cdk/core';
import * as rds from '@aws-cdk/aws-rds';
import * as ec2 from '@aws-cdk/aws-ec2';
interface RdsStackProps extends cdk.StackProps {
    vpc: ec2.Vpc;
    bastionSecurityGroup: ec2.SecurityGroup;
    dbIngressSecurityGroup: ec2.SecurityGroup;
}
export declare class RdsStack extends cdk.Stack {
    dbInstance: rds.DatabaseInstance;
    constructor(scope: cdk.Construct, id: string, props?: RdsStackProps);
}
export {};
