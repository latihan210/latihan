<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Migration_Add_auth_columns_and_tables extends CI_Migration
{

    public function up()
    {
        // add columns to users
        $fields = array(
            'reset_token' => array('type' => 'VARCHAR', 'constraint' => '128', 'null' => TRUE),
            'reset_expires' => array('type' => 'INT', 'constraint' => 11, 'null' => TRUE),
            'image' => array('type' => 'VARCHAR', 'constraint' => '255', 'null' => TRUE),
        );
        $this->dbforge->add_column('users', $fields);

        // create login_attempts table
        $this->dbforge->add_field(array(
            'id' => array('type' => 'INT', 'constraint' => 11, 'unsigned' => TRUE, 'auto_increment' => TRUE),
            'ip' => array('type' => 'VARCHAR', 'constraint' => '45'),
            'email' => array('type' => 'VARCHAR', 'constraint' => '255', 'null' => TRUE),
            'attempts' => array('type' => 'INT', 'constraint' => 11, 'default' => 0),
            'last_attempt' => array('type' => 'INT', 'constraint' => 11, 'null' => TRUE),
            'locked_until' => array('type' => 'INT', 'constraint' => 11, 'null' => TRUE),
        ));
        $this->dbforge->add_key('id', TRUE);
        $this->dbforge->create_table('login_attempts', TRUE);

        // create auth_logs table
        $this->dbforge->add_field(array(
            'id' => array('type' => 'INT', 'constraint' => 11, 'unsigned' => TRUE, 'auto_increment' => TRUE),
            'user_id' => array('type' => 'INT', 'constraint' => 11, 'null' => TRUE),
            'email' => array('type' => 'VARCHAR', 'constraint' => '255', 'null' => TRUE),
            'event' => array('type' => 'VARCHAR', 'constraint' => '50'),
            'ip' => array('type' => 'VARCHAR', 'constraint' => '45', 'null' => TRUE),
            'user_agent' => array('type' => 'VARCHAR', 'constraint' => '255', 'null' => TRUE),
            'meta' => array('type' => 'TEXT', 'null' => TRUE),
            'created_at' => array('type' => 'INT', 'constraint' => 11),
        ));
        $this->dbforge->add_key('id', TRUE);
        $this->dbforge->create_table('auth_logs', TRUE);
    }

    public function down()
    {
        $this->dbforge->drop_table('auth_logs', TRUE);
        $this->dbforge->drop_table('login_attempts', TRUE);

        // drop columns from users
        $this->dbforge->drop_column('users', 'reset_token');
        $this->dbforge->drop_column('users', 'reset_expires');
        $this->dbforge->drop_column('users', 'image');
    }
}
