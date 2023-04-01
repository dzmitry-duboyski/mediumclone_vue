<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <RouterLink :to="{path: 'register'}">Need an account?</RouterLink>
          </p>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group pt-2 pb-2 ">
              <input type="text" class="form-control form-control-lg" placeholder="email" v-model="email" />
            </fieldset>
            
            <fieldset class="form-group pt-2 pb-2">
              <input type="password" class="form-control form-control-lg" placeholder="password" v-model="password" />
            </fieldset>
            
            <button class="btn btn-lg btn-primary pull-xs-rigth pt-2 pb-2" :disabled="isSubmitting">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" :hidden="!isSubmitting"></span>
              Sign in
            </button>
          </form>
          <McvValidationErrors v-if="validationErrors" :validationErrors="validationErrors"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors.vue'
import {actionTypes} from '@/store/modules/auth'

export default {
  name: 'McvLogin',
  components: {
    McvValidationErrors,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors
    },
  },
  methods: {
    onSubmit() {
      console.log('submithed form')
      this.$store
        .dispatch(actionTypes.login, {
          password: this.password,
          email: this.email,
        })
        .then((user) => {
          console.log('successfully login')
          console.log(user)
          this.$router.push({name: 'home'})
        })
    },
  },
}
</script>
