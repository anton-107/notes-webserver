Feature: Notes with 'date range' type

  As a user I can add/update/delete notes on date ranges to/from my notebook

  Scenario: Date range note creation
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    Given I own a notebook named 'My holidays'
    When I navigate to this notebook page
    When page is loaded
    Then I see 'create-new-date-range-link' element