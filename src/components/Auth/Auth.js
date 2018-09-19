import { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';

import { setAuthData } from '../../actions';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.data = props.authData;
    console.log(props);
    this.authData();
  }

  authData() {
    const hashData = queryString.parse(this.props.location.hash);
    if (hashData.error) {
      swal("Error on auth!");
      this.props.history.push("/");
    } else {
      console.log('set!');
      this.props.setAuthData(hashData);
      console.log('after', this.props);
      this.props.history.push("/");
    }

  }

  render() {
    return (null);
  }

}

const mapStateToProps = store => ({
  authData: store.authState
});

const mapDispatchToProps = dispatch =>
  bindActionCreators( { setAuthData }, dispatch );

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
