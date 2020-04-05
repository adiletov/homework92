import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import FormArtist from "../../Components/Ui/FormArtist/FormArtist";
import {addArtistData} from "../../Store/Actions/actionArtists";

class addArtist extends Component {
    render() {
        return (
            <Fragment>
                <h3 className="mb-3">Add new artist</h3>
                <FormArtist
                    error={this.props.error}
                    onSubmit={this.props.addArtistData}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.artists.error
});

const mapDispatchToProps = dispatch => ({
    addArtistData: (artist) => dispatch(addArtistData(artist))
});

export default connect(mapStateToProps, mapDispatchToProps)(addArtist);