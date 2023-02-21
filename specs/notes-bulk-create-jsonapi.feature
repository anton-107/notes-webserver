Feature: Notes handling (JSON API)

  As an API user I can add/update/delete notes to/from my notebook

  Scenario: Note creation in bulk via JSON API
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    Given I own a notebook named 'Notebook for bulk notes creation'
    When I create a JSON object: '{"notes": [{"note-type": "note", "notebook-id": "{notebook-id}", "note-content": "note #1", "note-section": "to-do-section"}, {"note-type": "note", "notebook-id": "{notebook-id}", "note-content": "note #2", "note-section": "to-do-section"}]}'
    And I POST it to '/note'
    When json response is loaded
    Then returned status code is 201
    When I visit /notebook/{notebook-id}/note page
    When json response is loaded
    Then 'notes' field is a list
    And json query 'notes[0].content' returns value 'note #1'
    And json query 'notes[1].content' returns value 'note #2'
