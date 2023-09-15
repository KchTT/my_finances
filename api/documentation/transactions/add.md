# Create Transaction 

Add a transaction.

**URL** : `/api/v1/transactions`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : None

## Request Body

```json
{
    "operation": -1,
    "id_category": 1,
    "date":"YYYY-MM-DD HH:mm:ss",
    "description": "",
    "amount": 0
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
    "err": false,
    "transaction": {
        "id": 1,
        "operation": -1,
        "id_category": 1,
        "date":"YYYY-MM-DD HH:mm:ss",
        "description": "",
        "amount": 0
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