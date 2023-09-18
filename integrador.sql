-- Active: 1695080445362@@127.0.0.1@3306

CREATE TABLE users(
 id TEXT UNIQUE PRIMARY KEY NOT NULL,
 email TEXT UNIQUE NOT NULL,
 password TEXT NOT NULL,
 nickname TEXT NOT NULL ,
 created_at TEXT DEFAULT(datetime('now','localtime'))
);

select * from users;

drop table posts;

CREATE TABLE posts(
    id TEXT UNIQUE PRIMARY KEY,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    comments INTEGER NOT NULL,
    likes INTEGER NOT NULL,
    dislikes INTEGER NOT NULL,
    created_at TEXT DEFAULT(datetime('now','localtime')),
    updated_at TEXT ,
    FOREIGN KEY (creator_id) REFERENCES users(id)
              ON UPDATE CASCADE
              ON DELETE CASCADE
    );

  CREATE TABLE like_deslike(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE);

CREATE TABLE
    comments(
        id TEXT PRIMARY KEY NOT NULL,
        creator_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL,
        dislikes INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

  drop table comments  ;    
 
CREATE TABLE comments_like_dislike(
        user_id TEXT NOT NULL,
        comment_id TEXT NOT NULL,
        like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE);

drop table comments_like_dislike;