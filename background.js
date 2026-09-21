chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'download') {
    chrome.downloads.download({url: msg.url, filename: msg.filename, saveAs: true})
      .then(id => sendResponse({ok:true,id}))
      .catch(err => sendResponse({ok:false,error:String(err)}));
    return true;
  }
});