import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../Form/FormElement";


class TrackForm extends Component {
    state = {
        title: '',
        album: '',
        duration: '',
        href: ''
    };

    submitFormHandler = event => {
        event.preventDefault();

        this.props.onSubmit({...this.state});
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        return (
            <Form onSubmit={this.submitFormHandler}>
                <FormElement
                    propertyName="title"
                    title="Track title:"
                    type="text" required
                    onChange={this.inputChangeHandler}
                    value={this.state.title}
                />
                <FormElement
                    propertyName="album"
                    title="Album:"
                    type="select" required
                    onChange={this.inputChangeHandler}
                    value={this.state.album}
                >
                    <option value="">Please select an album</option>
                    {this.props.albums.map(album => (
                        <option key={album._id} value={album._id}>{album.title}</option>
                    ))}
                </FormElement>
                <FormElement
                    propertyName="duration"
                    title="Duration:"
                    type="text"
                    onChange={this.inputChangeHandler}
                    value={this.state.duration}
                />
                <FormElement
                    propertyName="href"
                    title="Youtube href:"
                    type="text"
                    onChange={this.inputChangeHandler}
                    value={this.state.href}
                />

                <FormGroup row>
                    <Col sm={{offset: 2, size: 10}}>
                        <Button type="submit" color="info">Save</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default TrackForm;