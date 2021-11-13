# Text Campaigns Practice Project using Twilio, Express, and PostgreSQL

## Database

- Open a terminal instance and create a database: `createdb name_of_database`

- Run each block in the `twilio_express_postgresql_db@localhost.session.sql` file to create tables in the PostgreSQL database.

- Run `psql name_of_database` in a separate terminal window, then `\dt` to see the list of the newly created tables.

- Show a table in the database: `SELECT * from table_name;`

- Exit psql database interface: `\q`

## Routes

### usersRouter

- `POST /api/users/signup`: Signs the user up.

- `POST /api/users/login`: Logs the user in.

- `GET /api/users/current`: Gets the id of the current user.

- `DELETE /api/users/:id`: Deletes a specific user.

### campaignsRouter

- `POST /api/campaigns`: Create a new campaign.

- `POST /api/campaigns/:campaignId/add-text`: Add a text to a specific campaign.

- `POST /api/campaigns/:campaignId/enroll`: Enrolls array of contacts in a campaign.

- `GET /api/campaigns`: Get all campaigns associated with a specific user.

- `GET /api/campaigns/:campaignId`: Get all texts in a specific campaign.

- `PUT /api/campaigns/:campaignId`: Updates the name of a campaign.

- `DELETE /api/campaigns/:campaignId`: Deletes a campaign.

### contactsRouter

- `POST /api/contacts`: Creates a new contact.

- `GET /api/contacts`: Gets all contacts associated with a specific user.

- `GET /api/contacts/:contactId`: Gets a specific contact.

- `DELETE /api/contacts/:contactId`: Deletes a specific contact.
