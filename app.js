const cars = [
  {name:'比亚迪 海鸥',energy:'ev',body:'sedan',price:[7,9],seats:5,length:3780,range:305,clearance:3,cargo:2,elder:4,child:3,values:{safety:3,comfort:3,economy:5,driving:3,smart:3,design:4},features:['camera360','phone'],tags:['小巧好停','城市通勤','低成本'],strength:'紧凑灵活、日常能耗低，适合城市短途与窄车位。',caution:'高速与后排空间不是强项；没有稳定补能条件时需谨慎。'},
  {name:'吉利 星愿',energy:'ev',body:'sedan',price:[7,10],seats:5,length:4135,range:410,clearance:3,cargo:3,elder:4,child:3,values:{safety:3,comfort:4,economy:5,driving:3,smart:4,design:4},features:['camera360','phone'],tags:['城市纯电','空间高效','易停车'],strength:'小车身里有较高空间利用率，城市代步舒适、补能成本低。',caution:'远途便利性依赖充电网络，高速频繁出行应先规划补能。'},
  {name:'大众 朗逸',energy:'fuel',body:'sedan',price:[9,14],seats:5,length:4678,range:700,clearance:3,cargo:3,elder:4,child:3,values:{safety:3,comfort:3,economy:4,driving:3,smart:2,design:3},features:['phone'],tags:['成熟可靠','补能便利','家用均衡'],strength:'使用门槛低、售后覆盖广，日常通勤与长途都容易适应。',caution:'智能化和动力体验偏传统，选购时需核对具体安全配置。'},
  {name:'比亚迪 秦L DM-i',energy:'phev',body:'sedan',price:[10,15],seats:5,length:4830,range:2000,clearance:3,cargo:3,elder:4,child:4,values:{safety:4,comfort:4,economy:5,driving:3,smart:4,design:4},features:['l2','camera360','phone','ventilation'],tags:['低能耗','长续航','家用轿车'],strength:'通勤可用电、远途可加油，兼顾空间与较低使用成本。',caution:'车身不算小，窄车位需试停；配置差异要按具体版本核对。'},
  {name:'丰田 凯美瑞双擎',energy:'hev',body:'sedan',price:[18,26],seats:5,length:4915,range:900,clearance:3,cargo:3,elder:4,child:4,values:{safety:4,comfort:4,economy:4,driving:3,smart:3,design:4},features:['l2','phone'],tags:['无需充电','省油平顺','长期持有'],strength:'不依赖充电条件，城市与长途的能耗和稳定性比较均衡。',caution:'车身较长，智能座舱和配置丰富度应结合版本判断。'},
  {name:'小米 SU7',energy:'ev',body:'sedan',price:[22,36],seats:5,length:4997,range:700,clearance:2,cargo:3,elder:3,child:4,values:{safety:4,comfort:4,economy:4,driving:5,smart:5,design:5},features:['l2','camera360','phone','ventilation'],tags:['驾驶乐趣','智能座舱','设计感'],strength:'动力、操控与智能生态突出，适合重视驾驶和科技体验的人。',caution:'车身长且坐姿低，长辈上下车、后排头部与窄车位要实测。'},
  {name:'特斯拉 Model 3',energy:'ev',body:'sedan',price:[24,34],seats:5,length:4720,range:600,clearance:2,cargo:3,elder:3,child:4,values:{safety:5,comfort:4,economy:4,driving:5,smart:5,design:4},features:['l2','camera360','phone','ventilation'],tags:['高效纯电','驾驶感','软件体验'],strength:'能效、操控和软件体验突出，适合有稳定补能条件的通勤者。',caution:'交互方式、后排体验与服务便利性有鲜明取舍，务必亲自试驾。'},
  {name:'比亚迪 宋PLUS DM-i',energy:'phev',body:'suv',price:[13,18],seats:5,length:4775,range:1200,clearance:4,cargo:4,elder:4,child:4,values:{safety:4,comfort:4,economy:5,driving:3,smart:4,design:4},features:['l2','camera360','phone','ventilation'],tags:['家用SUV','低能耗','装载实用'],strength:'后排与后备箱实用，城市用电、长途用油的适应面较广。',caution:'驾驶个性不是重点；需比较各版本纯电续航与配置差异。'},
  {name:'零跑 C10 增程',energy:'erev',body:'suv',price:[13,17],seats:5,length:4739,range:1100,clearance:4,cargo:4,elder:4,child:4,values:{safety:4,comfort:4,economy:4,driving:3,smart:4,design:4},features:['l2','camera360','phone','ventilation'],tags:['舒适空间','增程SUV','配置丰富'],strength:'较低门槛提供宽敞座舱与电感体验，家庭使用覆盖面广。',caution:'无家充时增程优势会变小，长期持有还应考察售后覆盖。'},
  {name:'小鹏 G6',energy:'ev',body:'suv',price:[18,25],seats:5,length:4753,range:625,clearance:4,cargo:4,elder:4,child:4,values:{safety:4,comfort:4,economy:4,driving:4,smart:5,design:4},features:['l2','camera360','phone','ventilation'],tags:['智能辅助','快速补能','纯电SUV'],strength:'辅助驾驶与补能效率突出，兼顾家庭空间和日常驾驶。',caution:'频繁长途前应核对常跑路线的快充覆盖，体验车机学习成本。'},
  {name:'特斯拉 Model Y',energy:'ev',body:'suv',price:[25,36],seats:5,length:4797,range:600,clearance:4,cargo:5,elder:4,child:5,values:{safety:5,comfort:4,economy:4,driving:5,smart:5,design:4},features:['l2','camera360','phone','ventilation'],tags:['安全','大装载','高效纯电'],strength:'安全、能效、驾驶与装载能力综合突出，家庭场景覆盖广。',caution:'座舱交互和底盘感受较有个性，配置与服务模式需先适应。'},
  {name:'本田 CR-V',energy:'fuel',body:'suv',price:[17,25],seats:5,length:4703,range:650,clearance:4,cargo:5,elder:5,child:4,values:{safety:4,comfort:4,economy:3,driving:3,smart:3,design:3},features:['l2','phone'],tags:['空间实用','补能无忧','成熟家用'],strength:'乘坐、上下车和后备箱都很实用，补能条件几乎不构成限制。',caution:'城市能耗与智能化不占优势，实际成交和配置需逐版本确认。'},
  {name:'理想 L6',energy:'erev',body:'suv',price:[25,29],seats:5,length:4925,range:1300,clearance:4,cargo:5,elder:5,child:5,values:{safety:5,comfort:5,economy:3,driving:4,smart:5,design:4},features:['l2','camera360','phone','ventilation','awd'],tags:['家庭舒适','智能座舱','长途从容'],strength:'家庭乘坐、智能体验和远途便利性突出，适合多人高频用车。',caution:'尺寸和重量较大，窄车位与市区能耗需要接受；预算也更高。'},
  {name:'问界 M7 增程',energy:'erev',body:'suv',price:[25,33],seats:6,length:5020,range:1200,clearance:4,cargo:4,elder:5,child:5,values:{safety:5,comfort:5,economy:3,driving:3,smart:5,design:4},features:['l2','camera360','phone','ventilation','awd'],tags:['六座可选','智能辅助','家庭长途'],strength:'乘员照顾、智能化和长途补能便利适合多成员家庭。',caution:'车身较大；六座状态下后备箱与第三排是否够用必须实测。'},
  {name:'坦克 300',energy:'fuel',body:'suv',price:[20,30],seats:5,length:4760,range:600,clearance:5,cargo:4,elder:2,child:4,values:{safety:4,comfort:3,economy:2,driving:4,smart:3,design:5},features:['camera360','phone','ventilation','awd'],tags:['硬派四驱','通过性','个性设计'],strength:'非铺装路、通过性与硬派风格鲜明，能覆盖更多户外场景。',caution:'城市油耗、停车和长辈上下车不占优势，不宜只为偶尔户外购买。'},
  {name:'传祺 M8',energy:'fuel',body:'mpv',price:[18,32],seats:7,length:5212,range:650,clearance:3,cargo:4,elder:5,child:5,values:{safety:4,comfort:5,economy:2,driving:2,smart:3,design:4},features:['l2','camera360','phone','ventilation'],tags:['七座','二排舒适','多人出行'],strength:'二排照顾和多人长途舒适性突出，适合高频满载家庭。',caution:'体型大、城市能耗与停车压力明显，低频六人出行可先考虑租车。'},
  {name:'比亚迪 夏 DM-i',energy:'phev',body:'mpv',price:[25,32],seats:7,length:5145,range:1000,clearance:3,cargo:4,elder:5,child:5,values:{safety:5,comfort:5,economy:4,driving:3,smart:4,design:4},features:['l2','camera360','phone','ventilation'],tags:['七座混动','家庭舒适','低能耗'],strength:'兼顾多人空间、二排舒适和市区低能耗，适合高频全家出行。',caution:'车身尺寸对窄车位不友好，七人满载时要实测行李空间。'}
];

