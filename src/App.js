import React, { useEffect, useState } from 'react';
import './App.css';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ClearIcon from '@material-ui/icons/Clear';
import {
  Checkbox,
  Container,
  Grid,
  FormControl, 
  InputLabel, 
  Input, 
  Button, 
  ButtonBase, 
  Typography, 
  Table, 
  TableHead, 
  TableRow, 
  TableBody, 
  TableCell 
} from '@material-ui/core/';

const CartTable = ({ rows }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell align="center"><Typography>Type</Typography></TableCell>
          <TableCell align="center"><Typography>Name</Typography></TableCell>
          <TableCell align="center"><Typography>Price</Typography></TableCell>
          <TableCell align="center"><Typography>Quantity</Typography></TableCell>
          <TableCell align="center"><Typography>Total</Typography></TableCell>
          <TableCell align="center"></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
          <TableCell component="th" scope="row">
            <img className="CartItemImage" src={row.image} />
          </TableCell>
          <TableCell align="right"><Typography>{row.type}</Typography></TableCell>
          <TableCell align="right"><Typography>{row.name}</Typography></TableCell>
          <TableCell align="right"><Typography>{row.price}</Typography></TableCell>
          <TableCell align="right"><Typography>{row.quantity}</Typography></TableCell>
          <TableCell align="right"><Typography>{row.total}</Typography></TableCell>
          <TableCell align="right"><ButtonBase><ClearIcon className="DeleteIcon" /></ButtonBase></TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const mockCartItems = [
  {
    image: "https://vanlifeshirts.com/images/mockups/bay-window-vanlife.jpg",
    type: "Mens - Classic T-shirt",
    name: "Gildan 2000 Ultra Cotton T-Shirt (Black / S)",
    price: 25,
    quantity: 1,
    total: 25
  },
  {
    image: "https://vanlifeshirts.com/images/mockups/bay-window-vanlife.jpg",
    type: "Womens - Classic T-shirt",
    name: "Gildan 2000 Ultra Cotton T-Shirt (White / S)",
    price: 25,
    quantity: 3,
    total: 75
  },
]

const Summary = ({ cartItems, shipping = null }) => {
  const subTotal = cartItems.reduce((acc, next) => acc + (next.price * next.quantity), 0);
  const shippingMsg = shipping ? `$${shipping}` : "Continue to calculate shipping";
  const total = subTotal + (shipping || 0);

  return (
    <div>
      <Typography>Subtotal: <b>${subTotal}</b></Typography>
      <Typography>Shipping: <b>{shippingMsg}</b></Typography>
      <Typography>Total: <b>${total}</b></Typography>
    </div>
  )
}

const SHOW_ADDRESS_BUTTON = "SHOW_ADDRESS_BUTTON";
const SHOW_ADDRESS_FORM = "SHOW_ADDRESS_FORM";
const ADDRESS_FORM_COMPLETE = "ADDRESS_FORM_COMPLETE";
const HIDE_ADDRESS_FORM = "HIDE_ADDRESS_FORM";

const AddressForm = ({ title }) => {
  return (
    <div className="AddressForm">
      <h2><Typography>{title}</Typography></h2>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <FormControl>
          <InputLabel htmlFor="billing-details-name">Name</InputLabel>
          <Input id="billing-details-name" />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="billing-details-address-line-1">Address Line 1</InputLabel>
          <Input id="billing-details-address-line-1" />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="billing-details-address-line-2">Address Line 2</InputLabel>
          <Input id="billing-details-address-line-2" />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="billing-details-city">City</InputLabel>
          <Input id="billing-details-city" />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="billing-details-state-code">State Code</InputLabel>
          <Input id="billing-details-state-code" />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="billing-details-country-code">Country code</InputLabel>
          <Input id="billing-details-country-code" />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="billing-details-zip">Zip</InputLabel>
          <Input id="billing-details-zip" />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="billing-details-email-address">Email address</InputLabel>
          <Input id="billing-details-email-address" />
        </FormControl>
      </Grid>
    </div>
  )
}

const Address = ({ show, setter, setBillingAddressDetails, setShippingAddressDetails }) => {
  const [differentShippingDetails, setDifferentShippingDetails] = useState(false);

  return (
    <>
      {show === SHOW_ADDRESS_BUTTON && (
        <Button variant="contained" color="primary" onClick={() => setter(SHOW_ADDRESS_FORM)}>
          <Typography>Enter address details</Typography>
        </Button> 
      )}

      {show === SHOW_ADDRESS_FORM && (
        <>
          <Grid 
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Typography><b>Use same shipping address as billing address</b></Typography>
            <Checkbox
              checked={differentShippingDetails}
              onChange={() => setDifferentShippingDetails(!differentShippingDetails)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
          <AddressForm title="Billing Details" setBillingAddressDetails={setBillingAddressDetails} />
          {differentShippingDetails && <AddressForm title="Shipping Details" setShippingAddressDetails={setShippingAddressDetails} /> }
          <Button variant="contained" color="secondary" onClick={() => setter(ADDRESS_FORM_COMPLETE)}>
            <Typography>Continue and calculate shipping</Typography>
          </Button>
        </>
      )}

      {show === HIDE_ADDRESS_FORM && null}
    </>
  )
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [billingAddressDetails, setBillingAddressDetails] = useState({});
  const [shippingAddressDetails, setShippingAddressDetails] = useState({});
  const [showAddressForm, setShowAddressForm] = useState(SHOW_ADDRESS_BUTTON);

  useEffect(() => {
    setCartItems(mockCartItems)
  }, [])

  return (
    <div className="App">
      <Container>
        <div className="AppContent">
          <h1>Cart <ShoppingCartIcon /></h1>
          { showAddressForm !== SHOW_ADDRESS_FORM && (
            <>
              <CartTable rows={cartItems} />
              <Summary cartItems={cartItems} />
            </>
          )}

          <Address 
            show={showAddressForm} 
            setter={setShowAddressForm} 
            setBillingAddressDetails={setBillingAddressDetails} 
            setShippingAddressDetails={setShippingAddressDetails}
          />
        </div>
      </Container>
    </div>
  );
}

export default App;
