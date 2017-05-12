chrome.pageAction.onClicked.addListener(tab=>{
	chrome.tabs.executeScript(tab.id,{file:"jquery-1.7.2.js"},()=>
		chrome.tabs.executeScript(tab.id,{file:"nngg.js"},()=>
			chrome.tabs.executeScript(tab.id,{code:"nn_inj()"})));
});

chrome.runtime.onInstalled.addListener(()=>
	chrome.declarativeContent.onPageChanged.removeRules(undefined,()=>
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl:{hostEquals:"www.ngdrei.co.th", pathPrefix:"/gachapon"}
				})
			],
				actions:[new chrome.declarativeContent.ShowPageAction()]
			}
		])
	)
);