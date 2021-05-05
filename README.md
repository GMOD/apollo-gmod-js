

![Node.js TSC Lint](https://github.com/GMOD/apollo-gmod-js/workflows/Node.js%20TSC%20Lint/badge.svg)
![Node.js CI](https://github.com/GMOD/apollo-gmod-js/workflows/Node.js%20CI/badge.svg)

## Apollo-gmod-js


This is a javascript library that interacts with the [Apollo 3](https://github.com/GMOD/Apollo3Server/) API.  

### Testing:

To run unit tests in watch mode:

    yarn **/*.unit.test.ts
    
To run server tests as well, run against [Apollo 3](https://github.com/GMOD/Apollo3Server/):

Using docker:

    docker run --memory=4g -d -p 8080:8080 -v `pwd`/apollo_shared_dir/:/data/ -e "WEBAPOLLO_DEBUG=true" quay.io/gmod/apollo3server:latest
    
    yarn test
 
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

To run without watch:

    yarn test:nowatch

   
## Configure for a separate server

If using a non local-host server set `APOLLO_URL`.  Default is 'http://localhost:8080':

     export APOLLO_URL=<some-other-server>


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