const energyNames={fuel:'燃油',hev:'油电混动',phev:'插电混动',erev:'增程',ev:'纯电'};
const bodyNames={sedan:'轿车 / 两厢',suv:'SUV',mpv:'MPV'};
const plateHints={other:'多数城市新能源车上牌更便利，最终以当地最新政策为准。',beijing:'北京燃油指标通常需摇号；新能源政策与排队规则请核对最新官方信息。',shanghai:'上海燃油牌照通常涉及拍卖；新能源专用牌照资格需核对个人条件。',guangzhou:'广州燃油指标涉及摇号或竞价；新能源政策请核对最新官方信息。',shenzhen:'深圳燃油指标涉及摇号或竞价；新能源政策请核对最新官方信息。',hangzhou:'杭州燃油指标涉及摇号或竞价；新能源政策请核对最新官方信息。',tianjin:'天津燃油指标涉及摇号或竞价，部分能源形式限行规则不同。',hainan:'海南燃油车指标政策较特殊，并有逐步限制新增燃油车的政策方向。'};

const intro=document.querySelector('#intro'),matcher=document.querySelector('#matcher'),results=document.querySelector('#results'),catalog=document.querySelector('#catalog');
const form=document.querySelector('#matchForm'),steps=[...document.querySelectorAll('.form-step')],stepItems=[...document.querySelectorAll('#stepList li')];
let currentStep=0;

