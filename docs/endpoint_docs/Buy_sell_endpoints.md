# Buy Feature API Documentation

## Endpoint

`/usercoins/buy`

## Method

`POST`

## Description

This endpoint allows users to buy a specific type of coin. It first checks if the user has enough funds to buy the requested amount of the coin. If the user has enough funds, it either adds the coin to the user's portfolio if it's not already there, or updates the amount of the coin in the portfolio.

## Request Parameters

- `user_id` (Required, Integer): The ID of the user making the purchase.
- `coin_id` (Required, Integer): The ID of the coin to be purchased.
- `amount` (Required, Numeric): The amount of the coin to be purchased.

## Request Body Example

```json
{
  "user_id": 1,
  "coin_id": 2,
  "amount": 5.5
}
```

## Responses

### 200 OK

This status code indicates that the coin purchase was successful. The response body contains a success message.

#### Response Body Example

```json
{
  "message": "Purchase successful."
}
```

### 400 Bad Request

This status code indicates that the purchase could not be completed, usually because the user doesn't have enough funds. The response body contains an error message.

#### Response Body Example

```json
{
  "message": "Insufficient funds."
}
```

### 500 Internal Server Error

This status code indicates that an error occurred on the server while processing the request. The response body contains an error message.

#### Response Body Example

```json
{
  "message": "An error occurred while processing your request."
}
```

## Usage

To use this endpoint, send a `POST` request to `/usercoins/buy` with the `user_id`, `coin_id`, and `amount` parameters in the request body. Make sure that the `user_id` and `coin_id` correspond to valid records in the database, and that the `amount` is a valid number.

Remember, this endpoint should be used in a secure context, and user authentication should be implemented to ensure that only authenticated users can make purchases.

Please ensure to handle the responses appropriately in your client-side code, informing the user of successful purchases or errors as necessary.