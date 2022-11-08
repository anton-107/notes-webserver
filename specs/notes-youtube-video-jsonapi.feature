Feature: Youtube video's handling (JSON API)

  As an API user I can add a note of a youtube video

  Scenario: Note (of a video) creation via JSON API
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    Given I own a notebook named 'My videos'
    When I create a JSON object: '{"note-type": "note", "notebook-id": "{notebook-id}", "note-content": "https://www.youtube.com/watch?v=XXXXX"}'
    And I POST it to '/note'
    When json response is loaded
    Then 'id' field is a non-empty string
    And json query 'extensionProperties.youtubeURL' returns value 'https://www.youtube.com/watch?v=XXXXX'