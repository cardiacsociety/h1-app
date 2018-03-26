export const state = () => ({

  items: {
    CANNOT_EDIT_ACTIVITY: {
      title: "Cannot edit activity",
      explanation: "Older activities may not have an activity 'type' associated with them, and cannot be " +
      "edited directly. If you do need to alter these records create a new record, copy the original, and update as required. " +
      "Once the new record is created you can delete the old one.",
      more: "http://imaginary.link/to/full/docs",
      related: [123, 345, 678]
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
    // for (let i in state.items) {
    //   if (state.items.hasOwnProperty(i)) {
    //     console.log(i)
    //     if (i === name) {
    //       return state.items[i]
    //     }
    //   }
    // }
    // return {
    //   title: "Help item not found",
    //   explanation: "No help item with name " + name + " could be found."
    // }
  }
}


// export const getters = {
//
//   // faq fetches a single faq item and returns a nicely formatted object
//   faq(state) {
//
//   }
//
// }
