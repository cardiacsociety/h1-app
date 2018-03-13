import Config from '~/config'

const graphqlUrl = Config.GRAPHQL_API_BASE_URL

export const state = () => ({
  activityTypes: [],
  memberActivities: [],
})

export const mutations = {

  setActivityTypes(state, types) {
    state.activityTypes = types
  },

  setMemberActivities(state, memberActivities) {
    state.memberActivities = memberActivities
  },
}

export const actions = {

  setActivityTypes({commit}) {

    let query = `query {
              activities {
                id
                name
                code
                types {
                  id
                  name
                }
              }
            }`

    let r = {
      url: graphqlUrl,
      method: "post",
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify(query),
    }

    this.$axios(r)
      .then(res => {
        // todo - prob only need to repeat this if the values are absent as they rarely change
        // axios returns a 'data' object, and the GraphQL server does too - that's why :)
        commit("setActivityTypes", res.data.data.activities)
      })
      .catch(err => {
        console.log(err)
      })
  },

  fetchMemberActivities({commit}, token) {

    let query = `query ($token: String!) {
                   member(token: $token) {
                     id 
                     activities {
                       id,
                       date,
                       credit,
                       description,
                       activity,
                       type
                     }
                   }
                 }`
    const variables = {token: token}

    let r = {
      url: graphqlUrl,
      method: "post",
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify({query, variables}),
    }

    this.$axios(r)
      .then(res => {
        console.log(res)
        commit("setMemberActivities", res.data.data.member.activities)
      })
      .catch(err => {
        console.log(err)
      })
  },


}

export const getters = {

  // activitiesFlatArray creates an array with the key set to the activity type id, and the value to the
  // (parent) activity id. eg [1:20, 2:20, 3:20..., 10:21, 11:21, 12:21....]
  // This is for convenience when needing to set the activity id from the selected activity type id.
  activitiesFlatArray(state) {

    let a = []

    for (let i in state.activityTypes) {
      if (state.activityTypes.hasOwnProperty(i)) {
        const activityId = state.activityTypes[i].id
        const types = state.activityTypes[i].types
        types.forEach(t => {
          a[t.id] = activityId
        })
      }
    }

    return a
  }

}
