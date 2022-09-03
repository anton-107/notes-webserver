Feature: Notes handling (JSON API)

  As an API user I can add/update/delete notes to/from my notebook

  Scenario: Note creation via JSON API
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    Given I own a notebook named 'My notes'
    When I create a JSON object: '{"note-type": "note", "notebook-id": "{notebook-id}", "note-content": "my first note"}'
    And I POST it to '/note'
    When json response is loaded
    Then 'content' field has value of 'my first note'
    Then 'id' field is a non-empty string