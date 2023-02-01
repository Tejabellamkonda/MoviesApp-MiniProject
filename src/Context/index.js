import React from 'react'

const SavedContext = React.createContext({
  username: '',
  password: '',
  save: () => {},
})

export default SavedContext
