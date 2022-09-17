Feature: Notes handling (JSON API)

  As an API user I can add/update/delete sections to/from my notebook

  Scenario: Notebook section creation via JSON API
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    Given I own a notebook named 'My notes'
    When I create a JSON object: '{"section-name": "To do"}'
    And I POST it to '/notebook/{notebook-id}/section'
    When json response is loaded
    Then 'name' field has value of 'To do'
    Then 'id' field is a non-empty string

  Scenario: Reading added notebook section via JSON API
    When I visit /notebook/{notebook-id}/section page
    When json response is loaded
    Then 'sections' field is a list
    And json query 'sections[0].name' returns value 'To do'