export default {
  EmployeeCreate: {
    Type: "AWS::SNS::Topic",
    Properties: {
      TopicName: "employee-create-topic-${sls:stage}",
    },
  },
};
