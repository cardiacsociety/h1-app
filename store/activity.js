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
        console.log(res)
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
        console.log(res)
        commit("setMemberActivities", res.data.data.member.activities)
      })
      .catch(err => {
        console.log(err)
      })
  },

  saveMemberActivity(ctx, {token, memberActivity}) {

    console.log("saveMemberActivity() in store...")
    console.log("token", token)
    console.log("memberActivity", memberActivity)

    const variables = {token: token}

    // id is optional and is flag for update or add. Can't pass null as a value so need to exclude id if it was
    // not passed in, or is falsey
    let query = `mutation Member($token: String!) {
                   member(token: $token) {
                     setActivity(obj: {` +
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

    let r = {
      url: graphqlUrl,
      method: "post",
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify({query, variables}),
    }

    this.$axios(r)
      .then((res) => {
        console.log("Member activity saved")
        console.log(res)
        // This is a bit inefficient but will do for now
        // console.log("Resetting the store...")
        // ctx.dispatch("fetchMemberActivities", token)
        //   .then((r2) => {
        //     console.log('Appeared to be successful')
        //     console.log(r2)
        //   })
        //   .catch((e2) => {
        //     console.log('An error occured')
        //     console.log(e2)
        //   })
        //commit("setMemberActivities", res.data.data.member.activities)
      })
      .catch((err) => {
        console.log(err)
      })
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