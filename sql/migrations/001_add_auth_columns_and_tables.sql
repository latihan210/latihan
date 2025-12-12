-- UP: add reset_token, reset_expires, image; create login_attempts and auth_logs
ALTER TABLE `users`
  ADD COLUMN `reset_token` VARCHAR(128) DEFAULT NULL,
  ADD COLUMN `reset_expires` INT(11) DEFAULT NULL,
  ADD COLUMN `image` VARCHAR(255) DEFAULT NULL;

CREATE TABLE IF NOT EXISTS `login_attempts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ip` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `attempts` INT DEFAULT 0,
  `last_attempt` INT(11) DEFAULT NULL,
  `locked_until` INT(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX (`ip`),
  INDEX (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `auth_logs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `event` VARCHAR(50) NOT NULL,
  `ip` VARCHAR(45) DEFAULT NULL,
  `user_agent` VARCHAR(255) DEFAULT NULL,
  `meta` TEXT DEFAULT NULL,
  `created_at` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX (`user_id`),
  INDEX (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- DOWN: rollback (drop columns/tables)
-- To rollback manually, run:
-- ALTER TABLE `users` DROP COLUMN `reset_token`, DROP COLUMN `reset_expires`, DROP COLUMN `image`;
-- DROP TABLE IF EXISTS `login_attempts`;
-- DROP TABLE IF EXISTS `auth_logs`;
