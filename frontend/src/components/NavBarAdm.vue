<template>
    <div>
        <v-app-bar dark class="primary">
            <v-toolbar-title>Black Bull Temple</v-toolbar-title>
            <v-spacer/>
            <v-btn text to="/admin/products">Shop</v-btn>
            <v-menu offset-y>
                <template v-slot:activator="{ attrs, on}">
                    <v-btn text v-bind="attrs" v-on="on">{{a_name}}</v-btn>
                </template>
                <v-list dark class="primary">
                    <v-list-item to="/profile">Profile</v-list-item>
                    <v-list-item @click="SignOut()">Sign out</v-list-item>
                </v-list>
            </v-menu>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    methods: {
        SignOut() {
            sessionStorage.clear();
            this.$router.push("/");
        }
    },
    props: ['a_name']
}
</script>