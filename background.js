chrome.pageAction.onClicked.addListener(tab=>{
	chrome.tabs.executeScript(tab.id,{file:"nngg_run.js"});
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

chrome.webNavigation.onCompleted.addListener(details=>{
		chrome.tabs.executeScript(details.tabId,{file:"nngg.js"});
	},
	{ url: [{ urlPrefix: "http://www.ngdrei.co.th/gachapon" }] }
);
