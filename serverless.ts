import type { AWS } from "@serverless/typescript";

import functions from "@functions/index";
import sns from "./src/resources/sns";

const serverlessConfiguration: AWS = {
  service: "ts-aws",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-central-1",
    stage: "dev",
    profile: "gpt",
    stackName: "${self:service}-stack-${sls:stage}",
    apiName: "${self:service}-${sls:stage}",
    timeout: 30,
    memorySize: 1024,
    endpointType: "regional",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ["${self:provider.apiName}-apikey"],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    allowedHttpHeaders:
      "Accept,Authorization,Content-Type,Content-Length,x-api-key",
  },
  resources: {
    Resources: {
      ...sns,
    },
  },
};

module.exports = serverlessConfiguration;
