const Voting = artifacts.require("Voting")

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Voting', ([deployer, voter, noVoter]) => {

    let voting
    before(async() => {
        voting = await Voting.deployed();
        voting.whoCanVote(voter, {from: deployer});
    })

    describe('should be initlialized', async() => {
        it('has basic data', async() => {
            const address = await voting.address
            assert.notEqual(address, 0x0, 'should have address');
            const mainPerson = await voting.mainPerson()
            assert.equal(deployer, mainPerson, 'main person should be initialized')
        })
    })
    describe('should be working', async() => {
        it('can add candidate', async() => {
            const addCandidate = await voting.addCandidate("Kowalski", {from: deployer})
            const result = addCandidate.logs[0].args
            assert.equal(result.name, "Kowalski", 'should have a proper name')
            await voting.addCandidate("", {from: deployer}).should.be.rejected
            await voting.addCandidate("Kowalski", {from: voter}).should.be.rejected
        })
        it('can vote', async() => {
            const addVote = await voting.addVote(0, {from: voter})
            const result = addVote.logs[0].args

            assert.equal(result.id.toNumber(), 0)
            assert.equal(result.hasVoted, true)
            assert.equal(1, result.votes.toNumber())
            await voting.addVote(-1, {from: voter}).should.be.rejected
            await voting.addVote(0, {from: noVoter}).should.be.rejected

        })

    })

})
