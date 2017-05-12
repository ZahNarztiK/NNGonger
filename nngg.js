function nn_inj(){
	var ht=$('html').html()
		cn=$('#ComNumCheck').val(),
		mn=/txtMacAddress = .*;/i.exec(ht);
	if(cn&&mn){
		mn=/.*['"](.*)['"]/.exec(mn)[1];
		var rs=prompt(`### Start Gonging ###\nComNo: ${cn}\nMacAddress: ${mn}`);
		if(rs||isNaN(rs)){
			rs=Number(rs).toFixed(2);
			$.post('RunSearchReward.php',{RewardValue:rs,ComNo:cn,MacAddress:mn},data=>alert(data));
		}
	}
	else alert("Gonging is unavailable!\nLack of:\n"+(cn?"- ComNo\n":"")+(mn?"- MacAddress\n":""));
}