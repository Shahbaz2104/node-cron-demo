
---

# Advanced Cron Job with Node.js, Axios & Zod

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-9.x-blue)](https://www.npmjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

This repository demonstrates a **robust cron job setup** in Node.js that fetches API data, validates it using Zod, handles retries, and **saves results to a JSON file** for persistent logging. Ideal for testing scheduled tasks or backend automation.

---

## Features

* ✅ Scheduled tasks using `node-cron`
* ✅ API requests with `axios`
* ✅ Data validation with **Zod** (supports nested schemas)
* ✅ Retry mechanism for failed requests
* ✅ Multiple endpoints support
* ✅ Persistent logging to a JSON file (`logs/validated-data.json`)
* ✅ Console logging of success and errors

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
node persistent-cron.js
```

You should see output like:

```
⏰ Cron job running at 10:04:00 AM
✅ Validated & saved: { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz', ... }
✅ Validated & saved: { id: 2, name: 'Ervin Howell', email: 'Shanna@melissa.tv', ... }
```

---

## Project Structure

```
advanced-cron/
├─ persistent-cron.js       # Main cron job script
├─ package.json             # Node.js dependencies
├─ README.md                # This file
└─ logs/                    # Folder for persistent JSON logging
    └─ validated-data.json  # Stores all validated API responses
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

* Example nested schema:

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
* Ensures API responses are **safe and structured**.

---

### JSON File Logging

* Validated data is stored persistently in `logs/validated-data.json`:

```js
import fs from "fs-extra";
const existingData = await fs.readJson("logs/validated-data.json").catch(() => []);
existingData.push(validated);
await fs.writeJson("logs/validated-data.json", existingData, { spaces: 2 });
```

* Each cron run appends new validated entries.
* Useful for testing persistent tasks without a database.

---

### Optional: Logging to a Database

```js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

await prisma.user.create({ data: validated });
```

* Replace JSON file logging with any database: MongoDB, Postgres, MySQL, etc.

---

### Multiple Endpoints

```js
const endpoints = [
  "https://jsonplaceholder.typicode.com/users/1",
  "https://jsonplaceholder.typicode.com/users/2"
];
```

* The script fetches, validates, and logs each endpoint.
* Retries up to 3 times on failure.

---

## Customization

* Change cron schedule
* Add/remove API endpoints
* Extend Zod schema for nested or complex data
* Enable file or database logging

---

## License

MIT License © 2025

---

