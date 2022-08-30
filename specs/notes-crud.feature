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
    Then I am navigated to /notebook/{notebook-id}/new-note/note page
    When page is loaded
    Then I see 'note-content-input' element
    And I focus on it and type 'This is my test note'
    And I press 'Enter' on keyboard
    Then I am navigated to /notebook/{notebook-id} page

  Scenario: Read added note
    When page is loaded
    Then I see 'note-content' element
    And it has inner text of 'This is my test note'
    And I see 'note-edit-link' element

  Scenario: Notes json endpoints
    When I visit /notebook/{notebook-id}/note page
    When json response is loaded
    Then 'notes' field is a list
    And its first element has field 'content' with value 'This is my test note'

  Scenario: Edit note
    When I visit /notebook/{notebook-id}
    When page is loaded
    Then I see 'note-edit-link' element
    When I click on it
    Then I am navigated to /notebook/{notebook-id}/note/{note-id}/edit page
    When page is loaded
    Then I see 'note-content-input' element
    And I focus on it and type 'This is my test note (edited)'
    And I press 'Enter' on keyboard
    Then I am navigated to /notebook/{notebook-id} page
    When page is loaded
    Then I see 'note-content' element
    And it has inner text of 'This is my test note (edited)'

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
  