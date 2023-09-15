# Sign In 

Get JWT and basic user data.

**URL** : `/api/user/`

**Method** : `POST`

**Auth required** : No

**Permissions required** : None

## Request Body

```json
{
    "email": "joe25@example.com",
    "pass": "111111"
}
```

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
    "err": false,
    "message": "Login Ok!",
    "user": {
        "id":2,
        "email": "joe25@example.com",
        "name": "",
        "last_name": ""
    },
    "t":"JWT Token"
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

* Its send the token in "X-Auth-Token" header too.