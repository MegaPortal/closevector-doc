# /file/url

This API route is responsible for generating a signed URL to upload a blob to a specific location in the Cloud Storage. It takes various parameters from the request body and also checks for user authentication.

### Request

#### Headers

- `Authorization`: JWT Token (checked by `checkingJwtAuth` middleware)
  
#### Body

- `description`: (optional) Description of the blob file
- `visibility`: (optional) The visibility of the blob. Can be Public or Private
- `uuid`: (optional) UUID of the blob if it already exists. The blob will be overwritten if provided.

### Response

#### Success

- Status code: 200 OK
- Response body:

  ```json
  {
      "message": "ok",
      "url": "<signed_url>",
      "uuid": "<file_key>"
  }
  ```

### Error Responses

#### 500 Internal Server Error

- Response body:

  ```json
  {
      "message": "internal error, error message: <error_detail>"
  }
  ```
  
#### 403 Forbidden

- Response body:

  ```json
  {
      "message": "super key cannot create file"
  }
  ```
  
#### 404 Not Found

- Response body:

  ```json
  {
      "message": "key <file_key> not found"
  }
  ```
