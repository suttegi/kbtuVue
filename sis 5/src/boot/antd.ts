import { defineBoot } from '#q-app';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

export default defineBoot(({ app }) => {
  app.use(Antd);
});
