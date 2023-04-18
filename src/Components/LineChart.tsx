import React ,{useEffect, useState,useLayoutEffect} from 'react';
import ReactECharts from 'echarts-for-react';
import { wineData } from './../WineData';


const LineChart: React.FC = () => {

  // responsive spacing for mobile devices
  const [rightSpacing, setRightSpacing] = useState("10%");
  // Listen and update state on resize
  useLayoutEffect(() => {
    const mobileScreens = window.matchMedia('(max-width: 640px)');
    const largeScreens = window.matchMedia('(min-width: 1024px)');
    function updateSize() {
      if (mobileScreens.matches) {
        setRightSpacing("30%");
      }else if (largeScreens.matches) {
        setRightSpacing("10%");
      }
    }
    window.addEventListener('resize',updateSize);
   
    return () => window.removeEventListener('resize',updateSize);
  }, []);

  const option = {
    xAxis: { type: 'category', name: 'Flavanoids' },
    yAxis: { type: 'value', name: 'Ash' },
    series: [
      {
        type: 'line',
        data: wineData.map(data => data.Ash),
      },
    ],
    tooltip: {
      trigger:'item'
    },
    grid:{
      left: '10%',
      right: rightSpacing,
    }
  };


  return <ReactECharts option={option} style={{height:"100%",width:"100%"}}/>;
};

export default LineChart;