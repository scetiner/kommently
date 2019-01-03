chrome.tabs.onActivated.addListener(function (activeInfo){    
    chrome.browserAction.setBadgeText({text: ''});     
    chrome.tabs.query({
        active:true,
        windowId:activeInfo.windowId
    }, function(tabs){
        if(tabs && tabs.length == 1 && tabs[0].url){
            getUrlInfo(tabs[0].url);
        } 
    });
       
});

chrome.tabs.onUpdated.addListener(function (tabId,changeInfo,tab){    
    if(!tab.active){
        return;
    }    
    chrome.browserAction.setBadgeText({text: ''});     
    if(changeInfo.status ==='complete'){
        getUrlInfo(tab.url);
    }
});

function getUrlInfo(url){
    if(!url){
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://restipsum.com/serif/kommently/api/page?url=" + url, true);
    xhr.setRequestHeader("Authorization", "Basic use your token");
    xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        if(resp.result && resp.result.page){
            var badge = resp.result.page.c_count > 999 ? numeral(resp.result.page.c_count).format('0.0a') : resp.result.page.c_count;            
            badge = badge == 0 ? '': badge + '';
            chrome.browserAction.setBadgeText({text: badge});    
        } else {
            chrome.browserAction.setBadgeText({text: ''});  
        }
    }
    }
    xhr.send();
}