document.querySelector('#startBtn').addEventListener('click',()=>{intro.classList.add('hidden');matcher.classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'});});
document.querySelector('#budget').addEventListener('input',updateBudget);
document.querySelector('#city').addEventListener('change',e=>document.querySelector('#plateHint').textContent=plateHints[e.target.value]);
document.querySelectorAll('.priority-list input').forEach(input=>input.addEventListener('input',()=>input.nextElementSibling.value=input.value));
document.querySelectorAll('.choice-card input').forEach(input=>input.addEventListener('change',syncChoiceCards));
document.querySelector('#prevBtn').addEventListener('click',()=>showStep(currentStep-1));
document.querySelector('#nextBtn').addEventListener('click',()=>{if(validateStep())showStep(currentStep+1)});
stepItems.forEach((li,i)=>li.querySelector('button').addEventListener('click',()=>{if(i<=currentStep)showStep(i)}));
document.querySelector('#restartBtn').addEventListener('click',()=>{results.classList.add('hidden');matcher.classList.remove('hidden');showStep(0);window.scrollTo({top:0,behavior:'smooth'});});

function updateBudget(){
  const budget=+document.querySelector('#budget').value;
  document.querySelector('#budgetOutput').value=`${budget} 万元`;
  let cost=budget<=12?'1,100～1,300':budget<=18?'1,300～1,700':budget<=25?'1,700～2,300':budget<=35?'2,300～2,900':'2,700～3,200';
  document.querySelector('#costHint').textContent=`按燃油车年行驶 1 万公里保守估算，当前预算区间每月基础用车成本约 ${cost} 元，不含月供。新能源车实际成本会不同。`;
}

function showStep(index){
  currentStep=Math.max(0,Math.min(steps.length-1,index));
  steps.forEach((s,i)=>s.classList.toggle('active',i===currentStep));
  stepItems.forEach((li,i)=>{li.classList.toggle('active',i===currentStep);li.classList.toggle('done',i<currentStep)});
  document.querySelector('#stepCurrent').textContent=String(currentStep+1).padStart(2,'0');
  document.querySelector('#progressBar').style.width=`${(currentStep+1)/steps.length*100}%`;
  document.querySelector('#prevBtn').disabled=currentStep===0;
  document.querySelector('#nextBtn').classList.toggle('hidden',currentStep===steps.length-1);
  document.querySelector('#submitBtn').classList.toggle('hidden',currentStep!==steps.length-1);
  document.querySelector('#formError').textContent='';
  window.scrollTo({top:0,behavior:'smooth'});
}

function validateStep(){
  if(currentStep===1&&!document.querySelector('input[name="energy"]:checked')){
    document.querySelector('#formError').textContent='请至少选择一种可以接受的能源形式。';return false;
  }
  document.querySelector('#formError').textContent='';return true;
}

function syncChoiceCards(){
  document.querySelectorAll('.choice-card').forEach(card=>card.classList.toggle('selected',Boolean(card.querySelector('input:checked'))));
}

function collectAnswers(){
  const checked=name=>[...form.querySelectorAll(`input[name="${name}"]:checked`)].map(x=>x.value);
  const one=name=>form.querySelector(`[name="${name}"]:checked`)?.value;
  return {city:form.city.value,budget:+form.budget.value,surplus:+form.monthlySurplus.value,energies:checked('energy'),charging:one('charging'),commute:+form.commute.value,scenes:checked('scene'),trip:one('trip'),passengers:+one('passengers'),family:checked('family'),body:one('body'),features:checked('feature'),weights:{safety:+form.safety.value,comfort:+form.comfort.value,economy:+form.economy.value,driving:+form.driving.value,smart:+form.smart.value,design:+form.design.value}};
}

function scoreCar(car,a){
  if(car.price[0]>a.budget||car.seats<a.passengers||!a.energies.includes(car.energy))return null;
  let score=45,reasons=[];
  const center=(car.price[0]+car.price[1])/2;
  score+=Math.max(0,10-Math.abs(center-a.budget*.78)*.8);
  if(car.price[1]<=a.budget){score+=3;reasons.push('主力配置大概率仍在预算范围内')}
  const weightSum=Object.values(a.weights).reduce((x,y)=>x+y,0);
  Object.entries(a.weights).forEach(([key,w])=>score+=(car.values[key]-3)*w/weightSum*8);
  const bestValues=Object.entries(a.weights).sort((x,y)=>y[1]-x[1]).slice(0,2).map(([k])=>k);
  const valueLabel={safety:'安全',comfort:'舒适',economy:'经济性',driving:'驾驶感',smart:'智能化',design:'设计'};
  bestValues.forEach(k=>{if(car.values[k]>=4){score+=2;reasons.push(`${valueLabel[k]}表现契合你的高优先级`)}});

  if(a.charging==='home'&&['ev','phev','erev'].includes(car.energy)){score+=7;reasons.push('家充条件能充分发挥电驱优势')}
  if(a.charging==='public'&&car.energy==='ev')score+=2;
  if(a.charging==='hard'&&car.energy==='ev')score-=13;
  if(a.charging==='hard'&&['fuel','hev'].includes(car.energy)){score+=7;reasons.push('不依赖充电，符合当前补能条件')}
  if(a.trip==='often'){
    if(['fuel','hev','phev','erev'].includes(car.energy)){score+=8;reasons.push('频繁长途补能更从容')}
    if(car.energy==='ev')score-=5;
    if(car.values.comfort>=4)score+=3;
  }
  if(a.trip==='rare'&&a.commute<=30&&car.energy==='ev'){score+=6;reasons.push('短途通勤与纯电高频工况相配')}
  if(a.scenes.includes('city')&&car.length<4800)score+=4;
  if(a.scenes.includes('tight')){
    if(car.length<4700){score+=7;reasons.push('车身相对紧凑，窄车位压力更小')}else if(car.length>4950)score-=10;else score-=3;
  }
  if(a.scenes.includes('rough')){score+=(car.clearance-3)*4;if(car.clearance>=5)reasons.push('通过性适合非铺装路面')}
  if(a.scenes.includes('highway')){score+=car.values.safety+car.values.comfort-5;if(car.features.includes('l2'))score+=4}
  if(a.scenes.includes('weather')&&car.features.includes('awd')){score+=5;reasons.push('四驱为复杂天气提供额外余量')}

  if(a.body!=='any')score+=car.body===a.body?8:-7;
  if(a.passengers>=6&&car.seats>=6){score+=14;reasons.push(`${car.seats} 座满足多人出行的硬需求`)}
  if(a.passengers===5&&car.seats===5)score+=2;
  if(a.family.includes('elder')){score+=(car.elder-3)*3;if(car.elder>=5)reasons.push('上下车与后排更照顾长辈')}
  if(a.family.includes('child')){score+=(car.child-3)*3;if(car.child>=5)reasons.push('儿童与家庭乘坐场景适配度高')}
  if(a.family.includes('cargo')){score+=(car.cargo-3)*3;if(car.cargo>=5)reasons.push('后备箱装载能力突出')}
  if(a.family.includes('largeCargo')){score+=(car.cargo-3)*4;if(car.body==='suv'||car.body==='mpv')score+=3}
  const matchedFeatures=a.features.filter(x=>car.features.includes(x));
  score+=matchedFeatures.length*2.5;
  if(a.features.length&&matchedFeatures.length===a.features.length)reasons.push('你勾选的期望配置覆盖较完整');
  if(a.city!=='other'&&car.energy==='ev')score+=3;
  score=Math.max(48,Math.min(96,Math.round(score)));
  return {...car,score,reasons:[...new Set(reasons)].slice(0,4)};
}

form.addEventListener('submit',e=>{
  e.preventDefault();if(!validateStep())return;
  const answers=collectAnswers();
  let ranked=cars.map(c=>scoreCar(c,answers)).filter(Boolean).sort((a,b)=>b.score-a.score);
  if(!ranked.length){
    document.querySelector('#formError').textContent='当前硬性条件没有匹配车型，请放宽预算、能源形式或座位数。';return;
  }
  renderResults(ranked,answers);matcher.classList.add('hidden');results.classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'});
});

function renderResults(ranked,a){
  const best=ranked[0];
  const cityLabel=form.city.options[form.city.selectedIndex].text;
  const energyLabel=a.energies.map(x=>energyNames[x]).join(' / ');
  document.querySelector('#summaryStrip').innerHTML=[`${cityLabel}上牌`,`预算 ≤ ${a.budget} 万`,energyLabel,`${a.passengers} 人乘坐`,a.trip==='often'?'高频长途':a.trip==='sometimes'?'偶尔长途':'城市短途为主'].map(x=>`<span>${x}</span>`).join('');
  const fallbackReasons=best.reasons.length?best.reasons:[best.strength,'预算、空间与使用场景综合较均衡'];
  document.querySelector('#bestMatch').innerHTML=`<article class="hero-result"><div class="hero-main"><span class="match-label">TOP MATCH · 最佳匹配</span><h3>${best.name}</h3><p class="car-meta">${energyNames[best.energy]} · ${bodyNames[best.body]} · ${best.seats} 座 · 参考 ${best.price[0]}～${best.price[1]} 万</p><div class="score-row"><div class="score-ring" style="--score:${best.score}"><strong>${best.score}</strong></div><div class="score-copy"><b>综合匹配度</b><small>基于你的硬性条件与偏好权重</small></div></div></div><div class="hero-side"><ul class="reason-list">${fallbackReasons.map(r=>`<li>${r}</li>`).join('')}</ul><p class="caution"><b>需要留意：</b>${best.caution}</p></div></article>`;
  document.querySelector('#alternatives').innerHTML=ranked.slice(1,4).map((car,i)=>`<article class="alt-card"><span class="alt-rank">0${i+2} · ALTERNATIVE</span><h4>${car.name}</h4><span class="alt-meta">${energyNames[car.energy]} · ${bodyNames[car.body]} · ${car.price[0]}～${car.price[1]} 万</span><div class="alt-score">${car.score}<small>%</small></div><p>${car.strength}</p><div class="tags">${car.tags.map(t=>`<span>${t}</span>`).join('')}</div></article>`).join('');
}

const publicCatalog=Array.isArray(window.PUBLIC_VEHICLE_CATALOG)?window.PUBLIC_VEHICLE_CATALOG:[];
const publicCatalogMeta=window.PUBLIC_VEHICLE_CATALOG_META||{};
let catalogReturn='intro',catalogVisible=48,catalogFiltered=[];

function escapeHtml(value){
  return String(value).replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

function openCatalog(){
  catalogReturn=!results.classList.contains('hidden')?'results':!matcher.classList.contains('hidden')?'matcher':'intro';
  [intro,matcher,results].forEach(section=>section.classList.add('hidden'));
  catalog.classList.remove('hidden');
  renderCatalog(true);
  window.scrollTo({top:0,behavior:'smooth'});
}

function closeCatalog(){
  catalog.classList.add('hidden');
  ({intro,matcher,results}[catalogReturn]||intro).classList.remove('hidden');
  window.scrollTo({top:0,behavior:'smooth'});
}

function renderCatalog(reset=false){
  if(reset)catalogVisible=48;
  const query=document.querySelector('#catalogSearch').value.trim().toLocaleLowerCase('zh-CN');
  const brand=document.querySelector('#catalogBrand').value;
  const budget=Number(document.querySelector('#catalogBudget').value)||Infinity;
  catalogFiltered=publicCatalog.filter(item=>{
    const haystack=`${item.name} ${item.brand} ${item.manufacturer}`.toLocaleLowerCase('zh-CN');
    return (!query||haystack.includes(query))&&(!brand||item.brand===brand)&&item.priceMin<=budget;
  });
  document.querySelector('#catalogResultCount').textContent=catalogFiltered.length.toLocaleString('zh-CN');
  document.querySelector('#catalogGrid').innerHTML=catalogFiltered.slice(0,catalogVisible).map(item=>`<article class="catalog-card"><span class="catalog-brand">${escapeHtml(item.brand)}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.manufacturer)}</p><div class="catalog-price">${item.priceMin===item.priceMax?item.priceMin.toFixed(2):`${item.priceMin.toFixed(2)}～${item.priceMax.toFixed(2)}`} 万</div><a href="${item.url}" target="_blank" rel="noopener">查看公开来源 ↗</a></article>`).join('');
  document.querySelector('#catalogMoreBtn').classList.toggle('hidden',catalogVisible>=catalogFiltered.length);
}

function initializeCatalog(){
  const count=publicCatalogMeta.seriesCount||publicCatalog.length;
  document.querySelector('#catalogCount').textContent=count?count.toLocaleString('zh-CN'):'不可用';
  if(!publicCatalog.length){
    document.querySelector('#catalogMeta').textContent='车型目录未加载，请稍后重试。';
    return;
  }
  const updated=String(publicCatalogMeta.fetchedAt||'').replace('T',' ').replace(/\+08:00$/,'');
  document.querySelector('#catalogMeta').textContent=`共 ${count.toLocaleString('zh-CN')} 个公开有价车系 · ${publicCatalogMeta.brandCount} 个品牌 · 更新于 ${updated}（北京时间）`;
  const brands=[...new Set(publicCatalog.map(item=>item.brand))].sort((a,b)=>a.localeCompare(b,'zh-CN'));
  document.querySelector('#catalogBrand').insertAdjacentHTML('beforeend',brands.map(brand=>`<option value="${escapeHtml(brand)}">${escapeHtml(brand)}</option>`).join(''));
}

document.querySelector('#catalogBtn').addEventListener('click',openCatalog);
document.querySelector('#closeCatalogBtn').addEventListener('click',closeCatalog);
document.querySelector('#catalogSearch').addEventListener('input',()=>renderCatalog(true));
document.querySelector('#catalogBrand').addEventListener('change',()=>renderCatalog(true));
document.querySelector('#catalogBudget').addEventListener('change',()=>renderCatalog(true));
document.querySelector('#catalogMoreBtn').addEventListener('click',()=>{catalogVisible+=48;renderCatalog()});

updateBudget();showStep(0);syncChoiceCards();initializeCatalog();
