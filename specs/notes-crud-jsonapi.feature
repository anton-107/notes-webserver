Feature: Notes handling (JSON API)

  As an API user I can add/update/delete notes to/from my notebook

  Scenario: Note creation via JSON API
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    Given I own a notebook named 'My notes'
    When I create a JSON object: '{"note-type": "note", "notebook-id": "{notebook-id}", "note-content": "my first note", "note-section": "to-do-section"}'
    And I POST it to '/note'
    When json response is loaded
    Then 'content' field has value of 'my first note'
    Then 'id' field is a non-empty string

  Scenario: Reading added note via JSON API
    When I visit /notebook/{notebook-id}/note page
    When json response is loaded
    Then 'notes' field is a list
    And its first element has field 'content' with value 'my first note'
    And json query 'notes[0].extensionProperties.section' returns value 'to-do-section'

  Scenario: Edit note via JSON API
    When I create a JSON object: '{"note-type": "note", "notebook-id": "{notebook-id}", "note-content": "my first edited note", "note-id": "{last-known-id}"}'
    And I POST it to '/note/{last-known-id}/edit'
    When json response is loaded
    Then 'content' field has value of 'my first edited note'

  Scenario: Move note to a section via JSON API
    When I create a JSON object: '{"note-id": "{last-known-id}", "note-section": "done-section" }'
    And I POST it to '/note/{last-known-id}/edit'
    When json response is loaded
    Then 'content' field has value of 'my first edited note'
    And json query 'extensionProperties.section' returns value 'done-section'

  Scenario: Set note order  via JSON API
    When I create a JSON object: '{"note-id": "{last-known-id}", "note-manual-order": 1 }'
    And I POST it to '/note/{last-known-id}/edit'
    When json response is loaded
    Then 'content' field has value of 'my first edited note'
    And json query 'extensionProperties.manualOrder' returns value 1

  Scenario: Set due date via JSON API
    When I create a JSON object: '{"note-id": "{last-known-id}", "table-columns": {"due-date": "2022-10-27"} }'
    And I POST it to '/note/{last-known-id}/edit'
    When json response is loaded
    Then 'content' field has value of 'my first edited note'
    And json query 'columnValues.due-date' returns value '2022-10-27'

  Scenario: Delete note via JSON API
    When I create a JSON object: '{"note-id": "{last-known-id}"}'
    And I POST it to '/note/delete'
    When json response is loaded
    Then I visit /notebook/{notebook-id}/note page
    When json response is loaded
    Then 'notes' field is an empty list