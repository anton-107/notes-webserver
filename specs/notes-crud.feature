Feature: Notes handling

  As a user I can add/update/delete notes to/from my notebook

  Scenario: Note creation
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    Given I own a notebook named 'My notes'
    When I navigate to this notebook page
    When page is loaded
    Then I see 'create-new-note-link' element
    When I click on it
    Then I am navigated to /notebook/{notebook-id}/new-note page
    When page is loaded
    Then I see 'note-content-input' element
    And I focus on it and type 'This is my test note'
    And I press 'Enter' on keyboard
    Then I am navigated to /notebook/{notebook-id} page
  Scenario: Read added note
    When page is loaded
    Then I see 'note-content' element
    And it has inner text of 'This is my test note'
