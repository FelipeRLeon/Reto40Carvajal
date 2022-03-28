<template>
  <v-container>
      <v-alert text v-model="alert.show" :type="alert.type" dismissible>{{alert.message}}</v-alert>
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
    <v-dialog v-model="add" max-width="450" class="ma-3">
        <v-card>
            <v-card-title>Add a product</v-card-title>
            <v-card-text>
                <v-form ref="addForm" @submit.prevent="addProduct()">
                    <v-text-field
                    prepend-icon = "mdi-star-circle"
                    label="Name"
                    :rules="[(v) => !!v || 'Name is required']"
                    v-model="productToAdd.p_name"
                    ></v-text-field>
                    <v-text-field
                    prepend-icon = "mdi-shape"
                    label="Category"
                    :rules="[(v) => !!v || 'Category is required']"
                    v-model="productToAdd.p_category"
                    ></v-text-field>
                    <v-text-field
                    prepend-icon = "mdi-cash"
                    label="Price"
                    type="number"
                    :rules="[(v) => !!v || 'Price is required']"
                    v-model="productToAdd.p_price"
                    ></v-text-field>
                    <v-text-field
                    prepend-icon = "mdi-abacus"
                    label="Amount"
                    type="number"
                    :rules="[(v) => !!v || 'Amount is required']"
                    v-model="productToAdd.p_amount"
                    ></v-text-field>
                    <v-textarea
                    prepend-icon = "mdi-information"
                    label="Information"
                    :rules="[(v) => !!v || 'Info is required']"
                    v-model="productToAdd.p_info"
                    ></v-textarea>
                    
                    <v-btn block class="success mt-3" type="submit">add</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>

    <v-btn @click="add=true" color="blue" large right fixed bottom fab dark>
        <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    alert: {show: false},
    admin: {},
    productsList: [],
    productToAdd: {p_img: "xxx"},
    add: false,
    show: false
  }),
  methods:{
      async addProduct() {
          this.add=true;
          let valid = this.$refs.addForm.validate();
          if (valid) {
              try {
                  const res = await this.axios.post('/admin/createproduct', this.productToAdd);
                  this.productsList.push(res.data.product);
                  this.$refs.addForm.reset();
                  this.add=false;
                  this.alert = {
                    show: true,
                    type: 'success',
                    message: res.data.message
                }

              } catch (error) {
                  this.alert = {
                    show: true,
                    type: 'error',
                    message: error.response.data.message
                }
                console.log(error.response.data.message);
              }

          }
      }

  },
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