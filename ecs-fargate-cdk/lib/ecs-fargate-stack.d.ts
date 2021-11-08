import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
interface EcsFargateProps extends cdk.StackProps {
    vpc: ec2.Vpc;
}
export declare class EcsFargateStack extends cdk.Stack {
    vpc: ec2.Vpc;
    constructor(scope: cdk.Construct, id: string, props?: EcsFargateProps);
}
export {};
