Feature: Notebook table columns
  Scenario: Listing a list of supported columns
    
    Background: Notebook table columns are taken from NotebookTableColumnsRegistry which is configured in the common configuration

    Given web server is running
    Given I am logged in as 'user1'/'1234'
    When I visit /notebook-supported-columns page
    When json response is loaded
    Then json query 'columns[0].name' returns value 'Due date'
    Then json query 'columns[1].name' returns value 'Start date'
    Then json query 'columns[2].name' returns value 'End date'
    Then json query 'columns[3].name' returns value 'Assignee'
    Then json query 'columns[4].name' returns value 'Completed'
    Then json query 'columns[5].name' returns value 'Number of lines'
    Then json query 'columns[5].valueSource' returns value 'extensionProperties'