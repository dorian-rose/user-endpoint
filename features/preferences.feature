 Feature: User Preferences API
 As a User,
 I want to be able to save my user profile setting via API
 So that I can easily control my preferences via API in the future.


  Scenario: User signup
    Given I have the following signup payload:
      | email                | user@example.com    |
      | password     | password123  |
    When I send a POST request to the signup endpoint with the payload
    Then the response status code should be 201


  #Would need to insert here scenarios for possible errors 

  # Scenario: User signin
  #   Given I have the following signin payload:
  #     | email                | user@example.com    |
  #     | password     | 123  |
  #   When I send a POST request to "/auth/signin" with the payload
  #   Then the response status code should be 200
    
  # insert here scenarios for errors 


   Scenario: Create user preferences
     Given a user with the following details:
       | tac_accepted | language | show_profile | show_language |
       |  true         | English  | true         | false         |
      When the user sets their preferences
   Then the preferences should be saved successfully
 

  # Scenario: Create preferences for a user who has already set preferences
  #   Given a user with the following details:
  #     | userId | tac_accepted | language | show_profile | show_language |
  #     | 10   | true         | English  | true         | false         |
  #   When the user attempts to set their preferences
  #   Then an error should be thrown with the message "User has already set preferences. Please update instead"
   

