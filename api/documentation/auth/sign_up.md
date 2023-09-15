# Sign Up 

User sign up.

**URL** : `/api/user/sign_up`

**Method** : `POST`

**Auth required** : No

**Permissions required** : None

## Request Body

```json
{
    "name": "john",
    "lastname": "Joe",
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
    "message": "Your user is ready! You can login now..."
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