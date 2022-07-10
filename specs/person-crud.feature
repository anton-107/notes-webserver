Feature: People handling

    Create/Read/Update/Delete a notebook

    Scenario: Add a person
      Given web server is running
      Given I am logged in as 'user1'/'1234'
      When I visit /home page
      When page is loaded
      Then I see 'create-new-person-link' element
      When I click on it
      Then I am navigated to /new-person page
      When page is loaded
      Then I see 'person-name-input' element
      And I focus on it and type 'Justin Case'
      Then I see 'person-email-input' element
      And I focus on it and type 'justincase@mymail.com'
      And I press 'Enter' on keyboard
      Then I am navigated to /home page
    Scenario: Read added person details
      When page is loaded
      Then I see 'person-name' element
      And it has inner text of 'Justin Case'
      When I click on it
      Then I am navigated to /person/{person-id} page
      When page is loaded
      Then I see 'person-name' element
      And it has inner text of 'Justin Case'
    Scenario: Edit details for person
      And I see 'edit-person-link' element
      When I click on it
      Then I am navigated to /person/{person-id}/edit page
      When page is loaded
      Then I see 'person-name-input' element
      And I focus on it and clear its value
      And I focus on it and type 'Justin A. Case'
      And I press 'Enter' on keyboard
      Then I am navigated to /home page
      When page is loaded
      Then I see 'person-name' element
      And it has inner text of 'Justin A. Case'
    Scenario: Person deletion
      When I click on it
      Then I am navigated to /person/{person-id} page
      When page is loaded
      Then I see 'delete-person-button' element
      When I click on it
      Then I am navigated to /home page
      When page is loaded
      Then I do not see 'person-name' element
