import React from 'react';
import Features from './../../components/features/Feature'
import Chart from './../../components/Chart/Chart'
import WidgetSm from './../../components/widgetSm/widgetSm'
import WidgetLg from './../../components/WidgetLg/WidgetLg'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <Features />
      <Chart grid title="Annual sale"  dataKey="Sale" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
        
      </div>
    </div>
  )
}
