# yupi API Documentation

This document provides detailed information about all available endpoints in the Yupi API.

## Table of Contents

- [Blog Management](#blog-management)
  - [Get Posts](#get-posts)
  - [Get Post by Slug](#get-post-by-slug)

## Blog Management

### Get Posts

Get all published blog posts. Supports pagination and filtering.

**URL**: `/blog`  
**Method**: `GET`  
**Auth required**: No  

**Query Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `skip` | integer | Number of posts to skip (default: 0) |
| `limit` | integer | Number of posts per page (default: 3) |
| `search` | string | Search query to filter posts by title or content |
| `tag` | string | Filter posts by tag (case-insensitive) |
| `published_status` | string | Filter by publication status: 'published' (default), 'unpublished', or 'all' |
| `use_rag` | boolean | When true and search is provided, uses vector search with OpenAI embeddings (default: false) |

**Success Response**: `200 OK`
```json
{
  "items": [
    {
      "post_id": 0,
      "title": "string",
      "excerpt": "string",
      "reading_time": 0,
      "tags": ["string"],
      "author": {
        "user_id": 0,
        "username": "string",
        "email": "string"
      },
      "created_at": "2023-01-01T00:00:00.000Z",
      "slug": "string",
      "published": true
    }
  ],
  "total_count": 0,
  "has_more": false,
  "limit": 3,
  "skip": 0
}
```

**Error Responses**:
- `422 Unprocessable Entity` - Invalid query parameters

### Get Post by Slug

Get a specific blog post by its slug.

**URL**: `/blog/{slug}`  
**Method**: `GET`  
**Auth required**: No  
**Status Code**: `200 OK`

**URL Parameters**:
- `slug` - The slug of the post to retrieve

**Success Response**: `200 OK`
```json
{
  "post_id": 0,
  "uuid": "string",
  "title": "string",
  "slug": "string",
  "content": "string",
  "excerpt": "string",
  "tags": ["string"],
  "reading_time": 0,
  "published": true,
  "created_at": "2023-01-01T00:00:00.000Z",
  "updated_at": "2023-01-01T00:00:00.000Z",
  "author": {
    "user_id": 0,
    "username": "string",
    "email": "string"
  }
}
```

**Error Responses**:
- `404 Not Found` - Post not found