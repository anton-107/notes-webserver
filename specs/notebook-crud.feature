Feature: Notebooks handling

    Create/Read/Update/Delete a notebook

    Scenario: Notebook creation
      Given web server is running
      Given I am logged in as 'user1'/'1234'
      When I visit /home page
      When page is loaded
      Then I see 'create-new-notebook-link' element
      When I click on it
      Then I am navigated to /new-notebook page
      When page is loaded
      Then I see 'notebook-name-input' element
      And I focus on it and type 'Health and fitness'
      And I press 'Enter' on keyboard
      Then I am navigated to /home page
      When page is loaded
      Then I see 'notebook-name' element
      And it has inner text of 'Health and fitness'
