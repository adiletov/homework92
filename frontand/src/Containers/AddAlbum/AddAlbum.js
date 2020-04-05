import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {orderArtist} from "../../Store/Actions/actionArtists";
import FormAlbum from "../../Components/Ui/FormAlbum/FormAlbum";
import {addAlbumData} from "../../Store/Actions/actionAlbums";

class NewAlbum extends Component {
    componentDidMount() {
        this.props.orderArtist();
    }

    render() {
        return (
            <Fragment>
                <h3 className="mb-3">Add new album</h3>
                <FormAlbum
                    artists={this.props.artists}
                    error={this.props.error}
                    onSubmit={this.props.addAlbumData}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.albums.error,
    artists: state.artists.artists
});

const mapDispatchToProps = dispatch => ({
    orderArtist: () => dispatch(orderArtist()),
    addAlbumData: (album)=> dispatch(addAlbumData(album))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbum);