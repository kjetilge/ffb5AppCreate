const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const graphqlEndpoint = require("./aws-exports").aws_appsync_graphqlEndpoint
const apiKey = require("./aws-exports").aws_appsync_apiKey

const request = async (requestVariables) => {
  const { graphqlQuery, variables, operationName} = requestVariables
  const q = gql`${graphqlQuery}`
  let graphqlData
  // console.log('q:\n', q)
  try {
    graphqlData = await axios({
      url: graphqlEndpoint,
      method: 'post',
      headers: {
        'x-api-key': apiKey
      },
      data: {
        query: print(q),
        variables: variables
      }
    });

    const { data: { data, errors } } = graphqlData
    if(errors) {
      console.log('Feil:', errors)
      return null
    } else {
      // console.log(JSON.stringify(data))
      return data
    }

  } catch (err) {
    console.log( 'err', err)
  }
}

exports.request = request
