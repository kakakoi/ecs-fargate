#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const pipeline_stack_1 = require("../lib/pipeline-stack");
const app = new cdk.App();
const pipeAccount = process.env.CDK_DEFAULT_ACCOUNT;
const pipeRegion = 'ap-northeast-1';
// new EcsFargateCdkStack(app, 'EcsFargateCdkStack', {
//   /* If you don't specify 'env', this stack will be environment-agnostic.
//    * Account/Region-dependent features and context lookups will not work,
//    * but a single synthesized template can be deployed anywhere. */
//   /* Uncomment the next line to specialize this stack for the AWS Account
//    * and Region that are implied by the current CLI configuration. */
//    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
//   /* Uncomment the next line if you know exactly what Account and Region you
//    * want to deploy the stack to. */
//   // env: { account: '123456789012', region: 'us-east-1' },
//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });
new pipeline_stack_1.MyPipelineStack(app, 'MyPipelineStack', {
    env: { account: pipeAccount, region: pipeRegion },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNzLWZhcmdhdGUtY2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWNzLWZhcmdhdGUtY2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxxQ0FBcUM7QUFFckMsMERBQXdEO0FBRXhELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTFCLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7QUFDcEQsTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUM7QUFFcEMsc0RBQXNEO0FBQ3RELDRFQUE0RTtBQUM1RSw0RUFBNEU7QUFDNUUsc0VBQXNFO0FBRXRFLDRFQUE0RTtBQUM1RSx3RUFBd0U7QUFDeEUsZ0dBQWdHO0FBRWhHLCtFQUErRTtBQUMvRSx1Q0FBdUM7QUFDdkMsOERBQThEO0FBRTlELG1HQUFtRztBQUNuRyxNQUFNO0FBRU4sSUFBSSxnQ0FBZSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsRUFBRTtJQUMxQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUU7Q0FDbEQsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgRWNzRmFyZ2F0ZUNka1N0YWNrIH0gZnJvbSAnLi4vbGliL2Vjcy1mYXJnYXRlLWNkay1zdGFjayc7XG5pbXBvcnQgeyBNeVBpcGVsaW5lU3RhY2sgfSBmcm9tICcuLi9saWIvcGlwZWxpbmUtc3RhY2snO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuXG5jb25zdCBwaXBlQWNjb3VudCA9IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX0FDQ09VTlQ7XG5jb25zdCBwaXBlUmVnaW9uID0gJ2FwLW5vcnRoZWFzdC0xJztcblxuLy8gbmV3IEVjc0ZhcmdhdGVDZGtTdGFjayhhcHAsICdFY3NGYXJnYXRlQ2RrU3RhY2snLCB7XG4vLyAgIC8qIElmIHlvdSBkb24ndCBzcGVjaWZ5ICdlbnYnLCB0aGlzIHN0YWNrIHdpbGwgYmUgZW52aXJvbm1lbnQtYWdub3N0aWMuXG4vLyAgICAqIEFjY291bnQvUmVnaW9uLWRlcGVuZGVudCBmZWF0dXJlcyBhbmQgY29udGV4dCBsb29rdXBzIHdpbGwgbm90IHdvcmssXG4vLyAgICAqIGJ1dCBhIHNpbmdsZSBzeW50aGVzaXplZCB0ZW1wbGF0ZSBjYW4gYmUgZGVwbG95ZWQgYW55d2hlcmUuICovXG5cbi8vICAgLyogVW5jb21tZW50IHRoZSBuZXh0IGxpbmUgdG8gc3BlY2lhbGl6ZSB0aGlzIHN0YWNrIGZvciB0aGUgQVdTIEFjY291bnRcbi8vICAgICogYW5kIFJlZ2lvbiB0aGF0IGFyZSBpbXBsaWVkIGJ5IHRoZSBjdXJyZW50IENMSSBjb25maWd1cmF0aW9uLiAqL1xuLy8gICAgZW52OiB7IGFjY291bnQ6IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX0FDQ09VTlQsIHJlZ2lvbjogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfUkVHSU9OIH0sXG5cbi8vICAgLyogVW5jb21tZW50IHRoZSBuZXh0IGxpbmUgaWYgeW91IGtub3cgZXhhY3RseSB3aGF0IEFjY291bnQgYW5kIFJlZ2lvbiB5b3Vcbi8vICAgICogd2FudCB0byBkZXBsb3kgdGhlIHN0YWNrIHRvLiAqL1xuLy8gICAvLyBlbnY6IHsgYWNjb3VudDogJzEyMzQ1Njc4OTAxMicsIHJlZ2lvbjogJ3VzLWVhc3QtMScgfSxcblxuLy8gICAvKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9jZGsvbGF0ZXN0L2d1aWRlL2Vudmlyb25tZW50cy5odG1sICovXG4vLyB9KTtcblxubmV3IE15UGlwZWxpbmVTdGFjayhhcHAsICdNeVBpcGVsaW5lU3RhY2snLCB7XG4gIGVudjogeyBhY2NvdW50OiBwaXBlQWNjb3VudCwgcmVnaW9uOiBwaXBlUmVnaW9uIH0sXG59KTtcbiJdfQ==