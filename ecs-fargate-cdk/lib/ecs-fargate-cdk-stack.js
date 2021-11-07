"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcsFargateCdkStack = void 0;
const cdk = require("@aws-cdk/core");
const ecr = require("@aws-cdk/aws-ecr");
class EcsFargateCdkStack extends cdk.Stack {
    constructor(scope, id, props) {
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
exports.EcsFargateCdkStack = EcsFargateCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNzLWZhcmdhdGUtY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWNzLWZhcmdhdGUtY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUtyQyx3Q0FBd0M7QUFJeEMsTUFBYSxrQkFBbUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUMvQyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLHlDQUF5QztRQUN6QyxNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFO1lBQ3JFLGNBQWMsRUFBRSwyQkFBMkI7WUFDM0MsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztTQUN6QyxDQUFDLENBQUM7UUFFSCwwQ0FBMEM7UUFDMUMsb0JBQW9CO1FBQ3BCLDJCQUEyQjtRQUMzQiwyRUFBMkU7UUFDM0UsVUFBVTtRQUVWLHNEQUFzRDtRQUN0RCx5QkFBeUI7UUFDekIsbUVBQW1FO1FBQ25FLE1BQU07UUFFTix1RUFBdUU7UUFDdkUsMkJBQTJCO1FBQzNCLEtBQUs7UUFFTCwrQ0FBK0M7UUFDL0Msd0VBQXdFO1FBQ3hFLDBDQUEwQztRQUMxQywrQkFBK0I7UUFDL0IsYUFBYTtRQUNiLEtBQUs7UUFFTCx3RkFBd0Y7UUFDeEYsY0FBYztRQUNkLG9DQUFvQztRQUNwQyxxQkFBcUI7UUFDckIsNkJBQTZCO1FBQzdCLDBCQUEwQjtRQUMxQiw2QkFBNkI7UUFDN0IsS0FBSztRQUNMLDZDQUE2QztJQUMvQyxDQUFDO0NBQ0Y7QUExQ0QsZ0RBMENDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgZWMyIGZyb20gJ0Bhd3MtY2RrL2F3cy1lYzInO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ0Bhd3MtY2RrL2F3cy1pYW0nXG5pbXBvcnQgKiBhcyBlY3NwIGZyb20gJ0Bhd3MtY2RrL2F3cy1lY3MtcGF0dGVybnMnO1xuaW1wb3J0ICogYXMgZWNzIGZyb20gJ0Bhd3MtY2RrL2F3cy1lY3MnO1xuaW1wb3J0ICogYXMgZWNyIGZyb20gJ0Bhd3MtY2RrL2F3cy1lY3InO1xuXG5pbXBvcnQgeyBUYXNrRGVmaW5pdGlvbiB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1lY3MnO1xuXG5leHBvcnQgY2xhc3MgRWNzRmFyZ2F0ZUNka1N0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIEFtYXpvbiBFQ1Ljga7jg6rjg53jgrjjg4jjg6rjgpLmjIflrprjgILkuovliY3jgavkvZzmiJDjgZfjgaZwdXNo44GX44Gm44GK44GN44G+44GZ44CCXG4gICAgY29uc3QgcmVwb3NpdG9yeSA9IG5ldyBlY3IuUmVwb3NpdG9yeSh0aGlzLCAnZmFyZ2F0ZS1yZHMtY2RrLXJlcG8taWQnLCB7XG4gICAgICByZXBvc2l0b3J5TmFtZTogXCJmYXJnYXRlLXJkcy1jZGstcmVwby1uYW1lXCIsXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZXG4gICAgfSk7XG5cbiAgICAvLyBjb25zdCB2cGMgPSBuZXcgZWMyLlZwYyh0aGlzLCAnVlBDJywgeyBcbiAgICAvLyAgIG5hdEdhdGV3YXlzOiAwLFxuICAgIC8vICAgc3VibmV0Q29uZmlndXJhdGlvbjogW1xuICAgIC8vICAgICB7IGNpZHJNYXNrOiAyNCwgc3VibmV0VHlwZTogZWMyLlN1Ym5ldFR5cGUuUFVCTElDLCBuYW1lOiAnaW5ncmVzcycgfVxuICAgIC8vICAgXSB9KTtcbiAgICAgIFxuICAgIC8vIGNvbnN0IHRhc2tJYW1Sb2xlID0gbmV3IGlhbS5Sb2xlKHRoaXMsIFwiQXBwUm9sZVwiLCB7XG4gICAgLy8gICByb2xlTmFtZTogXCJBcHBSb2xlXCIsXG4gICAgLy8gICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnZWNzLXRhc2tzLmFtYXpvbmF3cy5jb20nKVxuICAgIC8vIH0pO1xuXG4gICAgLy8gY29uc3QgdGFza0RlZmluaXRpb24gPSBuZXcgZWNzLkZhcmdhdGVUYXNrRGVmaW5pdGlvbih0aGlzLCAnVGFzaycsIHtcbiAgICAvLyAgIHRhc2tSb2xlOiB0YXNrSWFtUm9sZSxcbiAgICAvLyB9KVxuXG4gICAgLy8gdGFza0RlZmluaXRpb24uYWRkQ29udGFpbmVyKCdNeUNvbnRhaW5lcicsIHtcbiAgICAvLyAgIGltYWdlOiBlY3MuQ29udGFpbmVySW1hZ2UuZnJvbVJlZ2lzdHJ5KCdhbWF6b24vYW1hem9uLWVjcy1zYW1wbGUnKSxcbiAgICAvLyAgIHBvcnRNYXBwaW5nczogW3sgY29udGFpbmVyUG9ydDogODB9XSxcbiAgICAvLyAgIG1lbW9yeVJlc2VydmF0aW9uTWlCOiAyNTYsXG4gICAgLy8gICBjcHU6MjU2LFxuICAgIC8vIH0pXG5cbiAgICAvLyBjb25zdCBzZXJ2aWNlID0gbmV3IGVjc3AuQXBwbGljYXRpb25Mb2FkQmFsYW5jZWRGYXJnYXRlU2VydmljZSh0aGlzLCAnTXlXZWJTZXJ2ZXInLCB7XG4gICAgLy8gICB2cGM6IHZwYyxcbiAgICAvLyAgIHRhc2tEZWZpbml0aW9uOiB0YXNrRGVmaW5pdGlvbixcbiAgICAvLyAgIGRlc2lyZWRDb3VudDogMSxcbiAgICAvLyAgIHNlcnZpY2VOYW1lOiAnTXlXZWJBcHAnLFxuICAgIC8vICAgYXNzaWduUHVibGljSXA6IHRydWUsXG4gICAgLy8gICBwdWJsaWNMb2FkQmFsYW5jZXI6IHRydWVcbiAgICAvLyB9KVxuICAgIC8vIFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZVxuICB9XG59XG4iXX0=