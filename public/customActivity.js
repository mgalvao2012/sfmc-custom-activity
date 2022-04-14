function setupVariablesForm() {
	// Remove button click
	$(document).on(
	  'click',
	  '[data-role="variable-fields"] > .template-variable [data-role="remove"]',
	  function(e) {
		e.preventDefault();
		$(this).closest('.template-variable').remove();
	  }
	);
	// Add button click
	$(document).on(
	  'click',
	  '[data-role="variable-fields"] > .template-variable [data-role="add"]',
	  function(e) {
		e.preventDefault();
		const container = $(this).closest('[data-role="variable-fields"]');
		const newFieldGroup = container.children().filter('.template-variable:first-child').clone();
		newFieldGroup.find('input').each(function(){
		  $(this).val('');
		});
		container.append(newFieldGroup);
	  }
	);
  }
  
  function showURL(){
	  let option = 	$( "#typeComunication option:selected" ).val();
	  console.log("Selected option: " + option);
	  if(option > 1){
		  $("#divUrl").show();
	  }else{
		$("#divUrl").hide();
	  }
  }
  function initActivity(connection, data) {
	window.activityConfig = data;
	const inArguments = data.arguments.execute.inArguments;
	$("#phoneNumber").val(inArguments[0].phoneNumber);
	$("#templateName").val(inArguments[0].template);
	$("#typeComunication").val(inArguments[0].type);
	$("#origem").val(inArguments[0].origem);
	$("#linkBotao").val(inArguments[0].btnLink);
	$("#url").val(inArguments[0].url);
	showURL();
	const container = $('[data-role="variable-fields"]');
	const firstElement = container.find('.input-group').first();
	const variables = [].concat(inArguments[0].variables.split('|')).reverse();
	variables.forEach(function(value, index) {
	  let element = firstElement.clone();
	  container.prepend(element);
	  $(element).find('input').val(value);
	});
  }
  
  function clickedNext(connection) {
	const values = $('form').serializeArray();
	$('#templateName').removeClass('is-invalid');
	$('#phoneNumber').removeClass('is-invalid');
  
	const templateName = values.find(function(el) {
	  return el.name === 'templateName';
	});
	
	const linkBotao = values.find(function(el){
		return el.name === 'linkBotao';
	});

	const origem = values.find(function(el){
		return el.name === 'origem';
	});
	const url = values.find(function(el) {
		return el.name === 'url';
	  });
	
	const phoneNumber = values.find(function(el) {
	  return el.name === 'phoneNumber';
	});
  
	const variables = values.filter(function(el) {
	  return el.name === 'variable' && el.value !== "";
	})
  
	if (!templateName || !templateName.value) {
	  $('#templateName').addClass('is-invalid');
	  return false;
	}
  
	if (!phoneNumber || !phoneNumber.value) {
	  $('#phoneNumber').addClass('is-invalid');
	  return false;
	}
  
	const config = window.activityConfig;
	config.metaData.isConfigured = true;
  
	const inArguments = config.arguments.execute.inArguments;
	inArguments[0].template = templateName.value;
	inArguments[0].phoneNumber = phoneNumber.value;
	inArguments[0].type = $( "#typeComunication option:selected" ).val();
	inArguments[0].url = url.value;
	inArguments[0].origem = origem.value;
	inArguments[0].btnLink = linkBotao.value;
	inArguments[0].variables = variables.map(function(variable) {
	  return variable.value;
	}).join('|')
	console.log(config);
	connection.trigger('updateActivity', config);
  }
  
  function load() {
	const connection = new Postmonger.Session();
	connection.trigger('ready');
	connection.on('initActivity', initActivity.bind(null, connection));
	connection.on('clickedNext', clickedNext.bind(null, connection));
	setupVariablesForm();
  }
  
  $(document).ready(function() {
	load();
  });