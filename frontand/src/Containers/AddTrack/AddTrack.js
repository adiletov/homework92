import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import TrackForm from "../../Components/Ui/TrackForm/TrackForm";
import {orderAlbums} from "../../Store/Actions/actionAlbums";
import {addTrackData} from "../../Store/Actions/actionTracks";


class NewTrack extends Component {
    componentDidMount() {
        this.props.orderAlbums();
    }

    render() {
        return (
            <Fragment>
                <h3 className="mb-3">Add new track</h3>
                <TrackForm
                    error={this.props.error}
                    albums={this.props.albums}
                    onSubmit={this.props.addTrackData}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.tracks.error,
    albums: state.albums.allAlbums
});

const mapDispatchToProps = dispatch => ({
    orderAlbums: () => dispatch(orderAlbums()),
    addTrackData: track => dispatch(addTrackData(track))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTrack);