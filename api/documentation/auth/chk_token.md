# Check Token Validation 

Check if JWT token is valid and not expired

**URL** : `/api/user/`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
    "err": false,
    "user": {
        "id": 1,
        "email": "",
        "name":"",
        "lastname":""
    },
    "message": "Valid Token"
}
```

## Error Response

**Condition** : If token is invalid.

**Code** : `401 UNAUTHORIZED`

## Notes

* Auth sending Authentication header With Bearer and the JWT