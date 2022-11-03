import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import VCard from "../VCard.vue";

describe("VCard", () => {
  it("imports the VCard component", async () => {
    const importedComponent = await import("../VCard.vue");

    expect(importedComponent).toBeDefined();
  });

  it("renders the VCard component", async () => {
    const wrapper = mount(VCard, { slots: { default: "Hello World" } });

    expect(wrapper.text()).toBe("Hello World");
  });

  it("shows the data-testid attribute in the DOM", async () => {
    const wrapper = mount(VCard);

    expect(wrapper.attributes("data-testid")).toBe("v-card");
  });
});
