import React from 'react'
import './App.css'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'


function App() {
  return (
    <div className="App">
      <body>
        <SwaggerUI
          // url="https://api.mna.dev.spsapps.net/swagger/?format=openapi"
          url="http://localhost:8080/swagger/api/"
          responseInterceptor={response => {
            if (response.status === 200) {
              console.log(response.data)
            }
            return response // this is what i needed to do.
          }}
        />
      </body>
    </div>
  )
}

export default App
