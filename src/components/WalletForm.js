import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addExpense,
  fetchExchangeRates,
  updateCurrentExpense,
  updateTotal,
} from '../redux/actions';

class ExpenseForm extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const {
      recordExpense,
      requestExchangeRatesFromAPI,
      expenses,
      currentExpense,
      updateTotalExpenses,
    } = this.props;
    if (currentExpense.id === null) {
      recordExpense(currentExpense, expenses.length);
      requestExchangeRatesFromAPI(expenses.length);
    } else {
      recordExpense(currentExpense, currentExpense.id);
      updateTotalExpenses();
    }
  }

  render() {
    const { currencies, currentExpense, handleInputChange } = this.props;
    const { id, value, description, currency, method, tag } = currentExpense;

    return (
      <form>
        <div>
          <label htmlFor="value-input">
            Valor
            <div>
              <input
                id="value-input"
                data-testid="value-input"
                type="number"
                name="value"
                value={ value }
                onChange={ handleInputChange }
              />
            </div>
          </label>
          <label htmlFor="currencies">
            Moeda
            <select
              id="currencies"
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ handleInputChange }
            >
              {currencies.map((curr) => (
                <option key={ curr }>{curr}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="description-input" className="label">
            Descrição
            <div>
              <input
                id="description-input"
                data-testid="description-input"
                type="text"
                name="description"
                value={ description }
                onChange={ handleInputChange }
              />
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="method-input">
            Pagamento
            <select
              id="method-input"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ handleInputChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="tag">
            Categoria
            <select
              id="tag"
              data-testid="tag-input"
              value={ tag }
              name="tag"
              onChange={ handleInputChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </div>
        <div>
          <button
            type="button"
            onClick={ this.handleSubmit }
            disabled={ !value || !description }
          >
            {`${id !== null ? 'Editar' : 'Adicionar'} despesa`}
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  currentExpense: state.wallet.currentExpense,
});

const mapDispatchToProps = (dispatch) => ({
  recordExpense: (state, index) => dispatch(addExpense(state, index)),
  requestExchangeRatesFromAPI: (index) => dispatch(fetchExchangeRates(index)),
  handleInputChange: ({ target }) => {
    dispatch(updateCurrentExpense(target.name, target.value));
  },
  updateTotalExpenses: () => dispatch(updateTotal()),
});

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  recordExpense: PropTypes.func.isRequired,
  requestExchangeRatesFromAPI: PropTypes.func.isRequired,
  currentExpense: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  handleInputChange: PropTypes.func.isRequired,
  updateTotalExpenses: PropTypes.func.isRequired,
};

ExpenseForm.defaultProps = {
  currentExpense: {
    id: null,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
