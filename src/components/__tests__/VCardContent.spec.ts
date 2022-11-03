import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import VCardContent from "../VCardContent.vue";

describe("VCardContent", () => {
  it("imports the VCardContent component", async () => {
    const importedComponent = await import("../VCardContent.vue");

    expect(importedComponent).toBeDefined();
  });

  it("renders the VCardContent component", async () => {
    const wrapper = mount(VCardContent, { slots: { default: "Hello World" } });

    expect(wrapper.text()).toBe("Hello World");
  });

  it("shows the data-testid attribute in the DOM", async () => {
    const wrapper = mount(VCardContent);

    expect(wrapper.attributes("data-testid")).toBe("v-card-content");
  });
});
