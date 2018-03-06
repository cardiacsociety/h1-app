import jwtDecode from 'jwt-decode'


// utility functions for jwt
export default {

  token: '',
  decoded: {},
  ttl: 0,

  // validate the token, and set token data values.
  // tokenString - a token (string) to validate
  // localStorageTokenKey - local storage key name for the token to validate
  // If both args are supplied validateToken will check that the token in local storage
  // matches the tokenString.
  validate(tokenString, localStorageTokenKey) {

    if (!tokenString && !localStorageTokenKey) {
      return false
    }

    if (localStorageTokenKey) {
      this.token = localStorage.getItem(localStorageTokenKey)
      // match?
      if (tokenString) {
        if (this.token != tokenString) {
          //console.log("validate() - tokenString does not match token in local storage")
          return false
        }
      }
    }

    // Only token string supplied as arg...
    if (tokenString) {
      this.token = tokenString
    }

    // decode the token
    try {
      this.decoded = jwtDecode(this.token)
      //console.log("validate() - decoded", this.decoded)
    }
    catch(e) {
     // console.log("validate() - could not decode", e)
      return false
    }

    this.ttl = calcTTL(this.decoded.exp)
    if (this.ttl > 0) {
      //console.log("validate() - ttl", this.ttl + " minutes")
      return true
    }

    // expired
    //console.log("validate() - token has expired")
    return false
  }
}

// calculate the time to live in minutes
function calcTTL(epochSeconds) {
  const now = Date.now()
  const expiry = epochSeconds * 1000 // convert to milliseconds
  let ttl = (expiry - now) / 1000 / 60  // back to minutes
  return ttl
}