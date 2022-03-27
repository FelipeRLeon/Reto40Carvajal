<template>
<v-container>

  <v-row justify="center" >
    <v-col class="text-center" md="2" sm="2">
      <v-btn class="primary">sign up</v-btn>
    </v-col>
    <v-col class="text-center" md="2" sm="2">
      <v-btn class="success">sign in</v-btn>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col md="6" sm="6">
      <v-card>
        <v-card-title>Sign Up</v-card-title>
        <v-card-text>
          <v-form class="ma-3" @submit.prevent="signup()" ref="signupForm">
            <v-text-field
            label="Name"
            prepend-icon="mdi-account"
            :rules="nameRules"
            v-model="user.name"
            ></v-text-field>
            <v-text-field
            label="E-mail"
            prepend-icon="mdi-email"
            :rules="emailRules"
            v-model="user.email"
            ></v-text-field>
            <v-text-field
            label="Password"
            prepend-icon="mdi-lock"
            type="password"
            :rules="passwordRules"
            v-model="user.password"
            ></v-text-field>

            <v-radio-group row :rules="[(v) => !!v || 'Please choose one']" v-model="user.role">
            <v-radio label="admin" value="admin"></v-radio>
            <v-radio label="client" value="client"></v-radio>
            </v-radio-group>

            <v-btn block class="primary mt-3" type="submit">Sign up</v-btn>
          </v-form>

          


        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  data: () =>({
    nameRules: [
      value => !!value || 'Name is required',
      value => (value && value.length>=5 || 'Name must be more than 5 characters' )
    ],

    emailRules: [
      value =>!!value || 'Email is required',
      value => /.+@.+\..+/.test(value) || 'E-mail must be valid'
    ],
    passwordRules: [
      value =>!!value || 'Password is required',
      value => (value && value.length>=2 || 'Name must be more than 2 characters' )
    ],
    user: {name: '', email: '', password: '', role: ''}
  }),
  methods: {
    async signup() {
      let valid = this.$refs.signupForm.validate();
      if (valid) {
        try {
          
        } catch (error) {
          
        }

      }

    }
  }
};
</script>
