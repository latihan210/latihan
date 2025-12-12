<?php if (! defined('BASEPATH')) exit('No direct script access allowed');
?>
<p>Halo <?php echo isset($name) ? $name : 'user'; ?>,</p>
<p>Kami menerima permintaan untuk mereset password akun Anda. Klik link di bawah ini untuk mengganti password (link berlaku 1 jam):</p>
<p><a href="<?php echo $reset_link; ?>"><?php echo $reset_link; ?></a></p>
<p>Jika Anda tidak meminta reset, abaikan pesan ini.</p>