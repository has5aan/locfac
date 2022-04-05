const Migrations = artifacts.require("Migrations")
const Locker = artifacts.require("Locker")

module.exports = function (deployer) {
    deployer.deploy(Migrations)
    deployer.deploy(Locker)
}