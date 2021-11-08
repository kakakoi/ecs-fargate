"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RdsStack = void 0;
const cdk = require("@aws-cdk/core");
const rds = require("@aws-cdk/aws-rds");
const ec2 = require("@aws-cdk/aws-ec2");
const core_1 = require("@aws-cdk/core");
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
};
class RdsStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // ステージごとの切り替え
        const stage = this.node.tryGetContext('stage');
        if (stage !== 'staging' && stage !== 'production')
            throw Error(`invalid stage: ${stage}`);
        const params = paramsConfig[stage];
        /*
        const vpc = ec2.Vpc.fromLookup(this, 'vpc', {
          vpcId: params.vpcId,
        })
        */
        const vpc = props.vpc;
        const securityGroupDatabase = new ec2.SecurityGroup(this, "sgDb", {
            vpc: vpc,
            description: 'SG for ecs-fargate db',
            securityGroupName: 'ecs-fargate-db-sg-' + stage
        });
        core_1.Tags.of(securityGroupDatabase).add("Name", 'ecs-fargate-db-sg-' + stage);
        core_1.Tags.of(securityGroupDatabase).add("Environment", stage);
        core_1.Tags.of(securityGroupDatabase).add("Project", 'ecs-fargate');
        securityGroupDatabase.addIngressRule(props.bastionSecurityGroup, ec2.Port.tcp(5432));
        securityGroupDatabase.addIngressRule(props.dbIngressSecurityGroup, ec2.Port.tcp(5432));
        this.dbInstance = new rds.DatabaseInstance(this, 'db', {
            engine: rds.DatabaseInstanceEngine.postgres({
                version: rds.PostgresEngineVersion.VER_12_5
            }),
            vpc: vpc,
            allocatedStorage: 20,
            autoMinorVersionUpgrade: true,
            availabilityZone: 'ap-northeast-1a',
            preferredBackupWindow: "03:00-06:00",
            backupRetention: core_1.Duration.days(3),
            preferredMaintenanceWindow: "Mon:00:00-Mon:03:00",
            databaseName: params.dbParams.name,
            deletionProtection: false,
            credentials: rds.Credentials.fromGeneratedSecret(params.dbParams.username, {
                secretName: 'rds-db-credentials/ecs-fargate_asset_secret_' + stage
            }),
            instanceIdentifier: params.dbParams.identifier,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
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
exports.RdsStack = RdsStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmRzLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmRzLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUNyQyx3Q0FBd0M7QUFDeEMsd0NBQXdDO0FBQ3hDLHdDQUErQztBQUUvQyxNQUFNLFlBQVksR0FBRztJQUNuQixPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsRUFBRTtRQUNULFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxtQkFBbUI7WUFDekIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixVQUFVLEVBQUUsbUJBQW1CO1NBQ2hDO0tBQ0Y7SUFDRCxVQUFVLEVBQUU7UUFDVixLQUFLLEVBQUUsRUFBRTtRQUNULFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxzQkFBc0I7WUFDNUIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixVQUFVLEVBQUUsc0JBQXNCO1NBQ25DO0tBQ0Y7Q0FDRixDQUFBO0FBUUQsTUFBYSxRQUFTLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFHckMsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFxQjtRQUNqRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUV2QixjQUFjO1FBQ2QsTUFBTSxLQUFLLEdBQXVCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2xFLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssWUFBWTtZQUMvQyxNQUFNLEtBQUssQ0FBQyxrQkFBa0IsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUN4QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFbEM7Ozs7VUFJRTtRQUNGLE1BQU0sR0FBRyxHQUFHLEtBQU0sQ0FBQyxHQUFHLENBQUE7UUFFdEIsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRTtZQUNoRSxHQUFHLEVBQUUsR0FBRztZQUNSLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsaUJBQWlCLEVBQUUsb0JBQW9CLEdBQUcsS0FBSztTQUNoRCxDQUFDLENBQUE7UUFDRixXQUFJLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsR0FBRyxLQUFLLENBQUMsQ0FBQTtRQUN4RSxXQUFJLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUN4RCxXQUFJLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUM1RCxxQkFBcUIsQ0FBQyxjQUFjLENBQ2xDLEtBQU0sQ0FBQyxvQkFBb0IsRUFDM0IsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQ25CLENBQUE7UUFDRCxxQkFBcUIsQ0FBQyxjQUFjLENBQ2xDLEtBQU0sQ0FBQyxzQkFBc0IsRUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQ25CLENBQUE7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7WUFDckQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUM7Z0JBQzFDLE9BQU8sRUFBRSxHQUFHLENBQUMscUJBQXFCLENBQUMsUUFBUTthQUM1QyxDQUFDO1lBQ0YsR0FBRyxFQUFFLEdBQUc7WUFDUixnQkFBZ0IsRUFBRSxFQUFFO1lBQ3BCLHVCQUF1QixFQUFFLElBQUk7WUFDN0IsZ0JBQWdCLEVBQUUsaUJBQWlCO1lBQ25DLHFCQUFxQixFQUFFLGFBQWE7WUFDcEMsZUFBZSxFQUFFLGVBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLDBCQUEwQixFQUFFLHFCQUFxQjtZQUNqRCxZQUFZLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJO1lBQ2xDLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3pFLFVBQVUsRUFBRSw4Q0FBOEMsR0FBRyxLQUFLO2FBQ25FLENBQUM7WUFDRixrQkFBa0IsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVU7WUFDOUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUMvQixHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFDcEIsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQ3ZCO1lBQ0QseUJBQXlCLEVBQUUsSUFBSTtZQUMvQiwyQkFBMkIsRUFBRSxHQUFHLENBQUMsMkJBQTJCLENBQUMsT0FBTztZQUNwRSxtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLGNBQWMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1lBQ3ZDLGdCQUFnQixFQUFFLEtBQUs7WUFDdkIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRztZQUNoQyxVQUFVLEVBQUU7Z0JBQ1YsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTTthQUNsQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRjtBQXBFRCw0QkFvRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyByZHMgZnJvbSAnQGF3cy1jZGsvYXdzLXJkcyc7XG5pbXBvcnQgKiBhcyBlYzIgZnJvbSAnQGF3cy1jZGsvYXdzLWVjMic7XG5pbXBvcnQgeyBEdXJhdGlvbiwgVGFncyB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuXG5jb25zdCBwYXJhbXNDb25maWcgPSB7XG4gIHN0YWdpbmc6IHtcbiAgICB2cGNJZDogXCJcIixcbiAgICBkYlBhcmFtczoge1xuICAgICAgbmFtZTogXCJlY3NmYXJnYXRlc3RhZ2luZ1wiLFxuICAgICAgdXNlcm5hbWU6IFwiZWNzZmFyZ2F0ZWFzc2V0XCIsXG4gICAgICBpZGVudGlmaWVyOiBcImVjc2ZhcmdhdGVzdGFnaW5nXCJcbiAgICB9XG4gIH0sXG4gIHByb2R1Y3Rpb246IHtcbiAgICB2cGNJZDogXCJcIixcbiAgICBkYlBhcmFtczoge1xuICAgICAgbmFtZTogXCJlY3NmYXJnYXRlcHJvZHVjdGlvblwiLFxuICAgICAgdXNlcm5hbWU6IFwiZWNzZmFyZ2F0ZWFzc2V0XCIsXG4gICAgICBpZGVudGlmaWVyOiBcImVjc2ZhcmdhdGVwcm9kdWN0aW9uXCJcbiAgICB9XG4gIH1cbn1cblxuaW50ZXJmYWNlIFJkc1N0YWNrUHJvcHMgZXh0ZW5kcyBjZGsuU3RhY2tQcm9wcyB7XG4gIHZwYzogZWMyLlZwYyxcbiAgYmFzdGlvblNlY3VyaXR5R3JvdXA6IGVjMi5TZWN1cml0eUdyb3VwXG4gIGRiSW5ncmVzc1NlY3VyaXR5R3JvdXA6IGVjMi5TZWN1cml0eUdyb3VwXG59XG5cbmV4cG9ydCBjbGFzcyBSZHNTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIHB1YmxpYyBkYkluc3RhbmNlOiByZHMuRGF0YWJhc2VJbnN0YW5jZVxuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFJkc1N0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKVxuXG4gICAgLy8g44K544OG44O844K444GU44Go44Gu5YiH44KK5pu/44GIXG4gICAgY29uc3Qgc3RhZ2U6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHRoaXMubm9kZS50cnlHZXRDb250ZXh0KCdzdGFnZScpXG4gICAgaWYgKHN0YWdlICE9PSAnc3RhZ2luZycgJiYgc3RhZ2UgIT09ICdwcm9kdWN0aW9uJylcbiAgICAgIHRocm93IEVycm9yKGBpbnZhbGlkIHN0YWdlOiAke3N0YWdlfWApXG4gICAgY29uc3QgcGFyYW1zID0gcGFyYW1zQ29uZmlnW3N0YWdlXVxuXG4gICAgLypcbiAgICBjb25zdCB2cGMgPSBlYzIuVnBjLmZyb21Mb29rdXAodGhpcywgJ3ZwYycsIHtcbiAgICAgIHZwY0lkOiBwYXJhbXMudnBjSWQsXG4gICAgfSlcbiAgICAqL1xuICAgIGNvbnN0IHZwYyA9IHByb3BzIS52cGNcblxuICAgIGNvbnN0IHNlY3VyaXR5R3JvdXBEYXRhYmFzZSA9IG5ldyBlYzIuU2VjdXJpdHlHcm91cCh0aGlzLCBcInNnRGJcIiwge1xuICAgICAgdnBjOiB2cGMsXG4gICAgICBkZXNjcmlwdGlvbjogJ1NHIGZvciBlY3MtZmFyZ2F0ZSBkYicsXG4gICAgICBzZWN1cml0eUdyb3VwTmFtZTogJ2Vjcy1mYXJnYXRlLWRiLXNnLScgKyBzdGFnZVxuICAgIH0pXG4gICAgVGFncy5vZihzZWN1cml0eUdyb3VwRGF0YWJhc2UpLmFkZChcIk5hbWVcIiwgJ2Vjcy1mYXJnYXRlLWRiLXNnLScgKyBzdGFnZSlcbiAgICBUYWdzLm9mKHNlY3VyaXR5R3JvdXBEYXRhYmFzZSkuYWRkKFwiRW52aXJvbm1lbnRcIiwgc3RhZ2UpXG4gICAgVGFncy5vZihzZWN1cml0eUdyb3VwRGF0YWJhc2UpLmFkZChcIlByb2plY3RcIiwgJ2Vjcy1mYXJnYXRlJylcbiAgICBzZWN1cml0eUdyb3VwRGF0YWJhc2UuYWRkSW5ncmVzc1J1bGUoXG4gICAgICBwcm9wcyEuYmFzdGlvblNlY3VyaXR5R3JvdXAsXG4gICAgICBlYzIuUG9ydC50Y3AoNTQzMiksXG4gICAgKVxuICAgIHNlY3VyaXR5R3JvdXBEYXRhYmFzZS5hZGRJbmdyZXNzUnVsZShcbiAgICAgIHByb3BzIS5kYkluZ3Jlc3NTZWN1cml0eUdyb3VwLFxuICAgICAgZWMyLlBvcnQudGNwKDU0MzIpLFxuICAgIClcblxuICAgIHRoaXMuZGJJbnN0YW5jZSA9IG5ldyByZHMuRGF0YWJhc2VJbnN0YW5jZSh0aGlzLCAnZGInLCB7XG4gICAgICBlbmdpbmU6IHJkcy5EYXRhYmFzZUluc3RhbmNlRW5naW5lLnBvc3RncmVzKHtcbiAgICAgICAgdmVyc2lvbjogcmRzLlBvc3RncmVzRW5naW5lVmVyc2lvbi5WRVJfMTJfNVxuICAgICAgfSksXG4gICAgICB2cGM6IHZwYyxcbiAgICAgIGFsbG9jYXRlZFN0b3JhZ2U6IDIwLFxuICAgICAgYXV0b01pbm9yVmVyc2lvblVwZ3JhZGU6IHRydWUsXG4gICAgICBhdmFpbGFiaWxpdHlab25lOiAnYXAtbm9ydGhlYXN0LTFhJyxcbiAgICAgIHByZWZlcnJlZEJhY2t1cFdpbmRvdzogXCIwMzowMC0wNjowMFwiLFxuICAgICAgYmFja3VwUmV0ZW50aW9uOiBEdXJhdGlvbi5kYXlzKDMpLFxuICAgICAgcHJlZmVycmVkTWFpbnRlbmFuY2VXaW5kb3c6IFwiTW9uOjAwOjAwLU1vbjowMzowMFwiLFxuICAgICAgZGF0YWJhc2VOYW1lOiBwYXJhbXMuZGJQYXJhbXMubmFtZSxcbiAgICAgIGRlbGV0aW9uUHJvdGVjdGlvbjogZmFsc2UsXG4gICAgICBjcmVkZW50aWFsczogcmRzLkNyZWRlbnRpYWxzLmZyb21HZW5lcmF0ZWRTZWNyZXQocGFyYW1zLmRiUGFyYW1zLnVzZXJuYW1lLCB7XG4gICAgICAgIHNlY3JldE5hbWU6ICdyZHMtZGItY3JlZGVudGlhbHMvZWNzLWZhcmdhdGVfYXNzZXRfc2VjcmV0XycgKyBzdGFnZVxuICAgICAgfSksXG4gICAgICBpbnN0YW5jZUlkZW50aWZpZXI6IHBhcmFtcy5kYlBhcmFtcy5pZGVudGlmaWVyLFxuICAgICAgaW5zdGFuY2VUeXBlOiBlYzIuSW5zdGFuY2VUeXBlLm9mKFxuICAgICAgICBlYzIuSW5zdGFuY2VDbGFzcy5UMixcbiAgICAgICAgZWMyLkluc3RhbmNlU2l6ZS5NSUNST1xuICAgICAgKSxcbiAgICAgIGVuYWJsZVBlcmZvcm1hbmNlSW5zaWdodHM6IHRydWUsXG4gICAgICBwZXJmb3JtYW5jZUluc2lnaHRSZXRlbnRpb246IHJkcy5QZXJmb3JtYW5jZUluc2lnaHRSZXRlbnRpb24uREVGQVVMVCxcbiAgICAgIG1heEFsbG9jYXRlZFN0b3JhZ2U6IDEwMDAsXG4gICAgICBzZWN1cml0eUdyb3VwczogW3NlY3VyaXR5R3JvdXBEYXRhYmFzZV0sXG4gICAgICBzdG9yYWdlRW5jcnlwdGVkOiBmYWxzZSxcbiAgICAgIHN0b3JhZ2VUeXBlOiByZHMuU3RvcmFnZVR5cGUuR1AyLFxuICAgICAgdnBjU3VibmV0czoge1xuICAgICAgICBzdWJuZXRUeXBlOiBlYzIuU3VibmV0VHlwZS5QVUJMSUNcbiAgICAgIH1cbiAgICB9KVxuICB9XG59Il19