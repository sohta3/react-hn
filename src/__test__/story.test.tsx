import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import { Story } from "../components/Story";
import { storyIds, singularStory } from "../fixtures";
import { getStory, getStoryIds } from "../services/hnAPI";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { STORY_INCREMENT } from "../constants";

jest.mock("../hooks/useInfiniteScroll");
jest.mock("../services/hnAPI", () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn()
}));

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

test("renders the application", async () => {
  useInfiniteScroll.mockImplementation(() => STORY_INCREMENT);
  getStory.mockImplementation(() => Promise.resolve(singularStory));
  getStoryIds.mockImplementation(() => Promise.resolve(storyIds));

  const { getByText, queryByTestId } = render(<Story />);
  await waitForElement(() => [
    expect(getByText("Tarnished: Google Responds")).toBeTruthy(),
    expect(queryByTestId("story-by").textContent).toEqual("By: Karl Hadwen")
  ]);
});
