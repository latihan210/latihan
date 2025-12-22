Production migration steps (run on production DB only):

1. Ensure `.env` (or environment variables) set:

```
APP_ENV=production
BASE_URL=https://your-domain.tld/
APP_KEY=replace_with_strong_random_key
DB_HOST=127.0.0.1
DB_USER=your_prod_db_user
DB_PASS=your_prod_db_pass
DB_NAME=your_prod_db_name
SESS_DRIVER=database
SESS_SAVE_PATH=ci_sessions
```

2. Apply SQL migrations (if not using CI migrations):

- Run these SQL files in order using your DB client:
  - `sql/migrations/001_add_auth_columns_and_tables.sql`
  - `sql/migrations/roles_seed_and_alter.sql`
  - `sql/migrations/002_create_ci_sessions_table.sql`

5. (Optional) Generate role config used by menu visibility

- If you prefer menu role arrays to match DB role IDs automatically, run the helper script to generate `application/config/roles.php`:

```
php source/tools/generate_roles_config.php
```

The script reads DB credentials from environment variables and writes a mapping `['role_name' => id, ...]` to `application/config/roles.php`.

3. Using CodeIgniter migrations (preferred):

- Enable migrations in `application/config/migration.php` and set `$config['migration_enabled'] = TRUE;` and `$config['migration_version']` to the latest migration number.
- From project root, run (if you have a CLI entrypoint that boots CI):

```
php index.php migrate latest
```

(Adjust command to your deployment environment or use a small migration runner script.)

4. After migrations, restart PHP-FPM / web server and verify login/session behavior.

Notes:

- Back up the database before running migrations.
- Verify that `SESS_DRIVER` and `SESS_SAVE_PATH` are set in production environment.
