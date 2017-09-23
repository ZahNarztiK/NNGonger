function nn_gong(){
	var ht=$('html').html(),
		cn=$('#ComNumCheck').val(),
		mn=/txtMacAddress = ['"](.*)['"];/i.exec(ht)[1];
	var rw=prompt(`### Start Gonging ###\nComNo: ${cn=(cn?cn:"N/A")}\nMacAddress: ${mn=(mn?mn:"N/A")}`);
	if(rw&&!isNaN(rw)){
		rw=Number(rw).toFixed(2);
		rs=confirm(`### Nean? ###\nOK: Normal injection\nCancel: Direct bypass`);
		if(rs)
			$.post('RunCheckReward.php',{AllValue:`${rw},${rw},${rw}`,Credit:$('#HideCredit').val()},data=>{
				var sd=$.trim(data).split("|");
				$('#ShowReward').show().html(sd[0]);
				$('#ShowCredit').show().html(sd[1]);
				$('#HideCredit').val(sd[1]);
				if(sd[2]){
					$('#ShowBtn').show();
					$('#ClickReward').val(sd[2]);
				}
			})
		else
			$.post('RunSearchReward.php',{RewardValue:rw,ComNo:cn,MacAddress:mn},data=>{
				var spl=/: (.*) <br>Password: (.*)</i.exec(data);
				alert(spl?`${spl[1]}\n${spl[2]}`:data);
			});
	}
}

function nn_inj(){
	$('#wrapper-bg').prepend("<div id='nn_stat'></div>");

	var s=document.createElement("script");
	s.src=chrome.extension.getURL("hjqs.js");
	s.onload=function() { this.remove(); };
	(document.head||document.documentElement).appendChild(s);

	s=document.createElement("script");
	s.src=chrome.extension.getURL("nngg_inj.js");
	s.onload=function() { this.remove(); };
	(document.head||document.documentElement).appendChild(s);
}

nn_inj();
