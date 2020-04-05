import React, {Component} from 'react';
import {connect} from "react-redux";
import {orderTrackHistory} from "../../Store/Actions/actionTrackHistory";

class TrackHistory extends Component {
    componentDidMount() {
        this.props.orderTrackHistory()
    }

    render() {
        return (
            <>
                <h2 className="mb-2">Track history</h2>
                {this.props.tracks.map(item => {
                    const date = new Date(item.date).toLocaleString('ru-Ru');
                    return (
                        <div
                            key={item._id}
                            className="border p-2 mb-2"
                        >
                            <p><small>Artist:</small> {item.trackId.album.artist.name} </p>
                            <p><small>Track:</small> {item.trackId.title} </p>
                            <p><small>Album:</small>{item.trackId.album.title}</p>
                            <p><small>DateTime:</small> {date}</p>
                        </div>
                    )
                })}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.users.user,
    tracks: state.trackHistory.tracks
});

const mapDispatchToProps = (dispatch) => ({
    orderTrackHistory: () => dispatch(orderTrackHistory())
});
export default connect(mapStateToProps, mapDispatchToProps)(TrackHistory);