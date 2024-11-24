import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import TheTypingTest from "../../src/components/TheTypingTest.vue";

const pinia = createTestingPinia({
    initialState: {
        typingTest: {
            testText: "The quick brown fox jumps over the lazy dog",
            typedText: "",
            startTime: null,
            endTime: null,
            testStarted: false,
            testEnded: false,
        },
    },
});

describe("TheTypingTest", () => {
    it("renders properly", () => {
        const wrapper = mount(TheTypingTest, {
            global: {
                plugins: [pinia],
            },
        });
        const wordCountIndicator = wrapper.find(".count-indicator");
        const wpmIndicator = wrapper.find(".wpm-indicator");
        const textInput = wrapper.find("input.test-input");
        const buttons = wrapper.find(".buttons");

        expect(wrapper).toBeTruthy();
        expect(wordCountIndicator).toBeTruthy();
        expect(textInput).toBeTruthy();
        expect(wpmIndicator).toBeTruthy();
        expect(buttons).toBeTruthy();
    });
});
