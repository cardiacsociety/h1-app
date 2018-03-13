let config = {}

// API
config.REST_API_BASE_URL = "http://localhost:5000/v1"
config.GRAPHQL_API_BASE_URL = "http://localhost:5001/graphql"
if (process.env.NODE_ENV === 'production') {
  config.REST_API_BASE_URL = "https://mappcpd-csanz-web-services.herokuapp.com/v1"
  config.GRAPHQL_API_BASE_URL = "https://mappcpd-csanz-graphql.herokuapp.com/graphql"
}

// Algolia
config.ALGOLIA_APP_ID = "MZQPVRPXFY"
config.ALGOLIA_API_KEY = "b2870abe304ad95866629a6713fd6e91"
config.ALGOLIA_RESOURCES_INDEX = "RESOURCES"

// Endpoints
config.API_URL_AUTH = config.REST_API_BASE_URL + "/auth/member"


module.exports = config
