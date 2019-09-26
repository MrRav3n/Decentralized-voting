import React from 'react'

    class AddCandidate extends React.Component {
        render() {
            return(
                <span>
                <h1 className="text-center mt-3 text-white">You are able to add candidates</h1>
                <form className="form-inline justify-content-center mt-4" onSubmit = {(event) => {
                event.preventDefault();
                this.props.onSubmitOne(this.candidateName.value);
                }}
                >
                  <div className="form-group mx-sm-3 mb-2 d-flex ">
                    <input ref={(input) => this.candidateName = input } className="form-control" placeholder="Candidate" />
                    <button type="submit" className="btn btn-primary ml-3">Add Candidate</button>
                  </div>
                </form>
                <form className="form-inline justify-content-center mt-4" onSubmit = {(event) => {
                    event.preventDefault();
                    this.props.onSubmitTwo(this.address.value)
                }}

                >
                  <div className="form-group mx-sm-3 mb-2 d-flex ">
                    <input ref={(input) => this.address = input } className="form-control" placeholder="Address" />
                    <button type="submit" className="btn btn-primary ml-3">Give ability to vote</button>
                  </div>
                </form>
                </span>
            );
    }
    }

export default AddCandidate
