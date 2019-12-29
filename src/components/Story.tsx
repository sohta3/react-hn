import React, { useState, useEffect } from "react";
import { getStory } from "../services/hnAPI";
import {
  StoryWrapper,
  StoryTitle,
  StoryMeta,
  StoryMetaElement
} from "../styles/StoryStyles";
import { mapTime } from "../utils/mapTime";

export const Story = ({ storyId }) => {
  const [story, setStory] = useState({
    id: undefined,
    title: undefined,
    url: undefined,
    time: undefined,
    by: undefined
  });

  useEffect(() => {
    getStory(storyId).then(data => data && data.url && setStory(data));
  }, [storyId]);

  return story && story.url ? (
    <StoryWrapper data-testid="story">
      <StoryTitle data-testid="title">
        <a href={story.url}>{story.title}</a>
      </StoryTitle>
      <StoryMeta>
        <span className="story__by" data-testid="story-by">
          <StoryMetaElement color="#000">By:</StoryMetaElement>
          {` `}
          {story.by}
        </span>
        <span className="story__time" data-testid="story-time">
          <StoryMetaElement color="#000">Posted:</StoryMetaElement>
          {` `}
          {mapTime(story.time)}
        </span>
      </StoryMeta>
    </StoryWrapper>
  ) : null;
};
