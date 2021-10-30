# ECS-FARGATE (+CDK)

# Installation

```bash
node -v
npm -g install typescript
npm install -g aws-cdk

cdk --version
cdk bootstrap aws://<accountid>/<region>
aws sts get-caller-identity --profile <profilename>
aws configure get region
```

# Usage

```bash
cd ecs-fargate-cdk
cdk deploy
cdk destroy
```