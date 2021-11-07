import { EcsFargateCdkStack } from '../lib/ecs-fargate-cdk-stack';

import {
    Arn,
    Aws,
    ConcreteDependable,
    Construct,
    SecretValue,
    Stack,
    StackProps,
    Stage, StageProps
} from '@aws-cdk/core';
import {
    CodePipeline,
    ShellStep,
    CodePipelineSource,
} from '@aws-cdk/pipelines';
import { Pipeline } from '@aws-cdk/aws-codepipeline';
import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import * as codebuild from "@aws-cdk/aws-codebuild";


/**
 * パイプラインを定義するStack
 */
 export class MyPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps) {
      super(scope, id, props);

      // const name = "fast-api-test01"

      const account = '674115544340'; //props.env?.account || Aws.ACCOUNT_ID;
      const region = 'ap-northeast-1';//props.env?.region;

      const project = new codebuild.PipelineProject(this, 'Project-fast-api-test01');


      const pipeline = new codepipeline.Pipeline(this, 'Pipeline-fast-api-test01');
      const sourceOutput = new codepipeline.Artifact();
      const sourceAction = new codepipeline_actions.GitHubSourceAction({
        actionName: 'GitHub_Source',
        owner: 'kakakoi',
        repo: 'ecs-fargate',
        oauthToken: SecretValue.secretsManager('arn:aws:secretsmanager:ap-northeast-1:674115544340:secret:dev/github-token-codepipeline-kUNkg3'),
        output: sourceOutput,
        branch: 'main', // default: 'master'
      });

      pipeline.addStage({
        stageName: 'Source-fast-api-test01',
        actions: [sourceAction],
      });

      const buildAction = new codepipeline_actions.CodeBuildAction({
        actionName: 'CodeBuild-fast-api-test01',
        project,
        input: sourceOutput,
        environmentVariables: {
          COMMIT_URL: {
            value: sourceAction.variables.commitUrl,
          },
        },
      });

      pipeline.addStage({
        stageName: 'Build--fast-api-test01',
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

 class MyApplicationStage extends Stage {
    constructor(scope: Construct, id: string, props: StageProps) {
        super(scope, id, props);

        const service = new EcsFargateCdkStack(this, 'EcrStack', {
            env: {
                account: props.env?.account,
                region: props.env?.region,
            },
        });
    }
}