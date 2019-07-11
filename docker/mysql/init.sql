# create databases
CREATE DATABASE IF NOT EXISTS `medicine`;
CREATE DATABASE IF NOT EXISTS `medicine_test`;

# create user and grant rights
CREATE USER 'user' IDENTIFIED BY 'user';
GRANT ALL PRIVILEGES ON *.* TO 'user@%';