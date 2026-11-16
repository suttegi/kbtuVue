<template>
  <a-result status="404" title="404" sub-title="Oops. Nothing here...">
    <template #extra>
      <router-link to="/">
        <a-button type="primary">Go Home</a-button>
      </router-link>
    </template>
  </a-result>
</template>
