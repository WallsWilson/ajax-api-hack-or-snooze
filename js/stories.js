"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function starHTML() {
  const favoriteStory = user.favoriteStory;
  const removeFavorite = user.removeFavorite;
  if(story === favoriteStory ) {
    return `<span class="star">
      <i class="fa-solid fa-star"></i>
    </span>`;
  } if (story === removeFavorite) {
    return `<span class="star">
    <i class="fa-regular fa-star"></i>
  </span>`;
  }
}
/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function addStoryFromForm(evt) {
evt.preventDefault();

  const author = document.getElementById('authorInput').value;
  const title = document.getElementById('titleInput').value;
  const url = document.getElementById('urlInput').value;
  const username = currentUser.username;
  const body = {title, author, url, username };
  console.log(body)
  const story = await storyList.addStory(currentUser, body);

const $story = generateStoryMarkup(story);
$allStoriesList.prepend($story);  

$submitStory.slideUp("slow")
$submitStory.trigger("reset");

}

$submitStory.on("submit", addStoryFromForm);