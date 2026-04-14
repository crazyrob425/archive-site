# archive-site
online digital bookstore

## database

This repo expects a MySQL-compatible database. The easiest free fit for the current Drizzle/MySQL schema is TiDB Cloud Serverless.

Use it for:

- users
- products
- orders
- order items
- cart items
- service bureau requests

The live Stripe checkout flow works without the database, but the database is what you need for saved orders and secure digital fulfillment.
