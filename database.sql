CREATE TABLE links
(
    id SERIAL primary key,
    score Int DEFAULT 1,
    link VARCHAR(255) not null unique,
    image VARCHAR(255) DEFAULT 'http://image.flaticon.com/icons/svg/46/46080.svg',
    userName VARCHAR(255),
    timePosted timestamp DEFAULT current_timestamp
);
