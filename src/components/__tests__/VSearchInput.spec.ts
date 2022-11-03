import { describe, it, expect, vi } from "vitest";

import { mount } from "@vue/test-utils";
import VSearchInput from "../VSearchInput.vue";

describe("VSearchInput", () => {
  it("imports the VSearchInput component", async () => {
    const importedComponent = await import("../VSearchInput.vue");

    expect(importedComponent).toBeDefined();
  });

  it("renders the VSearchInput component with disabled search input", async () => {
    const wrapper = mount(VSearchInput);

    const isDisabled = (wrapper.find("[data-testid='v-search-input']").element as HTMLInputElement)
      .disabled;
    expect(isDisabled).toBe(true);
    expect(wrapper.find("[data-testid='v-search-edit-button']").exists()).toBe(true);
  });

  it("enables the search input and focus it after clicking the edit button", async () => {
    const wrapper = mount(VSearchInput, { attachTo: document.body });
    const editButton = wrapper.find("[data-testid='v-search-edit-button']");
    await editButton.trigger("click");

    const searchInputElement = wrapper.find("[data-testid='v-search-input']").element;
    expect((searchInputElement as HTMLInputElement).disabled).toBe(false);
    expect(document.activeElement).toBe(searchInputElement);
  });

  it("runs onSearch with the value prop when the search is loaded", async () => {
    const onSearch = vi.fn();
    mount(VSearchInput, {
      props: {
        value: "http://test.com",
        onSearch,
      },
    });

    expect(onSearch).toHaveBeenCalledWith("http://test.com");
  });

  it("runs onSearch with the typed value when press enter", async () => {
    const onSearch = vi.fn();
    const wrapper = mount(VSearchInput, {
      props: {
        value: "http://test.com",
        onSearch,
      },
    });

    const editButton = wrapper.find("[data-testid='v-search-edit-button']");
    await editButton.trigger("click");
    const searchInputElement = wrapper.find("[data-testid='v-search-input']");
    await searchInputElement.setValue("http://test2.com");
    await searchInputElement.trigger("keydown.enter");

    expect(onSearch).toBeCalledWith("http://test2.com");
  });

  it("runs the onSearch prop after clicking the search button", async () => {
    const onSearch = vi.fn();
    const wrapper = mount(VSearchInput, {
      attachTo: document.body,
      props: { onSearch },
    });

    const editButton = wrapper.find("[data-testid='v-search-edit-button']");
    await editButton.trigger("click");
    const searchInputElement = wrapper.find("[data-testid='v-search-input']");
    await searchInputElement.setValue("test");
    const searchButtonElement = wrapper.find("[data-testid='v-search-button']");
    await searchButtonElement.trigger("click");

    expect((searchInputElement.element as HTMLInputElement).disabled).toBe(false);
    expect(onSearch).toBeCalledWith("test");
  });

  it("shows alert when onSearch rejects", async () => {
    const onSearch = vi.fn().mockImplementation((query) => {
      if (query === "test") {
        return Promise.reject(new Error("test error"));
      }
      return Promise.resolve();
    });
    const alert = vi.spyOn(window, "alert").mockImplementation(() => {
      return;
    });
    const wrapper = mount(VSearchInput, {
      attachTo: document.body,
      props: { onSearch },
    });

    const editButton = wrapper.find("[data-testid='v-search-edit-button']");
    await editButton.trigger("click");
    const searchInputElement = wrapper.find("[data-testid='v-search-input']");
    await searchInputElement.setValue("test");
    const searchButtonElement = wrapper.find("[data-testid='v-search-button']");
    await searchButtonElement.trigger("click");

    expect(alert).toBeCalledWith("Error loading participants; Enter a valid URL");
  });
});
