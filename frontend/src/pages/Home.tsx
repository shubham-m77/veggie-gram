import React from 'react'
import HomeBanner from '../components/HomeBanner'
import Categories from '../components/Categories'
import Bestseller from '../components/Bestseller'
import FeatureBanner from '../components/FeatureBanner'
import NewsLetter from '../components/NewsLetter'

const Home = () => {
  return (
    <div>
    <HomeBanner/>
    <Categories/>
    <Bestseller/>
    <FeatureBanner/>
    <NewsLetter/>
    </div>
  )
}

export default Home
