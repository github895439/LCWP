function tetohuToText(encstr) {
    enclim = 32768; // 限界エンコード文字数
    enc = new Array(enclim + 1024); // エンコード配列
    enctbl = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/' // エンコード文字テーブル
    framelim = 2000; // 限界フレーム数
    fldlines = 24; // フィールド段数
    fldblks = fldlines * 10; // フィールドブロック数
    af = new Array(fldblks * (framelim + 1));
    startframe = 0;
    enclen = 0;
    for (i = 0; i < encstr.length; i++) {
        tmp = enctbl.indexOf(encstr.charAt(i)); if (tmp >= 0) enc[enclen++] = tmp;
    }
    for (i = enclen; i < enclim; i++)enc[i] = 0;
    encc = 0;
    fldrepcnt = 0;
    for (i = startframe * fldblks; i < (startframe + 1) * fldblks; i++)af[i] = 0;
    for (e = startframe; encc < enclen; e++) {
        // フィールド入力
        if (fldrepcnt < 1) {
            for (j = 0; j < fldblks;) {
                tmp = enc[encc++]; tmp += enc[encc++] * 64;
                tmp2 = tmp % fldblks; tmp = Math.floor(tmp / fldblks);
                tmp1 = tmp % 17; tmp = Math.floor(tmp / 17);
                for (i = 0; i <= tmp2; i++)af[e * fldblks + (j++)] += tmp1 - 8;
                if (tmp1 * fldblks + tmp2 == 9 * fldblks - 1) fldrepcnt = enc[encc++];
            }
        } else {
            fldrepcnt--;
        }
    }

    // console.log(af.slice(0, 240).join(""));
    let tmpAf = af.slice(0, 240);
    let stringAf = tmpAf.join("");
    let regex;
    regex = /0/g;
    let replace1 = stringAf.replace(regex, "  ");
    // console.log(replace1);
    regex = /[1-9]/g;
    let replace2 = replace1.replace(regex, "[]");
    // console.log(replace2);
    let rtn = "";

    for (let index = 0; index < replace2.length; index += 20) {
        let line = replace2.substring(index, index + 20)
        // console.log(line);
        rtn += (line + "\n");
    }

    return rtn;
}

function handlerLcwpEleButton(e) {
    let valueText = document.querySelector("#tx");
    // alert(valueText.value)
    let splitValue = valueText.value.split("@");
    let result = tetohuToText(splitValue[1]);
    let ele = document.querySelector("#lcwpEleTextarea");
    ele.value = result;
    return;
}

var tagInputNew = document.createElement("input");
tagInputNew.setAttribute("type", "button");
tagInputNew.setAttribute("value", "ToText");
tagInputNew.setAttribute("id", "lcwpEleButton");
var tagBrNew = document.createElement("br");
var tagTextareaNew = document.createElement("textarea");
tagTextareaNew.setAttribute("cols", 30);
tagTextareaNew.setAttribute("rows", 25);
tagTextareaNew.setAttribute("id", "lcwpEleTextarea");
var tagFormNew = document.createElement("form");
tagFormNew.appendChild(tagInputNew);
tagFormNew.appendChild(tagBrNew);
tagFormNew.appendChild(tagTextareaNew);
var tagBodyFirst = document.querySelector("body");
tagBodyFirst.appendChild(tagFormNew);
document.querySelector("#lcwpEleButton").onclick = handlerLcwpEleButton;
