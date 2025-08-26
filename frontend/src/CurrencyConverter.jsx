import React, { useState, useEffect } from 'react';
import './converter.css';

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/rates")
      .then(res => res.json())
      .then(data => {
        setRates(data.conversion_rates);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching rates:", err);
        setLoading(false);
      });
  }, []);

  const Convert = () => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return;
    const result = (amount / rates[fromCurrency]) * rates[toCurrency];
    setConvertedAmount(result);
  };

  useEffect(() => {
    if (Object.keys(rates).length > 0) Convert();
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleSwitch = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading exchange rates...</div>;

  return (
    <div className="converter-container">
      <h1>Currency Converter</h1>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
        placeholder="Enter amount"
        className="converter-input"
      />

      <div className="currency-row">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="currency-select"
        >
          {Object.keys(rates).map(curr => (
            <option key={curr} value={curr}>{curr}</option>
          ))}
        </select>

        <button className="switch-button" onClick={handleSwitch}>⇄</button>

        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="currency-select"
        >
          {Object.keys(rates).map(curr => (
            <option key={curr} value={curr}>{curr}</option>
          ))}
        </select>
      </div>

      {convertedAmount !== null && (
        <div className="converted-result">
          <p>{amount} {fromCurrency} = {convertedAmount.toFixed(4)} {toCurrency}</p>
          <p className="converted-rate">
            Rate: 1 {fromCurrency} = {((1 / rates[fromCurrency]) * rates[toCurrency]).toFixed(6)} {toCurrency}
          </p>
        </div>
      )}

      <div className="timestamp">
        Exchange rates updated: {new Date().toLocaleString()}
      </div>
    </div>
  );
};

export default CurrencyConverter;
