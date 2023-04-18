import React, { useEffect ,useState,useLayoutEffect} from 'react';
import ReactECharts from 'echarts-for-react';
import { wineData } from '../WineData';

const BarChart: React.FC = () => {
const [alchohol, setAlchohol] = useState<any[]>([]);
const [magnesium, setMagnesium] = useState<any[]>([]);
// responsive spacing for mobile devices
const [rightSpacing, setRightSpacing] = useState("10%");

  useEffect(()=>{
    let barData = new Map();
    // generate array of unique alchohol values from wineData and lowest magnesium data.
    wineData.forEach((data) => {

      let isUniqueValue = barData.has(data.Alcohol);
      if (isUniqueValue) {
        let oldMagensium = barData.get(data.Alcohol);
        if(oldMagensium > data.Magnesium) {
          barData.set(data.Alcohol, data.Magnesium);
        }
      }else {
        barData.set(data.Alcohol, data.Magnesium);
      }
    });
    
    // Setting map values to state
      setAlchohol(Array.from(barData.keys()));
      setMagnesium(Array.from(barData.values()));
    
  },[]);
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
    xAxis: { type: 'category', data:alchohol, name: 'Alcohol' },
    yAxis: { type: 'value', name: 'Magnesium' },
    series: [
      {
        type: 'bar',
        data: magnesium,
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

  return <ReactECharts option={option} style={{height:"100%",width:"100%"}} />;
};

export default BarChart;
