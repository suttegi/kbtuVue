<template>
  <a-button type="link" class="back" @click="router.push({ name: 'students' })">
    ← all students
  </a-button>

  <ErrorState v-if="student.error.value" :message="student.error.value" @retry="load" />

  <a-skeleton
    v-else-if="student.loading.value || !profile"
    active
    avatar
    :paragraph="{ rows: 4 }"
  />

  <template v-else>
    <div class="head">
      <a-avatar :src="profile.image" :size="72" />
      <div>
        <h1 class="page-title">{{ profile.firstName }} {{ profile.lastName }}</h1>
        <a-typography-text type="secondary">{{ profile.university }}</a-typography-text>
      </div>
    </div>

    <a-card title="profile" :bordered="false" class="card">
      <a-descriptions :column="{ xs: 1, sm: 2 }">
        <a-descriptions-item label="email">{{ profile.email }}</a-descriptions-item>
        <a-descriptions-item label="phone">{{ profile.phone }}</a-descriptions-item>
        <a-descriptions-item label="age">{{ profile.age }}</a-descriptions-item>
        <a-descriptions-item label="gender">{{ profile.gender }}</a-descriptions-item>
        <a-descriptions-item label="birth date">{{ profile.birthDate }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card :bordered="false" class="card">
      <template #title>
        tasks
        <a-tag v-if="taskList.length" class="count">{{ doneCount }} / {{ taskList.length }}</a-tag>
      </template>

      <a-alert v-if="tasks.error.value" type="error" :message="tasks.error.value" show-icon>
        <template #action>
          <a-button size="small" @click="tasks.run(id)">retry</a-button>
        </template>
      </a-alert>

      <a-list
        v-else
        :data-source="taskList"
        :loading="tasks.loading.value"
        :locale="{ emptyText: 'no tasks yet' }"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-typography-text :delete="item.completed">{{ item.todo }}</a-typography-text>
            <template #actions>
              <a-tag :color="item.completed ? 'green' : 'default'">
                {{ item.completed ? 'done' : 'open' }}
              </a-tag>
            </template>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </template>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ErrorState from '@/components/ErrorState.vue';
import { getStudent, getStudentTasks } from '@/api/students';
import { useRequest } from '@/composables/useRequest';

const route = useRoute();
const router = useRouter();

const student = useRequest(getStudent);
const tasks = useRequest(getStudentTasks);

const id = computed(() => Number(route.params.id));
const profile = computed(() => student.data.value);
const taskList = computed(() => tasks.data.value ?? []);
const doneCount = computed(() => taskList.value.filter((t) => t.completed).length);

function load() {
  void student.run(id.value);
  void tasks.run(id.value);
}

watch(id, load, { immediate: true });
</script>

<style scoped lang="scss">
.back {
  padding: 0;
  margin-bottom: 16px;
}

.head {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.card {
  margin-bottom: 16px;
}

.count {
  margin-left: 8px;
}
</style>
