Feature:
  Login is possible to the site using valid credentials

  Scenario:
  Response should be empty user by default
    When I send a JSON GET request to "/auth/is_signed_in"
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON node "user" should be null

  Scenario:
  Logging in and out with an existing user
    When I send a JSON POST request to "/auth/login" with body:
      """
      {
        "_username": "admin",
        "_password": "admin"
      }
      """
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON node "token" should exist
    Then I send a JSON GET request to "/auth/is_signed_in"
    And the response status code should be 200
    And the response should be in JSON
    And the JSON should be equal to:
      """
      {
        "user": {
          "id": 1,
          "username": "admin",
          "roles": [
              "ROLE_ADMIN"
          ]
        }
      }
      """
    Then I send a JSON POST request to "/auth/logout"
    And the response status code should be 302
    Then I send a JSON GET request to "/auth/is_signed_in"
    And the response status code should be 200
    And the JSON node "user" should be null