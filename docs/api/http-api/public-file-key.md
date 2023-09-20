# /public/file/:key

This endpoint provides a temporary signed URL for downloading a blob (Binary Large Object) associated with the specified `key`. The file must be marked as publicly accessible. You can check the accessibility in the admin dashboard.

## Request

### URL

```
GET /public/file/:key
```

### Path Parameters

- `key` (String): The unique identifier for the blob you wish to access.

### Query Parameters

- `accessKey` (String): A string that acts as an authentication token for accessing the blob.

## Response

### Success Response

**Status Code:** `200 OK`

**Response Body:**

```json
{
    "message": "ok",
    "url": "signed_url_here",
    "uuid": "key_here"
}
```

#### Fields:

- `message`: A string indicating the status of the operation. Returns `ok` if successful.
- `url`: The temporary signed URL for downloading the blob.
- `uuid`: The key of the blob.

### Error Response

**Missing `accessKey`**

**Status Code:** `400 Bad Request`

**Response Body:**

```json
{
    "message": "missing accessKey"
}
```

**Blob `key` Not Found**

**Status Code:** `404 Not Found`

**Response Body:**

```json
{
    "message": "key key_here not found"
}
```

**Internal Server Error**

**Status Code:** `500 Internal Server Error`

**Response Body:**

```json
{
    "message": "internal error, error message: error_description_here"
}
```

## Example

**Request:**

```
GET /public/file/some_unique_key?accessKey=some_access_key
```

**Successful Response:**

```json
{
    "message": "ok",
    "url": "https://some_signed_url.com",
    "uuid": "some_unique_key"
}
```

## Notes

- The signed URL expires in 30 minutes after it has been generated.
- The blob identified by `key` must be publicly accessible and mapped to the given `accessKey` to generate a signed URL.