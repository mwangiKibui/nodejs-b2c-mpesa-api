### Implementing B2C payment via Mpesa API using Node.js

- Clone the repository.

- Ensure that you have the following installed on your computer:

  - [Node.js](https://nodejs.org/en/)
  - [Postman](https://www.postman.com/)
  - [Ngrok](https://ngrok.com/)
  - text editor

- Install the dependencies by running the following command from the terminal of your text editor:

```bash
npm install
```

- Attain `CONSUMER KEY` and `CONSUMER SECRET` from your safaricom developer portal and paste them appropriately in the `.env` file at the root of your project.

- Start the development server by running the following command:

```bash
npm run dev
```

- On a separate tab, start ngrok by running the following command:

```bash
npm run ngrok
```

- Copy the HTTPS URL logged on your console and paste it appropriately on your `.env` file.

- Head over to postman and send a `POST` request to `http://localhost:4000/b2c`.

- Congratulations !!!
