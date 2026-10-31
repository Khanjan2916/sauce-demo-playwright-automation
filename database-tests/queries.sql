
DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price REAL
);

INSERT INTO products (name, price)
VALUES
('Sauce Labs Backpack', 29.99),
('Sauce Labs Bike Light', 9.99),
('Sauce Labs Bolt T-Shirt', 15.99);

-- Query 1: Display all products
SELECT * FROM products;

-- Query 2: Display products costing more than $15
SELECT * FROM products
WHERE price > 15;
