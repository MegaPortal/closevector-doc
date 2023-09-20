# /index/properties/:key

This section describes two endpoints for managing the properties of a Vector Index identified by a `key`. One is for updating properties (`PUT`), and the other is for retrieving them (`GET`).

## PUT `/index/properties/:key`

### Overview

Updates the properties of an existing Vector Index identified by `key`. The properties that can be updated are `description` and `visibility`.

### Request

#### URL

```
PUT /index/properties/:key
```

#### Path Parameters

- `key` (String): The unique identifier for the Vector Index you wish to update.

#### Headers

- `Authorization`: Bearer token (if using JWT for authentication)

#### Request Body

- `description` (String, optional): The new description for the index.
- `visibility` (Enum, optional): The new visibility setting for the index.

### Response

#### Success Response

**Status Code:** `200 OK`

**Response Body:**

```json
{
    "message": "ok",
    "properties": {
        "description": "new_description_here",
        "visibility": "new_visibility_here"
    }
}
```

## GET `/index/properties/:key`

### Overview

Retrieves the properties of an existing Vector Index identified by `key`.

### Request

#### URL

```
GET /index/properties/:key
```

#### Path Parameters

- `key` (String): The unique identifier for the Vector Index you wish to retrieve.

#### Headers

- `Authorization`: Bearer token (if using JWT for authentication)

### Response

#### Success Response

**Status Code:** `200 OK`

**Response Body:**

```json
{
    "message": "ok",
    "properties": {
        "description": "existing_description_here",
        "visibility": "existing_visibility_here"
    }
}
```

## Error Responses (For both PUT and GET)

### Internal Server Error

**Status Code:** `500 Internal Server Error`

**Response Body:**

```json
{
    "message": "internal error, error message: error_description_here"
}
```

### Key Not Found

**Status Code:** `404 Not Found`

**Response Body:**

```json
{
    "message": "key key_here not found"
}
```

## Notes

- Both endpoints authenticate the user either through JWT
