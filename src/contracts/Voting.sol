pragma solidity ^0.5.8;

contract Voting {


    uint public candidatesCount = 0;
    struct Candidat {
        uint id;
        string name;
        uint votes;
    }


    address public mainPerson;
    struct Voter {
        bool hasVoted;
        bool canVote;
    }
    event AddCandidateEvent(
        uint id,
        string name,
        uint votes
    );
    event AddVoteEvent(
        uint id,
        bool hasVoted,
        uint votes
    );

     mapping(uint => Candidat) public candidates;
     mapping(address => Voter) public voters;

    constructor() public {
            mainPerson = msg.sender;
            voters[mainPerson].canVote = true;
            addCandidate("Janusz Tracz");
    }

    function whoCanVote(address _address) public {
        require(msg.sender == mainPerson);
        voters[_address].canVote = true;
    }

    function addCandidate(string memory _name) public {
        require(msg.sender == mainPerson);
        require(bytes(_name).length>0);
        candidates[candidatesCount] = Candidat(candidatesCount, _name, 0);
        candidatesCount++;
        emit AddCandidateEvent(candidatesCount, _name, 0);
    }

    function addVote(uint _id) public {
        require(voters[msg.sender].canVote);
        require(!voters[msg.sender].hasVoted);
        require(_id>=0 && _id<=candidatesCount);
        candidates[_id].votes++;
        voters[msg.sender].hasVoted = true;

        emit AddVoteEvent(_id, voters[msg.sender].hasVoted, candidates[_id].votes);
    }

}
