import React, { useEffect, useState } from "react";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import {
  GlobalStyle,
  StoriesContainerWrapper
} from "../styles/StoryContainerStyles";
import { getStoryIds } from "../services/hnAPI";
import { Story } from "../components/Story";

export const StoriesContainer: React.FC = () => {
  const [storyIds, setStoryIds] = useState([]);
  const count = useInfiniteScroll();
  useEffect(() => {
    getStoryIds().then(data => setStoryIds(data));
  }, []);

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <StoriesContainerWrapper data-test-id="stories-container">
        <h1>Hacker News Stories</h1>
        {storyIds.slice(0, count).map(storyId => {
          return <Story key={storyId} storyId={storyId} />;
        })}
      </StoriesContainerWrapper>
    </>
  );
};
