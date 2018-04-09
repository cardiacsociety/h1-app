import Config from '~/config'

const graphqlUrl = Config.GRAPHQL_API_BASE_URL

export const state = () => ({

  // currentEvaluation is an object that represents a summary report of the current activity evaluation period
  currentEvaluation: {},

  // activityTypes is a list of the types of activity available for selection
  activityTypes: [],

  // memberActivities is a list of all of the activities recorded by the member
  memberActivities: [],
})

export const mutations = {

  setCurrentEvaluation(state, evaluation) {
    state.currentEvaluation = evaluation
  },

  setActivityTypes(state, types) {
    state.activityTypes = types
  },

  setMemberActivities(state, memberActivities) {
    state.memberActivities = memberActivities
  },
}

export const actions = {

  fetchCurrentEvaluation({commit}, token) {

    const variables = {token: token}

    const query = `query MemberUser($token: String!) {
                     member(token: $token) {
                       evaluation {
                         name
                         startDate
                         endDate
                         creditObtained
                         creditRequired
                       }
                     }
                   }`
    let r = {
      url: graphqlUrl,
      method: "post",
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify({query, variables}),
    }

    this.$axios(r)
      .then(res => {
        commit("setCurrentEvaluation", res.data.data.member.evaluation)
      })
      .catch(err => {
        console.log(err)
      })

  },

  fetchActivityTypes({commit}) {

    let query = `query Activities {
              activities {
                id
                name
                code
                categoryId
                categoryName
                unitId
                unitName
                creditPerUnit
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
      data: JSON.stringify({query}),
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

    const variables = {token: token}

    let query = `query ($token: String!) {
                   member(token: $token) {
                     id 
                     activities {
                       id
                       date
                       description
                       activity
                       activityId
                       type
                       typeId
                       quantity
                       creditPerUnit
                       credit
                     }
                   }
                 }`

    let r = {
      url: graphqlUrl,
      method: "post",
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify({query, variables}),
    }

    this.$axios(r)
      .then(res => {
        commit("setMemberActivities", res.data.data.member.activities)
      })
      .catch(err => {
        console.log(err)
      })
  },

  saveMemberActivity(ctx, {token, memberActivity}) {

    const variables = {token: token}

    // id is optional and is flag for update or add. Can't pass null as a value so need to exclude id if it was
    // not passed in, or is falsey
    let query = `mutation Member($token: String!) {
                   member(token: $token) {
                     saveActivity(obj: {` +
                      (memberActivity.id ? `id: ${memberActivity.id}` : ``) +
                      `date: "${memberActivity.date}"
                      description: "${memberActivity.description}"
                      quantity: ${memberActivity.quantity}
                      typeId: ${memberActivity.typeId}
                     }) 
                     {
                      id
                      credit
                     }
                   }
                 }`

    // replace newlines with a space - newlines in template literal will break the GraphQl query string
    // todo this should be a global function
    query = query.replace(/(\r\n\t|\n|\r\t)/gm," ")
    // .. and extra white spaces
    query = query.replace(/\s\s+/g, ' ')


    let r = {
      url: graphqlUrl,
      method: "post",
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify({query, variables}),
    }

    return this.$axios(r)
  },

  deleteMemberActivity(ctx, {token, id}) {

    const variables = {token: token, id: id}

    let query = `mutation Member($token: String!, $id: Int) {
                   member(token: $token) {
                     deleteActivity(id: $id)
                   }
                 }`

    let r = {
      url: graphqlUrl,
      method: "post",
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify({query, variables}),
    }

    return this.$axios(r)
  }

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
  },

}
