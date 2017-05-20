function nn_inj(){
	var ht=$('html').html(),
		cn=$('#ComNumCheck').val(),
		mn=/txtMacAddress = ['"](.*)['"];/i.exec(ht)[1];
	var rw=prompt(`### Start Gonging ###\nComNo: ${cn=(cn?cn:"N/A")}\nMacAddress: ${mn=(mn?mn:"N/A")}`);
	if(rw&&!isNaN(rw)){
		rs=confirm(`### Consealed Protocol ###\nComNo: ${cn}\nMacAddress: ${mn}\n\nDo you want to conseal them?\n(OK: Mask with ' ', Cancel: Leave it)`);
		$.post('RunSearchReward.php',{RewardValue:Number(rw).toFixed(2),ComNo:(rs?' ':cn),MacAddress:(rs?' ':mn)},data=>{
			var spl=/: (.*) <br>Password: (.*)</i.exec(data);
			alert(spl?`${spl[1]}\n${spl[2]}`:data);
		});
	}
}