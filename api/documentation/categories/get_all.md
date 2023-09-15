# Get Categories

Get all categories.

**URL** : `/api/v1/categories`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
    "err": false,
    "categories":{
        "id": 1,
        "operation": 0,
        "name": "",
        "status": 1
    }
}
```

## Error Response

**Condition** : If provided data is invalid, e.g. a name field is too long.

**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
    "err": true,
    "message": ""
}
```

## Notes

* Auth sending Authentication header With Bearer and the JWT.