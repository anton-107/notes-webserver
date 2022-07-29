Feature: Notes with 'personal date range' type

  A personal date-range note is a date-range note about a specific person
  For example, it can be used to enter a person's holiday or a day off

  Scenario: Personal date range note creation
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    Given I own a notebook named 'Team Holidays'
    When I navigate to this notebook page
    When page is loaded
    Then I see 'create-new-personal-date-range-link' element
    When I click on it
    Then I am navigated to /notebook/{notebook-id}/new-note/personal-date-range page
    When page is loaded
    Then I see 'person-selector' element
    And I focus on it and select 'Justin Case'
    And I see 'date-range-start-input' element
    And I focus on it and type '2022-07-29'
    And I see 'date-range-end-input' element
    And I focus on it and type '2022-08-13'
    And I press 'Enter' on keyboard
    Then I am navigated to /notebook/{notebook-id} page
  Scenario: Read added personal date range entry
    When page is loaded
    Then I see 'person-name' element
    And it has inner text of 'justin-case'
    And I see 'date-range-start' element
    And it has inner text of '2022-07-29'
    And I see 'date-range-end' element
    And it has inner text of '2022-08-13'
    And I see 'note-edit-link' element
  Scenario: Edit note
    When I click on it
    Then I am navigated to /notebook/{notebook-id}/note/{note-id}/edit page
    When page is loaded
    Then I see 'person-selector' element
    And it has selected option of 'Justin Case'
    And I focus on it and select 'John Rope'
    And I see 'date-range-start-input' element
    And it has value of '2022-07-29'
    And I focus on it and type '2022-07-30'
    And I see 'date-range-end-input' element
    And it has value of '2022-08-13'
    And I focus on it and type '2022-08-14'
    And I press 'Enter' on keyboard
    Then I am navigated to /notebook/{notebook-id} page
    When page is loaded
    Then I see 'person-name' element
    And it has inner text of 'john-rope'
    And I see 'date-range-start' element
    And it has inner text of '2022-07-30'
    And I see 'date-range-end' element
    And it has inner text of '2022-08-14'