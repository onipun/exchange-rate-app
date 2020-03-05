import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types';
export const countryOptions = [
  { key: 'EUR', value: 'EUR', flag: 'ro', text: 'European' },
  { key: 'USD', value: 'USD', flag: 'us', text: 'United State' },
  { key: 'JPY', value: 'JPY', flag: 'an', text: 'Japan' },
  { key: 'MYR', value: 'MYR', flag: 'my', text: 'Malaysia' },
]

export const DropdownCode = (props) => (
  <Dropdown
    placeholder={props.placeholder}
    fluid
    search
    selection
    options={countryOptions}
    onChange={props.clicked}
  
  />
)

DropdownCode.propTypes = {
  placeholder: PropTypes.string,
  clicked: PropTypes.func
}