# Get Transactions

Get user transactions segment using parameter.

**URL** : `/api/v1/transactions/{from}/{to}/{operation}/{id_category}/{id?}`

- from: Datetime or 0 for all
- to: Datetime or 0 for all
- operation: 1 Incomes, -1 Expenses or 0 for all
- id_category: int or 0 for all
- id: int [OPTIONAL]

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
    "err": false,
    "transactions":[
        {
            "id": 1,
            "operation": -1,
            "id_category": 1,
            "date":"YYYY-MM-DD HH:mm:ss",
            "description": "",
            "amount": 0,
            "category_name": "",
            "date_label":"",
        }
    ]
}
```

For a user with ID 4321 on the local database but no details have been set yet.

```json
{
    "id": 4321,
    "first_name": "",
    "last_name": "",
    "email": ""
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