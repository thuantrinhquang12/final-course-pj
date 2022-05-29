import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../src/routes/App'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store'
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />,
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,
)
