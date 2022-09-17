Feature: Notebook section

  As a user I can add/update/delete sections in my notebook

  Scenario: Note section creation
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    Given I own a notebook named 'My board'
    When I navigate to this notebook page
    When page is loaded
    Then I see 'create-new-notes-container-link' element
    When I click on it
    Then I am navigated to /notebook/{notebook-id}/new-note/notes-container page
    When page is loaded
    Then I see 'note-content-input' element
    And I focus on it and type 'To do'
    And I press 'Enter' on keyboard
    Then I am navigated to /notebook/{notebook-id} page
  Scenario: Read added section
    When page is loaded
    Then I see 'note-section-content' element
    And it has inner text of 'Section: To do'
    And I see 'note-edit-link' element

  Scenario: Edit section
    When I visit /notebook/{notebook-id}
    When page is loaded
    Then I see 'note-edit-link' element
    When I click on it
    Then I am navigated to /notebook/{notebook-id}/note/{note-id}/edit page
    When page is loaded
    Then I see 'note-content-input' element
    And I focus on it and type 'In progress'
    And I press 'Enter' on keyboard
    Then I am navigated to /notebook/{notebook-id} page
    When page is loaded
    Then I see 'note-section-content' element
    And it has inner text of 'Section: In progress'