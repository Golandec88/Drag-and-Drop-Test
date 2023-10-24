import AppComponent from "@/components/app/app.component.vue";
import { mount } from "@vue/test-utils";

test('AppComponent has "App Component!" message inside', () => {
  const component = mount(AppComponent);

  expect(component.text()).toContain("App Component!");
});
