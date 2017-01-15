Production Installation Guide
=============================

Automatic installation
----------------------

Install latest Ansible::

   apt-get install -y software-properties-common
   apt-add-repository -y ppa:ansible/ansible
   apt-get update -y
   apt-get install -y ansible

Clone the repository::

   git clone https://github.com/riskawarrior/symfony-rest-skeleton.git

Initialize everything::

   ansible-playbook -i "master," -c local symfony-rest-skeleton/ansible/site.yml
