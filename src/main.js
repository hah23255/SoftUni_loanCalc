import {createLoanForm} from './components/form.js';
import {createResultsView,renderResults} from './components/results.js';
import {calculateLoan} from './services/calculator.js';

const app=document.getElementById('app');
const hero=createEl('header',{className:'hero'},[
  createEl('h1',{},['Кредитен Калкулатор']),
  createEl('p',{},['Изчислете вашия идеален кредитен план бързо и лесно.'])
]);
app.appendChild(hero);

const layout=document.createElement('div');
layout.className='layout';
app.appendChild(layout);

const resultsView=createResultsView();

const onFormChange=data=>{
  const result=calculateLoan(data);
  renderResults(resultsView,result,data);
};

const formView=createLoanForm(onFormChange);
layout.appendChild(formView);
layout.appendChild(resultsView);

function createEl(tag,attrs={},children=[]){const el=document.createElement(tag);Object.entries(attrs).forEach(([k,v])=>{if(v===undefined||v===null)return;if(k.startsWith("on")&&typeof v==="function"){el.addEventListener(k.slice(2).toLowerCase(),v);}else if(k==="className"){el.className=v;}else{el.setAttribute(k,v);}});[].concat(children).forEach(c=>{if(c===undefined||c===null)return;el.appendChild(typeof c==='string'?document.createTextNode(c):c);});return el;}
