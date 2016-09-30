CREATE TABLE comments (
    linkId integer REFERENCE links,
    user varchar(255),
    content varchar(255),
    date varchar(50),
    id varchar(255),
    class varchar(255),
    like integer,
    disLikes integer,
    parent varchar(255)
)