import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Card, CardBody, CardFooter, CardImg, CardText, CardTitle} from "reactstrap";
import {apiUrl} from "../../apiUrl";
import {NavLink as RouterNavLink} from 'react-router-dom';
import {deleteAlbum, orderAlbumId, orderArtistName, toolbarPublishAlbums} from "../../Store/Actions/actionAlbums";


class Albums extends Component {
    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.props.orderArtistName(id);
        this.props.orderAlbumId(id);
    }

    deleteAlb = async (id) => {
        await this.props.deleteAlbum(id);
        await this.props.orderAlbumId(id);
    };

    togglePublish = async (id) => {
        await this.props.toolbarPublishAlbums(id);
        await this.props.orderAlbumId(this.props.match.params.id);
    };


    render() {
        if (this.props.user && this.props.user.role === 'admin') {
            return (
                <div>
                    <h3 style={{textAlign: 'center', margin: '20px'}}>{this.props.artist.name}</h3>
                    {this.props.albums && this.props.albums.map(obj =>
                        <Card style={{width: '200px'}} key={obj._id}>
                            <CardImg top width="100%" src={apiUrl + '/uploads/' + obj.coverImage} alt="Card image cap"/>
                            <CardBody>
                                <CardTitle tag={RouterNavLink} to={`/tracks/${obj._id}`}>{obj.title}</CardTitle>
                                <CardText>
                                    <small className="text-muted">{obj.yearOfIssue}</small>
                                </CardText>
                            </CardBody>
                            {this.props.user && this.props.user.role === 'admin'
                                ? <CardFooter className="d-flex justify-content-between">
                                    {obj.published
                                        ? <Button size="sm" color="secondary"
                                                  onClick={() => this.togglePublish(obj._id)}>Unpublish</Button>
                                        : <Button size="sm" color="success"
                                                  onClick={() => this.togglePublish(obj._id)}>Publish</Button>
                                    }
                                    <Button size="sm" color="danger"
                                            onClick={() => this.deleteAlb(obj._id)}>Delete</Button>
                                </CardFooter>
                                : null
                            }
                        </Card>
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    <h3 style={{textAlign: 'center', margin: '20px'}}>{this.props.artist.name}</h3>
                    {this.props.albums && this.props.albums.map(obj =>
                        obj.published &&
                        <Card style={{width: '200px'}} key={obj._id}>
                            <CardImg top width="100%" src={apiUrl + '/uploads/' + obj.coverImage} alt="Card image cap"/>
                            <CardBody>
                                <CardTitle tag={RouterNavLink} to={`/tracks/${obj._id}`}>{obj.title}</CardTitle>
                                <CardText>
                                    <small className="text-muted">{obj.yearOfIssue}</small>
                                </CardText>
                            </CardBody>
                        </Card>
                    )}
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    albums: state.albums.albums,
    artist: state.albums.artist,
    user: state.users.user
});
const mapDispatchToProps = dispatch => ({
    orderAlbumId: (id) => dispatch(orderAlbumId(id)),
    orderArtistName: (id) => dispatch(orderArtistName(id)),
    deleteAlbum: (id) => dispatch(deleteAlbum(id)),
    toolbarPublishAlbums: (id) => dispatch(toolbarPublishAlbums(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);