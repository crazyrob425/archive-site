import React, { useState } from 'react';
import { Route, Switch, Link } from 'wouter';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import ServiceBureau from './pages/ServiceBureau';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Cart from './pages/Cart';
import CheckoutSuccess from './pages/CheckoutSuccess';
import LegacyLandingBridge from './components/LegacyLandingBridge';
import LuxuryBackdrop from './components/LuxuryBackdrop';

export default function App() {
  return (
    <div className="archive-frame">
      <LegacyLandingBridge />
      <LuxuryBackdrop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/product/:slug" component={ProductDetail} />
        <Route path="/service-bureau" component={ServiceBureau} />
        <Route path="/faq" component={FAQ} />
        <Route path="/about" component={About} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout/success" component={CheckoutSuccess} />
        
        <Route>
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1a1412',
            color: '#f5ede3',
            fontFamily: '"Playfair Display", serif'
          }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
            <Link href="/" style={{ color: '#d4af69', textDecoration: 'underline', fontSize: '1.1rem' }}>
              Back to Home
            </Link>
          </div>
        </Route>
      </Switch>
    </div>
  );
}
