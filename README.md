# locfac

locfac is a digital locker, accounts can register lockers with a specific identifier and can manage access to locker it owns.

## Environment Configuration
- ### npm install
- ### npm test - Runs test scripts, printing specifications and highlighting code coverage stats.
- ### npm run dev - Runs test Ethereum Environment

## Code Coverage
![Code Coverage](./docs/code-coverage.png)

## Directory Structure
- adapters
    - **validator** - Contains the implementation for the validator.
    - **contracts** - Contains Smart Contract Code in Ethereum.
    - **migrations** - Contains migration/deployment definition for Smart Contracts.
    - **domain** - Contains entities and business/validation rules defintions.
    - **lib** - Contains common libray code.
    - **repositories** - Contains repository abstraction over Smart Contracts.
    - **use-cases** - Contains use-cases.
    - **env** - Environment configurations.