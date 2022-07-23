Feature: Notes with 'date range' type

  As a user I can add/update/delete notes on date ranges to/from my notebook

  Scenario: Date range note creation
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    Given I own a notebook named 'My holidays'
    When I navigate to this notebook page
    When page is loaded
    Then I see 'create-new-date-range-link' element
    When I click on it
    Then I am navigated to /notebook/{notebook-id}/new-date-range page
    When page is loaded
    Then I see 'note-content-input' element
    And I focus on it and type 'Holiday'
    And I see 'date-range-start-input' element
    And I focus on it and type '2022-07-22'
    And I see 'date-range-end-input' element
    And I focus on it and type '2022-08-02'
    And I press 'Enter' on keyboard
    Then I am navigated to /notebook/{notebook-id} page