import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormsModule,NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { WeatherService } from "../weather.service";
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Highcharts=Highcharts;
  ChartConstructor='chart';
  chartOptions={
    chart:{type:'column'},
    title:{text:"Weather Data"},
    xAxis: {
      title:{text:'Time Period'},
      categories: []
  },
  yAxis: {
      title: {
          text: ''
      }
  },
  series: [{
      name: '',
      data: []
  }],
  lang: {
    noData: "Please Fill above form To See Chart"
},
noData: {
    style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#303030'
    }
}

  };
  
  chartCallback= function(chart){};
  updateFlag=false;
  oneToOneFlag=true;
  runOutsiderAngular=false;
  
 
  title = 'weatherapp';
  weatherForm:FormGroup;
  country:string="";
  metric:string="";
  startDate:Date=null;
  endDate:Date=null;
  public countryData;
  public metricData;
  public filterData:any;
  public startD;
  public endD;
  public monthInString:string;
  public chartData=new Array();
  public seriesData=new Array();
  public chartmetricData=new Array();
  metrics=[
    {value:"Tmin",name:"min Temprature"},
    {value:"Tmax",name:"max Temprature"},
    {value:"Rainfall",name:"Rainfall (mm)"}
  ];

  countryList=["England","Scotland","UK","Wales"];


  constructor(private fb:FormBuilder,private httpClient:HttpClient,private weatherService:WeatherService){
    this.weatherForm=fb.group({
      'country': [null,Validators.required],
      'metric' : [null,Validators.required],
      'startDate' : [null,Validators.required],
      'endDate' : [null,Validators.required]
    })

  }
  onFormSubmit(form:NgForm)  
  {  
    this.startD= new Date (this.weatherForm.get("startDate").value); 
    this.endD= new Date(this.weatherForm.get('endDate').value);
    this.countryData= this.weatherForm.get('country').value;
    this.metricData=this.weatherForm.get('metric').value;
    this.weatherService.getData(this.metricData,this.countryData).subscribe((res)=>{
      this.filterData=res;
     this.chartdata();
  });
    
}
convertMonthtoString(data){
  switch(data.month){
    case (1): this.monthInString="Jan";
              break;
    case (2): this.monthInString="Feb";
              break;
    case (3): this.monthInString="Mar";
              break;
    case (4): this.monthInString="Apr";
              break;                        
    case (5): this.monthInString="May";
              break;
    case (6): this.monthInString="Jun";
              break;   
    case (7): this.monthInString="Jul";
              break;  
    case (8): this.monthInString="Aug";
              break;  
    case (9): this.monthInString="Sep";
              break;  
    case (10): this.monthInString="Oct";
              break;  
    case (11): this.monthInString="Nov";
              break;  
    case 12: this.monthInString="Dec";
              break;  
  }
  this.seriesData.push(data.value);
  this.chartmetricData.push(data.year+"-"+this.monthInString);            

}
chartdata(){
  while(this.chartOptions.series[0].data.length>0){
    this.chartOptions.series[0].data.pop();
    this.chartOptions.xAxis.categories.pop();
  }
    this.updateFlag=true;
      let count=0;let chartd={};
      for(let item=0; item<this.filterData.length;item++)
      {
        if(this.filterData[item].year>=this.startD.getFullYear() && this.filterData[item].year<=this.endD.getFullYear())
        {
          if(this.endD.getFullYear()==this.startD.getFullYear())
          {
              if(this.filterData[item].month>=this.startD.getMonth()+1 &&this.filterData[item].month<=this.endD.getMonth()+1)
                 this.convertMonthtoString(this.filterData[item]);
          }
          else
          {
            if(this.filterData[item].year==this.startD.getFullYear())
            {
              if(this.startD.getMonth()+1<=this.filterData[item].month)
                this.convertMonthtoString(this.filterData[item]);             
            }
            else if(this.filterData[item].year==this.endD.getFullYear())
            {
              if(this.endD.getMonth()+1>=this.filterData[item].month)
                this.convertMonthtoString(this.filterData[item]);              
            }else
              this.convertMonthtoString(this.filterData[item]);             

          }
            
        }
      }
      this.chartOptions.series[0].name=this.weatherForm.get('country').value;
      this.chartOptions.yAxis.title.text=this.weatherForm.get('metric').value;
      this.chartOptions.series[0].data=this.seriesData;
      this.chartOptions.xAxis.categories=this.chartmetricData;
      this.updateFlag=true;
      }
  }
