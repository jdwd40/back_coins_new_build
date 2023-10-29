#!/bin/bash

# Start PostgreSQL
service postgresql start

# Seed the database
cd db/seeds/
node run-seed.js

# Start your app
npm run start
