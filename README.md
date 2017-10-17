# API TESTING #

Automation testing of the Api, including component, Service integration and System integration tests

#### Steps to run the tests locally ####

* unzip the folder API-Search

* open a CMD and go to the root directory 'API-Search'

* `npm i`

* `mocha test/search.system.js --reporter mochawesome --timeout 5000` which should make all tests pass and you should be able to check the results in terminal locally

* view the results in the browser by opening 'API-Search/mochawesome-report/mochawesome.html'