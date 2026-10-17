import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { once } from "node:events";

process.env.SKILLSCAN_GENAI_API_KEY ||= "test-key";
const { default: app } = await import("./app.js");

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await once(server, "listening");
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("health route responds successfully", async () => {
  const response = await fetch(baseUrl);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "Success");
});

test("registration rejects missing credentials", async () => {
  const response = await fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });

  assert.equal(response.status, 400);
});

test("interview report routes require authentication", async () => {
  const listResponse = await fetch(`${baseUrl}/api/interview/`);
  const detailResponse = await fetch(
    `${baseUrl}/api/interview/report/507f1f77bcf86cd799439011`
  );

  assert.equal(listResponse.status, 401);
  assert.equal(detailResponse.status, 401);
});
