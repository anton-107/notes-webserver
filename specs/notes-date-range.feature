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
    Then I am navigated to /notebook/{notebook-id}/new-note/date-range page
    When page is loaded
    Then I see 'note-content-input' element
    And I focus on it and type 'Holiday'
    And I see 'date-range-start-input' element
    And I focus on it and type '2022-07-22'
    And I see 'date-range-end-input' element
    And I focus on it and type '2022-08-02'
    And I press 'Enter' on keyboard
    Then I am navigated to /notebook/{notebook-id} page
  Scenario: Read added date range entry
    When page is loaded
    Then I see 'date-range-start' element
    And it has inner text of '2022-07-22'
    And I see 'date-range-end' element
    And it has inner text of '2022-08-02'
    And I see 'note-edit-link' element
  Scenario: Edit note
    When I click on it
    Then I am navigated to /notebook/{notebook-id}/note/{note-id}/edit page
    When page is loaded
    Then I see 'note-content-input' element
    And it has value of 'Holiday'
    And I focus on it and type 'Holiday updated'
    And I see 'date-range-start-input' element
    And it has value of '2022-07-22'
    And I focus on it and type '2022-07-25'
    And I see 'date-range-end-input' element
    And it has value of '2022-08-02'
    And I focus on it and type '2022-08-05'
    And I press 'Enter' on keyboard
    Then I am navigated to /notebook/{notebook-id} page
    When page is loaded
    Then I see 'note-content' element
    And it has inner text of 'Holiday updated'
    And I see 'date-range-start' element
    And it has inner text of '2022-07-25'
    And I see 'date-range-end' element
    And it has inner text of '2022-08-05'
  Scenario: Delete note
    And I see 'note-edit-link' element
    When I click on it
    Then I am navigated to /notebook/{notebook-id}/note/{note-id}/edit page
    When page is loaded
    Then I see 'note-delete-button' element
    When I click on it
    Then I am navigated to /notebook/{notebook-id} page
    When page is loaded
    Then I do not see 'note-content' element