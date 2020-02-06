import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { init } from '@rematch/core'
import { logger } from 'redux-logger'

import * as serviceWorker from './serviceWorker'
import * as models from './redux/models'

import App from './App'
import './index.css'

const redux = { middlewares: [logger] }

const store = init({
  models,
  redux,
  plugins: []
})

const ReduxContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  <ReduxContainer />,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
