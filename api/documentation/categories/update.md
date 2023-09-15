# Update Category 

Update Category.

**URL** : `/api/v1/categories/{id}`

**Method** : `PUT`

**Auth required** : YES

**Permissions required** : None

## Request Body

```json
{
        "operation": 0,
        "name": "",
        "status": 1
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "err": false,
    "category": {
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

* Auth sending Authentication header With Bearer and the JWT