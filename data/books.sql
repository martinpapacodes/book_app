DROP TABLE IF EXISTS books;

CREATE TABLE IF NOT EXISTS books(
  id SERIAL PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  isbn VARCHAR(255),
  image_url VARCHAR(255),
  description TEXT,
  bookshelf VARCHAR(255)
);

INSERT INTO
  books (
    author,
    title,
    isbn,
    image_url,
    description,
    bookshelf
  )
VALUES
  (
    'Martin PAPA',
    'Around the World in 2 Days',
    'ISBN_13 9780441013593',
    'http://books.google.com/books/content?id=XyQOzxb7seQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    'Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet',
    'Fantasy'
  );

INSERT INTO
  books (
    author,
    title,
    isbn,
    image_url,
    description,
    bookshelf
  )
VALUES
  (
    'Phong Doan',
    'Its a Small World After All?????',
    'ISBN_13 9780441013593',
    'http://books.google.com/books/content?id=XyQOzxb7seQC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
    'Follows the adventures of Bob the Builder',
    'Non-Fiction'
  );