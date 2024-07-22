CREATE TABLE IF NOT EXISTS `wallet` (
    `userId` varchar(18) NOT NULL,
    `cash` float NOT NULL DEFAULT 5000,
    PRIMARY KEY (`userId`)
);

CREATE TABLE IF NOT EXISTS `stocks` (
    `userId` varchar(18) NOT NULL,
    `ticker` varchar(255) NOT NULL,
    `shares` int(11) NOT NULL,
    `price` float NOT NULL,
    `timestamp` date NOT NULL,
    PRIMARY KEY (`userId`, `ticker`),
    FOREIGN KEY (`userId`) REFERENCES `wallet` (`userId`)
);

CREATE TABLE IF NOT EXISTS `history` (
    `userId` varchar(18) NOT NULL,
    `ticker` varchar(255) NOT NULL,
    `shares` int(11) NOT NULL,
    `price` float NOT NULL,
    `timestamp` date NOT NULL,
    `type` varchar(10) NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES `wallet` (`userId`),
    FOREIGN KEY (`userId`, `ticker`) REFERENCES `stocks` (`userId`, `ticker`)
);

CREATE TABLE IF NOT EXISTS `session` (
    `sid` varchar(100) NOT NULL,
    `session` varchar(2048) NOT NULL DEFAULT '{}',
    `lastSeen` datetime NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`sid`)
);

CREATE TABLE IF NOT EXISTS `users` (
    `userId` char(18) NOT NULL,
    `email` varchar(255) NOT NULL,
    `username` varchar(255) NOT NULL,
    `avatarUrl` varchar(255) NOT NULL,
    `accessToken` varchar(255) DEFAULT NULL,
    `refreshToken` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`userId`)
);