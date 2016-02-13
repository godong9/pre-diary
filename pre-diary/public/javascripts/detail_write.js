$(document).ready(function(){
    //write
		var footerHeight = $('footer').height();
    var headerHeight = $('header').height();
		var screenHeight = $(window).height();
    var contentHeight = screenHeight - footerHeight + headerHeight -30;
    
		$('.detail-content').css({'height': contentHeight });
    
    
    $('section#write').css({'height':screenHeight});
		$('section#detail').css({'height':screenHeight, 'width': '100%'});
	//detail- page	
		jQuery.ajax({
   	   type:"GET",
			 url:"//godong9.com:3001/posts/56bf1c7f8f2f3ab94ec59e51",
			 dataType:"JSON", // 옵션이므로 JSON으로 받을게 아니면 안써도 됨
			 success : function(data) {
			 	console.log(data);
			 // 통신이 성공적으로 이루어졌을 때 이 함수를 타게 된다.
			 // TODO
			 //			alert('sucess');
						var subject = data.subject;
						var text = data.content;
						var date_output = data.createDate;

						$('.detail-content').append('<p>'+ subject + '</p>' + '<p>' + text + '</p>');
						$('#date-output').append('<p>'+ date_output + " " + "일기 작성" + '</p>');

			 },
			 complete : function(data) {
			 // 통신이 실패했어도 완료가 되었을 때 이 함수를 타게 된다.
			 // TODO
			 //		alert('sucess but');
			 },
			 error : function(xhr, status, error) {
			 }
	 });
			
			$('.smile').click(function() {
						
					var score = $(this).find('img').data('value');
					var url = 'http://godong9.com:3001/posts/' + $('#user_main').data('post');

					var put = {
							"emotionStatus" : score
					};


					$.ajax({
						url: url,
						type: 'PUT',
						data: put,
						success: function() {
							var url = '/user/'+$('#user_main').data('user');
							$(location).attr('href',url);
						}
					});
			});


//write page
	//date-picker

/*
	$('#eventForm').formValidation({
		framework: 'bootstrap',
		icon: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			name: {
				validators: {
					notEmpty: {
						message: 'The name is required'
					}
				}
			},
		date: {
			validators: {
				notEmpty: {
					message: 'The date is required'
						},
							date: {
								format: 'MM/DD/YYYY',
								message: 'The date is not a valid'
						}
					}
				}
			}
		});*/



		$('#data_submit').click(function() {
				var url = "http://godong9.com:3001/posts";

				if(!$('#subject').val() || !$('#content').val()) {
					return alert("제목 또는 내용을 입력해주세요!");
				}
				var select_date = $('#sel1 option:selected').val();
			 	var days;
				if (select_date === '1') {
					days = moment(new Date()).add(select_date, "minutes");
				} else {
					days = moment(new Date()).add(select_date, "days");
				}

				var post = {
						"subject": $('#subject').val(),
						"content": $('#content').val(),
						"openDate": days._d
				};

				$.post(url,post,function(data) {
					var url = '/user/'+$('#user_main').data('user');
					$(location).attr('href',url);
				});
		});

});
