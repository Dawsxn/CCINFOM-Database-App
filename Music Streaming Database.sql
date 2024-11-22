DROP DATABASE IF EXISTS music_streaming;
CREATE DATABASE music_streaming;
USE music_streaming;

CREATE TABLE `countries` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `country` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE `artists` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `email_address` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `profile_picture` varchar(255),
  `first_name` varchar(255),
  `last_name` varchar(255),
  `biography` varchar(255),
  `verified` boolean NOT NULL,
  `country_id` integer NOT NULL,
  FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE
);

CREATE TABLE `albums` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) UNIQUE NOT NULL,
  `album_cover` varchar(255),
  `artist_id` integer NOT NULL,
  FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE
);

CREATE TABLE `genres` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `genre` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE `languages` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `language` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE `tracks` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) UNIQUE NOT NULL,
  `audio` varchar(255) UNIQUE NOT NULL,
  `duration` integer NOT NULL,
  `explicit` boolean NOT NULL,
  `genre_id` integer NOT NULL,
  `language_id` integer NOT NULL,
  `album_id` integer NOT NULL,
  FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`)
);

CREATE TABLE `follows` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `followed_at` timestamp NOT NULL,
  `unfollowed_at` timestamp,
  `following_artist_id` integer NOT NULL,
  `followed_artist_id` integer NOT NULL,
  FOREIGN KEY (`following_artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`followed_artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE
);

CREATE TABLE `likes` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `liked_at` timestamp NOT NULL,
  `unliked_at` timestamp,
  `liking_artist_id` integer NOT NULL,
  `liked_album_id` integer NOT NULL,
   FOREIGN KEY (`liking_artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE,
   FOREIGN KEY (`liked_album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE
);

CREATE TABLE `streams` (
  `streaming_artist_id` integer NOT NULL,
  `streamed_track_id` integer NOT NULL,
  `streamed_at` timestamp NOT NULL,
  PRIMARY KEY (`streaming_artist_id`, `streamed_track_id`, `streamed_at`),
  FOREIGN KEY (`streaming_artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`streamed_track_id`) REFERENCES `tracks` (`id`) ON DELETE CASCADE
);

INSERT INTO `countries` (`country`) VALUES 
('United States'),
('Canada'),
('United Kingdom'),
('Australia'),
('Germany'),
('France'),
('Japan'),
('South Korea'),
('India'),
('Brazil');

INSERT INTO `artists` (`username`, `email_address`, `password`, `birthdate`, `profile_picture`, `first_name`, `last_name`, `biography`, `verified`, `country_id`) VALUES 
('artist1', 'artist1@example.com', 'password1', '1990-01-01', 'https://example.com/profiles/artist1.jpg', 'John', 'Doe', 'Bio for artist1', TRUE, 1),
('artist2', 'artist2@example.com', 'password2', '1992-02-02', 'https://example.com/profiles/artist2.jpg', 'Jane', 'Smith', 'Bio for artist2', FALSE, 2),
('artist3', 'artist3@example.com', 'password3', '1995-03-03', 'https://example.com/profiles/artist3.jpg', 'Alice', 'Brown', 'Bio for artist3', TRUE, 3),
('artist4', 'artist4@example.com', 'password4', '1993-04-04', 'https://example.com/profiles/artist4.jpg', 'Bob', 'Taylor', 'Bio for artist4', FALSE, 4),
('artist5', 'artist5@example.com', 'password5', '1988-05-05', 'https://example.com/profiles/artist5.jpg', 'Chris', 'Johnson', 'Bio for artist5', TRUE, 5),
('artist6', 'artist6@example.com', 'password6', '1991-06-06', 'https://example.com/profiles/artist6.jpg', 'Emma', 'White', 'Bio for artist6', FALSE, 6),
('artist7', 'artist7@example.com', 'password7', '1994-07-07', 'https://example.com/profiles/artist7.jpg', 'Michael', 'Green', 'Bio for artist7', TRUE, 7),
('artist8', 'artist8@example.com', 'password8', '1987-08-08', 'https://example.com/profiles/artist8.jpg', 'Emily', 'Harris', 'Bio for artist8', FALSE, 8),
('artist9', 'artist9@example.com', 'password9', '1996-09-09', 'https://example.com/profiles/artist9.jpg', 'David', 'Wilson', 'Bio for artist9', TRUE, 9),
('artist10', 'artist10@example.com', 'password10', '1993-10-10', 'https://example.com/profiles/artist10.jpg', 'Sophia', 'Clark', 'Bio for artist10', FALSE, 10);

