# Test Script for hw4-validation API

## Basic GET with pagination
curl "http://localhost:3000/contacts?page=1&perPage=5"

## GET with sorting (ascending by name)
curl "http://localhost:3000/contacts?sortBy=name&sortOrder=asc"

## GET with sorting (descending by name)
curl "http://localhost:3000/contacts?sortBy=name&sortOrder=desc"

## GET with filtering by contact type
curl "http://localhost:3000/contacts?type=work"

## GET with filtering by isFavourite
curl "http://localhost:3000/contacts?isFavourite=true"

## GET with combined parameters
curl "http://localhost:3000/contacts?page=1&perPage=3&sortBy=name&sortOrder=asc&type=personal"

## POST with valid data
curl -X POST "http://localhost:3000/contacts" \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "phoneNumber": "123-456-7890",
  "email": "john@example.com",
  "contactType": "work",
  "isFavourite": true
}'

## POST with invalid data (name too short)
curl -X POST "http://localhost:3000/contacts" \
-H "Content-Type: application/json" \
-d '{
  "name": "Jo",
  "phoneNumber": "123-456-7890",
  "contactType": "work"
}'

## PATCH with valid data (replace CONTACT_ID with actual ID)
curl -X PATCH "http://localhost:3000/contacts/CONTACT_ID" \
-H "Content-Type: application/json" \
-d '{
  "name": "Jane Doe",
  "isFavourite": false
}'

## PATCH with invalid ID
curl -X PATCH "http://localhost:3000/contacts/invalid-id" \
-H "Content-Type: application/json" \
-d '{
  "name": "Jane Doe"
}'

## GET contact by ID (replace CONTACT_ID with actual ID)
curl "http://localhost:3000/contacts/CONTACT_ID"

## GET contact with invalid ID
curl "http://localhost:3000/contacts/invalid-id"

## DELETE contact (replace CONTACT_ID with actual ID)
curl -X DELETE "http://localhost:3000/contacts/CONTACT_ID"