Feature: Note attachments handling
  Scenario: Reading a note attachment via API (binary response)
    Given web server is running
    Given I am logged in as 'user1'/'1234'
    Given I own a notebook named 'My notes'
    Given I own a note in that notebook with content 'Test note with attachments'
    Given there is an attachment attached to that note with content 'Note attachment' and name 'Test scenario attachment'
    When I visit /note/{note-id}/attachment/{attachment-id} page
    When binary response is loaded
    Then binary response is 'Note attachment'
  
  Scenario: Listing all attachments for a note
    When I visit /note/{note-id}/attachment page
    When json response is loaded
    Then json query 'attachments[0].name' returns value 'Test scenario attachment'