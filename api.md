## API Routes Documentation

### Base URL
http://localhost:3000




### Users

#### GET /users 
- example call 
- curl -X GET http://localhost:3000/users

- Description: Retrieves all users.
- Response:
  - 200: Success. Returns an array of user objects.
  - 404: Not Found. If no users are found.

#### GET /users/:id

- Description: Retrieves a specific user by their ID.
- Parameters:
  - `id` (string): The ID of the user.
- Response:
  - 200: Success. Returns the user object.
  - 404: Not Found. If the user with the given ID does not exist.

### Parking Spots

#### GET /parkingSpots

- Description: Retrieves all parking spots.
- Response:
  - 200: Success. Returns an array of parking spot objects.
  - 404: Not Found. If no parking spots are found.

#### GET /parkingSpots/:id

- Description: Retrieves a specific parking spot by its ID.
- Parameters:
  - `id` (string): The ID of the parking spot.
- Response:
  - 200: Success. Returns the parking spot object.
  - 404: Not Found. If the parking spot with the given ID does not exist.

#### POST /parkingSpots

- Description: Creates a new parking spot.
- Request Body:
  - JSON object representing the parking spot to be created.
- Response:
  - 200: Success. Returns the created parking spot object.
  - 400: Bad Request. If the request body is invalid.

### Reservations

#### GET /reservations

- Description: Retrieves all reservations.
- Response:
  - 200: Success. Returns an array of reservation objects.
  - 404: Not Found. If no reservations are found.

#### GET /reservations/:id

- Description: Retrieves a specific reservation by its ID.
- Parameters:
  - `id` (string): The ID of the reservation.
- Response:
  - 200: Success. Returns the reservation object.
  - 404: Not Found. If the reservation with the given ID does not exist.

### Parking Lots

#### GET /parkingLots

- Description: Retrieves all parking lots.
- Response:
  - 200: Success. Returns an array of parking lot objects.
  - 404: Not Found. If no parking lots are found.

#### GET /parkingLots/:id

- Description: Retrieves a specific parking lot by its ID.
- Parameters:
  - `id` (string): The ID of the parking lot.
- Response:
  - 200: Success. Returns the parking lot object.
  - 404: Not Found. If the parking lot with the given ID does not exist.

#### POST /parkingLots

- Description: Creates a new parking lot.
- Request Body:
  - JSON object representing the parking lot to be created.
- Response:
  - 200: Success. Returns the created parking lot object.
  - 400: Bad Request. If the request body is invalid.

### Availability

#### GET /availability

- Description: Retrieves all available parking spots.
- Response:
  - 200: Success. Returns an array of available parking spot objects.
  - 404: Not Found. If no available parking spots are found.

#### POST /availability/available-spots

- Description: Finds available parking spots based on certain criteria.
- Request Body:
  - JSON object containing criteria for finding available parking spots.
- Response:
  - 200: Success. Returns an array of available parking spot objects.
  - 400: Bad Request. If the request body is invalid.
