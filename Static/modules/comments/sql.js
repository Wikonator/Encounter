CREATE TABLE comments (
    linkId integer REFERENCES links,
    userName varchar(255),
    content varchar(255),
    date varchar(50),
    id SERIAL,
    class varchar(255),
    likes integer,
    disLikes integer,
    parent varchar(255)
)