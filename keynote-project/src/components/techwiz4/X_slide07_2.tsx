import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet, useNavigate } from "react-router-dom"
import styles from './x_style.module.scss' 
import { useSelector, useDispatch} from 'react-redux';
import collectionAPI from '../../API/collectionAPI';

// apex chart
import ReactApexChart from 'react-apexcharts';

// mui
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

function X_slide07_2() {


   const [chartBarData, setChartBarData] = useState<any>({
      series: [{
         data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
         }],
         options: {
         chart: {
            type: 'bar',
            height: 380
         },
         plotOptions: {
            bar: {
               barHeight: '100%',
               distributed: true,
               horizontal: true,
               dataLabels: {
               position: 'bottom'
               },
            }
         },
         colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
            '#f48024', '#69d2e7'
         ],
         dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
               colors: ['#fff']
            },
            formatter: function (val:any, opt:any) {
               return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
            },
            offsetX: 0,
            dropShadow: {
               enabled: true
            }
         },
         stroke: {
            width: 1,
            colors: ['#fff']
         },
         xaxis: {
            categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
               'United States', 'China', 'India'
            ],
         },
         yaxis: {
            labels: {
               show: false
            }
         },
         title: {
               text: 'Custom DataLabels',
               align: 'center',
               floating: true
         },
         subtitle: {
               text: 'Category Names as DataLabels inside bars',
               align: 'center',
         },
         tooltip: {
            theme: 'dark',
            x: {
               show: false
            },
            y: {
               title: {
               formatter: function () {
                  return ''
               }
               }
            }
         }
      },
   });
   const [chartBarDataTag, setChartBarDataTag] = useState<any>({
      series: [{
         data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
         }],
         options: {
         chart: {
            type: 'bar',
            height: 380
         },
         plotOptions: {
            bar: {
               barHeight: '100%',
               distributed: true,
               horizontal: true,
               dataLabels: {
               position: 'bottom'
               },
            }
         },
         colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
            '#f48024', '#69d2e7'
         ],
         dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
               colors: ['#fff']
            },
            formatter: function (val:any, opt:any) {
               return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
            },
            offsetX: 0,
            dropShadow: {
               enabled: true
            }
         },
         stroke: {
            width: 1,
            colors: ['#fff']
         },
         xaxis: {
            categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
               'United States', 'China', 'India'
            ],
         },
         yaxis: {
            labels: {
               show: false
            }
         },
         title: {
               text: 'Custom DataLabels',
               align: 'center',
               floating: true
         },
         subtitle: {
               text: 'Category Names as DataLabels inside bars',
               align: 'center',
         },
         tooltip: {
            theme: 'dark',
            x: {
               show: false
            },
            y: {
               title: {
               formatter: function () {
                  return ''
               }
               }
            }
         }
      },
   });


   const [stateObjSearchMonitor, setStateObjSearchMonitor] = useState<stateObj>({})
   const [stateArrKey, setStateArrKey] = useState<any[]>([]);
   const [stateArrValue, setStateArrValue] = useState<any[]>([]);
   function countSearches(searchArray:any) {
         let searchCounts:any = {};
         let tagCounts:any = {};

         // Loop through the array of objects
         for (let obj of searchArray) {
            const searchValue = obj.search;
            const tagValue = obj.tag;
         
            // Check if the searchValue already exists as a property in the searchCounts object
            if (searchCounts[searchValue]) {
               searchCounts[searchValue]++;
            } else {
               searchCounts[searchValue] = 1;
            }
   
            if (tagCounts[tagValue]) {
               tagCounts[tagValue]++;
            } else {
               tagCounts[tagValue] = 1;
            }
         }
         // searchCounts
            console.log('searchCounts: ', searchCounts);
         // setStateObjSearchMonitor(searchCounts);
         // Convert object to array of key-value pairs
         const sortedArray = Object.entries(searchCounts).sort((a:any, b:any) => b[1] - a[1]);
         // Convert the sorted array back to an object
         const sortedObject = Object.fromEntries(sortedArray);
         
         const sortedArrayTag = Object.entries(tagCounts).sort((a:any, b:any) => b[1] - a[1]);
         // Convert the sorted array back to an object
         const sortedObjectTag = Object.fromEntries(sortedArrayTag);

         //question
         const keysArray = Object.keys(sortedObject); // lấy toàn bộ key của object và bỏ vào mảng keysArray
         setStateArrKey(keysArray);
         const valuesArray = Object.values(sortedObject); // lấy toàn bộ value của object và bỏ vào mảng valuesArray
         setStateArrValue(valuesArray);
         setChartBarData(
            {
               series: [{
                  data: valuesArray
                  }],
                  options: {
                  chart: {
                     type: 'bar',
                     height: 380
                  },
                  plotOptions: {
                     bar: {
                        barHeight: '100%',
                        distributed: true,
                        horizontal: true,
                        dataLabels: {
                        position: 'bottom'
                        },
                     }
                  },
                  colors: ['#0d6efd', 'rgb(87, 185, 63)', '#edbe87', 'rgb(246, 28, 77)', '#ffc107', '#2b908f', '#f9a3a4', '#90ee7e',
                     '#f48024', '#69d2e7'
                  ],
                  dataLabels: {
                     enabled: true,
                     textAnchor: 'start',
                     style: {
                        colors: ['#000000']
                     },
                     formatter: function (val:any, opt:any) {
                        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                     },
                     offsetX: 0,
                     dropShadow: {
                        enabled: false
                     }
                  },
                  stroke: {
                     width: 1,
                     colors: ['#fff']
                  },
                  xaxis: {
                     categories: keysArray,
                  },
                  yaxis: {
                     labels: {
                        show: false
                     }
                  },
                  title: {
                        text: 'Custom DataLabels',
                        align: 'center',
                        floating: true
                  },
                  subtitle: {
                        text: 'Category Names as DataLabels inside bars',
                        align: 'center',
                  },
                  tooltip: {
                     theme: 'dark',
                     x: {
                        show: false
                     },
                     y: {
                        title: {
                        formatter: function () {
                           return ''
                        }
                        }
                     }
                  }
               },
            }
         )
         
         // tag
         const keysArrayTag = Object.keys(sortedObjectTag); // lấy toàn bộ key của object và bỏ vào mảng keysArray
         setStateArrKey(keysArray);
         const valuesArrayTag = Object.values(sortedObjectTag); // lấy toàn bộ value của object và bỏ vào mảng valuesArray
         setStateArrValue(valuesArrayTag);
         // setChartBarDataTag(
         //    {
         //       series: [{
         //             data: valuesArrayTag
         //       }],
         //       options: {
         //       chart: {
         //             type: 'bar',
         //             height: 550
         //       },
         //       plotOptions: {
         //             bar: {
         //             borderRadius: 4,
         //             borderRadiusApplication: 'end',
         //             horizontal: true,
         //             }
         //       },
         //       dataLabels: {
         //             enabled: true
         //       },
         //       xaxis: {
         //             categories: keysArrayTag
         //       }
         //       },
         //    }
         // )
         setChartBarDataTag(
            {
               series: [{
                  data: valuesArrayTag
                  }],
                  options: {
                  chart: {
                     type: 'bar',
                     height: 380
                  },
                  plotOptions: {
                     bar: {
                        barHeight: '100%',
                        distributed: true,
                        horizontal: true,
                        dataLabels: {
                        position: 'bottom'
                        },
                     }
                  },
                  colors: ['#0d6efd', 'rgb(87, 185, 63)', '#edbe87', 'rgb(246, 28, 77)', '#ffc107', '#2b908f', '#f9a3a4', '#90ee7e',
                     '#f48024', '#69d2e7'
                  ],
                  dataLabels: {
                     enabled: true,
                     textAnchor: 'start',
                     style: {
                        colors: ['#000000']
                     },
                     formatter: function (val:any, opt:any) {
                        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                     },
                     offsetX: 0,
                     dropShadow: {
                        enabled: false
                     }
                  },
                  stroke: {
                     width: 1,
                     colors: ['#fff']
                  },
                  xaxis: {
                     categories: keysArrayTag,
                  },
                  yaxis: {
                     labels: {
                        show: false
                     }
                  },
                  title: {
                        text: 'Custom DataLabels',
                        align: 'center',
                        floating: true
                  },
                  subtitle: {
                        text: 'Category Names as DataLabels inside bars',
                        align: 'center',
                  },
                  tooltip: {
                     theme: 'dark',
                     x: {
                        show: false
                     },
                     y: {
                        title: {
                        formatter: function () {
                           return ''
                        }
                        }
                     }
                  }
               },
            }
         )
   }


   type stateObj = {
         [key: string]: any;
   };
         // đặt trong hàm

   const getData = async () => {
         try {
            const response: any = await collectionAPI.findallsearchmonitor(); //phải có await nghĩa là khi nào có data rồi thì mới lấy
            countSearches(response.data);
         }catch(err){
            console.log('err:', err);
         }
   }

   const [stateView, setStateView] = React.useState('question');
   const handleChangeView = (event: React.MouseEvent<HTMLElement>, kindOfView: string) => {
      // kindOfView nó sẽ lấy giá trị value="module" value="list" value="quilt" từ ToggleButton nào đc click vào
         if(kindOfView != ""){
            setStateView(kindOfView);
         }
   };
   useEffect(() => {
         getData();
   },[]);

   return (
         <div className={clsx(styles.component_X_slide07_2)}>
            <div className={clsx(styles.main)}>
                     
               <div className={clsx(styles.headerWrapper)}>
                     <div className={clsx(styles.miniMenu)}>
                        <ToggleButtonGroup
                        orientation="horizontal"
                        value={stateView}
                        exclusive
                        // border: 1px solid blue;
                        size="small"
                        onChange={handleChangeView}
                        className={clsx(styles.left)}
                        >
                           <ToggleButton value="question" aria-label="question">
                           {/* <ViewModuleIcon /> */}
                           <span className={clsx(styles.kind)}>question</span>
                           </ToggleButton>
                           <ToggleButton value="tag" aria-label="tag">
                           <span className={clsx(styles.kind)}>tag</span>
                           </ToggleButton>
                        </ToggleButtonGroup>
                     </div>
               </div>
               <div className={clsx(styles.container)} >
               {(() => {
                        if (stateView === "question") {
                           return (
                                 <>
                                    <div className={clsx(styles.viewDashboard)}>
                                       <div id="chartBar" className={clsx(styles.chartBar)}>
                                             <ReactApexChart options={chartBarData.options} series={chartBarData.series} type="bar" height={2000} />
                                       </div>
                                       <div className={clsx(styles.row1)}>
                                 
                                       </div>
                                       <div className={clsx(styles.row2)}>
                                       
                                       </div>
                        
                                       
                                    </div>
                                 </>
                           )
                        }
                        else if (stateView === "tag") {
                           return (
                                 <>
                                    <div className={clsx(styles.viewDashboard)}>
                                       <div id="chartBar" className={clsx(styles.chartBar)}>
                                             <ReactApexChart options={chartBarDataTag.options} series={chartBarDataTag.series} type="bar" height={2000} />
                                       </div>
                                       <div className={clsx(styles.row1)}>
                                 
                                       </div>
                                       <div className={clsx(styles.row2)}>
                                       
                                       </div>
                        
                                       
                                    </div>
                                 </>
                           )
                        }
                        
                     })()}
               </div>
            </div>
            {/* <button onClick={getData}>getData</button> */}
         </div>
   )
}
export default X_slide07_2