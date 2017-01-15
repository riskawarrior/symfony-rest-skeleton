<?php

namespace Acme\UserBundle\Service;

use Acme\UserBundle\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Registry;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;
use Symfony\Component\Validator\Exception\ValidatorException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserRegister
{

    /**
     * @var Registry
     *
     */
    private $doctrine;

    /**
     * @var UserPasswordEncoder
     */
    private $encoder;

    /**
     * @var ValidatorInterface
     */
    private $validator;

    public function __construct(Registry $doctrine, UserPasswordEncoder $encoder, ValidatorInterface $validator)
    {
        $this->doctrine  = $doctrine;
        $this->encoder   = $encoder;
        $this->validator = $validator;
    }

    public function register(string $username, string $password)
    {
        $user = $this->createUser($username, $password);
        $this->validateUser($user);
        $this->save($user);
    }

    private function createUser(string $username, string $password): User
    {
        $user = new User();
        $user
            ->setUsername($username)
            ->setPassword($this->encoder->encodePassword($user, $password))
            ->addGroup($this->getDefaultUserGroup());
        return $user;
    }

    private function getDefaultUserGroup()
    {
        return $this->doctrine->getRepository('UserBundle:Group')->findOneByName('Registered user');
    }

    private function validateUser(User $user)
    {
        if (count($errors = $this->validator->validate($user))) {
            throw new ValidatorException($errors);
        }
    }

    private function save(User $user)
    {
        $this->doctrine->getManager()->persist($user);
        $this->doctrine->getManager()->flush();
    }

}