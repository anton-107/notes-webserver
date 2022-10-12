Feature: People handling (JSON API)

  As an API user I can add/update/delete people

  Scenario: Person creation via JSON API
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    When I create a JSON object: '{"person-name": "Justin Case", "person-email": "justincase@mymail.com"}'
    And I POST it to '/person'
    When json response is loaded
    Then 'name' field has value of 'Justin Case'
    Then 'email' field has value of 'justincase@mymail.com'
    Then 'id' field is a non-empty string

  Scenario: Reading added person via JSON API
    When I visit /person page
    When json response is loaded
    Then 'people' field is a list
    And its first element has field 'name' with value 'Justin Case'

  Scenario: Edit person via JSON API
    When I create a JSON object: '{"person-id": "{last-known-id}", "person-name": "Justin A. Case"}'
    And I POST it to '/person/{last-known-id}/edit'
    When json response is loaded
    Then 'name' field has value of 'Justin A. Case'

  Scenario: Delete person via JSON API
    When I create a JSON object: '{"person-id": "{last-known-id}"}'
    And I POST it to '/delete-person'
    When json response is loaded
    Then I visit /person page
    When json response is loaded
    Then 'people' field is an empty list