<template>
<div class="container login">
  <form class="form-horizontal" role="form" method="POST" action="/login">
      <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
              <i class="fab fa-instagram fa-5x"></i>
              <h2>JEBRETgram</h2>
              <hr>
          </div>
      </div>
      <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
              <div class="form-group has-danger">
                  <label class="sr-only" for="name">Name</label>
                  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                      <div class="input-group-addon" style="width: 2.6rem"><i class="far fa-user"></i></div>
                      <input type="text" name="name" class="form-control" v-model='name' id="name" placeholder="name" required autofocus>
                  </div>
              </div>
          </div>
          <div class="col-md-3">
              <div class="form-control-feedback">
                <!-- error message if any -->
              </div>
          </div>
      </div>
      <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
              <div class="form-group has-danger">
                  <label class="sr-only" for="email">E-Mail Address</label>
                  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                      <div class="input-group-addon" style="width: 2.6rem"><i class="far fa-envelope"></i></div>
                      <input type="text" name="email" class="form-control" v-model='email' id="email" placeholder="email@email.com" required autofocus>
                  </div>
              </div>
          </div>
          <div class="col-md-3">
              <div class="form-control-feedback">
                <!-- error message if any -->
              </div>
          </div>
      </div>
      <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
              <div class="form-group">
                  <label class="sr-only" for="password">Password</label>
                  <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                      <div class="input-group-addon" style="width: 2.6rem"><i class="fas fa-key"></i></div>
                      <input type="password" name="password" v-model='password' class="form-control" id="password" placeholder="password" required>
                  </div>
              </div>
          </div>
          <div class="col-md-3">
              <div class="form-control-feedback">
                  <span class="text-danger align-middle">
                  <!-- Put password error message here -->    
                  </span>
              </div>
          </div>
      </div>
      <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6" style="padding-top: .35rem">
              <div class="form-check mb-2 mr-sm-2 mb-sm-0">
                  
              </div>
          </div>
      </div>
      <div class="row" style="padding-top: 1rem">
          <div class="col-md-3"></div>
          <div class="col-md-6">
              <button type="submit" class="btn btn-success" @click='signup'><i class="fas fa-sign-in-alt"></i> SignUp</button>
          </div>
      </div>
  </form>
</div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      token: ''
    }
  },
  methods: {
    signup: function () {
      let url = 'http://localhost:3000/login/signup'
      Axios.post(url, {
        name: this.name,
        email: this.email,
        password: this.password
      })
        .then(data => {
          this.token = data.headers
          console.log(data)
          this.$router.push('/')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.login
{
  text-align: center;
  padding-top: 10rem;
  padding-bottom: 60px;
}
</style>
