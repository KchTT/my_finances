# Update Profile 

Update de profile data.

**URL** : `/api/v1/profile`

**Method** : `PUT`

**Auth required** : YES

**Permissions required** : None

## Request Body

```json
{
       
        "name": "",
        "lastname": "",
        "month_limit": 0
    
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "err": false,
    "profile": {
        "name": "",
        "lastname": "",
        "month_limit": 0
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