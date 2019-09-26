import React, { Component } from 'react';
import Navbar from './Navbar'
import './App.css';
import Web3 from 'web3'
import Voting from '../abis/Voting.json'
import CandidatesList from './CandidatesList'
import AddCandidate from './AddCandidate'

class App extends Component {

    async componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();

    }
    //loading Web3
    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
        } else {
            alert("Cannoct connect to network")
        }
    }
    //loading loadBlockchainData
    async loadBlockchainData() {
            this.setState({loading: true})
        let account = await window.web3.eth.getAccounts();
        this.setState({account: account[0]});
        const networkId = await window.web3.eth.net.getId();
        const networkData = Voting.networks[networkId];
        if(networkData) {
            const voting = await window.web3.eth.Contract(Voting.abi, networkData.address)
            this.setState({voting});
            this.loadCandidates()
            const deployer = await voting.methods.mainPerson().call()

            this.setState({
                deployer: deployer
            })
    this.setState({loading: false})
        } else {
            alert("Cannoct find network")
        }
    }
    //loadingCandidates
    async loadCandidates() {
        this.setState({candidates: []})
        const candidatesCount = await this.state.voting.methods.candidatesCount().call()

        for(let i=0; i<candidatesCount; i++) {
            const candidate = await this.state.voting.methods.candidates(i).call()
            this.setState({candidates: [...this.state.candidates, candidate]})
        }

    }
    //Add candidates function
    async addCandidate(name) {
        await this.state.voting.methods.addCandidate(name).send({from: this.state.account}, async(e) => {
            await this.checkBlockNumber();
        });

    }

    //Give ability to votes
    async givePermision(address) {
        await this.state.voting.methods.whoCanVote(address).send({from: this.state.account}, async(e) => {
            await this.checkBlockNumber();
        })
    }



    //special function that check if transation that had been done is already mined
    async checkBlockNumber() {
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        };
        this.setState({loading: true})
        const blockNumber = await window.web3.eth.getBlockNumber()
        let blockNumberNew = await window.web3.eth.getBlockNumber()
        while(blockNumber === blockNumberNew) {
            blockNumberNew = await window.web3.eth.getBlockNumber()
            await sleep(500);
        }
        this.loadCandidates();
        this.setState({loading: false})
    }
    isAccountDeployer() {
        if(this.state.account === this.state.deployer) {
            return true;
        } else {
            return false;
        }
    }
    async addVote(id) {
        await this.state.voting.methods.addVote(id).send({from: this.state.account}, async(e) => {
            await this.checkBlockNumber();
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            account: '',
            deployer: '',
            loading: true
        }
    }

    render() {
        return (
            <div>
                <Navbar account={this.state.account} />

                {this.state.loading
                ? <h1 className="text-center font-weight-bolder mt-5 display-3 text-white">Loading...</h1>
                : <div>{this.isAccountDeployer()
                ?    <AddCandidate onSubmitOne={this.addCandidate.bind(this)} onSubmitTwo={this.givePermision.bind(this)} />
                :    <div><h1 className="text-center mt-3 text-white">You are able only to vote</h1></div>
                }
                <CandidatesList addVote={this.addVote.bind(this)}  candidates={this.state.candidates}/>
                </div>
            }
            </div>
        );
    }
}

export default App;
