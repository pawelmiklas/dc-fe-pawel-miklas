import { router } from "./router";
import { createApp, provide, h } from "vue";
import App from "./App.vue";
import { apolloClient } from "./apollo";
import { DefaultApolloClient } from "@vue/apollo-composable";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(router);
app.mount("#app");
