import React from 'react'

    function CandidatesList({candidates}) {

            return(
                <ul className="list-group d-flex align-items-center mt-5">
                {candidates.map((candidate) => {
                    return(
                    <li key={candidate.id} className="list-group-item col-8 d-flex"><span>{candidate.name}</span> <span className="ml-auto"> Ilość głosów: {candidate.votes.toString()}</span></li>
                );
                })}

                </ul>
            );
    }

export default CandidatesList
