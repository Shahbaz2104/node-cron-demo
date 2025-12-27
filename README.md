
# Advanced Cron Job with Node.js, Axios & Zod

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-9.x-blue)](https://www.npmjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

This repository demonstrates a **robust cron job setup** in Node.js that fetches API data, validates it using Zod, handles retries, and logs results. Perfect for testing scheduled tasks or building backend automation.

---

## Features

* ✅ Scheduled tasks using `node-cron`
* ✅ API requests with `axios`
* ✅ Data validation with **Zod** (supports nested schemas)
* ✅ Retry mechanism for failed requests
* ✅ Multiple endpoints support
* ✅ Console logging and optional file/database logging

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/advanced-cron.git
cd advanced-cron
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the cron job

```bash
node advanced-cron.js
```

You should see output like:

```
⏰ Cron job running at 10:02:00 AM
✅ Validated data: { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz', ... }
✅ Validated data: { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv', ... }
```

---

## Project Structure

```
advanced-cron/
├─ advanced-cron.js      # Main cron job script
├─ package.json          # Node.js dependencies
├─ README.md             # This file
└─ logs/                 # Optional folder for log files
```

---

## Usage

### Cron Schedule

* Default: **every 2 minutes**

```js
cron.schedule("*/2 * * * *", () => { ... });
```

* Standard cron expressions supported:

| Expression    | Description       |
| ------------- | ----------------- |
| `* * * * *`   | Every minute      |
| `*/5 * * * *` | Every 5 minutes   |
| `0 0 * * *`   | Daily at midnight |
| `@hourly`     | Every hour        |
| `@daily`      | Once a day        |

---

### Zod Validation

* Example schema:

```ts
const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zipcode: z.string()
});

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  address: AddressSchema,
  status: z.string()
});
```

* Invalid data triggers console errors.
* Ensures API data is **safe and structured**.

---

### Logging to a File

```js
import fs from "fs";

fs.appendFileSync("logs/cron-log.txt", JSON.stringify(validated) + "\n");
```

* Logs each validated record into a text file.
* Useful for auditing or debugging.

---

### Optional: Logging to a Database

```js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

await prisma.user.create({ data: validated });
```

* You can replace this with **MongoDB, MySQL, or Postgres**.
* Ideal for real backend cron jobs that store processed data.

---

### Multiple Endpoints

```js
const endpoints = [
  "https://jsonplaceholder.typicode.com/users/1",
  "https://jsonplaceholder.typicode.com/users/2"
];
```

* The script fetches and validates each endpoint.
* Retries up to 3 times for failed requests.

---

## Customization

* Change cron schedule
* Add/remove API endpoints
* Extend Zod schema for nested data
* Enable file/database logging

---

## License

MIT License © 2025

---
