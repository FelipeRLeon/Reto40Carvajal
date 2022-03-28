<template>
  <v-container>
    <h1>Products</h1>
    <v-row justify="center">
      <v-card class="ma-3" max-width="344" v-for="product in productsList" :key="product.id_p">
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>
        <v-card-title>{{product.p_name}}</v-card-title>
        <v-card-subtitle>{{product.p_category}}</v-card-subtitle>
        <v-card-text>
                <div >Price: ${{product.p_price}}</div>
                <div>Stock: {{product.p_amount}} units</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" small dark><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn color="red" small dark><v-icon>mdi-delete</v-icon></v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <v-card-text>
                    <div>Information</div>
                    <div>{{product.p_info}}</div>
                </v-card-text>
            </div>
        </v-expand-transition>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    admin: {},
    productsList: [],
    show: false
  }),
  created: async function () {
    this.admin = JSON.parse(sessionStorage.getItem("session"));
    if (this.admin == null) {
      this.$router.push("/");
    } else if (this.admin.role != "admin") {
      this.$router.push("/profile");
    } else {
      try {
        const res = await this.axios.get('/admin/allproducts', this.admin);
        this.productsList = res.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  
};
</script>