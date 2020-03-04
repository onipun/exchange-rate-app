import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const countryOptions = [
  { key: 'Euro', value: 'Euro', flag: 'ro', text: 'European' },
  { key: 'Usd', value: 'Usd', flag: 'us', text: 'United State' },
  { key: 'Yen', value: 'Yen', flag: 'an', text: 'Japan' },
  { key: 'Myr', value: 'Myr', flag: 'my', text: 'Malaysia' },
]

const DropdownCode = () => (
  <Dropdown
    placeholder='Select Country'
    fluid
    search
    selection
    options={countryOptions}
  
  
  />
)

export default DropdownCode