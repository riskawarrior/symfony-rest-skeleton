Development Installation guide
==============================

Required tools for development
------------------------------

* NodeJs
* Phing
* Python2

Initializing project tools
~~~~~~~~~~~~~~~~~~~~~~~~~~

Install Webpack::

    npm install -g webpack

Install Openssl and make it accessible in PATH variable.

Initializing frontend libs
--------------------------

Install npm dependencies::

    npm install

Initializing PHP project
------------------------

Run the following Phing job in the root of cloned repository::

    phing dev-init

Apache2 config
~~~~~~~~~~~~~~

Define a virtual host for your server::

    <VirtualHost *:80>
        ServerName app
        ServerAlias app.local

        DocumentRoot /var/www/app/web
        <Directory "/var/www/app/web">
            Options +Indexes +Includes +FollowSymLinks +MultiViews
            AllowOverride All
            Require local
        </Directory>
    </VirtualHost>

Running asset server (webpack)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can start the asset server listening on dev environment by::

    npm start
