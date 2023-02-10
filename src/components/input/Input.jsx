import React, { useState, useEffect } from 'react';
// import { nanoid } from 'nanoid';
import inputStyle from './input.module.css';
import { BiSearch } from 'react-icons/bi';
import Countries from '../countries/Countries'

const Input = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCountries, setAllCountries] = useState();
  const [filter, setFilter] = useState('');
  const [term, setTerm] = useState('all');

  function handleChange(e) {
    setSearchTerm(e.target.value)
  }

  function getData() {
    if (searchTerm.trim().length > 0) {
      setTerm('name');
    }

    setTimeout(() => {
      fetch(`https://restcountries.com/v3.1/${term}/${searchTerm}`)
        .then(res => res.json())
        .then(data => {
          const countries = data;
          setAllCountries(countries);
        })
        .catch(err => console.log(err));
    }, 2000);
  }

  function handleFilterChange() {
    if (filter) {
      setTerm('region')
    }
  }

  useEffect(() => {
    handleFilterChange()
    const timedData = setTimeout(() => getData(), 100);
    return () => {
      clearTimeout(() => timedData);
    };
  }, [filter, searchTerm]);

  function formSubmitHandler(event) {
    event.preventDefault();
  }



  return (
    <>
      <form className={inputStyle.form} onSubmit={formSubmitHandler}>
        <div className={inputStyle.inputDiv}>
          <input
            value={searchTerm}
            onChange={handleChange}
            placeholder='Please search here'
          />
          <div className={inputStyle.search}><BiSearch /></div>
        </div>
        <select
          className={inputStyle.select}
          value={filter}
          onChange={(e) => { setFilter(e.target.value) }}
        >
          <option value=''>Filter by region</option>
          <option value='Africa'>Africa</option>
          <option value='America'>America</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
        </select>
      </form>
      <Countries countryList={allCountries} />
    </>
  );
};

export default Input;

