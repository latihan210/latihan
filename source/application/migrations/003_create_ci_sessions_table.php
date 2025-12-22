<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Migration_Create_ci_sessions_table extends CI_Migration
{

    public function up()
    {
        // Create ci_sessions table compatible with CI session DB driver
        $this->dbforge->add_field([
            'id' => [
                'type' => 'VARCHAR',
                'constraint' => 128,
                'null' => FALSE
            ],
            'ip_address' => [
                'type' => 'VARCHAR',
                'constraint' => 45,
                'null' => FALSE
            ],
            'timestamp' => [
                'type' => 'INT',
                'constraint' => 10,
                'unsigned' => TRUE,
                'default' => 0
            ],
            'data' => [
                'type' => 'BLOB',
                'null' => FALSE
            ]
        ]);
        $this->dbforge->add_key('id', TRUE);
        $this->dbforge->add_key('timestamp');
        $this->dbforge->create_table('ci_sessions', TRUE);
    }

    public function down()
    {
        $this->dbforge->drop_table('ci_sessions', TRUE);
    }
}
