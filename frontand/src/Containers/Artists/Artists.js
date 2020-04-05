import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteArtist, orderArtist, toolbarPublishArtist} from "../../Store/Actions/actionArtists";
import {Button, Card, CardBody, CardFooter, CardImg, CardTitle} from "reactstrap";
import {apiUrl} from "../../apiUrl";
import {NavLink as RouterNavLink} from 'react-router-dom';
import noimage from '../../assets/images/noimage.png';


class Artists extends Component {
    componentDidMount() {
        this.props.orderArtists();
    }

    render() {
        if (this.props.user && this.props.user.role === 'admin') {
            return (
                <div>
                    <h1>Исполнители: </h1>
                    {this.props.artists && this.props.artists.map(obj =>
                        <Card style={{width: '200px'}} key={obj._id}>
                            {
                                obj.image ?
                                    <CardImg top width="50%" src={apiUrl + '/uploads/' + obj.image} alt={obj.name}/> :
                                    <CardImg top width="50%" src={noimage} alt={'No images'}/>
                            }

                            <CardBody tag={RouterNavLink} to={`/albums/${obj._id}`}>
                                <CardTitle>{obj.name}</CardTitle>
                            </CardBody>

                            <CardFooter className="d-flex justify-content-between">
                                {obj.published
                                    ? <Button size="sm" color="secondary"
                                              onClick={() => this.props.toolbarPublishArtist(obj._id)}>Unpublish</Button>
                                    : <Button size="sm" color="success"
                                              onClick={() => this.props.toolbarPublishArtist(obj._id)}>Publish</Button>
                                }
                                <Button size="sm" color="danger"
                                        onClick={() => this.props.deleteArtist(obj._id)}>Delete</Button>
                            </CardFooter>
                        </Card>
                    )}
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Исполнители: </h1>
                    {this.props.artists && this.props.artists.map(obj =>
                        obj.published &&
                        <Card style={{width: '200px'}} key={obj._id}>
                            {
                                obj.image ?
                                    <CardImg top width="50%" src={apiUrl + '/uploads/' + obj.image} alt={obj.name}/> :
                                    <CardImg top width="50%" src={noimage} alt={'No images'}/>
                            }

                            <CardBody tag={RouterNavLink} to={`/albums/${obj._id}`}>
                                <CardTitle>{obj.name}</CardTitle>
                            </CardBody>
                        </Card>
                    )}
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    artists: state.artists.artists,
    user: state.users.user
});
const mapDispatchToProps = dispatch => ({
    orderArtists: () => dispatch(orderArtist()),
    toolbarPublishArtist: (id) => dispatch(toolbarPublishArtist(id)),
    deleteArtist: (id) => dispatch(deleteArtist(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Artists);