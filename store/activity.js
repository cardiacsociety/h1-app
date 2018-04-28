const graphqlUrl = process.env.GRAPHQL_API_BASE_URL
const restUrl = process.env.REST_API_BASE_URL

export const state = () => ({

  // currentEvaluation is an object that represents a summary report of the current activity evaluation period
  currentEvaluation: {},

  // activityTypes is a list of the types of activity available for selection
  activityTypes: [],

  // memberActivities is a list of all of the activities recorded by the member
  memberActivities: [],

  // (EXPERIMENTAL)
  selectedMemberActivityId: null,

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

  setSelectedMemberActivityId(state, id) {
    state.selectedMemberActivityId = id
  }


}

export const actions = {

  fetchCurrentEvaluation(ctx) {

    const variables = {token: ctx.rootState.session.token.jwt}

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
        ctx.commit("setCurrentEvaluation", res.data.data.member.evaluation)
      })
      .catch(err => {
        console.log(err)
      })

  },

  fetchActivityTypes(ctx) {

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
        ctx.commit("setActivityTypes", res.data.data.activities)
      })
      .catch(err => {
        console.log(err)
      })
  },

  fetchMemberActivities(ctx) {

    console.log("Fetch member activities")

    const variables = {token: ctx.rootState.session.token.jwt}

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
        ctx.commit("setMemberActivities", res.data.data.member.activities)
      })
      .catch(err => {
        console.log(err)
      })
  },

  saveMemberActivity(ctx, memberActivity) {

    const variables = {token: ctx.rootState.session.token.jwt}

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
    query = query.replace(/(\r\n\t|\n|\r\t)/gm, " ")
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

  deleteMemberActivity(ctx, id) {

    const variables = {
      token: ctx.rootState.session.token.jwt,
      id: id
    }

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
  },

  currentActivityReport(ctx) {

    let r = {
      url: restUrl + "/m/reports/cpd/current",
      method: "get",
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': 'Bearer ' + ctx.rootState.session.token.jwt
      },
    }

    return this.$axios(r)
  },

  currentActivityReportEmail(ctx) {

    let r = {
      url: restUrl + "/m/reports/cpd/current/emailer",
      method: "get",
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': 'Bearer ' + ctx.rootState.session.token.jwt
      },
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

  selectedMemberActivity(state) {
    for (let i = 0; i < state.memberActivities.length; i++) {
      if (state.memberActivities[i].id === state.selectedMemberActivityId) {
        return state.memberActivities[i]
      }
    }
  }

}
