import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, totalExpenses } = this.props;

    return (
      <header>
        <div>
          <div>
            <span data-testid="email-field">{ email }</span>
          </div>
          <div>
            <span data-testid="total-field">
              {Number(totalExpenses).toFixed(2)}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.string,
};

Header.defaultProps = {
  totalExpenses: '0',
};

export default connect(mapStateToProps, null)(Header);
