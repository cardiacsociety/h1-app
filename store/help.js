export const state = () => ({

  items: {

    CANNOT_EDIT_ACTIVITY: {
      title: "Cannot edit activity",
      explanation: "Older activities may not have an activity 'type' associated with them, and cannot be " +
      "edited directly. You can create a copy with the required changes, and then delete the original.",
      more: "http://imaginary.link/to/full/docs",
      related: [123, 345, 678]
    },

    PRACTICE_REVIEW_IMPROVEMENT_TYPES: {
      title: "Practice Review and Improvement",
      explanation: "This includes activities such as...",
    },

    NOT_FOUND: {
      title: "Help item not found",
      explanation: "No help item with name " + name + " could be found."
    }
  }
})

export const actions = {

  fetchItem({state}, name) {
    console.log(state.items[name])
    return state.items[name]
  }
}
