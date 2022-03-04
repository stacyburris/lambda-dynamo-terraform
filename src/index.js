let AWS = require('aws-sdk');
let dynamo = new AWS.DynamoBD.DocumentClient();

// lambda handler function
exports.handler = function (event, context, callback) {

  // when you send a request it needs to include operation, (get, put, delete) 
  // tableName - the name of the table you want to perform the operation on
  // payload - the data you want to inset of read from the table
  // These will be parsed by the lambda function and perform as defined
  let operation = event.operation;
  if (event.tableName) {
    event.payload.TableName = event.tableName;
  }
  switch (operation) {
    case 'create':
      dynamo.put(event.payload, callback);
      break;
    case 'read':
      dynamo.get(event.payload, callback);
      break;
    default:
      callback(`Unknown operation: ${operation}`);
  }
}