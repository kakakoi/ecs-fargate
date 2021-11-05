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

# CDK

```bash
cd ecs-fargate-cdk
cdk deploy
cdk destroy
```

## Fastapi

```bash
cd app
uvicorn main:app --reload
```

## Dockerfile

```bash
 docker build -t ecs-fargate-fastpai .
 docker run -d --name fastapi -p 80:80  ecs-fargate-fastpai  
 docker ps -a
 docker stop <ID>
 docker rm <ID>
 docker images -a
 docker rmi <ID>
```