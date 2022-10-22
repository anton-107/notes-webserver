Feature: Notebooks handling (JSON API)

  As an API user I can add/update/delete notebooks

  Scenario: Notebook creation via JSON API
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    When I create a JSON object: '{"notebook-name": "My notes"}'
    And I POST it to '/notebook'
    When json response is loaded
    Then 'name' field has value of 'My notes'
    Then 'id' field is a non-empty string

  Scenario: Reading added notebook via JSON API
    When I visit /notebook page
    When json response is loaded
    Then 'notebooks' field is a list
    And its first element has field 'name' with value 'My notes'

  Scenario: Edit notebook via JSON API
    When I create a JSON object: '{"notebook-id": "{last-known-id}", "notebook-name": "My notes (edited)"}'
    And I POST it to '/notebook/{last-known-id}/edit'
    When json response is loaded
    Then 'name' field has value of 'My notes (edited)'

  Scenario: Add table column via JSON API
    When I create a JSON object: '{"notebook-id": "{last-known-id}", "table-columns": [{"name": "Due date", "column-type": "due-date"}]}'
    And I POST it to '/notebook/{last-known-id}/edit'
    When json response is loaded
    Then json query 'tableColumns[0].name' returns value 'Due date'
    And json query 'tableColumns[0].columnType' returns value 'due-date'

  Scenario: Delete notebook via JSON API
    When I create a JSON object: '{"notebook-id": "{last-known-id}"}'
    And I POST it to '/delete-notebook'
    When json response is loaded
    Then I visit /notebook page
    When json response is loaded
    Then 'notebooks' field is an empty list