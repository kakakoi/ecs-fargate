"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcsFargateCdkStack = void 0;
const cdk = require("@aws-cdk/core");
const ec2 = require("@aws-cdk/aws-ec2");
const iam = require("@aws-cdk/aws-iam");
const ecsp = require("@aws-cdk/aws-ecs-patterns");
const ecs = require("@aws-cdk/aws-ecs");
class EcsFargateCdkStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const vpc = new ec2.Vpc(this, 'VPC', {
            natGateways: 0,
            subnetConfiguration: [
                { cidrMask: 24, subnetType: ec2.SubnetType.PUBLIC, name: 'ingress' }
            ]
        });
        const taskIamRole = new iam.Role(this, "AppRole", {
            roleName: "AppRole",
            assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com')
        });
        const taskDefinition = new ecs.FargateTaskDefinition(this, 'Task', {
            taskRole: taskIamRole,
        });
        taskDefinition.addContainer('MyContainer', {
            image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
            portMappings: [{ containerPort: 80 }],
            memoryReservationMiB: 256,
            cpu: 256,
        });
        const service = new ecsp.ApplicationLoadBalancedFargateService(this, 'MyWebServer', {
            vpc: vpc,
            taskDefinition: taskDefinition,
            desiredCount: 1,
            serviceName: 'MyWebApp',
            assignPublicIp: true,
            publicLoadBalancer: true
        });
        // The code that defines your stack goes here
    }
}
exports.EcsFargateCdkStack = EcsFargateCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNzLWZhcmdhdGUtY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWNzLWZhcmdhdGUtY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyx3Q0FBd0M7QUFDeEMsd0NBQXVDO0FBQ3ZDLGtEQUFrRDtBQUNsRCx3Q0FBdUM7QUFHdkMsTUFBYSxrQkFBbUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUMvQyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQ25DLFdBQVcsRUFBRSxDQUFDO1lBQ2QsbUJBQW1CLEVBQUU7Z0JBQ25CLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTthQUNyRTtTQUFFLENBQUMsQ0FBQztRQUVQLE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ2hELFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQztTQUMvRCxDQUFDLENBQUM7UUFFSCxNQUFNLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ2pFLFFBQVEsRUFBRSxXQUFXO1NBQ3RCLENBQUMsQ0FBQTtRQUVGLGNBQWMsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFO1lBQ3pDLEtBQUssRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQywwQkFBMEIsQ0FBQztZQUNsRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUMsQ0FBQztZQUNwQyxvQkFBb0IsRUFBRSxHQUFHO1lBQ3pCLEdBQUcsRUFBQyxHQUFHO1NBQ1IsQ0FBQyxDQUFBO1FBRUYsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMscUNBQXFDLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUNsRixHQUFHLEVBQUUsR0FBRztZQUNSLGNBQWMsRUFBRSxjQUFjO1lBQzlCLFlBQVksRUFBRSxDQUFDO1lBQ2YsV0FBVyxFQUFFLFVBQVU7WUFDdkIsY0FBYyxFQUFFLElBQUk7WUFDcEIsa0JBQWtCLEVBQUUsSUFBSTtTQUN6QixDQUFDLENBQUE7UUFDRiw2Q0FBNkM7SUFDL0MsQ0FBQztDQUNGO0FBcENELGdEQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGVjMiBmcm9tICdAYXdzLWNkay9hd3MtZWMyJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdAYXdzLWNkay9hd3MtaWFtJ1xuaW1wb3J0ICogYXMgZWNzcCBmcm9tICdAYXdzLWNkay9hd3MtZWNzLXBhdHRlcm5zJztcbmltcG9ydCAqIGFzIGVjcyBmcm9tICdAYXdzLWNkay9hd3MtZWNzJ1xuaW1wb3J0IHsgVGFza0RlZmluaXRpb24gfSBmcm9tICdAYXdzLWNkay9hd3MtZWNzJztcblxuZXhwb3J0IGNsYXNzIEVjc0ZhcmdhdGVDZGtTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCB2cGMgPSBuZXcgZWMyLlZwYyh0aGlzLCAnVlBDJywgeyBcbiAgICAgIG5hdEdhdGV3YXlzOiAwLFxuICAgICAgc3VibmV0Q29uZmlndXJhdGlvbjogW1xuICAgICAgICB7IGNpZHJNYXNrOiAyNCwgc3VibmV0VHlwZTogZWMyLlN1Ym5ldFR5cGUuUFVCTElDLCBuYW1lOiAnaW5ncmVzcycgfVxuICAgICAgXSB9KTtcbiAgICAgIFxuICAgIGNvbnN0IHRhc2tJYW1Sb2xlID0gbmV3IGlhbS5Sb2xlKHRoaXMsIFwiQXBwUm9sZVwiLCB7XG4gICAgICByb2xlTmFtZTogXCJBcHBSb2xlXCIsXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbCgnZWNzLXRhc2tzLmFtYXpvbmF3cy5jb20nKVxuICAgIH0pO1xuXG4gICAgY29uc3QgdGFza0RlZmluaXRpb24gPSBuZXcgZWNzLkZhcmdhdGVUYXNrRGVmaW5pdGlvbih0aGlzLCAnVGFzaycsIHtcbiAgICAgIHRhc2tSb2xlOiB0YXNrSWFtUm9sZSxcbiAgICB9KVxuXG4gICAgdGFza0RlZmluaXRpb24uYWRkQ29udGFpbmVyKCdNeUNvbnRhaW5lcicsIHtcbiAgICAgIGltYWdlOiBlY3MuQ29udGFpbmVySW1hZ2UuZnJvbVJlZ2lzdHJ5KCdhbWF6b24vYW1hem9uLWVjcy1zYW1wbGUnKSxcbiAgICAgIHBvcnRNYXBwaW5nczogW3sgY29udGFpbmVyUG9ydDogODB9XSxcbiAgICAgIG1lbW9yeVJlc2VydmF0aW9uTWlCOiAyNTYsXG4gICAgICBjcHU6MjU2LFxuICAgIH0pXG5cbiAgICBjb25zdCBzZXJ2aWNlID0gbmV3IGVjc3AuQXBwbGljYXRpb25Mb2FkQmFsYW5jZWRGYXJnYXRlU2VydmljZSh0aGlzLCAnTXlXZWJTZXJ2ZXInLCB7XG4gICAgICB2cGM6IHZwYyxcbiAgICAgIHRhc2tEZWZpbml0aW9uOiB0YXNrRGVmaW5pdGlvbixcbiAgICAgIGRlc2lyZWRDb3VudDogMSxcbiAgICAgIHNlcnZpY2VOYW1lOiAnTXlXZWJBcHAnLFxuICAgICAgYXNzaWduUHVibGljSXA6IHRydWUsXG4gICAgICBwdWJsaWNMb2FkQmFsYW5jZXI6IHRydWVcbiAgICB9KVxuICAgIC8vIFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZVxuICB9XG59XG4iXX0=