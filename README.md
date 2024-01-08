Run this command to test client code ----------

step 1: cd client.js step 2: npm i step 3: npm start

To Run the app Open [http://localhost:3000] to view it in the browser.

Run this command to test backend server -----------

step 1: cd server.js step 2: npm i step 3: npm start

To test api's use this curls -

For signup

curl --location 'http://localhost:3002/api/signup'
--header 'Content-Type: application/json'
--data-raw '{ "username": "Divya Nigam", "email": "divyanigam227@gmail.com", "password": "divya@123" } '

For login

curl --location 'http://localhost:3002/api/login'
--header 'Content-Type: application/json'
--data-raw '{ "email": "divyanigam227@gmail.com", "password": "divya@123" } '


For Book Publish

curl --location 'http://localhost:3002/api/books/publish' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTljMjgxNjU1NTMxNWYyMmNjZjYxNzYiLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzA0NzMyOTMwLCJleHAiOjE3MDQ3NjE3MzB9.-Rh9HFWChFN4tUdDSYhXj5ya2t4lGFXmNLfT6iCvITM' \
--header 'Content-Type: application/json' \
--data '{
  "title": "Sample Book published",
  "author": "Sample Author"
}
'

To Search published book with book name

curl --location 'http://localhost:3002/api/books/search?title=Sample%20Book' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTljMjgxNjU1NTMxNWYyMmNjZjYxNzYiLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzA0NzMyOTMwLCJleHAiOjE3MDQ3NjE3MzB9.-Rh9HFWChFN4tUdDSYhXj5ya2t4lGFXmNLfT6iCvITM'


To update the published book to unpublish

curl --location --request PUT 'http://localhost:3002/api/books/unpublish/659c295bee35bcf28589dc98' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTljMjgxNjU1NTMxNWYyMmNjZjYxNzYiLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzA0NzMyOTMwLCJleHAiOjE3MDQ3NjE3MzB9.-Rh9HFWChFN4tUdDSYhXj5ya2t4lGFXmNLfT6iCvITM' \
--header 'Content-Type: application/json' \
--data '{
     "title": "Sample Books",
     "author": "Sample Authors"
}'


To get specific user data 

curl --location 'http://localhost:3002/api/books/user' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTljMjgxNjU1NTMxNWYyMmNjZjYxNzYiLCJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzA0NzMyOTMwLCJleHAiOjE3MDQ3NjE3MzB9.-Rh9HFWChFN4tUdDSYhXj5ya2t4lGFXmNLfT6iCvITM'


To get all the published book of every author

curl --location 'http://localhost:3002/api/books/published'
