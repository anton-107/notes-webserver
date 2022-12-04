Feature: Search through notebooks, notes and people (JSON API)

  As an API user I want to search for a notebook, note or a person

  Scenario: Search via JSON API
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    Given I own a notebook named 'My notes'
    Given I own a note in that notebook with content 'Test note'
    When I visit /search?query=note page
    When json response is loaded
    Then 'results' field is a list