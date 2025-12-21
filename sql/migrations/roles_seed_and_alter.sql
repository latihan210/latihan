-- Add roles table (if not using CI migrations)
CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `created_at` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default roles
INSERT INTO `roles` (`name`, `description`, `created_at`) VALUES
('admin', 'Administrator', UNIX_TIMESTAMP()),
('user', 'Regular user', UNIX_TIMESTAMP())
ON DUPLICATE KEY UPDATE description=VALUES(description);

-- Add role_id column to users if missing
ALTER TABLE `users` 
  ADD COLUMN IF NOT EXISTS `role_id` INT(11) NULL;

-- (Optional) set existing users to 'user' role by default
UPDATE `users` u JOIN (SELECT id FROM roles WHERE name='user' LIMIT 1) r 
  SET u.role_id = r.id 
  WHERE u.role_id IS NULL;

-- Add foreign key (optional)
ALTER TABLE `users` 
  ADD CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL ON UPDATE CASCADE;
