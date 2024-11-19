DROP DATABASE IF EXISTS music_streaming;
CREATE DATABASE music_streaming;
USE music_streaming;

CREATE TABLE `artists` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `picture` varchar(255),
  `first_name` varchar(255),
  `last_name` varchar(255),
  `bio` text
);

CREATE TABLE `albums` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `cover` varchar(255),
  `artist_id` integer NOT NULL,
  FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE
);

CREATE TABLE `tracks` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `audio` varchar(255),
  `album_id` integer NOT NULL,
  FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE
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
  `streamed_at` timestamp,
  PRIMARY KEY (`streaming_artist_id`, `streamed_track_id`, `streamed_at`),
  FOREIGN KEY (`streaming_artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`streamed_track_id`) REFERENCES `tracks` (`id`) ON DELETE CASCADE
);

INSERT INTO `artists` (`username`, `picture`, `first_name`, `last_name`, `bio`) VALUES
('john_doe', 'https://example.com/images/john_doe.jpg', 'John', 'Doe', 'A contemporary artist known for his abstract paintings.'),
('sarah_smith', 'https://example.com/images/sarah_smith.jpg', 'Sarah', 'Smith', 'A talented sculptor whose works explore the human form in modern materials.'),
('alex_jones', 'https://example.com/images/alex_jones.jpg', 'Alex', 'Jones', 'A photographer who specializes in nature and wildlife photography.'),
('emily_brown', 'https://example.com/images/emily_brown.jpg', 'Emily', 'Brown', 'A digital artist creating surreal and imaginative landscapes.'),
('michael_williams', 'https://example.com/images/michael_williams.jpg', 'Michael', 'Williams', 'An award-winning painter known for his use of bold colors and textures.'),
('olivia_miller', 'https://example.com/images/olivia_miller.jpg', 'Olivia', 'Miller', 'A street artist whose work incorporates graffiti and pop culture themes.'),
('daniel_davis', 'https://example.com/images/daniel_davis.jpg', 'Daniel', 'Davis', 'A fine artist with a focus on portrait painting and classical techniques.'),
('laura_garcia', 'https://example.com/images/laura_garcia.jpg', 'Laura', 'Garcia', 'A mixed-media artist exploring themes of identity and culture.'),
('jackson_martinez', 'https://example.com/images/jackson_martinez.jpg', 'Jackson', 'Martinez', 'A conceptual artist who uses installations to comment on social issues.'),
('isabella_hernandez', 'https://example.com/images/isabella_hernandez.jpg', 'Isabella', 'Hernandez', 'A visual artist specializing in digital illustrations and animation.');

INSERT INTO albums (title, cover, artist_id) VALUES
('Album 1', 'https://example.com/covers/album1.jpg', 1),
('Album 2', 'https://example.com/covers/album2.jpg', 2),
('Album 3', 'https://example.com/covers/album3.jpg', 3),
('Album 4', 'https://example.com/covers/album4.jpg', 4),
('Album 5', 'https://example.com/covers/album5.jpg', 5),
('Album 6', 'https://example.com/covers/album6.jpg', 6),
('Album 7', 'https://example.com/covers/album7.jpg', 7),
('Album 8', 'https://example.com/covers/album8.jpg', 8),
('Album 9', 'https://example.com/covers/album9.jpg', 9),
('Album 10', 'https://example.com/covers/album10.jpg', 10);

INSERT INTO tracks (title, audio, album_id) VALUES
('Track 1', 'https://example.com/audio/track1.mp3', 1),
('Track 2', 'https://example.com/audio/track2.mp3', 1),
('Track 3', 'https://example.com/audio/track3.mp3', 2),
('Track 4', 'https://example.com/audio/track4.mp3', 2),
('Track 5', 'https://example.com/audio/track5.mp3', 3),
('Track 6', 'https://example.com/audio/track6.mp3', 3),
('Track 7', 'https://example.com/audio/track7.mp3', 4),
('Track 8', 'https://example.com/audio/track8.mp3', 5),
('Track 9', 'https://example.com/audio/track9.mp3', 6),
('Track 10', 'https://example.com/audio/track10.mp3', 7);

INSERT INTO follows (followed_at, unfollowed_at, following_artist_id, followed_artist_id) VALUES
('2024-11-01 10:00:00', NULL, 1, 2),
('2024-11-02 10:00:00', NULL, 2, 3),
('2024-11-03 10:00:00', NULL, 3, 4),
('2024-11-04 10:00:00', NULL, 4, 5),
('2024-11-05 10:00:00', '2024-11-10 10:00:00', 5, 6),
('2024-11-06 10:00:00', NULL, 6, 7),
('2024-11-07 10:00:00', NULL, 7, 8),
('2024-11-08 10:00:00', NULL, 8, 9),
('2024-11-09 10:00:00', NULL, 9, 10),
('2024-11-10 10:00:00', NULL, 10, 1);

INSERT INTO likes (liked_at, unliked_at, liking_artist_id, liked_album_id) VALUES
('2024-11-01 11:00:00', NULL, 1, 1),
('2024-11-02 11:00:00', NULL, 2, 2),
('2024-11-03 11:00:00', NULL, 3, 3),
('2024-11-04 11:00:00', NULL, 4, 4),
('2024-11-05 11:00:00', NULL, 5, 5),
('2024-11-06 11:00:00', NULL, 6, 6),
('2024-11-07 11:00:00', '2024-11-08 11:00:00', 7, 7),
('2024-11-08 11:00:00', NULL, 8, 8),
('2024-11-09 11:00:00', NULL, 9, 9),
('2024-11-10 11:00:00', NULL, 10, 10);

INSERT INTO streams (streaming_artist_id, streamed_track_id, streamed_at) VALUES
(1, 1, '2024-11-01 12:00:00'),
(1, 2, '2024-11-01 12:05:00'),
(2, 3, '2024-11-02 13:00:00'),
(3, 4, '2024-11-03 14:00:00'),
(4, 5, '2024-11-04 15:00:00'),
(5, 6, '2024-11-05 16:00:00'),
(6, 7, '2024-11-06 17:00:00'),
(7, 8, '2024-11-07 18:00:00'),
(8, 9, '2024-11-08 19:00:00'),
(9, 10, '2024-11-09 20:00:00');
