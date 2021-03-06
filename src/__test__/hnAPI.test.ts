import axios from "axios";
import {
  getStoryIds,
  getStory,
  newStoriesUrl,
  storyUrl
} from "../services/hnAPI";

import { singularStory, storyIds, emptySingularStory } from "../fixtures";

jest.mock("axios");

describe("HackerNews API", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("getStory functionality", () => {
    it("requests and gets a story from the HackerNews API", async () => {
      axios.get.mockImplementation(() =>
        Promise.resolve({ data: singularStory })
      );

      const entity = await getStory(1);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${storyUrl + 1}.json`);
      expect(entity).toEqual(singularStory);
    });

    it("does not retrieve a story from the API, but handles gracefully", async () => {
      axios.get.mockImplementation(() => Promise.resolve({ data: null }));

      const entity = await getStory(1);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${storyUrl + 1}.json`);
      expect(entity).toEqual(undefined);
    });
  });

  describe("getStoryIds functionality", () => {
    it("requests and gets storyIds from the HackerNews API", async () => {
      axios.get.mockImplementation(() => Promise.resolve({ data: storyIds }));

      const entity = await getStoryIds();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(newStoriesUrl);
      expect(entity).toEqual(storyIds);
    });
  });
});
