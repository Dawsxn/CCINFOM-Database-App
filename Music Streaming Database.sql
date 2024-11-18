DROP DATABASE IF EXISTS music_streaming;
CREATE DATABASE IF NOT EXISTS music_streaming;
USE music_streaming;

CREATE TABLE `artists` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `created_at` date NOT NULL,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `bio` text
);

CREATE TABLE `albums` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) UNIQUE NOT NULL,
  `released_at` date NOT NULL,
  `artist_id` integer NOT NULL
);

CREATE TABLE `tracks` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) UNIQUE NOT NULL,
  `released_at` date NOT NULL,
  `album_id` integer NOT NULL
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `created_at` date NOT NULL,
  `first_name` varchar(255),
  `last_name` varchar(255)
);

CREATE TABLE `follows` (
  `following_user_id` integer,
  `followed_artist_id` integer,
  `followed_at` date NOT NULL,
  PRIMARY KEY (`following_user_id`, `followed_artist_id`)
);

CREATE TABLE `likes` (
  `liking_user_id` integer,
  `liked_album_id` integer,
  `liked_at` date NOT NULL,
  PRIMARY KEY (`liking_user_id`, `liked_album_id`)
);

CREATE TABLE `streams` (
  `streaming_user_id` integer,
  `streamed_track_id` integer,
  `streamed_at` date NOT NULL,
  PRIMARY KEY (`streaming_user_id`, `streamed_track_id`)
);

CREATE INDEX `albums_index_0` ON `albums` (`artist_id`);

CREATE INDEX `tracks_index_1` ON `tracks` (`album_id`);

ALTER TABLE `albums` ADD FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE;

ALTER TABLE `tracks` ADD FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE;

ALTER TABLE `follows` ADD FOREIGN KEY (`following_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `follows` ADD FOREIGN KEY (`followed_artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE;

ALTER TABLE `likes` ADD FOREIGN KEY (`liking_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `likes` ADD FOREIGN KEY (`liked_album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE;

ALTER TABLE `streams` ADD FOREIGN KEY (`streaming_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `streams` ADD FOREIGN KEY (`streamed_track_id`) REFERENCES `tracks` (`id`) ON DELETE CASCADE;

INSERT INTO artists (username, email, created_at, first_name, last_name, bio) VALUES
('taylorswift', 'tswift@example.com', '2006-10-24', 'Taylor', 'Swift', 'American singer-songwriter.'),
('edsheeran', 'edsheeran@example.com', '2011-09-09', 'Ed', 'Sheeran', 'British singer-songwriter.'),
('drake', 'drake@example.com', '2009-06-15', 'Aubrey', 'Graham', 'Canadian rapper and singer.'),
('arianagrande', 'ariana@example.com', '2013-08-30', 'Ariana', 'Grande', 'American pop and R&B singer.'),
('theweeknd', 'weeknd@example.com', '2015-03-20', 'Abel', 'Tesfaye', 'Canadian singer and songwriter.'),
('billieeilish', 'billie@example.com', '2017-10-18', 'Billie', 'Eilish', 'American singer and songwriter.'),
('justinbieber', 'justin@example.com', '2010-02-01', 'Justin', 'Bieber', 'Canadian pop singer.'),
('bts_official', 'bts@example.com', '2013-06-13', 'BTS', 'Band', 'South Korean boy band.'),
('oliviarodrigo', 'olivia@example.com', '2020-01-08', 'Olivia', 'Rodrigo', 'American pop singer.'),
('postmalone', 'post@example.com', '2015-12-10', 'Austin', 'Post', 'American rapper and singer.');

INSERT INTO albums (title, released_at, artist_id) VALUES
('1989', '2014-10-27', 1),
('Divide', '2017-03-03', 2),
('Scorpion', '2018-06-29', 3),
('Thank U, Next', '2019-02-08', 4),
('After Hours', '2020-03-20', 5),
('Happier Than Ever', '2021-07-30', 6),
('Purpose', '2015-11-13', 7),
('Map of the Soul: 7', '2020-02-21', 8),
('SOUR', '2021-05-21', 9),
('Hollywood\'s Bleeding', '2019-09-06', 10);

INSERT INTO tracks (title, released_at, album_id) VALUES
('Blank Space', '2014-10-27', 1),
('Shape of You', '2017-01-06', 2),
('God\'s Plan', '2018-01-19', 3),
('7 rings', '2019-01-18', 4),
('Blinding Lights', '2019-11-29', 5),
('Bad Guy', '2019-03-29', 6),
('Sorry', '2015-10-23', 7),
('Dynamite', '2020-08-21', 8),
('Drivers License', '2021-01-08', 9),
('Circles', '2019-08-30', 10);

INSERT INTO users (username, email, created_at, first_name, last_name) VALUES
('alice_wong', 'alice@example.com', '2024-01-01', 'Alice', 'Wong'),
('bob_johnson', 'bob@example.com', '2024-02-01', 'Bob', 'Johnson'),
('charlie_lee', 'charlie@example.com', '2024-03-01', 'Charlie', 'Lee'),
('dave_martin', 'dave@example.com', '2024-04-01', 'Dave', 'Martin'),
('emma_clark', 'emma@example.com', '2024-05-01', 'Emma', 'Clark'),
('frank_garcia', 'frank@example.com', '2024-06-01', 'Frank', 'Garcia'),
('grace_hill', 'grace@example.com', '2024-07-01', 'Grace', 'Hill'),
('henry_lopez', 'henry@example.com', '2024-08-01', 'Henry', 'Lopez'),
('isabella_king', 'isabella@example.com', '2024-09-01', 'Isabella', 'King'),
('jack_davis', 'jack@example.com', '2024-10-01', 'Jack', 'Davis');

INSERT INTO streams (streaming_user_id, streamed_track_id, streamed_at) VALUES
(1, 1, '2024-08-10'),
(2, 2, '2024-08-11'),
(3, 3, '2024-08-12'),
(4, 4, '2024-08-13'),
(5, 5, '2024-08-14'),
(6, 6, '2024-08-15'),
(7, 7, '2024-08-16'),
(8, 8, '2024-08-17'),
(9, 9, '2024-08-18'),
(10, 10, '2024-08-19');

INSERT INTO likes (liking_user_id, liked_album_id, liked_at) VALUES
(1, 1, '2024-08-10'),
(2, 2, '2024-08-11'),
(3, 3, '2024-08-12'),
(4, 4, '2024-08-13'),
(5, 5, '2024-08-14'),
(6, 6, '2024-08-15'),
(7, 7, '2024-08-16'),
(8, 8, '2024-08-17'),
(9, 9, '2024-08-18'),
(10, 10, '2024-08-19');

INSERT INTO follows (following_user_id, followed_artist_id, followed_at) VALUES
(1, 1, '2024-08-10'),
(2, 2, '2024-08-11'),
(3, 3, '2024-08-12'),
(4, 4, '2024-08-13'),
(5, 5, '2024-08-14'),
(6, 6, '2024-08-15'),
(7, 7, '2024-08-16'),
(8, 8, '2024-08-17'),
(9, 9, '2024-08-18'),
(10, 10, '2024-08-19');