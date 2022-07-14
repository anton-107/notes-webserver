Feature: Notes handling

  As a user I can add/update/delete notes to/from my notebook

  Scenario: Note creation
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    Given I own a notebook named 'My notes'
    When I navigate to this notebook page
    When page is loaded
    Then I see 'create-new-note-link' element
