<template>
  <q-page class="flex flex-center page">
    <div class="login">
      <div class="login__logo">quan</div>
      <h1 class="login__title">sign in to quan.</h1>

      <q-form class="column q-gutter-md q-mt-lg">
        <q-input v-model="username" outlined label="username" />
        <q-input v-model="password" outlined type="password" label="password" />
        <q-btn
          unelevated
          no-caps
          color="primary"
          label="continue"
          class="pill q-mt-lg"
          type="submit"
        />
      </q-form>

      <p class="muted login__hint">demo account: emilys / emilyspass</p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
    };
  },
});
</script>

<style scoped lang="scss">
.page {
  padding: 64px 22px;
}

.login {
  width: 100%;
  max-width: 380px;
  text-align: center;
}

.login__logo {
  font-size: 28px;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.login__title {
  margin: 16px 0 0;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.login__hint {
  margin-top: 24px;
  font-size: 13px;
}
</style>
