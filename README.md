<h1 align="center">Pizza shop API</h1>

## Introduction

#### This project is a part of the ReactJS course from [Rocketseat](https://www.rocketseat.com.br/).

#### This project was built with Bun, TypeScript, Drizzle and ElysiaJS.

<p>The routes provide by this API allow a application of a store to handle with orders and check the finance result with metrics. This API doesn't have a route to create orders, there is fake data is provided to test this back-end and a manager account is created with the email:</p>

**admin@admin.com**

## Front-End

[Pizza Shop WEB](https://github.com/andresilveira1/pizza-shop-web)

## Features

- Register a store.
- Login with magic link (the link will be sent to console.log).
- Update store profile.
- Orders List.
- Orders details.
- Change order status.
- Total revenue by period.
- Total revenue on the current month and a comparison with previous month.
- Total orders on current day and a comparison with previous day.
- Total orders on the current month and a comparison with previous month.
- Total revenue on the current month and a comparison with previous month.
- Total orders canceled on the current month and a comparison with previous month.
- Most popular products.

## Run

#### To run Docker is needed.

```bash
  git clone https://github.com/andresilveira1/pizza-shop-api.git

  bun install

  docker compose up -d

  bun migrate

  bun seed

  bun dev
```

<br>

## HTTP

### Sign in

#### POST`/authenticate`

```json
{
  "email": "admin@admin.com"
}
```

#### GET`/auth-links/authenticate`

```
  The authenticate link is sent to console.log and a cookie will be available.
```

#### GET`/me`

```json
{
  "id": "x5wp1fb1uud0z04gniqra4wi",
  "name": "User name",
  "email": "email@example.com",
  "phone": null,
  "role": "manager",
  "createdAt": "2024-08-08T21:13:28.749Z",
  "updatedAt": "2024-08-08T21:13:28.749Z"
}
```

#### POST`/restaurants`

```json
{
  "restaurantName": "Store name",
  "managerName": "Manager name",
  "email": "email@example.com",
  "phone": "987654321"
}
```

#### PUT`/update-restaurant-profile`

```json
{
  "name": "Store name",
  "description": "Store description"
}
```

#### GET`/managed-restaurant`

```json
{
  "id": "ubp1v6dzg9kmjkhmcptwxd8i",
  "name": "Store name",
  "description": "Store description",
  "managerId": "x5wp1fb1uud0z04gniqra4wi",
  "createdAt": "2024-08-08T21:13:28.754Z",
  "updatedAt": "2024-08-08T21:13:28.754Z"
}
```

#### GET`/orders`

```http
get orders with query, a max of 10 orders per page.

name: orderId
value: e9ecfsk65bak2tztnnmwdhdc

name: customerName
value: Name example

name: status
value: pending | processing | delivering | delivered | canceled

name: pageIndex
value: 1
```

#### GET`/orders/:orderId`

```json
{
  "id": "l31t4onrliipwkkx5hpcqtns",
  "status": "processing",
  "totalInCents": 235,
  "createdAt": "2024-08-07T23:01:15.324Z",
  "customer": {
    "name": "Name example",
    "phone": null,
    "email": "email@example.com"
  },
  "ordersItems": [
    {
      "id": "pxq96pfk0mu9gb9id56ha02i",
      "priceInCents": 235,
      "quantity": 1,
      "product": {
        "name": "Example"
      }
    }
  ]
}
```

#### PATCH`/orders`

```http
Update order status.

/orders/:orderId/dispatch

/orders/:orderId/delivered

/orders/:orderId/cancel

/orders/:orderId/approve
```

#### GET`/metrics`

```http
/metrics/daily-revenue-in-period

/metrics/month-revenue

/metrics/day-orders-amount

/metrics/month-orders-amount

/metrics/month-canceled-orders-amount

/metrics/popular-products
```

<br>

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
