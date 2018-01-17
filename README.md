# Install NodeJS, NPM
    $ sudo yum install nodejs npm --enablerepo=epel
# Install dependency package
    $ npm install
# Build 
    $ npm run build
# Start
    $ npm start
        then visit link :  http://0.0.0.0:8080/
# UNIT & UI TEST
    $ npm test
        PATH  js/__tests__/app.test.js
            ✓ check NYT API Alive 
            ✓ validates NYT JSON schema
            ✓ validates quantity of news per one page (= 10 articles)
            ✓ validate GGFont API
            ✓ validate components