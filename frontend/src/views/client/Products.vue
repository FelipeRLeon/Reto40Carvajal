<template>
  <v-container>
    <NavBarClient :c_name="client.name"/>
    <h1 class="font-weight-light">All courses</h1>
    <v-row justify="center">
      <v-card class="ma-3" max-width="344" v-for="product in productsList" :key="product.id_p">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>
        <v-card-title>{{ product.p_name }}</v-card-title>
        <v-card-subtitle>{{ product.p_category }}</v-card-subtitle
        >
        <v-card-text>
          <div>Price: ${{ product.p_price }}</div>
          <div>Stock: {{ product.p_amount }} units</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="purple" dark @click="addToCart(product.id_p)">Add to cart</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
            <v-card-text>
              <div>Information</div>
              <div>{{ product.p_info }}</div>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import NavBarClient from '@/components/NavBarClient';
export default {
  data: () => ({
    client: {},
    productsList: {},
    show: false,
  }),
  methods: {
      addToCart(id_p) {
          try {
              console.log('ok');
          } catch (error) {
              console.log(error);
              
          }
      }
  },
  created: async function () {
      this.client = JSON.parse(sessionStorage.getItem('session'));
      if (this.client == null){
          this.$router.push('/');
      } else if (this.client.role != 'client') {
          this.$router.push('/profile');
      } else {
          try {
              const res = await this.axios.get('/client/allproducts');
              this.productsList = res.data;
              console.log(this.productsList);
          } catch (error) {
              console.log(error);
              
          }
      }
  },
  components: {
    NavBarClient
  }
};
</script>