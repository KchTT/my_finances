# Transaction Delete 

Delete selected transaction.

**URL** : `/api/v1/transactions/{id}`

**Method** : `DELETE`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a delete with ID 1234.

```json
{
    "id": 1234,
    "err": false
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