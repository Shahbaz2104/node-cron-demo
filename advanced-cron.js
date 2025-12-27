import cron from "node-cron";
import axios from "axios";
import { z } from "zod";

// ----------------------
// 1. Define nested Zod schemas
// ----------------------
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

// ----------------------
// 2. Helper: fetch with retry
// ----------------------
async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      console.warn(`Attempt ${i + 1} failed for ${url}. Retrying in ${delay}ms...`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error(`Failed to fetch ${url} after ${retries} attempts`);
}

// ----------------------
// 3. Fetch and validate multiple endpoints
// ----------------------
async function fetchAndValidate() {
  const endpoints = [
    "https://jsonplaceholder.typicode.com/users/1",
    "https://jsonplaceholder.typicode.com/users/2"
  ];

  for (const url of endpoints) {
    try {
      const apiData = await fetchWithRetry(url);

      // Transform to match schema
      const data = {
        id: apiData.id,
        name: apiData.name,
        email: apiData.email,
        address: {
          street: apiData.address.street,
          city: apiData.address.city,
          zipcode: apiData.address.zipcode
        },
        status: "active" // dummy field
      };

      const validated = UserSchema.parse(data);
      console.log("✅ Validated data:", validated);

    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("❌ Validation error:", error.errors);
      } else {
        console.error("❌ Fetch error:", error.message);
      }
    }
  }
}

// ----------------------
// 4. Schedule cron job
// ----------------------
// Runs every 2 minutes
cron.schedule("*/2 * * * *", () => {
  console.log("⏰ Cron job running at", new Date().toLocaleTimeString());
  fetchAndValidate();
});
