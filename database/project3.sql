-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2024 at 03:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project3`
--
CREATE DATABASE IF NOT EXISTS `project3` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `project3`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` varchar(36) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
('79e436ef-f511-11ee-a111-489ebdf58697', 4),
('f41ad994-f5fb-11ee-a9d0-489ebdf58697', 7),
('f41ad994-f5fb-11ee-a9d0-489ebdf58697', 18),
('f41ad994-f5fb-11ee-a9d0-489ebdf58697', 16),
('f41ad994-f5fb-11ee-a9d0-489ebdf58697', 8),
('f41ad994-f5fb-11ee-a9d0-489ebdf58697', 5),
('f41ad994-f5fb-11ee-a9d0-489ebdf58697', 15),
('f41ad994-f5fb-11ee-a9d0-489ebdf58697', 4),
('f41ad994-f5fb-11ee-a9d0-489ebdf58697', 14),
('f41ad994-f5fb-11ee-a9d0-489ebdf58697', 19),
('79e436ef-f511-11ee-a111-489ebdf58697', 18),
('79e436ef-f511-11ee-a111-489ebdf58697', 8),
('79e436ef-f511-11ee-a111-489ebdf58697', 1),
('79e436ef-f511-11ee-a111-489ebdf58697', 17),
('79e436ef-f511-11ee-a111-489ebdf58697', 14),
('3c07e39c-f2d8-11ee-90ea-489ebdf58697', 7),
('3c07e39c-f2d8-11ee-90ea-489ebdf58697', 1),
('3c07e39c-f2d8-11ee-90ea-489ebdf58697', 15),
('3c07e39c-f2d8-11ee-90ea-489ebdf58697', 19),
('3c07e39c-f2d8-11ee-90ea-489ebdf58697', 14),
('8fb60a07-f5fe-11ee-a9d0-489ebdf58697', 18),
('8fb60a07-f5fe-11ee-a9d0-489ebdf58697', 9),
('8fb60a07-f5fe-11ee-a9d0-489ebdf58697', 8),
('8fb60a07-f5fe-11ee-a9d0-489ebdf58697', 4),
('8fb60a07-f5fe-11ee-a9d0-489ebdf58697', 15),
('8fb60a07-f5fe-11ee-a9d0-489ebdf58697', 17),
('8fb60a07-f5fe-11ee-a9d0-489ebdf58697', 14);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL DEFAULT (UUID()),
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
('3c07e39c-f2d8-11ee-90ea-489ebdf58697', 'Sara', 'Prosper', 'prosper@gmail.com', 'ef64d3be6b0ed7377f5034a333084cf5', 2),
('41b18155-f079-11ee-8913-489ebdf58697', 'Olga', 'Dahan', 'olga@gmail.com', '1b6a5c35dd431a60d8275b32d6165be6', 1),
('79e436ef-f511-11ee-a111-489ebdf58697', 'Litan', 'Galapo', 'litan@gmail.com', 'ff333493e9cadfbb750ac8fd26659bb2', 2),
('8fb60a07-f5fe-11ee-a9d0-489ebdf58697', 'Laura', 'Levy', 'laura@gmail.com', '3dbaadb8b7835fb77ddcf6a51a52533c', 2),
('f41ad994-f5fb-11ee-a9d0-489ebdf58697', 'Marielle', 'Serure', 'serure@gmail.com', '36cd7c7b976f1398c6e1cbbc784d29b3', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `imageName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Rome', 'Reserve a Rome vacation package that has everything you need and nothing you don\'t. Good for shopping, bars and pubs and history, think about basing yourself in the neighborhood of Rome Historic Centre. Fill your itinerary with visits to St. Peters Basili', '2024-06-06', '2024-06-13', 1500.00, 'e8fed5ca-3106-46ff-a93e-baf9c1e1f904.jpg'),
(4, 'Cancun', 'Uncover the very best of Cancun with a customized Cancun vacation package. From its tropical climate and party scene to its sunny weather, you\'ll love discovering this scenic city your way. A trip to Cancun is an excellent opportunity to sightsee. Check o', '2024-06-04', '2024-06-18', 2894.00, '805836dc-a537-448f-85c9-08eaccaf5de1.jpg'),
(5, 'Madrid', 'Design the ultimate adventure with a Madrid vacation package that fits your preferences and needs. Artistic creativity, rich history and cosmopolitan vibe are just a few of the things you can expect to find in this sunny city. A trip to Madrid is an excel', '2024-05-13', '2024-05-20', 1860.00, '0383050a-09bd-45b5-a611-f85a04394520.jpg'),
(7, 'Paris', 'The iconic sights, chic vibe and romantic ambience are just some of the reasons why travelers adore this urban city. Discover this amazing destination your way with a Paris vacation package. Any trip to Paris needs a well-designed itinerary. Fill yours wi', '2024-03-05', '2024-03-13', 1400.00, '15d50a5b-eea0-4360-90d9-da3cf5d74a93.jpg'),
(8, 'Batumi', 'Entertainment, food, art and more … It\'s all waiting for you with a Batumi vacation package. And with the ability to easily customize your city getaway, you know it\'ll be one that\'s memorable. If taking in sights is on the cards during your trip to Batumi', '2024-05-07', '2024-05-12', 750.00, '58990ea0-b993-4474-ac9d-ed6cfe50581e.jpg'),
(9, 'Los Angeles', 'With a reputation for its sunny weather and glamorous vibe, Los Angeles is an ideal getaway destination. Book one of our Los Angeles vacation packages and immerse yourself in all that this impressive city has to offer. Fill your itinerary with visits to U', '2024-04-16', '2024-04-23', 2600.00, '79895894-f2b4-4d30-bc10-efa6bc75ad64.jpg'),
(14, 'Moscow', 'The hassle-free way to experience this interesting city is with a tailor-made Moscow vacation package. Stay in the neighborhood of Tverskoy, which is good for shopping, dining and culture or choose someplace else — our package deals are all about you. You', '2024-08-15', '2024-08-22', 1100.00, '975d07f1-0bad-4247-ace3-650cee0fe0d3.jpg'),
(15, 'Jerusalem', 'Lock in a Jerusalem vacation package and get ready for an awesome getaway. Famous for its diversity and rich history, there\'s lots to love about this interesting city. If your trip to Jerusalem includes a little sightseeing, visit popular attractions like', '2024-07-18', '2024-07-25', 2020.00, '2c1b00ec-e4fe-4265-83be-6a58d77fbcb1.jpg'),
(16, 'Beijing', 'With plenty of highlights as well as some hidden gems, this city is best experienced with a Beijing vacation package. Find a place to stay in Xicheng, which is good for nightlife, dining and views. If sightseeing is on the to-do list during your trip to B', '2024-05-01', '2024-05-14', 4000.00, 'd7abe3f8-2280-4511-99ff-e3e801e4a42f.jpg'),
(17, 'New Delhi', 'Say farewell to planning worries and hello to a New Delhi vacation package. With your travel details organized before you go, you can focus on discovering the best of this city, starting with Connaught Place, which is good for markets, nightlife and shopp', '2024-07-29', '2024-08-07', 1300.00, 'a80ce0b0-8cd9-4b28-92c5-fd60b82b51d8.jpg'),
(18, 'Rabat', 'From its rich history to its lively atmosphere and multicultural diversity, there are tons of convincing reasons to spend some time in the urban city of Rabat. You\'ll discover all this and more when you lock in your vacation package to Rabat. If your trip', '2024-07-05', '2024-07-15', 1592.00, '3866b6ec-6fae-4445-9c19-d230d59aabb6.jpg'),
(19, 'Seychelles ', 'Reserve one of our vacation packages to Seychelles and immerse yourself in all that this destination has to offer, beginning with Victoria. From its nature to its many other charms, this city is brimming with adventure and fun. A well-thought-out itinerar', '2024-09-10', '2024-09-26', 7500.00, 'e87634b3-0676-4f74-851a-fc9048fd47ad.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_4` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_5` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
