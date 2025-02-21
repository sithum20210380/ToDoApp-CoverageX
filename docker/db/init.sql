-- Create the tasks table with all necessary columns
CREATE TABLE IF NOT EXISTS `Tasks` (
    `Id` char(36) NOT NULL,
    `Title` varchar(100) NOT NULL,
    `Description` text,
    `IsCompleted` bit NOT NULL DEFAULT 0,
    `CreatedAt` datetime NOT NULL,
    `CompletedAt` datetime NULL,
    PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create indexes for better query performance
-- Index for sorting by creation date (newest first)
CREATE INDEX `IX_Tasks_CreatedAt` ON `Tasks` (`CreatedAt` DESC);
-- Index for filtering completed/incomplete tasks
CREATE INDEX `IX_Tasks_IsCompleted` ON `Tasks` (`IsCompleted`);