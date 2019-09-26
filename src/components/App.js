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
        this.checkBlockNumber()
    }

    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
        } else {
            alert("Cannoct connect to network")
        }
    }
    async loadBlockchainData() {
        let account = await window.web3.eth.getAccounts();
        this.setState({account: account[0]});
        const networkId = await window.web3.eth.net.getId();
        const networkData = Voting.networks[networkId];
        if(networkData) {
            const voting = await window.web3.eth.Contract(Voting.abi, networkData.address)
            this.setState({voting});
            this.loadCandidates()
        } else {
            alert("Cannoct find network")
        }
    }

    async loadCandidates() {
        this.setState({candidates: []})
        const candidatesCount = await this.state.voting.methods.candidatesCount().call()

        for(let i=0; i<candidatesCount; i++) {
            const candidate = await this.state.voting.methods.candidates(i).call()
            this.setState({candidates: [...this.state.candidates, candidate]})
        }

    }

    async addCandidate(name) {
        await this.state.voting.methods.addCandidate(name).send({from: this.state.account}, async(e) => {
            await this.checkBlockNumber();
        });
    }

    async checkBlockNumber() {
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        };
        const blockNumber = await window.web3.eth.getBlockNumber()
        const blockNumberNew = await window.web3.eth.getBlockNumber()
        while(blockNumber === blockNumberNew) {
            await sleep(500);
        }
        this.loadCandidates();
    }


    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            account: ''
        }
    }

  render() {
    return (
      <div>
      <Navbar account={this.state.account} />
      <AddCandidate onSubmit={this.addCandidate.bind(this)} />
      <CandidatesList candidates={this.state.candidates}/>
      </div>
    );
  }
}

export default App;
