<?php

namespace Acme\Context;

use Behat\Gherkin\Node\PyStringNode;
use Behat\Gherkin\Node\TableNode;
use Sanpi\Behatch\Context\BaseContext;
use Sanpi\Behatch\HttpCall\Request;

class RestJsonContext extends BaseContext  {

    protected $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Sends a HTTP request
     *
     * @Given I send a JSON :method request to :url
     */
    public function iSendARequestTo($method, $url)
    {
        return $this->request->send(
            $method,
            $this->locatePath($url),
            [],
            [],
            null,
            ['HTTP_ACCEPT' => 'application/json']
        );
    }

    /**
     * Sends a HTTP request with a some parameters
     *
     * @Given I send a JSON :method request to :url with parameters:
     */
    public function iSendARequestToWithParameters($method, $url, TableNode $data)
    {
        $parameters = [];

        foreach ($data->getHash() as $row) {
            if (!isset($row['key'])) {
                throw new \Exception("You must provide a 'key'.");
            }

            $parameters[$row['key']] = isset($row['value']) ? $row['value'] : null;
        }

        return $this->request->send(
            $method,
            $this->locatePath($url),
            [],
            [],
            json_encode($parameters),
            ['HTTP_ACCEPT' => 'application/json', 'CONTENT_TYPE' => 'application/json']
        );
    }

    /**
     * Sends a HTTP request with a body
     *
     * @Given I send a JSON :method request to :url with body:
     */
    public function iSendARequestToWithBody($method, $url, PyStringNode $body)
    {
        return $this->request->send(
            $method,
            $this->locatePath($url),
            [],
            [],
            $body !== null ? $body->getRaw() : null,
            ['HTTP_ACCEPT' => 'application/json', 'CONTENT_TYPE' => 'application/json']
        );
    }

}
