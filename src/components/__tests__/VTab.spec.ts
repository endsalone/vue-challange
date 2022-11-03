import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import VTab from "../VTab.vue";

describe("VTab", () => {
  it("imports the VTab component", async () => {
    const importedComponent = await import("../VTab.vue");

    expect(importedComponent).toBeDefined();
  });

  it("renders the VTab component", async () => {
    const wrapper = mount(VTab, { slots: { default: "Hello World" } });

    expect(wrapper.text()).toBe("Hello World");
  });

  it("shows the data-testid attribute in the DOM", async () => {
    const wrapper = mount(VTab);

    const dataTestid = wrapper.find("[data-testid='v-tabs']");
    expect(dataTestid.exists()).toBe(true);
  });
});
