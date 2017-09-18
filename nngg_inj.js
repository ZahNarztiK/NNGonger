$(function(){
	console.log("NNGG Initiated");
	document.title+=",";

	$('#slotMachineButton').off("click");

	function GetUnique(inputArray)
	{
		var outputArray = [];
		for (var i = 0; i < inputArray.length; i++)
			if ((jQuery.inArray(inputArray[i], outputArray)) == -1)
				outputArray.push(inputArray[i]);
		return outputArray;
	}
	function sortNumber(a,b){ return a - b; }
	var machine1 = $("#machine1").slotMachineH({
		active	: 3,
		delay	: 500
	});

	var machine2 = $("#machine2").slotMachineH({
		active	: 3,
		delay	: 500
	});

	var machine3 = $("#machine3").slotMachineH({
		active	: 3,
		delay	: 500
	});

	var mac1 = $('#machine1 .slot').slice(1,-1);
	var mac2 = $('#machine2 .slot').slice(1,-1);
	var mac3 = $('#machine3 .slot').slice(1,-1);

	function onComplete($el, active){
		switch($el[0].id){
			case 'machine1':
				var ArrayMac1 = new Array();
				var IndexArrayMac1 = new Array();
					mac1.each(function(){
						ArrayMac1.push($(this).data('value'));
						var SotrArrayMac1 = GetUnique(ArrayMac1.sort(sortNumber));
						var IndexA = active.index;
						var IndexCheckA = SotrArrayMac1[IndexA];
						IndexArrayMac1.push(IndexCheckA);
						return IndexArrayMac1;
					});
				$('#show1').val(IndexArrayMac1.pop());
				break;
			case 'machine2':
				var ArrayMac2 = new Array();
				var IndexArrayMac2 = new Array();
					mac2.each(function(){
						ArrayMac2.push($(this).data('value'));
						var SotrArrayMac2 = GetUnique(ArrayMac2.sort(sortNumber));
						var IndexB = active.index;
						var IndexCheckB = SotrArrayMac2[IndexB];
						IndexArrayMac2.push(IndexCheckB);
						return IndexArrayMac2;
					});
				$('#show2').val(IndexArrayMac2.pop());
				break;
			case 'machine3':
				var ArrayMac3 = new Array();
				var IndexArrayMac3 = new Array();
					mac3.each(function(){
						ArrayMac3.push($(this).data('value'));
						var SotrArrayMac3 = GetUnique(ArrayMac3.sort(sortNumber));
						var IndexC = active.index;
						var IndexCheckC = SotrArrayMac3[IndexC];
						IndexArrayMac3.push(IndexCheckC);
						return IndexArrayMac3;
					});
				$('#show3').val(IndexArrayMac3.pop());
				break;
		}
	}

	$("#slotMachineButton").click(function(){
		console.log("Spin Hijack");
		$(".countnum").html("&nbsp;");
		$('#slotMachineButton').prop('disabled', true);
		$("#ShowBtn").hide();
		$('#ClickReward').val('');
		var CreditCheck = $('#HideCredit').val();
		if (CreditCheck <= 0)
		{
			alert("เครดิตของคุณหมดแล้วค่ะ!!");
			window.location='RunLogOut.php';
			return false;
		}else{
			$.post('RunCheckCredit.php',{CreditCheck:CreditCheck},
			function(data){
				$('#ShowCredit').show().html(data);
				$('#HideCredit').val(data);
			});
			$('#ShowReward').hide().empty();	
			
			var listn=machine1.len(),
				hrnd=[],hrndc={},
				hrndn=null,hrndcn=0;

			for(var i=0;i<4;i++){
				hrnd.push(Math.floor(Math.random()*listn).toString());
				if(hrnd[i] in hrndc){
					hrndc[hrnd[i]]++;
					if(hrndc[hrnd[i]]>hrndcn){
						hrndn=hrnd[i];
						hrndcn=hrndc[hrnd[i]];
					}
					else if(hrndc[hrnd[i]]==hrndcn&&hrnd[i]>hrndn) hrndn=hrnd[i];
				}
				else hrndc[hrnd[i]]=1;
			}

			console.log(listn+"\n"+hrnd)
			console.log(hrndc)
			console.log(hrndn);

			machine1.shuffle(5, onComplete, parseInt(hrndn!=null?hrndn:hrnd[0]));
			machine2.shuffle(6, onComplete, parseInt(hrndn!=null?hrndn:hrnd[1]));
			machine3.shuffle(7, onComplete, parseInt(hrndn!=null?hrndn:hrnd[2]));
			
			setTimeout(function(){
				var HideCredit = $('#HideCredit').val();
				var A1 = $('#show1').val();
				var A2 = $('#show2').val();
				var A3 = $('#show3').val();
				var AllValue = '"'+A1+','+A2+','+A3+'"';
				if (A1 != "" && A2 != "" && A3 != "")
				{
					$.post('RunCheckReward.php',{AllValue:AllValue, Credit:HideCredit},
					function(data){
						// $('#slotMachineButton').prop('disabled', false);
						var DataTrim = $.trim(data);
						var SpritData = DataTrim.split("|");
						$('#ShowReward').show().html(SpritData[0]);
						$('#ShowCredit').show().html(SpritData[1]);
						$('#HideCredit').val(SpritData[1]);
						if (SpritData[2] > 0)
						{
							$('#ShowBtn').show();
							$('#ClickReward').val(SpritData[2]);
						}
					});
				}else{
					alert('กรุณารอจนกว่าจะสุ่มรางวัลเสร็จก่อนค่ะ');
					// $('#slotMachineButton').prop('disabled', false);
					return false;
				}
			}, 5000);
			
			var item = $(".block-light");
			counter = 0 ;
			random = Math.floor(Math.random() * 3) + 5;
			times = random ; //ตั้งเวลาการจับรางวัล
			interval = setInterval(function() { //Tab .block-light	
				item.removeClass('current');
				item.eq(counter++ % item.length).addClass('current');							
			}, 200);//Stop Tab .block-light
			countTime = setInterval(function() { // Time 	
				--times;
				if(times == 0){	// Check Count Time
					clearInterval(interval);
					clearInterval(countTime);
					$(".set").each(function() {
						var current = $(this).children(".current");
						var i = current.next().length ? current.index() : 0;
						var chk = current.attr('value');
						var datenow = '';
						var datedatabase = '';
						if(chk == '0'){ //Check Slot Reward
							setTimeout(function(){
								current.removeClass('current');
								$(".block-light").eq(1).addClass('current');
								$(".countnum").html("<div class='block-countnum' style='padding-top:22px;'><h4><font color='#FFF'>เกือบได้Honda Zoomer-X ราคา 60,000บ. แล้วนะ อดเลย...</font></h4></div>");
							} ,90);
							$('#slotMachineButton').prop('disabled', false);
						}else if(chk == '2'){ 
							setTimeout(function(){
							  current.removeClass('current');
							  $(".block-light").eq(3).addClass('current');
							  $(".countnum").html("<div class='block-countnum' style='padding-top:22px;'><h4><font color='#FFF'>คุณเกือบได้คูปอง 10,000 ชม.ละ อีกนิดเดียว</font></h4></div>");
							} ,90);
							$('#slotMachineButton').prop('disabled', false);
						}else if(chk == '4'){ 
							setTimeout(function(){
							  current.removeClass('current');
							  $(".block-light").eq(5).addClass('current');
							  $(".countnum").html("<div class='block-countnum' style='padding-top:22px;'><h4><font color='#FFF'>โอ้ว! คุณเกือบได้ทุนการศึกษา 1 เทอม</font></h4></div>");
							} ,90);
							$('#slotMachineButton').prop('disabled', false);
						}else if(chk == '6'){ 
							setTimeout(function(){
							  current.removeClass('current');
							  $(".block-light").eq(7).addClass('current');
							  $(".countnum").html("<div class='block-countnum' style='padding-top:22px;'><h4><font color='#FFF'>กรี๊ดด! เกือบได้IPHONE 7 แล้วเธอ</font></h4></div>");
							} ,90);
							$('#slotMachineButton').prop('disabled', false);
						}else{
							$(".countnum").html("<div class='block-countnum' style='padding-top:22px;'><h4><font color='#FFF'>เสียใจด้วยค่ะ คุณไม่ได้รางวัล</font></h4></div>");
							$('#slotMachineButton').prop('disabled', false);
						}//Stop Check Slot Reward
					});
				}//Stop Check Count Time
			}, 1000);//Stop Time
		}
	});
	
	
});
