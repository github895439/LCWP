function handlerLcwpEleSelect(e) {
  let category = e.target.value;
  navigator.clipboard.writeText(category);
  return;
}

function handlerLcwpEleButton(e) {
  let valueText = document.querySelector('#edit-broadcast-title-formgroup').value;
  let valueUrl = "https://www.twitch.tv/" + document.baseURI.split("/")[4];
  let base = "https://twitter.com/intent/tweet?";
  let query = [["text", encodeURIComponent(valueText)].join("="), ["url", encodeURIComponent(valueUrl)].join("=")].join("&");
  window.open(base + query, "_brank");
  return;
}

var eleDiv = document.createElement('div');
eleDiv.innerHTML = '\
<form>\
選択するとクリップボードにエントリー<br>\
  <select id="lcwpEleSelect">\
    <option value="-">-</option>\
    <option value="Tetris">テトリス</option>\
    <option value="Ketsui: Kizuna Jigoku Tachi">ケツイ</option>\
    <option value="Ultima Online">UO</option>\
    <option value="Street Fighter Alpha 3">ゼロ3</option>\
    <option value="screeps">screeps</option>\
  </select><br>\
  <input id="lcwpEleButton" type="button" value="Tweet">\
</form>\
';
document.querySelector('.tw-transition-group').appendChild(eleDiv)
document.querySelector('#lcwpEleSelect').onchange = handlerLcwpEleSelect;
document.querySelector('#lcwpEleButton').onclick = handlerLcwpEleButton;
