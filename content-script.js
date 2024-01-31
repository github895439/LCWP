function handlerCWP(e) {
  let category = e.target.value;
  navigator.clipboard.writeText(category);
  return;
}

var eleDiv = document.createElement('div');
eleDiv.innerHTML = '\
<form>\
選択するとクリップボードにエントリー<br>\
  <select id="eleCWP">\
    <option value="-">-</option>\
    <option value="Tetris">テトリス</option>\
    <option value="Ketsui: Kizuna Jigoku Tachi">ケツイ</option>\
    <option value="Ultima Online">UO</option>\
    <option value="Street Fighter Alpha 3">ゼロ3</option>\
    <option value="screeps">screeps</option>\
  </select>\
</form>\
';
document.querySelector('.tw-transition-group').appendChild(eleDiv)
document.querySelector('#eleCWP').onchange = handlerCWP;
