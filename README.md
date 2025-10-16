This is rbac-auth (Role Based Acces Control - Authentication and Authorization) backend system implemented using Node.js and Express.js.

# Notes (Some stuff needed to run this project):

1. .env file containing:

TOKEN_SECRET, REFRESH_TOKEN_SECRET, AND DATABASE_URL

Generate these using crypto module of node.js.
Something like this:

crypto.randomBytes(64).toString('hex');

2. Migrate the schema.prisma (prisma schema) to your postgresql DB.