Feature: Notebooks handling

    Create/Read/Update/Delete a notebook

    Scenario: Notebook create-read-update-delete cycle
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
      When I click on it
      Then I am navigated to /notebook/{notebook-id} page
      When page is loaded
      Then I see 'notebook-name' element
      And it has inner text of 'Health and fitness'
      And I see 'edit-notebook-link' element
      When I click on it
      Then I am navigated to /notebook/{notebook-id}/edit page
      When page is loaded
      Then I see 'notebook-name-input' element
      And I focus on it and clear its value
      And I focus on it and type 'Health, fitness and diet'
      And I press 'Enter' on keyboard
      Then I am navigated to /home page
      When page is loaded
      Then I see 'notebook-name' element
      And it has inner text of 'Health, fitness and diet'
      When I click on it
      Then I am navigated to /notebook/{notebook-id} page
      When page is loaded
      Then I see 'notebook-name' element
      And it has inner text of 'Health, fitness and diet'
      And I see 'delete-notebook-button' element
      When I click on it
      Then I am navigated to /home page
      When page is loaded
      Then I do not see 'notebook-name' element
