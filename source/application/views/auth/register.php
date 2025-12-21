<div class="register-box">
  <div class="register-logo">
    <?= COMPANY_NAME; ?>
  </div>
  <div class="card">
    <div class="card-body register-card-body">
      <p class="register-box-msg">Register a new membership</p>

      <form action="<?= base_url('register'); ?>" method="post" enctype="multipart/form-data">
        <div class="input-group mb-3">
          <input type="text" class="form-control <?= form_error('name') ? 'is-invalid' : '' ?>" name="name" placeholder="Name" title="<?= strip_tags(form_error('name')) ?>" value="<?= set_value('name') ?>" />
          <div class="input-group-text">
            <span class="bi bi-person"></span>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="email" class="form-control <?= form_error('email') ? 'is-invalid' : '' ?>" name="email" placeholder="Email" title="<?= strip_tags(form_error('email')) ?>" value="<?= set_value('email') ?>" />
          <div class=" input-group-text">
            <span class="bi bi-envelope"></span>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control <?= form_error('password') ? 'is-invalid' : '' ?>" name="password" placeholder="Password" title="<?= strip_tags(form_error('password')) ?>" />
          <div class="input-group-text">
            <span class="bi bi-lock-fill"></span>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="form-check">
              <!-- <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label class="form-check-label" for="flexCheckDefault">
                I agree to the <a href="#">terms</a>
              </label> -->
            </div>
          </div>
          <div class="col-4">
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">Sign In</button>
            </div>
          </div>
        </div>
      </form>

      <p class="mb-0">
        <a href="<?= base_url('login'); ?>" class="text-center"> I already have a membership </a>
      </p>
    </div>
  </div>
</div>