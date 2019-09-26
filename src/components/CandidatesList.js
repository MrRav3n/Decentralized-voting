import React from 'react'
import './App.css';
    //listing candidates
    class CandidatesList extends React.Component {
        render() {
            return(
                <ul className="list-group d-flex align-items-center mt-5">
                {this.props.candidates.map((candidate) => { //listing candidates
                    return(
                            <li key={candidate.id} className="list-group-item col-8 d-flex  font-weight-bolder">
                            <div className="col-4">{candidate.name}</div>
                            <div onClick={(e) => this.props.addVote(candidate.id.toNumber())} className="col-4 text-center voteDiv">VOTE</div>
                            <div className="col-4 text-right">Votes count: {candidate.votes.toString()}</div></li>
                );
                })}
                </ul>
            );
        }
    }

export default CandidatesList
