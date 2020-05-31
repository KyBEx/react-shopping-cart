import React, {useState} from "react";
import { Menu, Search, Icon } from 'semantic-ui-react';
import "./Navbar.css";

export default function Navbar() {
    const [activeItem, setActiveItem] = useState("");
    function handleClick(event, {name}) {
        setActiveItem(name)
    }
    return (
        <Menu className="App-menu">
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleClick}
        >
          Home
        </Menu.Item>

        <Menu.Item
          name='categories'
          active={activeItem === 'categories'}
          onClick={handleClick}
        >
          Categories
        </Menu.Item>

        <Menu.Item
          name='search'
          active={activeItem === 'search'}
          onClick={handleClick}
          className='navbar-search-width'
        >
          <Search
            
          />
          
        </Menu.Item>
        <Menu.Menu position="right">
        <Menu.Item
          name='shoppingcart'
          active={activeItem === 'shoppingcart'}
          onClick={handleClick}
        >
            <Icon name="shopping cart"/>
        </Menu.Item>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleClick}
        >
          Login
        </Menu.Item>
        <Menu.Item
          name='signup'
          active={activeItem === 'signup'}
          onClick={handleClick}
        >
          Sign Up
        </Menu.Item>

        </Menu.Menu>
       
      </Menu>
    )
}