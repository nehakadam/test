_inputFieldFocus: function(e)
{
	var dtPickerObj = e.data.obj;

	if(dtPickerObj.dataObject.oInputElement == null)
	{
		dtPickerObj.showDateTimePicker(e.target);
	}
			
}

_setButtonAction: function()
{
	var dtPickerObj = this;

	if(dtPickerObj.dataObject.oInputElement != null)
	{
		var sOutput = dtPickerObj._setOutput();
		dtPickerObj._setValueOfElement(sOutput);
		dtPickerObj._hidePicker();
	}
}