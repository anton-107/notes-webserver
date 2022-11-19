Feature: Note attachments handling
  Scenario: Reading a note attchment via API (binary response)
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    Given I own a notebook named 'My notes'
    Given I own a note in that notebook with content 'Test note with attachments'
    Given there is an attachment attached to that note with content 'Note attachment'
    When I visit /note/{note-id}/attachment/{attachment-id} page
    When binary response is loaded
    Then binary response is 'Note attachment'