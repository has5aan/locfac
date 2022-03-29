// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

interface LockerInterface {
    function register(uint256 _locker, uint256 _status) external payable;

    function modifyStatus(uint256 _locker, uint256 _status) external payable;

    function allotAccess(uint256 _locker, address _user) external payable;

    function revokeAccess(uint256 _locker, address _user) external payable;

    function hasLockerAccess(uint256 _locker, address _user) external view returns (bool);
}

contract Locker is LockerInterface{
    address public minter;

    struct LockerData {
        uint256 identifier;
        address owner;
        uint256 status;
        mapping (address => bool) access;
    }

    mapping (uint256 => LockerData) public lockerCollection;

    event LockerManipulated(address indexed _owner, uint256 indexed _locker, uint256 indexed _status);
    event LockerAccessManipulated(address indexed _owner, address indexed _allotedTo, uint256 indexed _locker, bool _status);

    constructor() {
        minter = msg.sender;
    }

    modifier onlyUniqueLocker(uint256 _locker) {
        require(lockerCollection[_locker].owner == address(0), 'Locker already registered!');
        _;
    }

    modifier onlyNonZeroStatus(uint256 _status) {
        require(_status != 0, 'Status can not be set to zero!');
        _;
    }

    modifier onlyExistingLocker(uint256 _locker) {
        require(lockerCollection[_locker].identifier == _locker, 'Locker not registered!');
        _;
    }

    modifier onlyLockerOwner(uint256 _locker, address _owner) {
        require(lockerCollection[_locker].owner == _owner, 'Invalid owner!');
        _;
    }

    function register(uint256 _locker, uint256 _status)
        onlyNonZeroStatus(_status)
        onlyUniqueLocker(_locker)
    override public payable {
        lockerCollection[_locker].identifier = _locker;
        lockerCollection[_locker].owner = msg.sender;
        lockerCollection[_locker].status = _status;

        emit LockerManipulated(msg.sender, _locker, _status);
    }

    function modifyStatus(uint256 _locker, uint256 _status)
        onlyExistingLocker(_locker)
        onlyLockerOwner(_locker, msg.sender)
    override public payable {
        lockerCollection[_locker].status = _status;

        emit LockerManipulated(msg.sender, _locker, _status);
    }

    function modifyAccess(uint256 _locker, address _user, bool _status)
        onlyExistingLocker(_locker)
        onlyLockerOwner(_locker, msg.sender)
    private {
        lockerCollection[_locker].access[_user] = _status;

        emit LockerAccessManipulated(msg.sender, _user, _locker, _status);
    }

    function allotAccess(uint256 _locker, address _user) override public payable {
        modifyAccess(_locker, _user, true);
    }

    function revokeAccess(uint256 _locker, address _user) override public payable {
        modifyAccess(_locker, _user, false);
    }

    function hasLockerAccess(uint256 _locker, address _user) override public view returns(bool) {
        if (lockerCollection[_locker].identifier != _locker) {
            return false;
        }

        if (lockerCollection[_locker].owner == _user) {
            return true;
        }

        return lockerCollection[_locker].access[_user] == true;
    }
}
