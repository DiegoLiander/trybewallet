import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import Header from '../components/Header';
import { fetchCurriencies, updateTotal } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { requestAPI, updateTotalExpenses } = this.props;
    requestAPI();
    updateTotalExpenses();
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <main>
          { email === '' && (
            <Redirect to="/" />
          ) }
          { email !== '' && (
            <>
              <Header />
              <WalletForm />
              <Table />
            </>
          )}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  requestAPI: () => dispatch(fetchCurriencies()),
  updateTotalExpenses: () => dispatch(updateTotal()),
});

Wallet.propTypes = {
  requestAPI: PropTypes.func.isRequired,
  updateTotalExpenses: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
