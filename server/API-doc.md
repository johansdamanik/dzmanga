# Challenge-1 API Documentation

## Endpoints :

List of available endpoints:

- `GET /chapter/:hash/:imageName`
- `GET /manga/chapter`
- `GET /cover/:mangaId/:imageId`
- `GET /manga/cover`
- `GET '/allmanga'`
- `GET /manga`
- `POST /midtrans-token`

### GET /chapter/:hash/:imageName

> Tunneling image from Mangadex

_Request Params_

```json
{
    "hash": <string>,
    "imageName": <string>
}
```

_Response (200 - OK)_

```json
    res.setHeader('Content-Type', 'image/jpeg')
```

---

### GET /manga/chapter

> Get image url by chapter id

_Request Query_

```json
{   
    "chapterId": <string>
}
```

_Response (200 - OK)_

```json
    {
        "id": <integer>,
        "imgUrl": <string>,
    }
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### GET /cover/:mangaId/:imageId

> Tunneling image cover from Mangadex

_Request Params_

```json
{
    "mangaId": <string>,
    "imageId": <string>
}
```

_Response (200 - OK)_

```json
    res.setHeader('Content-Type', 'image/jpeg');
    response.data.pipe(res)
```

---

### GET /manga/cover

> Get cover image from manga


_Request Query_

```json
{
    "mangaId": <string>,
    "coverId": <string>
}
```

_Response (200)_

```json
    coverImgUrl = <string>
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### GET /allmanga

> Get all manga list from user list on Mangadex


_Response (201 - Created)_

```json
{
  "id": <string>,
  "type": <string>,
  "attributes": {
    "name": <string>,
    "visibility": <string>,
    "version": <integer>
  },
  "relationships": [
    {
      "id": <string>,
      "type": <string>
    },
    {
      "id": <string>,
      "type": <string>
    },
    ...
  ]
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### GET /manga

> Get all manga's data from database

_Response (200)_

```json
[
  {
    "id": 1,
    "mangaData": <string>,
    "mangaTitle": <string>,
    "description": <string>,
    "coverId": <string>,
    "coverImgUrl": <string>,
    "status": <string>,
    "Chapters": [
      {
        "id": <integer>,
        "chapter": <string>,
        "chapterId": <string>,
        "MangaId": <integer>,
        "createdAt": <string>,
        "updatedAt": <string>
      },
      {
        "id": <integer>,
        "chapter": <string>,
        "chapterId": <string>,
        "MangaId": <integer>,
        "createdAt": <string>,
        "updatedAt": <string>
      },
      ...
    ],
    ...
  }
]

```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---

### POST /midtrans-token

> Payment gateway using Midtrans

_Request Body_

```json
{
    "email": <string>,
    "donation": <string>,
}
```


_Response (201)_

```json
{
    "token": <string>,
    "redirect_url": <string>
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal Server Error"
}
```

---