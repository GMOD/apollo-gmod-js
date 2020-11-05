import React from 'react'
import './App.css'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'


const App = () => (
  <div className="App">
    <h3>Apollo 3 Web Services</h3>
    <SwaggerUI
      // url="https://api.mna.dev.spsapps.net/swagger/?format=openapi"
      url="http://localhost:8080/swagger/api/"
      responseInterceptor={response => {
        if (response.status !== 200) {
          console.error('There is an error in the response',response)
        }
        return response // this is what i needed to do.
      }}
    />
  </div>
)

export default App
