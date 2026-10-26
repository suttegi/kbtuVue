<template>
  <q-page class="flex flex-center text-center">
    <div>
      <div class="code">404</div>
      <p class="subhead q-mt-md">this page doesn’t exist.</p>
      <q-btn
        unelevated
        no-caps
        color="primary"
        label="back to store"
        class="pill q-mt-lg"
        to="/store"
      />
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.code {
  font-size: 160px;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
}
</style>
