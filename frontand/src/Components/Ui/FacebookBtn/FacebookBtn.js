import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {Button} from "reactstrap";
import {connect} from "react-redux";
import {facebookLogin} from "../../../Store/Actions/actionUser";

class FacebookBtn extends Component {
    responseFb = (response)=>{
      if (response.id){
          this.props.facebookLogin(response);
      }
    };
    render() {
        return (
            <div>
                <FacebookLogin
                    appId="1342251599302385"
                    fields="name,email,picture"
                    callback={this.responseFb}
                    render={renderProps => (
                        <Button onClick={renderProps.onClick}>
                            {this.props.title} with Facebook
                        </Button>
                    )}
                />
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    facebookLogin: (user)=> dispatch(facebookLogin(user))
});

export default connect(null, mapDispatchToProps)(FacebookBtn);