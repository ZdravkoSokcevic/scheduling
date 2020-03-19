-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 19, 2020 at 11:34 
-- Server version: 5.7.28-0ubuntu0.19.04.2
-- PHP Version: 7.3.14-1+ubuntu19.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zakazivanje_termina`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `id` int(11) NOT NULL,
  `content` text,
  `active` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`id`, `content`, `active`) VALUES
(1, 'Neko obavjestenje', '1'),
(2, 'Neko obavjestenje 2', '1'),
(3, 'afipadjfj', '1'),
(4, 'Obavjestenjce ', '1');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `date_from` datetime NOT NULL,
  `date_to` datetime NOT NULL,
  `dentist_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `date_from`, `date_to`, `dentist_id`, `patient_id`, `room_id`, `status`) VALUES
(1, '2020-02-11 05:00:00', '2020-02-11 07:00:00', 1, 5, 3, 'approved'),
(2, '2020-02-25 00:00:00', '2020-02-25 11:00:00', 10, 11, 3, NULL),
(3, '2020-02-24 10:00:00', '2020-02-24 12:00:00', 10, 11, 3, NULL),
(4, '2020-12-02 02:00:00', '2020-12-02 02:30:00', 10, 9, NULL, NULL),
(5, '2020-11-02 00:30:00', '2020-11-02 01:00:00', 10, 9, NULL, NULL),
(6, '2020-10-03 01:00:00', '2020-10-03 01:30:00', 10, 9, NULL, NULL),
(7, '2020-11-03 01:30:00', '2020-11-03 02:00:00', 10, 9, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `name`) VALUES
(3, 'Soba 232'),
(13, 'Prostorija 22');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `dentist_id` int(11) NOT NULL,
  `date_from` datetime NOT NULL,
  `date_to` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `role` enum('dentist','patient','admin') NOT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `phone`, `role`, `access_token`, `remember_token`, `profile_picture`) VALUES
(1, 'Pero', 'Pericc', 'pera@mail.com', '$2b$05$j5s.XxqR0l5phL/tom3RTO1/tYHDatT66VfGSnJ6XE/9ou10u4v52', '0641468165', 'patient', NULL, NULL, NULL),
(5, 'Zdravko', 'Sokcevic', 'zdravkosokcevic100@gmail.com', '$2b$05$ioKNwv3mAcH4CgnCEdcZK.amnbQIhh/sGOU7loFSH6ZX/8q/ire2S', '0641486217', 'admin', NULL, NULL, NULL),
(9, 'Zdravko', 'Sokcevic', 'zdravko.sokcevic@itcentar.rs', '$2b$05$ioKNwv3mAcH4CgnCEdcZK.amnbQIhh/sGOU7loFSH6ZX/8q/ire2S', '063186481', 'patient', NULL, NULL, NULL),
(10, 'Pavle', 'Vukovic', 'pavle.vukovic@itcentar.rs', '$2b$05$skfMiVTxfZT99blwwyfZ1O1fn3CsKRLDvtYY3F1gI4t6DzozbHiUC', '064154131', 'dentist', NULL, NULL, NULL),
(11, 'Milos', 'Kosanovic', 'milos.kosanovic@vtsnis.edu.rs', '$2b$05$thXxiaFViZ8KozHRUMZ6fe.i7QamuNBzkl.CubpL9o17/HZRtwB5e', '0631486666', 'patient', NULL, NULL, NULL),
(12, 'Pera', 'Peric', 'peraperic@mail.com', '$2b$05$3mV6zME20OzLJLETZ1biPuEt6Iblzm9IlJaCSt4o0yImrOZHUrfXC', '0641486145', 'patient', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointments_dentist_foreign` (`dentist_id`),
  ADD KEY `appointments_patient_foreign` (`patient_id`),
  ADD KEY `appointments_room_foreign` (`room_id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedule_dentist_foreign` (`dentist_id`),
  ADD KEY `schedule_room_foreign` (`room_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_dentist_foreign` FOREIGN KEY (`dentist_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_patient_foreign` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointments_room_foreign` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_dentist_foreign` FOREIGN KEY (`dentist_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `schedule_room_foreign` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
