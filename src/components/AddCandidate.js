import React from 'react'

    class AddCandidate extends React.Component {
        render() {
            return(
                <form className="form-inline justify-content-center mt-4" onSubmit = {(event) => {
                event.preventDefault();
                this.props.onSubmit(this.candidateName.value);
                }}
                >
                  <div className="form-group mx-sm-3 mb-2 d-flex ">
                    <input ref={(input) => this.candidateName = input } className="form-control" placeholder="AddCandidate" />
                    <button type="submit" className="btn btn-primary ml-3">Add Candidate</button>
                  </div>
                </form>
            );
    }
    }

export default AddCandidate
