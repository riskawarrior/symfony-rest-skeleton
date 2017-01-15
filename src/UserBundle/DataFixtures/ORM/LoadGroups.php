<?php

namespace Acme\UserBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Acme\UserBundle\Entity\Group;

class LoadGroups extends AbstractFixture implements FixtureInterface, OrderedFixtureInterface {

    public function load(ObjectManager $manager) {
        $this->addGroups($manager);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder() {
        return 90;
    }

    private function addGroups(ObjectManager $manager) {
        $group = new Group('Admin', ['ROLE_ADMIN']);
        $this->addReference('group-admin', $group);
        $manager->persist($group);

        $group = new Group('Registered user', ['ROLE_USER']);
        $this->addReference('group-registered-user', $group);
        $manager->persist($group);
    }

}
