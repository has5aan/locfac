module.exports = ({ contract, postTransaction, poster }) => (
    Object.freeze({
        register: async ({ locker, status }) => {
            let register = contract.methods.register(locker, status)

            let estimatedGas = await register.estimateGas({ from: poster.address })

            let transaction = {
                from: poster.address,
                to: contract.address,
                data: register.encodeABI(),
                gas: estimatedGas
            }

            await postTransaction({ transaction, poster })
        },

        modifyStatus: async ({ locker, status }) => {
            let modifyStatus = contract.methods.modifyStatus(locker, status)

            let estimatedGas = await modifyStatus.estimateGas({ from: poster.address })

            let transaction = {
                from: poster.address,
                to: contract.address,
                data: modifyStatus.encodeABI(),
                gas: estimatedGas
            }

            await postTransaction({ transaction, poster })
        },

        allotAccess: async ({ locker, user }) => {
            let allotAccess = contract.methods.allotAccess(locker, user)

            let estimatedGas = await allotAccess.estimateGas({ from: poster.address })

            let transaction = {
                from: poster.address,
                to: contract.address,
                data: allotAccess.encodeABI(),
                gas: estimatedGas
            }

            await postTransaction({ transaction, poster })
        },

        revokeAccess: async ({ locker, user }) => {
            let revokeAccess = contract.methods.revokeAccess(locker, user)

            let estimatedGas = await revokeAccess.estimateGas({ from: poster.address })

            let transaction = {
                from: poster.address,
                to: contract.address,
                data: revokeAccess.encodeABI(),
                gas: estimatedGas
            }

            await postTransaction({ transaction, poster })
        },

        hasLockerAccess: ({ locker, user }) => {
            return contract.methods.hasLockerAccess(locker, user).call()
        },

        lockerDetails: async ({ identifier }) => {
            return await contract.methods.lockerCollection(identifier).call()
        }
    })
)