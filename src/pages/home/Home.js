import React, {useEffect} from 'react';
import Features from './../../components/features/Feature'
import Chart from './../../components/Chart/Chart'
import WidgetSm from './../../components/widgetSm/widgetSm'
import WidgetLg from './../../components/WidgetLg/WidgetLg'
import './Home.css'

export default function Home() {
  useEffect(() => {
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        )
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        )
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    })
  }, [])
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


