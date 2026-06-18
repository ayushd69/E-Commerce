import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CategoryGrid from './CategoryGrid';

const MOCK_PRODUCTS = [
  // ── For You (15) ──────────────────────────────────────
  { _id: 'fyu1', name: 'For You Item 1', brand: 'Generic', description: 'Handpicked for you', price: 449, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1513885045260-6b3086b24c17?w=500&q=80' },
  { _id: 'fyu2', name: 'For You Item 2', brand: 'Generic', description: 'Handpicked for you', price: 599, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
  { _id: 'fyu3', name: 'For You Item 3', brand: 'Generic', description: 'Handpicked for you', price: 749, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { _id: 'fyu4', name: 'For You Item 4', brand: 'Generic', description: 'Handpicked for you', price: 899, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80' },
  { _id: 'fyu5', name: 'For You Item 5', brand: 'Generic', description: 'Handpicked for you', price: 1049, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?w=500&q=80' },
  { _id: 'fyu6', name: 'For You Item 6', brand: 'Generic', description: 'Handpicked for you', price: 1199, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1513885045260-6b3086b24c17?w=500&q=80' },
  { _id: 'fyu7', name: 'For You Item 7', brand: 'Generic', description: 'Handpicked for you', price: 1349, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
  { _id: 'fyu8', name: 'For You Item 8', brand: 'Generic', description: 'Handpicked for you', price: 1499, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { _id: 'fyu9', name: 'For You Item 9', brand: 'Generic', description: 'Handpicked for you', price: 1649, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80' },
  { _id: 'fyu10', name: 'For You Item 10', brand: 'Generic', description: 'Handpicked for you', price: 1799, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?w=500&q=80' },
  { _id: 'fyu11', name: 'For You Item 11', brand: 'Generic', description: 'Handpicked for you', price: 1949, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1513885045260-6b3086b24c17?w=500&q=80' },
  { _id: 'fyu12', name: 'For You Item 12', brand: 'Generic', description: 'Handpicked for you', price: 2099, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
  { _id: 'fyu13', name: 'For You Item 13', brand: 'Generic', description: 'Handpicked for you', price: 2249, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { _id: 'fyu14', name: 'For You Item 14', brand: 'Generic', description: 'Handpicked for you', price: 2399, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80' },
  { _id: 'fyu15', name: 'For You Item 15', brand: 'Generic', description: 'Handpicked for you', price: 2549, category: 'For You', imageUrl: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?w=500&q=80' },

  // ── Fashion (15) ──────────────────────────────────────
  { _id: 'fsh1', name: 'Fashion Item 1', brand: 'Zara', description: 'Latest fashion trend', price: 449, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80' },
  { _id: 'fsh2', name: 'Fashion Item 2', brand: 'Zara', description: 'Latest fashion trend', price: 599, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80' },
  { _id: 'fsh3', name: 'Fashion Item 3', brand: 'Zara', description: 'Latest fashion trend', price: 749, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=500&q=80' },
  { _id: 'fsh4', name: 'Fashion Item 4', brand: 'Zara', description: 'Latest fashion trend', price: 899, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80' },
  { _id: 'fsh5', name: 'Fashion Item 5', brand: 'Zara', description: 'Latest fashion trend', price: 1049, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80' },
  { _id: 'fsh6', name: 'Fashion Item 6', brand: 'Zara', description: 'Latest fashion trend', price: 1199, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80' },
  { _id: 'fsh7', name: 'Fashion Item 7', brand: 'Zara', description: 'Latest fashion trend', price: 1349, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80' },
  { _id: 'fsh8', name: 'Fashion Item 8', brand: 'Zara', description: 'Latest fashion trend', price: 1499, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=500&q=80' },
  { _id: 'fsh9', name: 'Fashion Item 9', brand: 'Zara', description: 'Latest fashion trend', price: 1649, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80' },
  { _id: 'fsh10', name: 'Fashion Item 10', brand: 'Zara', description: 'Latest fashion trend', price: 1799, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80' },
  { _id: 'fsh11', name: 'Fashion Item 11', brand: 'Zara', description: 'Latest fashion trend', price: 1949, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80' },
  { _id: 'fsh12', name: 'Fashion Item 12', brand: 'Zara', description: 'Latest fashion trend', price: 2099, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80' },
  { _id: 'fsh13', name: 'Fashion Item 13', brand: 'Zara', description: 'Latest fashion trend', price: 2249, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=500&q=80' },
  { _id: 'fsh14', name: 'Fashion Item 14', brand: 'Zara', description: 'Latest fashion trend', price: 2399, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80' },
  { _id: 'fsh15', name: 'Fashion Item 15', brand: 'Zara', description: 'Latest fashion trend', price: 2549, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80' },

  // ── Mobiles (15) ──────────────────────────────────────
  { _id: 'mob1', name: 'Mobiles Item 1', brand: 'Apple', description: 'Smart mobile device', price: 449, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&q=80' },
  { _id: 'mob2', name: 'Mobiles Item 2', brand: 'Apple', description: 'Smart mobile device', price: 599, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351cb315?w=500&q=80' },
  { _id: 'mob3', name: 'Mobiles Item 3', brand: 'Apple', description: 'Smart mobile device', price: 749, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?w=500&q=80' },
  { _id: 'mob4', name: 'Mobiles Item 4', brand: 'Apple', description: 'Smart mobile device', price: 899, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbc0?w=500&q=80' },
  { _id: 'mob5', name: 'Mobiles Item 5', brand: 'Apple', description: 'Smart mobile device', price: 1049, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80' },
  { _id: 'mob6', name: 'Mobiles Item 6', brand: 'Apple', description: 'Smart mobile device', price: 1199, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&q=80' },
  { _id: 'mob7', name: 'Mobiles Item 7', brand: 'Apple', description: 'Smart mobile device', price: 1349, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351cb315?w=500&q=80' },
  { _id: 'mob8', name: 'Mobiles Item 8', brand: 'Apple', description: 'Smart mobile device', price: 1499, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?w=500&q=80' },
  { _id: 'mob9', name: 'Mobiles Item 9', brand: 'Apple', description: 'Smart mobile device', price: 1649, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbc0?w=500&q=80' },
  { _id: 'mob10', name: 'Mobiles Item 10', brand: 'Apple', description: 'Smart mobile device', price: 1799, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80' },
  { _id: 'mob11', name: 'Mobiles Item 11', brand: 'Apple', description: 'Smart mobile device', price: 1949, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&q=80' },
  { _id: 'mob12', name: 'Mobiles Item 12', brand: 'Apple', description: 'Smart mobile device', price: 2099, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351cb315?w=500&q=80' },
  { _id: 'mob13', name: 'Mobiles Item 13', brand: 'Apple', description: 'Smart mobile device', price: 2249, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1533228100845-08145b01de14?w=500&q=80' },
  { _id: 'mob14', name: 'Mobiles Item 14', brand: 'Apple', description: 'Smart mobile device', price: 2399, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbc0?w=500&q=80' },
  { _id: 'mob15', name: 'Mobiles Item 15', brand: 'Apple', description: 'Smart mobile device', price: 2549, category: 'Mobiles', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80' },

  // ── Beauty (15) ──────────────────────────────────────
  { _id: 'bt1', name: 'Beauty Item 1', brand: 'Loreal', description: 'Premium beauty product', price: 449, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80' },
  { _id: 'bt2', name: 'Beauty Item 2', brand: 'Loreal', description: 'Premium beauty product', price: 599, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80' },
  { _id: 'bt3', name: 'Beauty Item 3', brand: 'Loreal', description: 'Premium beauty product', price: 749, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500&q=80' },
  { _id: 'bt4', name: 'Beauty Item 4', brand: 'Loreal', description: 'Premium beauty product', price: 899, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1580870059106-9ab8570d55e4?w=500&q=80' },
  { _id: 'bt5', name: 'Beauty Item 5', brand: 'Loreal', description: 'Premium beauty product', price: 1049, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80' },
  { _id: 'bt6', name: 'Beauty Item 6', brand: 'Loreal', description: 'Premium beauty product', price: 1199, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80' },
  { _id: 'bt7', name: 'Beauty Item 7', brand: 'Loreal', description: 'Premium beauty product', price: 1349, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80' },
  { _id: 'bt8', name: 'Beauty Item 8', brand: 'Loreal', description: 'Premium beauty product', price: 1499, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500&q=80' },
  { _id: 'bt9', name: 'Beauty Item 9', brand: 'Loreal', description: 'Premium beauty product', price: 1649, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1580870059106-9ab8570d55e4?w=500&q=80' },
  { _id: 'bt10', name: 'Beauty Item 10', brand: 'Loreal', description: 'Premium beauty product', price: 1799, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80' },
  { _id: 'bt11', name: 'Beauty Item 11', brand: 'Loreal', description: 'Premium beauty product', price: 1949, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80' },
  { _id: 'bt12', name: 'Beauty Item 12', brand: 'Loreal', description: 'Premium beauty product', price: 2099, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80' },
  { _id: 'bt13', name: 'Beauty Item 13', brand: 'Loreal', description: 'Premium beauty product', price: 2249, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500&q=80' },
  { _id: 'bt14', name: 'Beauty Item 14', brand: 'Loreal', description: 'Premium beauty product', price: 2399, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1580870059106-9ab8570d55e4?w=500&q=80' },
  { _id: 'bt15', name: 'Beauty Item 15', brand: 'Loreal', description: 'Premium beauty product', price: 2549, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&q=80' },

  // ── Electronics (15) ──────────────────────────────────────
  { _id: 'elec1', name: 'Electronics Item 1', brand: 'Sony', description: 'High tech electronics', price: 449, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80' },
  { _id: 'elec2', name: 'Electronics Item 2', brand: 'Sony', description: 'High tech electronics', price: 599, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { _id: 'elec3', name: 'Electronics Item 3', brand: 'Sony', description: 'High tech electronics', price: 749, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1526406915894-7bc5cc8bc7b8?w=500&q=80' },
  { _id: 'elec4', name: 'Electronics Item 4', brand: 'Sony', description: 'High tech electronics', price: 899, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80' },
  { _id: 'elec5', name: 'Electronics Item 5', brand: 'Sony', description: 'High tech electronics', price: 1049, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80' },
  { _id: 'elec6', name: 'Electronics Item 6', brand: 'Sony', description: 'High tech electronics', price: 1199, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80' },
  { _id: 'elec7', name: 'Electronics Item 7', brand: 'Sony', description: 'High tech electronics', price: 1349, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { _id: 'elec8', name: 'Electronics Item 8', brand: 'Sony', description: 'High tech electronics', price: 1499, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1526406915894-7bc5cc8bc7b8?w=500&q=80' },
  { _id: 'elec9', name: 'Electronics Item 9', brand: 'Sony', description: 'High tech electronics', price: 1649, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80' },
  { _id: 'elec10', name: 'Electronics Item 10', brand: 'Sony', description: 'High tech electronics', price: 1799, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80' },
  { _id: 'elec11', name: 'Electronics Item 11', brand: 'Sony', description: 'High tech electronics', price: 1949, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80' },
  { _id: 'elec12', name: 'Electronics Item 12', brand: 'Sony', description: 'High tech electronics', price: 2099, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { _id: 'elec13', name: 'Electronics Item 13', brand: 'Sony', description: 'High tech electronics', price: 2249, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1526406915894-7bc5cc8bc7b8?w=500&q=80' },
  { _id: 'elec14', name: 'Electronics Item 14', brand: 'Sony', description: 'High tech electronics', price: 2399, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80' },
  { _id: 'elec15', name: 'Electronics Item 15', brand: 'Sony', description: 'High tech electronics', price: 2549, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80' },

  // ── Home (15) ──────────────────────────────────────
  { _id: 'hm1', name: 'Home Item 1', brand: 'HomeCenter', description: 'Beautiful home decor', price: 449, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&q=80' },
  { _id: 'hm2', name: 'Home Item 2', brand: 'HomeCenter', description: 'Beautiful home decor', price: 599, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28ce8f31586?w=500&q=80' },
  { _id: 'hm3', name: 'Home Item 3', brand: 'HomeCenter', description: 'Beautiful home decor', price: 749, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&q=80' },
  { _id: 'hm4', name: 'Home Item 4', brand: 'HomeCenter', description: 'Beautiful home decor', price: 899, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=500&q=80' },
  { _id: 'hm5', name: 'Home Item 5', brand: 'HomeCenter', description: 'Beautiful home decor', price: 1049, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80' },
  { _id: 'hm6', name: 'Home Item 6', brand: 'HomeCenter', description: 'Beautiful home decor', price: 1199, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&q=80' },
  { _id: 'hm7', name: 'Home Item 7', brand: 'HomeCenter', description: 'Beautiful home decor', price: 1349, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28ce8f31586?w=500&q=80' },
  { _id: 'hm8', name: 'Home Item 8', brand: 'HomeCenter', description: 'Beautiful home decor', price: 1499, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&q=80' },
  { _id: 'hm9', name: 'Home Item 9', brand: 'HomeCenter', description: 'Beautiful home decor', price: 1649, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=500&q=80' },
  { _id: 'hm10', name: 'Home Item 10', brand: 'HomeCenter', description: 'Beautiful home decor', price: 1799, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80' },
  { _id: 'hm11', name: 'Home Item 11', brand: 'HomeCenter', description: 'Beautiful home decor', price: 1949, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&q=80' },
  { _id: 'hm12', name: 'Home Item 12', brand: 'HomeCenter', description: 'Beautiful home decor', price: 2099, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28ce8f31586?w=500&q=80' },
  { _id: 'hm13', name: 'Home Item 13', brand: 'HomeCenter', description: 'Beautiful home decor', price: 2249, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&q=80' },
  { _id: 'hm14', name: 'Home Item 14', brand: 'HomeCenter', description: 'Beautiful home decor', price: 2399, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=500&q=80' },
  { _id: 'hm15', name: 'Home Item 15', brand: 'HomeCenter', description: 'Beautiful home decor', price: 2549, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80' },

  // ── Appliances (15) ──────────────────────────────────────
  { _id: 'app1', name: 'Appliances Item 1', brand: 'LG', description: 'Essential home appliance', price: 449, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1626806819282-2c1dc0ed0f29?w=500&q=80' },
  { _id: 'app2', name: 'Appliances Item 2', brand: 'LG', description: 'Essential home appliance', price: 599, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&q=80' },
  { _id: 'app3', name: 'Appliances Item 3', brand: 'LG', description: 'Essential home appliance', price: 749, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&q=80' },
  { _id: 'app4', name: 'Appliances Item 4', brand: 'LG', description: 'Essential home appliance', price: 899, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&q=80' },
  { _id: 'app5', name: 'Appliances Item 5', brand: 'LG', description: 'Essential home appliance', price: 1049, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80' },
  { _id: 'app6', name: 'Appliances Item 6', brand: 'LG', description: 'Essential home appliance', price: 1199, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1626806819282-2c1dc0ed0f29?w=500&q=80' },
  { _id: 'app7', name: 'Appliances Item 7', brand: 'LG', description: 'Essential home appliance', price: 1349, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&q=80' },
  { _id: 'app8', name: 'Appliances Item 8', brand: 'LG', description: 'Essential home appliance', price: 1499, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&q=80' },
  { _id: 'app9', name: 'Appliances Item 9', brand: 'LG', description: 'Essential home appliance', price: 1649, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&q=80' },
  { _id: 'app10', name: 'Appliances Item 10', brand: 'LG', description: 'Essential home appliance', price: 1799, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80' },
  { _id: 'app11', name: 'Appliances Item 11', brand: 'LG', description: 'Essential home appliance', price: 1949, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1626806819282-2c1dc0ed0f29?w=500&q=80' },
  { _id: 'app12', name: 'Appliances Item 12', brand: 'LG', description: 'Essential home appliance', price: 2099, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&q=80' },
  { _id: 'app13', name: 'Appliances Item 13', brand: 'LG', description: 'Essential home appliance', price: 2249, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&q=80' },
  { _id: 'app14', name: 'Appliances Item 14', brand: 'LG', description: 'Essential home appliance', price: 2399, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&q=80' },
  { _id: 'app15', name: 'Appliances Item 15', brand: 'LG', description: 'Essential home appliance', price: 2549, category: 'Appliances', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80' },

  // ── Toys & Baby (15) ──────────────────────────────────────
  { _id: 'tb1', name: 'Toys & Baby Item 1', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 449, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80' },
  { _id: 'tb2', name: 'Toys & Baby Item 2', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 599, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80' },
  { _id: 'tb3', name: 'Toys & Baby Item 3', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 749, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1558021211-6d1403321394?w=500&q=80' },
  { _id: 'tb4', name: 'Toys & Baby Item 4', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 899, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&q=80' },
  { _id: 'tb5', name: 'Toys & Baby Item 5', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 1049, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&q=80' },
  { _id: 'tb6', name: 'Toys & Baby Item 6', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 1199, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80' },
  { _id: 'tb7', name: 'Toys & Baby Item 7', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 1349, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80' },
  { _id: 'tb8', name: 'Toys & Baby Item 8', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 1499, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1558021211-6d1403321394?w=500&q=80' },
  { _id: 'tb9', name: 'Toys & Baby Item 9', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 1649, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&q=80' },
  { _id: 'tb10', name: 'Toys & Baby Item 10', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 1799, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&q=80' },
  { _id: 'tb11', name: 'Toys & Baby Item 11', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 1949, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80' },
  { _id: 'tb12', name: 'Toys & Baby Item 12', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 2099, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&q=80' },
  { _id: 'tb13', name: 'Toys & Baby Item 13', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 2249, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1558021211-6d1403321394?w=500&q=80' },
  { _id: 'tb14', name: 'Toys & Baby Item 14', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 2399, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&q=80' },
  { _id: 'tb15', name: 'Toys & Baby Item 15', brand: 'FisherPrice', description: 'Fun toys and baby care', price: 2549, category: 'Toys & Baby', imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&q=80' },

  // ── Food & Health (15) ──────────────────────────────────────
  { _id: 'fh1', name: 'Food & Health Item 1', brand: 'Nestle', description: 'Healthy food and essentials', price: 449, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1498837167922-41c53bbf10f8?w=500&q=80' },
  { _id: 'fh2', name: 'Food & Health Item 2', brand: 'Nestle', description: 'Healthy food and essentials', price: 599, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=500&q=80' },
  { _id: 'fh3', name: 'Food & Health Item 3', brand: 'Nestle', description: 'Healthy food and essentials', price: 749, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' },
  { _id: 'fh4', name: 'Food & Health Item 4', brand: 'Nestle', description: 'Healthy food and essentials', price: 899, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80' },
  { _id: 'fh5', name: 'Food & Health Item 5', brand: 'Nestle', description: 'Healthy food and essentials', price: 1049, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80' },
  { _id: 'fh6', name: 'Food & Health Item 6', brand: 'Nestle', description: 'Healthy food and essentials', price: 1199, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1498837167922-41c53bbf10f8?w=500&q=80' },
  { _id: 'fh7', name: 'Food & Health Item 7', brand: 'Nestle', description: 'Healthy food and essentials', price: 1349, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=500&q=80' },
  { _id: 'fh8', name: 'Food & Health Item 8', brand: 'Nestle', description: 'Healthy food and essentials', price: 1499, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' },
  { _id: 'fh9', name: 'Food & Health Item 9', brand: 'Nestle', description: 'Healthy food and essentials', price: 1649, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80' },
  { _id: 'fh10', name: 'Food & Health Item 10', brand: 'Nestle', description: 'Healthy food and essentials', price: 1799, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80' },
  { _id: 'fh11', name: 'Food & Health Item 11', brand: 'Nestle', description: 'Healthy food and essentials', price: 1949, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1498837167922-41c53bbf10f8?w=500&q=80' },
  { _id: 'fh12', name: 'Food & Health Item 12', brand: 'Nestle', description: 'Healthy food and essentials', price: 2099, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=500&q=80' },
  { _id: 'fh13', name: 'Food & Health Item 13', brand: 'Nestle', description: 'Healthy food and essentials', price: 2249, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80' },
  { _id: 'fh14', name: 'Food & Health Item 14', brand: 'Nestle', description: 'Healthy food and essentials', price: 2399, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=80' },
  { _id: 'fh15', name: 'Food & Health Item 15', brand: 'Nestle', description: 'Healthy food and essentials', price: 2549, category: 'Food & Health', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80' },

  // ── Auto Accessories (15) ──────────────────────────────────────
  { _id: 'aa1', name: 'Auto Accessories Item 1', brand: 'AutoMate', description: 'Car and auto accessories', price: 449, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1600706432502-789efbd3e007?w=500&q=80' },
  { _id: 'aa2', name: 'Auto Accessories Item 2', brand: 'AutoMate', description: 'Car and auto accessories', price: 599, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&q=80' },
  { _id: 'aa3', name: 'Auto Accessories Item 3', brand: 'AutoMate', description: 'Car and auto accessories', price: 749, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&q=80' },
  { _id: 'aa4', name: 'Auto Accessories Item 4', brand: 'AutoMate', description: 'Car and auto accessories', price: 899, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1553440569-bfc53b12aa93?w=500&q=80' },
  { _id: 'aa5', name: 'Auto Accessories Item 5', brand: 'AutoMate', description: 'Car and auto accessories', price: 1049, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&q=80' },
  { _id: 'aa6', name: 'Auto Accessories Item 6', brand: 'AutoMate', description: 'Car and auto accessories', price: 1199, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1600706432502-789efbd3e007?w=500&q=80' },
  { _id: 'aa7', name: 'Auto Accessories Item 7', brand: 'AutoMate', description: 'Car and auto accessories', price: 1349, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&q=80' },
  { _id: 'aa8', name: 'Auto Accessories Item 8', brand: 'AutoMate', description: 'Car and auto accessories', price: 1499, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&q=80' },
  { _id: 'aa9', name: 'Auto Accessories Item 9', brand: 'AutoMate', description: 'Car and auto accessories', price: 1649, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1553440569-bfc53b12aa93?w=500&q=80' },
  { _id: 'aa10', name: 'Auto Accessories Item 10', brand: 'AutoMate', description: 'Car and auto accessories', price: 1799, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&q=80' },
  { _id: 'aa11', name: 'Auto Accessories Item 11', brand: 'AutoMate', description: 'Car and auto accessories', price: 1949, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1600706432502-789efbd3e007?w=500&q=80' },
  { _id: 'aa12', name: 'Auto Accessories Item 12', brand: 'AutoMate', description: 'Car and auto accessories', price: 2099, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&q=80' },
  { _id: 'aa13', name: 'Auto Accessories Item 13', brand: 'AutoMate', description: 'Car and auto accessories', price: 2249, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&q=80' },
  { _id: 'aa14', name: 'Auto Accessories Item 14', brand: 'AutoMate', description: 'Car and auto accessories', price: 2399, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1553440569-bfc53b12aa93?w=500&q=80' },
  { _id: 'aa15', name: 'Auto Accessories Item 15', brand: 'AutoMate', description: 'Car and auto accessories', price: 2549, category: 'Auto Accessories', imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&q=80' },

];

const CATEGORIES = ["All", "For You", "Fashion", "Mobiles", "Beauty", "Electronics", "Home", "Appliances", "Toys & Baby", "Food & Health", "Auto Accessories"];

const filterOptions = {
  'GENDER': ['Men', 'Women', 'Boys', 'Girls'],
  'BRAND': ['Nike', "Levi's", 'Sony', 'Samsung', 'Apple', 'Adidas', 'PUMA', 'H&M', 'Zara'],
  'COLOR': ['Black', 'Blue', 'White', 'Red', 'Green'],
  'FABRIC': ['Cotton', 'Polyester', 'Denim', 'Silk', 'Fleece'],
  'TYPE': ['Casual', 'Formal', 'Sports', 'Party', 'Ethnic'],
  'FIT': ['Regular', 'Slim', 'Loose', 'Oversized'],
  'PATTERN': ['Solid', 'Striped', 'Checked', 'Printed', 'Floral'],
  'OCCASION': ['Casual', 'Formal', 'Wedding', 'Sports', 'Party'],
  'SIZE': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  'COLLAR': ['Polo', 'Round Neck', 'V-Neck', 'Hooded'],
  'PRICE': ['Under ₹500', '₹500 – ₹2000', '₹2000 – ₹10,000', 'Over ₹10,000']
};

const BRAND_MAP = {
  "w1":"Zara","w2":"W","w3":"Levi's","w4":"Global Desi","w5":"H&M","w6":"Biba","w7":"Nike","w8":"Mango","w9":"Forever 21","w10":"Libas",
  "m1":"Peter England","m2":"Marks & Spencer","m3":"Levi's","m4":"PUMA","m5":"Nike","m6":"Adidas","m7":"Manyavar","m8":"Roadster","m9":"SNITCH","m10":"H&M",
};

const ProductList = ({ setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFilter, setExpandedFilter] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortOption, setSortOption] = useState('Popularity');
  const { addToCart } = useCart();
  // Add a rating property (1‑5 stars) to each mock product
  const PRODUCTS = MOCK_PRODUCTS.map(p => ({ ...p, rating: Math.floor(Math.random() * 5) + 1 }));

  const toggleFilter = (f) => setExpandedFilter(expandedFilter === f ? '' : f);

  let filtered = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  // Apply selected filters (e.g., SIZE)
  filtered = filtered.filter(p => {
    for (const filterName in selectedFilters) {
      if (!selectedFilters[filterName] || selectedFilters[filterName].size === 0) continue;
      const selectedSet = selectedFilters[filterName];
      if (filterName === 'SIZE') {
        const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];
        const prodSize = sizeOptions[parseInt(p._id.replace(/\D/g, '') || '0') % sizeOptions.length];
        if (!selectedSet.has(prodSize)) return false;
      } else {
        // For other filters, you can extend logic as needed. Currently they are not tied to product data.
        // Skip filtering for unknown attributes.
      }
    }
    return true;
  });

  let sortedProducts = [...filtered];
  if (sortOption === 'LowToHigh') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'HighToLow') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'Newest') {
    sortedProducts.sort((a, b) => {
      const ida = parseInt(a._id.replace(/\D/g, '') || '0');
      const idb = parseInt(b._id.replace(/\D/g, '') || '0');
      return idb - ida;
    });
  }

  const handleBuyNow = (product) => {
    addToCart(product);
    setCurrentPage('cart');
  };

  const discountPct = (id) => {
    const pcts = [10, 15, 20, 25, 30, 35, 40, 45, 50];
    const idx = parseInt(id.replace(/\D/g, '') || '0') % pcts.length;
    return pcts[idx];
  };

  const handleFilterChange = (filterName, option) => {
    setSelectedFilters(prev => {
      const newSet = new Set(prev[filterName] || []);
      if (newSet.has(option)) {
        newSet.delete(option);
      } else {
        newSet.add(option);
      }
      return { ...prev, [filterName]: newSet };
    });
  };

  return (
    <>
      <CategoryGrid onCategoryClick={setSelectedCategory} setCurrentPage={setCurrentPage} />
      <div className="main-layout" style={{ maxWidth: '1600px' }}>
        {/* Sidebar */}
      <aside className="filters-sidebar-fk">
        <div className="filter-header-fk">Filters & Sort</div>



        {/* Sort Options placed here instead of Categories */}
        <div className="filter-section-fk" style={{ marginBottom: '1.5rem' }}>
          <h5 style={{ fontSize: '0.9rem', color: '#878787', fontWeight: 600, letterSpacing: '0.5px' }}>SORT BY</h5>
          <ul style={{ listStyle: 'none', padding: 0, margin: '10px 0 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li
              className={sortOption === 'Popularity' ? 'active-filter' : ''}
              onClick={() => setSortOption('Popularity')}
              style={{ padding: '4px 0', cursor: 'pointer', color: sortOption === 'Popularity' ? '#2874f0' : '#212121', fontWeight: sortOption === 'Popularity' ? 600 : 400 }}
            >
              Popularity
            </li>
            <li
              className={sortOption === 'LowToHigh' ? 'active-filter' : ''}
              onClick={() => setSortOption('LowToHigh')}
              style={{ padding: '4px 0', cursor: 'pointer', color: sortOption === 'LowToHigh' ? '#2874f0' : '#212121', fontWeight: sortOption === 'LowToHigh' ? 600 : 400 }}
            >
              Price — Low to High
            </li>
            <li
              className={sortOption === 'HighToLow' ? 'active-filter' : ''}
              onClick={() => setSortOption('HighToLow')}
              style={{ padding: '4px 0', cursor: 'pointer', color: sortOption === 'HighToLow' ? '#2874f0' : '#212121', fontWeight: sortOption === 'HighToLow' ? 600 : 400 }}
            >
              Price — High to Low
            </li>
            <li
              className={sortOption === 'Newest' ? 'active-filter' : ''}
              onClick={() => setSortOption('Newest')}
              style={{ padding: '4px 0', cursor: 'pointer', color: sortOption === 'Newest' ? '#2874f0' : '#212121', fontWeight: sortOption === 'Newest' ? 600 : 400 }}
            >
              Newest First
            </li>
          </ul>
        </div>

        {/* Accordion filters */}
        {Object.keys(filterOptions).map(acc => (
          <div key={acc} className="filter-accordion-container">
            <div className="filter-accordion" onClick={() => toggleFilter(acc)}>
              <span>{acc}</span>
              <span className="chevron">{expandedFilter === acc ? '▲' : '▼'}</span>
            </div>
            {expandedFilter === acc && (
              <div className="filter-options-content" style={{ padding: '0 15px 15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filterOptions[acc].map(opt => (
                  <label key={opt} style={{ fontSize: '0.9rem', color: '#212121', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedFilters[acc] ? selectedFilters[acc].has(opt) : false}
                      onChange={() => handleFilterChange(acc, opt)}
                    /> {opt}
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </aside>

      {/* Product Grid */}
      <section className="product-grid-container-fk">
        <div className="grid-header-fk" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '16px' }}>
          <div className="breadcrumbs" style={{ width: '100%' }}>
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
            <span style={{color: '#878787', fontSize: '0.9rem', marginLeft: '8px'}}> 
              (Showing 1 – {filtered.length} of {filtered.length} products)
            </span>
          </div>
        </div>

        <div className="product-grid-fk">
          {sortedProducts.map(product => {
            const disc = discountPct(product._id);
            const origPrice = Math.round(product.price / (1 - disc / 100));

            return (
              <div key={product._id} className="product-card-fk">
                <div className="heart-icon-fk">♥</div>
                <div className="product-img-wrapper-fk">
                  <img src={product.imageUrl} alt={product.name} />
                </div>

                <div className="product-info-fk">
                  <div className="brand-fk">{product.brand}</div>
                  <div className="title-fk" title={product.name}>{product.name}</div>

                  <div className="price-row-fk">
                    <span className="current-price-fk">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="original-price-fk">₹{origPrice.toLocaleString('en-IN')}</span>
                    <span className="discount-fk">{disc}% off</span>
                  </div>

                  <div className="deal-row-fk">
                    {disc >= 40
                      ? <span className="hot-deal-fk">🔥 Hot Deal</span>
                      : <span className="buy-2-fk">Buy 2, save extra 5%</span>}
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#878787', marginTop: '4px' }}>{product.description}</div>
                  <div className="rating-fk" style={{ marginTop: '4px' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: i < product.rating ? '#ffb400' : '#ccc' }}>★</span>
                    ))}
                  </div>
                </div>

                <div className="bottom-actions-fk">
                  <button
                    className="btn-cart-fk"
                    onClick={() => { addToCart(product); alert('Item added to cart! 🛒'); }}
                  >
                    Add to Cart
                  </button>
                  <button className="btn-buy-fk" onClick={() => handleBuyNow(product)}>
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <div style={{ padding: '2rem' }}>No products found.</div>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
          <button
            style={{ padding: '10px 40px', background: '#fff', border: '1px solid #c2c2c2', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => setCurrentPage('home')}
          >
            ← Back to Home
          </button>
        </div>
      </section>
    </div>
    </>
  );
};

export default ProductList;
