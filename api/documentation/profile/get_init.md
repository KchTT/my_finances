# Profile Init 

Get initial data when the user sign in.

**URL** : `/api/v1/profile`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**


```json
{
    "err":false,
    "profile": {
        "name": "",
        "lastname": "",
        "month_limit": 0
    },
    "categories":[
        {
        "id": 1,
        "operation": 0,
        "name": "",
        "status": 1
        },
    ]
}
```

## Notes

* Auth sending Authentication header With Bearer and the JWT