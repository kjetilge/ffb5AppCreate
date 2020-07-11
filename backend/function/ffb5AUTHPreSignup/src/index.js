/*
  this file will loop through all js modules which are uploaded to the lambda resource,
  provided that the file names (without extension) are included in the "MODULES" env variable.
  "MODULES" is a comma-delimmited string.
*/
const request = require('./appsyncRequester-axios').request

exports.handler = async (event, context, callback) => {

  const skolekode = event.request.userAttributes.zoneinfo
  const operationName = 'listCategorys'

  const graphqlQuery = `query getLicense($id: ID!) {
    getLicense(id:  $id) {
      id
    }
  }`

  const requestVariables = {
    graphqlQuery: graphqlQuery,
    operationName: operationName,
    variables: {
      id: skolekode
    }
  }

  const res = await request(requestVariables)

  if (res.getLicense) {
    const foundSkolekode = res.getLicense.id
    console.log('foundSkolekod', foundSkolekod)
    callback(null, event);
  } else {
    console.log('err res', res)
    const error = new Error('Ugyldig skolekode')
    callback(error, null);
  }

}
