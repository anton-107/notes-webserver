Feature: User sign in flow

    This is a common flow for user sign-in flow

    Scenario: Sucessful sign in for user1
      Given web server is running
      When I visit /home page
      When page is loaded
      Then I see 'sign-in-link' element
      When I click on it
      Then I am navigated to /signin page
      When page is loaded
      Then I see 'user-login' element
      And I focus on it and type 'user1'
      And I see 'user-password' element
      And I focus on it and type '1234'
      And I press 'Enter' on keyboard
      Then I am navigated to /home page
      When page is loaded
      Then I see 'user-greeting' element
      And it has inner text of 'hello user1!'

    Scenario: Who-am-I endpoint for signed in user
      When I visit /whoami page
      When json response is loaded
      Then 'username' field has value of 'user1'

    Scenario: user sign out
      When I visit /home page
      Then I see 'sign-out-button' element
      When I click on it
      Then I am navigated to /signout page
      When page is loaded
      Then I see 'signout-complete' element
      When I visit /home page
      When page is loaded
      Then I see 'sign-in-link' element
      And I do not see 'sign-out-link' element
      And I do not see 'user-greeting' element
