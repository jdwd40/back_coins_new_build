Sure, here's an example of how you might document the users endpoint in your API. Note that this is a simple, Markdown-based API documentation. For more complex APIs, you might want to consider using a tool like Swagger to create a more interactive documentation.

---

# Users API Endpoints

## `POST /api/user/login`

### Description
Authenticate a user and return a JWT token.

### Parameters
- `email` (string): The user's email.
- `password` (string): The user's password.

### Responses
- 200 OK: On successful login. Returns a JWT token.
- 400 Bad Request: If email or password is incorrect. Returns an error message.

---

## `POST /api/user/register`

### Description
Register a new user.

### Parameters
- `email` (string): The user's email. It must be unique.
- `password` (string): The user's password.
- `name` (string): The user's name.

### Responses
- 201 Created: On successful registration. Returns the newly created user object.
- 400 Bad Request: If the email already exists or if any of the fields are missing. Returns an error message.

---

## `GET /api/user/all`

### Description
Fetch all users.

### Parameters
None

### Responses
- 200 OK: On success. Returns an array of user objects.
- 500 Internal Server Error: If an error occurs while fetching the users. Returns an error message.

---

## `DELETE /api/user/delete/:user_id`

### Description
Delete a user by ID.

### Parameters
- `user_id` (integer): The ID of the user to delete.

### Responses
- 200 OK: On successful deletion. Returns a success message.
- 400 Bad Request: If the user_id is not valid. Returns an error message.
- 404 Not Found: If the user with the given ID does not exist. Returns an error message.
- 500 Internal Server Error: If an error occurs while deleting the user. Returns an error message.

---
