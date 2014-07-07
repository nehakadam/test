_inputFieldFocus: function(e)
{
	var dtPickerObj = e.data.obj;

	if(dtPickerObj.dataObject.oInputElement == null)
	{
		dtPickerObj.showDateTimePicker(e.target);
	}
			