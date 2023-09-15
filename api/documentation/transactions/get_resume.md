# Transaction Resume 

Get resume of transaccions grouping monthly.

**URL** : `/api/v1/transactions/month_resume`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
    "err": false,
    "resume": [
        {
        "code": "202301",
        "month": 1,
        "year": 2023,
        "incomes": 200.00,
        "incomes_q": 2,
        "expenses": 200.00,
        "expenses_q": 2,
        },
    ]
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