INSERT INTO `albums` (`title`, `album_cover`, `artist_id`) VALUES 
('Album 1', 'https://example.com/albums/album1.jpg', 1),
('Album 2', 'https://example.com/albums/album2.jpg', 2),
('Album 3', 'https://example.com/albums/album3.jpg', 3),
('Album 4', 'https://example.com/albums/album4.jpg', 4),
('Album 5', 'https://example.com/albums/album5.jpg', 5),
('Album 6', 'https://example.com/albums/album6.jpg', 6),
('Album 7', 'https://example.com/albums/album7.jpg', 7),
('Album 8', 'https://example.com/albums/album8.jpg', 8),
('Album 9', 'https://example.com/albums/album9.jpg', 9),
('Album 10', 'https://example.com/albums/album10.jpg', 10);

INSERT INTO `genres` (`genre`) VALUES 
('Pop'),
('Rock'),
('Jazz'),
('Classical'),
('Hip-Hop'),
('Electronic'),
('Country'),
('Reggae'),
('Blues'),
('R&B');

INSERT INTO `languages` (`language`) VALUES 
('English'),
('Spanish'),
('French'),
('German'),
('Japanese'),
('Korean'),
('Hindi'),
('Portuguese'),
('Mandarin'),
('Italian');

INSERT INTO `tracks` (`title`, `audio`, `duration`, `explicit`, `genre_id`, `language_id`, `album_id`) VALUES 
('Track 1', 'https://example.com/audio/track1.mp3', 210, FALSE, 1, 1, 1),
('Track 2', 'https://example.com/audio/track2.mp3', 180, TRUE, 2, 2, 2),
('Track 3', 'https://example.com/audio/track3.mp3', 200, FALSE, 3, 3, 3),
('Track 4', 'https://example.com/audio/track4.mp3', 240, TRUE, 4, 4, 4),
('Track 5', 'https://example.com/audio/track5.mp3', 220, FALSE, 5, 5, 5),
('Track 6', 'https://example.com/audio/track6.mp3', 230, TRUE, 6, 6, 6),
('Track 7', 'https://example.com/audio/track7.mp3', 210, FALSE, 7, 7, 7),
('Track 8', 'https://example.com/audio/track8.mp3', 250, TRUE, 8, 8, 8),
('Track 9', 'https://example.com/audio/track9.mp3', 200, FALSE, 9, 9, 9),
('Track 10', 'https://example.com/audio/track10.mp3', 190, TRUE, 10, 10, 10);

INSERT INTO `follows` (`followed_at`, `unfollowed_at`, `following_artist_id`, `followed_artist_id`) VALUES 
('2024-01-01 10:00:00', NULL, 1, 2),
('2024-01-02 11:00:00', NULL, 3, 4),
('2024-01-03 12:00:00', '2024-02-01 14:00:00', 5, 6),
('2024-01-04 13:00:00', NULL, 7, 8),
('2024-01-05 14:00:00', '2024-02-05 16:00:00', 9, 10),
('2024-01-06 15:00:00', NULL, 2, 3),
('2024-01-07 16:00:00', NULL, 4, 5),
('2024-01-08 17:00:00', NULL, 6, 7),
('2024-01-09 18:00:00', NULL, 8, 9),
('2024-01-10 19:00:00', NULL, 10, 1);

INSERT INTO `likes` (`liked_at`, `unliked_at`, `liking_artist_id`, `liked_album_id`) VALUES 
('2024-01-01 10:00:00', NULL, 1, 2),
('2024-01-02 11:00:00', NULL, 3, 4),
('2024-01-03 12:00:00', '2024-02-01 14:00:00', 5, 6),
('2024-01-04 13:00:00', NULL, 7, 8),
('2024-01-05 14:00:00', '2024-02-05 16:00:00', 9, 10),
('2024-01-06 15:00:00', NULL, 2, 3),
('2024-01-07 16:00:00', NULL, 4, 5),
('2024-01-08 17:00:00', NULL, 6, 7),
('2024-01-09 18:00:00', NULL, 8, 9),
('2024-01-10 19:00:00', NULL, 10, 1);

INSERT INTO `streams` (`streaming_artist_id`, `streamed_track_id`, `streamed_at`) VALUES 
(1, 1, '2024-01-01 10:00:00'),
(2, 2, '2024-01-02 11:00:00'),
(3, 3, '2024-01-03 12:00:00'),
(4, 4, '2024-01-04 13:00:00'),
(5, 5, '2024-01-05 14:00:00'),
(6, 6, '2024-01-06 15:00:00'),
(7, 7, '2024-01-07 16:00:00'),
(8, 8, '2024-01-08 17:00:00'),
(9, 9, '2024-01-09 18:00:00'),
(10, 10, '2024-01-10 19:00:00');