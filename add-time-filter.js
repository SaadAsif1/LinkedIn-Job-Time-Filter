javascript:(function(){const CONFIG={statusElementId:'linkedinTimeFilterStatusMsg',filterButtonId:'searchFilter_timePostedRange',dropdownSelector:'ul.search-reusables__collection-values-container',timeOptions:[{label:'Past 12 hours',value:'r'+(12*60*60)},{label:'Past 6 hours',value:'r'+(6*60*60)},{label:'Past hour',value:'r'+(1*60*60)}],statusDurationMs:2500,injectionDelayMs:250};function showStatusMessage(message){let statusDiv=document.getElementById(CONFIG.statusElementId);if(!statusDiv){statusDiv=document.createElement('div');statusDiv.id=CONFIG.statusElementId;Object.assign(statusDiv.style,{position:'fixed',bottom:'15px',right:'15px',padding:'12px 18px',backgroundColor:'rgba(40, 40, 40, 0.85)',color:'white',zIndex:'10001',borderRadius:'6px',fontSize:'14px',fontFamily:'Arial, sans-serif',boxShadow:'0 2px 5px rgba(0,0,0,0.3)',opacity:'0',transition:'opacity 0.3s ease-in-out'});document.body.appendChild(statusDiv);void statusDiv.offsetWidth;}statusDiv.textContent=message;statusDiv.style.opacity='1';if(statusDiv.timer)clearTimeout(statusDiv.timer);statusDiv.timer=setTimeout(()=>{statusDiv.style.opacity='0';setTimeout(()=>{if(statusDiv&&statusDiv.parentNode){statusDiv.parentNode.removeChild(statusDiv);}},400);},CONFIG.statusDurationMs);};function createUrlUpdateHandler(value){return(e)=>{e.preventDefault();e.stopPropagation();const url=new URL(window.location.href);url.searchParams.set('f_TPR',value);url.searchParams.set('refresh','true');window.location.href=url.toString();};};function addOrUpdateFilters(){const button=document.getElementById(CONFIG.filterButtonId);const dropdownId=button?.getAttribute('aria-controls');const container=dropdownId?document.getElementById(dropdownId):null;const ul=container?.querySelector(CONFIG.dropdownSelector);if(!ul){console.warn('LinkedIn Filter+: Dropdown container not found. Cannot add/update filters.');showStatusMessage('Error: Dropdown list missing');return;}let itemsChanged=false;CONFIG.timeOptions.forEach(opt=>{const inputId=`timePostedRange-${opt.value}`;let inputElement=document.getElementById(inputId);let labelElement=document.querySelector(`label[for='${inputId}']`);if(inputElement&&labelElement){const spanVisible=labelElement.querySelector('span.t-14');if(spanVisible&&spanVisible.textContent!==opt.label){spanVisible.textContent=opt.label;itemsChanged=true;}const spanHidden=labelElement.querySelector('span.visually-hidden');const expectedHiddenText=`Filter by ${opt.label}`;if(spanHidden&&spanHidden.textContent!==expectedHiddenText){spanHidden.textContent=expectedHiddenText;itemsChanged=true;}labelElement.onclick=createUrlUpdateHandler(opt.value);}else{if(inputElement)inputElement.closest('li')?.remove();if(labelElement)labelElement.closest('li')?.remove();const li=document.createElement('li');li.className='search-reusables__collection-values-item';const input=document.createElement('input');input.name='date-posted-filter-value';input.id=inputId;input.className='search-reusables__select-input';input.type='radio';input.value=opt.value;const label=document.createElement('label');label.htmlFor=input.id;label.className='search-reusables__value-label';label.style.cursor='pointer';label.onclick=createUrlUpdateHandler(opt.value);const p=document.createElement('p');p.className='display-flex';const spanVisible=document.createElement('span');spanVisible.className='t-14 t-black--light t-normal';spanVisible.setAttribute('aria-hidden','true');spanVisible.textContent=opt.label;const spanHidden=document.createElement('span');spanHidden.className='visually-hidden';spanHidden.textContent=`Filter by ${opt.label}`;p.appendChild(spanVisible);p.appendChild(spanHidden);label.appendChild(p);li.appendChild(input);li.appendChild(label);ul.appendChild(li);itemsChanged=true;}});if(itemsChanged){showStatusMessage('✅ Custom time filters updated.');}else{showStatusMessage('⏱ Filters already present.');}};if(!window.location.pathname.includes('/jobs/search/')){showStatusMessage('Run this on a LinkedIn job search page.');return;}const filterButton=document.getElementById(CONFIG.filterButtonId);if(!filterButton){showStatusMessage('Could not find "Date posted" filter.');return;}const isDropdownOpen=filterButton.getAttribute('aria-expanded')==='true';if(!isDropdownOpen){filterButton.click();}setTimeout(addOrUpdateFilters,CONFIG.injectionDelayMs);})();
