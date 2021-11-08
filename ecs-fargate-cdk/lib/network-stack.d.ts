import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
export declare class NetworkStack extends cdk.Stack {
    vpc: ec2.Vpc;
    bastionSecurityGroup: ec2.SecurityGroup;
    dbIngressSecurityGroup: ec2.SecurityGroup;
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps);
}
