import { test, expect } from '@playwright/test';

// A known valid ISBN from demoqa's book catalog
const SAMPLE_ISBN = '9781449325862';

test('list books, add to collection, delete book, delete user', async ({ request }) => {
  const username = `manoj_${Date.now()}`;
  const password = 'StrongP@ssw0rd123';

  // --- Setup: create user + get token (from before) ---
  const createResponse = await request.post('https://demoqa.com/Account/v1/User', {
    data: { userName: username, password },
  });
  expect(createResponse.status()).toBe(201);
  const { userID } = await createResponse.json();

  const tokenResponse = await request.post('https://demoqa.com/Account/v1/GenerateToken', {
    data: { userName: username, password },
  });
  const { token } = await tokenResponse.json();
  expect(token).toBeTruthy();

  // --- 1. GET all books (public, no auth needed) ---
  const booksResponse = await request.get('https://demoqa.com/BookStore/v1/Books');
  expect(booksResponse.status()).toBe(200);
  const catalog = await booksResponse.json();
  console.log('Total books available:', catalog.books.length);
  expect(catalog.books.length).toBeGreaterThan(0);

  // --- 2. POST - add a book to this user's collection ---
  const addResponse = await request.post('https://demoqa.com/BookStore/v1/Books', {
    data: {
      userId: userID,
      collectionOfIsbns: [{ isbn: SAMPLE_ISBN }],
    },
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('Add book status:', addResponse.status());
  console.log('Add book body:', await addResponse.json());
  expect(addResponse.status()).toBe(201);

  // --- 3. DELETE all books from this user's collection ---
  const deleteBooksResponse = await request.delete(
    `https://demoqa.com/BookStore/v1/Books?UserId=${userID}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log('Delete books status:', deleteBooksResponse.status());
  expect(deleteBooksResponse.status()).toBe(204);

  // --- 4. DELETE the user entirely (cleanup) ---
  const deleteUserResponse = await request.delete(
    `https://demoqa.com/Account/v1/User/${userID}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  console.log('Delete user status:', deleteUserResponse.status());
  expect(deleteUserResponse.status()).toBe(204);
});