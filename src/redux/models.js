const initialState = {
  treeObject: {
    name: 'Root',
    id: 1,
    children: [
      {
        name: 'Elena',
        id: 2,
        children: []
      },
      {
        name: 'Simon',
        id: 3,
        children: [
          {
            name: 'Kostas',
            id: 4,
            children: []
          }
        ]
      }
    ]
  }
}

export const tree = {
  state: {
    ...initialState
  },
  reducers: {
    setList(state, payload) {
      state = {
        ...state,
        ...payload
      }

      return state
    }
  },
  effects: (dispatch) => ({
    setListAsync(payload) {
      dispatch.tree.setList({ treeObject: payload.newTree })
    }
  })
}
