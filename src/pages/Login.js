import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
      redirect: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value }, this.disableButton);
  }

  handleSubmit() {
    const { submitLogin } = this.props;
    const { email } = this.state;
    submitLogin({ email });
    this.setState({ redirect: true });
  }

  disableButton() {
    const { email, password } = this.state;
    const emailRegExp = /^([a-z0-9]{1,}[._]{0,1}[a-z0-9]{1,})*(@[a-z0-9]{1,}.com)$/i;
    const minPasswordLength = 6;
    if (!email.match(emailRegExp) || password.length < minPasswordLength) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  }

  render() {
    const { email, password, disabled, redirect } = this.state;

    return (
      <div>
        { redirect && <Redirect to="/carteira" /> }
        { !redirect && (
          <form>
            <div>
              <input
                data-testid="email-input"
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleInputChange }
                placeholder="E-mail"
              />
            </div>
            <div>
              <input
                data-testid="password-input"
                type="password"
                name="password"
                value={ password }
                onChange={ this.handleInputChange }
                placeholder="Senha"
              />
            </div>
            <button type="button" disabled={ disabled } onClick={ this.handleSubmit }>
              ENTRAR
            </button>
          </form>
        ) }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitLogin: (state) => dispatch(userLogin(state)),
});

Login.propTypes = {
  submitLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
