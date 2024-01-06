-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

CREATE TABLE Product (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    stock INT NOT NULL DEFAULT(10),
    category_id INT,
    FOREIGN KEY (category_id)
    REFERENCES Category(id)
);

CREATE TABLE Tag (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR
);

CREATE TABLE ProductTag (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    tag_id INT,
    FOREIGN KEY (product_id)
    REFERENCES Product(id),
    FOREIGN KEY (tag_id)
    REFERENCES Tag(id)
);

