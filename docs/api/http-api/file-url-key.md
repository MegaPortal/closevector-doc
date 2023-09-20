# /file/url/:key

This endpoint allows you to retrieve a signed URL for downloading a blob. The URL is signed for security and will expire in 30 minutes.

## GET `/file/url/:key`

### Overview

Retrieves a signed URL for downloading a blob, identified by `key`.

### Request

#### URL

```
GET /file/url/:key
```

#### Path Parameters

- `key` (String): The unique identifier for the blob you wish to download.

#### Headers

- `Authorization`: Bearer token (if using JWT for authentication)

### Response

#### Success Response

**Status Code:** `200 OK`

**Response Body:**

```json
{
    "message": "ok",
    "url": "signed_url_here"
}
```

#### Error Responses

##### Internal Server Error

**Status Code:** `500 Internal Server Error`

**Response Body:**

```json
{
    "message": "internal error, error message: error_description_here"
}
```

##### Key Not Found

**Status Code:** `404 Not Found`

**Response Body:**

```json
{
    "message": "key key_here not found"
}
```

## Notes

- The endpoint authenticates the user either through JWT or `accessKey`.
- The URL will expire in 30 minutes.
