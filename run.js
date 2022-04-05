let ganache = require('ganache-cli')
let exec = require('child_process').exec
let keys = require('./env/accounts.json')
let promisify = require('util').promisify
exec = promisify(exec)
let server = ganache.server({ network_id: 17, accounts: keys, log: console, locked: false })

server.listen(8545, async (err, blockchain) => {
    logAccounts({ accounts: blockchain.unlocked_accounts })

    heading('Deploying Contracts:')
    await deploy()

    // let app = require('./app')

    // heading('Configuring Web server:')

    // app.listen(3000, () => {
    //     console.log('Web server listening on port 3000....')
    // })
})

async function deploy() {
    try {
        const { stdout, stderr } = await exec('npx truffle deploy')
        console.log('stdout:', stdout)
        console.log('stderr:', stderr)
    } catch (e) {
        console.log('error occured')
        console.error('error:', e)
    }
}

function logAccounts({ accounts }) {
    heading('Test Accounts: ')

    for (const address in accounts) {
        if (Object.hasOwnProperty.call(accounts, address)) {
            const account = accounts[address]

            console.log({
                address: account.address,
                publicKey: '0x' + account.publicKey.toString('hex'),
                secretKey: '0x' + account.secretKey.toString('hex')
            })
        }
    }
}

function heading(heading) {
    console.log()
    let underline = ''

    for (let i = 0; i < heading.length; i++)
        underline += '='

    console.log(heading)
    console.log(underline)
    console.log()
}