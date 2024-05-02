-- -------------------------------------------------------------
-- TablePlus 5.9.6(546)
--
-- https://tableplus.com/
--
-- Database: db_pinterest
-- Generation Time: 2024-05-02 23:14:08.7770
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `code` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `expired` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `comment_date` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `image_name` varchar(100) DEFAULT NULL,
  `url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_images` (
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `saved_date` datetime NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`image_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `user_images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `user_images_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `user_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `refresh_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `face_app_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comments` (`comment_id`, `user_id`, `image_id`, `comment_date`, `description`) VALUES
(1, 22, 1, '2024-04-10 11:08:58', 'I want to comment!'),
(2, 22, 1, '2024-04-10 11:10:30', 'I want to comment 2'),
(3, 22, 1, '2024-04-10 11:11:11', 'I want to comment 2');

INSERT INTO `images` (`image_id`, `user_id`, `image_name`, `url`, `description`) VALUES
(1, 1, 'Landscape screen', 'https://i.pinimg.com/736x/70/01/a5/7001a5091098d3286347c6bb10d10566.jpg', 'A beautiful landscape.'),
(2, 2, 'The Beach', 'https://i.pinimg.com/564x/bc/51/3b/bc513bcc18eeb1784dcb9c571c902d19.jpg', 'Sunset at the beach.'),
(3, 3, 'Hamburger', 'https://i.pinimg.com/736x/8d/31/2c/8d312ca14b4bbbfbd7ed52d6f51fc371.jpg', 'Delicious food.'),
(4, 4, 'The City', 'https://i.pinimg.com/736x/73/27/b1/7327b14150f01c822e43fee62c46453f.jpg', 'City skyline.'),
(5, 5, 'My cute dog', 'https://i.pinimg.com/originals/a9/f9/83/a9f983ec3dd4ba130495b28396eadb1a.jpg', 'Adorable pets.'),
(6, 6, 'Nature in the land', 'https://i.pinimg.com/564x/ed/5f/73/ed5f739ff244c57ced76a774c7b3139b.jpg', 'Nature in bloom.'),
(7, 7, 'Unfatal memories', 'https://png.pngtree.com/background/20230524/original/pngtree-landscapes-of-memory-picture-image_2706884.jpg', 'Vacation memories.'),
(8, 8, 'Masterpiece art', 'https://i.pinimg.com/564x/42/46/7b/42467b5349cf7642fe0635cde100d9fa.jpg', 'Artistic creation.'),
(9, 9, 'My family and your family', 'https://i.pinimg.com/736x/69/b5/69/69b569b2d0e464d10574e5947fa7a3e2.jpg', 'Family gathering.'),
(10, 10, 'Wonder of the world', 'https://i.pinimg.com/736x/c2/f2/2f/c2f22fc3341fc0d3ecabc7f7e0180218.jpg', 'Architectural wonder.'),
(11, 1, '10 books to read in 2023', 'https://i.pinimg.com/736x/e7/d7/d1/e7d7d16473040020d33b21f1d1bc7ea8.jpg', 'Favorite book.'),
(12, 2, 'What a hiking!', 'https://i.pinimg.com/564x/d7/7e/17/d77e17ba334ad47b66295526438e6dc8.jpg', 'Adventure hike.'),
(13, 3, 'What an adorable cat', 'https://i.pinimg.com/1200x/a6/a0/56/a6a0563c888ae59d86eceedf1a15c67e.jpg', 'Cute animals.'),
(14, 4, 'Is this a tragedy or masterpiece?', 'https://img.freepik.com/free-photo/smoke-physical-structure-explode-fiery-destruction-generative-ai_188544-12514.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1702425600&semt=ais', 'Urban exploration.'),
(15, 5, 'Pizza', 'https://i.pinimg.com/736x/66/f0/4c/66f04cd63a182fc92574616c91c1b78d.jpg', 'Homemade cuisine.'),
(16, 6, 'My favourite sport', 'https://i.pinimg.com/736x/56/0c/29/560c292da4f92281e457862492d2f639.jpg', 'Playing tennis can you live more than you think'),
(17, 7, 'Holiday trip to Vietnam', 'https://i.pinimg.com/736x/1d/05/eb/1d05eb25dc1c99e639ce0a350389de26.jpg', 'Holiday fun.'),
(18, 8, 'My artwork', 'https://i.pinimg.com/564x/26/3d/8d/263d8d60e43a25163a2ece9674cf7517.jpg', 'Creative artwork.'),
(19, 9, 'The prom 2023', 'https://i.pinimg.com/736x/4f/65/5b/4f655b0a09ee420d765c9b27d98e3aa8.jpg', 'Find your best lovemate here at this prom'),
(20, 10, 'London from the 90s', 'https://i.pinimg.com/736x/bc/3c/46/bc3c465f3276094b6a710b0ce3d422a9.jpg', 'Historic sites.'),
(21, 22, 'LoginUI', '1714409020065_login.png', 'A sample modern UI/UX interface for login');

INSERT INTO `user_images` (`user_id`, `image_id`, `saved_date`, `status`) VALUES
(1, 1, '2024-03-30 07:15:05', 1),
(1, 2, '2024-03-30 07:15:05', 1),
(1, 5, '2024-03-30 07:15:05', 1),
(22, 8, '2024-03-30 09:54:29', 1),
(22, 12, '2024-03-30 08:04:32', 1),
(22, 13, '2024-03-30 10:05:29', 0),
(22, 15, '2024-03-30 10:00:02', 1);

INSERT INTO `users` (`user_id`, `full_name`, `age`, `email`, `user_password`, `avatar`, `refresh_token`, `face_app_id`) VALUES
(1, 'John Doe', 28, 'john@example.com', 'password123', NULL, NULL, NULL),
(2, 'Jane Smith', 25, 'jane@example.com', 'securePass', NULL, NULL, NULL),
(3, 'Michael Johnson', 32, 'michael@example.com', 'myPassword', NULL, NULL, NULL),
(4, 'Emily Brown', 23, 'emily@example.com', 'pass123', NULL, NULL, NULL),
(5, 'David Wilson', 29, 'david@example.com', 'davidPass', NULL, NULL, NULL),
(6, 'Sarah Lee', 30, 'sarah@example.com', 'sarah123', NULL, NULL, NULL),
(7, 'Robert Garcia', 31, 'robert@example.com', 'robertPass', NULL, NULL, NULL),
(8, 'Linda Martinez', 27, 'linda@example.com', 'lindaPass', NULL, NULL, NULL),
(9, 'William Davis', 26, 'william@example.com', 'william123', NULL, NULL, NULL),
(10, 'Karen Anderson', 33, 'karen@example.com', 'karenPass', NULL, NULL, NULL),
(22, 'Nguyen Anh Duy', 20, 'duynguyen02008@gmail.com', '$2b$10$QdtxDqanB2oSdD822kqwDecfZPWizrpDAYo7EB1X6.9rTt25ZkmWG', '1714407367404_login.png', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJrZXkiOjE3MTQ0MDA5OTc4ODksImlhdCI6MTcxNDQwMDk5NywiZXhwIjoxNzE2OTkyOTk3fQ.Z9VUiYQtrOzjSoHOpN2DQ0gTApLLcVnrQVHexxEAb-Q', '');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;