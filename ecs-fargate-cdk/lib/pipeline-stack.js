"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyPipelineStack = void 0;
const ecs_fargate_cdk_stack_1 = require("../lib/ecs-fargate-cdk-stack");
const core_1 = require("@aws-cdk/core");
const codepipeline = require("@aws-cdk/aws-codepipeline");
const codepipeline_actions = require("@aws-cdk/aws-codepipeline-actions");
const codebuild = require("@aws-cdk/aws-codebuild");
/**
 * パイプラインを定義するStack
 */
class MyPipelineStack extends core_1.Stack {
    constructor(scope, id, props) {
        var _a, _b;
        super(scope, id, props);
        const name = "fast-api-test01";
        const account = ((_a = props.env) === null || _a === void 0 ? void 0 : _a.account) || core_1.Aws.ACCOUNT_ID;
        const region = (_b = props.env) === null || _b === void 0 ? void 0 : _b.region;
        const project = new codebuild.PipelineProject(this, `Project-${name}`);
        const pipeline = new codepipeline.Pipeline(this, `Pipeline-${name}`);
        const sourceOutput = new codepipeline.Artifact();
        const sourceAction = new codepipeline_actions.GitHubSourceAction({
            actionName: 'GitHub_Source',
            owner: 'kakakoi',
            repo: 'ecs-fargate',
            oauthToken: core_1.SecretValue.secretsManager("github-token-aws"),
            output: sourceOutput,
            branch: 'main',
        });
        const buildAction = new codepipeline_actions.CodeBuildAction({
            actionName: `CodeBuild-${name}`,
            project,
            input: sourceOutput,
            environmentVariables: {
                COMMIT_URL: {
                    value: sourceAction.variables.commitUrl,
                },
            },
        });
        pipeline.addStage({
            stageName: `Source-${name}`,
            actions: [buildAction],
        });
        // const pipeline = new CodePipeline(this, 'Pipeline', {
        //   // クロスアカウントを利用する場合に必要です。
        //   crossAccountKeys: false,
        //   synth: new ShellStep('Synth', {
        //     // 事前に作成したレポジトリ名と、ConnectionのARNに置き換えてください。
        //     input: CodePipelineSource.connection('kakakoi/ecs-fargate', 'main', {
        //       connectionArn: `arn:aws:codestar-connections:${region}:${account}:connection/865e488f-ed02-4412-a3aa-fd30ef01f606`,
        //     }),
        //     commands: [
        //       'npm ci',
        //       'npm run build',
        //       'npx cdk synth',
        //     ],
        //   }),
        // });
        // // 任意のアカウントとリージョンで、必要な回数だけ`addStage`を呼び出します。
        // const myStage = new MyApplicationStage(this, 'PreProd', {
        //   env: { account: account, region: region }
        // });
        // pipeline.addStage(myStage)
    }
}
exports.MyPipelineStack = MyPipelineStack;
class MyApplicationStage extends core_1.Stage {
    constructor(scope, id, props) {
        var _a, _b;
        super(scope, id, props);
        const service = new ecs_fargate_cdk_stack_1.EcsFargateCdkStack(this, 'EcrStack', {
            env: {
                account: (_a = props.env) === null || _a === void 0 ? void 0 : _a.account,
                region: (_b = props.env) === null || _b === void 0 ? void 0 : _b.region,
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3RUFBa0U7QUFFbEUsd0NBU3VCO0FBT3ZCLDBEQUEwRDtBQUMxRCwwRUFBMEU7QUFDMUUsb0RBQW9EO0FBR3BEOztHQUVHO0FBQ0YsTUFBYSxlQUFnQixTQUFRLFlBQUs7SUFDdkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFpQjs7UUFDekQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxJQUFJLEdBQUcsaUJBQWlCLENBQUE7UUFFOUIsTUFBTSxPQUFPLEdBQUcsT0FBQSxLQUFLLENBQUMsR0FBRywwQ0FBRSxPQUFPLEtBQUksVUFBRyxDQUFDLFVBQVUsQ0FBQztRQUNyRCxNQUFNLE1BQU0sU0FBRyxLQUFLLENBQUMsR0FBRywwQ0FBRSxNQUFNLENBQUM7UUFFakMsTUFBTSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxXQUFXLElBQUksRUFBRSxDQUFDLENBQUM7UUFHdkUsTUFBTSxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFZLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckUsTUFBTSxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakQsTUFBTSxZQUFZLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxrQkFBa0IsQ0FBQztZQUMvRCxVQUFVLEVBQUUsZUFBZTtZQUMzQixLQUFLLEVBQUUsU0FBUztZQUNoQixJQUFJLEVBQUUsYUFBYTtZQUNuQixVQUFVLEVBQUUsa0JBQVcsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUM7WUFDMUQsTUFBTSxFQUFFLFlBQVk7WUFDcEIsTUFBTSxFQUFFLE1BQU07U0FDZixDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFvQixDQUFDLGVBQWUsQ0FBQztZQUMzRCxVQUFVLEVBQUUsYUFBYSxJQUFJLEVBQUU7WUFDL0IsT0FBTztZQUNQLEtBQUssRUFBRSxZQUFZO1lBQ25CLG9CQUFvQixFQUFFO2dCQUNwQixVQUFVLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUztpQkFDeEM7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDaEIsU0FBUyxFQUFFLFVBQVUsSUFBSSxFQUFFO1lBQzNCLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztTQUN2QixDQUFDLENBQUM7UUFHSCx3REFBd0Q7UUFDeEQsNkJBQTZCO1FBQzdCLDZCQUE2QjtRQUM3QixvQ0FBb0M7UUFDcEMsa0RBQWtEO1FBQ2xELDRFQUE0RTtRQUM1RSw0SEFBNEg7UUFDNUgsVUFBVTtRQUNWLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFDbEIseUJBQXlCO1FBQ3pCLHlCQUF5QjtRQUN6QixTQUFTO1FBQ1QsUUFBUTtRQUNSLE1BQU07UUFFTiwrQ0FBK0M7UUFDL0MsNERBQTREO1FBQzVELDhDQUE4QztRQUM5QyxNQUFNO1FBQ04sNkJBQTZCO0lBQy9CLENBQUM7Q0FDSjtBQTlEQSwwQ0E4REE7QUFFQSxNQUFNLGtCQUFtQixTQUFRLFlBQUs7SUFDbkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFpQjs7UUFDdkQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxPQUFPLEdBQUcsSUFBSSwwQ0FBa0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ3JELEdBQUcsRUFBRTtnQkFDRCxPQUFPLFFBQUUsS0FBSyxDQUFDLEdBQUcsMENBQUUsT0FBTztnQkFDM0IsTUFBTSxRQUFFLEtBQUssQ0FBQyxHQUFHLDBDQUFFLE1BQU07YUFDNUI7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFY3NGYXJnYXRlQ2RrU3RhY2sgfSBmcm9tICcuLi9saWIvZWNzLWZhcmdhdGUtY2RrLXN0YWNrJztcblxuaW1wb3J0IHtcbiAgICBBcm4sXG4gICAgQXdzLFxuICAgIENvbmNyZXRlRGVwZW5kYWJsZSxcbiAgICBDb25zdHJ1Y3QsXG4gICAgU2VjcmV0VmFsdWUsXG4gICAgU3RhY2ssXG4gICAgU3RhY2tQcm9wcyxcbiAgICBTdGFnZSwgU3RhZ2VQcm9wc1xufSBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7XG4gICAgQ29kZVBpcGVsaW5lLFxuICAgIFNoZWxsU3RlcCxcbiAgICBDb2RlUGlwZWxpbmVTb3VyY2UsXG59IGZyb20gJ0Bhd3MtY2RrL3BpcGVsaW5lcyc7XG5pbXBvcnQgeyBQaXBlbGluZSB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmUnO1xuaW1wb3J0ICogYXMgY29kZXBpcGVsaW5lIGZyb20gJ0Bhd3MtY2RrL2F3cy1jb2RlcGlwZWxpbmUnO1xuaW1wb3J0ICogYXMgY29kZXBpcGVsaW5lX2FjdGlvbnMgZnJvbSAnQGF3cy1jZGsvYXdzLWNvZGVwaXBlbGluZS1hY3Rpb25zJztcbmltcG9ydCAqIGFzIGNvZGVidWlsZCBmcm9tIFwiQGF3cy1jZGsvYXdzLWNvZGVidWlsZFwiO1xuXG5cbi8qKlxuICog44OR44Kk44OX44Op44Kk44Oz44KS5a6a576p44GZ44KLU3RhY2tcbiAqL1xuIGV4cG9ydCBjbGFzcyBNeVBpcGVsaW5lU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFN0YWNrUHJvcHMpIHtcbiAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgICBjb25zdCBuYW1lID0gXCJmYXN0LWFwaS10ZXN0MDFcIlxuXG4gICAgICBjb25zdCBhY2NvdW50ID0gcHJvcHMuZW52Py5hY2NvdW50IHx8IEF3cy5BQ0NPVU5UX0lEO1xuICAgICAgY29uc3QgcmVnaW9uID0gcHJvcHMuZW52Py5yZWdpb247XG5cbiAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgY29kZWJ1aWxkLlBpcGVsaW5lUHJvamVjdCh0aGlzLCBgUHJvamVjdC0ke25hbWV9YCk7XG5cblxuICAgICAgY29uc3QgcGlwZWxpbmUgPSBuZXcgY29kZXBpcGVsaW5lLlBpcGVsaW5lKHRoaXMsIGBQaXBlbGluZS0ke25hbWV9YCk7XG4gICAgICBjb25zdCBzb3VyY2VPdXRwdXQgPSBuZXcgY29kZXBpcGVsaW5lLkFydGlmYWN0KCk7XG4gICAgICBjb25zdCBzb3VyY2VBY3Rpb24gPSBuZXcgY29kZXBpcGVsaW5lX2FjdGlvbnMuR2l0SHViU291cmNlQWN0aW9uKHtcbiAgICAgICAgYWN0aW9uTmFtZTogJ0dpdEh1Yl9Tb3VyY2UnLFxuICAgICAgICBvd25lcjogJ2tha2Frb2knLFxuICAgICAgICByZXBvOiAnZWNzLWZhcmdhdGUnLFxuICAgICAgICBvYXV0aFRva2VuOiBTZWNyZXRWYWx1ZS5zZWNyZXRzTWFuYWdlcihcImdpdGh1Yi10b2tlbi1hd3NcIiksXG4gICAgICAgIG91dHB1dDogc291cmNlT3V0cHV0LFxuICAgICAgICBicmFuY2g6ICdtYWluJywgLy8gZGVmYXVsdDogJ21hc3RlcidcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBidWlsZEFjdGlvbiA9IG5ldyBjb2RlcGlwZWxpbmVfYWN0aW9ucy5Db2RlQnVpbGRBY3Rpb24oe1xuICAgICAgICBhY3Rpb25OYW1lOiBgQ29kZUJ1aWxkLSR7bmFtZX1gLFxuICAgICAgICBwcm9qZWN0LFxuICAgICAgICBpbnB1dDogc291cmNlT3V0cHV0LFxuICAgICAgICBlbnZpcm9ubWVudFZhcmlhYmxlczoge1xuICAgICAgICAgIENPTU1JVF9VUkw6IHtcbiAgICAgICAgICAgIHZhbHVlOiBzb3VyY2VBY3Rpb24udmFyaWFibGVzLmNvbW1pdFVybCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIHBpcGVsaW5lLmFkZFN0YWdlKHtcbiAgICAgICAgc3RhZ2VOYW1lOiBgU291cmNlLSR7bmFtZX1gLFxuICAgICAgICBhY3Rpb25zOiBbYnVpbGRBY3Rpb25dLFxuICAgICAgfSk7XG5cblxuICAgICAgLy8gY29uc3QgcGlwZWxpbmUgPSBuZXcgQ29kZVBpcGVsaW5lKHRoaXMsICdQaXBlbGluZScsIHtcbiAgICAgIC8vICAgLy8g44Kv44Ot44K544Ki44Kr44Km44Oz44OI44KS5Yip55So44GZ44KL5aC05ZCI44Gr5b+F6KaB44Gn44GZ44CCXG4gICAgICAvLyAgIGNyb3NzQWNjb3VudEtleXM6IGZhbHNlLFxuICAgICAgLy8gICBzeW50aDogbmV3IFNoZWxsU3RlcCgnU3ludGgnLCB7XG4gICAgICAvLyAgICAgLy8g5LqL5YmN44Gr5L2c5oiQ44GX44Gf44Os44Od44K444OI44Oq5ZCN44Go44CBQ29ubmVjdGlvbuOBrkFSTuOBq+e9ruOBjeaPm+OBiOOBpuOBj+OBoOOBleOBhOOAglxuICAgICAgLy8gICAgIGlucHV0OiBDb2RlUGlwZWxpbmVTb3VyY2UuY29ubmVjdGlvbigna2FrYWtvaS9lY3MtZmFyZ2F0ZScsICdtYWluJywge1xuICAgICAgLy8gICAgICAgY29ubmVjdGlvbkFybjogYGFybjphd3M6Y29kZXN0YXItY29ubmVjdGlvbnM6JHtyZWdpb259OiR7YWNjb3VudH06Y29ubmVjdGlvbi84NjVlNDg4Zi1lZDAyLTQ0MTItYTNhYS1mZDMwZWYwMWY2MDZgLFxuICAgICAgLy8gICAgIH0pLFxuICAgICAgLy8gICAgIGNvbW1hbmRzOiBbXG4gICAgICAvLyAgICAgICAnbnBtIGNpJyxcbiAgICAgIC8vICAgICAgICducG0gcnVuIGJ1aWxkJyxcbiAgICAgIC8vICAgICAgICducHggY2RrIHN5bnRoJyxcbiAgICAgIC8vICAgICBdLFxuICAgICAgLy8gICB9KSxcbiAgICAgIC8vIH0pO1xuXG4gICAgICAvLyAvLyDku7vmhI/jga7jgqLjgqvjgqbjg7Pjg4jjgajjg6rjg7zjgrjjg6fjg7PjgafjgIHlv4XopoHjgarlm57mlbDjgaDjgZFgYWRkU3RhZ2Vg44KS5ZG844Gz5Ye644GX44G+44GZ44CCXG4gICAgICAvLyBjb25zdCBteVN0YWdlID0gbmV3IE15QXBwbGljYXRpb25TdGFnZSh0aGlzLCAnUHJlUHJvZCcsIHtcbiAgICAgIC8vICAgZW52OiB7IGFjY291bnQ6IGFjY291bnQsIHJlZ2lvbjogcmVnaW9uIH1cbiAgICAgIC8vIH0pO1xuICAgICAgLy8gcGlwZWxpbmUuYWRkU3RhZ2UobXlTdGFnZSlcbiAgICB9XG59XG5cbiBjbGFzcyBNeUFwcGxpY2F0aW9uU3RhZ2UgZXh0ZW5kcyBTdGFnZSB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFN0YWdlUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgY29uc3Qgc2VydmljZSA9IG5ldyBFY3NGYXJnYXRlQ2RrU3RhY2sodGhpcywgJ0VjclN0YWNrJywge1xuICAgICAgICAgICAgZW52OiB7XG4gICAgICAgICAgICAgICAgYWNjb3VudDogcHJvcHMuZW52Py5hY2NvdW50LFxuICAgICAgICAgICAgICAgIHJlZ2lvbjogcHJvcHMuZW52Py5yZWdpb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG59Il19