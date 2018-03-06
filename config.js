const config = {
  ALGOLIA_APP_ID: "MZQPVRPXFY",
  ALGOLIA_API_KEY: "b2870abe304ad95866629a6713fd6e91",
  ALGOLIA_RESOURCES_INDEX: "RESOURCES"
}

let REST_API_BASE_URL = ""
let GRAPHQL_API_BASE_URL = ""

if (process.env.NODE_ENV === 'production') {
  REST_API_BASE_URL = "https://mappcpd-csanz-web-services.herokuapp.com/v1"
  GRAPHQL_API_BASE_URL = "https://mappcpd-csanz-graphql.herokuapp.com/graphql"
} else {
  REST_API_BASE_URL = "http://localhost:5000/v1"
  GRAPHQL_API_BASE_URL = "http://localhost:5001/graphql"
}

config.API_URL_AUTH = REST_API_BASE_URL + "/auth/member"



module.exports = config
