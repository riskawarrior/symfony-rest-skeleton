<?php

namespace Acme\UserBundle\Controller;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\Post;
use FOS\RestBundle\Controller\FOSRestController;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Exception\ValidatorException;

class AuthController extends FOSRestController {

    /**
     * @Get("/is_signed_in")
     * @ApiDoc(
     *     description="Returns the data of currently logged in user or false on anonymous.",
     *     output="array",
     *     statusCodes={
     *          200: "success"
     *     },
     *     tags={
     *          "authentication"
     *     }
     * )
     */
    public function isSignedInAction() {
        return $this->handleView($this->view([
            'user' => $this->getUser(),
        ]));
    }

    /**
     * @Post("/register")
     * @ApiDoc(
     *     description="Registers a new user in the system.",
     *     output="void",
     *     statusCodes={
     *          200: "success",
     *          400: "error"
     *     },
     *     tags={
     *          "authentication"
     *     }
     * )
     */
    public function registerAction(Request $request) {
        $register = $this->get('user.service.register');
        try {
            $register->register($request->get('username'), $request->get('password'));
        } catch (ValidatorException $ex) {
            return $this->handleView($this->view([
                'message' => 'User already exists in the system!'
            ], 400));
        } catch (\Exception $ex) {
            return $this->handleView($this->view([
                'message' => $ex->getMessage(),
            ], 400));
        }

        return $this->handleView($this->view([]));
    }
}
