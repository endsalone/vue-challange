import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import VCardTitle from "../VCardTitle.vue";

describe("VCardTitle", () => {
  it("imports the VCardTitle component", async () => {
    const importedComponent = await import("../VCardTitle.vue");

    expect(importedComponent).toBeDefined();
  });

  it("renders the VCardTitle component without props", async () => {
    const wrapper = mount(VCardTitle, { slots: { default: "Hello World" } });

    expect(wrapper.text()).toBe("Hello World");
    expect(wrapper.classes()).not.toContain("text-center");
    expect(wrapper.classes()).not.toContain("text-right");
    expect(wrapper.classes()).not.toContain("text-left");
  });

  it("renders the VCardTitle component center prop", async () => {
    const wrapper = mount(VCardTitle, { props: { center: true } });

    expect(wrapper.classes()).toContain("text-center");
    expect(wrapper.classes()).not.toContain("text-right");
    expect(wrapper.classes()).not.toContain("text-left");
  });

  it("renders the VCardTitle component right prop", async () => {
    const wrapper = mount(VCardTitle, { props: { right: true } });

    expect(wrapper.classes()).toContain("text-right");
    expect(wrapper.classes()).not.toContain("text-center");
    expect(wrapper.classes()).not.toContain("text-left");
  });

  it("renders the VCardTitle component left prop", async () => {
    const wrapper = mount(VCardTitle, { props: { left: true } });

    expect(wrapper.classes()).toContain("text-left");
    expect(wrapper.classes()).not.toContain("text-right");
    expect(wrapper.classes()).not.toContain("text-center");
  });

  it("shows the data-testid attribute in the DOM", async () => {
    const wrapper = mount(VCardTitle);

    expect(wrapper.attributes("data-testid")).toBe("v-card-title");
  });
});
