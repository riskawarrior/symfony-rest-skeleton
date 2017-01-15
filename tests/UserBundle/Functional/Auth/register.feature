Feature:
  Registration is possible to the site. Duplicates are not allowed.

  Scenario:
  Registering a duplicate user results an error
    When I send a JSON POST request to "/auth/register" with body:
      """
      {
        "username": "admin",
        "password": "admin"
      }
      """
    Then the response status code should be 400
    And the response should be in JSON
    And the JSON should be equal to:
      """
      {
          "message": "User already exists in the system!"
      }
      """

  Scenario:
  Registering a new user is possible
    When I send a JSON POST request to "/auth/login" with body:
      """
      {
        "_username": "asdf",
        "_password": "asdf"
      }
      """
    Then the response status code should be 401
    And I send a JSON POST request to "/auth/register" with body:
      """
      {
        "username": "asdf",
        "password": "asdf"
      }
      """
    Then the response status code should be 200
    And the response should be in JSON
    Then I send a JSON POST request to "/auth/login" with body:
      """
      {
        "_username": "asdf",
        "_password": "asdf"
      }
      """
    Then the response status code should be 200