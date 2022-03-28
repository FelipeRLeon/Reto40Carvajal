<template>
  <v-container>
    <NavBarClient :c_name="client.name" />
    <v-container>
      <v-row>
        <h1 class="font-weight-light">Wish List</h1>
      </v-row>
      <v-row>
        <v-col class="text-center">
          <v-data-table :headers="headers" :items="cart" class="elevatio-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Wish List</v-toolbar-title>
              </v-toolbar>
            </template>

            
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import NavBarClient from "@/components/NavBarClient";
export default {
  data: () => ({
    client: {},
    cart: [],
    productsList: {},
    headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'p_name',
        },
        { text: 'Category', value: 'p_category' },
        { text: 'Price', value: 'p_price' },
        { text: 'Stock', value: 'p_amount' }
      ],
  }),
  created: async function () {
    if (JSON.parse(sessionStorage.getItem("shopcart"))) {
      this.cart = JSON.parse(sessionStorage.getItem("shopcart"));
    } else {
      this.cart = [];
    }
    this.client = JSON.parse(sessionStorage.getItem("session"));
    if (this.client == null) {
      this.$router.push("/");
    } else if (this.client.role != "client") {
      this.$router.push("/profile");
    } else {
      try {
        const res = await this.axios.get("/client/allproducts");
        this.productsList = res.data;
        console.log(this.productsList);
      } catch (error) {
        console.log(error);
      }
    }
  },

  components: {
    NavBarClient,
  },
};
</script>