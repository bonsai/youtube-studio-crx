const $ = (id) => document.getElementById(id);
async function send(type, extra={}) {
  const [tab] = await chrome.tabs.query({active:true,currentWindow:true});
  if (!tab?.id) throw new Error('タブを取得できません');
  return chrome.tabs.sendMessage(tab.id, {type, ...extra});
}
$('scan').onclick = async () => {
  try { const r=await send('scan'); $('status').textContent=`候補 ${r.count} 件。ページ上に選択UIを表示しました。`; }
  catch(e){$('status').textContent='studio.youtube.com の編集画面で実行してください。';}
};
$('download').onclick = async () => {
  try { const r=await send('downloadSelected'); $('status').textContent=r.message; }
  catch(e){$('status').textContent=e.message;}
};
$('replace').onclick = async () => {
  try { const r=await send('prepareReplace'); $('status').textContent=r.message; }
  catch(e){$('status').textContent=e.message;}
};