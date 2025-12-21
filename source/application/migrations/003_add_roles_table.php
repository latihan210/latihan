<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Migration_Add_roles_table extends CI_Migration
{

    public function up()
    {
        // create roles table
        $this->dbforge->add_field(array(
            'id' => array('type' => 'INT', 'constraint' => 11, 'unsigned' => TRUE, 'auto_increment' => TRUE),
            'name' => array('type' => 'VARCHAR', 'constraint' => '100'),
            'description' => array('type' => 'VARCHAR', 'constraint' => '255', 'null' => TRUE),
            'created_at' => array('type' => 'INT', 'constraint' => 11),
        ));
        $this->dbforge->add_key('id', TRUE);
        $this->dbforge->create_table('roles', TRUE);

        // seed default roles
        $now = time();
        $roles = array(
            array('name' => 'admin', 'description' => 'Administrator', 'created_at' => $now),
            array('name' => 'user', 'description' => 'Regular user', 'created_at' => $now),
        );
        $this->db->insert_batch('roles', $roles);

        // add role_id to users
        $fields = array(
            'role_id' => array('type' => 'INT', 'constraint' => 11, 'null' => TRUE),
        );
        $this->dbforge->add_column('users', $fields);
    }

    public function down()
    {
        $this->dbforge->drop_column('users', 'role_id');
        $this->dbforge->drop_table('roles', TRUE);
    }
}
