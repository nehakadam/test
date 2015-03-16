/* ----------------------------------------------------------------------------- 

  CalenStyle - Modern Event Calendar (Open Source)
  Version 1.0.0
  Copyright (c)2015 Curious Solutions Pvt Ltd and Neha Kadam
  http://curioussolutions.in/apps/CalenStyle/

 ----------------------------------------------------------------------------- */

function CalEvent(ceId, ceAllDay, ceStartDate, ceEndDate, ceType, ceTitle, ceDesc, ceUrl)
{
	this.id = ceId;
	this.isAllDay = ceAllDay;
	this.start = ceStartDate;
	this.end = ceEndDate;
	this.type = ceType;
	this.title = ceTitle;
	this.desc = ceDesc;
	this.url = ceUrl;
}

function CalEventSeg(ceSegDayNo, ceEventId, ceEventDisplayId, ceSegId, ceSegStartDate, ceSegEndDate, ceSegLeftColumn, ceSegColumns)
{
	this.dayNo = ceSegDayNo;
	this.eventId = ceEventId;
	this.eventDisplayId = ceEventDisplayId;
	this.eventSegId = ceSegId;
	this.eventSegStart = ceSegStartDate;
	this.eventSegEnd = ceSegEndDate;
	this.segLeftColumn = ceSegLeftColumn;
	this.segColumns = ceSegColumns;
}

// --------------------------------- Global Variables Start --------------------------------------

$.CalenStyle = $.CalenStyle || {

	i18n: {}, // Internationalization Objects

	defaults: //Plugin Defaults
	{
		sectionsList: ["Header", "Calendar"],
	
		language: "",
		veryShortDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		shortDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		fullDayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		shortMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		fullMonthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
	
		eventTooltipContent: "Default",
		formatDates: {},
		miscStrings:
		{
			today: "Today",
			week: "Week",
			allDay: "All Day",
			ends: "Ends",
			emptyEventTitle: "(No Title)",
			emptyGoogleCalendarEventTitle: "Busy"
		},
		duration: "Default",
		durationStrings:
		{
			y: ["year ", "years "],
			M: ["month ", "months "],
			w: ["w ", "w "],
			d: ["d ", "d "],
			h: ["h ", "h "],
			m: ["m ", "m "],
			s: ["s ", "s "]
		},
	
		viewsToDisplay: [
							{ 
								viewName: "DetailedMonthView",
								viewDisplayName: "Month"
							},
							{ 
								viewName: "WeekView",
								viewDisplayName: "Week"
							},
							{ 
								viewName: "DayView",
								viewDisplayName: "Day"
							},
							{ 
								viewName: "AgendaView",
								viewDisplayName: "Agenda"
							}
						],
		visibleView: "DetailedMonthView",
		selectedDate: new Date(),

		headerComponents: 
		{
			DatePickerIcon: "<span class='cContHeaderDatePickerIcon clickableLink icon-Calendar'></span>",
			FullscreenButton: function(bIsFullscreen)
			{
				var sIconClass = (bIsFullscreen) ? "icon-Contract" : "icon-Expand";
				return "<span class='cContHeaderFullscreen clickableLink "+ sIconClass +"'></span>";
			},
			PreviousButton: "<span class='cContHeaderButton cContHeaderNavButton cContHeaderPrevButton clickableLink icon-Prev'></span>",
			NextButton: "<span class='cContHeaderButton cContHeaderNavButton cContHeaderNextButton clickableLink icon-Next'></span>",
			TodayButton: "<span class='cContHeaderButton cContHeaderToday clickableLink'>Today</span>",
			HeaderLabel: "<span class='cContHeaderLabelOuter'><span class='cContHeaderLabel'></span></span>",
			HeaderLabelWithDropdownMenuArrow: "<span class='cContHeaderLabelOuter clickableLink'><span class='cContHeaderLabel'></span><span class='cContHeaderDropdownMenuArrow'></span></span>",
			MenuSegmentedTab: "<span class='cContHeaderMenuSegmentedTab'></span>",
			MenuDropdownIcon: "<span class='cContHeaderMenuButton clickableLink'>&#9776;</span>"
		},
		headerSectionsList: 
		{
			left: ["DatePickerIcon", "FullscreenButton", "PreviousButton", "NextButton"],
			center: ["HeaderLabel"],
			right: ["MenuSegmentedTab"]
		},
		dropdownMenuElements: ["ViewsToDisplay"], // ["ViewsToDisplay", "DatePicker"]
		parentObject: null,
		datePickerObject: null,

		formatSeparatorDateTime: " ",
		formatSeparatorDate: "-",
		formatSeparatorTime: ":",
		is24Hour: true,
		inputDateTimeFormat: "dd-MM-yyyy HH:mm:ss",
	
		eventDuration: 30, // In minutes
		allDayEventDuration: 1, // In days
	
		timeIndicatorUpdationInterval: 10,
		unitTimeInterval: 30, // [5, 10, 15, 20, 30]
		timeLabels: "Hour", // ["Hour", "All"]
	
		inputTZOffset: "+05:30",
		tz: "Asia/Calcutta", // For Google Calendar
		outputTZOffset: "+05:30",			
	
		weekStartDay: 1,
		weekNumCalculation: "US", // ["US", "Europe/ISO"] // weekNumberCalculationMethod
	
		agendaViewDuration: "Month", // ["Month", "Week", "CustomDays"]
		daysInAgendaView: 15, // numberOfDaysInAgendaView
	
		quickAgendaViewDuration: "Week", // ["Week", "CustomDays"]
		daysInQuickAgendaView: 7,

		transitionSpeed: 300,
		showTransition: false,
	
		fixedNumOfWeeksInMonthView: false,
		displayWeekNumInMonthView: false,
		actionOnDayClickInMonthView: "ChangeDate", // ["ChangeDate", "DisplayEventListDialog"]
	
		eventIndicatorInMonthView: "Events", //["Events", "DayHighlight", "Custom"]
		averageEventsPerDayForDayHighlightView: 5,
	
		calculateDetailedMonthViewRowMinHeight: true,
		fixedHeightOfDetailedMonthView: false,
	
		addEventsInMonthView: true,
		displayEventsInMonthView: true,
	
		isDragNDropInMonthView: true,
		isTooltipInMonthView: true,

		isDragNDropInDetailView: true,
		isResizeInDetailView: true,
		isTooltipInDetailView: true,

		isDragNDropInQuickAgendaView: true,
		isTooltipInQuickAgendaView: true,
	
		isTooltipInAppointmentView: true,
	
		calendarBorderColor: "FFFFFF",
		changeCalendarBorderColorInJS: false,
	
		// Events-specific properties
	
		extraMonthsForDataLoading: 1,
		deleteOldDataWhileNavigating: true,
		datasetModificationRule: "Default", //["Default", "ReplaceAll", "ReplaceSpecified"]
		changeColorBasedOn: "EventCalendar",	// ["Event", "EventCalendar", "EventSource"]
		borderColor: "",
		textColor: "FFFFFF",
	
		eventColorsArray: ["C0392B", "D2527F", "674172", "4183D7", "336E7B", "36D7B7", "68C3A3", "E87E04", "6C7A89", "F9690E"],
		eventIcon: "icon-Event",
		hideEventIcon: false,
	
		businessHoursSource: [
			{
				day: 1,
				times: [{startTime: "10:00", endTime: "17:00"}]
			},
			{
				day: 2,
				times: [{startTime: "10:00", endTime: "17:00"}]
			},
			{
				day: 3,
				times: [{startTime: "10:00", endTime: "17:00"}]
			},
			{
				day: 4,
				times: [{startTime: "10:00", endTime: "17:00"}]
			},
			{
				day: 5,
				times: [{startTime: "10:00", endTime: "17:00"}]
			},
			{
				day: 6,
				times: [{startTime: "10:00", endTime: "17:00"}]
			}
		],
		excludeNonBusinessHours: false,
		calDataSource: [],
		datePickerCalDataSource: 
		[
			{
				config:
				{
					sourceCountType: "Event"
				}
			}
		],
	
		adjustViewOnWindowResize: true,
	
		//------------------ Callback Functions Start --------------------------
	
		initialize: null,

		// Custom HeaderView Callbacks
		modifyHeaderViewLabels: null,
		addEventHandlersInHeader: null,
	
		// Data Loading Callbacks
		dataLoadingStart: null,
		dataLoadingEnd: null,
	
		// Calendar Navigation Callbacks
		dayClicked: null,
		cellClicked: null,
		viewLoaded: null,
		previousButtonClicked: null,
		nextButtonClicked: null,
		todayButtonClicked: null,
		visibleViewChanged: null,
	
		modifyCustomView: null,
	
		// Event List related Callbacks
		displayEventsForPeriodInListInAgendaView: null,
		eventListAppended: null,
		// Event Dialog related Callbacks
		displayEventListDialog: null,
		eventInADialogClicked: null,
	
		// Events and Appointment Time Slots related Callbacks
		eventsAddedInView: null,
		eventClicked: null,
		saveChangesOnEventDrop: null,
		saveChangesOnEventResize: null
	
		//------------------ Callback Functions End --------------------------
	},

	tempDefaults: // Temporary Variables For Calculation Specific to CalenStyle Instance
	{
		sLoadType: "Load", 
		iLoadCnt: 0, // iLoadCounter
		dLoadDt: new Date(), // LoadDate
		bViewLoaded: false, // bViewLoaded
		dHighlightDPV: [], // dArrDatesToHighlightInDatePickerView
	
		bDisMenu: false, // bDisplayViewSelctionMenu
	
		iMaxEvId: 0, // iMaxEventId
		oAECalendar: [],
		oAEvents: [], // oArrEvents
		oASmEvSeg: [], // oArrSmallEventSegments
		oAADEvSeg: [], // oArrAllDayEventSegments
		oASrcCnt: [], // oArrSourceCount
		oABlockTm: [], // oArrBlockedTime
		oSURLParams: [],
	
		iDocHtPrev: 0, // iDocumentHeightPrevious
	
		iUTmMS: 0, // iUnitTimeMS
		iUTmSlt: 0, // iUnitTimeSlots
	
		dVSDt: new Date(), // dViewStartDate
		dVEDt: new Date(), // dViewEndDate
		dVDSDt: new Date(), // dViewToDisplayStartDate
		dVDEDt: new Date(), // dViewToDisplayEndDate
		dCMDt: new Date(), // dCurrentMonthDate
		dPMDt: new Date(), // dPreviousMonthDate
		dNMDt: new Date(), // dNextMonthDate
		dPLSDt: new Date(), // dPrevLoadStartDate
		dPLEDt: new Date(), // dPrevLoadEndDate
		dNLSDt: new Date(), // dNextLoadStartDate
		dNLEDt: new Date(), // dNextLoadEndDate
		bGCData: false,
	
		dAVDt: [], // dArrViewDates
		iNoVDay: 0, // iNumberOfViewDays
		iNoVDayDis: 0, // iNumberOfViewDaysToDisplay
		bAWkRw: [], // bArrWeekRow
		bADVCur: [], // bArrDVCurrent
		iBsDays: 0, // iBusinessDaysForWeek
		bABsDays: [], // bArrBusinessDaysForWeek
		oBsHours: {"start": "", "end": ""}, // oBusinessHours
		iWkInMonth: 6, // iNumberOfWeeksInMonth
	
		bDVResEv: false, // bDVResizingEvent
		bDVDrgEv: false, // bDVDraggingEvent
		bEvLgPresd: false, // bEventLongPressed
		bUrlClk: false, // bUrlClicked
		oEvEdt: null, // oEventBeingEdited
		oDVEdtgEv: null, // oDVEditingEvent
		bDVScrlg: false, // bDVScrolling
		fDVDayWth: 0, // bDVDaysWidth
		fADVDayLftPos: [], // fArrDVDaysLeftPos
		fAHrTpPos: [], // fArrHourTopPos

		iCalHeight: 0 // iCalendarHeight
	},

	extra: // Common Temporary Variables
	{
		iCalenStyleObjCount: 0,
		iBorderOverhead: 1,
		iEventHeightOverhead: 4,
		dToday: new Date(),
		iMS: { m: 6E4, h: 36E5, d: 864E5, w: 6048E5 },
		sArrInputDateTimeFormats: ["DateObject", "UnixTimestamp", "ISO8601", "ISO8601Compact", "dd-MM-yyyy hh:mm:ss AA", "dd-MM-yyyy HH:mm:ss", "MM-dd-yyyy hh:mm:ss AA", "MM-dd-yyyy HH:mm:ss", "yyyy-MM-dd hh:mm:ss AA", "yyyy-MM-dd HH:mm:ss"],
		sArrViewsTypes: ["DetailedMonthView", "MonthView", "WeekView", "DayView", "AgendaView", "QuickAgendaView", "DatePicker"],
		bTouchDevice: ("ontouchstart" in document.documentElement ? true : false),
		sClickHandler: ("ontouchstart" in document.documentElement ? "click" : "click"),
		oArrCalenStyle: []
	}

};

// --------------------------------- Global Variables End --------------------------------------

;(function ($, window, document, undefined) 
{

	$.fn.CalenStyle = function(options) 
	{
		var oCalenStyle = $(this).data();

		var sArrDataKeys = Object.keys(oCalenStyle),
			iKey, sKey;
		if(options == null || options == undefined)
		{
			if(sArrDataKeys.length > 0)
			{
				for(iKey in sArrDataKeys)
				{
					sKey = sArrDataKeys[iKey];
					if(sKey.search("plugin_CalenStyle_") !== -1)
					{
						return oCalenStyle[sKey];
					}
				}
			}
			else
			{
				console.log("No CalenStyle Object Defined For This Element");
			}
		}
		else if(typeof options == "string")
		{			
			if(oCalenStyle !== null || oCalenStyle !== undefined)
			{
				if(options === "destroy")
				{
					if(sArrDataKeys.length > 0)
					{
						for(iKey in sArrDataKeys)
						{
							sKey = sArrDataKeys[iKey];
							if(sKey.search("plugin_CalenStyle_") !== -1)
							{
								$(this).children().remove();
								$(".cElemDatePickerBg").remove();
								$(this).removeData();
								$(this).unbind();
								$(document).unbind($.CalenStyle.extra.sClickHandler+".CalenStyle");
								$(document).unbind($.CalenStyle.extra.sClickHandler+".MonthPicker");
								$(document).unbind($.CalenStyle.extra.sClickHandler+".YearPicker");
								
								oCalenStyle = oCalenStyle[sKey];

								$(window).unbind("resize." + oCalenStyle.tv.pluginId);
								$(window).unbind("resize.CSDP");
							
								var oArrTempCalenStyle = [];
								for(var iTempIndex = 0; iTempIndex < $.CalenStyle.extra.oArrCalenStyle.length; iTempIndex++)
								{
									var oThisCalenStyle = $.CalenStyle.extra.oArrCalenStyle[iTempIndex]; 
									if(oThisCalenStyle.tv.pluginId !== oCalenStyle.tv.pluginId && oThisCalenStyle.tv.pluginId !== oCalenStyle.setting.datePickerObject.tv.pluginId)
										oArrTempCalenStyle.push(oThisCalenStyle);
								}

								$.CalenStyle.extra.oArrCalenStyle = oArrTempCalenStyle;
							
								console.log("Destroyed CalenStyle Object");
								console.log(oCalenStyle);
							
								break;
							}
						}
					}
					else
					{
						console.log("No CalenStyle Object Defined For This Element");
					}
				}
			}
		}
		else
		{
			return this.each(function()
			{
				$.CalenStyle.extra.iCalenStyleObjCount++;
			
				if(!$.data(this, "plugin_CalenStyle_" + $.CalenStyle.extra.iCalenStyleObjCount)) 
				{
					oCalenStyle = new CalenStyle(this, options);
					$.data(this, "plugin_CalenStyle_" + $.CalenStyle.extra.iCalenStyleObjCount, oCalenStyle);
					oCalenStyle.loadView();
				
					console.log("Calendar Object ");
					console.log(oCalenStyle);
				}
				else
				{
					if(sArrDataKeys.length > 0)
					{
						for(iKey in sArrDataKeys)
						{
							sKey = sArrDataKeys[iKey];
							if(sKey.search("plugin_CalenStyle_") !== -1)
							{
								return oCalenStyle[sKey];
							}
						}
					}
					else
					{
						console.log("No CalenStyle Object Defined For This Element");
					}
				}
			});
		}
	};

})(jQuery, window, document);

function CalenStyle(element, options) 
{
	var to = this;

	to.elem = element;

	var sLang = (options.language !== undefined || options.language !== null) ? options.language : $.CalenStyle.defaults.language;
	to.setting = $.extend({}, $.CalenStyle.defaults, options, $.CalenStyle.i18n[sLang]);
	to.tv = $.extend({}, $.CalenStyle.tempDefaults);

	to.tv.pluginId = $.CalenStyle.extra.iCalenStyleObjCount;
	to.tv.iUTmMS = to.setting.unitTimeInterval * $.CalenStyle.extra.iMS.m;
	to.tv.iUTmSlt = (60 / to.setting.unitTimeInterval);
	to.tv.iCalHeight = $(to.elem).height();

	if(to.setting.initialize)
		to.setting.initialize.call(to);

	$.CalenStyle.extra.dToday = to._getCurrentDate();			
	if(to.compareDates(to.setting.selectedDate, new Date()) === 0)
		to.setting.selectedDate = new Date($.CalenStyle.extra.dToday);
	to.tv.dLoadDt = new Date($.CalenStyle.extra.dToday); to.tv.dVSDt = new Date($.CalenStyle.extra.dToday); to.tv.dVEDt = new Date($.CalenStyle.extra.dToday); to.tv.dVDSDt = new Date($.CalenStyle.extra.dToday); to.tv.dVDEDt = new Date($.CalenStyle.extra.dToday); 
	to.tv.dCMDt = new Date($.CalenStyle.extra.dToday); to.tv.dPMDt = new Date($.CalenStyle.extra.dToday); to.tv.dNMDt = new Date($.CalenStyle.extra.dToday); to.tv.dPLSDt = new Date($.CalenStyle.extra.dToday); to.tv.dPLEDt = new Date($.CalenStyle.extra.dToday);
	to.tv.dNLSDt = new Date($.CalenStyle.extra.dToday); to.tv.dNLEDt = new Date($.CalenStyle.extra.dToday);

	$.CalenStyle.extra.oArrCalenStyle.push(to);
}

/*! -------------------------------------- Common Functions Start -------------------------------- */

CalenStyle.prototype = {

	// Public Method
	modifyCalenStyleObject: function(tempObj)
	{
		var to = this;
		to = tempObj;
	},

	// Public Method
	setLanguage: function(sTempLang, bLoadData)
	{
		var to = this;

		to.setting.language = sTempLang;
		to.setting = $.extend({}, to.setting, $.CalenStyle.i18n[sTempLang]);
		for(var iTempIndex = 0; iTempIndex < to.setting.viewsToDisplay.length; iTempIndex++)
		{
			to.setting.viewsToDisplay[iTempIndex].viewDisplayName = to.setting.viewDisplayNames[to.setting.viewsToDisplay[iTempIndex].viewName];
		}
	
		to.setting.datePickerObject.setting = $.extend({}, to.setting.datePickerObject.setting, $.CalenStyle.i18n[sTempLang]);
	
		if(bLoadData)
			to.reloadData();
		else
		{
			to.refreshView();
			to.setting.datePickerObject.refreshView();
		}
	
		return to;
	},

	// Public Method
	changeOutputTimezone: function(sTZ, sTZD, bLoadData)
	{
		var to = this;
		var iTempIndex;

		var sPrevTZ = to.setting.tz, sPrevTZD = to.setting.outputTZOffset;
		to.setting.tz = sTZ;
		to.setting.outputTZOffset = sTZD;
		if(bLoadData || (to.tv.bGCData && sPrevTZ != sTZ))
			to.reloadData();
		else if(sPrevTZD != sTZD)
		{
			for(iTempIndex = 0; iTempIndex < to.tv.oAEvents.length; iTempIndex++)
			{
				var oEvent = to.tv.oAEvents[iTempIndex];
				if(!oEvent.isAllDay)
				{
					oEvent.start = to.normalizeDateTimeWithOffset(oEvent.start, sPrevTZD, sTZD);
					oEvent.end = to.normalizeDateTimeWithOffset(oEvent.end, sPrevTZD, sTZD);
				}
			}

			for(iTempIndex = 0; iTempIndex < to.tv.oABlockTm.length; iTempIndex++)
			{
				var oBlockedTime = to.tv.oABlockTm[iTempIndex];
				if(!oBlockedTime.isAllDay)
				{
					oBlockedTime.start = to.normalizeDateTimeWithOffset(oBlockedTime.start, sPrevTZD, sTZD);
					oBlockedTime.end = to.normalizeDateTimeWithOffset(oBlockedTime.end, sPrevTZD, sTZD);
				}
			}

			to.refreshView();					
		}

		return to;
	},

	// Public Method
	compareStrings: function(sString1, sString2)
	{
		var to = this;

		if(sString1 !== null && sString1 !== undefined && sString2 !== null && sString2 !== undefined)
		{
			if(typeof sString1 === "string" && typeof sString2 === "string")
			{
				if(sString1.toLocaleLowerCase() === sString2.toLocaleLowerCase())
					return true;
			}
			return false;
		}
		else
		{
			if((sString1 === null && sString2 === null) || (sString1 === undefined && sString2 === undefined))
				return true;
			else
				return false;
		}
	},

	_callCommonEvents: function()
	{
		var to = this;
		to._hideDatePicker();
		to._collapseSubmenu();
	},

	_resetSourceFetch: function()
	{
		var to = this;
		for(var iSourceIndex = 0; iSourceIndex < to.setting.calDataSource.length; iSourceIndex++)
		{
			var oSource = to.setting.calDataSource[iSourceIndex];
			oSource.fetched = false;
		}
	},

	// Public Method
	reloadData: function(oSourceURLParams)
	{
		var to = this;

		to.tv.sLoadType = "Load";
		to.tv.dLoadDt = new Date(to.setting.selectedDate);
		to.tv.oSURLParams = to.__parseJson(oSourceURLParams) || [];
		to._resetSourceFetch();
		to.__reloadCurrentView(true, true);
	},

	_setDisplayTimeLabelsArray: function()
	{
		var to = this;
		var iTempIndex;

		var sTimeToDisplay = "Array";			
		if(to.compareStrings(to.setting.timeLabels, "Hour") || to.compareStrings(to.setting.timeLabels, "All"))
			sTimeToDisplay = to.setting.timeLabels;
		else if($.isArray(to.setting.timeLabels))
		{
			if(to.setting.timeLabels.length === to.tv.iUTmSlt)
			{
				sTimeToDisplay = "No";
				for(iTempIndex = 0; iTempIndex < to.tv.iUTmSlt; iTempIndex++)
				{
					if(! to.compareStrings(typeof to.setting.timeLabels[iTempIndex], "boolean"))
					{
						sTimeToDisplay = "Array";
						break;
					}
				}
			}
		}
	
		if(!to.compareStrings(sTimeToDisplay, "No"))
		{
			to.setting.timeLabels = [];
			for(iTempIndex = 0; iTempIndex < to.tv.iUTmSlt; iTempIndex++)
			{
				if(to.compareStrings(sTimeToDisplay, "Hour") || to.compareStrings(sTimeToDisplay, "Array"))
				{
					if(iTempIndex === 0)
						to.setting.timeLabels.push(true);
					else 
						to.setting.timeLabels.push(false);
				}
				else if(to.compareStrings(sTimeToDisplay, "All"))
					to.setting.timeLabels.push(true);
			}
		}
	},

	_getBlockedTimesForCurrentView: function(dThisDate)
	{
		var to = this;
		var iTempIndex;

		var dArrTempBlockedTimes = [];
	
		for(iTempIndex = 0; iTempIndex < to.tv.oABlockTm.length; iTempIndex++)
		{
			var dTempBlockedTime = to.tv.oABlockTm[iTempIndex],
			bCompStartDates = (to.compareDates(new Date(dTempBlockedTime.start), dThisDate) === 0) ? true : false,
			bCompEndDates = (to.compareDates(new Date(dTempBlockedTime.end), dThisDate) === 0) ? true : false;
			if(bCompStartDates || bCompEndDates)
				dArrTempBlockedTimes.push(dTempBlockedTime);
		}
	
		// ----------------------- Blocked Array Sorting Start ------------------------------
		var iNumOfTimes = dArrTempBlockedTimes.length;
		if(iNumOfTimes > 1)
		{
			for(iTempIndex = 0; iTempIndex < (iNumOfTimes - 1); iTempIndex++)
			{
				var dArrTempTimes1 = dArrTempBlockedTimes[iTempIndex];
				var dArrTempTimes2 = dArrTempBlockedTimes[(iTempIndex + 1)];
				if(to.compareDateTimes(new Date(dArrTempTimes1[0]), new Date(dArrTempTimes2[0])) > 0)
				{
					dArrTempBlockedTimes[iTempIndex] = dArrTempTimes2;
					dArrTempBlockedTimes[(iTempIndex + 1)] = dArrTempTimes1;
				}
			}
		}
		// ----------------------- Blocked Array Sorting End ------------------------------
	
		return dArrTempBlockedTimes;
	},

	_getBusinessDaysForWeek: function()
	{
		var to = this;
		var iTempIndex;

		to.setting.businessHoursSource = to.__parseJson(to.setting.businessHoursSource);
		to.tv.iBsDays = 0;
		to.tv.bABsDays = [false, false, false, false, false, false, false];
	
		for(iTempIndex = 0; iTempIndex < to.setting.businessHoursSource.length; iTempIndex++)
		{
			var oTempBusinessHours = to.setting.businessHoursSource[iTempIndex],
			oTempBusinessHourTimes = oTempBusinessHours.times;
			to.tv.bABsDays[oTempBusinessHours.day] = true;
			for(var iTimeIndex = 0; iTimeIndex < oTempBusinessHourTimes.length; iTimeIndex++)
			{
				var oTempBusinessHourTime = oTempBusinessHourTimes[iTimeIndex];
				if(to.tv.oBsHours.start === "" || to.tv.oBsHours.start === undefined || to.tv.oBsHours.start === null)
					to.tv.oBsHours.start = oTempBusinessHourTime.startTime;
				else
				{
					if(to._compareHours(oTempBusinessHourTime.startTime, to.tv.oBsHours.start) < 0)
						to.tv.oBsHours.start = oTempBusinessHourTime.startTime;
				}
				if(to.tv.oBsHours.end === "" || to.tv.oBsHours.end === undefined || to.tv.oBsHours.end === null)
					to.tv.oBsHours.end = oTempBusinessHourTime.endTime;
				else
				{
					if(to._compareHours(oTempBusinessHourTime.endTime, to.tv.oBsHours.end) > 0)
						to.tv.oBsHours.end = oTempBusinessHourTime.endTime;
				}
			}
		}
		to.tv.oBsHours.startTime = to.tv.oBsHours.start.split(":");
		to.tv.oBsHours.endTime = to.tv.oBsHours.end.split(":");
	
		var iStartTimeRem = ((to.tv.oBsHours.startTime[0] * 60 + to.tv.oBsHours.startTime[1]) % to.setting.unitTimeInterval),
		iEndTimeRem = ((to.tv.oBsHours.endTime[0] * 60 + to.tv.oBsHours.endTime[1]) % to.setting.unitTimeInterval);
	
		if(iStartTimeRem !== 0)
		{
			to.tv.oBsHours.startTime[1] = to.tv.oBsHours.startTime[1] + iStartTimeRem;
			to.tv.oBsHours.start = to.tv.oBsHours.startTime[0] + ":" + to.tv.oBsHours.startTime[1];
		}
		if(iEndTimeRem !== 0)
		{
			to.tv.oBsHours.endTime[1] = to.tv.oBsHours.endTime[1] + iEndTimeRem;
			to.tv.oBsHours.end = to.tv.oBsHours.endTime[0] + ":" + to.tv.oBsHours.endTime[1];
		}
	
		for(iTempIndex = 0; iTempIndex < to.tv.bABsDays.length; iTempIndex++)
		{
			if(to.tv.bABsDays[iTempIndex])
				to.tv.iBsDays++;
		}
	},

	_compareHours: function(sDate1, sDate2)
	{
		var to = this;

		var sArrDate1 = to._getHourAndMinuteFromString(sDate1), 
		sArrDate2 = to._getHourAndMinuteFromString(sDate2),
		dDate1 = new Date(), dDate2 = new Date();
		dDate1.setHours(parseInt(sArrDate1[0]));
		dDate1.setMinutes(parseInt(sArrDate1[1]));
		dDate2.setHours(parseInt(sArrDate2[0]));
		dDate2.setMinutes(parseInt(sArrDate2[1]));
		return to.compareDateTimes(dDate1, dDate2);
	},

	_getBusinessHoursForCurrentView: function(dThisDate)
	{
		var to = this;
		var iTempIndex;

		var oThisDate = to.getDateInFormat({"date": dThisDate}, "object", false, true);
		var oArrTempBusinessHours = [];
		for(iTempIndex = 0; iTempIndex < to.setting.businessHoursSource.length; iTempIndex++)
		{
			var oTempBusinessHours = to.setting.businessHoursSource[iTempIndex];
			if(oThisDate.D === oTempBusinessHours.day)
			{
				for(var iTimesIndex = 0; iTimesIndex < oTempBusinessHours.times.length; iTimesIndex++)
				{
					var sArrTempTime = oTempBusinessHours.times[iTimesIndex],
					iArrStartTimes = to._getHourAndMinuteFromString(sArrTempTime.startTime),
					iArrEndTimes = to._getHourAndMinuteFromString(sArrTempTime.endTime),
					dStartDate = to.setDateInFormat({"iDate": {d: oThisDate.d, M: oThisDate.M, y: oThisDate.y, H: parseInt(iArrStartTimes[0]), m: parseInt(iArrStartTimes[1]), s: 0}}, ""),
					dEndDate = to.setDateInFormat({"iDate": {d: oThisDate.d, M: oThisDate.M, y: oThisDate.y, H: parseInt(iArrEndTimes[0]), m: parseInt(iArrEndTimes[1]), s: 0}}, "");
					if(to.compareDateTimes(dStartDate, dEndDate) < 0)
						oArrTempBusinessHours.push([dStartDate, dEndDate]);
				}
				break;
			}
		}
	
		// ------------------------ Sorting BusinessHours Start ----------------------------------
		var iNumOfTimes = oArrTempBusinessHours.length;
		if(iNumOfTimes > 1)
		{
			var oArrTemp = [];
			for(iTempIndex = 0; iTempIndex < (iNumOfTimes - 1); iTempIndex++)
			{
				var dArrTemp1 = oArrTempBusinessHours[iTempIndex];
				var dArrTemp2 = oArrTempBusinessHours[(iTempIndex + 1)];
				if(to.compareDateTimes(dArrTemp1[0], dArrTemp2[0]) !== 0)
				{
					oArrTempBusinessHours[iTempIndex] = dArrTemp2;
					oArrTempBusinessHours[(iTempIndex + 1)] = dArrTemp1;
				}
			}
		}
		// ------------------------ Sorting BusinessHours End ----------------------------------
	
		return oArrTempBusinessHours;
	},

	_getHourAndMinuteFromString: function(sTempStartTime)
	{
		var to = this;

		var sArrTimes = sTempStartTime.split(" "),
		iArrTimes = sArrTimes[0].split(to.setting.formatSeparatorTime),
		iHours = iArrTimes[0],
		iMinutes = iArrTimes[1];
		if(sArrTimes.length > 1)
		{
			if(to.compareStrings(sArrTimes[1], "AM") && iHours === 12)
				iHours = 0;
			if(to.compareStrings(sArrTimes[1], "PM") && iHours < 12)
				iHours = iHours + 12;
		}
		return [iHours, iMinutes];
	},

	//--------------------------------- View Related Functions Start ----------------------------------

	// Public Method
	modifySettings: function(options)
	{
		var to = this;

		var iTempPluginObjCount = to.tv.pluginId;
	
		to.setting = $.extend({}, $.CalenStyle.defaults, options);
		to.tv = $.extend({}, $.CalenStyle.tempDefaults);
	
		to.tv.pluginId = iTempPluginObjCount;
		to.tv.iUTmMS = to.setting.unitTimeInterval * $.CalenStyle.extra.iMS.m;
		to.tv.iUTmSlt = (60 / to.setting.unitTimeInterval);
	},

	// Public Method
	loadView: function()
	{
		var to = this;

		$(to.elem).html("<div class='calendarCont'></div>");
		for(iTempIndex1 = 0; iTempIndex1 < to.setting.viewsToDisplay.length; iTempIndex1++)
		{
			var oViewToDisplay = to.setting.viewsToDisplay[iTempIndex1],
			sViewName = oViewToDisplay.viewName || "";
			if(to.compareStrings(sViewName, to.setting.visibleView))
				to.tv.bDisMenu = true;
		}
		to.tv.dLoadDt = to.setDateInFormat({"date": to.setting.selectedDate}, "START");
		
		to.tv.bViewLoaded = false;
	
		to._getBusinessDaysForWeek();
		to._setDisplayTimeLabelsArray();
		to._resetSourceFetch();
	
		if(!$.CalenStyle.extra.bTouchDevice)
		{
			var isWebKit = 'WebkitAppearance' in document.documentElement.style;
			if(isWebKit)
				iScrollbarWidth = 5;
			else
			{
				var eDiv = document.createElement('div');
				eDiv.innerHTML = "<div style='width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;'><div style='width:1px;height:100px;'></div></div>";
				eDiv = eDiv.firstChild;
				document.body.appendChild(eDiv);
				iScrollbarWidth = eDiv.offsetWidth - eDiv.clientWidth;
				document.body.removeChild(eDiv);
			}
			$(".calendarCont").addClass("calendarContWeb");
		}
		else
		{
			iScrollbarWidth = 2;
			$(".calendarCont").addClass("calendarContMobile");
		}



		to.setCurrentView(to.setting.visibleView, true);
	},

	// Public Method
	setCurrentView: function(sThisView, bLoadData)
	{
		var to = this;

		to.setting.visibleView = sThisView;
		
		var $oCalendarCont = $(to.elem).find(".calendarCont");
		$oCalendarCont.removeClass("cmvCalendarCont cdvCalendarCont cagvCalendarCont cqavCalendarCont");
		$oCalendarCont.html("");
		$oCalendarCont.css({"width": "100%", "height": "100%"});
		$oCalendarCont.removeClass("cmvCalendarContWithBorders");
	
		if(to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DetailedMonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
		{
			$oCalendarCont.addClass("cmvCalendarCont");
			if(!to.compareStrings(to.setting.visibleView, "DatePicker"))
				$oCalendarCont.addClass("cmvCalendarContWithBorders");
		}
		else if(to.compareStrings(to.setting.visibleView, "AgendaView"))
		{
			$oCalendarCont.addClass("cagvCalendarCont");
		
			if(!to.compareStrings(to.setting.agendaViewDuration, "Month"))
			{
				if(to.compareStrings(to.setting.agendaViewDuration, "Week"))
					to.tv.iNoVDay = 7;
				else if(to.compareStrings(to.setting.agendaViewDuration, "CustomDays"))
					to.tv.iNoVDay = to.setting.daysInAgendaView;
			
				if(to.tv.iNoVDay === 7 && to.setting.excludeNonBusinessHours)
					to.tv.iNoVDay -= (to.tv.iNoVDay - to.tv.iBsDays);
				to.tv.iNoVDayDis = to.tv.iNoVDay;
			}
		}
		else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
		{
			$oCalendarCont.addClass("cqavCalendarCont");

			if(to.compareStrings(to.setting.quickAgendaViewDuration, "Week"))
				to.tv.iNoVDay = 7;
			else if(to.compareStrings(to.setting.quickAgendaViewDuration, "CustomDays"))
				to.tv.iNoVDay = to.setting.daysInQuickAgendaView;
		
			if(to.tv.iNoVDay === 7 && to.setting.excludeNonBusinessHours)
				to.tv.iNoVDay -= (to.tv.iNoVDay - to.tv.iBsDays);
			to.tv.iNoVDayDis = to.tv.iNoVDay;
		}	
		else
		{
			$oCalendarCont.addClass("cdvCalendarCont");
		
			if(to.compareStrings(to.setting.visibleView, "WeekView"))
			{
				to.tv.iNoVDay = 7;
				if(to.tv.iNoVDay === 7 && to.setting.excludeNonBusinessHours)
					to.tv.iNoVDay -= (to.tv.iNoVDay - to.tv.iBsDays);
				to.tv.iNoVDayDis = to.tv.iNoVDay;
			}
			else if(to.compareStrings(to.setting.visibleView, "DayView"))
			{
				to.tv.iNoVDay = 1;
				to.tv.iNoVDayDis = 1;
			}
		}
	
		to.__getCurrentViewDates();
		to._addCommonView(bLoadData);
	},

	//--------------------------------- View Related Functions End ---------------------------------


	//--------------------------------- Header Related Functions Start ---------------------------------

	_addContHeader: function()
	{
		var to = this;
		var sTempStr = "",
		iTempIndex, sArrHeaderSections;

		/* Left Section */
		sTempStr += "<div class='cContHeaderSections cContHeaderSectionLeft'>";
		sArrHeaderSections = to.setting.headerSectionsList.left || [];
		for(iTempIndex = 0; iTempIndex < sArrHeaderSections.length; iTempIndex++)
		{
			sTempStr += to._addHeaderSections(sArrHeaderSections[iTempIndex]);
		}
		sTempStr += "</div>";

		/* Right Section */
		sTempStr += "<div class='cContHeaderSections cContHeaderSectionRight'>";
		sArrHeaderSections = to.setting.headerSectionsList.right || [];
		for(iTempIndex = 0; iTempIndex < sArrHeaderSections.length; iTempIndex++)
		{
			sTempStr += to._addHeaderSections(sArrHeaderSections[iTempIndex]);
		}
		sTempStr += "</div>";

		/* Center Section */
		sTempStr += "<div class='cContHeaderSections cContHeaderSectionCenter'>";
		sArrHeaderSections = to.setting.headerSectionsList.center || [];
		for(iTempIndex = 0; iTempIndex < sArrHeaderSections.length; iTempIndex++)
		{
			sTempStr += to._addHeaderSections(sArrHeaderSections[iTempIndex]);
		}
		sTempStr += "</div>";

		return sTempStr;
	},

	_addHeaderSections: function(sSectionName)
	{
		var to = this;
		var sTempStr = "", bFullscreen = to._isFullScreen();

		if(to.compareStrings(sSectionName, "DatePickerIcon"))
			sTempStr += to.setting.headerComponents.DatePickerIcon;
		else if(to.compareStrings(sSectionName, "FullscreenButton"))
			sTempStr += to.setting.headerComponents.FullscreenButton(bFullscreen);
		else if(to.compareStrings(sSectionName, "PreviousButton"))
			sTempStr += to.setting.headerComponents.PreviousButton;
		else if(to.compareStrings(sSectionName, "NextButton"))
			sTempStr += to.setting.headerComponents.NextButton;
		else if(to.compareStrings(sSectionName, "TodayButton"))
			sTempStr += to.setting.headerComponents.TodayButton;
		else if(to.compareStrings(sSectionName, "HeaderLabel"))
			sTempStr += to.setting.headerComponents.HeaderLabel;
		else if(to.compareStrings(sSectionName, "HeaderLabelWithDropdownMenuArrow"))
			sTempStr += to.setting.headerComponents.HeaderLabelWithDropdownMenuArrow;
		else if(to.compareStrings(sSectionName, "MenuSegmentedTab") && to.tv.bDisMenu)
			sTempStr += to.setting.headerComponents.MenuSegmentedTab;
		else if(to.compareStrings(sSectionName, "MenuDropdownIcon") && to.tv.bDisMenu)
			sTempStr += to.setting.headerComponents.MenuDropdownIcon;

		return sTempStr;
	},

	_updateViewSelectionMenu: function()
	{
		var to = this;
		var sTempStr = "",
		iTempIndex1;
		sTempStr += "<ul class='cContHeaderMenuSections'>";
	
		if(to.setting.dropdownMenuElements.length > 0 && to.compareStrings(to.setting.dropdownMenuElements[0], "DatePicker"))
			sTempStr += "<li id='cContHeaderMenuDatePicker' name='DatePicker' class='clickableLink'>Date Picker</li>";

		for(iTempIndex1 = 0; iTempIndex1 < to.setting.viewsToDisplay.length; iTempIndex1++)
		{
			var oViewToDisplay = to.setting.viewsToDisplay[iTempIndex1],
			sViewName = oViewToDisplay.viewName || "",
			sViewNameDisplay = oViewToDisplay.viewDisplayName || "";
		
			if(to.compareStrings(sViewNameDisplay, ""))
			{
				if(to.compareStrings(sViewName, "DetailedMonthView") || to.compareStrings(sViewName, "MonthView") || to.compareStrings(sViewName, "DatePicker"))
					sViewNameDisplay = "Month";
				else if(to.compareStrings(sViewName, "WeekView"))
					sViewNameDisplay = "Week";
				else if(to.compareStrings(sViewName, "DayView"))
					sViewNameDisplay = "Day";
				else if(to.compareStrings(sViewName, "QuickAgendaView"))
					sViewNameDisplay = "Quick Agenda";
				else if(to.compareStrings(sViewName, "AgendaView"))
					sViewNameDisplay = "Agenda";				
			}
		
			sTempStr += "<li id='"+("cContHeaderMenu"+sViewName)+"' name='" + sViewName + "' class='clickableLink'>" + sViewNameDisplay + "</li>";
		}

		if(to.setting.dropdownMenuElements.length > 1 && to.compareStrings(to.setting.dropdownMenuElements[1], "DatePicker"))
			sTempStr += "<li id='cContHeaderMenuDatePicker' name='DatePicker' class='clickableLink'>Date Picker</li>";

		sTempStr += "</ul>";
		return sTempStr;
	},

	_refreshHeader: function()
	{
		var to = this;
		if($(to.elem).find(".cContHeader").length > 0)
			$(".cContHeader").html(to._addContHeader());
		to._addMenuItemsInSegmentedTab();
		to._addEventsToHeaderElements();
		to._adjustViewSelectionMenu();
	},

	_addEventsToHeaderElements: function()
	{
		var to = this;
		if(!$.CalenStyle.extra.bTouchDevice)
		{
			$(to.elem).find(".cContHeaderButton").hover(
			
				function(e)
				{
					$(this).addClass("cContHeaderButtonsHover");
				},
				function(e)
				{
					$(this).removeClass("cContHeaderButtonsHover");
				}
			);
		}
	
		$(".cContHeaderMenuDropdown .cContHeaderMenuSections li").on($.CalenStyle.extra.sClickHandler, function(e)
		{			
  			e.stopPropagation();
		});
	
		$(to.elem).find(".cContHeaderPrevButton").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
			to.navigateToPrevView();
		});
		$(to.elem).find(".cContHeaderNextButton").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
			to.navigateToNextView();
		});
	
		$(to.elem).find(".cContHeaderToday").html(to.getNumberStringInFormat($.CalenStyle.extra.dToday.getDate(), 0, true));
		$(to.elem).find(".cContHeaderToday").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
			to.navigateToToday();
		});
	
		to._addEventsForMenu();
	
		$(to.elem).find(".cContHeaderMenuButton").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
			if($(to.elem).find(".cContHeaderMenuDropdown").length > 0)
				to._collapseSubmenu();
			else
				to._expandSubmenu();
		});
	
		$(to.elem).find(".cContHeaderDatePickerIcon").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();					
			to._showOrHideDatePicker();
		});

		if($(to.elem).find(".cContHeaderDropdownMenuArrow").length > 0)
		{
			if(to.setting.dropdownMenuElements.length == 1 && to.compareStrings(to.setting.dropdownMenuElements[0], "DatePicker"))
			{
				$(to.elem).find(".cContHeaderLabelOuter").on($.CalenStyle.extra.sClickHandler, function(e)
				{
					e.stopPropagation();					
					to._showOrHideDatePicker();
				});
			}
			for(var iTempIndex = 0; iTempIndex < to.setting.dropdownMenuElements.length; iTempIndex++)
			{
				if(to.compareStrings(to.setting.dropdownMenuElements[iTempIndex], "ViewsToDisplay"))
				{
					$(to.elem).find(".cContHeaderLabelOuter").on($.CalenStyle.extra.sClickHandler, function(e)
					{
						e.stopPropagation();						
						if($(to.elem).find(".cContHeaderMenuDropdown").length > 0)
							to._collapseSubmenu();
						else
							to._expandSubmenu();
					});
					break;
				}
			}
		}
	
		$(to.elem).find(".cContHeaderFullscreen").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();					
			to._toggleFullscreen();
		});

		if(to.setting.addEventHandlersInHeader)
			to.setting.addEventHandlersInHeader.call(to);
	},

	_addMenuItemsInSegmentedTab: function()
	{
		var to = this;
		$(to.elem).find(".cContHeaderMenuSegmentedTab").html(to._updateViewSelectionMenu());
	},

	_expandSubmenu: function()
	{
		var to = this,
		sTempStr = "";
	
		sTempStr += "<div class='cContHeaderMenuDropdownBg'>"
		sTempStr += "<div class='cContHeaderMenuDropdown'>";
		sTempStr += to._updateViewSelectionMenu();
		sTempStr += "</div>";
		sTempStr += "</div>";
	
		$(to.elem).find(".calendarContInner").append(sTempStr);
	
		if($(to.elem).find(".cContHeaderMenuDropdownBg").length > 0)
		{
			var iMainContLeft, iMainContTop, iMainContWidth, iMainContHeight;
			var $oContOuter = $(to.elem);
			var iMainLeftMargin = $oContOuter.css("margin-left");
			iMainLeftMargin = parseInt(iMainLeftMargin.replace("px", ""));
			var iMainTopMargin = $oContOuter.css("margin-top");
			iMainTopMargin = parseInt(iMainTopMargin.replace("px", ""));

			iMainContLeft = $oContOuter.position().left + iMainLeftMargin;
			iMainContTop = $oContOuter.position().top + iMainTopMargin;
			iMainContWidth = $oContOuter.width();
			iMainContHeight = $oContOuter.height();
			$(to.elem).find(".cContHeaderMenuDropdownBg").css({"left": iMainContLeft, "top": iMainContTop, "width": iMainContWidth, "height": iMainContHeight});
		
			var iDropdownLeft, iDropdownTop, iDropdownWidth, iDropdownMaxWidth;
			var $occcContHeaderMenuButton = $(to.elem).find(".cContHeaderMenuButton");
			var $occcContHeaderDropdownMenuArrow = $(to.elem).find(".cContHeaderDropdownMenuArrow");
			var iMainContMaxWidth = iMainContLeft + iMainContWidth;
			iDropdownWidth = $(to.elem).find(".cContHeaderMenuDropdown").width();
			if($occcContHeaderMenuButton.length > 0)
			{
				iDropdownLeft = $occcContHeaderMenuButton.position().left - 5 + $(to.elem).find(".calendarContInner").position().left;
			
				iDropdownMaxWidth = iMainContLeft + iDropdownLeft + iDropdownWidth;
				if(iDropdownMaxWidth > iMainContMaxWidth)
					iDropdownLeft = iMainContWidth - iDropdownWidth - 5;
				iDropdownTop = $occcContHeaderMenuButton.height() + 5 + $(to.elem).find(".calendarContInner").position().top + (to.compareStrings(to.setting.sectionsList[0], "ActionBar") ? $(to.elem).find(".cActionBar").height() : 0);
			
				$(".cContHeaderMenuDropdown").css({"left": iDropdownLeft, "top": iDropdownTop});
			}
			else if($occcContHeaderDropdownMenuArrow.length > 0)
			{
				var $occCContHeaderLabel = $(to.elem).find(".cContHeaderLabelOuter");
				iContHeaderLabelWidth = $occCContHeaderLabel.width(),
				iContHeaderLabelLeft = $occCContHeaderLabel.position().left,
				iContHeaderLabelMid = iContHeaderLabelLeft + (iContHeaderLabelWidth/2),
				iDropdownWidthHalf = iDropdownWidth/2;

				iDropdownLeft = iContHeaderLabelMid - iDropdownWidthHalf;
				if(iDropdownLeft < 0)
					iDropdownLeft = 5;
				iDropdownMaxWidth = iDropdownLeft + iDropdownWidth;
				if(iDropdownMaxWidth > iMainContMaxWidth)
					iDropdownLeft = iMainContWidth - iDropdownWidth - 5;
			
				iDropdownTop = $(to.elem).find(".cContHeaderLabelOuter").height() + $(to.elem).find(".calendarContInner").position().top + (to.compareStrings(to.setting.sectionsList[0], "ActionBar") ? $(to.elem).find(".cActionBar").height() : 0);
			
				$(".cContHeaderMenuDropdown").css({"left": iDropdownLeft, "top": iDropdownTop});
			}
		}		
	
		to._addEventsForMenu();
	},

	_collapseSubmenu: function()
	{
		var to = this;
		var $occCContHeaderMenuDropdown = $(to.elem).find(".cContHeaderMenuDropdownBg");
		if($occCContHeaderMenuDropdown.length > 0)
		{
			$occCContHeaderMenuDropdown.hide();
			setTimeout(function()
			{
				$occCContHeaderMenuDropdown.remove();
			}, 300);			
		}
	},

	_addEventsForMenu: function()
	{
		var to = this;
		var sDarkColor = "#FF3B30", sLightColor =  "#FFFFFF";
	
		$(to.elem).find(".cContHeaderMenuSegmentedTab .cContHeaderMenuSections li").css({"color": sDarkColor, "background": sLightColor});
		$(to.elem).find(".cContHeaderMenuSegmentedTab #cContHeaderMenu"+to.setting.visibleView).css({"color": sLightColor, "background": sDarkColor});
	
		$(to.elem).find(".cContHeaderMenuDropdownBg .cContHeaderMenuSections li").removeClass("cSelectedMenu");
		$(to.elem).find(".cContHeaderMenuDropdownBg #cContHeaderMenu"+to.setting.visibleView).addClass("cSelectedMenu");
	
		$(to.elem).find(".cContHeaderMenuSections li").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
		
			var sViewName = $(this).attr("name");
			if(!to.compareStrings(sViewName, "DatePicker"))
			{
				$(to.elem).find("#cContHeaderMenu"+sViewName).css({"background": sDarkColor, "color": sLightColor});
				to.setCurrentView(sViewName, false);
			
				if(to.setting.visibleViewChanged)
					to.setting.visibleViewChanged.call(to, to.setting.visibleView, to.setting.selectedDate, to.tv.dAVDt);
				to._reloadDatePickerContent();
			}
			else
			{
				to._collapseSubmenu();
				to._showOrHideDatePicker();
			}
		});
	
		if(!$.CalenStyle.extra.bTouchDevice)
		{
			$(to.elem).find(".cContHeaderMenuSegmentedTab .cContHeaderMenuSections li").hover(
			
				function(e)
				{
					var sId = $(this).attr("id");
					sId = sId.replace("cContHeaderMenu", "");
					if(! to.compareStrings(sId, to.setting.visibleView))
						$(this).css({"background": sDarkColor, "color": sLightColor});
				},
			
				function(e)
				{
					var sId = $(this).attr("id");
					sId = sId.replace("cContHeaderMenu", "");
					if(! to.compareStrings(sId, to.setting.visibleView))
						$(this).css({"background": sLightColor, "color": sDarkColor});
				}
			);

			$(to.elem).find(".cContHeaderMenuDropdownBg .cContHeaderMenuSections li").hover(
			
				function(e)
				{
					var sId = $(this).attr("id");
					sId = sId.replace("cContHeaderMenu", "");
					if(! to.compareStrings(sId, to.setting.visibleView))
						$(this).addClass("cContHeaderButtonHover");
				},
			
				function(e)
				{
					var sId = $(this).attr("id");
					sId = sId.replace("cContHeaderMenu", "");
					if(! to.compareStrings(sId, to.setting.visibleView))
						$(this).removeClass("cContHeaderButtonHover");
				}
			);
		}
	
		if(!to.compareStrings(to.setting.visibleView, "DatePicker"))
			to._addDatePicker();
	},

	// Public Method
	navigateToToday: function()
	{
		var to = this;

		to.setting.selectedDate = to.setDateInFormat({"date": to._getCurrentDate()}, "START");
		to.reloadData();
	
		if(to.setting.todayButtonClicked)
			to.setting.todayButtonClicked.call(to, to.setting.selectedDate, to.tv.dAVDt);
		to._reloadDatePickerContent();
	
		if(to.compareStrings(to.setting.visibleView, "DatePicker"))
			to.__highlightDaysInDatePicker();
		else if(to.compareStrings(to.setting.visibleView, "MonthView"))
		{
			if(to.compareStrings(to.setting.actionOnDayClickInMonthView, "ChangeDate"))
				to.__highlightDaysInDatePicker();
		}
	},

	// Public Method
	navigateToPrevView: function()
	{
		var to = this;
		$(to.elem).find(".cListOuterCont").html("");

		if(to.compareStrings(to.setting.visibleView, "DetailedMonthView") || to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
			to.__goToPrevMonthView();
		else if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView"))
			to.__goToPrevDetailView();
		else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
			to.__goToPrevQuickAgendaView();
		else if(to.compareStrings(to.setting.visibleView, "AgendaView"))
			to.__goToPrevAgendaView();
	
		if(to.setting.previousButtonClicked)
			to.setting.previousButtonClicked.call(to, to.setting.selectedDate, to.tv.dAVDt);
		to._reloadDatePickerContent();
	
		if(to.compareStrings(to.setting.visibleView, "DatePicker"))
			to.__highlightDaysInDatePicker();
		else if(to.compareStrings(to.setting.visibleView, "MonthView"))
		{
			if(to.compareStrings(to.setting.actionOnDayClickInMonthView, "ChangeDate"))
				to.__highlightDaysInDatePicker();
		}
	},

	// Public Method
	navigateToNextView: function()
	{
		var to = this;
		$(to.elem).find(".cListOuterCont").html("");

		if(to.compareStrings(to.setting.visibleView, "DetailedMonthView") || to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
			to.__goToNextMonthView();
		else if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView"))
			to.__goToNextDetailView();
		else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
			to.__goToNextQuickAgendaView();
		else if(to.compareStrings(to.setting.visibleView, "AgendaView"))
			to.__goToNextAgendaView();
	
		if(to.setting.nextButtonClicked)
			to.setting.nextButtonClicked.call(to, to.setting.selectedDate, to.tv.dAVDt);
		to._reloadDatePickerContent();
	
		if(to.compareStrings(to.setting.visibleView, "DatePicker"))
			to.__highlightDaysInDatePicker();
		else if(to.compareStrings(to.setting.visibleView, "MonthView"))
		{
			if(to.compareStrings(to.setting.actionOnDayClickInMonthView, "ChangeDate"))
				to.__highlightDaysInDatePicker();
		}
	},

	// Public Method
	getVisibleDates: function()
	{
		var to = this;
		return to.tv.dAVDt;
	},

	_adjustViewSelectionMenu: function()
	{
		var to = this;
		var iTempIndex, oListElem;
		if($(to.elem).find(".cContHeaderMenuSegmentedTab").length > 0)
		{
			var oMenuList = $(to.elem).find(".cContHeaderMenuSections li");
		
			var iMaxWidth = 0;
			for(iTempIndex = 0; iTempIndex < oMenuList.length; iTempIndex++)
			{
				oListElem = oMenuList[iTempIndex];
				var iListElemWidth = $(oListElem).width();
				iMaxWidth = (iListElemWidth > iMaxWidth) ? iListElemWidth : iMaxWidth;
			}
			iMaxWidth += 25;
		
			for(iTempIndex = 0; iTempIndex < oMenuList.length; iTempIndex++)
			{
				oListElem = oMenuList[iTempIndex];
				$(oListElem).css({"width": iMaxWidth});
			}
		}
	
		to._adjustDatePicker();
	},

	_addDatePicker: function()
	{
		var to = this;
		var bDatePickerIconAdded = $(to.elem).find(".cContHeaderDatePickerIcon").length > 0,
		bDatePickerArrowAdded = $(to.elem).find(".cContHeaderDropdownMenuArrow").length > 0,
		bMenuAdded = $(to.elem).find(".cContHeaderMenuButton").length > 0,
		bAddDatePicker = ((to.setting.dropdownMenuElements.length > 0 && to.compareStrings(to.setting.dropdownMenuElements[0], "DatePicker")) || (to.setting.dropdownMenuElements.length > 1 && to.compareStrings(to.setting.dropdownMenuElements[1], "DatePicker"))),
		bDatePickerButtonAdded = bDatePickerIconAdded || ((bDatePickerArrowAdded || bMenuAdded) && bAddDatePicker),
		bDisplayDatePicker = (bDatePickerButtonAdded && to.setting.addEventsInMonthView && (!to.compareStrings(to.setting.visibleView, "DatePicker") && !to.compareStrings(to.setting.actionOnDayClickInMonthView, "ChangeDate")));
	
		if(bDisplayDatePicker && $(".cElemDatePickerBg").length === 0)
		{
			var sTempStr = "";
			sTempStr += "<div class='cElemDatePickerBg'>";
			sTempStr += "<div class='cElemDatePickerCont'>";
			if(bDatePickerIconAdded)
				sTempStr += "<span class='cElemDatePickerTooltip cElemDatePickerTooltipBottom'></span>";
			sTempStr += "<div class='cElemDatePicker'>";
			sTempStr += "</div>";
			sTempStr += "</div>";
			sTempStr += "</div>";
			$(to.elem).parent().append(sTempStr);
		
			$(".cElemDatePicker").CalenStyle(
			{
				visibleView: "DatePicker",

				headerSectionsList: {
					left: ["TodayButton"],
					center: ["HeaderLabel"],
					right: ["PreviousButton", "NextButton"]
				},
			
				transitionSpeed: 0,
			
				selectedDate: to.setting.selectedDate,
			
				shortDayNames: to.setting.veryShortDayNames,
			
				shortMonthNames:  to.setting.shortMonthNames,
			
				fullMonthNames:  to.setting.shortMonthNames,
			
				numbers: to.setting.numbers,
			
				businessHoursSource: to.setting.businessHoursSource,

				inputTZOffset: to.setting.inputTZOffset,

				outputTZOffset: to.setting.outputTZOffset,

				parentObject: to,
			
				initialize: function()
				{
					to.setting.datePickerObject = this;
				},
			
				viewLoaded: function(selectedDate, highlightDates)
				{
					to.setting.datePickerObject.highlightDatesInDatePicker(to.tv.dAVDt);
				},
			
				dayClicked: function(selectedDate, pClickedAt)
				{
					to.setting.selectedDate = selectedDate;
					to.reloadData();
					to.setting.datePickerObject.highlightDatesInDatePicker(to.tv.dAVDt);
					to._showOrHideDatePicker();
				},

				calDataSource: to.setting.datePickerCalDataSource
			});
		
			$(".cElemDatePickerBg").on($.CalenStyle.extra.sClickHandler, function(e)
			{
				e.preventDefault();
				to._hideDatePicker();
			});
		
			$(".cElemDatePicker, .cElemDatePicker *").on($.CalenStyle.extra.sClickHandler, function(e)
			{
				e.stopPropagation();
			});
		
			$(".cElemDatePickerBg *").on($.CalenStyle.extra.sClickHandler, function(e)
			{
				e.stopPropagation();
			});
		}
	},

	_showOrHideDatePicker: function()
	{
		var to = this;
		if($(".cElemDatePickerBg").css("display") === "none")
		{
			if($(".cElemDatePickerBg").css("display") === "none")
				$(".cElemDatePickerBg").show();
			if(to.setting.adjustViewOnWindowResize)	
				$(window).bind("resize.CSDP", function(e){ to._adjustDatePicker(); });
			to._reloadDatePickerContent();
			to._adjustDatePicker();
		}
		else
			to._hideDatePicker();
	},

	_hideDatePicker: function()
	{
		var to = this;
		if($(".cElemDatePickerBg").css("display") !== "none")
			$(".cElemDatePickerBg").hide();
		if(to.setting.adjustViewOnWindowResize)	
			$(window).unbind("resize.CSDP", to._adjustDatePicker);
	},

	_reloadDatePickerContent: function()
	{
		var to = this;
		var bDatePickerIconAdded = $(to.elem).find(".cContHeaderDatePickerIcon").length > 0,
		bDatePickerArrowAdded = $(to.elem).find(".cContHeaderDropdownMenuArrow").length > 0,
		bMenuAdded = $(to.elem).find(".cContHeaderMenuButton").length > 0,
		bAddDatePicker = ((to.setting.dropdownMenuElements.length > 0 && to.compareStrings(to.setting.dropdownMenuElements[0], "DatePicker")) || (to.setting.dropdownMenuElements.length > 1 && to.compareStrings(to.setting.dropdownMenuElements[1], "DatePicker"))),
		bDatePickerButtonAdded = bDatePickerIconAdded || ((bDatePickerArrowAdded || bMenuAdded) && bAddDatePicker);
		if(bDatePickerButtonAdded && to.setting.datePickerObject !== null)
		{
			to.setting.datePickerObject.setting.selectedDate = to.setting.selectedDate;
			to.setting.datePickerObject.reloadData();
			to.setting.datePickerObject.highlightDatesInDatePicker(to.tv.dAVDt);
		}
		to._adjustDatePicker();
	},

	_adjustDatePicker: function()
	{
		var to = this;

		var iMainContLeft, iMainContTop, iMainContWidth, iMainContHeight;
		if(!to.compareStrings(to.setting.visibleView, "DatePicker"))
		{
			var $oContOuter = $(to.elem);
			var iMainLeftMargin = $oContOuter.css("margin-left");
			iMainLeftMargin = parseInt(iMainLeftMargin.replace("px", ""));
			var iMainTopMargin = $oContOuter.css("margin-top");
			iMainTopMargin = parseInt(iMainTopMargin.replace("px", ""));

			iMainContLeft = $oContOuter.position().left + iMainLeftMargin;
			iMainContTop = $oContOuter.position().top + iMainTopMargin;
			iMainContWidth = $oContOuter.width();
			iMainContHeight = $oContOuter.height();
			$(".cElemDatePickerBg").css({"left": iMainContLeft, "top": iMainContTop, "width": iMainContWidth, "height": iMainContHeight});
		}

		var iElemDatePickerLeft, iElemDatePickerTop, iElemDatePickerWidth, iElemDatePickerMaxWidth;
		var $occcContHeaderDatePickerIcon = $(to.elem).find(".cContHeaderDatePickerIcon");
		var $occcContHeaderDropdownMenuArrow = $(to.elem).find(".cContHeaderDropdownMenuArrow");
		var $occcContHeaderMenu = $(to.elem).find(".cContHeaderMenuButton");
		var iMainContMaxWidth = iMainContLeft + iMainContWidth;
		iElemDatePickerWidth = $(".cElemDatePickerCont").width();
		if($occcContHeaderDatePickerIcon.length > 0)
		{
			iElemDatePickerLeft = $occcContHeaderDatePickerIcon.position().left - 5 + $(to.elem).find(".calendarContInner").position().left;
		
			iElemDatePickerMaxWidth = iMainContLeft + iElemDatePickerLeft + iElemDatePickerWidth;
			if(iElemDatePickerMaxWidth > iMainContMaxWidth)
				iElemDatePickerLeft = iMainContWidth - iElemDatePickerWidth - 5;
			iElemDatePickerTop = $occcContHeaderDatePickerIcon.height() + 5 + $(to.elem).find(".calendarContInner").position().top + (to.compareStrings(to.setting.sectionsList[0], "ActionBar") ? $(to.elem).find(".cActionBar").height() : 0);
		
			$(".cElemDatePickerCont").css({"left": iElemDatePickerLeft, "top": iElemDatePickerTop});
		
			iDatePickerIconLeft = $occcContHeaderDatePickerIcon.position().left + ($occcContHeaderDatePickerIcon.width()/2);
			iElemDatePickerMaxWidth = iElemDatePickerLeft + iElemDatePickerWidth;
			$(".cElemDatePickerTooltipBottom").css({"left": (iDatePickerIconLeft - iElemDatePickerLeft - 7)});
		}
		else if($occcContHeaderDropdownMenuArrow.length > 0 || $occcContHeaderMenu.length > 0)
		{
			var $occCContHeaderLabel = $(to.elem).find(".cContHeaderLabelOuter");
			iContHeaderLabelWidth = $occCContHeaderLabel.width(),
			iContHeaderLabelLeft = $occCContHeaderLabel.position().left,
			iContHeaderLabelMid = iContHeaderLabelLeft + (iContHeaderLabelWidth/2),
			iElemDatePickerWidthHalf = iElemDatePickerWidth/2;

			if(iMainContWidth > 410)
			{
				iElemDatePickerLeft = iContHeaderLabelMid - iElemDatePickerWidthHalf;
				if(iElemDatePickerLeft < 0)
					iElemDatePickerLeft = 5;
				iElemDatePickerMaxWidth = iElemDatePickerLeft + iElemDatePickerWidth;
				if(iElemDatePickerMaxWidth > iMainContMaxWidth)
					iElemDatePickerLeft = iMainContWidth - iElemDatePickerWidth - 5;
			}
			else
			{
				iElemDatePickerLeft = iMainContLeft + (iMainContWidth - iElemDatePickerWidth)/2;
			}
		
			iElemDatePickerTop = $(to.elem).find(".cContHeaderLabelOuter").height() + 12 + $(to.elem).find(".calendarContInner").position().top + (to.compareStrings(to.setting.sectionsList[0], "ActionBar") ? $(to.elem).find(".cActionBar").height() : 0);
		
			$(".cElemDatePickerCont").css({"left": iElemDatePickerLeft, "top": iElemDatePickerTop});
		}
	},

	_isFullScreen: function()
	{
		var to = this;
		return $(to.elem).hasClass("cFullscreenCont");
	},

	_toggleFullscreen: function()
	{
		var to = this;
		if(to._isFullScreen())
		{
			$(to.elem).removeClass("cFullscreenCont");
			if(to.tv.iCalHeight !== 0)
				$(to.elem).css({"height": to.tv.iCalHeight});
		}
		else
			$(to.elem).addClass("cFullscreenCont");
		to._adjustViews();
	},

	__adjustHeader: function()
	{	
		var to = this;		
		if(to._isFullScreen())
			$(to.elem).find(".cContHeaderFullscreen").removeClass("icon-Expand").addClass("icon-Contract");
		else
			$(to.elem).find(".cContHeaderFullscreen").removeClass("icon-Contract").addClass("icon-Expand");
	
		var $occCalendarContInner = $(to.elem).find(".calendarContInner"),
		iCalendarContWidth = $occCalendarContInner.outerWidth(),
		iCalendarContHeight = $occCalendarContInner.outerHeight();
	
		if(iCalendarContWidth > 410 || iCalendarContHeight > 410)
			$(to.elem).find(".cContHeader, .cContHeaderSections, .cContHeaderDatePickerIcon, .cContHeaderFullscreen, .cContHeaderNavButton").css({"height": 45, "line-height": 45+"px"});
		else
			$(to.elem).find(".cContHeader, .cContHeaderSections, .cContHeaderDatePickerIcon, .cContHeaderFullscreen, .cContHeaderNavButton").css({"height": 45, "line-height": 45+"px"});
	},

	//--------------------------------- Header Related Functions Start ---------------------------------

	//----------------------------- Common View Related Functions Start -----------------------------

	_addCommonView: function(bLoadData)
	{
		var to = this;
	
		var bFirstSection = true,
		iSectionTopPos = 0,
		$occCalendarCont = $(to.elem).find(".calendarCont"),
		iTempCalendarContInnerLeft = 0, iTempCalendarContInnerTop = 0,
		iTempCalendarContInnerWidth = 0, iTempCalendarContInnerHeight = 0,
		sTempStr = "";
	
		sTempStr += "<div class='calendarContInner' style='left: " + iTempCalendarContInnerLeft + "px; top: " + iTempCalendarContInnerTop + "px; width: " + iTempCalendarContInnerWidth + "px; height: " + iTempCalendarContInnerHeight + "px;'></div>"; 
		$occCalendarCont.append(sTempStr);
	
		sTempStr = "";
		for(var iTempIndex = 0; iTempIndex < to.setting.sectionsList.length; iTempIndex++)
		{
			var sSectionName = to.setting.sectionsList[iTempIndex];
		
			if(to.compareStrings(sSectionName, "Header"))
			{
				if(!bFirstSection)
					iSectionTopPos -= 1;
				else
					bFirstSection = false;
			
				sTempStr += "<div class='cContHeader' style='top: " + iSectionTopPos + "px;'>";
				sTempStr += to._addContHeader(iSectionTopPos);
				sTempStr += "</div>";
			}
			else if(to.compareStrings(sSectionName, "Calendar"))
			{
				if(!bFirstSection)
					iSectionTopPos -= 1;
				else
					bFirstSection = false;
			
				if(to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
				{
					iSectionTopPos -= 2;
					sTempStr += "<table class='cTable cmvMonthTable cmvMonthTableMain' cellspacing='0' style='top: " + iSectionTopPos + "px;'></table>";
				}
				else if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
				{
					sTempStr += "<div class='cmvTableContainerOuter'>";
				
					if(to.setting.fixedHeightOfDetailedMonthView)
						sTempStr += "<div class='cmvTableContainer' style='overflow-x: hidden; overflow-y: auto;'>";
					else
						sTempStr += "<div class='cmvTableContainer' style='overflow: hidden;'>";
				
					sTempStr += "<table class='cTable cmvMonthTable cmvMonthTableMain' cellspacing='0'></table>";
				
					if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
						sTempStr += "<div class='cdmvEventCont cdmvEventContMain'></div>";
				
					sTempStr += "</div>";
				
					sTempStr += "</div>";
				}
				else if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView"))
				{
					if(to.setting.sectionsList.length === 2)
						iSectionTopPos -= 3;
					else
						iSectionTopPos -= 2;
				
					sTempStr += "<table class='cTable cdvDetailTable cdvDetailTableMain' cellspacing='0' style='top: " + iSectionTopPos + "px;'></table>";
				
					sTempStr += "<div class='cdvContRow2 cdvContRow2Main'></div>";
					sTempStr += "<div class='cdvContRow3 cdvContRow3Main'></div>";
				
					iSectionTopPos -= 1;
				}
				else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
				{
					if(to.setting.sectionsList.length === 2)
						iSectionTopPos -= 3;
					else
						iSectionTopPos -= 2;
					
				
					sTempStr += "<table class='cTable cqavTable cqavTableMain' cellspacing='0' style='top: " + iSectionTopPos + "px;'></table>";
				
					sTempStr += "<div class='cqavContRow2 cqavContRow2Main'></div>";
				
					iSectionTopPos -= 1;
				}
			}
		}
	
		if(to.compareStrings(to.setting.visibleView, "AgendaView"))
		{
			if(!bFirstSection)
				iSectionTopPos -= 2;
		
			sTempStr += "<div class='cListOuterCont' style='top: " + iSectionTopPos + "px;'></div>";
		}
	
		$(to.elem).find(".calendarContInner").append(sTempStr);
	
		to._addMenuItemsInSegmentedTab();
		to._addEventsToHeaderElements();
		to._adjustViewSelectionMenu();
		if(bLoadData)
			to.reloadData();
		else
			to.__reloadCurrentView(true, false);
	
		$(document).on($.CalenStyle.extra.sClickHandler+".CalenStyle", function(e){to._callCommonEvents();});
	},

	// Public Method
	refreshView: function()
	{
		var to = this;
	
		to.tv.oAEvents = to._sortEvents(to.tv.oAEvents);
		to._refreshHeader();
		to.__reloadCurrentView(true, false);
	},

	_adjustViews: function()
	{
		var to = this;
	
		if(to.compareStrings(to.setting.visibleView, "DetailedMonthView") || to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
			to.adjustMonthTable();
		else if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView"))
			to.__adjustDetailViewTable(0);
		else if(to.compareStrings(to.setting.visibleView, "AgendaView"))
			to.adjustAgendaView();
		else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
			to.__adjustQuickAgendaView();
	},

	__reloadCurrentView: function(bLoadAll, bLoadAllData)
	{
		var to = this;
	
		if(to.setting.adjustViewOnWindowResize)	
			$(window).unbind("resize." + to.tv.pluginId);
	
		to.__getCurrentViewDates();
	
		if(to.compareStrings(to.setting.visibleView, "DetailedMonthView") || to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
		{
			to.updateMonthTableAndContents(bLoadAllData);
		
			if(to.setting.adjustViewOnWindowResize)	
				$(window).bind("resize." + to.tv.pluginId, function(e){to.adjustMonthTable();});
		}
		else if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView"))
		{
			if(bLoadAll)
			{
				$(to.elem).find(".cdvContRow2Main").html("");
				$(to.elem).find(".cdvContRow3Main").html("");
			
				to.__updateDetailViewTable();
				to.__adjustDetailViewTable(1);
			
				to.__parseData(bLoadAllData, function()
				{
					to.__updateTimeSlotTableView();
					to.__addEventsInDetailView("Both");
					to.__adjustDetailViewTable(1);
					to.__adjustDetailViewTable(0);
				
					if(to.setting.adjustViewOnWindowResize)	
						$(window).bind("resize." + to.tv.pluginId, function(e){to.__adjustDetailViewTable();});
				});
			}
		}
		else if(to.compareStrings(to.setting.visibleView, "AgendaView"))
		{
			to.updateAgendaView(bLoadAllData);
			to.adjustAgendaView();
		
			if(to.setting.adjustViewOnWindowResize)	
				$(window).bind("resize." + to.tv.pluginId, function(e){to.adjustAgendaView();});
		}
		else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
		{
			$(to.elem).find(".cqavContRow2Main").html("");
		
			to.__updateQuickAgendaView();
			to.__adjustQuickAgendaView();
		
			to.__parseData(bLoadAllData, function()
			{
				to.__addEventsInQuickAgendaView();
				to.__adjustQuickAgendaView();
			
				if(to.setting.adjustViewOnWindowResize)
					$(window).bind("resize." + to.tv.pluginId, function(e){to.__adjustQuickAgendaView();});
			});
		}
	
		if(! to.tv.bViewLoaded)
		{
			if(to.setting.viewLoaded)
				to.setting.viewLoaded.call(to, to.setting.selectedDate, to.tv.dAVDt);
			to.tv.bViewLoaded = true;
		}
	},
		
	__adjustFontSize: function()
	{
		var to = this;
	
		var $occCalendarContInner = $(to.elem).find(".calendarContInner"),
		iCalendarContWidth = $occCalendarContInner.outerWidth(),
		iCalendarContHeight = $occCalendarContInner.outerHeight(),
	
		sFontClasses = "cFontLarge cFontMedium cFontSmall cFontExtraSmall";
	
		if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView") || to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
		{
			if(iCalendarContWidth <= 360 || iCalendarContHeight <= 360)
				$occCalendarContInner.removeClass(sFontClasses).addClass("cFontSmall");
			else if(iCalendarContWidth <= 710)
				$occCalendarContInner.removeClass(sFontClasses).addClass("cFontMedium");
			else
				$occCalendarContInner.removeClass(sFontClasses).addClass("cFontLarge");
		}
		else if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
		{
			if(iCalendarContWidth <= 310 || iCalendarContHeight <= 310)
				$occCalendarContInner.removeClass(sFontClasses).addClass("cFontSmall");
			else if(iCalendarContWidth <= 410 || iCalendarContHeight <= 410)
				$occCalendarContInner.removeClass(sFontClasses).addClass("cFontMedium");
			else
				$occCalendarContInner.removeClass(sFontClasses).addClass("cFontLarge");
		}
		else if(to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
		{
			if(iCalendarContWidth <= 310 || iCalendarContHeight <= 310)
				$occCalendarContInner.removeClass(sFontClasses).addClass("cFontSmall");
			else if(iCalendarContWidth <= 410 || iCalendarContHeight <= 410)
				$occCalendarContInner.removeClass(sFontClasses).addClass("cFontMedium");
			else
				$occCalendarContInner.removeClass(sFontClasses).addClass("cFontLarge");
		}
	},

	// Public Method
	setCalendarBorderColor: function()
	{
		var to = this;
	
		if(to.setting.changeCalendarBorderColorInJS)
		{
			var sCalendarBorderColor, sTemp = "";
			if(to.compareStrings(to.setting.calendarBorderColor, "transparent"))
				sCalendarBorderColor = to.setting.calendarBorderColor;
			else
				sCalendarBorderColor = "#" + to.setting.calendarBorderColor;
		
			sTemp += ".calendarCont";
			sTemp += ", .calendarContInner";
		
			$(".cElemDatePickerTooltipBottom").css({"border-color": "transparent transparent "+ sCalendarBorderColor + " transparent"});
		
			if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView"))
			{
				sTemp += ", .cdvCalendarCont td";
				sTemp += ", .cdvDetailTable";
			}
			else if(to.compareStrings(to.setting.visibleView, "DetailedMonthView") || to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
			{
				sTemp += ", .cmvCalendarContWithBorders"+ " td";
				sTemp += ", .cmvThinBorderTop";
				sTemp += ", .cmvThinBorderRight";
				sTemp += ", .cmvThinBorderBottom";
				sTemp += ", .cmvThinBorderLeft";
				sTemp += ", .cmvThinBorder";
			}
			else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
			{
				sTemp += ", .cqavCalendarCont td";
				sTemp += ", .cqavTable";
			}
		
			sTemp += ", .cContHeader";
			sTemp += ", .cListOuterCont";
			sTemp += ", .cmlvThinBorder";
			sTemp += ", .cylvThinBorder";
			
			$(to.elem).find(sTemp).css({"border-color": sCalendarBorderColor});
		}
	},

	//----------------------------- Common View Related Functions End -----------------------------

	//------------------------------- Date Manipulation Functions Start -------------------------------

	// Public Method
	setDateInFormat: function(oInput, sType)
	{
		var to = this;
	
		if(oInput.date === undefined && oInput.iDate === undefined)
			oInput.date = to._getCurrentDate();
		if(oInput.iDate === undefined)
		{
			oInput.iDate = {
				d: oInput.date.getDate(),
				M: oInput.date.getMonth(),
				y: oInput.date.getFullYear(),
				H: oInput.date.getHours(),
				m: oInput.date.getMinutes(),
				s: oInput.date.getSeconds(),
				ms: oInput.date.getMilliseconds()
			};
		}
		else
		{
			oInput.iDate = {
				d: (oInput.iDate.d !== undefined) ? oInput.iDate.d : $.CalenStyle.extra.dToday.getDate(),
				M: (oInput.iDate.M !== undefined) ? oInput.iDate.M : $.CalenStyle.extra.dToday.getMonth(),
				y: (oInput.iDate.y !== undefined) ? oInput.iDate.y : $.CalenStyle.extra.dToday.getFullYear(),
				H: (oInput.iDate.H !== undefined) ? oInput.iDate.H : 0,
				m: (oInput.iDate.m !== undefined) ? oInput.iDate.m : 0,
				s: (oInput.iDate.s !== undefined) ? oInput.iDate.s : 0,
				ms: (oInput.iDate.ms !== undefined) ? oInput.iDate.ms : 0
			};
		}
	
		var dDate;
		if(sType === null || sType === undefined || sType === "")
			dDate = new Date(oInput.iDate.y, oInput.iDate.M, oInput.iDate.d, oInput.iDate.H, oInput.iDate.m, oInput.iDate.s, oInput.iDate.ms);
		else if(sType === "START")
			dDate = new Date(oInput.iDate.y, oInput.iDate.M, oInput.iDate.d, 0, 0, 0, 0);
		else if(sType === "END")
			dDate = new Date(oInput.iDate.y, oInput.iDate.M, oInput.iDate.d, 23, 59, 59, 999);
	
		return dDate;
	},

	_getCurrentDate: function()
	{
		var to = this;	
		return to.getDateByAddingOutputTZOffset(to.convertToUTC(new Date()), to.setting.outputTZOffset);
	},

	// Public Method
	convertToUTC: function(dIpDate, sIpTZOffset)
	{
		var to = this;	
		return new Date(dIpDate.getTime() - ((sIpTZOffset === undefined || sIpTZOffset === "" || sIpTZOffset === null) ? -(dIpDate.getTimezoneOffset() * $.CalenStyle.extra.iMS.m) : to._getTZOffsetInMS(sIpTZOffset)));
	},

	_getTZOffsetInMS: function(sTZOffset)
	{
		var to = this;
	
		var iOffsetMS = 0;
		if(sTZOffset === undefined || sTZOffset === "" || sTZOffset === null)
			iOffsetMS = -($.CalenStyle.extra.dToday.getTimezoneOffset() * $.CalenStyle.extra.iMS.m);
		else
		{
			var sArrTZOffset = sTZOffset.match(/^([+|-]{1})([0-1]{0,1}[0-9]{1}):([0-6]{0,1}[0-9]{1})$/);
			iOffsetMS = parseInt(sArrTZOffset[2]) * $.CalenStyle.extra.iMS.h + parseInt(sArrTZOffset[3]) * $.CalenStyle.extra.iMS.m;
			iOffsetMS = (sArrTZOffset[1]==="+") ? iOffsetMS : -iOffsetMS;
		}
		return iOffsetMS;
	},

	// Public Method
	getDateByAddingOutputTZOffset: function(dIpDate, sOpTZOffset)
	{
		var to = this;			
		return new Date(dIpDate.getTime() + to._getTZOffsetInMS(sOpTZOffset));
	},

	// Public Method
	normalizeDateTimeWithOffset: function(dIpDate, sIpTZOffset, sOpTZOffset)
	{
		var to = this;			
		return to.getDateByAddingOutputTZOffset(to.convertToUTC(dIpDate, sIpTZOffset), sOpTZOffset);
	},

	_getDateObjectFromString: function(sDate, bIsAllDay, inputDateTimeFormat, formatSeparatorDateTime, formatSeparatorDate, formatSeparatorTime, sIpTZOffset)
	{
		var to = this;
		var toClass = {}.toString;
		var sDateType = toClass.call(sDate);

		var dTempDate;
		if(sDateType === "[object Date]")
			dTempDate = (bIsAllDay ? to.convertToUTC(sDate, sIpTZOffset) : to.normalizeDateTimeWithOffset(sDate, sIpTZOffset, to.setting.outputTZOffset));
		else if(sDateType === "[object Number]")
			dTempDate = (bIsAllDay ? to.convertToUTC(new Date(sDate), "") : to.getDateByAddingOutputTZOffset(new Date(sDate), to.setting.outputTZOffset));
		else
		{
			var iDay = 0, iMonth = 0, iYear = 0, iHours = 0, iMinutes = 0, iSeconds = 0, iMilliSeconds = 0;
		
			var sArrDate8601Date = sDate.match(/^([0-9]{4})(-([0-1]{1}[0-9]{1}))(-([0-3]{1}[0-9]{1}))$/);
			var sArrDate8601 = sDate.match(/^([0-9]{4})(-([0-1]{1}[0-9]{1})(-([0-3]{1}[0-9]{1})([T]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
			var sArrDate8601Compact = sDate.match(/^([0-9]{4})(([0-1]{1}[0-9]{1})(([0-3]{1}[0-9]{1})([T]([0-9]{2})([0-9]{2})(([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
			var dISO8601;

			if(sArrDate8601Date !== null)
			{
				dISO8601 = to.setDateInFormat({"iDate": {y: parseInt(sArrDate8601Date[1]), M: (parseInt(sArrDate8601Date[3]) - 1), d: parseInt(sArrDate8601Date[5])}}, "START");
				dTempDate = (bIsAllDay ? dISO8601 : to.getDateByAddingOutputTZOffset(dISO8601, to.setting.outputTZOffset));
			}
			else if(sArrDate8601 !== null)
			{
				dISO8601 = to.setDateInFormat({"iDate": {y: parseInt(sArrDate8601[1]), M: (parseInt(sArrDate8601[3]) - 1), d: parseInt(sArrDate8601[5]), H: parseInt(sArrDate8601[7]), m: parseInt(sArrDate8601[8]), s: parseInt(sArrDate8601[10])}}, "");
				if(sArrDate8601[13] === "Z")
					dTempDate = to.getDateByAddingOutputTZOffset(dISO8601, to.setting.outputTZOffset);
				else
					dTempDate = to.normalizeDateTimeWithOffset(dISO8601, sArrDate8601[13], to.setting.outputTZOffset);
			}
			else if(sArrDate8601Compact !== null)
			{
				dISO8601 = to.setDateInFormat({"iDate": {y: parseInt(sArrDate8601Compact[1]), M: (parseInt(sArrDate8601Compact[3]) - 1), d: parseInt(sArrDate8601Compact[5]), H: parseInt(sArrDate8601Compact[7]), m: parseInt(sArrDate8601Compact[8]), s: parseInt(sArrDate8601Compact[9])}}, "");
				if(sArrDate8601Compact[13] === "Z")
					dTempDate = to.getDateByAddingOutputTZOffset(dISO8601, to.setting.outputTZOffset);
				else
					dTempDate = to.normalizeDateTimeWithOffset(dISO8601, sArrDate8601Compact[13], to.setting.outputTZOffset);
			}
			else
			{
				var sInputDateTimeFormat = inputDateTimeFormat || to.setting.inputDateTimeFormat;
			
				if(to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[1])) // milliseconds
					dTempDate = new Date(parseInt(sDate));
				else
				{
					var sFormatSeparatorDateTime = formatSeparatorDateTime || to.setting.formatSeparatorDateTime,
					sFormatSeparatorDate = formatSeparatorDate || to.setting.formatSeparatorDate,
					sFormatSeparatorTime = formatSeparatorTime || to.setting.formatSeparatorTime,
				
					sArrDatetime = sDate.split(sFormatSeparatorDateTime),
					sThisDate = sArrDatetime[0],
					sThisTime = sArrDatetime[1],
				
					sArrDateComponents = sThisDate.split(sFormatSeparatorDate);						
					if(to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[4]) || to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[5]))
					{
						iDay = parseInt(sArrDateComponents[0]);
						iMonth = parseInt(sArrDateComponents[1]) - 1;
						iYear = parseInt(sArrDateComponents[2]);
					}
					else if(to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[6]) || to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[7]))
					{
						iMonth = parseInt(sArrDateComponents[0]) - 1;
						iDay = parseInt(sArrDateComponents[1]);
						iYear = parseInt(sArrDateComponents[2]);
					}
					else if(to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[8]) || to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[9]))
					{
						iYear = parseInt(sArrDateComponents[0]);
						iMonth = parseInt(sArrDateComponents[1]) - 1;
						iDay = parseInt(sArrDateComponents[2]);
					}
				
					var sArrTempTimeComponents, sArrTimeComponents;
					if(to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[4]) || to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[6]) || to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[8]))
					{
						sArrTempTimeComponents = sThisTime.split(" ");
						sArrTimeComponents = sArrTempTimeComponents[0].split(sFormatSeparatorTime);
					
						iHours =  parseInt(sArrTimeComponents[0]);
					
						iMinutes = parseInt(sArrTimeComponents[1]);
						if(isNaN(iMinutes))
							iMinutes = 0;
					
						if(sArrTimeComponents.length > 2)
							iSeconds = parseInt(sArrTimeComponents[2]);
					
						if(to.compareStrings(sArrTempTimeComponents[1], "AM") && iHours === 12)
							iHours = 0;
						if(to.compareStrings(sArrTempTimeComponents[1], "PM") && iHours < 12)
							iHours = iHours + 12;
					}
					else if(to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[5]) || to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[7]) || to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[9]))
					{
						sArrTimeComponents = sThisTime.split(sFormatSeparatorTime);
					
						iHours =  parseInt(sArrTimeComponents[0]);
					
						iMinutes = parseInt(sArrTimeComponents[1]);
						if(isNaN(iMinutes))
							iMinutes = 0;
					
						if(sArrTimeComponents.length > 2)
							iSeconds = parseInt(sArrTimeComponents[2]);
					}
					dTempDate = to.setDateInFormat({"iDate": {y: iYear, M: iMonth, d: iDay, H: iHours, m: iMinutes, s: iSeconds}}, "");		
				}
			
				dTempDate = (bIsAllDay ? dTempDate : to.normalizeDateTimeWithOffset(dTempDate, sIpTZOffset, to.setting.outputTZOffset));
			}				
		}

		if(bIsAllDay)
			dTempDate = to.setDateInFormat({"date": dTempDate}, "START");

		return dTempDate;
	},

	__getNumberOfDaysOfMonth: function(iMonth, iYear)
	{
		var to = this;
	
		var iArrMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		iArrLeapYearMonthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if(iYear % 4 === 0)
			return iArrLeapYearMonthDays[iMonth];
		else
			return iArrMonthDays[iMonth];
	},

	__findWhetherDateIsVisibleInCurrentView: function(dTempDate, bIsAllDay, dTempStartDateTime, dTempEndDateTime)
	{
		var to = this;
	
		if(!to.setting.excludeNonBusinessHours)
			return true;
		else
		{
			for(var iTempIndex = 0; iTempIndex < to.tv.dAVDt.length; iTempIndex++)
			{
				if(to.compareDates(to.tv.dAVDt[iTempIndex], dTempDate) === 0)
				{
					if(bIsAllDay)
						return true;
					else
					{
						var dTempStartDateBs = new Date(dTempDate),
						dTempEndDateBs = new Date(dTempDate);
						dTempStartDateBs.setHours(to.tv.oBsHours.startTime[0]);
						dTempStartDateBs.setMinutes(to.tv.oBsHours.startTime[1]);
						dTempEndDateBs.setHours(to.tv.oBsHours.endTime[0]);
						dTempEndDateBs.setMinutes(to.tv.oBsHours.endTime[1]);
				
						var dTempStartDate = new Date(dTempStartDateTime), 
						dTempEndDate = new Date(dTempEndDateTime);
						if(to.compareDateTimes(dTempStartDateBs, dTempStartDateTime) > 0)
							dTempStartDate = new Date(dTempStartDateBs);
						if(to.compareDateTimes(dTempEndDateBs, dTempEndDateTime) < 0)
							dTempEndDate = new Date(dTempEndDateBs);
				
						if(to.compareDateTimes(dTempStartDate, dTempEndDate) < 0)
							return true;
						else
							return false;
					}
				}
			}
			return false;
		}
	},

	__getCurrentViewDates: function()
	{
		var to = this;
		var dArrTempDates, dMonthStartDate, dMonthEndDate;
		var dCurrentDateStart = to.setDateInFormat({"date": to.setting.selectedDate}, "START");
	
		if(!to.tv.bDyClDLV)
		{
			to.tv.dAVDt = [];		

			if(to.setting.excludeNonBusinessHours)
			{
				if(to.tv.iBsDays > 0)
				{
					if(to.compareStrings(to.setting.visibleView, "DetailedMonthView") || to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker") || (to.compareStrings(to.setting.visibleView, "AgendaView") && to.compareStrings(to.setting.agendaViewDuration, "Month")))
					{
						while(to._getBusinessHoursForCurrentView(to.setting.selectedDate).length === 0)
							to.setting.selectedDate.setDate(to.setting.selectedDate.getDate() + 1);
					}
					else
					{
						while(to._getBusinessHoursForCurrentView(dCurrentDateStart).length === 0)
						{
							console.log("Skipped " + dCurrentDateStart + " because Business Hours for date not exist. ");
							if(to.tv.sLoadType === "Next" || to.tv.sLoadType === "Load")
								dCurrentDateStart.setDate(dCurrentDateStart.getDate() + 1);
							else if(to.tv.sLoadType === "Prev")
								dCurrentDateStart.setDate(dCurrentDateStart.getDate() - 1);
						}
						to.setting.selectedDate = new Date(dCurrentDateStart);		
					}
				}
				else
				{
					console.log("Business Hours Are Not Specified");
				}
			}

			if(to.compareStrings(to.setting.visibleView, "DetailedMonthView") || 
				to.compareStrings(to.setting.visibleView, "MonthView") || 
				to.compareStrings(to.setting.visibleView, "DatePicker"))
			{
				dMonthStartDate = to.setDateInFormat({"iDate": {d: 1, M: dCurrentDateStart.getMonth(), y: dCurrentDateStart.getFullYear()}}, "START");
				dMonthEndDate = to.setDateInFormat({"iDate": {d: to.__getNumberOfDaysOfMonth(dCurrentDateStart.getMonth(), dCurrentDateStart.getFullYear()), M: dCurrentDateStart.getMonth(), y: dCurrentDateStart.getFullYear()}}, "START");
			
				to.tv.dVSDt = to.setDateInFormat({"date": to._getWeekForDate(dMonthStartDate, false)[0]}, "START");
				if(!to.setting.fixedNumOfWeeksInMonthView)
					to.tv.iWkInMonth = ((to._getWeekForDate(dMonthEndDate, false)[0].getTime() - to.tv.dVSDt.getTime())/$.CalenStyle.extra.iMS.w) + 1;
			
				var iDateMS = to.tv.dVSDt.getTime(),
				iNumMonthDays = (to.setting.excludeNonBusinessHours) ? (to.tv.iBsDays * to.tv.iWkInMonth) : (7 * to.tv.iWkInMonth);
				for(var iTempIndex = 0; iTempIndex < (7 * to.tv.iWkInMonth); iTempIndex++)
				{
					var dTempDate = new Date(iDateMS);
					if(!to.setting.excludeNonBusinessHours)
					{
						to.tv.dAVDt.push(dTempDate);
						if(to.tv.dAVDt.length === 1)
							to.tv.dVSDt = new Date(dTempDate);
						if(to.tv.dAVDt.length === iNumMonthDays)
							to.tv.dVEDt = new Date(dTempDate);
					}
					else if(to._getBusinessHoursForCurrentView(dTempDate).length > 0)
					{
						to.tv.dAVDt.push(dTempDate);
						if(to.tv.dAVDt.length === 1)
							to.tv.dVSDt = new Date(dTempDate);
						if(to.tv.dAVDt.length === iNumMonthDays)
							to.tv.dVEDt = new Date(dTempDate);
					}
					iDateMS += $.CalenStyle.extra.iMS.d;
				}
				to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dVEDt}, "END");
			
				to.tv.dVDSDt = new Date(to.tv.dVSDt);
				to.tv.dVDEDt = new Date(to.tv.dVEDt);
			}
			else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
			{
				if(to.compareStrings(to.setting.quickAgendaViewDuration, "Week"))
				{
					dArrTempDates = to._getWeekForDate(dCurrentDateStart, false);
					to._setCurrentViewDatesArray(dArrTempDates[0], null, "Next");

					to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
					to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");
					
					to.tv.dVDSDt = new Date(to.tv.dVSDt);
					to.tv.dVDEDt = new Date(to.tv.dVEDt);
				}
				else if(to.compareStrings(to.setting.quickAgendaViewDuration, "CustomDays"))
				{
					if(to.tv.sLoadType === "Next" || to.tv.sLoadType === "Load")
						to._setCurrentViewDatesArray(dCurrentDateStart, null, "Next");
					else if(to.tv.sLoadType === "Prev")
					{
						to._setCurrentViewDatesArray(dCurrentDateStart, null, "Prev");
						to.tv.dAVDt.reverse();
					}				
					to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
					to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");
					
					to.tv.dVDSDt = new Date(to.tv.dVSDt);
					to.tv.dVDEDt = new Date(to.tv.dVEDt);
				}
			}
			else if(to.compareStrings(to.setting.visibleView, "AgendaView"))
			{
				if(to.compareStrings(to.setting.agendaViewDuration, "Month"))
				{
					dMonthStartDate = new Date(dCurrentDateStart);
					dMonthStartDate.setDate(1);
					to.tv.iNoVDay = to.__getNumberOfDaysOfMonth(dMonthStartDate.getMonth(), dMonthStartDate.getFullYear());
					dMonthEndDate = new Date(dCurrentDateStart);
					dMonthEndDate.setDate(to.tv.iNoVDay);
					to._setCurrentViewDatesArray(dMonthStartDate, dMonthEndDate, "Next");

					to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
					to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");

					to.tv.dVDSDt = new Date(to.tv.dVSDt);
					to.tv.dVDEDt = new Date(to.tv.dVEDt);
				}
				else if(to.compareStrings(to.setting.agendaViewDuration, "Week"))
				{
					dArrTempDates = to._getWeekForDate(dCurrentDateStart, false);					
					to._setCurrentViewDatesArray(dArrTempDates[0], null, "Next");

					to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
					to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");

					to.tv.dVDSDt = new Date(to.tv.dVSDt);
					to.tv.dVDEDt = new Date(to.tv.dVEDt);
				}
				else if(to.compareStrings(to.setting.agendaViewDuration, "CustomDays"))
				{
					if(to.tv.sLoadType === "Next" || to.tv.sLoadType === "Load")
					to._setCurrentViewDatesArray(dCurrentDateStart, null, "Next");
					else if(to.tv.sLoadType === "Prev")
					{
						to._setCurrentViewDatesArray(dCurrentDateStart, null, "Prev");
						to.tv.dAVDt.reverse();
					}				
					to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
					to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");
					
					to.tv.dVDSDt = new Date(to.tv.dVSDt);
					to.tv.dVDEDt = new Date(to.tv.dVEDt);
				}
			}
			else if(to.compareStrings(to.setting.visibleView, "AppointmentView"))
			{
				if(to.tv.sLoadType === "Next" || to.tv.sLoadType === "Load")
					to._setCurrentViewDatesArray(dCurrentDateStart, null, "Next");
				else if(to.tv.sLoadType === "Prev")
				{
					to._setCurrentViewDatesArray(dCurrentDateStart, null, "Prev");
					to.tv.dAVDt.reverse();
				}				
				to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
				to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");
			}
			else if(to.compareStrings(to.setting.visibleView, "DayEventListView") || to.compareStrings(to.setting.visibleView, "DayEventDetailView"))
			{
				if(to.setting.daysInDayListView === 7)
				{
					dArrTempDates = to._getWeekForDate(dCurrentDateStart, false);
					to._setCurrentViewDatesArray(dArrTempDates[0], null, "Next");

					to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
					to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");
				}
				else
				{
					if(to.tv.sLoadType === "Next" || to.tv.sLoadType === "Load")
						to._setCurrentViewDatesArray(dCurrentDateStart, null, "Next");
					else if(to.tv.sLoadType === "Prev")
					{
						to._setCurrentViewDatesArray(dCurrentDateStart, null, "Prev");
						to.tv.dAVDt.reverse();
					}				
					to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
					to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");
				}
			
				to.tv.dVDSDt = to.setDateInFormat({"date": to.setting.selectedDate}, "START");
				to.tv.dVDEDt = to.setDateInFormat({"date": to.setting.selectedDate}, "END");
			}
			else if(to.compareStrings(to.setting.visibleView, "WeekView"))
			{
				dArrTempDates = to._getWeekForDate(dCurrentDateStart, false);
				to._setCurrentViewDatesArray(dArrTempDates[0], null, "Next");

				to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
				to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");

				to.tv.dVDSDt = new Date(to.tv.dVSDt);
				to.tv.dVDEDt = new Date(to.tv.dVEDt);
			}
			else if(to.compareStrings(to.setting.visibleView, "DayView"))
			{
				to.tv.dVSDt = to.setDateInFormat({"date": dCurrentDateStart}, "START");
				to.tv.dVEDt = to.setDateInFormat({"date": dCurrentDateStart}, "END");
				
				to.tv.dVDSDt = new Date(to.tv.dVSDt);
				to.tv.dVDEDt = new Date(to.tv.dVEDt);
				
				to._setCurrentViewDatesArray(dCurrentDateStart, null, "Next");
			}
			else if(to.compareStrings(to.setting.visibleView, "CustomView"))
			{
				if(to.tv.sLoadType === "Next" || to.tv.sLoadType === "Load")
					to._setCurrentViewDatesArray(dCurrentDateStart, null, "Next");
				else if(to.tv.sLoadType === "Prev")
				{
					to._setCurrentViewDatesArray(dCurrentDateStart, null, "Prev");
					to.tv.dAVDt.reverse();
				}				
				to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
				to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");

				to.tv.dVDSDt = new Date(to.tv.dVSDt);
				to.tv.dVDEDt = new Date(to.tv.dVEDt);
			}
		}
	},

	_setCurrentViewDatesArray: function(dStartDate, dEndDate, sDir)
	{
		var to = this;
		var iDVDateMS = dStartDate.getTime();
		for(var iDateIndex = 0; iDateIndex < to.tv.iNoVDay; iDateIndex++)
		{
			var dTempDate = new Date(iDVDateMS);
			if(dEndDate !== null && to.compareDates(dTempDate, dEndDate) === 0)
				break;
		
			if(!to.setting.excludeNonBusinessHours)
				to.tv.dAVDt.push(dTempDate);
			else if(to._getBusinessHoursForCurrentView(dTempDate).length > 0)
				to.tv.dAVDt.push(dTempDate);
			else
				iDateIndex--;
		
			if(to.compareStrings(sDir, "Prev"))
				iDVDateMS -= $.CalenStyle.extra.iMS.d;
			else if(to.compareStrings(sDir, "Next"))
				iDVDateMS += $.CalenStyle.extra.iMS.d;
		}
	},

	__getDayIndexInView: function(dTempDate)
	{
		var to = this;
	
		var iDayIndex = -1;
		for(var iTempIndex = 0; iTempIndex < to.tv.dAVDt.length; iTempIndex++)
		{
			var dThisDate = to.tv.dAVDt[iTempIndex];
			if(to.compareDates(dTempDate, dThisDate) === 0)
			{
				iDayIndex = iTempIndex;
				break;
			}
		}
		return iDayIndex;
	},

	_getWeekForDate: function(dTempDate, bFromSunday)
	{
		var to = this;
	
		var iWeekStartDiff = dTempDate.getDay() - (bFromSunday ? 0 : to.setting.weekStartDay);
		if(iWeekStartDiff < 0)
			iWeekStartDiff = 7 + iWeekStartDiff;
		var iWeekStartDiffMS = $.CalenStyle.extra.iMS.d * iWeekStartDiff,
		iTempDateDateMS = dTempDate.getTime(),
		iWeekStartDateMS = iTempDateDateMS - iWeekStartDiffMS,
		iWeekEndDateMS = iWeekStartDateMS + ($.CalenStyle.extra.iMS.d * 6),
		dWkStartDate = to.setDateInFormat({"date": new Date(iWeekStartDateMS)}, "START"),
		dWkEndDate = to.setDateInFormat({"date": new Date(iWeekEndDateMS)}, "END");
		return [dWkStartDate, dWkEndDate];
	},

	_getThursdayInAWeek: function(dWkStartDate)
	{
		var to = this;
	
		var iDayOfWeek = dWkStartDate.getDay(),
		iDiffDays = (iDayOfWeek > 4) ? ((7 - iDayOfWeek) + 4) : (4 - iDayOfWeek),
		iThursdayInWkMS = dWkStartDate.getTime() + ($.CalenStyle.extra.iMS.d * iDiffDays);			
		return (new Date(iThursdayInWkMS));
	},

	__getWeekNumber: function(dWkStartDate, dWkEndDate)
	{
		var to = this;
	
		var sWeekNumber;			
		var dYearStartDate = to._normalizeDateTime(dWkStartDate, "START", "y"),
		dYearEndDate = to._normalizeDateTime(dWkStartDate, "END", "y");
	
		if(to.compareStrings(to.setting.weekNumCalculation, "US"))
		{
			var dWeekStartDateYear = to._getWeekForDate(dYearStartDate, true)[0],
			iWeekStartDateYearMS = dWeekStartDateYear.getTime(),
		
			dWSDate = to._getWeekForDate(dWkStartDate, true)[0],
			iWkNumberStart = Math.ceil((dWSDate.getTime() - iWeekStartDateYearMS) / $.CalenStyle.extra.iMS.w) + 1,
			dWEDate = to._getWeekForDate(dWkEndDate, true)[0],
			iWkNumberEnd = Math.ceil((dWEDate.getTime() - iWeekStartDateYearMS) / $.CalenStyle.extra.iMS.w) + 1;
		
			if(to.setting.weekStartDay === 0)
			{
				if(to.compareDates(dWkEndDate, dYearEndDate) > 0)
					sWeekNumber = to.getNumberStringInFormat(iWkNumberStart, 0, true) + "/" + to.getNumberStringInFormat(1, 0, true);
				else
					sWeekNumber = to.getNumberStringInFormat(iWkNumberStart, 0, true);
			}
			else
			{
				if(iWkNumberStart != iWkNumberEnd)
				{
					if(to.compareDates(dWkEndDate, dYearEndDate) > 0)
						sWeekNumber = to.getNumberStringInFormat(iWkNumberStart, 0, true) + "/" + to.getNumberStringInFormat(1, 0, true);
					else
						sWeekNumber = to.getNumberStringInFormat(iWkNumberStart, 0, true) + "/" + to.getNumberStringInFormat(iWkNumberEnd, 0, true);						
				}
				else
					sWeekNumber = to.getNumberStringInFormat(iWkNumberStart, 0, true);
			}
		}
		else if(to.compareStrings(to.setting.weekNumCalculation, "Europe/ISO"))
		{
			if(dWkStartDate.getFullYear() != dWkEndDate.getFullYear())
			{
				var dNextYearStartDate = new Date(dWkEndDate);
				dNextYearStartDate.setDate(1);
				dNextYearStartDate.setMonth(0);
			
				var dPrevYearStartDate = new Date(dWkStartDate);
				dPrevYearStartDate.setDate(1);
				dPrevYearStartDate.setMonth(0);
			
				dYearStartDate = (dWkEndDate.getDate() >= 3) ? dNextYearStartDate : dPrevYearStartDate;
			}
			var dFirstThursday = to._getThursdayInAWeek(dYearStartDate),
			dThursdayInWk = to._getThursdayInAWeek(dWkStartDate);
			sWeekNumber = Math.ceil((dThursdayInWk.getTime() - dFirstThursday.getTime()) / $.CalenStyle.extra.iMS.w) + 1;
			sWeekNumber = to.getNumberStringInFormat(sWeekNumber, 0, true);
		}
	
		return sWeekNumber;
	},

	__isDateInCurrentView: function(dTempDate)
	{
		var to = this;
	
		var sDateInCurrentWeek = false;
		if(to.tv.dAVDt.length > 0)
		{
			for(var iDateIndex = 0; iDateIndex < to.tv.dAVDt.length; iDateIndex++)
			{
				var dThisDate = to.tv.dAVDt[iDateIndex];
				if(to.compareDates(dThisDate, dTempDate) === 0)
					sDateInCurrentWeek = true;
			}
		}
		return sDateInCurrentWeek;
	},

	_normalizeDateTime: function(dInputDate, sFunction, sUnit)
	{
		var to = this;
	
		// sFunction = "START" | "END"
		// sUnit = "s" | "m" | "h" | "T" | "d" | "M" | 
	
		var dOutputDate,
		iArrInput = 
		{
			d: dInputDate.getDate(),
			M: dInputDate.getMonth(),
			y: dInputDate.getFullYear(),
			H: dInputDate.getHours(),
			m: dInputDate.getMinutes(),
			s: dInputDate.getSeconds()
		};
	
		switch(sUnit)
		{
			case "s":
				{
					if(sFunction === "START")
						dOutputDate = to.setDateInFormat({"iDate": {y: iArrInput.y, M: iArrInput.M, d: iArrInput.d, H: iArrInput.H, m: iArrInput.m}}, "");
					else if(sFunction === "END")
						dOutputDate = to.setDateInFormat({"iDate": {y: iArrInput.y, M: iArrInput.M, d: iArrInput.d, H: iArrInput.H, m: iArrInput.m, s: 59, ms: 999}}, "");
				}
				break;
			case "m":
				{
					if(sFunction === "START")
						dOutputDate = to.setDateInFormat({"iDate": {y: iArrInput.y, M: iArrInput.M, d: iArrInput.d, H: iArrInput.H}}, "");
					else if(sFunction === "END")
						dOutputDate = to.setDateInFormat({"iDate": {y: iArrInput.y, M: iArrInput.M, d: iArrInput.d, H: iArrInput.H, m: 59, s: 59, ms: 999}}, "");
				}
				break;
			case "h":
			case "T":
				{
					if(sFunction === "START")
						dOutputDate = to.setDateInFormat({"iDate": {y: iArrInput.y, M: iArrInput.M, d: iArrInput.d}}, "START");
					else if(sFunction === "END")
						dOutputDate = to.setDateInFormat({"iDate": {y: iArrInput.y, M: iArrInput.M, d: iArrInput.d}}, "END");
				}
				break;
			case "d":
			case "dE":
				{
					if(sFunction === "START")
						dOutputDate = to.setDateInFormat({"iDate": {y: iArrInput.y, M: iArrInput.M, d: 1}}, "START");
					else if(sFunction === "END")
						dOutputDate = to.setDateInFormat({"iDate": {y: iArrInput.y, M: iArrInput.M, d: to.__getNumberOfDaysOfMonth(iArrInput.M, iArrInput.y)}}, "START");
				}
				break;
			case "M":
			case "ME":
			case "y":
			case "yE":
				{
					if(sFunction === "START")
						dOutputDate = to.setDateInFormat({"iDate": {y: iArrInput.y, M: 0, d: 1}}, "START");
					else if(sFunction === "END")
						dOutputDate = to.setDateInFormat({"iDate": {y: iArrInput.y, M: 11, d: to.__getNumberOfDaysOfMonth(11, iArrInput.y)}}, "START");
				}
				break;
		}
	
		if(sUnit === "dE" || sUnit === "ME" || sUnit === "yE")
			dOutputDate = to._normalizeDateTime(dOutputDate, "END", "T");
	
		return dOutputDate;
	},

	_getDifference: function(sUnit, dDate1, dDate2)
	{
		var to = this;
	
		// sUnit = "ms | "s" | "m" | "h" | "T" | "d" | "M"| "y"
	
		var iUnitDiff, iMSDiff = dDate1.getTime() - dDate2.getTime();
	
		if(sUnit === "ms")
			iUnitDiff = iMSDiff;
		else if(sUnit === "s")
			iUnitDiff = (iMSDiff / iMS.s);
		else if(sUnit === "m")
			iUnitDiff = (iMSDiff / $.CalenStyle.extra.iMS.m);
		else if(sUnit === "h")
			iUnitDiff = (iMSDiff / $.CalenStyle.extra.iMS.h);
		else if(sUnit === "d")
			iUnitDiff = (iMSDiff / $.CalenStyle.extra.iMS.d);
		else if(sUnit === "M")
			iUnitDiff = (iMSDiff / $.CalenStyle.extra.iMS.m);
		else if(sUnit === "y")
			iUnitDiff = (iMSDiff / iMS.y);
	
		return iUnitDiff;
	},

	// Public Method
	compareDates: function(dDate1, dDate2)
	{
		var to = this;
	
		dDate1 = to._normalizeDateTime(dDate1, "START", "T");
		dDate2 = to._normalizeDateTime(dDate2, "START", "T");
		var iDateDiff = to._getDifference("d", dDate1, dDate2);
		return (iDateDiff === 0) ? iDateDiff: (iDateDiff/Math.abs(iDateDiff));
	},

	// Public Method
	compareDateTimes: function(dDate1, dDate2)
	{
		var to = this;
	
		var iDateTimeDiff = to._getDifference("m", dDate1, dDate2);
		return (iDateTimeDiff === 0) ? iDateTimeDiff: (iDateTimeDiff/Math.abs(iDateTimeDiff));
	},

	_getMonthAndYear: function(iMonth, iYear, iNumOfMonths, sFetchType)
	{
		var to = this;
	
		var iNewMonth = iMonth, iNewYear = iYear;
		for(var iTempIndex = 0; iTempIndex < iNumOfMonths; iTempIndex++)
		{
			if(to.compareStrings(sFetchType, "Prev"))
			{
				iNewMonth = iNewMonth - 1;			
				if(iNewMonth === -1)
				{
					iNewMonth = 11;
					iNewYear -= 1;
				}
			}
			else if(to.compareStrings(sFetchType, "Next"))
			{
				iNewMonth = iNewMonth + 1;			
				if(iNewMonth === 12)
				{
					iNewMonth = 0;
					iNewYear += 1;
				}
			}
		}
		return [iNewMonth, iNewYear];
	},

	// Public Method
	getNumberStringInFormat: function(iNumber, iChars, bIsLocalized)
	{
		var to = this;
		var iTempIndex;
		var sFormattedString = "", sNumber = iNumber.toString(), iNumberLength = sNumber.length;
		if(iChars !== 0)
		{
			for(iTempIndex = 0; iTempIndex < (iChars - iNumberLength); iTempIndex++)
				sFormattedString += (bIsLocalized ? to.setting.numbers[0] : "0");
		}
		if(!bIsLocalized)
			sFormattedString += sNumber;
		else
		{
			for(iTempIndex = 0; iTempIndex < iNumberLength; iTempIndex++)
				sFormattedString += to.setting.numbers[parseInt(sNumber.charAt(iTempIndex))];
		}
		return sFormattedString;
	},

	// Public Method
	getDateInFormat: function(oInput, sFormat, b24Hour, bIsLocalized)
	{
		var to = this;
	
		var oDateInFormat = "",
	
		sDS = to.setting.formatSeparatorDate, 
		sTS = to.setting.formatSeparatorTime, 
		sDTS = to.setting.formatSeparatorDateTime,
	
		sArrVeryShortDayNames = bIsLocalized ? to.setting.veryShortDayNames : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		sArrShortDayNames = bIsLocalized ? to.setting.shortDayNames : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		sArrFullDayNames = bIsLocalized ? to.setting.fullDayNames : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		sArrShortMonthNames = bIsLocalized ? to.setting.shortMonthNames : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		sArrFullMonthNames = bIsLocalized ? to.setting.fullMonthNames : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	
		if(oInput.date === undefined && oInput.iDate === undefined)
			oInput.date = to._getCurrentDate();
		if(oInput.iDate === undefined)
		{
			oInput.iDate = {
				D: oInput.date.getDay(),
				d: oInput.date.getDate(),
				M: oInput.date.getMonth(),
				y: oInput.date.getFullYear(),
				H: oInput.date.getHours(),
				m: oInput.date.getMinutes(),
				s: oInput.date.getSeconds(),
				ms: oInput.date.getMilliseconds()
			};
		}
		oInput.iDate.h = (oInput.iDate.H > 12) ? (oInput.iDate.H - 12) : oInput.iDate.H;
		oInput.iDate.me = (oInput.iDate.H < 12) ?  "am" : "pm";
		oInput.iDate.sm = (oInput.iDate.H < 12) ?  "a" : "p";
	
		if(b24Hour)
		{
			sFormat = sFormat.replace("hh", "HH");
			sFormat = sFormat.replace(" me", "", "\i");			
			sFormat = sFormat.replace(" sm", "", "\i");
			sFormat = sFormat.replace("sm", "", "\i");
		}

		if(sFormat === "object")
			oDateInFormat = oInput.iDate;
	
		else if(sFormat === "d")
			oDateInFormat = (to.setting.formatDates.d !== undefined) ? to.setting.formatDates.d.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.d, 0, bIsLocalized);
		else if(sFormat === "M")
			oDateInFormat = (to.setting.formatDates.M !== undefined) ? to.setting.formatDates.M.call(to, oInput.iDate) : to.getNumberStringInFormat((oInput.iDate.M + 1), 0, bIsLocalized);
		else if(sFormat === "y")
			oDateInFormat = (to.setting.formatDates.y !== undefined) ? to.setting.formatDates.y.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.y, 0, bIsLocalized);
		else if(sFormat === "H")
			oDateInFormat = (to.setting.formatDates.h !== undefined) ? to.setting.formatDates.h.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.H, 0, bIsLocalized);
		else if(sFormat === "h")
			oDateInFormat = (to.setting.formatDates.h !== undefined) ? to.setting.formatDates.h.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.h , 0, bIsLocalized);
		else if(sFormat === "m")
			oDateInFormat = (to.setting.formatDates.M !== undefined) ? to.setting.formatDates.M.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.m, 0, bIsLocalized);
		else if(sFormat === "s")
			oDateInFormat = (to.setting.formatDates.s !== undefined) ? to.setting.formatDates.s.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.s, 0, bIsLocalized);
	
		if(sFormat === "dd")
			oDateInFormat = (to.setting.formatDates.dd !== undefined) ? to.setting.formatDates.dd.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.d, 2, bIsLocalized);
		else if(sFormat === "MM")
			oDateInFormat = (to.setting.formatDates.MM !== undefined) ? to.setting.formatDates.MM.call(to, oInput.iDate) : to.getNumberStringInFormat((oInput.iDate.M + 1), 2, bIsLocalized);
		else if(sFormat === "yyyy")
			oDateInFormat = (to.setting.formatDates.yyyy !== undefined) ? to.setting.formatDates.yyyy.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.y, 2, bIsLocalized);
		else if(sFormat === "HH")
			oDateInFormat = (to.setting.formatDates.HH !== undefined) ? to.setting.formatDates.HH.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.H, 2, bIsLocalized);
		else if(sFormat === "hh")
			oDateInFormat = (to.setting.formatDates.hh !== undefined) ? to.setting.formatDates.hh.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.h , 2, bIsLocalized);
		else if(sFormat === "mm")
			oDateInFormat = (to.setting.formatDates.mm !== undefined) ? to.setting.formatDates.mm.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.m, 2, bIsLocalized);
		else if(sFormat === "ss")
			oDateInFormat = (to.setting.formatDates.ss !== undefined) ? to.setting.formatDates.ss.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.s, 2, bIsLocalized);
	
		else if(sFormat === "DD")
			oDateInFormat = sArrVeryShortDayNames[oInput.iDate.D];
		else if(sFormat === "DDD")
			oDateInFormat = sArrShortDayNames[oInput.iDate.D];
		else if(sFormat === "DDDD")
			oDateInFormat = sArrFullDayNames[oInput.iDate.D];
		else if(sFormat === "MMM")
			oDateInFormat = sArrShortMonthNames[oInput.iDate.M];
		else if(sFormat === "MMMM")
			oDateInFormat = sArrFullMonthNames[oInput.iDate.M];
	
		else if(sFormat === "dd-MM-yyyy")
			oDateInFormat = (to.setting.formatDates["dd-MM-yyyy"] !== undefined) ? to.setting.formatDates["dd-MM-yyyy"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "dd", b24Hour, bIsLocalized) + sDS + to.getDateInFormat({"iDate": oInput.iDate}, "MM", b24Hour, bIsLocalized) + sDS + to.getDateInFormat({"iDate": oInput.iDate}, "yyyy", b24Hour, bIsLocalized);
		else if(sFormat === "dd MMM") // getShortDateFormatCF
			oDateInFormat = (to.setting.formatDates["dd MMM"] !== undefined) ? to.setting.formatDates["dd MMM"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "dd", b24Hour, bIsLocalized) + " " + to.getDateInFormat({"iDate": oInput.iDate}, "MMM", b24Hour, bIsLocalized);
		else if(sFormat === "dd-MMM-yyyy") // getDDMMMYYYYFormatCF
			oDateInFormat = (to.setting.formatDates["dd-MMM-yyyy"] !== undefined) ? to.setting.formatDates["dd-MMM-yyyy"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "dd", b24Hour, bIsLocalized) + sDS + to.getDateInFormat({"iDate": oInput.iDate}, "MMM", b24Hour, bIsLocalized) + sDS + to.getDateInFormat({"iDate": oInput.iDate}, "yyyy", b24Hour, bIsLocalized);
		else if(sFormat === "DDD MMM dd, yyyy") // getFullDateFormatCF
			oDateInFormat = (to.setting.formatDates["DDD MMM dd, yyyy"] !== undefined) ? to.setting.formatDates["DDD MMM dd, yyyy"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "DDD", b24Hour, bIsLocalized) + " " + to.getDateInFormat({"iDate": oInput.iDate}, "MMM", b24Hour, bIsLocalized) + " " + to.getDateInFormat({"iDate": oInput.iDate}, "dd", b24Hour, bIsLocalized) + ", " + to.getDateInFormat({"iDate": oInput.iDate}, "yyyy", b24Hour, bIsLocalized);
		else if(sFormat === "DDD MMM dd yyyy")
			oDateInFormat = (to.setting.formatDates["DDD MMM dd yyyy"] !== undefined) ? to.setting.formatDates["DDD MMM dd yyyy"].call(to, oInput.iDate) : "<b>" + to.getDateInFormat({"iDate": oInput.iDate}, "DDD", b24Hour, bIsLocalized) + " " + to.getDateInFormat({"iDate": oInput.iDate}, "MMM", b24Hour, bIsLocalized) + " " + to.getDateInFormat({"iDate": oInput.iDate}, "dd", b24Hour, bIsLocalized) + "</b> " + to.getDateInFormat({"iDate": oInput.iDate}, "yyyy", b24Hour, bIsLocalized);
		else if(sFormat === "DDDD MMM dd yyyy")
			oDateInFormat = (to.setting.formatDates["DDDD MMM dd yyyy"] !== undefined) ? to.setting.formatDates["DDDD MMM dd yyyy"].call(to, oInput.iDate) : "<b>" + to.getDateInFormat({"iDate": oInput.iDate}, "DDDD", b24Hour, bIsLocalized) + " " + to.getDateInFormat({"iDate": oInput.iDate}, "MMM", b24Hour, bIsLocalized) + " " + to.getDateInFormat({"iDate": oInput.iDate}, "dd", b24Hour, bIsLocalized) + "</b> " + to.getDateInFormat({"iDate": oInput.iDate}, "yyyy", b24Hour, bIsLocalized);
		else if(sFormat === "yyyy-MM-dd")
			oDateInFormat = (to.setting.formatDates["yyyy-MM-dd"] !== undefined) ? to.setting.formatDates["yyyy-MM-dd"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "yyyy", b24Hour, bIsLocalized) + sDS + to.getDateInFormat({"iDate": oInput.iDate}, "MM", b24Hour, bIsLocalized) + sDS + to.getDateInFormat({"iDate": oInput.iDate}, "dd", b24Hour, bIsLocalized);
		else if(sFormat === "ISO8601Date")
			oDateInFormat = (to.setting.formatDates.ISO8601Date !== undefined) ? to.setting.formatDates.ISO8601Date.call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "yyyy", b24Hour, bIsLocalized) + "-" + to.getDateInFormat({"iDate": oInput.iDate}, "MM", b24Hour, bIsLocalized) + "-" + to.getDateInFormat({"iDate": oInput.iDate}, "dd", b24Hour, bIsLocalized);
			
		// getTimeStringCF
		else if(sFormat === "hh:mm sm" || sFormat === "hh:mm SM")
			oDateInFormat = (to.setting.formatDates["hh:mm sm"] !== undefined) ? to.setting.formatDates["hh:mm sm"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "hh", b24Hour, bIsLocalized) + sTS + to.getDateInFormat({"iDate": oInput.iDate}, "mm", b24Hour, bIsLocalized) + " " + ((sFormat === "hh:mm SM") ? oInput.iDate.sm.toUpperCase() : oInput.iDate.sm);
		else if(sFormat === "hh:mmsm" || sFormat === "hh:mmSM")
			oDateInFormat = (to.setting.formatDates["hh:mmsm"] !== undefined) ? to.setting.formatDates["hh:mmsm"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "hh", b24Hour, bIsLocalized) + sTS + to.getDateInFormat({"iDate": oInput.iDate}, "mm", b24Hour, bIsLocalized) + ((sFormat === "hh:mmSM") ? oInput.iDate.sm.toUpperCase() : oInput.iDate.sm);
		else if(sFormat === "hh:mm" || sFormat === "hh:mm me" || sFormat === "hh:mm ME")
			oDateInFormat = (to.setting.formatDates["hh:mm me"] !== undefined) ? to.setting.formatDates["hh:mm me"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "hh", b24Hour, bIsLocalized) + sTS + to.getDateInFormat({"iDate": oInput.iDate}, "mm", b24Hour, bIsLocalized) + " " + ((sFormat === "hh:mm ME") ? oInput.iDate.me.toUpperCase() : oInput.iDate.me);
		else if(sFormat === "hh:mm:ss" || sFormat === "hh:mm:ss me" || sFormat === "hh:mm:ss ME")
			oDateInFormat = (to.setting.formatDates["hh:mm:ss me"] !== undefined) ? to.setting.formatDates["hh:mm:ss me"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "hh", b24Hour, bIsLocalized) + sTS + to.getDateInFormat({"iDate": oInput.iDate}, "mm", b24Hour, bIsLocalized) + sTS + to.getDateInFormat({"iDate": oInput.iDate}, "ss", b24Hour, bIsLocalized) + " " + ((sFormat === "hh:mm:ss ME") ? oInput.iDate.me.toUpperCase() : oInput.iDate.me);
	
		else if(sFormat === "HH:mm")
			oDateInFormat = (to.setting.formatDates["HH:mm"] !== undefined) ? to.setting.formatDates["HH:mm"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "HH", b24Hour, bIsLocalized) + sTS + to.getDateInFormat({"iDate": oInput.iDate}, "mm", b24Hour, bIsLocalized);
		else if(sFormat === "HH:mm:ss")
			oDateInFormat = (to.setting.formatDates["HH:mm:ss"] !== undefined) ? to.setting.formatDates["HH:mm:ss"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "HH", b24Hour, bIsLocalized) + sTS + to.getDateInFormat({"iDate": oInput.iDate}, "mm", b24Hour, bIsLocalized) + sTS + to.getDateInFormat({"iDate": oInput.iDate}, "ss", b24Hour, bIsLocalized);
		else if(sFormat === "ISO8601Time")
			oDateInFormat = (to.setting.formatDates.ISO8601Time !== undefined) ? to.setting.formatDates.ISO8601Time.call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "HH", b24Hour, bIsLocalized) + ":" + to.getDateInFormat({"iDate": oInput.iDate}, "mm", b24Hour, bIsLocalized) + ":" + to.getDateInFormat({"iDate": oInput.iDate}, "ss", b24Hour, bIsLocalized);
	
		else if(sFormat === "dd-MM-yyyy HH:mm")
			oDateInFormat = (to.setting.formatDates["dd-MM-yyyy HH:mm"] !== undefined) ? to.setting.formatDates["dd-MM-yyyy HH:mm"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "dd-MM-yyyy", b24Hour, bIsLocalized) + sDTS + to.getDateInFormat({"iDate": oInput.iDate}, "HH:mm", b24Hour, bIsLocalized);
		else if(sFormat === "dd-MM-yyyy hh:mm")
			oDateInFormat = (to.setting.formatDates["dd-MM-yyyy hh:mm"] !== undefined) ? to.setting.formatDates["dd-MM-yyyy hh:mm"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "dd-MM-yyyy", b24Hour, bIsLocalized) + sDTS + to.getDateInFormat({"iDate": oInput.iDate}, "hh:mm", b24Hour, bIsLocalized);
	
		else if(sFormat === "HH:mm dd-MMM-yyyy") // getLongTimeDateStringCF
			oDateInFormat = (to.setting.formatDates["HH:mm dd-MMM-yyyy"] !== undefined) ? to.setting.formatDates["HH:mm dd-MMM-yyyy"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "HH:mm", b24Hour, bIsLocalized) + sDTS + to.getDateInFormat({"iDate": oInput.iDate}, "dd-MMM-yyyy", b24Hour, bIsLocalized);
		else if(sFormat === "hh:mm dd-MMM-yyyy") // getLongTimeDateStringCF
			oDateInFormat = (to.setting.formatDates["hh:mm dd-MMM-yyyy"] !== undefined) ? to.setting.formatDates["hh:mm dd-MMM-yyyy"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "hh:mm", b24Hour, bIsLocalized) + sDTS + to.getDateInFormat({"iDate": oInput.iDate}, "dd-MMM-yyyy", b24Hour, bIsLocalized);
	
		else if(sFormat === "yyyy-MM-ddTHH:mm:ss")//2013-12-10T00:00:00
			oDateInFormat = (to.setting.formatDates["yyyy-MM-ddTHH:mm:ss"] !== undefined) ? to.setting.formatDates["yyyy-MM-ddTHH:mm:ss"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "yyyy-MM-dd", b24Hour, bIsLocalized) + "T" + to.getDateInFormat({"iDate": oInput.iDate}, "HH:mm:ss", b24Hour, bIsLocalized);
		else if(sFormat === "ISO8601DateTime")//2013-12-10T00:00:00
			oDateInFormat = (to.setting.formatDates.ISO8601DateTime !== undefined) ? to.setting.formatDates.ISO8601DateTime.call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "ISO8601Date", b24Hour, bIsLocalized) + "T" + to.getDateInFormat({"iDate": oInput.iDate}, "ISO8601Time", b24Hour, bIsLocalized);
	
		return oDateInFormat;
	},

	// Public Method
	getEventDateTimeString: function(dThisStartDate, dThisEndDate, bIsAllDay, sSeparator)
	{
		var to = this;
	
		var sDateTimeString = "";			
		if(bIsAllDay)
		{
			if(to.compareDates(dThisStartDate, dThisEndDate) === 0)
				sDateTimeString =  to.getDateInFormat({"date": dThisStartDate}, "dd-MMM-yyyy", false, true);
			else
			{
				if(dThisEndDate.getHours() === 0 && dThisEndDate.getMinutes() === 0)
				{
					dThisEndDate.setTime(dThisEndDate.getTime() - $.CalenStyle.extra.iMS.m);
					if(to.compareDates(dThisStartDate, dThisEndDate) === 0)
						sDateTimeString =  to.getDateInFormat({"date": dThisStartDate}, "dd-MMM-yyyy", false, true);
					else
						sDateTimeString = to.getDateInFormat({"date": dThisStartDate}, "hh:mm dd-MMM-yyyy", to.setting.is24Hour, true) + sSeparator + to.getDateInFormat({"date": dThisEndDate}, "hh:mm dd-MMM-yyyy", to.setting.is24Hour, true);
				}
				else
					sDateTimeString = to.getDateInFormat({"date": dThisStartDate}, "hh:mm dd-MMM-yyyy", to.setting.is24Hour, true) + sSeparator + to.getDateInFormat({"date": dThisEndDate}, "hh:mm dd-MMM-yyyy", to.setting.is24Hour, true);
			}
		}
		else
		{
			if(to.compareDates(dThisStartDate, dThisEndDate) === 0)
				sDateTimeString = to.getDateInFormat({"date": dThisStartDate}, "hh:mm", to.setting.is24Hour, true) + sSeparator + to.getDateInFormat({"date": dThisEndDate}, "hh:mm", to.setting.is24Hour, true);
			else
				sDateTimeString = to.getDateInFormat({"date": dThisStartDate}, "hh:mm dd-MMM-yyyy", to.setting.is24Hour, true) + sSeparator + to.getDateInFormat({"date": dThisEndDate}, "hh:mm dd-MMM-yyyy", to.setting.is24Hour, true);
		}
	
		return sDateTimeString;
	},

	//------------------------------- Date Manipulation Functions End -------------------------------

	//------------------------------------ Events Manipulation Start ------------------------------------

	__isValidUrl: function(sURL)
	{
		 return sURL.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/) ? true : false;
	},

	_isGoogleCalendarUrl: function(sURL)
	{
		return sURL.match("https://www.googleapis.com/calendar/v3/calendars/") ? true : false;
	},

	_convertToISO8601Date: function(dTempDate, sIpTZOffset)
	{
		var to = this;			
		//For example, 2013-12-10T00:00:00+05:30
		return (to.getDateInFormat({"date": dTempDate}, "ISO8601DateTime", false, true) + (sIpTZOffset || to.setting.inputTZOffset));
	},

	// Public Method
	incrementDataLoadingCount: function(iCount)
	{
		var to = this;			
		to.tv.iLoadCnt = to.tv.iLoadCnt + iCount;
		if(to.tv.iLoadCnt === 1)
			to._startDataLoading();
	},

	_startDataLoading: function()
	{
		var to = this;
	
		if(to.tv.iLoadCnt >= 1)
		{
			var $oElem = $(to.elem);
			$oElem.parent().append("<div class='cEventLoaderBg'>");
			var iMainLeftMargin = $oElem.css("margin-left");
			iMainLeftMargin = parseInt(iMainLeftMargin.replace("px", ""));
			var iMainTopMargin = $oElem.css("margin-top");
			iMainTopMargin = parseInt(iMainTopMargin.replace("px", ""));
			var iMainContLeft = $oElem.position().left + iMainLeftMargin,
			iMainContTop = $oElem.position().top + iMainTopMargin,
			iMainContWidth = $oElem.width(),
			iMainContHeight = $oElem.height();
			$(".cEventLoaderBg").css({"left": iMainContLeft, "top": iMainContTop, "width": iMainContWidth, "height": iMainContHeight});
		
			if(to.setting.dataLoadingStart)
				to.setting.dataLoadingStart.call(to, to.setting.visibleView);
		}
	},

	_stopDataLoading: function(dDurationStartDate, dDurationEndDate, loadViewCallback)
	{
		var to = this;
	
		to.tv.iLoadCnt--;
		if(to.tv.iLoadCnt === 0)
		{
			$(".cEventLoaderBg").remove();
			if(to.setting.dataLoadingEnd)
				to.setting.dataLoadingEnd.call(to, to.setting.visibleView);
			if(to.setting.deleteOldDataWhileNavigating)
				to._dataCleaning(dDurationStartDate, dDurationEndDate);
			loadViewCallback();
		}
	},

	__parseJson: function(oTempJson)
	{
		var to = this;
	
		if(to.compareStrings(typeof oTempJson, "string"))
			return $.parseJSON(oTempJson);
		else
			return oTempJson;
	},

	// Public Method
	parseDataSource: function(sSourceTitle, oArrTempJson, dTempDurationStartDate, dTempDurationEndDate, loadViewCallback, oConfig, isGoogleCalendarURL)
	{
		var to = this;
	
		oArrTempJson = to.__parseJson(oArrTempJson);

		if(to.compareStrings(sSourceTitle, "eventSource") && isGoogleCalendarURL)
		{
			to._getModifiedEventsArray(oArrTempJson, oConfig, isGoogleCalendarURL, false);
		}
		else
		{
			if(oArrTempJson.length > 0)
			{
				if(to.compareStrings(sSourceTitle, "eventCalendarSource"))
					to._getModifiedEventCalendarsArray(oArrTempJson);
				else if(to.compareStrings(sSourceTitle, "eventSource"))
					to._getModifiedEventsArray(oArrTempJson, oConfig, isGoogleCalendarURL, false);
				else if(to.compareStrings(sSourceTitle, "sourceCount"))
					to._getModifiedSourceCountArray(oArrTempJson, oConfig);
				else if(to.compareStrings(sSourceTitle, "blockedTimeSource"))
					to._getModifiedBlockedTimeArray(oArrTempJson, oConfig);
			}
			else
			{
				if(to.compareStrings(sSourceTitle, "eventCalendarSource"))
					to.tv.oAECalendar = [];
				else if(to.compareStrings(sSourceTitle, "eventSource"))
					to.tv.oAEvents = [];
				else if(to.compareStrings(sSourceTitle, "sourceCount"))
					to.tv.oASrcCnt = [];
				else if(to.compareStrings(sSourceTitle, "blockedTimeSource"))
					to.tv.oABlockTm  = [];
			}
		}

		
		to._stopDataLoading(dTempDurationStartDate, dTempDurationEndDate, loadViewCallback);
	},

	_parseAllDataSources: function(oSourceJson, oConfig, isGoogleCalendarURL, dTempDurationStartDate, dTempDurationEndDate, loadViewCallback)
	{
		var to = this;
	
		var iDataLoadingCount = 0;
		if(isGoogleCalendarURL)
			iDataLoadingCount++;
		if(oSourceJson.eventCalendarSource !== undefined)
			iDataLoadingCount++;
		if(oSourceJson.eventSource !== undefined)
			iDataLoadingCount++;
		if(oSourceJson.sourceCount !== undefined)
			iDataLoadingCount++;
		if(oSourceJson.blockedTimeSource !== undefined)
			iDataLoadingCount++;
	
		to.incrementDataLoadingCount(iDataLoadingCount);
	
		if(isGoogleCalendarURL)
			to.parseDataSource("eventSource", oSourceJson, dTempDurationStartDate, dTempDurationEndDate, loadViewCallback, oConfig, isGoogleCalendarURL);
		if(oSourceJson.eventCalendarSource !== undefined)
			to.parseDataSource("eventCalendarSource", oSourceJson.eventCalendarSource, dTempDurationStartDate, dTempDurationEndDate, loadViewCallback, oConfig, isGoogleCalendarURL);
		if(oSourceJson.eventSource !== undefined)
			to.parseDataSource("eventSource", oSourceJson.eventSource, dTempDurationStartDate, dTempDurationEndDate, loadViewCallback, oConfig, isGoogleCalendarURL);
		if(oSourceJson.sourceCount !== undefined)
			to.parseDataSource("sourceCount", oSourceJson.sourceCount, dTempDurationStartDate, dTempDurationEndDate, loadViewCallback, oConfig, isGoogleCalendarURL);
		if(oSourceJson.blockedTimeSource !== undefined)
			to.parseDataSource("blockedTimeSource", oSourceJson.blockedTimeSource, dTempDurationStartDate, dTempDurationEndDate, loadViewCallback, oConfig, isGoogleCalendarURL);
	
		if(iDataLoadingCount === 0)
			to._stopDataLoading(dTempDurationStartDate, dTempDurationEndDate, loadViewCallback);
	},

	__parseData: function(bLoadAllData, loadViewCallback)
	{
		var to = this;
	
		if(!bLoadAllData)
			loadViewCallback();
		else
		{
			var dLoadStartDate = null, dLoadEndDate = null,
			dDurationStartDate = null, dDurationEndDate = null;
		
			// ----------------------------- decide whether to load data -------------------------------
			var bFetchAll = false, bFetchDateRange = false;
			var iSourceIndex, oSource;
			for(iSourceIndex = 0; iSourceIndex < to.setting.calDataSource.length; iSourceIndex++)
			{
				oSource = to.setting.calDataSource[iSourceIndex];
				if(to.compareStrings(oSource.sourceFetchType, "All") && !oSource.fetched)
					bFetchAll = true;
				if(to.compareStrings(oSource.sourceFetchType, "DateRange"))
					bFetchDateRange = true;
			}
		
			var bLoadDataInDateRange = false;
			if(bFetchDateRange)
			{
				if(to.compareStrings(to.setting.visibleView, "DetailedMonthView") || to.compareStrings(to.setting.visibleView, "MonthView") || (to.compareStrings(to.setting.visibleView, "AgendaView") && to.compareStrings(to.setting.agendaViewDuration, "Month")))
					bLoadDataInDateRange = true;
				else
				{
					if(to.compareStrings(to.tv.sLoadType, "Prev"))
					{
						var iCompPrevLoadStartDate = to.compareDateTimes(to.tv.dLoadDt, to.tv.dPLSDt),
						bCompPrevLoadStartDate = false;
						if(iCompPrevLoadStartDate >= 0)
							bCompPrevLoadStartDate = true;
						//-------------------------------------------------------------------------------
						var iCompPrevLoadEndDate = to.compareDateTimes(to.tv.dLoadDt, to.tv.dPLEDt),
						bCompPrevLoadEndDate = false;
						if(iCompPrevLoadEndDate <= 0)
							bCompPrevLoadEndDate = true;
						//-------------------------------------------------------------------------------
						if(bCompPrevLoadStartDate && bCompPrevLoadEndDate)
							bLoadDataInDateRange = true;
					}
					else if(to.compareStrings(to.tv.sLoadType, "Next"))
					{
						var iCompNextLoadStartDate = to.compareDateTimes(to.tv.dLoadDt, to.tv.dNLSDt),
						bCompNextLoadStartDate = false;
						if(iCompNextLoadStartDate >= 0)
							bCompNextLoadStartDate = true;		
						//-------------------------------------------------------------------------------		
						var iCompNextLoadEndDate = to.compareDateTimes(to.tv.dLoadDt, to.tv.dNLEDt),
						bCompNextLoadEndDate = false;
						if(iCompNextLoadEndDate <= 0)
							bCompNextLoadEndDate = true;		
						//-------------------------------------------------------------------------------		
						if(bCompNextLoadStartDate && bCompNextLoadEndDate)
							bLoadDataInDateRange = true;
					}
					else
						bLoadDataInDateRange = true;
				}
			
				if(bLoadDataInDateRange)
				{
					//----------------------- set Current Month Start and End Dates -------------------------
					var iMonth = to.tv.dLoadDt.getMonth(),
					iYear = to.tv.dLoadDt.getFullYear(),
					iMonthDays = to.__getNumberOfDaysOfMonth(iMonth, iYear);
				
					//----------------------- set Previous Month Start and End Dates -------------------------	
					var iArrPrev = to._getMonthAndYear(iMonth, iYear, 1, "Prev"),
					iPrevMonth = iArrPrev[0],
					iPrevYear = iArrPrev[1],
					iPrevMonthDays = to.__getNumberOfDaysOfMonth(iPrevMonth, iPrevYear);		
					to.tv.dPLSDt = to.setDateInFormat({"iDate": {d: 1, M: iPrevMonth, y: iPrevYear}}, "START");
					to.tv.dPLEDt = to.setDateInFormat({"iDate": {d: iPrevMonthDays, M: iPrevMonth, y: iPrevYear}}, "START");
				
					//----------------------- set Next Month Start and End Dates -----------------------------
					var iArrNext = to._getMonthAndYear(iMonth, iYear, 1, "Next"),
					iNextMonth = iArrNext[0],
					iNextYear = iArrNext[1],
					iNextMonthDays = to.__getNumberOfDaysOfMonth(iNextMonth, iNextYear);
					to.tv.dNLSDt = to.setDateInFormat({"iDate": {d: 1, M: iNextMonth, y: iNextYear}}, "START");
					to.tv.dNLEDt = to.setDateInFormat({"iDate": {d: iNextMonthDays, M: iNextMonth, y: iNextYear}}, "START");
				
					// ---------------------- set Start and End Dates for loading data ---------------------------
					var iArrLoadPrev = to._getMonthAndYear(iMonth, iYear, to.setting.extraMonthsForDataLoading, "Prev"),
					iLoadPrevMonth = iArrLoadPrev[0],
					iLoadPrevYear = iArrLoadPrev[1],
					iLoadPrevMonthDays = to.__getNumberOfDaysOfMonth(iLoadPrevMonth, iLoadPrevYear),
				
					iArrLoadNext = to._getMonthAndYear(iMonth, iYear, to.setting.extraMonthsForDataLoading, "Next"),
					iLoadNextMonth = iArrLoadNext[0],
					iLoadNextYear = iArrLoadNext[1],
					iLoadNextMonthDays = to.__getNumberOfDaysOfMonth(iLoadNextMonth, iLoadNextYear);
				
					if(to.compareStrings(to.tv.sLoadType, "Load") || to.compareStrings(to.setting.datasetModificationRule, "ReplaceAll"))
					{
						dLoadStartDate = to.setDateInFormat({"iDate": {d: 1, M: iLoadPrevMonth, y: iLoadPrevYear}}, "START");
						dLoadEndDate = to.setDateInFormat({"iDate": {d: iLoadNextMonthDays, M: iLoadNextMonth, y: iLoadNextYear}}, "END");
						dDurationStartDate = dLoadStartDate;
						dDurationEndDate = dLoadEndDate;
					}
					else if(to.compareStrings(to.tv.sLoadType, "Prev"))
					{
						dLoadStartDate = to.setDateInFormat({"iDate": {d: 1, M: iLoadPrevMonth, y: iLoadPrevYear}}, "START");
						dLoadEndDate = to.setDateInFormat({"iDate": {d: iLoadPrevMonthDays, M: iLoadPrevMonth, y: iLoadPrevYear}}, "END");
						dDurationStartDate = new Date(dLoadStartDate);
						dDurationEndDate = to.setDateInFormat({"iDate": {d: iLoadNextMonthDays, M: iLoadNextMonth, y: iLoadNextYear}}, "END");
					}
					else if(to.compareStrings(to.tv.sLoadType, "Next"))
					{
						dLoadStartDate = to.setDateInFormat({"iDate": {d: 1, M: iLoadNextMonth, y: iLoadNextYear}}, "START");
						dLoadEndDate = to.setDateInFormat({"iDate": {d: iLoadNextMonthDays, M: iLoadNextMonth, y: iLoadNextYear}}, "END");
						dDurationStartDate = to.setDateInFormat({"iDate": {d: 1, M: iLoadPrevMonth, y: iLoadPrevYear}}, "START");
						dDurationEndDate = new Date(dLoadEndDate);
					}
				}
			}
		
			if(bLoadDataInDateRange || bFetchAll)
			{
				if(to.compareStrings(to.tv.sLoadType, "Load"))
				{
					to.tv.oAECalendar = [];
					to.tv.oAEvents = [];
					to.tv.oASrcCnt = [];
					to.tv.oABlockTm  = [];
					to.tv.iMaxEvId = 0;
				}
			
				//------------------------ Data Loading Start -----------------------------
			
				for(iSourceIndex = 0; iSourceIndex < to.setting.calDataSource.length; iSourceIndex++)
				{
					oSource = to.setting.calDataSource[iSourceIndex];
					var oConfig = oSource.config || {},
					dTempLoadStartDate = null, dTempLoadEndDate = null, 
					dTempDurationStartDate = null, dTempDurationEndDate = null;
					if(to.compareStrings(oSource.sourceFetchType, "DateRange"))
					{
						dTempLoadStartDate = dLoadStartDate;
						dTempLoadEndDate = dLoadEndDate;
						dTempDurationStartDate = dDurationStartDate;
						dTempDurationEndDate = dDurationEndDate;
					}
				
					if(to.compareStrings(oSource.sourceType, "JSON"))
					{
						var oSourceJson = to.__parseJson(oSource.source);								
						to._parseAllDataSources(oSourceJson, oConfig, false, dTempDurationStartDate, dTempDurationEndDate, loadViewCallback);
					}
					else if(to.compareStrings(oSource.sourceType, "FUNCTION"))
						oSource.source.call(to, dTempLoadStartDate, dTempLoadEndDate, dTempDurationStartDate, dTempDurationEndDate, oConfig, loadViewCallback);
					else if(to.compareStrings(oSource.sourceType, "URL"))
					{
						if(to.__isValidUrl(oSource.source))
						{
							var sBaseUrl = oSource.source,
							bGoogleCalendar = to._isGoogleCalendarUrl(sBaseUrl),
							oUrlParam = {},
							oSourceURLParams = {},
							sTZOffset = oConfig.tzOffset || "";
						
							for(var iSUrlIndex = 0; iSUrlIndex < to.tv.oSURLParams.length; iSUrlIndex++)
							{
								var oSourceURL = to.tv.oSURLParams[iSUrlIndex];
								if(oSourceURL.sourceId === oSource.sourceId)
									oSourceURLParams = oSourceURL.params;
							}
						
							var iSUParamIndex, oSourceParam;
							if(bGoogleCalendar)
							{
								to.tv.bGCData = true;

								sBaseUrl += "/events?callback=?";
								oUrlParam.sortOrder = "ascending";
								oUrlParam.singleEvents = "true";
								oUrlParam.timeZone = to.setting.tz;
								oUrlParam.maxResults = 1000;
								oUrlParam.key = oConfig.googleCalendarApiKey || "";
							
								for(iSUParamIndex = 0; iSUParamIndex < oSourceURLParams.length; iSUParamIndex++)
								{
									oSourceParam = oSourceURLParams[iSUParamIndex];
									oUrlParam[oSourceParam.keyName] = oSourceParam.values;
								}
							
								if(to.compareStrings(oSource.sourceFetchType, "DateRange"))
								{
									if(dTempLoadStartDate !== null && dTempLoadEndDate !== null)
									{
										oUrlParam.timeMin = to._convertToISO8601Date(dTempLoadStartDate, sTZOffset);
										oUrlParam.timeMax = to._convertToISO8601Date(dTempLoadEndDate, sTZOffset);
									}
								}
							}
							else
							{
								oUrlParam.dataType = "json";
								for(iSUParamIndex = 0; iSUParamIndex < oSourceURLParams.length; iSUParamIndex++)
								{
									oSourceParam = oSourceURLParams[iSUParamIndex];
									oUrlParam[oSourceParam.keyName] = oSourceParam.values;
								}
							
								if(to.compareStrings(oSource.sourceFetchType, "DateRange"))
								{
									if(dTempLoadStartDate !== null && dTempLoadEndDate !== null)
									{
										oUrlParam.startdate = to.getDateInFormat({"date": dTempLoadStartDate}, "yyyy-MM-dd", false, false);
										oUrlParam.enddate = to.getDateInFormat({"date": dTempLoadEndDate}, "yyyy-MM-dd", false, false);
										oUrlParam.startdatetime = to.getDateInFormat({"date": to.convertToUTC(dTempLoadStartDate, sTZOffset)}, "yyyy-MM-ddTHH:mm:ss", false, false);
										oUrlParam.enddatetime = to.getDateInFormat({"date": to.convertToUTC(dTempLoadStartDate, sTZOffset)}, "yyyy-MM-ddTHH:mm:ss", false, false);
									}
								}
							}
						
							console.log(sBaseUrl);
							console.log(oUrlParam);
						
							to.incrementDataLoadingCount(1);
							$.getJSON(sBaseUrl, oUrlParam)
							.done(function(sJsonStr)
							{
								to.tv.iLoadCnt--;
								sJsonStr = to.__parseJson(sJsonStr);
								to._parseAllDataSources(sJsonStr, oConfig, bGoogleCalendar, dTempDurationStartDate, dTempDurationEndDate, loadViewCallback);
							})
							.fail(function(oJqXHR, sTextStatus, oError)
							{
								to._stopDataLoading(dTempDurationStartDate, dTempDurationEndDate, loadViewCallback);
								console.log("Request Failed : " + sTextStatus + "  :  " + oError);
							});
						}
						else
							console.log("Invalid Event Source String");
					}
					else
						console.log("Invalid Event Source.");
				
					oSource.fetched = true;
				}					
				//------------------------ Data Loading End -----------------------------	
			}
			else
				loadViewCallback();
		}
	},

	_getModifiedEventCalendarsArray: function(oArrJson)
	{
		var to = this;
	
		if(to.compareStrings(to.setting.datasetModificationRule, "Default"))
			to.tv.oAECalendar = to.tv.oAECalendar.concat(oArrJson);
		else if(to.compareStrings(to.setting.datasetModificationRule, "ReplaceAll"))
			to.tv.oAECalendar = oArrJson;
	},

	_getRecurringEventsArray: function(oArrEntry)
	{
		var to = this;
	
		var oArrEntryIds = [];
	
		for (var i = 0; i < oArrEntry.length; i++) 
		{
			var oEntry = oArrEntry[i],
			sId = oEntry.iCalUID,
			iCount = 0;
			
			for(var j = 0; j < oArrEntryIds.length; j++)
			{
				var oTempEntry = oArrEntryIds[j],
				sTempId = oTempEntry[0],
				iTempCount = parseInt(oTempEntry[1]);
			
				if(sId === sTempId)
				{
					iCount = ++iTempCount;
					oArrEntryIds[j] = [sTempId, iCount];				
					break;
				}
			}
		
			if(iCount === 0)
				oArrEntryIds.push([sId, 1]);
		}
	
		return oArrEntryIds;
	},

	_getModifiedEventsArray: function(oArrJson, oConfig, isGoogleCalendarURL, isConcat)
	{
		var to = this;
	
		var oEvent, iJsonIndex, iTempIndex1, iTempIndex2, iEventIndex, iCalIndex, iEventIndex1,

		oJsonRecord, bEventMatched,

		iJsonObjCount = 0,
		oArrTempTypes = [],
		sColorArray = [],
	
		sInputDateTimeFormat = oConfig.inputDateTimeFormat || "",
		sFormatSeparatorDateTime = oConfig.formatSeparatorDateTime || "",
		sFormatSeparatorDate = oConfig.formatSeparatorDate || "",
		sFormatSeparatorTime = oConfig.formatSeparatorTime || "",
	 	sTZOffset = oConfig.inputTZOffset || to.setting.inputTZOffset;
	 			
		var sColor = oConfig.color || "";
		sColor = (to.compareStrings(sColor, "") || to.compareStrings(sColor, "transparent")) ? "transparent" : sColor;
		var sBorderColor = oConfig.borderColor || "";
		sBorderColor = (to.compareStrings(sBorderColor, "") || to.compareStrings(sBorderColor, "transparent")) ? "transparent" : sBorderColor;
		var sTextColor = oConfig.textColor || "";
		sTextColor = (to.compareStrings(sTextColor, "") || to.compareStrings(sTextColor, "transparent")) ? to.setting.textColor : sTextColor;
	
		var sIcon = null;
		if(oConfig.icon !== null)
			sIcon = oConfig.icon || to.setting.eventIcon;
	
		if(isGoogleCalendarURL)
		{
			var oRoot = oArrJson,
			sType = oRoot.summary,
			oArrEntry = oRoot.items || [],
			oArrEntryIds = to._getRecurringEventsArray(oArrEntry);
		
			oArrJson = [];
			for(iTempIndex1 = 0; iTempIndex1 < oArrEntryIds.length; iTempIndex1++)
			{
				var iTempIdRecord = oArrEntryIds[iTempIndex1],
				iTempId = iTempIdRecord[0],
				iTempCount = iTempIdRecord[1],
				iTempCounter = 1;
			
				for(iTempIndex2 = 0; iTempIndex2 < oArrEntry.length; iTempIndex2++) 
				{
					var oEntry = oArrEntry[iTempIndex2],
					sId = oEntry.iCalUID;
				
					if(iTempId === sId)
					{
						sId = sId.replace("@google.com", "");
					
						var bIsAllDay = (oEntry.start.date) ? true : false,
						sStartDate = bIsAllDay ? oEntry.start.date : oEntry.start.dateTime,
						sEndDate = bIsAllDay ? oEntry.end.date : oEntry.end.dateTime,
						dStartDate = new Date(sStartDate),
						dEndDate = new Date(sEndDate),

						sTitle = oEntry.summary || to.setting.miscStrings.emptyGoogleCalendarEventTitle,
						sUrl = oEntry.htmlLink || "";

						oEvent = new CalEvent(sId, bIsAllDay, sStartDate, sEndDate, sType, sTitle, "", sUrl);
						oArrJson.push(oEvent);
					
						iTempCounter++;
						if(iTempCounter > iTempCount)
							break;
					}
				}
			}
		}
	
		for(iJsonIndex = 0; iJsonIndex < oArrJson.length; iJsonIndex++)
		{
			oJsonRecord = oArrJson[iJsonIndex];
			if(oJsonRecord.start !== null)
			{
				iJsonObjCount++;

				if(oJsonRecord.start !== null)
					oJsonRecord.start = to._getDateObjectFromString(oJsonRecord.start, oJsonRecord.isAllDay, sInputDateTimeFormat, sFormatSeparatorDateTime, sFormatSeparatorDate, sFormatSeparatorTime, sTZOffset);
				if(oJsonRecord.end !== null)
				{
					oJsonRecord.end = to._getDateObjectFromString(oJsonRecord.end, oJsonRecord.isAllDay, sInputDateTimeFormat, sFormatSeparatorDateTime, sFormatSeparatorDate, sFormatSeparatorTime, sTZOffset);
					oJsonRecord.endSpecified = true;
				}
				else
				{
					oJsonRecord.end = to._getUnspecifiedEndDateOfEvent(oJsonRecord.isAllDay, oJsonRecord.start);
					oJsonRecord.endSpecified = false;
				}
			
				bEventMatched = false;
				if(to.compareStrings(to.setting.datasetModificationRule, "ReplaceSpecified"))
				{
					for(iEventIndex = 0; iEventIndex < to.tv.oAEvents.length; iEventIndex++)
					{
						oEvent = to.tv.oAEvents[iEventIndex];
						if(oEvent.id === oJsonRecord.id)
						{
							oJsonRecord.calEventId = oEvent.calEventId;
							bEventMatched = true;
							break;
						}
					}
				}
			
				if(!bEventMatched)
					oJsonRecord.calEventId = ++to.tv.iMaxEvId;
			}
			else
				oJsonRecord.id = "DEL";

			if(oJsonRecord.title === "")
				oJsonRecord.title = to.setting.miscStrings.emptyEventTitle;
		}

		var iDiffCount = oArrJson.length - iJsonObjCount;
		if(iDiffCount !== 0)
		{
			var oArrTemp = [];
			for(iJsonIndex = 0; iJsonIndex < oArrJson.length; iJsonIndex++)
			{
				oJsonRecord = oArrJson[iJsonIndex];						
				if(! to.compareStrings(oJsonRecord.id, "DEL"))
					oArrTemp.push(oJsonRecord);
			}
			oArrJson = oArrTemp;
		}
	
		var sChangeColorBasedOn = oConfig.changeColorBasedOn || to.setting.changeColorBasedOn || "Event";
	
		//-------------------- Set Color For Event Calendar Start ----------------------
		var sTempColor;
		if(to.compareStrings(sChangeColorBasedOn, "EventCalendar"))
		{
			for(iCalIndex = 0; iCalIndex < to.tv.oAECalendar.length; iCalIndex++)
			{
				oThisCalendar = to.tv.oAECalendar[iCalIndex];
				if(oThisCalendar.color !== null && ! to.compareStrings(oThisCalendar.color, ""))
					sColorArray.push(oThisCalendar.color);
				else
				{
					sTempColor = to._generateUniqueColor(sColorArray);
					sColorArray.push(sTempColor);
					oThisCalendar.color = sTempColor;
				}
			
				if(oThisCalendar.icon === null || oThisCalendar.icon === "")
					oThisCalendar.icon = to.setting.eventIcon;
			}
		}
		//-------------------- Set Color For Event Calendar End -----------------------
	
		//-------------------- Set Color For Event Source Start ----------------------
		if(to.compareStrings(sChangeColorBasedOn, "EventSource"))
		{
			sColor = sColor || to._generateUniqueColor(sColorArray);
			sColorArray.push(sColor);
		}
		//-------------------- Set Color For Event Source End ----------------------
	
		// --------------------------- Set Event Properties Start -----------------------------
		for(iJsonIndex = 0; iJsonIndex < oArrJson.length; iJsonIndex++)
		{
			oJsonRecord = oArrJson[iJsonIndex];
			oEventCalendar = to._getEventCalendarObject(oJsonRecord.calendar);
		
			// -------------------------- Assign Color To Event Start ----------------------------	
		
			if(to.compareStrings(sChangeColorBasedOn, "Event"))
			{
				if(oJsonRecord.color === null)
				{
					sTempColor = to._generateUniqueColor(sColorArray);
					sColorArray.push(sTempColor);
					oJsonRecord.color = sTempColor;
				}
				else
					sColorArray.push(oJsonRecord.color);
			
				if(!oJsonRecord.icon)
					oJsonRecord.icon = to.setting.eventIcon;
			}
			else if(to.compareStrings(sChangeColorBasedOn, "EventCalendar"))
			{
				if(oEventCalendar !== null)
				{
					oJsonRecord.color = oEventCalendar.color;
					oJsonRecord.borderColor = oEventCalendar.borderColor;
					oJsonRecord.textColor = oEventCalendar.textColor;
					oJsonRecord.icon = oEventCalendar.icon;
				}
			}
			else if(to.compareStrings(sChangeColorBasedOn, "EventSource"))
			{
				oJsonRecord.color = sColor;
				oJsonRecord.borderColor = sBorderColor;
				oJsonRecord.textColor = sTextColor;
				oJsonRecord.icon = sIcon;
			}
		
			// --------------------------- Assign Color To Event End -----------------------------
		
			// --------------------------- Set Movement Properties Start ----------------------------
		
			oJsonRecord.isDragNDropInMonthView = oConfig.isDragNDropInMonthView || ((oEventCalendar) ? oEventCalendar.isDragNDropInMonthView : "") || oJsonRecord.isDragNDropInMonthView || to.setting.isDragNDropInMonthView;
			oJsonRecord.isDragNDropInQuickAgendaView = oConfig.isDragNDropInQuickAgendaView || ((oEventCalendar) ? oEventCalendar.isDragNDropInQuickAgendaView : "") || oJsonRecord.isDragNDropInQuickAgendaView || to.setting.isDragNDropInQuickAgendaView;
			oJsonRecord.isDragNDropInDetailView = oConfig.isDragNDropInDetailView || ((oEventCalendar) ? oEventCalendar.isDragNDropInDetailView : "") || oJsonRecord.isDragNDropInDetailView || to.setting.isDragNDropInDetailView;
			oJsonRecord.isResizeInDetailView = oConfig.isResizeInDetailView || ((oEventCalendar) ? oEventCalendar.isResizeInDetailView : "") || oJsonRecord.isResizeInDetailView || to.setting.isResizeInDetailView;
		
			// --------------------------- Set Movement Properties End -----------------------------
		}
		// ------------------------------- Set Event Properties End ---------------------------------
	
		if(isConcat)
			to.tv.oAEvents = to.tv.oAEvents.concat(oArrJson);
		else
		{
			if(to.compareStrings(to.setting.datasetModificationRule, "Default"))
				to.tv.oAEvents = to.tv.oAEvents.concat(oArrJson);
			else if(to.compareStrings(to.setting.datasetModificationRule, "ReplaceAll"))
				to.tv.oAEvents = oArrJson;
			else if(to.compareStrings(to.setting.datasetModificationRule, "ReplaceSpecified"))
			{
				for(iEventIndex1 = 0; iEventIndex1 < oArrJson.length; iEventIndex1++)
				{
					var oEvent1 = oArrJson[iEventIndex1];
					bEventMatched = false;
					for(var iEventIndex2 = 0; iEventIndex2 < to.tv.oAEvents.length; iEventIndex2++)
					{
						var oEvent2 = to.tv.oAEvents[iEventIndex2];
						if(oEvent2.id === oEvent1.id)
						{
							oEvent2 = oEvent1;
							bEventMatched = true;
							break;
						}
					}
				
					if(!bEventMatched)
						to.tv.oAEvents.append(oEvent1);
				}
			}
		}			
	},

	_getModifiedSourceCountArray: function(oArrJson, oConfig)
	{
		var to = this;
		var sInputDateTimeFormat = oConfig.inputDateTimeFormat || "",
		sFormatSeparatorDateTime = oConfig.formatSeparatorDateTime || "",
		sFormatSeparatorDate = oConfig.formatSeparatorDate || "",
		sFormatSeparatorTime = oConfig.formatSeparatorTime || "",
	 	sTZOffset = oConfig.inputTZOffset || to.setting.inputTZOffset;
	
		var oArrTemp = [];			
		for(var iJsonIndex = 0; iJsonIndex < oArrJson.length; iJsonIndex++)
		{
			var oJsonRecord = oArrJson[iJsonIndex];
			if(oJsonRecord.date !== null)
			{
				oJsonRecord.date = to._getDateObjectFromString(oJsonRecord.date, true, sInputDateTimeFormat, sFormatSeparatorDateTime, sFormatSeparatorDate, sFormatSeparatorTime, sTZOffset);
				if(oJsonRecord.date !== "")
					oArrTemp.push(oJsonRecord);
			}
		}
	
		if(to.compareStrings(to.setting.datasetModificationRule, "Default"))
			to.tv.oASrcCnt = to.tv.oASrcCnt.concat(oArrTemp);
		else if(to.compareStrings(to.setting.datasetModificationRule, "ReplaceAll"))
			to.tv.oASrcCnt = oArrTemp;
		else if(to.compareStrings(to.setting.datasetModificationRule, "ReplaceSpecified"))
		{
			for(var iTempIndex1 = 0; iTempIndex1 < oArrTemp.length; iTempIndex1++)
			{
				var bMatchedRecord = false,
				oRecord1 = oArrTemp[iTempIndex1];
				for(var iTempIndex2 = 0; iTempIndex2 < to.tv.oASrcCnt.length; iTempIndex2++)
				{
					var oRecord2 = to.tv.oASrcCnt[iTempIndex2];
					if(to.compareDateTimes(oRecord1.date, oRecord2.date) === 0)
					{
						oRecord2 = oRecord1;
						bMatchedRecord = true;
					}
				}
				if(!bMatchedRecord)
					to.tv.oASrcCnt.append(oRecord1);
			}
		}
	
		return oArrTemp;
	},

	_getModifiedBlockedTimeArray: function(oArrJson, oConfig)
	{
		var to = this;

		var sInputDateTimeFormat = oConfig.inputDateTimeFormat || "",
		sFormatSeparatorDateTime = oConfig.formatSeparatorDateTime || "",
		sFormatSeparatorDate = oConfig.formatSeparatorDate || "",
		sFormatSeparatorTime = oConfig.formatSeparatorTime || "",
	 	sTZOffset = oConfig.inputTZOffset || to.setting.inputTZOffset;
	
		for(var iJsonIndex = 0; iJsonIndex < oArrJson.length; iJsonIndex++)
		{
			var oJsonRecord = oArrJson[iJsonIndex];
			if(oJsonRecord.start !== null)
			{
				if(oJsonRecord.start !== null)
					oJsonRecord.start = to._getDateObjectFromString(oJsonRecord.start, oJsonRecord.isAllDay, sInputDateTimeFormat, sFormatSeparatorDateTime, sFormatSeparatorDate, sFormatSeparatorTime, sTZOffset);
				if(oJsonRecord.end !== null)
					oJsonRecord.end = to._getDateObjectFromString(oJsonRecord.end, oJsonRecord.isAllDay, sInputDateTimeFormat, sFormatSeparatorDateTime, sFormatSeparatorDate, sFormatSeparatorTime, sTZOffset);
				if(oJsonRecord.isAllDay)
				{
					oJsonRecord.start = to.setDateInFormat({"date": oJsonRecord.start}, "START");
					oJsonRecord.end = to.setDateInFormat({"date": oJsonRecord.end}, "END");
				}
				oJsonRecord.end = to._normalizeEndDateTime(oJsonRecord.end);
			}
		}
	
		if(to.compareStrings(to.setting.datasetModificationRule, "Default"))
			to.tv.oABlockTm = to.tv.oABlockTm.concat(oArrJson);
		else if(to.compareStrings(to.setting.datasetModificationRule, "ReplaceAll"))
			to.tv.oABlockTm = oArrJson;
	},

	_dataCleaning: function(dDurationStartDate, dDurationEndDate)
	{
		var to = this;
	
		if(to.compareStrings(to.tv.sLoadType, "Load"))
		{
			if(to.tv.oAEvents.length > 0)
				to.tv.oAEvents = to._sortEvents(to.tv.oAEvents);
		}
		else if(to.compareStrings(to.tv.sLoadType, "Prev") || to.compareStrings(to.tv.sLoadType, "Next"))
		{
			if(to.tv.oAEvents.length > 0)
			{
				if(dDurationStartDate !== null && dDurationEndDate !== null)
					to._deleteEventsOutOfDuration(dDurationStartDate, dDurationEndDate);
				to.tv.oAEvents = to._sortEvents(to.tv.oAEvents);
			}

			if(to.tv.oASrcCnt.length > 0 && dDurationStartDate !== null && dDurationEndDate !== null)
				to._deleteSourceCountOutOfDuration(dDurationStartDate, dDurationEndDate);
		
			if(to.tv.oABlockTm.length > 0 && dDurationStartDate !== null && dDurationEndDate !== null)
				to._deleteBlockedTimeOutOfDuration(dDurationStartDate, dDurationEndDate);
		}
	},

	_deleteEventsOutOfDuration: function(dTempStartDate, dTempEndDate)
	{
		var to = this;
		var iTempIndex, oThisEvent;
	
		for(iTempIndex = 0; iTempIndex < to.tv.oAEvents.length; iTempIndex++)
		{	
			oThisEvent = to.tv.oAEvents[iTempIndex];
			if(to.compareStrings(to.tv.sLoadType, "Prev"))
			{
				if(to.compareDateTimes(oThisEvent.start, dTempEndDate) > 0)
					oThisEvent.id = "DEL";
			}
			else if(to.compareStrings(to.tv.sLoadType, "Next"))
			{
				if( to.compareDateTimes(oThisEvent.end, dTempStartDate) < 0)
					oThisEvent.id = "DEL";
			}
		}
	
		var oArrTemp = [];
		for(iTempIndex = 0; iTempIndex < to.tv.oAEvents.length; iTempIndex++)
		{
			oThisEvent = to.tv.oAEvents[iTempIndex];
			if(! to.compareStrings(oThisEvent.id, "DEL"))
				oArrTemp.push(oThisEvent);
		}
	
		to.tv.oAEvents = oArrTemp;
	},

	_deleteSourceCountOutOfDuration: function(dDurationStartDate, dDurationEndDate)
	{
		var to = this;
		var iTempIndex, oTemp;
		for(iTempIndex = 0; iTempIndex < to.tv.oASrcCnt.length; iTempIndex++)
		{
			oTemp = to.tv.oASrcCnt[iTempIndex];
			var dTempDate = new Date(oTemp.date);
			if(to.compareStrings(to.tv.sLoadType, "Prev"))
			{
				if(to.compareDates(dTempDate, dDurationEndDate) > 0)
					oTemp.date = "DEL";
			}
			else if(to.compareStrings(to.tv.sLoadType, "Next"))
			{
				if(to.compareDates(dTempDate, dDurationStartDate) < 0)
					oTemp.date = "DEL";
			}
		}
	
		var oArrTemp = [];
		for(iTempIndex = 0; iTempIndex < to.tv.oASrcCnt.length; iTempIndex++)
		{
			oTemp = to.tv.oASrcCnt[iTempIndex];
			if(! to.compareStrings(oTemp.date, "DEL"))
				oArrTemp.push(oTemp);
		}
	
		to.tv.oASrcCnt = oArrTemp;
	},

	_deleteBlockedTimeOutOfDuration: function(dDurationStartDate, dDurationEndDate)
	{
		var to = this;
		var iTempIndex, oTemp;
	
		for(iTempIndex = 0; iTempIndex < to.tv.oABlockTm.length; iTempIndex++)
		{
			oTemp = to.tv.oABlockTm[iTempIndex];
			if(to.compareStrings(to.tv.sLoadType, "Prev"))
			{
				if(to.compareDateTimes(oTemp.start, dDurationEndDate) > 0)
					oTemp.start = "DEL";
			}
			else if(to.compareStrings(to.tv.sLoadType, "Next"))
			{
				if(to.compareDateTimes(oTemp.end, dDurationStartDate) < 0)
					oTemp.start = "DEL";
			}
		}
	
		var oArrTemp = [];
		for(iTempIndex = 0; iTempIndex < to.tv.oABlockTm.length; iTempIndex++)
		{
			oTemp = to.tv.oABlockTm[iTempIndex];
			if(! to.compareStrings(oTemp.start, "DEL"))
				oArrTemp.push(oTemp);
		}
	
		to.tv.oABlockTm = oArrTemp;
	},

	//----------------------------------------------------------------------------------------------

	// Public Method
	addEventsForSource: function(oArrNewEvents, iSourceId)
	{
		var to = this;
	
		oArrNewEvents = to.__parseJson(oArrNewEvents);
		for(var iSourceIndex = 0; iSourceIndex < to.setting.calDataSource.length; iSourceIndex++)
		{
			var oTempSource = to.setting.calDataSource[iSourceIndex];
			if(oTempSource.sourceId === iSourceId)
			{
				if(oArrNewEvents.length > 0)
					to._getModifiedEventsArray(oArrNewEvents, (oTempSource.config || {}), (typeof oTempSource.source === "string") ? to._isGoogleCalendarUrl(oTempSource.source) : false, true);
				break;
			}
		}
	},

	_replaceEventWithId: function(sExistingEventId, oNewEvent)
	{
		var to = this;
	
		for(var iTempIndex = 0; iTempIndex < to.tv.oAEvents.length; iTempIndex++)
		{
			var oEv = to.tv.oAEvents[iTempIndex];
			if(oEv.id === sExistingEventId)
			{
				oEv = oNewEvent;
				break;
			}
		}
	},

	_replaceEventsWithRule: function(sReplaceRule, oArrNewEvents)
	{
		var to = this;			
		to._removeEventsWithRule(sReplaceRule);
		to.tv.oAEvents.append(oArrNewEvents);
	},

	// Public Method
	replaceEvents: function(oArrNewEvents)
	{
		var to = this;			
		for(var iTempIndex = 0; iTempIndex < oArrNewEvents.length; iTempIndex++)
		{
			var oNewEventRecord = oArrNewEvents[iTempIndex],
			sExistingEventId = oNewEventRecord.replaceId,
			sReplaceRule = oNewEventRecord.replaceRule;
		
			if(sExistingEventId !== null || sExistingEventId !== undefined || sExistingEventId !== "")
				to._replaceEventWithId(sExistingEventId, oNewEventRecord.event);
			else if(sReplaceRule !== null || sReplaceRule !== undefined || sReplaceRule !== "")
				to._replaceEventsWithRule(sReplaceRule, oNewEventRecord.events);					
		}
	},

	// Public Method
	revertToOriginalEvent: function(oDraggedEvent, startDateBeforeChange, endDateBeforeChange)
	{
		var to = this;			
		if(to.__updateEventWithId(oDraggedEvent.calEventId, startDateBeforeChange, endDateBeforeChange))
			to.__reloadCurrentView(true, false);
	},

	_removeEventsWithIds: function(sArrRemoveIds)
	{
		var to = this;			
		var oArrEventsTemp = [];
		for(var iTempIndex1 = 0; iTempIndex1 < sArrRemoveIds.length; iTempIndex1++)
		{
			for(var iTempIndex2 = 0; iTempIndex2 < to.tv.oAEvents.length; iTempIndex2++)
			{
				var oTempEvent = to.tv.oAEvents[iTempIndex2];
				if(oTempEvent.id != sArrRemoveIds[iTempIndex1])
					oArrEventsTemp.push(oTempEvent.id);
			}
		}
		to.tv.oAEvents = oArrEventsTemp;
	},

	_removeEventsWithRule: function(sRemoveRule)
	{
		var to = this;			
		var oArrEventsTemp = [];
		for(var iTempIndex = 0; iTempIndex < to.tv.oAEvents.length; iTempIndex++)
		{
			var oEv = to.tv.oAEvents[iTempIndex];
			if(!eval(sRemoveRule))
				oArrEventsTemp.push(oEv);
		}
		to.tv.oAEvents = oArrEventsTemp;
	},

	// Public Method
	removeEvents: function(oArrRemove)
	{
		var to = this;			
		for(var iTempIndex = 0; iTempIndex < oArrRemove.length; iTempIndex++)
		{
			var oRemove = oArrRemove[iTempIndex],
			sArrRemoveIds = oRemove.removeIds,
			sRemoveRule = oRemove.removeRule;
			if(sArrRemoveIds !== null || sArrRemoveIds !== undefined || sArrRemoveIds !== "")
				to._removeEventsWithIds(sArrRemoveIds);
			if(sRemoveRule !== null || sRemoveRule !== undefined || sRemoveRule !== "")
				to._removeEventsWithRule(sRemoveRule);
		}
	},

	//----------------------------------------------------------------------------------------------

	_getEventCalendarObject: function(sEventCalendar)
	{
		var to = this;			
		for(var iCalIndex = 0; iCalIndex < to.tv.oAECalendar.length; iCalIndex++)
		{
			var oThisCalendar = to.tv.oAECalendar[iCalIndex];
			if(to.compareStrings(sEventCalendar, oThisCalendar.calendar))
				return oThisCalendar;
		}
		return null;
	},

	// Public Method
	getEventWithId: function(sId)
	{
		var to = this;
		var oEventRecord;
		for(var iEventIndex = 0; iEventIndex < to.tv.oAEvents.length; iEventIndex++)
		{
			var oEventRecord = to.tv.oAEvents[iEventIndex];
			if(oEventRecord.calEventId === parseInt(sId))
				return oEventRecord;
		}
		return {};
	},

	__updateEventWithId: function(sId, newStartDate, newEndDate)
	{
		var to = this;
	
		var bSuccess = false;
		for(var iEventIndex = 0; iEventIndex < to.tv.oAEvents.length; iEventIndex++)
		{
			if(to.tv.oAEvents[iEventIndex].calEventId === parseInt(sId))
			{
				to.tv.oAEvents[iEventIndex].start = newStartDate;
				if(newEndDate !== null)
					to.tv.oAEvents[iEventIndex].end = newEndDate;
				else
					to.tv.oAEvents[iEventIndex].end = new Date(newStartDate.getTime() + ($.CalenStyle.extra.iMS.m * 30));
				bSuccess = true;
				break;
			}
		}
		to.tv.oAEvents = to._sortEvents(to.tv.oAEvents);	
		return bSuccess;
	},

	_normalizeEndDateTime: function(sDate)
	{
		var to = this;			
		if(sDate.getHours() === 0 && sDate.getMinutes() === 0 && sDate.getSeconds() === 0)
			sDate = new Date(sDate.getTime() - $.CalenStyle.extra.iMS.m);
		return sDate;
	},

	_getUnspecifiedEndDateOfEvent: function(bIsAllDay, dTempStartDate)
	{
		var to = this;
		if(bIsAllDay)
			return new Date(dTempStartDate.getFullYear(), dTempStartDate.getMonths(), (dTempStartDate.getDate() + (to.setting.allDayEventDuration - 1)), 0, 0, 0, 0);
		else
			return new Date(dTempStartDate.getTime() + (to.setting.eventDuration * $.CalenStyle.extra.iMS.m));
	},

	_getStartAndEndDatesOfEvent: function(bIsAllDay, dStartDateTime, dEndDateTime)
	{
		var to = this;
	
		var dTempStartDate, dTempEndDate;
		if(bIsAllDay)
		{
			dTempStartDate = to.setDateInFormat({"date": dStartDateTime}, "START");
			if(dEndDateTime !== null)
				dTempEndDate = to.setDateInFormat({"date": dEndDateTime}, "START");
			else
				dTempEndDate = to._getUnspecifiedEndDateOfEvent(bIsAllDay, dTempStartDate);
		}
		else
		{
			dTempStartDate = new Date(dStartDateTime);
			if(dEndDateTime !== null)
				dTempEndDate = new Date(dEndDateTime);
			else
				dTempEndDate = to._getUnspecifiedEndDateOfEvent(bIsAllDay, dTempStartDate);
		}	
		return [dTempStartDate, dTempEndDate];
	},

	__getStartAndEndDatesOfEventForView: function(bIsAllDay, dStartDateTime, dEndDateTime)
	{
		var to = this;
	
		var dArrTemp = to._getStartAndEndDatesOfEvent(bIsAllDay, dStartDateTime, dEndDateTime),
		dNewStartDateTime = new Date(dArrTemp[0]),
		dNewEndDateTime = new Date(dArrTemp[1]),
	
		iCompStartDates = to.compareDates(dNewStartDateTime, to.tv.dVDSDt),
		iCompEndDates = to.compareDates(dNewEndDateTime, to.tv.dVDEDt),
	
		dTempStartDate = new Date(dNewStartDateTime),
		dTempEndDate = new Date(dNewEndDateTime);
	
		if(iCompStartDates < 0)
			dTempStartDate = to.tv.dVDSDt;
		if(iCompEndDates > 0)
			dTempEndDate = to.tv.dVDEDt;
	
		return [dTempStartDate, dTempEndDate];
	},

	// Public Method
	getDurationOfEventInHHmmFormat: function(dStartDateTime, dEndDateTime)
	{
		var to = this;			
		var iTotalMinutes = Math.ceil((dTempEndDate.getTime() - dTempStartDate.getTime()) / $.CalenStyle.extra.iMS.m);
		return [Math.floor(iTotalMinutes / 60), (iTotalMinutes % 60)];				
	},

	__getNumberOfHoursOfEvent: function(bIsAllDay, dStartDateTime, dEndDateTime)
	{
		var to = this;
	
		var dArrTempDates = to._getStartAndEndDatesOfEvent(bIsAllDay, dStartDateTime, dEndDateTime),
		dTempStartDate = dArrTempDates[0],
		dTempEndDate = dArrTempDates[1],
		iDiffStartAndEnd = dTempEndDate.getTime() - dTempStartDate.getTime(),
		iNumOfHours = Math.round(iDiffStartAndEnd / $.CalenStyle.extra.iMS.h);
		if(iNumOfHours <= 0 && iDiffStartAndEnd > 0)
			iNumOfHours = 1;
		return iNumOfHours;
	},

	// Public Method
	getNumberOfDaysOfEvent: function(bIsAllDay, dStartDateTime, dEndDateTime, bWithHours, bForView, bActualStartDate)
	{
		var to = this;
		var dTempEndDateTime;
		if(bIsAllDay && to.compareDateTimes(dStartDateTime, dEndDateTime) === 0 && bActualStartDate)
			dTempEndDateTime = new Date(dEndDateTime.getTime() + $.CalenStyle.extra.iMS.d);
		else
			dTempEndDateTime = new Date(dEndDateTime);
		if(dTempEndDateTime.getHours() === 0 && dTempEndDateTime.getMinutes() === 0)
			dTempEndDateTime.setMinutes(dTempEndDateTime.getMinutes() - 1);
	
		var iNumOfDays = 0,
		iNumOfHours = to.__getNumberOfHoursOfEvent(bIsAllDay, dStartDateTime, dTempEndDateTime),
		dArrTempDates = to._getStartAndEndDatesOfEvent(bIsAllDay, dStartDateTime, dTempEndDateTime),
		dTempStartDate = dArrTempDates[0],
		dTempEndDate = dArrTempDates[1],
		bCompTempStartEnd = to.compareDates(dTempStartDate, dTempEndDate);

		//console.log(dStartDateTime + " " + dTempEndDateTime + " " + iNumOfHours + " " + bCompTempStartEnd);
		
		if(iNumOfHours <= 0)
		{
			if(bIsAllDay && bCompTempStartEnd <= 0)
			{
				iNumOfHours = 24;
				iNumOfDays = 1;
			}
			else
				console.log("Invalid Start And End Dates " + dStartDateTime + " " + dTempEndDateTime);
		}
		else
		{
			if(bCompTempStartEnd < 0)
			{
				var dNewStartDate = to.setDateInFormat({"date": dTempStartDate}, "START"),
				dNewEndDate = to.setDateInFormat({"date": dTempEndDate}, "START"),
				iNewNumOfHours = (dNewEndDate.getTime() - dNewStartDate.getTime()) / $.CalenStyle.extra.iMS.h;					
				iNumOfDays = Math.round(iNewNumOfHours / 24) + 1;
			
				if(bForView)
				{
					var dTempDate = new Date(dNewStartDate), iTempNumOfDays = 0;
					for(var iTempIndex = 0; iTempIndex < iNumOfDays; iTempIndex++)
					{
						if(to.__findWhetherDateIsVisibleInCurrentView(dTempDate, (bIsAllDay || iNumOfHours > 23), dTempStartDate, dTempEndDate))
							iTempNumOfDays++;
						dTempDate.setDate(dTempDate.getDate() + 1);
					}
					iNumOfDays = iTempNumOfDays;							
				}
			}
			else if(bCompTempStartEnd == 0)
			{
				if(bForView)
				{
					if(to.__findWhetherDateIsVisibleInCurrentView(dTempStartDate, (bIsAllDay || iNumOfHours > 23), dTempStartDate, dTempEndDate))
						iNumOfDays = 1;
				}
				else
					iNumOfDays = 1;
			}
		}
	
		if(bWithHours)
			return [iNumOfDays, iNumOfHours];
		else
			return iNumOfDays;
	},

	_sortEvents: function(oArrTempEvents)
	{
		var to = this;
	
		for(var iOuterIndex = 0; iOuterIndex < oArrTempEvents.length; iOuterIndex++)
		{
			var oOuterEvent = oArrTempEvents[iOuterIndex],
			dOuterStartDate = oOuterEvent.start,
			oTempEvent;
		
			for(var iInnerIndex = (iOuterIndex + 1); iInnerIndex < oArrTempEvents.length; iInnerIndex++)
			{
				var oInnerEvent = oArrTempEvents[iInnerIndex],
				dInnerStartDate = oInnerEvent.start,
				
				iCompTimes = to.compareDateTimes(dOuterStartDate, dInnerStartDate);
				if(iCompTimes > 0)
				{
					oTempEvent = oOuterEvent;
					oOuterEvent = oInnerEvent;
					oInnerEvent = oTempEvent;
				
					oArrTempEvents[iOuterIndex] = oOuterEvent;
					oArrTempEvents[iInnerIndex] = oInnerEvent;
				
					dOuterStartDate = oOuterEvent.start;
				}
				else if(iCompTimes === 0)
				{
					var iOuterEventHours = to.__getNumberOfHoursOfEvent(oOuterEvent.isAllDay, oOuterEvent.start, oOuterEvent.end),
					iInnerEventHours = to.__getNumberOfHoursOfEvent(oInnerEvent.isAllDay, oInnerEvent.start, oInnerEvent.end);
					if(iOuterEventHours < iInnerEventHours)
					{
						oTempEvent = oOuterEvent;
						oOuterEvent = oInnerEvent;
						oInnerEvent = oTempEvent;
					
						oArrTempEvents[iOuterIndex] = oOuterEvent;
						oArrTempEvents[iInnerIndex] = oInnerEvent;
					
						dOuterStartDate = oOuterEvent.start;
					}
				}
			}
		}			
		return oArrTempEvents;
	},

	_whetherEventIsBetweenDates: function(oTempEvent, dTempStartDate, dTempEndDate)
	{
		var to = this;
	
		var dEventStartDate = oTempEvent.start,
		dEventEndDate = oTempEvent.end,
		bIsAllDay = oTempEvent.isAllDay,
	
		iCompStartDate1 = to.compareDates(dEventStartDate, dTempStartDate),
		iCompEndDate1 = to.compareDates(dEventEndDate, dTempStartDate),
		iCompStartDate2 = to.compareDates(dEventStartDate, dTempEndDate),
		iCompEndDate2 = to.compareDates(dEventEndDate, dTempEndDate),
	
		bEventStartDate, bEventEndDate;
	
		if(iCompEndDate1 === 0 && (dEventEndDate.getHours() === 0 && dEventEndDate.getMinutes() === 0))
		{
			if(!bIsAllDay)
				iCompEndDate1 = -1;
			else
			{
				var bActualEventDuration = to.__getNumberOfHoursOfEvent(bIsAllDay, dEventStartDate, dEventEndDate) > 0,
				bCurrentEventDuration = to.__getNumberOfHoursOfEvent(bIsAllDay, dTempStartDate, dEventEndDate) > 0;

				if(bActualEventDuration && !bCurrentEventDuration)
					iCompEndDate1 = -1;
			}
		}
	
		bEventStartDate = (iCompStartDate2 <= 0) ? true : false;
		bEventEndDate = (iCompEndDate1 >= 0) ? true : false;
	
		if(bEventStartDate && bEventEndDate)
			return true;
		else
			return false;
	},

	// Public Method
	getArrayOfEventsForView: function(dTempViewStartDate, dTempViewEndDate)
	{
		var to = this;
	
		dTempViewStartDate = to.setDateInFormat({"date": dTempViewStartDate}, "START");
		dTempViewEndDate = to.setDateInFormat({"date": dTempViewEndDate}, "END");
			
		var oAEventsInRange = [],
		oArrTempEvents = [];	
		for(var iEventIndex = 0; iEventIndex < to.tv.oAEvents.length; iEventIndex++)
		{
			var oTempEvent = to.tv.oAEvents[iEventIndex];				
			if(to._whetherEventIsBetweenDates(oTempEvent, dTempViewStartDate, dTempViewEndDate))
			{
				oAEventsInRange.push(oTempEvent);					
				oArrTempEvents.push(oTempEvent);
			}
		}
		return oArrTempEvents;
	},

	__getSourceCountForDate: function(dTemp)
	{
		var to = this,
		iTempIndex, iTempIndex1,
		iSourceCount = 0;
		if(to.tv.oASrcCnt.length > 0)
		{
			for(iTempIndex = 0; iTempIndex < to.tv.oASrcCnt.length; iTempIndex++)
			{
				var oSourceCount = to.tv.oASrcCnt[iTempIndex];
				if(to.compareDates(oSourceCount.date, dTemp) == 0)
				{
					iSourceCount = oSourceCount.count;
					break;
				}
			}
		}
		else if(to.setting.parentObject !== null)
		{
			//console.log("Parent Event Count : " + to.setting.parentObject.tv.oAEvents.length);
			for(iTempIndex1 = 0; iTempIndex1 < to.setting.calDataSource.length; iTempIndex1++)
			{
				var oSource = to.setting.calDataSource[iTempIndex1];
				var sSourceCountType = oSource.config.sourceCountType;
				if(to.compareStrings(sSourceCountType, "Event"))
				{
					for(iTempIndex = 0; iTempIndex < to.setting.parentObject.tv.oAEvents.length; iTempIndex++)
					{
						var oEvent = to.setting.parentObject.tv.oAEvents[iTempIndex],
						dStartDate = oEvent.start,
						dEndDate = oEvent.end,

						bCompStart = (compareDates(dTemp, dStartDate) >= 0),
						bCompEnd = (compareDates(dTemp, dEndDate) <= 0);

						if(bCompStart && bCompEnd)
							iSourceCount++;
					}
				}
			}
		}
		return iSourceCount;
	},

	//------------------------------------ Events Manipulation End ------------------------------------

	//--------------------------------- Miscellaneous Functions Start ---------------------------------

	_generateUniqueColor: function(sColorArray)
	{
		var to = this;			
		var sTempColor = "", bMatchFound;
	
		if(to.setting.eventColorsArray.length > sColorArray.length)
		{
			for(iTempIndex1 = 0; iTempIndex1 < to.setting.eventColorsArray.length; iTempIndex1++)
			{
				var sColor1 = to.setting.eventColorsArray[iTempIndex1];
				bMatchFound = false;
				for(iTempIndex2 = 0; iTempIndex2 < sColorArray.length; iTempIndex2++)
				{
					var sColor2 = sColorArray[iTempIndex2];
					if(sColor1 === sColor2)
					{
						bMatchFound = true;
						break;
					}
				}
				
				if(! bMatchFound)
					sTempColor = sColor1;
			}
		}
	
		if(to.compareStrings(sTempColor, ""))
		{
			var i = 0;
			bMatchFound = true;
			while(bMatchFound)
			{
				bMatchFound = false;
				sTempColor = to._generateColor();
				if(sColorArray.length > 0)
				{
					for(var iColorIndex = 0; iColorIndex < sColorArray.length; iColorIndex++)
					{
						if(sTempColor === sColorArray[iColorIndex])
						{
							bMatchFound = true;
							break;
						}
					}
				}
				i = i + 1;
			}
		}
	
		return sTempColor;
	},

	_generateColor: function()
	{
		var to = this;
	
		var iR = Math.floor(100 * Math.random()) + 100, 
		iG = Math.floor(100 * Math.random()) + 100,
		iB = Math.floor(100 * Math.random()) + 100,
	
		sR = iR.toString(16),
		sG = iG.toString(16),
		sB = iB.toString(16);

		sR = (sR.length === 1) ? ("0"+sR) : sR;
		sG = (sG.length === 1) ? ("0"+sG) : sG;
		sB = (sR.length === 1) ? ("0"+sB) : sB;
	
		return sR + sG + sB;
	},
		
	__bindClick: function(e)
	{
		var oData = e.data, to;
		for(var iTempIndex = 0; iTempIndex < $.CalenStyle.extra.oArrCalenStyle.length; iTempIndex++)
		{
			var oThisCalenStyle = $.CalenStyle.extra.oArrCalenStyle[iTempIndex]; 
			if(oThisCalenStyle.tv.pluginId === oData.pluginId)
				to = oThisCalenStyle;
		}

		e.stopPropagation();
		if($(to.elem).find(oData.eventElemSelector).hasClass("cEditingEvent"))
			return;
	
		if(to.setting.eventClicked)
			to.setting.eventClicked.call(to, to.setting.visibleView, oData.eventElemSelector, to.getEventWithId(oData.eventId));
		else
		{
			if(!to.compareStrings(oData.url, ""))
				window.open(oData.url, "_blank");
		}
	},

	__getElementsAtPoint: function(iLeft, iTop)
	{
		return $("body")
				   .find("*")
				   .filter(function() 
				   {
				   		var iLeft1 = $(this).offset().left,
				   		iLeft2 = iLeft1 + $(this).width(),
				   		iTop1 = $(this).offset().top,
				   		iTop2 = iTop1 + $(this).height();
				   		
						return (iLeft >= iLeft1 && iLeft <= iLeft2 && iTop >= iTop1 && iTop <= iTop2);
				   });
	},

	//--------------------------------- Miscellaneous Functions End ---------------------------------

};

/*! ------------------------------------ Common Functions End ------------------------------------ */




/*! ------------------------------------ CalenStyle Month View Start ----------------------------------- */

CalenStyle.prototype = $.extend(CalenStyle.prototype, {

	_arrayContains: function(iArrTemp, iValue)
	{
		var to = this;
		for(var iTempIndex = 0; iTempIndex < iArrTemp.length; iTempIndex++)
		{
			if(iArrTemp[iTempIndex] === iValue)
				return 1;
		}
		return 0;
	},

	_setNextPreviousMonthDates: function()
	{
		var to = this;
	
		var dPrevMonthDate = new Date(to.tv.dCMDt.getTime() - (30 * $.CalenStyle.extra.iMS.d));
		dPrevMonthDate.setDate(15);
		to.tv.dPMDt = new Date(dPrevMonthDate);
	
		var dNMDt = new Date(to.tv.dCMDt.getTime() + (30 * $.CalenStyle.extra.iMS.d));
		dNMDt.setDate(15);
		to.tv.dNMDt = new Date(dNMDt);
	},

	_updateMonthTable: function()
	{
		var to = this;
	
		to.__getCurrentViewDates();
	
		var sTempStr = "";	
		sTempStr += "<thead>";
		sTempStr += "<tr class='cmvMonthTableRowDayHeader'>";
		if(to.setting.displayWeekNumInMonthView)
			sTempStr += "<td class='cmvDayHeader cmvWeekNumber cmvThinBorderRight cmvFirstColumn'></td>"; 
		var iCountDays = to.setting.weekStartDay,
		iNumWeekDays = (to.setting.excludeNonBusinessHours) ? to.tv.iBsDays : 7,
		iWeekDayIndex;
	
		for(iWeekDayIndex = 0; iWeekDayIndex < 7; iWeekDayIndex++)
		{
			var sClass = "";
			if(!to.setting.displayWeekNumInMonthView && iWeekDayIndex === 0)
				sClass = "cmvFirstColumn";
		
			if((to.setting.excludeNonBusinessHours && to.tv.bABsDays[iCountDays]) || !to.setting.excludeNonBusinessHours)
				sTempStr += "<td id='" + "cmvDayName"+(iCountDays + 1) + "' class='cmvDayHeader cmvTableColumns "+sClass+"'>" + to.getDateInFormat({"iDate": {D: iCountDays}}, "DDD", false, true) + "</td>"; 
		
			iCountDays++;
			if(iCountDays > 6)
				iCountDays = 0;
		}
		sTempStr += "</tr>";
		sTempStr += "</thead>";
	
		to.tv.dCMDt = new Date(to.setting.selectedDate);
		to.tv.dCMDt.setDate(15);
		to._setNextPreviousMonthDates();
	
		var iTodayDateNum = $.CalenStyle.extra.dToday.getDate(),
		iTodayMonthNum = $.CalenStyle.extra.dToday.getMonth(),
		iTodayYearNum = $.CalenStyle.extra.dToday.getFullYear(),
		iTodayDayNum = to.__getDayIndexInView($.CalenStyle.extra.dToday);
	
		sTempStr += "<tbody>";
	
		var iDateIndex = 0;
		for(var iMonthWeeks = 1; iMonthWeeks <= to.tv.iWkInMonth; iMonthWeeks++)
		{
			sTempStr += "<tr id='"+ ("cmvMonthTableRow"+iMonthWeeks) +"' class='cmvMonthTableRows'>";
		
			var bCurrentWeek = false;
			if(to.setting.displayWeekNumInMonthView)
			{
				var dWkSDate = to.tv.dAVDt[iDateIndex],
				dWkEDate = to.setDateInFormat({"date": to.tv.dAVDt[(iDateIndex + 6)]}, "END"),
				sWkNumber = to.__getWeekNumber(dWkSDate, dWkEDate);
			
				var sCellClass = "cmvDay cmvWeekNumber cmvThinBorderRight cmvWeekNumberBorderLeft";				
				if(iMonthWeeks === 1)
					sCellClass += " cmvWeekNumberBorderBottom";
				else if(iMonthWeeks === to.tv.iWkInMonth)
					sCellClass += " cmvWeekNumberBorderTop";
				else 
					sCellClass += " cmvWeekNumberBorderBottom cmvWeekNumberBorderTop";
			
				var dArrTempDates = to._getWeekForDate($.CalenStyle.extra.dToday, false),
				dWkSDateToday = dArrTempDates[0],
				dWkEDateToday = dArrTempDates[1];
				if(to.compareDates(dWkSDateToday, dWkSDate) === 0 && to.compareDates(dWkEDateToday, dWkEDate) === 0)
				{
					sCellClass += " cTodayHighlightTextColor";
					bCurrentWeek = true;
				}
			
				sTempStr += "<td id='"+ dWkSDate.getTime() +"' class='"+ sCellClass +"'><span>" + sWkNumber + "</span></td>"; 
			}
		
			for(iWeekDayIndex = 0; iWeekDayIndex < iNumWeekDays; iWeekDayIndex++)
			{
				var dCurrentDate = to.tv.dAVDt[iDateIndex],
				iCurrentDateNum = dCurrentDate.getDate(),
				iCurrentMonthNum = dCurrentDate.getMonth(),
				iCurrentYearNum = dCurrentDate.getFullYear(),

				iSourceCount = to.__getSourceCountForDate(dCurrentDate),
				sDayNumberClass = ((to.compareStrings(to.setting.visibleView, "DatePicker") || to.setting.parentObject !== null) && (iSourceCount > 0)) ? " cBold" : "",
			
				sTempId,
				sCellClassTemp = "cmvDay cmvTableColumns cmvTableColumn"+iWeekDayIndex;		
			
				if(to.tv.dCMDt.getMonth() !== iCurrentMonthNum)
					sCellClassTemp += " cmvOtherMonthDay";
				else
					sCellClassTemp += " cmvCurrentMonthDay";
					
				if(!to.setting.displayWeekNumInMonthView && iWeekDayIndex === 0)
					sCellClassTemp += (" cmvFirstColumn");
			
				sTempId = "cmvDay" + "-" + iCurrentDateNum + "-" + iCurrentMonthNum + "-" + iCurrentYearNum;
			
				var iSelectedDateNum = to.setting.selectedDate.getDate(),
				iSelectedMonthNum = to.setting.selectedDate.getMonth(),
				iSelectedYearNum = to.setting.selectedDate.getFullYear();
			
				if(iCurrentDateNum === iTodayDateNum && iCurrentMonthNum === iTodayMonthNum && iCurrentYearNum === iTodayYearNum)
					sCellClassTemp += " cTodayHighlightBg cTodayHighlightTextColor";	
				else if(iCurrentDateNum === iSelectedDateNum && iCurrentMonthNum === iSelectedMonthNum && iCurrentYearNum === iSelectedYearNum)
					sCellClassTemp += " cCurrentDateHighlightColor";
			
				sTempStr += "<td id='"+ sTempId +"' class='" + sCellClassTemp + "'>";
				sTempStr += "<span class='cmvDayNumber" + sDayNumberClass + "'>" + to.getNumberStringInFormat(iCurrentDateNum, 0, true) + "</span>";
				if(to.compareStrings(to.setting.visibleView, "MonthView"))
				{
					if(to.compareStrings(to.setting.actionOnDayClickInMonthView, "DisplayEventListDialog"))
						sTempStr += "<span class='cmvDisplayAllEvents'>...</span>";
				
					if(to.compareStrings(to.setting.eventIndicatorInMonthView, "DayHighlight"))
						sTempStr += "<div class='cmvMonthTableRowDayIndicator' >&nbsp;</div>";
					else if(to.compareStrings(to.setting.eventIndicatorInMonthView, "Custom"))
						sTempStr += "<div class='cmvMonthTableRowCustom' >&nbsp;</div>";
				}
				sTempStr += "</td>";
			
				iDateIndex++;
			}
			sTempStr += "</tr>";
		}
		
		sTempStr += "</tbody>";
		
		$(to.elem).find(".cmvMonthTableMain").html(sTempStr);
	
		$(to.elem).find(".cTodayHighlightBg").find(".cmvDayNumber").addClass("cTodayHighlightCircle");
	
		to.adjustMonthTable();
		if(!to.setting.addEventsInMonthView)
			to.adjustMonthTable();
	
		to._setMonthStrings();
		if(!$.CalenStyle.extra.bTouchDevice)
			to._addHoverClassesInMonthView();	
	},

	_updateMonthTableContents: function(bLoadAllData)
	{
		var to = this;
	
		if(to.setting.addEventsInMonthView && !to.compareStrings(to.setting.visibleView, "DatePicker"))
		{
			if(to.compareStrings(to.setting.eventIndicatorInMonthView, "DayHighlight"))
				to._updateDayHighlightViewInMonthView(bLoadAllData);
			else if(to.compareStrings(to.setting.eventIndicatorInMonthView, "Events"))
				to._addEventContInMonthView(bLoadAllData);
			else if(to.compareStrings(to.setting.eventIndicatorInMonthView, "Custom"))
			{
				to.__parseData(bLoadAllData, function()
				{
					if(to.setting.modifyCustomView)
						to.setting.modifyCustomView.call(to, to.tv.dAVDt);

					if(!to.compareStrings(to.setting.actionOnDayClickInMonthView, "ChangeDate"))
						to._displayEventOnDayClickInMonthView();
				
					to.adjustMonthTable();
				});
			}
		}
		else if(to.compareStrings(to.setting.visibleView, "DatePicker"))
			to._updateDayHighlightInDatePickerView(bLoadAllData);
		to._makeDayClickableInMonthView();
	},

	_updateDayHighlightInDatePickerView: function(bLoadAllData)
	{
		var to = this;
		to.__parseData(bLoadAllData, function()
		{
			for(var iTempIndex = 0; iTempIndex < to.tv.dAVDt.length; iTempIndex++)
			{
				var dTempViewDate = to.tv.dAVDt[iTempIndex],
				iSourceCount = to.__getSourceCountForDate(dTempViewDate),
				sDayNumberClass = ((to.compareStrings(to.setting.visibleView, "DatePicker") || to.setting.parentObject !== null) && (iSourceCount > 0)) ? " cBold" : "";
				if(sDayNumberClass !== "")
				{
					var sDayId = "#cmvDay-"+dTempViewDate.getDate()+"-"+dTempViewDate.getMonth()+"-"+dTempViewDate.getFullYear();
					$(to.elem).find(sDayId + " .cmvDayNumber").addClass("cBold");
				}				
			}
		});
	},

	_updateDayHighlightViewInMonthView: function(bLoadAllData)
	{
		var to = this;
	
		to.__parseData(bLoadAllData, function()
		{
			for(var iTempIndex = 0; iTempIndex < to.tv.dAVDt.length; iTempIndex++)
			{
				var dTempViewDate = to.tv.dAVDt[iTempIndex];
				sDayId = "#cmvDay-"+dTempViewDate.getDate()+"-"+dTempViewDate.getMonth()+"-"+dTempViewDate.getFullYear();
			
				var dTempViewStartDate = to.setDateInFormat({"date": dTempViewDate}, "START"),
				dTempViewEndDate = to.setDateInFormat({"date": dTempViewDate}, "END"),
				iArrTempLength = to.getArrayOfEventsForView(dTempViewStartDate, dTempViewEndDate).length;
			
				if(iArrTempLength !== 0)
				{
					if(iArrTempLength < to.setting.averageEventsPerDayForDayHighlightView)
						iArrTempLength = iArrTempLength * (100 / to.setting.averageEventsPerDayForDayHighlightView);
					else
						iArrTempLength = 100;
					if(iArrTempLength > 100)
						iArrTempLength = 100;
				}
			
				$(to.elem).find(sDayId+" .cmvMonthTableRowDayIndicator").css({"width": iArrTempLength + "%"});
				if(to.compareStrings(to.setting.visibleView, "MonthView") && to.compareStrings(to.setting.actionOnDayClickInMonthView, "DisplayEventListDialog"))
				{
					if($(to.elem).find(".cmvMonthTableMain " +sDayId).has(".cmvDisplayAllEvents").length === 0)
						$(to.elem).find(".cmvMonthTableMain " +sDayId).prepend("<span class='cmvDisplayAllEvents'>...</span>");
				}
			}
		
			if(!to.compareStrings(to.setting.actionOnDayClickInMonthView, "ChangeDate"))
				to._displayEventOnDayClickInMonthView();
		
			to.adjustMonthTable();
		});
	},

	// Public Method
	updateMonthTableAndContents: function(bLoadAllData)
	{
		var to = this;
	
		$(to.elem).find(".cmvDisplayAllEvents").remove();
		$(to.elem).find(".cmvEvent").remove();
		$(to.elem).find(".cdmvEvent").remove();
	
		to._updateMonthTable();
		to._updateMonthTableContents(bLoadAllData);
	},

	_addHoverClassesInMonthView: function()
	{
		var to = this;
	
		$(to.elem).find(".cContHeaderLabelMonth" + ", " + ".cContHeaderLabelYear").hover(
		
			function(e)
			{
				$(this).addClass("cContHeaderLabelHover");
			},
			function(e)
			{
				$(this).removeClass("cContHeaderLabelHover");
			}
		);
	
		$(to.elem).find(".cmvDay").hover(
		
			function(e)
			{
				$(this).addClass("cContHeaderButtonsHover");
			},
			function(e)
			{
				$(this).removeClass("cContHeaderButtonsHover");
			}
		);
	},

	_addEventContInMonthView: function(bLoadAllData)
	{
		var to = this;
	
		var sTempInner = "";
		if(to.compareStrings(to.setting.visibleView, "MonthView"))
			sTempInner += "<div class='cmvEventCont'><div class='cmvEventContSmall'></div><div class='cmvEventContAllDay'></div></div>";
		$(to.elem).find(".cmvMonthTableMain .cmvDay").not(".cmvWeekNumber").append(sTempInner);
	
		$(to.elem).find(".cmvDay").droppable(
		{
			scope: "Events",
		
			over: function(event, ui)
			{
				var oDroppedElem = ui.draggable,
				eventId = $(to.elem).find(oDroppedElem).attr("id"),
				eventClass = "."+eventId;
				$(to.elem).find(eventClass).css({"opacity": 0.5});
			
				var sArrEventId = eventId.split("-"),
				sId = sArrEventId[1],
				oDraggedEvent = to.getEventWithId(sId),
				dStartDateTime = null, dEndDateTime = null, bIsAllDay = 0;
				
				if(oDraggedEvent.start !== null)
					dStartDateTime = oDraggedEvent.start;
				if(oDraggedEvent.end !== null)
					dEndDateTime = oDraggedEvent.end;
				if(oDraggedEvent.isAllDay !== null)
					bIsAllDay = oDraggedEvent.isAllDay;
			
				var iArrNumOfDays = to.getNumberOfDaysOfEvent(bIsAllDay, dStartDateTime, dEndDateTime, true, false, true),
				iNumOfDays = iArrNumOfDays[0],
				iNumOfHours = iArrNumOfDays[1];
				
				var sDayId = $(this).attr("id"),
				sArrDayId = sDayId.split("-"),
				dThisDate = to.setDateInFormat({"iDate": {y: sArrDayId[3], M: sArrDayId[2], d: sArrDayId[1]}}, "START"),
				dNextDate = new Date(dThisDate),
				bNextDate;
			
				$(to.elem).find(".cmvDay").removeClass("cActivatedCell");
				for(var iElemIndex = 0; iElemIndex < iNumOfDays; iElemIndex++)
				{
					if(iElemIndex > 0)
					{
						dNextDate = new Date(dNextDate.getTime() + $.CalenStyle.extra.iMS.d);
						bNextDate = to.compareDates(dNextDate, to.tv.dVEDt);
					}
					if((iElemIndex === 0 || bNextDate <= 0) && to.__findWhetherDateIsVisibleInCurrentView(dNextDate, (bIsAllDay || iNumOfHours > 23), dStartDateTime, dEndDateTime))
					{
						var sElemId = "#cmvDay" + "-" + dNextDate.getDate() + "-" + dNextDate.getMonth() + "-" + dNextDate.getFullYear();
						$(to.elem).find(sElemId).addClass("cActivatedCell");
					}
				}
			},
		
			drop: function(event, ui)
			{
				var oDroppedElem = ui.draggable,
				eventId = $(to.elem).find(oDroppedElem).attr("id"),
				eventClass = "."+eventId,
			
				sArrEventId = eventId.split("-"),	
				sId = sArrEventId[1],
				oDraggedEvent = to.getEventWithId(sId),
				dStartDateTime = null, dEndDateTime = null, bIsAllDay = 0;
				
				if(oDraggedEvent.start !== null)
					dStartDateTime = oDraggedEvent.start;
				if(oDraggedEvent.end !== null)
					dEndDateTime = oDraggedEvent.end;
				if(oDraggedEvent.isAllDay !== null)
					bIsAllDay = oDraggedEvent.isAllDay;
			
				var iNumOfHours = to.getNumberOfDaysOfEvent(bIsAllDay, dStartDateTime, dEndDateTime, true, false, true)[1];
			
				var sEventContClass = "";	
				if(to.compareStrings(to.setting.visibleView, "MonthView"))
				{	
					if(bIsAllDay === 1 || iNumOfHours > 23)
						sEventContClass += ".cmvEventContAllDay";
					else
						sEventContClass += ".cmvEventContSmall";
				}
			
				var iComp = to.compareDates(dEndDateTime, $.CalenStyle.extra.dToday);
				if(iComp > 0)
					$(to.elem).find(eventClass).css({"opacity": 1});
				else if(iComp < 0)
					$(to.elem).find(eventClass).css({"opacity": 0.7});
			
				var sDayId = $(this).attr("id"),
				sArrDayId = sDayId.split("-"),					
				dStartDateAfterDrop = null, dEndDateAfterDrop = null;
				dStartDateAfterDrop = to.setDateInFormat({"iDate": {d: parseInt(sArrDayId[1]), M: parseInt(sArrDayId[2]), y: parseInt(sArrDayId[3]), H: dStartDateTime.getHours(), m: dStartDateTime.getMinutes(), s: dStartDateTime.getSeconds()}}, "");
				dEndDateAfterDrop =  new Date(dStartDateAfterDrop.getTime() + (dEndDateTime.getTime() - dStartDateTime.getTime()));
			
				if(to.__updateEventWithId(sId, dStartDateAfterDrop, dEndDateAfterDrop))
				{
					$(to.elem).find(".cmvDisplayAllEvents").remove();
					$(to.elem).find(".cmvEvent").remove();
					$(to.elem).find(".cdmvEvent").remove();
					to._addEventsInMonthView();
					if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
						to._adjustEventsInMonthView();
				}
				else
					console.log("to.__updateEventWithId : false");
				$(to.elem).find(".cmvDay").removeClass("cActivatedCell");
			
				if(to.setting.saveChangesOnEventDrop)
					to.setting.saveChangesOnEventDrop.call(to, oDraggedEvent, dStartDateTime, dEndDateTime, dStartDateAfterDrop, dEndDateAfterDrop);
			}
		});
	
		if(to.compareStrings(to.setting.visibleView, "MonthView"))
			to.adjustMonthTable();
	
		to.__parseData(bLoadAllData, function()
		{
			to._addEventsInMonthView();
			to.adjustMonthTable();
		});
	},

	_addEventsInMonthView: function()
	{
		var to = this;
	
		if($(to.elem).find(".cdmvEventContMain"))
			$(to.elem).find(".cdmvEventContMain").html("");
	
		var dMonthStartDate = new Date($.CalenStyle.extra.dToday);
		dMonthStartDate.setDate(1);
	
		var oArrTempEvents = to.getArrayOfEventsForView(to.tv.dVSDt, to.tv.dVEDt);
		to.tv.bAWkRw = [];
		for(var iTempIndex = 0; iTempIndex < 6; iTempIndex++)
			to.tv.bAWkRw.push(new Array(new Array(0, 0, 0, 0, 0, 0, 0)));
	
		if(oArrTempEvents.length > 0)
		{
			// DetailedMonthView
			var iEventHeightForAllEvents = 16,
			sTooltipEventClass = "",
		
			// MonthView
			iDayWidth = $(to.elem).find(".cmvTableColumn0").width(),
			iHeightOfAllDayEvents = to._getHeightForAllDayEventInMonthView(),
			iHeightOfSmallEvents = to._getHeightForSmallEventInMonthView(),
			iMarginForSmallEvent = to._getMarginValueForSmallEventInMonthView(),
			sMarginForSmallEvent = iMarginForSmallEvent + "px" + " " + iMarginForSmallEvent+ "px";
		
			for(var iEventIndex = 0; iEventIndex < oArrTempEvents.length; iEventIndex++)
			{
				var oEvent = oArrTempEvents[iEventIndex],					
				dStartDateTime = null, dEndDateTime = null, bIsAllDay = 0,
				sTitle = "", sDesc = "", sType = "", sURL = "", bDragNDrop = false,
			
				sId = "Event-" + oEvent.calEventId;
			
				if(oEvent.start !== null)
					dStartDateTime = oEvent.start;
			
				if(oEvent.end !== null)
					dEndDateTime = oEvent.end;
			
				if(oEvent.isAllDay !== null)
					bIsAllDay = oEvent.isAllDay;
			
				if(oEvent.title !== null)
					sTitle = oEvent.title;
			
				if(oEvent.desc !== null)
					sDesc = oEvent.desc;
			
				if(oEvent.type !== null)
					sType = oEvent.type;
			
				if(oEvent.url !== null)
					sURL = oEvent.url;
					
				if(oEvent.isDragNDropInMonthView !== null)
					bDragNDrop = oEvent.isDragNDropInMonthView;
			
				var iArrTempNum = to.getNumberOfDaysOfEvent(bIsAllDay, dStartDateTime, dEndDateTime, true, true, true),
				iNumOfEventElements = iArrTempNum[0],
				iNumberOfHours = iArrTempNum[1];

				//console.log(dStartDateTime + " " + dEndDateTime);
			
				if(iNumOfEventElements > 0)
				{
					var sDayId = "", 
					iNumOfSegs = iNumOfEventElements, sPartialEvent = "", 
					dTempStartDateTime = new Date(dStartDateTime), 
					dTempEndDateTime = new Date(dEndDateTime),
					dTempSDT,
					sEventColor, sEventBorderColor, sEventTextColor, 
					sColorStyle = "", sEventIconStyle = "", sLinkStyle = "", sStyle = "",
					sIcon, sEventClass, oEventTooltip, sDateTime, sTempStr, sIdElem,
					sEventTitle, sEventContent,
					iArrNumOfDays, bActualStartDate;

					if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
					{
						sTooltipEventClass = ".cdmvEvent";
					
						iNumOfSegs = iNumOfEventElements;
						sPartialEvent = "";
						dTempStartDateTime = new Date(dStartDateTime);
						dTempEndDateTime = new Date(dEndDateTime);
					
						if(to.compareDates(dStartDateTime, to.tv.dVSDt) < 0)
						{
							sPartialEvent = "Left";
							dTempStartDateTime = new Date(to.tv.dVSDt);
						}
						if(to.compareDates(to.tv.dVEDt, dEndDateTime) < 0)	
						{
							sPartialEvent = "Right";
							dTempEndDateTime = new Date(to.tv.dVEDt);
						}
					
						dTempSDT = new Date(dTempStartDateTime);
						bActualStartDate = true;
						while(!to.__findWhetherDateIsVisibleInCurrentView(dTempSDT, (bIsAllDay || iNumberOfHours > 23), dTempStartDateTime, dTempEndDateTime))
						{
							dTempSDT.setDate(dTempSDT.getDate() + 1);
							bActualStartDate = false;
							if(to.compareDates(dTempSDT, dTempEndDateTime) > 0)
								break;
						}
						dTempStartDateTime = new Date(dTempSDT);
						sDayId = "#cmvDay" + "-" + dTempStartDateTime.getDate() + "-" + dTempStartDateTime.getMonth() + "-" + dTempStartDateTime.getFullYear();
					
						iArrNumOfDays = to.getNumberOfDaysOfEvent(bIsAllDay, dTempStartDateTime, dTempEndDateTime, true, true, bActualStartDate);
						iNumOfSegs = iArrNumOfDays[0];
						iNumberOfHours = iArrNumOfDays[1];

						if(iNumberOfHours > 0)
						{
							sEventColor = oEvent.color;
							sEventColor = (to.compareStrings(sEventColor, "") || to.compareStrings(sEventColor, "transparent")) ? "transparent" : "#" + sEventColor;
							sEventBorderColor = oEvent.borderColor || to.setting.borderColor;
							sEventBorderColor = (to.compareStrings(sEventBorderColor, "") || to.compareStrings(sEventBorderColor, "transparent")) ? "transparent" : "#" + sEventBorderColor;
							sEventTextColor = oEvent.textColor || to.setting.textColor;
							sEventTextColor = (to.compareStrings(sEventTextColor, "") || to.compareStrings(sEventTextColor, "transparent")) ? to.setting.textColor : "#" + sEventTextColor;
						
							var sColorStyle = "",
							sEventIconStyle = "",
							sLinkStyle = "";
							if(bIsAllDay === true || iNumberOfHours > 23)
							{
								sColorStyle += "background: " + sEventColor + "; ";
								sColorStyle += "border-color: " + sEventBorderColor + "; ";
								sColorStyle += "color: " + sEventTextColor + "; ";
								sLinkStyle += "color: " + sEventTextColor + "; ";
								sEventIconStyle = "color: " + sEventTextColor + "; ";
							}
							else
							{
								sColorStyle += "color: " + sEventColor + "; ";
								iNumOfSegs = 1;
								sPartialEvent = "";
								sLinkStyle += "color: " + sEventColor + "; ";
								sEventIconStyle = "color: " + sEventColor + "; ";
							}
						
							var sIcon = oEvent.icon || to.setting.eventIcon;
						
							sEventClass = "cdmvEvent ";
							if(to.compareDates(dEndDateTime, dMonthStartDate) < 0)
								sEventClass += ("cBlurredEvent ");							
							if(bDragNDrop)
								sEventClass += ("EventDraggable cDragNDrop ");
							if(to.setting.isTooltipInMonthView)
								sEventClass += ("cEventTooltip ");
							sEventClass += sId;
						
							sEventTitle = sTitle;
							sEventContent = sDesc;
						
							var oRow = $(to.elem).find(sDayId).parent(),
							sRow = $(oRow).attr("id"),
							iRow = parseInt(sRow.replace("cmvMonthTableRow", "")) - 1,
							iColumn = $(to.elem).find(sDayId).index();
						
							if(to.setting.displayWeekNumInMonthView)
								iColumn--;
						
							var iAddedDays = 0,
							iEventSegIndex = 0;
						
							for(var iTableRowIndex = iRow; iTableRowIndex < to.tv.bAWkRw.length; iTableRowIndex++)
							{
								var bArrCurrentRow = to.tv.bAWkRw[iTableRowIndex],	
								iEventRow = -1,
								bLeftPartial = false, bRightPartial = false;
							
								if(to.compareStrings(sPartialEvent, "Left"))
									bLeftPartial = (iAddedDays > 0) ? false : true;
								
								if(to.compareStrings(sPartialEvent, "Right"))
									bRightPartial = true;
							
								if(iAddedDays < iNumOfSegs)
								{
									var iEventRowTop = $(to.elem).find("#cmvMonthTableRow"+(iTableRowIndex + 1)).position().top,
									iEventColumn = (iAddedDays > 0) ? 0 : iColumn,
									iEventLengthInRow = (iNumOfSegs - iAddedDays),
									iEventLengthInWeek = ((to.setting.excludeNonBusinessHours) ? to.tv.iBsDays : 7) - iEventColumn;
								
									if(iEventLengthInRow > iEventLengthInWeek)
									{
										iEventLengthInRow = iEventLengthInWeek;
										bRightPartial = true;
									}
									if(iAddedDays > 0)
										bLeftPartial = true;
									var iMaxColumn = iEventColumn + iEventLengthInRow;
									var bInnerRow;
									for(var iTempIndex2 = 0; iTempIndex2 < bArrCurrentRow.length; iTempIndex2++)
									{
										bInnerRow = bArrCurrentRow[iTempIndex2];
									
										if(iEventRow !== -1)
											break;
									
										var iTempEventLengthInRow = 0;
										for(var iTempIndex3 = iEventColumn; iTempIndex3 < iMaxColumn; iTempIndex3++)
										{
											if(bInnerRow[iTempIndex3] === 0 && iTempEventLengthInRow < iEventLengthInRow)
											{
												iTempEventLengthInRow++;
											
												if(iTempEventLengthInRow === iEventLengthInRow)
												{
													iEventRow = iTempIndex2;
													break;
												}
											}
										}
									}
									if(iEventRow === -1)
									{
										bArrCurrentRow.push([0, 0, 0, 0, 0, 0, 0]);
										iEventRow = bArrCurrentRow.length - 1;
									}
								
									bInnerRow = bArrCurrentRow[iEventRow];
								
									var sEventSegId = sId + "-" + (++iEventSegIndex);
								
									//--------------------------- Add Event Start -----------------------------
								
									var sName = iTableRowIndex + "|" + (iEventRow + 1) + "|" + iEventColumn + "|" + iEventLengthInRow;
								
									var sHeight = iEventHeightForAllEvents + "px";
									sStyle = sColorStyle;
									sStyle += "height: " + sHeight + "; ";
								
									sTempStr = "<div id='" + sEventSegId + "' class='" + sEventClass + "' style='" + sStyle + "'  name='" + sName + "' title=''>";
								
									sTempStr += "<a class='cEventLink' style='" + sLinkStyle + "'>";
								
									var sPartialClass = "";
									if(bRightPartial && bLeftPartial)
									{
										sPartialClass = "cPartialEvent";
										sTempStr += "<span class='" + sPartialClass + " cPartialEventLeft'></span>";
										sTempStr += "<span class='" + sPartialClass + " cPartialEventRight'></span>";
									}
									else if(bRightPartial || bLeftPartial)
									{
										sPartialClass = "cPartialEvent";
										if(bLeftPartial)
											sPartialClass += " cPartialEventLeft";
										if(bRightPartial)
											sPartialClass += " cPartialEventRight";
										sTempStr += "<span class='" + sPartialClass + "'></span>";
									}
								
									if(bIsAllDay === false && ((iEventSegIndex === 1 && !bLeftPartial && iNumOfEventElements > 1) || iNumOfEventElements === 1))
										sTempStr += "<span class='cdmvEventTime'>" + to.getDateInFormat({"date": dStartDateTime}, "hh:mmsm", to.setting.is24Hour, true) + "</span>";
								
									if(bIsAllDay === false && (iNumOfSegs > 1 || iEventLengthInRow > 1) && !bRightPartial)
										sTempStr += "<span class='cdmvEventTimeRight'>" + to.getDateInFormat({"date": dEndDateTime}, "hh:mmsm", to.setting.is24Hour, true) + "</span>";
								
									if(!to.setting.hideEventIcon)
										sTempStr += "<span class='cdmvEventIcon "+sIcon+"' style='" + sEventIconStyle + "'></span>";
								
									sTempStr += "<span class='cdmvEventTitle'>" + sTitle + "</span>";
								
									sTempStr += "</a>";
								
									sTempStr += "</div>";
								
									$(to.elem).find(".cdmvEventContMain").append(sTempStr);

									sIdElem = "#"+sEventSegId;
									oEventTooltip = {};
									sDateTime = to.getEventDateTimeString(dStartDateTime, dEndDateTime, bIsAllDay, "&&");
									var sArrDateTime = sDateTime.split("&&");
									oEventTooltip.title = sTitle;
									oEventTooltip.startDateTime = sArrDateTime[0];
									oEventTooltip.endDateTime = sArrDateTime[1];
									$(to.elem).find(sIdElem).data("tooltipcontent", oEventTooltip);
								
									if((sURL !== "" && sURL !== null && sURL !== undefined) || to.setting.eventClicked)
									{
										$(to.elem).find(sIdElem+" .cEventLink").on($.CalenStyle.extra.sClickHandler, {"url": sURL, "eventId": oEvent.calEventId, "eventElemSelector": sIdElem, "view": "MonthView", "pluginId": to.tv.pluginId}, to.__bindClick);
									}
									//--------------------------- Add Event End -----------------------------
								
									for(var iTempIndex4 = iEventColumn; iTempIndex4 < iMaxColumn; iTempIndex4++)
									{
										bInnerRow[iTempIndex4] = 1;
										iAddedDays++;
									}
								}
								else
									break;
							}
						}
					}
					else if(to.compareStrings(to.setting.visibleView, "MonthView"))
					{
						sTooltipEventClass = ".cmvEvent";
					
						var iEventElemTopPosition = 0,
						bShowDetails = 0;
						iNumOfSegs = iNumOfEventElements;
						sPartialEvent = "";
						dTempStartDateTime = new Date(dStartDateTime);
						dTempEndDateTime = new Date(dEndDateTime);
					
						if(to.compareDates(dStartDateTime, to.tv.dVSDt) < 0)
						{
							sPartialEvent = "Left";
							dTempStartDateTime = new Date(to.tv.dVSDt);
						}
						if(to.compareDates(to.tv.dVEDt, dEndDateTime) < 0)	
						{
							sPartialEvent = "Right";
							dTempEndDateTime = new Date(to.tv.dVEDt);
						}
					
						dTempSDT = new Date(dTempStartDateTime);
						bActualStartDate = true;
						while(!to.__findWhetherDateIsVisibleInCurrentView(dTempSDT, (bIsAllDay || iNumberOfHours > 23), dTempStartDateTime, dTempEndDateTime))
						{
							dTempSDT.setDate(dTempSDT.getDate() + 1);
							bActualStartDate = false;
							if(to.compareDates(dTempSDT, dTempEndDateTime) > 0)
								break;
						}
						dTempStartDateTime = new Date(dTempSDT);
					
						sDayId = "#cmvDay" + "-" + dTempStartDateTime.getDate() + "-" + dTempStartDateTime.getMonth() + "-" + dTempStartDateTime.getFullYear();
						iArrNumOfDays = to.getNumberOfDaysOfEvent(bIsAllDay, dTempStartDateTime, dTempEndDateTime, true, false, bActualStartDate);
						iNumOfSegs = iArrNumOfDays[0];
						iNumOfHours = iArrNumOfDays[1];
					
						if(!(bIsAllDay === true || iNumberOfHours > 23))
						{
							sPartialEvent = "";
							iNumOfSegs = 1;
						}
					
						var dThisDate = new Date(dTempStartDateTime),
						iThisDate = dThisDate.getTime();
					
						for(var iEventElem = 1; iEventElem <= iNumOfSegs; iEventElem++)
						{
							if(to.__findWhetherDateIsVisibleInCurrentView(dThisDate, (bIsAllDay || iNumberOfHours > 23), dTempStartDateTime, dTempEndDateTime))
							{
								sDayId = "#cmvDay" + "-" + dThisDate.getDate() + "-" + dThisDate.getMonth() + "-" + dThisDate.getFullYear();
							
								var isFirstDay = false;
								if(iEventElem === 1)
									isFirstDay = true;
								
								if(to.setting.displayEventsInMonthView)
								{
									sEventClass = "cmvEvent ";
									if(bIsAllDay === true || iNumberOfHours > 23)
									{
										sEventClass += "cmvEventAllDay ";
										if(to.compareDates(dThisDate, dStartDateTime) === 0 && iNumOfSegs === 1)
											sEventClass += "cmvEventAllDaySingle ";
										else if(to.compareDates(dThisDate, dStartDateTime) === 0)
											sEventClass += "cmvEventAllDayFirst ";
										else if(to.compareDates(dThisDate, dEndDateTime) === 0)
											sEventClass += "cmvEventAllDayLast ";
										else
											sEventClass += "cmvEventAllDayMiddle ";
									}
									else
										sEventClass += "cmvEventSmall ";
							
									if(to.compareDates(dEndDateTime, dMonthStartDate) < 0)
										sEventClass += ("cBlurredEvent ");	
									if(bDragNDrop)
										sEventClass += ("EventDraggable cDragNDrop ");
									if(to.setting.isTooltipInMonthView)
										sEventClass += ("cEventTooltip ");
									sEventClass += sId;
							
									sEventTitle = sTitle;
									sEventContent = sDesc;
							
									if(bIsAllDay === true || iNumberOfHours > 23)
									{
										if(isFirstDay)
										{
											var iTopPosition;
											var oArrChildren = $(to.elem).find(".cmvMonthTableMain "+sDayId+" .cmvEventCont .cmvEventContAllDay").children();
									
											var iArrTopPositions = [];
											for(var iChildElem = 0; iChildElem < oArrChildren.length; iChildElem++)
												iArrTopPositions.push($(to.elem).find(oArrChildren[iChildElem]).position().top);
									
											var iEventContHeight = $(to.elem).find(".cmvEventContSmall").height(),
											iAllDayEventHeight = to._getHeightForAllDayEventInMonthView(),
											iSpaceBetweenEvents = 2;
											iTopPosition = iSpaceBetweenEvents;
											var iTopPositionIncrements = iAllDayEventHeight + iSpaceBetweenEvents, 
											iMaxTopPosition = iTopPositionIncrements - 2;
											if(iArrTopPositions.length > 0 && bShowDetails === 0)
											{
												if(iArrTopPositions.length < 2)
												{
													while(to._arrayContains(iArrTopPositions, iTopPosition) === 1)
														iTopPosition += iTopPositionIncrements;
												}
												else
													bShowDetails = 1;
											}											
											iEventElemTopPosition = iTopPosition;
										}
									}
									else
									{
										var iMaxNumberOfElements = Math.floor(iDayWidth / (iHeightOfSmallEvents + iMarginForSmallEvent)) - 1,
										iNumberOfElements = $(to.elem).find(".cmvMonthTableMain "+sDayId+" .cmvEventCont .cmvEventContSmall").children().length;
										if(iNumberOfElements >= iMaxNumberOfElements)
											bShowDetails = 1;
									}
							
									if(bShowDetails === 0)
									{
										sEventColor = oEvent.color;
										sEventColor = (to.compareStrings(sEventColor, "") || to.compareStrings(sEventColor, "transparent")) ? "transparent" : "#" + sEventColor;
										sEventBorderColor = oEvent.borderColor || to.setting.borderColor;
										sEventBorderColor = (to.compareStrings(sEventBorderColor, "") || to.compareStrings(sEventBorderColor, "transparent")) ? "transparent" : "#" + sEventBorderColor;
										sEventTextColor = oEvent.textColor || to.setting.textColor;
										sEventTextColor = (to.compareStrings(sEventTextColor, "") || to.compareStrings(sEventTextColor, "transparent")) ? to.setting.textColor : "#" + sEventTextColor;
									
										sStyle = "background: " + sEventColor + "; border-color: " + sEventBorderColor + "; color: " + sEventTextColor + "; ";
									
										sStyle += " top: " + iEventElemTopPosition + "px;";
										if(bIsAllDay === true || iNumberOfHours > 23)
											sStyle += " height: " + iHeightOfAllDayEvents + "px;";
										else
											sStyle += " height: " + iHeightOfSmallEvents + "px; width: " + iHeightOfSmallEvents + "px; margin: " + sMarginForSmallEvent + ";";
									
										sEventTooltip = sTitle + "&&" + to.getEventDateTimeString(dStartDateTime, dEndDateTime, bIsAllDay, "&&");
									
										sTempStr = "<span id='" + sId + "' class='" + sEventClass + "' style='" + sStyle + "' title=''>";
										sTempStr += "</span>";
									
										if(bIsAllDay === true || iNumberOfHours > 23)
											$(to.elem).find(".cmvMonthTableMain "+sDayId+" .cmvEventCont .cmvEventContAllDay").append(sTempStr);
										else
											$(to.elem).find(".cmvMonthTableMain "+sDayId+" .cmvEventCont .cmvEventContSmall").append(sTempStr);
									}
								}
							}
						
							iThisDate = iThisDate + $.CalenStyle.extra.iMS.d;
							dThisDate.setTime(iThisDate);
						}
					
						sIdElem = "."+sId;
						oEventTooltip = {};
						sDateTime = to.getEventDateTimeString(dStartDateTime, dEndDateTime, bIsAllDay, "&&");
						var sArrDateTime = sDateTime.split("&&");
						oEventTooltip.title = sTitle;
						oEventTooltip.startDateTime = sArrDateTime[0];
						oEventTooltip.endDateTime = sArrDateTime[1];
						$(to.elem).find(sIdElem).data("tooltipcontent", oEventTooltip);
					
						$(to.elem).find(sIdElem).on($.CalenStyle.extra.sClickHandler, {"url": sURL, "eventId": oEvent.calEventId, "eventElemSelector": sIdElem, "view": "MonthView", "pluginId": to.tv.pluginId}, to.__bindClick);
					}
				}
			}
		
			if(!to.compareStrings(to.setting.actionOnDayClickInMonthView, "ChangeDate"))
				to._displayEventOnDayClickInMonthView();
		
			if(to.setting.displayEventsInMonthView)
			{
				if(to.setting.isTooltipInMonthView)
					to._addTooltipInMonthView(".cEventTooltip");	
				if(to.setting.isDragNDropInMonthView)
					to._makeEventDraggableInMonthView(".EventDraggable");
			}
		
			if(to.setting.eventsAddedInView)
				to.setting.eventsAddedInView.call(to, to.setting.visibleView, sTooltipEventClass);
		}
		else
			console.log("to._addEventsInMonthView - No Events");
	},

	_displayEventOnDayClickInMonthView: function()
	{
		var to = this;			
		if(to.compareStrings(to.setting.actionOnDayClickInMonthView, "DisplayEventListDialog"))
			to._displayEventsForDayInDialog();
	},

	_adjustEventsInMonthView: function()
	{
		var to = this;
	
		if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
		{
			var iRowMinHeight = $(to.elem).find(".cmvMonthTableRows").css("min-height");
			iRowMinHeight = parseInt(iRowMinHeight.replace("px", ""));
			var iEventFirstRowTop = 30,
			iEventRowHeight = 20,
			iEventUnitWidth =  $(to.elem).find(".cmvTableColumns").width(),
			sArrEventElems = $(to.elem).find(".cdmvEvent"),
		
			icmvMonthTableHeight = 0;
			icmvMonthTableHeight += $(to.elem).find(".cmvMonthTableRowDayHeader").height();
			for(iTempIndex1 = 0; iTempIndex1 < to.tv.bAWkRw.length; iTempIndex1++)
			{
				var bArrCurrentRow = to.tv.bAWkRw[iTempIndex1],
				iRowMaxHeight = bArrCurrentRow.length,
			
				iWeekRowHeight = iEventFirstRowTop + (iRowMaxHeight * iEventRowHeight);
				if(iWeekRowHeight > iRowMinHeight)
				{
					$(to.elem).find("#cmvMonthTableRow"+(iTempIndex1 + 1)).css({"height": iWeekRowHeight});
					icmvMonthTableHeight += iWeekRowHeight;
				}
				else
				{
					$(to.elem).find("#cmvMonthTableRow"+(iTempIndex1 + 1)).css({"height": iRowMinHeight});
					icmvMonthTableHeight += iRowMinHeight;
				}
			}
		
			$(to.elem).find(".cmvMonthTableMain").css({"height": icmvMonthTableHeight});
			$(to.elem).find(".cdmvEventContMain").css({"height": icmvMonthTableHeight});
		
			//--------------------------------------		Start		-----------------------------------------
			var icmvMonthTableHeight1 = $(to.elem).find(".cmvMonthTableMain").height();
		
			var iCalendarContInnerHeight;				
			if(to.setting.fixedHeightOfDetailedMonthView)
			{
				if($(to.elem).find(".cmvTableContainer").height() < 30)
					$(to.elem).find(".cmvTableContainer").css({"height": icmvMonthTableHeight1});
				if($(to.elem).find(".cmvTableContainerOuter").height() < 30)
					$(to.elem).find(".cmvTableContainerOuter").css({"height": icmvMonthTableHeight1});
			
				iCalendarContInnerHeight = $(to.elem).find(".calendarContInner").height();
				if(iCalendarContInnerHeight < 75)
				{
					iCalendarContInnerHeight = icmvMonthTableHeight1 + (($(to.elem).find(".cContHeader").length > 0) ? $(to.elem).find(".cContHeader").height() : 0);
					$(to.elem).find(".calendarContInner").css({"height": iCalendarContInnerHeight});
				}
			
				var iCalendarContHeight = $(to.elem).find(".calendarCont").height();
				if(iCalendarContHeight < 75)
					$(to.elem).find(".calendarCont").css({"height": iCalendarContHeight});
			
				var iCalendarContOuterHeight = $(to.elem).find(".calendarContOuter").height();
				if(iCalendarContOuterHeight < 75)
				{
					iCalendarContOuterHeight = iCalendarContHeight;
					$(to.elem).find(".calendarCont").parent().css({"height": iCalendarContOuterHeight});
				}
			}
			else
			{
				$(to.elem).find(".cmvTableContainer").css({"height": icmvMonthTableHeight1});
				$(to.elem).find(".cmvTableContainerOuter").css({"height": icmvMonthTableHeight1});
			
				iCalendarContInnerHeight = icmvMonthTableHeight1 + (($(to.elem).find(".cContHeader").length > 0) ? $(to.elem).find(".cContHeader").height() : 0);
				$(to.elem).find(".calendarContInner").css({"height": iCalendarContInnerHeight});
				$(to.elem).find(".calendarCont").css({"height": iCalendarContInnerHeight});
				$(to.elem).find(".calendarCont").parent().css({"height": iCalendarContInnerHeight});
			}
		
			if(to.tv.iDocHtPrev < $(document).height())
			{
				if($(window).height() < $(document).height())
					to.adjustMonthTable();
			}
			else
			{
				if($(window).height() > $(document).height())
					to.adjustMonthTable();
			}
		
			//-----------------------------------------		End	------------------------------------------------
		
			var icmvCalendarContHeight = icmvMonthTableHeight + $.CalenStyle.extra.iBorderOverhead;
			icmvCalendarContHeight += (($(to.elem).find(".cContHeader").length > 0) ? $(to.elem).find(".cContHeader").outerHeight() : 0);
		
			//-----------------------------------------------------------------
		
			var icdmvEventContMainWidth = $(to.elem).find(".cdmvEventContMain").width();
			for(var iElemIndex = 0; iElemIndex < sArrEventElems.length; iElemIndex++)
			{
				var oElem = sArrEventElems[iElemIndex],
				sElemName = $(to.elem).find(oElem).attr("name"),
				sArrElemName = sElemName.split("|"),
			
				iRowNo = parseInt(sArrElemName[0]) + 1,
				iInnerRowIndex = parseInt(sArrElemName[1]),
				iColumnNo = parseInt(sArrElemName[2]),
				iWidthUnits = parseInt(sArrElemName[3]);
			
				var iEventTop = $(to.elem).find("#cmvMonthTableRow"+iRowNo).position().top + iEventFirstRowTop + ((iInnerRowIndex -1) * iEventRowHeight);
				var iEventLeft = $(to.elem).find(".cmvTableColumn"+iColumnNo).position().left + (2 * $.CalenStyle.extra.iBorderOverhead);
			
				var iEventWidth = $(to.elem).find(".cmvTableColumn"+iColumnNo).width();
				if(iWidthUnits > 1)
				{
					var iEventEndColumnNo = iColumnNo + (iWidthUnits -1);
					var iEventEndColumnLeft = $(to.elem).find(".cmvTableColumn"+iEventEndColumnNo).position().left + (2 * $.CalenStyle.extra.iBorderOverhead);
					var iEventEndColumnWidth = $(to.elem).find(".cmvTableColumn"+iEventEndColumnNo).width();
					iEventWidth = (iEventEndColumnLeft + iEventEndColumnWidth) - iEventLeft;
				}
				iEventWidth -= (2 * $.CalenStyle.extra.iBorderOverhead);
			
				$(oElem).css({"left": iEventLeft, "top": iEventTop, "width": iEventWidth});
			
				var $oEventTitle = $(oElem).find(".cdmvEventTitle"),
				iEventTitleHeight = $(oElem).height(),
				$oEventIcon = $(oElem).find(".cdmvEventIcon"),
				iEventIconWidth = ($oEventIcon !== null) ? $oEventIcon.outerWidth(true) : 0,
				$oEventTime = $(oElem).find(".cdmvEventTime"),
				iEventTimeWidth = ($oEventTime !== null) ? $oEventTime.outerWidth(true) : 0,
				iEventTimeWidthRight = 0,
				$oEventTimeRight = $(oElem).find(".cdmvEventTimeRight");
				if($oEventTimeRight !== null)
					iEventTimeWidthRight = ($oEventTimeRight !== null) ? $oEventTimeRight.outerWidth(true) : 0;
				var iPartialSymbolWidth = $(oElem).find(".cPartialEventLeft").outerWidth(true) + $(oElem).find(".cPartialEventRight").outerWidth(true);
				var iEventTitleWidth = iEventWidth - (iEventIconWidth + iEventTimeWidth + iEventTimeWidthRight + (10 * $.CalenStyle.extra.iBorderOverhead) + iPartialSymbolWidth);
			
				$oEventTitle.css({"height": iEventTitleHeight, "line-height": iEventTitleHeight + "px", "width": iEventTitleWidth});
				$oEventTime.css({"height": iEventTitleHeight, "line-height": iEventTitleHeight + "px"});
				if($oEventTimeRight !== null)
					$oEventTimeRight.css({"height": iEventTitleHeight, "line-height": iEventTitleHeight + "px"});
			}
		
			if(to.setting.isDragNDropInMonthView)
				to._makeEventDraggableInMonthView(".EventDraggable");
		}
	},

	//---------------------------------------- Events Dialog Start ----------------------------------------

	_displayEventsForDayInDialog: function()
	{
		var to = this;
	
		$(to.elem).find(".cmvDisplayAllEvents").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
		
			var sDayId = $(this).parent().attr("id"),
			dThisDate = to._getDateForDayIdInMonthView(sDayId);
		
			// Array Of Events That Fall On Given Date 
			var oThisDateEventsArray = to.getArrayOfEventsForView(dThisDate, dThisDate);
		
			var pClickedAt = {};
			pClickedAt.x = e.pageX || e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
			pClickedAt.y = e.pageY || e.originalEvent.touches[0].pageY || e.originalEvent.changedTouches[0].pageY;
		
			if(to.setting.displayEventListDialog)
				to.setting.displayEventListDialog.call(to, oThisDateEventsArray, pClickedAt);
			else
			{
				var sRowId = $(this).parent().parent().attr("id"),
				iRowId = parseInt(sRowId.replace("cmvMonthTableRow", "")),					
				iDayIndex = 0,
				iDayNumber = dThisDate.getDay();
				if(iDayNumber < to.setting.weekStartDay)
					iDayIndex = (6 - to.setting.weekStartDay) + iDayNumber + 1;
				else
					iDayIndex = iDayNumber - to.setting.weekStartDay;
		
				// ------------------------------------- Dialog HTML Start ----------------------------------------
		
				var iDayHeight = $(this).parent().height(), iDayWidth = $(this).parent().width(),
				iDialogHeight = iDayHeight * 3, iDialogWidth = iDayWidth * 3;
				iDialogWidth = (iDialogWidth < 200) ? 200 : iDialogWidth;
		
				if($(to.elem).find(".cmvDialogOuterCont").length <= 0)
				{
					$(to.elem).find(".cmvCalendarCont").append("<div class='cmvDialogOuterCont'></div>");
					$(to.elem).find(".cmvDialogOuterCont").on($.CalenStyle.extra.sClickHandler, function(e)
					{
						e.stopPropagation();
						to._closeDialogOfEventsForDay();
					});
				}
		
				var sTempStr = "";		
				sTempStr += "<div class='cmvDialog'>";		
				sTempStr += "<span class='cmvDialogTooltip'></span>";		
				sTempStr += "<div class='cmvDialogInnerCont'>";		
				sTempStr += "<div class='cmvDialogHeader'>" + to.getDateInFormat({"date": dThisDate}, "DDD MMM dd yyyy", false, true) + "</div>";
				sTempStr += "<table class='cmvDialogTable'>";
		
				for(var iEventIndex = 0; iEventIndex < oThisDateEventsArray.length; iEventIndex++)
				{
					var oTempEvent = oThisDateEventsArray[iEventIndex],
					sEventTitle = oTempEvent.title,
					sEventId = oTempEvent.id,
					sEventStartDate = oTempEvent.start,
					sEventEndDate = oTempEvent.end,
					bIsAllDay = oTempEvent.isAllDay,
					sDateTimeString = to.getEventDateTimeString(sEventStartDate, sEventEndDate, bIsAllDay, "<br/>"),
					sEventCalendar = oTempEvent.calendar,
					sEventColor = oTempEvent.color,
					sEventColorStyle = "background: #" + sEventColor + ";";
	
					sTempStr += "<tr>";	
			
					sTempStr += "<td>";
					sTempStr += "<span class='cmvDialogEventColor' style='" + sEventColorStyle + "'></span>";
					sTempStr += "</td>";
	
					sTempStr += "<td>";
					sTempStr += "<div id='cmvDialogEvent"+sEventId+"' class='cmvDialogEvent'>";
					sTempStr += "<div class='cmvDialogTitle'>" + sEventTitle + "</div>";
					if(sDateTimeString !== "")
						sTempStr += "<div class='cmvDialogTime'>" + sDateTimeString + "</div>";
					sTempStr += "</div>";
					sTempStr += "</td>";
	
					sTempStr += "</tr>";
				}
		
				sTempStr += "</table>";		
				sTempStr += "</div>";		
				sTempStr += "</div>";
		
				$(to.elem).find(".cmvDialogOuterCont").html(sTempStr);
		
				var iDialogWidthActual = $(to.elem).find(".cmvDialog").width();
				iDialogWidthActual = (iDialogWidthActual < 200) ? 200 : iDialogWidthActual;
				$(to.elem).find(".cmvDialog").css({"max-height": iDialogHeight, "max-width": iDialogWidth, "width": iDialogWidthActual});
		
				var iCalendarContWidth = $(to.elem).find(".cmvCalendarCont").width(),
				iCalendarContHeight = $(to.elem).find(".cmvCalendarCont").height(),
		
				iDialogCalcWidth = $(to.elem).find(".cmvDialog").width(),
				iDialogCalcHeight = $(to.elem).find(".cmvDialog").height(),
				iDayLeft = $(to.elem).find("#"+sDayId).position().left,
		
				iRowTop = $(to.elem).find("#"+sRowId).position().top,
				iThisHeight = $(this).height(),
				iTooltipHeight = 8,
		
				iDialogMaxHeight = iDialogHeight - 24;
				iDialogCalcHeight = (iDialogCalcHeight > iDialogMaxHeight) ? iDialogMaxHeight : iDialogCalcHeight;
		
				var iCMVMonthTableTop = $(to.elem).find(".cmvMonthTableMain").position().top,
				iHeaderHeight = ($(to.elem).find(".cContHeader").length > 0) ? $(to.elem).find(".cContHeader").height() : 0,
				iDialogTop, iDialogLeft, iTooltipTop, iTooltipLeft,
				sTooltipBorderColor = "", sInnerContMargin = "", sTooltipClass = "";
		
				if(iRowId <= 3)
				{
					iDialogTop = iCMVMonthTableTop + iRowTop + $(to.elem).find(".cmvDisplayAllEvents").height() - 5;
					iTooltipTop = -11;
					sTooltipClass = "cmvDialogTooltipBottom";
					sInnerContMargin = "10px 0px 0px 0px";
				}
				else
				{
					iDialogTop = (iCMVMonthTableTop + iRowTop) - (iDialogCalcHeight - 6);
					iTooltipTop = iDialogCalcHeight - 1;
					sTooltipClass = "cmvDialogTooltipTop";
					sInnerContMargin = "0px 0px 10px 0px";
				}
		
				if(iDayIndex === 0)
				{
					iDialogLeft = iDayLeft + 5;
					iTooltipLeft = iDayWidth - 34;
				}
				else if(iDayIndex === (to.setting.excludeNonBusinessHours ? to.tv.iBsDays : 6))
				{
					iDialogLeft = iCalendarContWidth - iDialogCalcWidth;
					iTooltipLeft = iDialogCalcWidth - 28;
				}
				else
				{
					iTooltipLeft = (iDialogCalcWidth / 2) - 14;
					var iDayMid = iDayLeft + iDayWidth - 10; 
					iDialogLeft = iDayMid - (iDialogCalcWidth / 2) - 4;
			
					var iDay1Left = $(to.elem).find(".cmvTableColumn0").position().left,
					iMaxHoriPos = iDialogLeft + iDialogCalcWidth,
					iMinHoriPos = iDialogLeft - (iDialogCalcWidth / 2),
					iDialogLeftPrev, iDiff;
					if(iMaxHoriPos >= iCalendarContWidth)
					{
						iDialogLeftPrev = iDialogLeft;
						iDialogLeft = iCalendarContWidth - iDialogCalcWidth - 5;
						iDiff = iDialogLeftPrev - iDialogLeft;
						iTooltipLeft += iDiff;
					}
					if(iMinHoriPos <= iDay1Left)
					{
						iDialogLeftPrev = iDialogLeft;
						iDialogLeft = iDay1Left + 5;
						iDiff = iDialogLeft - iDialogLeftPrev;
						iTooltipLeft -= iDiff;
					}
				}
		
				$(to.elem).find(".cmvDialogTooltip").addClass(sTooltipClass);
				$(to.elem).find(".cmvDialogTooltip").css({"top": iTooltipTop, "left": iTooltipLeft});
				$(to.elem).find(".cmvDialog").css({"top": iDialogTop, "left": iDialogLeft});
		
				iDialogHeight -= 24;		
				$(to.elem).find(".cmvDialogInnerCont").css({"margin": sInnerContMargin, "max-height": iDialogHeight, "max-width": iDialogWidth});
		
				$(to.elem).find(".cmvDialog").on($.CalenStyle.extra.sClickHandler, function(e)
				{
					e.stopPropagation();
				});
				to._addDialogEventAction();
		
			}
		
			// ------------------------------------- Dialog HTML End ----------------------------------------
		});
	},

	_closeDialogOfEventsForDay: function()
	{
		var to = this;
	
		var $oDialog = $(to.elem).find(".cmvDialogOuterCont");
		if($oDialog !== null)
		{
			$oDialog.animate({opacity: 0}, 100);
			setTimeout(function()
			{
				$oDialog.remove();
			}, 100);
		}
	},

	_addDialogEventAction: function()
	{
		var to = this;
	
		$(to.elem).find(".cmvDialogEvent").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
		
			var sEventId = $(this).attr("id"),
			iEventId = parseInt(sEventId.replace("cmvDialogEvent", "")),
			oTempEvent = to.getEventWithId(iEventId);
		
			if(to.setting.eventInADialogClicked)
				to.setting.eventInADialogClicked.call(to, oTempEvent);
		});
	},

	//-----------------------------------------	Events Dialog End -----------------------------------------

	//------------------------------------------ Events List Start ------------------------------------------

	_makeDayClickableInMonthView: function()
	{
		var to = this;
	
		var $elem;
		if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
			$elem = $(to.elem).find(".cdmvEventContMain");
		else
			$elem = $(to.elem).find(".cmvDay");
	
		$elem.on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
		
			var pClickedAt = {};
			pClickedAt.x = e.pageX || e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
			pClickedAt.y = e.pageY || e.originalEvent.touches[0].pageY || e.originalEvent.changedTouches[0].pageY;
			var oArrElemsAtPt = to.__getElementsAtPoint(pClickedAt.x, pClickedAt.y);
		
			for(var iTempIndex  = 0; iTempIndex <= oArrElemsAtPt.length; iTempIndex++)
			{
				var $oTempElem = $(oArrElemsAtPt[iTempIndex]);
				if($oTempElem.hasClass("cmvDay"))
					$elem = $oTempElem;
			}
		
			if($elem.hasClass("cmvDay"))
			{
				$(to.elem).find(".cmvDay .cmvDayNumber").removeClass("cCurrentHighlightCircle cContHeaderButtonsHover");
			
				var sDayId = $elem.attr("id");
				to.setting.selectedDate = to._getDateForDayIdInMonthView(sDayId);
				if(!to.compareStrings(to.setting.visibleView, "DatePicker") && to.compareDates($.CalenStyle.extra.dToday, to.setting.selectedDate) !== 0)
					$elem.find(".cmvDayNumber").addClass("cCurrentHighlightCircle");
			
				if(to.compareStrings(to.setting.visibleView, "DatePicker"))
				{
					if(to.setting.dayClicked)
						to.setting.dayClicked.call(to, to.setting.selectedDate, pClickedAt);
				}
				else
				{
					if(to.compareStrings(to.setting.actionOnDayClickInMonthView, "ChangeDate"))
					{
						if(to.setting.dayClicked)
							to.setting.dayClicked.call(to, to.setting.selectedDate, pClickedAt);
					}
					else
					{
						if(to.setting.dayClicked)
							to.setting.dayClicked.call(to, to.setting.selectedDate, pClickedAt);
					}
				}
			}
		});
	},

	//------------------------------------------ Events List End ------------------------------------------

	_getDateForDayIdInMonthView: function(sDayId)
	{
		var to = this;
	
		sArrDayId = sDayId.split("-");
		return to.setDateInFormat({"iDate": {y: sArrDayId[3], M: sArrDayId[2], d: sArrDayId[1]}}, "START");
	},

	_addTooltipInMonthView: function(sClass)
	{
		var to = this;
	
		$(to.elem).find(sClass).tooltip(
		{
			content: function()
			{
				var sTooltipText = "";
				if(to.compareStrings(to.setting.eventTooltipContent, "Default"))
				{
					var oTooltipContent = $(this).data("tooltipcontent");
					if(oTooltipContent.title !== undefined)
						sTooltipText += "<div class='cTooltipTitle'>" + oTooltipContent.title + "</div>";
					if(oTooltipContent.startDateTime !== undefined || oTooltipContent.endDateTime !== undefined)
					{
						sTooltipText += "<div class='cTooltipTime'>";
						if(oTooltipContent.startDateTime !== undefined)
							sTooltipText += oTooltipContent.startDateTime;
						if(oTooltipContent.endDateTime !== undefined)
							sTooltipText += ("<br/>" + oTooltipContent.endDateTime);
						sTooltipText += "</div>";
					}
				}
				else
				{
					var sEventId, sId;
					if($(this).hasClass("cmvEvent"))
					{
						sEventId = $(this).attr("id");
						sId = sEventId.split("-")[1];
					}
					else
					{
						sEventId = $(this).attr("id");
						sId = sEventId.split("-")[1];
					}
					var oEventRecord = to.getEventWithId(sId);
					sTooltipText = to.setting.eventTooltipContent.call(to, oEventRecord);
				}
				return sTooltipText;
			},
		
			position:
			{
				my: "center bottom-15",
				at: "center top",
				using: function(position, feedback)
				{
					$(this).css(position);
					$("<div>")
					.addClass("tooltip-arrow")
					.addClass(feedback.vertical)
					.addClass(feedback.horizontal)
					.appendTo(this);
				}
			}/*,
		
			hide:
			{
				delay: 3000000
			}*/
		});
	},

	_makeEventDraggableInMonthView: function(sClass)
	{
		var to = this;
	
		var iColumn1Width = $(to.elem).find(".cmvWeekNumber").width(),
		iRow1Height = $(to.elem).find(".cmvMonthTableRowDayHeader").height();
	
		var iEventHeight;
		if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
			iEventHeight = 16;
		else if(to.compareStrings(to.setting.visibleView, "MonthView"))
			iEventHeight = to._getHeightForAllDayEventInMonthView();
	
		var iColumnWidth = $(to.elem).find("#cmvMonthTableRow1 .cmvTableColumn0").width(),
		iColumnHeight = $(to.elem).find(".cmvMonthTableRows").css("min-height") || $(to.elem).find(".cmvMonthTableRows").css("height");
		if(to.compareStrings(to.setting.visibleView, "MonthView"))
			iColumnHeight = $(to.elem).find(".cmvMonthTableRows").css("height");
		iColumnHeight = parseInt(iColumnHeight.replace("px", ""));
	
		var iX1 = $(to.elem).find("#cmvMonthTableRow1 .cmvTableColumn0").offset().left,
		iX2 = $(to.elem).find("#cmvMonthTableRow1 .cmvTableColumns:last").offset().left,
		iY1 = $(to.elem).find("#cmvMonthTableRow1 .cmvTableColumn0").offset().top,
		iY2 = $(to.elem).find("#cmvMonthTableRow"+to.tv.iWkInMonth+" .cmvTableColumn0").offset().top + iColumnHeight - iEventHeight;
		if(to.compareStrings(to.setting.visibleView, "MonthView"))
			iY2 = iY2 - (2 * iEventHeight);
	
		$(to.elem).find(sClass).draggable(
		{
			zIndex: 100,
			scope: "Events",
			containment: [iX1, iY1, iX2, iY2],
			scroll: false,
		
			start: function()
			{
				var oElementClone = $(this).clone();
				$(oElementClone).removeClass("ui-draggable-dragging");
				$(this).parent().append(oElementClone);
			
				$(this).css({"position": "absolute"});
				$(this).css({"width": iColumnWidth, "height": iEventHeight});
			},
		
			revert: function()
			{
				$(this).remove();
				$(to.elem).find(".cmvDay").removeClass("cActivatedCell");
				if(to.setting.isTooltipInMonthView)
					to._addTooltipInMonthView(".cEventTooltip");
				if(to.setting.isDragNDropInMonthView)
					to._makeEventDraggableInMonthView(".EventDraggable");
				return true;
			}
		
		});
	},

	// Public Method
	adjustMonthTable: function()
	{
		var to = this;
	
		var iCalendarContWidth = $(to.elem).find(".calendarCont").parent().outerWidth(),
		iCalendarContHeight = $(to.elem).find(".calendarCont").parent().outerHeight();
		to.tv.iDocHtPrev = $(document).height();
	
		to._closeDialogOfEventsForDay();
	
		var iCalendarContHeightMV = iCalendarContHeight;
		if(to.compareStrings(to.setting.visibleView, "MonthView"))
			$(to.elem).find(".calendarContInner").css({"height": iCalendarContHeightMV});
		$(to.elem).find(".calendarContInner").css({"width": iCalendarContWidth});
	
		to.__adjustHeader();
	
		if(iCalendarContWidth >= 300 && iCalendarContHeight >= 300)
		{
			$(to.elem).find(".cmvDayHeader").removeClass("cmvThinBorderBottom cmvThinBorder").addClass("cmvThinBorderBottom");
			$(to.elem).find(".cmvWeekNumber").removeClass("cmvThinBorderRight cmvThinBorder").addClass("cmvThinBorderRight");
			$(to.elem).find(".cmvTableContainerOuter").addClass("cmvThinBorder");
		}
		else
		{
			$(to.elem).find(".cmvWeekNumber").removeClass("cmvThinBorderRight cmvThinBorder").addClass("cmvThinBorder");
			$(to.elem).find(".cmvTableContainerOuter").addClass("cmvThinBorder");
		}
	
		var iAvailableHeightForEvents, 
		iCMVMonthTableHeight, iCMVMonthTableHeightModified,
		iCMVMonthTableWidth, iCMVTableColumnsWidth,
		iCMVTableHeaderRowHeight, iCMVTableRowHeight,
		iDayNumberHeight, iMonthIndicatorTop, iMonthIndicatorTop,
		iDisplayAllDayEventsButtonHeight, iMaxNumberSectionHeight;

		if(iCalendarContWidth > 500 && iCalendarContHeight > 500)
		{
			iCMVMonthTableHeight = iCalendarContHeight - (($(to.elem).find(".cContHeader").length > 0) ? $(to.elem).find(".cContHeader").outerHeight() : 0);
			$(to.elem).find(".calendarCont").css({"height": iCalendarContHeight});
		
			if($(to.elem).find(".cContHeader").length > 0)
				$(to.elem).find(".cContHeader").css({"width": iCalendarContWidth});

			iCMVMonthTableWidth = (($(to.elem).find(".cContHeader").length > 0) ? $(to.elem).find(".cContHeader").outerWidth() : $(to.elem).find(".calendarContInner").outerWidth());
		
			iCMVTableColumnsWidth = iCMVMonthTableWidth / 7;
			if(to.setting.displayWeekNumInMonthView)
			{
				if(iCMVTableColumnsWidth > 50)
				{
					iCMVTableColumnsWidth = (iCMVMonthTableWidth - 50) / 6;
					$(to.elem).find(".cmvWeekNumber").css({"width": 50});
				} 
				else
					$(to.elem).find(".cmvWeekNumber").css({"width": iCMVTableColumnsWidth});
			}
			$(to.elem).find(".cmvTableColumns").css({"width": iCMVTableColumnsWidth});
		
			iCMVTableHeaderRowHeight = $(to.elem).find(".cmvMonthTableRowDayHeader").outerHeight();
		
			if(to.compareStrings(to.setting.visibleView, "MonthView"))
				iCMVTableRowHeight = (iCMVMonthTableHeight - iCMVTableHeaderRowHeight) / to.tv.iWkInMonth;
			else
			{
				if(to.setting.calculateDetailedMonthViewRowMinHeight)
					iCMVTableRowHeight = (iCMVMonthTableHeight - iCMVTableHeaderRowHeight) / to.tv.iWkInMonth;
				else
				{
					iCMVTableRowHeight = $(to.elem).find(".cmvMonthTableRows").css("min-height");
					iCMVTableRowHeight = parseInt(iCMVTableRowHeight.replace("px", ""));
				}
			}

			iDayNumberHeight = $(to.elem).find(".cmvDayNumber").height() + 2;
			iDisplayAllDayEventsButtonHeight = $(to.elem).find(".cmvDisplayAllEvents").height();
			iMaxNumberSectionHeight = (iDayNumberHeight > iDisplayAllDayEventsButtonHeight) ? iDayNumberHeight : iDisplayAllDayEventsButtonHeight;
			iAvailableHeightForEvents = iCMVTableRowHeight - iMaxNumberSectionHeight;
		
			$(to.elem).find(".cmvTableContainerOuter").css({"height": iCMVMonthTableHeight, "width": iCMVMonthTableWidth});
		
			if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
			{
				iCMVMonthTableWidth -= $.CalenStyle.extra.iBorderOverhead;
				iCMVMonthTableHeight -= $.CalenStyle.extra.iBorderOverhead;
			}
			$(to.elem).find(".cmvTableContainer").css({"height": iCMVMonthTableHeight, "width": iCMVMonthTableWidth, "top": -$.CalenStyle.extra.iBorderOverhead, "left": -$.CalenStyle.extra.iBorderOverhead});
		
			iCMVMonthTableHeightModified = 0;
			if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
			{
				if(to.setting.calculateDetailedMonthViewRowMinHeight)
					iCMVTableRowHeight = iCMVTableColumnsWidth;
				iCMVMonthTableHeightModified = iCMVTableHeaderRowHeight + (to.tv.iWkInMonth * iCMVTableRowHeight);
			
				$(to.elem).find(".cmvMonthTableRows").css({"min-height": iCMVTableRowHeight, "height": iCMVTableRowHeight});
				$(to.elem).find(".cmvMonthTableMain").css({"top": -$.CalenStyle.extra.iBorderOverhead});
			}
			else
			{
				$(to.elem).find(".cmvMonthTableRows").css({"height": iCMVTableRowHeight});
				if(to.compareStrings(to.setting.visibleView, "DatePicker"))
					$(to.elem).find(".cmvMonthTableRows").css({"min-height": iCMVTableRowHeight});
			
				if(to.compareStrings(to.setting.visibleView, "MonthView"))
				{
					if(to.compareStrings(to.setting.eventIndicatorInMonthView, "DayHighlight"))
					{
						iMonthIndicatorTop = iCMVTableRowHeight - iDayNumberHeight - $(to.elem).find(".cmvMonthTableRowIndicator").height() - 1;
						$(to.elem).find(".cmvMonthTableRowIndicator").css({"margin-top": iMonthIndicatorTop});
					}
					else if(to.compareStrings(to.setting.eventIndicatorInMonthView, "Custom"))
					{
						iMonthCustomMaxHeight = iCMVTableRowHeight - iDayNumberHeight;
						$(to.elem).find(".cmvMonthTableRowCustom").css({"max-height": iMonthCustomMaxHeight});
					}
				}
			}
		
			if(to.setting.fixedHeightOfDetailedMonthView && iCMVMonthTableHeightModified > iCMVMonthTableHeight)
			{
				iCMVMonthTableHeight = iCMVMonthTableHeightModified;
				iCMVMonthTableWidth -= iScrollbarWidth;
			}
		
			$(to.elem).find(".cmvMonthTableMain").css({"height": iCMVMonthTableHeight, "width": iCMVMonthTableWidth});
			$(to.elem).find(".cdmvEventContMain").css({"height": iCMVMonthTableHeight, "width": iCMVMonthTableWidth});
			$(to.elem).find(".cmvDayHeader").removeClass("cmvThinBorderBottom cmvThinBorder").addClass("cmvThinBorderBottom");
		}
		else
		{
			if($(to.elem).find(".cContHeader").length > 0)
			{
				if(iCalendarContWidth >= 300)
					$(to.elem).find(".cContHeader").css({"width": iCalendarContWidth});
				else
					$(to.elem).find(".cContHeader").css({"width": iCalendarContWidth});
			}
		
			iCMVMonthTableHeight = iCalendarContHeight - (($(to.elem).find(".cContHeader").length > 0) ? $(to.elem).find(".cContHeader").outerHeight() : 0);
			iCMVMonthTableWidth = (($(to.elem).find(".cContHeader").length > 0) ? $(to.elem).find(".cContHeader").outerWidth() : $(to.elem).find(".calendarContInner").outerWidth()); 	
		
			iCMVTableColumnsWidth = iCMVMonthTableWidth / 7;
			if(iCMVTableColumnsWidth > 50)
			{
				iCMVTableColumnsWidth = (iCMVMonthTableWidth - 50) / 6;
				$(to.elem).find(".cmvWeekNumber").css({"width": 50});
			}
			else
				$(to.elem).find(".cmvWeekNumber").css({"width": iCMVTableColumnsWidth});
		
			$(to.elem).find(".cmvTableColumns").css({"width": iCMVTableColumnsWidth});
		
			iCMVTableHeaderRowHeight = $(to.elem).find(".cmvMonthTableRowDayHeader").outerHeight();
		
			if(to.compareStrings(to.setting.visibleView, "MonthView"))
				iCMVTableRowHeight = (iCMVMonthTableHeight - iCMVTableHeaderRowHeight) / to.tv.iWkInMonth;
			else
			{
				if(to.setting.calculateDetailedMonthViewRowMinHeight)
					iCMVTableRowHeight = (iCMVMonthTableHeight - iCMVTableHeaderRowHeight) / to.tv.iWkInMonth;
				else
				{
					iCMVTableRowHeight = $(to.elem).find(".cmvMonthTableRows").css("min-height");
					iCMVTableRowHeight = parseInt(iCMVTableRowHeight.replace("px", ""));
				}
			}
		
			iDayNumberHeight = $(to.elem).find(".cmvDayNumber").height() + 2;
			iDisplayAllDayEventsButtonHeight = $(to.elem).find(".cmvDisplayAllEvents").height();
			iMaxNumberSectionHeight = (iDayNumberHeight > iDisplayAllDayEventsButtonHeight) ? iDayNumberHeight : iDisplayAllDayEventsButtonHeight;
			iAvailableHeightForEvents = iCMVTableRowHeight - iMaxNumberSectionHeight;
		
			$(to.elem).find(".cmvTableContainerOuter").css({"height": iCMVMonthTableHeight, "width": iCMVMonthTableWidth});
		
			if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
			{
				iCMVMonthTableWidth -= $.CalenStyle.extra.iBorderOverhead;
				iCMVMonthTableHeight -= $.CalenStyle.extra.iBorderOverhead;
			}
			$(to.elem).find(".cmvTableContainer").css({"height": iCMVMonthTableHeight, "width": iCMVMonthTableWidth, "top": -$.CalenStyle.extra.iBorderOverhead, "left": -$.CalenStyle.extra.iBorderOverhead});
		
			iCMVMonthTableHeightModified = 0;
			if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
			{
				if(to.setting.calculateDetailedMonthViewRowMinHeight)
					iCMVTableRowHeight = iCMVTableColumnsWidth;
			
				iCMVMonthTableHeightModified = iCMVTableHeaderRowHeight + (to.tv.iWkInMonth * iCMVTableRowHeight);
				$(to.elem).find(".cmvMonthTableRows").css({"min-height": iCMVTableRowHeight, "height": iCMVTableRowHeight});
				$(to.elem).find(".cmvMonthTableMain").css({"top": -$.CalenStyle.extra.iBorderOverhead});
			}
			else
			{
				$(to.elem).find(".cmvMonthTableRows").css({"height": iCMVTableRowHeight});
				if(to.compareStrings(to.setting.visibleView, "DatePicker"))
					$(to.elem).find(".cmvMonthTableRows").css({"min-height": iCMVTableRowHeight});
			
				if(to.compareStrings(to.setting.visibleView, "MonthView"))
				{
					if(to.compareStrings(to.setting.eventIndicatorInMonthView, "DayHighlight"))
					{
						iMonthIndicatorTop = iCMVTableRowHeight - iDayNumberHeight - $(to.elem).find(".cmvMonthTableRowIndicator").height() - 1;
						$(to.elem).find(".cmvMonthTableRowIndicator").css({"margin-top": iMonthIndicatorTop});
					}
					else if(to.compareStrings(to.setting.eventIndicatorInMonthView, "Custom"))
					{
						iMonthCustomMaxHeight = iCMVTableRowHeight - iDayNumberHeight;
						$(to.elem).find(".cmvMonthTableRowCustom").css({"max-height": iMonthCustomMaxHeight});
					}
				}
			}
		
			if(to.setting.fixedHeightOfDetailedMonthView && iCMVMonthTableHeightModified > iCMVMonthTableHeight)
			{
				iCMVMonthTableHeight = iCMVMonthTableHeightModified;
				iCMVMonthTableWidth -= iScrollbarWidth;
			}
		
			$(to.elem).find(".cmvMonthTableMain").css({"height": iCMVMonthTableHeight, "width": iCMVMonthTableWidth});
			$(to.elem).find(".cdmvEventContMain").css({"height": iCMVMonthTableHeight, "width": iCMVMonthTableWidth});
		}
	
		//------------------------ Events Adjustment Start ---------------------------------
		
		var iHeightForEvents = iAvailableHeightForEvents / 2;
		$(to.elem).find(".cmvEventContSmall").css({"height": iHeightForEvents});
		$(to.elem).find(".cmvEventContAllDay").css({"height": iHeightForEvents});
	
		var iHeightOfAllDayEvents = to._getHeightForAllDayEventInMonthView(),
		iHeightOfSmallEvents = to._getHeightForSmallEventInMonthView(),
		iMarginForSmallEvent = to._getMarginValueForSmallEventInMonthView(),
		sMarginForSmallEvent = iMarginForSmallEvent + "px " + iMarginForSmallEvent + "px;" ;
	
		$(to.elem).find(".cmvEventSmall").css({"width": iHeightOfSmallEvents, "height": iHeightOfSmallEvents, "margin": sMarginForSmallEvent, "top": 0});
		$(to.elem).find(".cmvEventAllDay").css({"height": iHeightOfAllDayEvents});
				
		//------------------------ Events Adjustment End ---------------------------------
	
		if(iCalendarContWidth >= 550)
			$(to.elem).find(".cmvMonthTableRows .cmvWeekNumber").addClass("clickableLink");
		else
			$(to.elem).find(".cmvMonthTableRows .cmvWeekNumber").removeClass("clickableLink");
	
		//-----------------------------------------------------------------------------------
				
		var iCMVMonthTableLeft = $(to.elem).find(".cmvMonthTableMain").position().left,
		iCMVMonthTableTop = 0;
		if($(to.elem).find(".cContHeader").length > 0)
			iCMVMonthTableTop = $(to.elem).find(".cContHeader").position().top +  $(to.elem).find(".cContHeader").outerHeight() - 1;
		else
			iCMVMonthTableTop = $(to.elem).position().top;
		$(to.elem).find(".cdmvEventContMain").css({"left": iCMVMonthTableLeft, "top": -$.CalenStyle.extra.iBorderOverhead});
	
		//to.__adjustFontSize();
		to._adjustEventsInMonthView();
		to.setCalendarBorderColor();
	
		if(to.compareStrings(to.setting.visibleView, "MonthView"))
		{
			if(to.setting.isDragNDropInMonthView)
				to._makeEventDraggableInMonthView(".EventDraggable");
		}
		//-----------------------------------------------------------------------------------
	},

	_getHeightForAllDayEventInMonthView: function()
	{
		var to = this;
	
		var iHeightForEvents = $(to.elem).find(".cmvEventContAllDay").height(),
		iHeightOfAllDayEvents = Math.floor(iHeightForEvents / 5);
		if(iHeightOfAllDayEvents < 2)
			iHeightOfAllDayEvents = 2;
		else if(iHeightOfAllDayEvents > 4)
			iHeightOfAllDayEvents = 4;
		return iHeightOfAllDayEvents;
	},

	_getHeightForSmallEventInMonthView: function()
	{
		var to = this;
	
		var iHeightForEvents = $(to.elem).find(".cmvEventContAllDay").height(),
		iHeightOfSmallEvents = Math.floor(iHeightForEvents / 2);
		if(iHeightOfSmallEvents < 2)
			iHeightOfSmallEvents = 2;
		else if(iHeightOfSmallEvents > 10)
			iHeightOfSmallEvents = 10;		
		return iHeightOfSmallEvents;
	},

	_getMarginValueForSmallEventInMonthView: function()
	{
		var to = this;
	
		var iHeightOfSmallEvents = to._getHeightForSmallEventInMonthView();	
		if(iHeightOfSmallEvents <= 3)
			return 1;
		else if(iHeightOfSmallEvents > 3)
			return 2;
	},

	_setMonthStrings: function()
	{	
		var to = this;
		var sUnderlineClass = (to.setting.visibleView == "DatePicker") ? "cContHeaderLabelUnderline" : "",
		sClickableClass = (to.setting.visibleView == "DatePicker") ? "clickableLink" : "";
		var sTempStr = "<span class='cContHeaderLabelMonth "+sClickableClass+"'><span class='"+sUnderlineClass+"'><b>" + to.getDateInFormat({"iDate": {M: to.setting.selectedDate.getMonth()}}, "MMMM", false, true) + "</b></span></span>";	
		sTempStr += "<span class='cContHeaderLabelYear "+sClickableClass+"'><span class='"+sUnderlineClass+"'>" + to.getNumberStringInFormat(to.setting.selectedDate.getFullYear(), 0, true) + "</span></span>";	
	
		if(to.setting.modifyHeaderViewLabels)
			to.setting.modifyHeaderViewLabels.call(to, to.tv.dVSDt, to.tv.dVEDt, to.setting.selectedDate, sTempStr, to.setting.visibleView);

		$(to.elem).find(".cContHeaderLabel").html(sTempStr);
	
		if(to.compareStrings(to.setting.visibleView, "DatePicker"))
		{
			$(to.elem).find(".cContHeaderLabelMonth").on($.CalenStyle.extra.sClickHandler, function(e)
			{
				e.stopPropagation();			
				var oMonthPicker = new CalenStyle_MonthPicker(to, false);
				oMonthPicker.showOrHideMonthList();
			});
		
			$(to.elem).find(".cContHeaderLabelYear").on($.CalenStyle.extra.sClickHandler, function(e)
			{
				e.stopPropagation();
				var oYearPicker = new CalenStyle_YearPicker(to, false);
				oYearPicker.showOrHideYearList();
			});			
		}
	},

	__goToPrevMonthView: function()
	{
		var to = this;
	
		if($(to.elem).find(".cmlvOuterCont").length <= 0 && $(to.elem).find(".cylvOuterCont").length <= 0)
		{
			if(to.setting.showTransition)
			{				
				var iCMVMonthTableWidth = $(to.elem).find(".cmvMonthTableMain").width(),
				iCMVMonthTableLeft = $(to.elem).find(".cmvMonthTableMain").position().left,
				iCMVMonthTableTop = 0;
				if(to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
				{
					if($(to.elem).find(".cContHeader").length > 0)
						iCMVMonthTableTop = $(to.elem).find(".cContHeader").position().top + $(to.elem).find(".cContHeader").outerHeight() - 1;
					else
						iCMVMonthTableTop = $(to.elem).position().top;
				}
			
				var newElem = $(to.elem).find(".cmvMonthTableMain").clone();
				$(newElem).removeClass("cmvMonthTableMain").addClass("cmvMonthTableTemp");
				$(newElem).css({"position": "absolute", "top": iCMVMonthTableTop, "left": iCMVMonthTableLeft});
				$(to.elem).find(".cmvMonthTableMain").parent().append(newElem);
				$(newElem).css({"z-index": 101});
				iCMVMonthTableLeft = iCMVMonthTableLeft + iCMVMonthTableWidth;
			
				//-----------------------------------------------------------------------------------
			
				var iCDMVEventContLeft, iCDMVEventContWidth, newElemCont2;
				if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
				{
					iCDMVEventContLeft = $(to.elem).find(".cdmvEventContMain").position().left;
					iCDMVEventContWidth= $(to.elem).find(".cdmvEventContMain").width();
					newElemCont2 = $(to.elem).find(".cdmvEventContMain").clone();
					$(newElemCont2).removeClass("cdmvEventContMain").addClass("cdmvEventContTemp");	
					$(to.elem).find(".cdmvEventContMain").parent().append(newElemCont2);
					$(newElemCont2).css({"z-index": 102});
					iCDMVEventContLeft = iCDMVEventContLeft + iCDMVEventContWidth;
					
					$(newElemCont2).animate({"left": iCDMVEventContLeft}, to.setting.transitionSpeed);
				}
				//-----------------------------------------------------------------------------------
			
				$(newElem).animate({"left": iCMVMonthTableLeft}, to.setting.transitionSpeed);
				
				setTimeout(function()
				{
					$(newElem).remove();
				
					if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
						$(newElemCont2).remove();
				
				}, to.setting.transitionSpeed);
			}
		
			to.tv.dCMDt = new Date(to.tv.dPMDt);
			to._setNextPreviousMonthDates();
		
			var iMonth = to.tv.dCMDt.getMonth(),
			iYear = to.tv.dCMDt.getFullYear(),
			iNumOfDays = to.__getNumberOfDaysOfMonth(iMonth, iYear),
			iDate = to.setting.selectedDate.getDate();
			if(iDate > iNumOfDays)
				iDate = iNumOfDays;
		
			var iHours = to.setting.selectedDate.getHours(),
			iMinutes = to.setting.selectedDate.getMinutes(),
			iSeconds = to.setting.selectedDate.getSeconds();			
		
			to.setting.selectedDate = to.setDateInFormat({"iDate": {y: iYear, M: iMonth, d: iDate, H: iHours, m: iMinutes, s: iSeconds}}, "");
			to.tv.dLoadDt = to.setDateInFormat({"date": to.setting.selectedDate}, "START");
		
			to.tv.sLoadType = "Prev";
			to.updateMonthTableAndContents(true);
		}
	},

	__goToNextMonthView: function()
	{
		var to = this;
	
		if($(to.elem).find(".cmlvOuterCont").length <= 0 && $(to.elem).find(".cylvOuterCont").length <= 0)
		{
			if(to.setting.showTransition)
			{
				var iCMVMonthTableWidth = $(to.elem).find(".cmvMonthTableMain").width(),
				iCMVMonthTableLeft = $(to.elem).find(".cmvMonthTableMain").position().left,
				iCMVMonthTableTop = 0;
				if(to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
				{
					if($(to.elem).find(".cContHeader").length > 0)
						iCMVMonthTableTop = $(to.elem).find(".cContHeader").position().top + $(to.elem).find(".cContHeader").outerHeight() - 1;
					else
						iCMVMonthTableTop = $(to.elem).position().top;
				}
			
				var newElem = $(to.elem).find(".cmvMonthTableMain").clone();
				$(newElem).removeClass("cmvMonthTableMain").addClass("cmvMonthTableTemp");
				$(newElem).css({"position": "absolute", "top": iCMVMonthTableTop, "left": iCMVMonthTableLeft});
				$(newElem).css({"z-index": 101});
			
				iCMVMonthTableLeft = iCMVMonthTableLeft - iCMVMonthTableWidth;
				$(to.elem).find(".cmvMonthTableMain").parent().append(newElem);
			
				//-----------------------------------------------------------------------------------
			
				var iCDMVEventContLeft, iCDMVEventContWidth, newElemCont2;
				if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
				{
					iCDMVEventContLeft = $(to.elem).find(".cdmvEventContMain").position().left;
					iCDMVEventContWidth= $(to.elem).find(".cdmvEventContMain").width();
					newElemCont2 = $(to.elem).find(".cdmvEventContMain").clone();
					$(newElemCont2).removeClass("cdmvEventContMain").addClass("cdmvEventContTemp");	
					$(to.elem).find(".cdmvEventContMain").parent().append(newElemCont2);
					$(newElemCont2).css({"z-index": 102});
					iCDMVEventContLeft = iCDMVEventContLeft - iCDMVEventContWidth;
					$(newElemCont2).animate({"left": iCDMVEventContLeft}, to.setting.transitionSpeed);
				}
			
				//-----------------------------------------------------------------------------------
			
				$(newElem).animate({"left": iCMVMonthTableLeft}, to.setting.transitionSpeed);
			
				setTimeout(function()
				{
					$(newElem).remove();
					if(to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
						$(newElemCont2).remove();						
				}, to.setting.transitionSpeed);
			}
		
			to.tv.dCMDt = new Date(to.tv.dNMDt);
			to._setNextPreviousMonthDates();
		
			var iMonth = to.tv.dCMDt.getMonth(),
			iYear = to.tv.dCMDt.getFullYear(),
			iNumOfDays = to.__getNumberOfDaysOfMonth(iMonth, iYear),
			iDate = to.setting.selectedDate.getDate();
			if(iDate > iNumOfDays)
				iDate = iNumOfDays;
		
			var iHours = to.setting.selectedDate.getHours(),
			iMinutes = to.setting.selectedDate.getMinutes(),
			iSeconds = to.setting.selectedDate.getSeconds();			
		
			to.setting.selectedDate = to.setDateInFormat({"iDate": {y: iYear, M: iMonth, d: iDate, H: iHours, m: iMinutes, s: iSeconds}}, "");
			to.tv.dLoadDt = to.setDateInFormat({"date": to.setting.selectedDate}, "START");
		
			to.tv.sLoadType = "Next";
			to.updateMonthTableAndContents(true);
		}
	},

	// Public Method
	highlightDatesInDatePicker: function(dArrDates)
	{
		var to = this;
	
		if(dArrDates !== null || dArrDates !== undefined)
		{
			to.tv.dHighlightDPV = dArrDates;
			to.__highlightDaysInDatePicker();
		}
	},

	__highlightDaysInDatePicker: function()
	{
		var to = this;
	
		$(".cmvDay").removeClass("cDatePickerHighlightBg");
		if(to.tv.dHighlightDPV !== null || to.tv.dHighlightDPV !== undefined)
		{
			for(var iTempIndex = 0; iTempIndex < to.tv.dHighlightDPV.length; iTempIndex++)
			{
				var dThisDate = to.tv.dHighlightDPV[iTempIndex],
				sDayId = "#cmvDay-"+dThisDate.getDate()+"-"+dThisDate.getMonth()+"-"+dThisDate.getFullYear();
				$(to.elem).find(sDayId).addClass("cDatePickerHighlightBg");
			}
		}
	}

});

/*! ------------------------------------ CalenStyle Month View End ----------------------------------- */




/*! ---------------------------------- CalenStyle Detail View Start ---------------------------------- */

CalenStyle.prototype = $.extend(CalenStyle.prototype, {

	_getTimeSlotsArrayForCurrentView: function()
	{
		var to = this;
		var iDateIndex, iSlotsIndex, iTempIndex, iHoursIndex, 
		iTempHour, iTempMinutes, iTempSlot, iTempSlotIndex, iNumOfSlotsSpanned;
		var iNumOfDays = Math.round((to.tv.dVDEDt.getTime() - to.tv.dVDSDt.getTime()) / $.CalenStyle.extra.iMS.d),
		bArrTemp;
		to.tv.bADVCur = [];
	
		// ---------------------- Set arrayOfTimeSlots Start --------------------------
	
		for(iDateIndex = 0; iDateIndex < iNumOfDays; iDateIndex++)
		{
			bArrTemp = [];
			for(iHoursIndex = 0; iHoursIndex < 24; iHoursIndex++)
			{
				for(iSlotsIndex = 0; iSlotsIndex < to.tv.iUTmSlt; iSlotsIndex++)
					bArrTemp.push(0);
			}
			to.tv.bADVCur.push(bArrTemp);
		}
	
		// ---------------------- Set arrayOfTimeSlots End ----------------------------
	
		// ------------- Set BlockedTime and BusinessHours in arrayOfTimeSlots Start --------------
	
		var dThisTempDate = new Date(to.tv.dVDSDt),
		iThisTempDate = to.tv.dVDSDt.getTime();
	
		for(iDateIndex = 0; iDateIndex < iNumOfDays; iDateIndex++)
		{
			if(to.tv.bABsDays[dThisTempDate.getDay()])
			{
				bArrTemp = to.tv.bADVCur[iDateIndex];
				var dArrTempBlockedTimes = to._getBlockedTimesForCurrentView(dThisTempDate);
				var oArrTempBusinessHours = to._getBusinessHoursForCurrentView(dThisTempDate);
			
				// ---------------------- Set Available Date Array Indicator Start -------------------------- 
				if(oArrTempBusinessHours.length > 0)
				{
					for(iTempIndex = 0; iTempIndex < oArrTempBusinessHours.length; iTempIndex++)
					{
						var dArrTempAvailable = oArrTempBusinessHours[iTempIndex],
						dTempAvailableStart = new Date(dArrTempAvailable[0]),
						dTempAvailableEnd = new Date(dArrTempAvailable[1]);
						iNumOfSlotsSpanned = Math.floor((dTempAvailableEnd.getTime() - dTempAvailableStart.getTime()) / to.tv.iUTmMS);
					
						iTempHour = dTempAvailableStart.getHours();
						iTempMinutes = dTempAvailableStart.getMinutes();
						iTempSlot = Math.floor(iTempMinutes / to.setting.unitTimeInterval);
						for(iSlotsIndex = 0; iSlotsIndex < iNumOfSlotsSpanned; iSlotsIndex++)
						{
							iTempSlotIndex = (iTempHour === 0) ? iTempSlot : ((iTempHour * to.tv.iUTmSlt) + iTempSlot);
							bArrTemp[iTempSlotIndex] = 1;
							iTempMinutes += to.setting.unitTimeInterval;
							iTempSlot = Math.floor(iTempMinutes / to.setting.unitTimeInterval);
							if(iTempMinutes >= 60)
							{
								iTempMinutes = iTempMinutes % to.setting.unitTimeInterval;
								iTempSlot = Math.floor(iTempMinutes / to.setting.unitTimeInterval);
								iTempHour += 1;
							}
						}
					}
				}
				// ----------------------- Set Available Date Array Indicator End --------------------------- 
			
				// --------------- Set Blocked Date Array Indicator Start --------------------------------- 
				if(dArrTempBlockedTimes.length > 0)
				{
					for(iTempIndex = 0; iTempIndex < dArrTempBlockedTimes.length; iTempIndex++)
					{
						var dArrTempBlocked = dArrTempBlockedTimes[iTempIndex],
						dTempBlockedStart = new Date(dArrTempBlocked.start),
						dTempBlockedEnd = new Date(dArrTempBlocked.end);
						iNumOfSlotsSpanned = Math.floor((dTempBlockedEnd.getTime() - dTempBlockedStart.getTime()) / to.tv.iUTmMS);
						if(iNumOfSlotsSpanned === 0)
							iNumOfSlotsSpanned = 1;
					

						iTempHour = dTempBlockedStart.getHours();
						iTempMinutes = dTempBlockedStart.getMinutes();
						iTempSlot = Math.floor(iTempMinutes / to.setting.unitTimeInterval);
						for(iSlotsIndex = 0; iSlotsIndex < iNumOfSlotsSpanned; iSlotsIndex++)
						{
							iTempSlotIndex = (iTempHour === 0) ? iTempSlot : ((iTempHour * to.tv.iUTmSlt) + iTempSlot);
							bArrTemp[iTempSlotIndex] = 2;
						
							iTempMinutes += to.setting.unitTimeInterval;
							iTempSlot = Math.floor(iTempMinutes / to.setting.unitTimeInterval);
							if(iTempMinutes >= 60)
							{
								iTempMinutes = iTempMinutes % to.setting.unitTimeInterval;
								iTempSlot = Math.floor(iTempMinutes / to.setting.unitTimeInterval);
								iTempHour += 1;
							}
						}
					}
				}
				// --------------- Set Blocked Date Array Indicator End -----------------------------------
			
				to.tv.bADVCur[iDateIndex] = bArrTemp;
			}
		
			iThisTempDate += $.CalenStyle.extra.iMS.d;
			dThisTempDate = new Date(iThisTempDate);
		}
	
		// ------------- Set BlockedTime and BusinessHours in arrayOfTimeSlots Start --------------
	},

	_getWhetherEventIsAllDay: function(sId)
	{
		var to = this;
		var oThisEvent = to.getEventWithId(sId);
		if(oThisEvent.isAllDay !== null)
			return oThisEvent.isAllDay;
		else
			return false;
	},

	_getStartAndEndDatesOfEventWithId: function(iEventId)
	{
		var to = this;			
		var oThisEvent = to.getEventWithId(iEventId);
		return [oThisEvent.start, oThisEvent.end];
	},

	_getNumberOfHoursOfEventWithId: function(sEventId)
	{
		var to = this;			
		var oEvent = to.getEventWithId(sEventId);
		return to.__getNumberOfHoursOfEvent(oEvent.isAllDay, oEvent.start, oEvent.end);
	},

	_getNumberOfDaysOfEventForWeek: function(bIsAllDay, dStartDateTime, dEndDateTime, bWithHours, bForView)
	{
		var to = this;
	
		var dTempEndDateTime = new Date(dEndDateTime);
		if(dEndDateTime.getHours() === 0 && dEndDateTime.getMinutes() === 0)
			dTempEndDateTime.setMinutes(dTempEndDateTime.getMinutes() - 1);
	
		var iNumOfDays = 0,
		dArrTempDates = to.__getStartAndEndDatesOfEventForView(bIsAllDay, dStartDateTime, dTempEndDateTime),
		dTempStartDate = dArrTempDates[0], dTempEndDate = dArrTempDates[1],
		iNumOfMinutes = Math.round((dTempEndDate.getTime() - dTempStartDate.getTime()) / $.CalenStyle.extra.iMS.m),
		iNumOfHours = Math.round(iNumOfMinutes / 60);
	
		if(iNumOfMinutes < 0)
			console.log("Invalid Start And End Dates " + dStartDateTime + " " + dTempEndDateTime);
		else
		{
			iNumOfDays = 0;
			if(to.compareDates(dTempStartDate, dTempEndDate) !== 0)
			{
				var dNewStartDate = to.setDateInFormat({"date": dTempStartDate}, "START"),
				dNewEndDate = to.setDateInFormat({"date": dTempEndDate}, "START"),
				iNewNumOfHours = (dNewEndDate.getTime() - dNewStartDate.getTime()) / $.CalenStyle.extra.iMS.h;			
				iNumOfDays = Math.round(iNewNumOfHours / 24) + 1;
			
				if(bForView)
				{
					var dTempDate = new Date(dNewStartDate), iTempNumOfDays = 0;
					for(var iTempIndex = 0; iTempIndex < iNumOfDays; iTempIndex++)
					{
						if(to.__findWhetherDateIsVisibleInCurrentView(dTempDate, (bIsAllDay || iNumOfHours > 23), dTempStartDate, dTempEndDate))
							iTempNumOfDays++;
						dTempDate.setDate(dTempDate.getDate() + 1);
					}
					iNumOfDays = iTempNumOfDays;
				}
			}	
			else
			{
				if(bForView)
				{
					if(to.__findWhetherDateIsVisibleInCurrentView(dTempStartDate, (bIsAllDay || iNumOfHours > 23), dTempStartDate, dTempEndDate))
						iNumOfDays = 1;
				}
				else
					iNumOfDays = 1;						
			}
		}
	
		if(bWithHours)
			return [iNumOfDays, iNumOfHours];
		else
			return iNumOfDays;
	},

	_getLeftPositionOfEventSeg: function(iLeftPos)
	{
		var to = this;
	
		var iArrDVDaysLength = to.tv.fADVDayLftPos.length,
		iDVTableColumnWidth = $(to.elem).find(".cdvTableColumns").width(),
		iNewLeftPos = 0;
		for(var iTempIndex1 = 0; iTempIndex1 < iArrDVDaysLength; iTempIndex1++)
		{
			var iHoriStartPos = to.tv.fADVDayLftPos[iTempIndex1],
			iHoriEndPos = iHoriStartPos + iDVTableColumnWidth;
		
			iHoriStartPos -= 5;
			iHoriEndPos -= 5;
		
			if(iTempIndex1 === (iArrDVDaysLength - 1))
				iHoriEndPos += 5;
			if(iLeftPos >= iHoriStartPos && iLeftPos <= iHoriEndPos)
			{
				iNewLeftPos = to.tv.fADVDayLftPos[iTempIndex1];
				break;
			}
		}
		return iNewLeftPos;
	},

	_getDateBasedOnLeftPosition: function(iLeftPos)
	{
		var to = this;
	
		var iDVTableColumnWidth = $(to.elem).find(".cdvTableColumns").width(),
		iArrDVDaysLength = to.tv.fADVDayLftPos.length,
		iTempIndex = 0, iThisIndex = 0;
	
		for(var iTempIndex1 = 0; iTempIndex1 < iArrDVDaysLength; iTempIndex1++)
		{
			var iHoriStartPos = to.tv.fADVDayLftPos[iTempIndex1] - 5,
			iHoriEndPos = iHoriStartPos + iDVTableColumnWidth - 5; 
		
			if(iTempIndex1 === (iArrDVDaysLength - 1))
				iHoriEndPos += 5;
		
			if(iLeftPos >= iHoriStartPos && iLeftPos <= iHoriEndPos)
			{
				iThisIndex = iTempIndex1 + 1;
				break;
			}
		}
		
		for(iTempIndex2 = 0; iTempIndex2 < to.tv.dAVDt.length; iTempIndex2++)
		{
			var dThisDate = to.tv.dAVDt[iTempIndex2];
			if(to.__isDateInCurrentView(dThisDate))
			{
				iTempIndex++;
				if(iTempIndex === iThisIndex)
					return dThisDate;
			}
		}
	},

	_getDateForDayNumber: function(iDayNumber, bFromLeft)
	{
		var to = this;
	
		var iThisIndex = (bFromLeft) ? 0 : (to.tv.iNoVDay - 1),
		iThisDayNumber = 0;
		for(var iTempIndex = 0; iTempIndex < to.tv.iNoVDay; iTempIndex++)
		{
			iThisDayNumber++;
			if(iThisDayNumber === iDayNumber)
				return to.tv.dAVDt[iThisIndex];
			iThisIndex = (bFromLeft) ? (iThisIndex + 1) : (iThisIndex - 1);
		}
	},

	_createCopyOfArray: function(oArrInput)
	{
		var to = this;
		var oArrOutput = [];
		return oArrOutput.concat(oArrInput);
	},

	//------------------------------- Event Segment Manipulation Start -------------------------------

	_setPropertiesOfEventSeg: function()
	{	
		var to = this;
	
		var oArrCollidingEvents = [], oArrTimeSlots, iSlotIndex;
		// ---------------------------- setPropertiesOfEventSegments ----------------------------
		for(var iThisDay = 0; iThisDay < to.tv.dAVDt.length; iThisDay++)
		{
			var oArrConditions = [];
			oArrConditions.push(["eventSegStart", to.tv.dAVDt[iThisDay]]);
			var oArrTempEvents = to._getEventSegWith(oArrConditions);
			oArrTempEvents = to._sortEventSeg(to._createCopyOfArray(oArrTempEvents));
		
			oArrTimeSlots = [];
			for(var iThisEvent = 0; iThisEvent < oArrTempEvents.length; iThisEvent++)
			{
				var oEventSeg = oArrTempEvents[iThisEvent],
				dSegStartDate = oEventSeg.eventSegStart,
				dSegEndDate = oEventSeg.eventSegEnd,
				oTempArrEventSegs, oArrTempSlot;	
			
				if(oArrTimeSlots.length <= 0)
				{
					oTempArrEventSegs = new Array(oEventSeg);
					oArrTempSlot = new Array(dSegStartDate, dSegEndDate, oTempArrEventSegs);
					oArrTimeSlots.push(oArrTempSlot);
				}
				else
				{
					var bAddedInExisting = 0;
					for(iSlotIndex = 0; iSlotIndex < oArrTimeSlots.length; iSlotIndex++)
					{
						var oTimeSlot = oArrTimeSlots[iSlotIndex],
						dSlotStartDate = oTimeSlot[0],
						dSlotEndDate = oTimeSlot[1],
					
						bSegStartDate1 = 0, bSegStartDate2 = 0,
						bSegEndDate1 = 0, bSegEndDate2 = 0,
						iCompStartTime1 = to.compareDateTimes(dSegStartDate, dSlotStartDate),
						iCompStartTime2 = to.compareDateTimes(dSegStartDate, dSlotEndDate),
						iCompEndTime1 = to.compareDateTimes(dSegEndDate, dSlotStartDate),
						iCompEndTime2 = to.compareDateTimes(dSegEndDate, dSlotEndDate);
						if(iCompStartTime1 > 0 || iCompStartTime1 === 0)
							bSegStartDate1 = 1;
						if(iCompStartTime2 < 0)
							bSegStartDate2 = 1;
						if(iCompEndTime1 > 0)
							bSegEndDate1 = 1;
						if(iCompEndTime2 < 0 || iCompEndTime2 === 0)
							bSegEndDate2 = 1;					
					
						if((bSegStartDate1 === 1 && bSegStartDate2 === 1) || (bSegEndDate1 === 1 && bSegEndDate2 === 1))
						{
							var oArrSlotSegments = oTimeSlot[2];
							oArrSlotSegments.push(oEventSeg);
							bAddedInExisting = 1;
						}
					
						if(iCompStartTime1 < 0)
							oTimeSlot[0] = dSegStartDate; // Changing StartTime
						if(iCompEndTime2 > 0 && iCompStartTime2 < 0)
							oTimeSlot[1] = dSegEndDate; // Changing EndTime
					}
				
					if(bAddedInExisting === 0)
					{
						oTempArrEventSegs = new Array(oEventSeg);
						oArrTempSlot = new Array(dSegStartDate, dSegEndDate, oTempArrEventSegs);
						oArrTimeSlots.push(oArrTempSlot);
					}
				}
			}
			oArrCollidingEvents.push(oArrTimeSlots);
		}
	
		// ------------------------------ Colliding Events ------------------------------- 
	
		var oAEventsegColumns = [];	
		for(var iIndex = 0; iIndex < oArrCollidingEvents.length; iIndex++)
		{
			oArrTimeSlots = oArrCollidingEvents[iIndex];
			oArrTempColumns = [];
			for(iSlotIndex = 0; iSlotIndex < oArrTimeSlots.length; iSlotIndex++)
			{
				var oArrTempTimeSlot = oArrTimeSlots[iSlotIndex],
				oAEventsegs = oArrTempTimeSlot[2],
				oArrColumns = to._assignEventSegToColumnsInDetailView(oAEventsegs);
				oArrTempColumns.push([oArrTempTimeSlot[0], oArrTempTimeSlot[1], oArrColumns]);
			}
			oAEventsegColumns.push(oArrTempColumns);
		}
	},

	_getEventSegWith: function(oArrConditions)
	{
		var to = this;
	
		var oArrTempEvents = [];
		for(var iSeg = 0; iSeg < to.tv.oASmEvSeg.length; iSeg++)
		{
			var oEventSeg = to.tv.oASmEvSeg[iSeg],
			bConditionSatisfied = 0;
			for(var iCondition = 0; iCondition < oArrConditions.length; iCondition++)
			{
				var oCondition = oArrConditions[iCondition],
				propertyName = oCondition[0],
				compareToValue = oCondition[1];
				if(to.compareStrings(propertyName, "eventSegStart") || to.compareStrings(propertyName, "eventSegEnd"))
				{
					if(to.compareDates(oEventSeg[propertyName], compareToValue) === 0)
						bConditionSatisfied++;
				}
				else
				{
					if(oEventSeg[propertyName] === compareToValue)
						bConditionSatisfied++;
				}
			}	
			if(bConditionSatisfied === oArrConditions.length)
				oArrTempEvents.push(oEventSeg);
		}
		return oArrTempEvents;
	},

	_sortEventSeg: function(oArrTempEventSegs)
	{
		var to = this;
	
		// Event Segment Sorting Logic 
		// 1. Sort Event Segments Based on StartDateTime
		// 2. Sort Events Based on Duration
	
		var iNumOfEventSegs = oArrTempEventSegs.length;
		if(iNumOfEventSegs > 1)
		{				
			for(var iEventOut = 0; iEventOut < iNumOfEventSegs; iEventOut++)
			{
				var oEventSeg1 = oArrTempEventSegs[iEventOut],
				sEventSeg1Id = oEventSeg1.eventId,
				dEvent1StartDate = to._getStartAndEndDatesOfEventWithId(sEventSeg1Id)[0];
			
				for(var iEventIn = (iEventOut + 1); iEventIn < iNumOfEventSegs; iEventIn++)
				{
					var oEventSeg2 = oArrTempEventSegs[iEventIn],
					sEventSeg2Id = oEventSeg2.eventId,
					oTempEventSeg;
					if(sEventSeg1Id !== sEventSeg2Id)
					{
						dEvent2StartDate = to._getStartAndEndDatesOfEventWithId(sEventSeg2Id)[0];
						iCompTimes = to.compareDateTimes(dEvent1StartDate, dEvent2StartDate);
				
						if(iCompTimes > 0)
						{
							oTempEventSeg = oEventSeg1;
							oEventSeg1 = oEventSeg2;
							oEventSeg2 = oTempEventSeg;
							oArrTempEventSegs[iEventOut] = oEventSeg1;
							dEvent1StartDate = dEvent2StartDate;
							oArrTempEventSegs[iEventIn] = oEventSeg2;
						}
						else if(iCompTimes === 0)
						{
							var iEvent1Hours = to._getNumberOfHoursOfEventWithId(sEventSeg1Id),
							iEvent2Hours = to._getNumberOfHoursOfEventWithId(sEventSeg2Id);
							if(iEvent2Hours > iEvent1Hours)
							{
								oTempEventSeg = oEventSeg1;
								oEventSeg1 = oEventSeg2;
								oEventSeg2 = oTempEventSeg;
								oArrTempEventSegs[iEventOut] = oEventSeg1;
								dEvent1StartDate = oEvent1.eventSegStart;
								oArrTempEventSegs[iEventIn] = oEventSeg2;
							}
						}
					}
				}
			}		
		}
		return oArrTempEventSegs;
	},

	_whetherEventsAreColliding: function(oEventSeg1, oEventSeg2)
	{
		var to = this;
	
		var dEventSeg1StartDate = oEventSeg1.eventSegStart,
		dEventSeg1EndDate = oEventSeg1.eventSegEnd,
		dEventSeg2StartDate = oEventSeg2.eventSegStart,
		dEventSeg2EndDate = oEventSeg2.eventSegEnd,
	
		bSegStartDate1 = 0, bSegStartDate2 = 0,
		bSegEndDate1 = 0, bSegEndDate2 = 0,
	
		iCompStartTime1 = to.compareDateTimes(dEventSeg1StartDate, dEventSeg2StartDate),
		iCompStartTime2 = to.compareDateTimes(dEventSeg1StartDate, dEventSeg2EndDate),
		iCompEndTime1 = to.compareDateTimes(dEventSeg1EndDate, dEventSeg2StartDate),
		iCompEndTime2 = to.compareDateTimes(dEventSeg1EndDate, dEventSeg2EndDate);
	
		if(iCompStartTime1 > 0 || iCompStartTime1 === 0)
			bSegStartDate1 = 1;
		if(iCompStartTime2 < 0)
			bSegStartDate2 = 1;
		if(iCompEndTime1 > 0)
			bSegEndDate1 = 1;
		if(iCompEndTime2 < 0 || iCompEndTime2 === 0)
			bSegEndDate2 = 1;
	
		if((bSegStartDate1 === 1 && bSegStartDate2 === 1) || (bSegEndDate1 === 1 && bSegEndDate2 === 1))
			return true;
		else
			return false;
	},

	_removeEventSegWithId: function(sId)
	{
		var to = this;
	
		var oArrTemp = [];
		for(var iSegIndex = 0; iSegIndex < to.tv.oASmEvSeg.length; iSegIndex++)
		{
			var oEventSeg = to.tv.oASmEvSeg[iSegIndex];
			if(oEventSeg.eventId !== sId)
				oArrTemp.push(oEventSeg);
		}	
		to.tv.oASmEvSeg = [];
		to.tv.oASmEvSeg = oArrTemp;
	},

	_createAndAddEventSegForId: function(sId, bIsAllDay, dStartDateTime, dEndDateTime)
	{
		var to = this;
	
		var dArrTempDates = to.__getStartAndEndDatesOfEventForView(bIsAllDay, dStartDateTime, dEndDateTime),
		dTempStartDate = dArrTempDates[0],
		dTempEndDate = dArrTempDates[1],
		iNumOfHours = to.__getNumberOfHoursOfEvent(bIsAllDay, dStartDateTime, dEndDateTime),
		iNumOfEventElements = to._getNumberOfDaysOfEventForWeek(bIsAllDay, dStartDateTime, dEndDateTime, false, true),
		sStartDateTime = to.getDateInFormat({"date": dStartDateTime}, "hh:mm", to.setting.is24Hour, true),
		sEndDateTime = to.getDateInFormat({"date": dEndDateTime}, "hh:mm", to.setting.is24Hour, true);
	
		var dTempSDT = new Date(dTempStartDate);
		while(!to.__findWhetherDateIsVisibleInCurrentView(dTempSDT, (bIsAllDay || iNumOfHours > 23), dTempStartDate, dTempEndDate))
		{
			dTempSDT.setDate(dTempSDT.getDate() + 1);
			dTempSDT = to.setDateInFormat({"date": dTempSDT}, "START");
		}
		dTempStartDate = new Date(dTempSDT);
	
		var dThisDate = to.setDateInFormat({"date": dTempStartDate}, "START");
	
		for(var iSegIndex = 0; iSegIndex < iNumOfEventElements; iSegIndex++)
		{
			var iWkIndex = to.__getDayIndexInView(dThisDate);
		
			var oSegArgs = {};
			oSegArgs.iNumEvElem = iNumOfEventElements;
			oSegArgs.iId = sId;
			oSegArgs.sId = "Event-"+sId;
			oSegArgs.dStart = dStartDateTime;
			oSegArgs.dEnd = dEndDateTime;
			oSegArgs.dStartView = dTempStartDate;
			oSegArgs.dEndView = dTempEndDate;
			oSegArgs.dThisDate = dThisDate;
			oSegArgs.iEventElem = (iSegIndex + 1);
			oSegArgs.iWkIndex = iWkIndex;
			
			var oSegProperties = to._createAndAddEventSeg(oSegArgs),
			sSegId = "#" + oSegProperties.sId,
			sSegTitle = oSegProperties.sElemTitle,
			iSegTopPos = oSegProperties.iTopPos,
			iSegHeight = oSegProperties.iEventHeight,
			iSegLeftPos = to.tv.fADVDayLftPos[iWkIndex];
		
			if(to.compareDates(to.tv.oDVEdtgEv.dEditingDate, dThisDate) === 0)
				to.tv.oDVEdtgEv.iElemLeft = iSegLeftPos;

			var $oThisSeg = $(to.elem).find(sSegId);
			$oThisSeg.css({"top": iSegTopPos, "height": iSegHeight, "left": iSegLeftPos});
			$oThisSeg.attr("name", oSegProperties.sName);
			$oThisSeg.attr("title", sSegTitle);

			var oEventTooltip, sDateTime;
			oEventTooltip = {};
			sDateTime = to.getEventDateTimeString(dStartDateTime, dEndDateTime, bIsAllDay, "&&");
			var sArrDateTime = sDateTime.split("&&");
			oEventTooltip.title = sSegTitle;
			oEventTooltip.startDateTime = sArrDateTime[0];
			oEventTooltip.endDateTime = sArrDateTime[1];
			$oThisSeg.data("tooltipcontent", oEventTooltip);
		
			if(iSegTopPos < 0)
				 $oThisSeg.find(".cEventLink").css({"margin-top": Math.abs(iSegTopPos)});
			else
				 $oThisSeg.find(".cEventLink").css({"margin-top": 0});
		
			$oThisSeg.find(".cdvEventTime").html(sStartDateTime + "-" + sEndDateTime);
		
			dThisDate = new Date(dThisDate.getTime() + $.CalenStyle.extra.iMS.d);
		}
	},

	_createAndAddEventSeg: function(oSegArgs)
	{
		var to = this;
	
		var iNumOfEventElements = oSegArgs.iNumEvElem,
		iId = oSegArgs.iId,
		sId = oSegArgs.sId,
		dStartDateTime = oSegArgs.dStart,
		dEndDateTime = oSegArgs.dEnd,
		dStartDateTimeView = oSegArgs.dStartView,
		dEndDateTimeView = oSegArgs.dEndView,
		dThisDate = oSegArgs.dThisDate,
		iEventElem = oSegArgs.iEventElem,
		iWkIndex = oSegArgs.iWkIndex,
				
		iTimeSlotTableRowHeight = (($(to.elem).find(".cdvTimeSlotTableRow" + ":eq(0)").outerHeight() + $(to.elem).find(".cdvTimeSlotTableRow" + ":eq(1)").outerHeight()) / 2),
		iEventUnitHeight = iTimeSlotTableRowHeight / to.setting.unitTimeInterval,
		iEventHeight,
	
		oThisDate = to.getDateInFormat({"date": dThisDate}, "object", false, false),
		dStartDateTimeThis, dEndDateTimeThis;
	
		if(to.setting.excludeNonBusinessHours)
		{
			dStartDateTimeThis = to.setDateInFormat({"iDate": {d: oThisDate.d, M: oThisDate.M, y: oThisDate.y, H: to.tv.oBsHours.startTime[0], m: to.tv.oBsHours.startTime[1], s: 0, ms: 0}}, "");
			dEndDateTimeThis = to.setDateInFormat({"iDate": {d: oThisDate.d, M: oThisDate.M, y: oThisDate.y, H: to.tv.oBsHours.endTime[0], m: to.tv.oBsHours.endTime[1], s: 0, ms: 0}}, "");
		}
		else
		{
			dStartDateTimeThis = to.setDateInFormat({"iDate": oThisDate}, "START");
			dEndDateTimeThis = to.setDateInFormat({"iDate": oThisDate}, "END");
		}
	
		var bBeforeDayStart = (to.compareDateTimes(dStartDateTime, dStartDateTimeThis) < 0),
		bAfterDayEnd = (to.compareDateTimes(dEndDateTime, dEndDateTimeThis) > 0),
		
		dStartDateTimeEv = bBeforeDayStart ? dStartDateTimeThis : dStartDateTime,
		dEndDateTimeEv = bAfterDayEnd ? dEndDateTimeThis : dEndDateTime,
		
		iActualHeight = (((dEndDateTimeEv.getTime() - dStartDateTime.getTime()) / $.CalenStyle.extra.iMS.m) * iEventUnitHeight),
		iVisibleHeight = (((dEndDateTimeEv.getTime() - dStartDateTimeEv.getTime()) / $.CalenStyle.extra.iMS.m) * iEventUnitHeight),
		iHeight = iVisibleHeight,
		
		iStartHour = dStartDateTimeEv.getHours(),
		iStartMinute = dStartDateTimeEv.getMinutes(),
		iSlotMinutes = Math.floor(iStartMinute / to.setting.unitTimeInterval) * to.setting.unitTimeInterval,
		sStartTime = to.getNumberStringInFormat(iStartHour, 2, false) + to.getNumberStringInFormat(iSlotMinutes, 2, false),
		iTopPos = $(to.elem).find(".cdvTimeSlotTableRow"+sStartTime).position().top;
		
		if(bBeforeDayStart)
		{
			iHeight = iActualHeight;
			iTopPos -= (iActualHeight - iVisibleHeight);
		}
	
		var sName = sStartTime + "|" + iWkIndex + "|" + iTopPos,
		sElemTitle = dStartDateTime + "\n" + dEndDateTime;
		sId += "-" + iEventElem;
	
		var oEventSeg = new CalEventSeg((iWkIndex + 1), iId, sElemTitle, sId, dStartDateTimeEv, dEndDateTimeEv, 0, 0);
		to.tv.oASmEvSeg.push(oEventSeg);
	
		var oSegProperties = {};
		oSegProperties.sElemTitle = sElemTitle;
		oSegProperties.sId = sId;
		oSegProperties.sName = sName;
		oSegProperties.iTopPos = iTopPos;
		oSegProperties.iEventHeight = iHeight;
	
		return oSegProperties;
	},

	_setOpacityOfEventSeg: function(sId, dEndDateTime)
	{
		var to = this;
	
		var bPassedEvent = (to.compareDates(dEndDateTime, $.CalenStyle.extra.dToday) < 0) ? true : false,
		bHasClass = $(to.elem).find(".Event-"+sId).hasClass("cBlurredEvent");
	
		if(bPassedEvent && !bHasClass)
			$(to.elem).find(".Event-"+sId).addClass("cBlurredEvent");	
		if(!bPassedEvent && bHasClass)
			$(to.elem).find(".Event-"+sId).removeClass("cBlurredEvent");	
	},

	_changeViewPropertiesWhileEditing: function(sWhen, sId)
	{
		var to = this;
	
		var sSelector;
		if(to.compareStrings(to.tv.oDVEdtgEv.type, "cdvEvent"))
			sSelector = ".Event-"+sId;
		else if(to.compareStrings(to.tv.oDVEdtgEv.type, "cdvEventAllDay"))
			sSelector = "#Event-"+sId;
		if(to.compareStrings(sWhen, "BEFORE"))
		{
			if(! $(to.elem).find(sSelector).hasClass("cEditingEvent"))
			{
				$(to.elem).find(sSelector).addClass("cEditingEvent");
				/*
			
				$(to.elem).find(".cEventTooltip").tooltip("close");

				The above line gives an error if bootstrap plugin is included in the webpage as it overrides jQuery Ui tooltip plugin.
				So if you are including Bootstrap it will be better to use bootstrap Tooltip and Popover. 

				*/
			
				if($(to.elem).find("[data-original-title]").length === 0) // if bootstrap toolip or popover plugin is applied
					$(to.elem).find(".cEventTooltip").tooltip("close");
			}
		}
		else if(to.compareStrings(sWhen, "AFTER"))
			$(to.elem).find(sSelector).removeClass("cEditingEvent");
	},

	//------------------------------- Event Segment Manipulation End -------------------------------

	__updateDetailViewTable: function()
	{
		var to = this;
		
		to._getTimeSlotsArrayForCurrentView();
	
		if(to.compareStrings(to.tv.sLoadType, "Prev"))
			to.tv.dLoadDt = to.tv.dAVDt[0];
		else if(to.compareStrings(to.tv.sLoadType, "Next"))
			to.tv.dLoadDt = to.tv.dAVDt[(to.tv.dAVDt.length - 1)];
	
		var sTempStr = "", iDateIndex, sDVDaysClass;
		//---------------------------------------------------------------------------------------------
		sTempStr += "<tr class='cdvDetailTableRow1'>";
		sTempStr += "<td  class='cdvDetailTableColumnTime'>";
		sTempStr += "<div class='cdvCellWeekNumberLabel'></div>";
		sTempStr += "<div class='cdvCellWeekNumber'></div>";
		sTempStr += "</td>";
		for(iDateIndex = 0; iDateIndex < to.tv.iNoVDayDis; iDateIndex++)
		{
			var sTempId = "cdvCellDay"+iDateIndex;
			sDVDaysClass = "";
			if(iDateIndex === (to.tv.iNoVDayDis - 1))
				sDVDaysClass += " cdvLastColumn";
			sTempStr += "<td id='" + sTempId + "' class='cdvTableColumns "+sDVDaysClass+"'>";
			sTempStr += "&nbsp;";
			sTempStr += "</td>";
		}
		if(iScrollbarWidth > 0)
			sTempStr += "<td class='cdvDetailTableScroll'>&nbsp;</td>";
		sTempStr += "</tr>";
	
		//---------------------------------------------------------------------------------------------
	
		sTempStr += "<tr class='cdvDetailTableRow2'>";
		sTempStr += "<td class='cdvDetailTableColumnTime'> &nbsp; </td>";
		for(iDateIndex = 0; iDateIndex < to.tv.iNoVDayDis; iDateIndex++)
		{
			var sDVDaysId = "cdvAllDayColumn"+iDateIndex;
			sDVDaysClass = "";
			if(iDateIndex === (to.tv.iNoVDayDis - 1))
				sDVDaysClass += " cdvLastColumn";
			sTempStr += "<td id='"+sDVDaysId+"' class='cdvAllDayColumns "+sDVDaysClass+"' title='"+to.tv.dAVDt[iDateIndex]+"'> &nbsp; </td>";
		}
		if(iScrollbarWidth > 0)
			sTempStr += "<td class='cdvDetailTableScroll'>&nbsp;</td>";
		sTempStr += "</tr>";
	
		//---------------------------------------------------------------------------------------------
	
		sTempStr += "<tr class='cdvDetailTableRow3'>";
		sTempStr += "<td class='cdvDetailTableColumnTime'> &nbsp; </td>";
		for(iDateIndex = 0; iDateIndex < to.tv.iNoVDayDis; iDateIndex++)
		{
			sDVDaysClass = "cdvDetailTableColumn"+iDateIndex;
			if(iDateIndex == (to.tv.iNoVDayDis - 1))
				sDVDaysClass += " cdvLastColumn";
			sTempStr += "<td class='cdvTableColumns "+sDVDaysClass+"'> &nbsp; </td>";		
		}
		if(iScrollbarWidth > 0)
			sTempStr += "<td class='cdvDetailTableScroll'>&nbsp;</td>";
		sTempStr += "</tr>";
	
		//---------------------------------------------------------------------------------------------
		$(to.elem).find(".cdvDetailTableMain").html(sTempStr);
		//----------------------------------------------------------------------------------------------
	
		sTempStr = "";
		sTempStr += "<span class='cdvCellHeaderAllDay'>"+to.setting.miscStrings.allDay+"</span>";
		$(to.elem).find(".cdvContRow2Main").html(sTempStr);
	
		//------------------------------------------------------------------------------
	
		to._setDateStringsInDetailView();
	
		//------------------------------------------------------------------------------		
		to._addTimeSlotTable();	
		//------------------------------------------------------------------------------
	
		sTempStr = "";
		sTempStr += "<div class='cdvContRow3Events'></div>";
		$(to.elem).find(".cdvContRow3Main").append(sTempStr);
	
		//------------------------------------------------------------------------------
	
		to._takeActionOnTimeSlotTableClick();
	},

	__addEventsInDetailView: function(sEventTypeToAdd)
	{
		var to = this;
	
		if((to.compareStrings(sEventTypeToAdd, "AllDay") || to.compareStrings(sEventTypeToAdd, "Both")) && $(to.elem).find(".cdvContRow2Main").length > 0)
			$(to.elem).find(".cdvContRow2Main").html("");
		if((to.compareStrings(sEventTypeToAdd, "Small") || to.compareStrings(sEventTypeToAdd, "Both")) && $(to.elem).find(".cdvContRow3Events").length > 0)
			$(to.elem).find(".cdvContRow3Events").html("");
	
		var oArrTempEvents = to.getArrayOfEventsForView(to.tv.dVDSDt, to.tv.dVDEDt);
	
		if(to.compareStrings(sEventTypeToAdd, "Small") || to.compareStrings(sEventTypeToAdd, "Both"))
			to.tv.oASmEvSeg = [];
		if(to.compareStrings(sEventTypeToAdd, "AllDay") || to.compareStrings(sEventTypeToAdd, "Both"))
			to.tv.oAADEvSeg = [];
	
		if(oArrTempEvents.length > 0)
		{
			var oArrTempTopPos = [];
		
			for(var iEventIndex = 0; iEventIndex < oArrTempEvents.length; iEventIndex++)
			{
				var oEvent = oArrTempEvents[iEventIndex],
			
				dStartDateTime = null, dEndDateTime = null,
				bIsAllDay = 0,
				sTitle = "", sDesc = "", sType = "", sURL = ""; 
			
				if(oEvent.start !== null)
					dStartDateTime = oEvent.start;
			
				if(oEvent.end !== null)
					dEndDateTime = oEvent.end;
			
				if(oEvent.isAllDay !== null)
					bIsAllDay = oEvent.isAllDay;
			
				if(oEvent.title !== null)
					sTitle = oEvent.title;
			
				if(oEvent.desc !== null)
					sDesc = oEvent.desc;
			
				if(oEvent.type !== null)
					sType = oEvent.type;
			
				if(oEvent.url !== null)
					sURL = oEvent.url;
			
				var dArrTempDates = to.__getStartAndEndDatesOfEventForView(bIsAllDay, dStartDateTime, dEndDateTime),
				dTempStartDate = dArrTempDates[0],
				dTempEndDate = dArrTempDates[1],
			
				iNumOfDaysOfEvent = to.getNumberOfDaysOfEvent(bIsAllDay, dStartDateTime, dEndDateTime, false, false, true),
				iNumOfEventElements = to._getNumberOfDaysOfEventForWeek(bIsAllDay, dStartDateTime, dEndDateTime, false, true),
				iTotalNumberOfHours = to.__getNumberOfHoursOfEvent(bIsAllDay, dStartDateTime, dEndDateTime);
			
				var sId;
				if(iNumOfEventElements > 0)
				{
					var dTempSDT = new Date(dTempStartDate);
					while(!to.__findWhetherDateIsVisibleInCurrentView(dTempSDT, (bIsAllDay || iTotalNumberOfHours > 23), dTempStartDate, dTempEndDate))
					{
						dTempSDT.setDate(dTempSDT.getDate() + 1);
						dTempSDT = to.setDateInFormat({"date": dTempSDT}, "START");
					}
					dTempStartDate = new Date(dTempSDT);
					var dThisDate = to.setDateInFormat({"date": dTempStartDate}, "START"),
					iThisDate = dThisDate.getTime();
				
					//-------------------------------------------------------------------------------------------
				
					var sEventColor = oEvent.color;
					sEventColor = (to.compareStrings(sEventColor, "") || to.compareStrings(sEventColor, "transparent")) ? "transparent" : "#" + sEventColor;
					var sEventBorderColor = oEvent.borderColor || to.setting.borderColor;
					sEventBorderColor = (to.compareStrings(sEventBorderColor, "") || to.compareStrings(sEventBorderColor, "transparent")) ? "transparent" : "#" + sEventBorderColor;
					var sEventTextColor = oEvent.textColor || to.setting.textColor;
					sEventTextColor = (to.compareStrings(sEventTextColor, "") || to.compareStrings(sEventTextColor, "transparent")) ? to.setting.textColor : "#" + sEventTextColor;
				
					var sStyle = "background: " + sEventColor + "; border-color: " + sEventBorderColor + "; color: " + sEventTextColor + "; ";
					if(sEventBorderColor === "transparent")
						sStyle += "border-width: 0px; ";
				
					var sIcon = oEvent.icon || to.setting.eventIcon,
					sEventIconStyle = "color: " + sEventTextColor + "; ",
				
					sEventTitle = sTitle,
					sEventContent = sDesc,
				
					iWkIndex = to.__getDayIndexInView(dThisDate),
					iLeftPos = to.tv.fADVDayLftPos[iWkIndex],
					iTopPos = 0,
					iEventWidth = to.tv.fDVDayWth,
					iEventHeight = 0,
					sEventClass, oEventTooltip, sDateTime, sTempStr, sIdElem;
				
					//-------------------------------------------------------------------------------------------
				
					if(bIsAllDay === 1 || iTotalNumberOfHours > 23)
					{
						if(to.compareStrings(sEventTypeToAdd, "AllDay") || to.compareStrings(sEventTypeToAdd, "Both"))
						{
							sId = "Event-"+oEvent.calEventId;
						
							var bElementExists = $(to.elem).find("#"+sId).length > 0,
							bElementHasStartDate = false;
							if(bElementExists)
							{
								var dElemStartDate = new Date($(to.elem).find("#"+sId).data("startdate"));
								bElementHasStartDate = to.compareDates(dElemStartDate, dTempStartDate) !== 0;
							}
							if((bElementExists && bElementHasStartDate) || !bElementExists)
							{
								var iWidthUnits = iNumOfEventElements,
							
								bCompStartDates = to.compareDates(dStartDateTime, dTempStartDate),
								bVSDCompESD = to.compareDates(to.tv.dVDSDt, dStartDateTime),
								bVEDCompESD = to.compareDates(to.tv.dVDEDt, dStartDateTime),
								isFirstSegment = (bVSDCompESD <= 0) && (bVEDCompESD >= 0),
								bVSDCompEED = to.compareDates(to.tv.dVDSDt, dEndDateTime),
								bVEDCompEED = to.compareDates(to.tv.dVDEDt, dEndDateTime),
								isLastSegment = (bVSDCompEED <= 0) && (bVEDCompEED >= 0),
								bCompEndDates = to.compareDates(dEndDateTime, dTempEndDate),
							
								iNewTopIndex = 0, oArrTemp;
								if(oArrTempTopPos.length === 0)
								{
									iNewTopIndex = 1;
									oArrTemp = [];
									oArrTemp.push([dTempStartDate, dTempEndDate]);
									oArrTempTopPos.push([iNewTopIndex, oArrTemp]);
								}
								else
								{
									var iMaxTopIndex = 0;					
									for(var iTempIndex = 0; iTempIndex < oArrTempTopPos.length; iTempIndex++)
									{
										oArrTemp = oArrTempTopPos[iTempIndex];
										iArrTempTopIndex = oArrTemp[0];
									
										if(iArrTempTopIndex > iMaxTopIndex)
											iMaxTopIndex = iArrTempTopIndex;
									
										var oArrTempDates = oArrTemp[1];
									
										var bSpaceAvailableForSegment = false;
										for(var iInnerIndex = 0; iInnerIndex < oArrTempDates.length; iInnerIndex++)
										{
											var oArrTempSEDates = oArrTempDates[iInnerIndex];
										 	if(to.compareDates(dTempStartDate, oArrTempSEDates[1]) <= 0)
										 	{
												bSpaceAvailableForSegment = false;
												break;
											}
											else
												bSpaceAvailableForSegment = true;
										}
									
										if(bSpaceAvailableForSegment)
										{
											iNewTopIndex = iArrTempTopIndex;
											oArrTempDates.push([dTempStartDate, dTempEndDate]);
											break;
										}
									}
								
									if(iNewTopIndex === 0)
									{
										iNewTopIndex = iMaxTopIndex + 1;
										oArrTemp = [];
										oArrTemp.push([dTempStartDate, dTempEndDate]);
										oArrTempTopPos.push([iNewTopIndex, oArrTemp]);
									}
								}
								to.tv.oAADEvSeg.push([sId, iWidthUnits, iWkIndex, iNewTopIndex]);
							
								sEventClass = "cdvEventAllDay ";
								if(to.compareDates(dEndDateTime, $.CalenStyle.extra.dToday) < 0)
									sEventClass += "cBlurredEvent" +" ";
								if(to.setting.isTooltipInDetailView)
									sEventClass += " cEventTooltip";
							
								sTempStr = "";

								sTempStr = "<span id='" + sId + "' class='" + sEventClass + "' title='' style='" + sStyle + "' data-startdate='" + dTempStartDate + "'>";
							
								sTempStr += "<a class='cEventLink' style='color: " + sEventTextColor+ ";'>";
							
								if(bCompStartDates !== 0)
									sTempStr += "<span class='cPartialEvent cPartialEventLeft'></span>";
								if(!bIsAllDay && (iNumOfDaysOfEvent > 1 && isFirstSegment))
									sTempStr += "<span class='cdvEventTimeLeft'>" + to.getDateInFormat({"date": dStartDateTime}, "hh:mmsm", to.setting.is24Hour, true) + "</span>";
							
								if(!to.setting.hideEventIcon)
									sTempStr += "<span class='cdvEventIcon " +sIcon+"' style='"+sEventIconStyle+"'></span>";
							
								sTempStr += "<span class='" + "cdvEventTitle" + "'>" + sTitle + "</span>";
							
								if(!bIsAllDay && (iNumOfDaysOfEvent > 1 && isLastSegment))
									sTempStr += "<span class='cdvEventTimeRight'>" + to.getDateInFormat({"date": dEndDateTime}, "hh:mmsm", to.setting.is24Hour, true) + "</span>";
							
								if(bCompEndDates !== 0)
									sTempStr += "<span class='cPartialEvent cPartialEventRight'></span>";
							
								sTempStr += "</a>";
							
								sTempStr += "</span>";
							
								$(to.elem).find(".cdvContRow2Main").append(sTempStr);

								sIdElem = "#"+sId;
								oEventTooltip = {};
								sDateTime = to.getEventDateTimeString(dStartDateTime, dEndDateTime, bIsAllDay, "&&");
								var sArrDateTime = sDateTime.split("&&");
								oEventTooltip.title = sTitle;
								oEventTooltip.startDateTime = sArrDateTime[0];
								oEventTooltip.endDateTime = sArrDateTime[1];
								$(to.elem).find(sIdElem).data("tooltipcontent", oEventTooltip);
							
								if((sURL !== "" && sURL !== null && sURL !== undefined) || to.setting.eventClicked)
								{
									$(to.elem).find(sIdElem+" .cEventLink").on($.CalenStyle.extra.sClickHandler, {"url": sURL, "eventId": oEvent.calEventId, "eventElemSelector": sIdElem, prEventType: "AllDay", "view": "DetailView", "pluginId": to.tv.pluginId}, to.__bindClick);
								}
							}
						}
					}
					else
					{
						if(to.compareStrings(sEventTypeToAdd, "Small") || to.compareStrings(sEventTypeToAdd, "Both"))
						{
							var sClass = "Event-"+oEvent.calEventId;
							if($(to.elem).find("."+sClass).length === 0)
							{
								for(var iEventElem = 1; iEventElem <= iNumOfEventElements; iEventElem++)
								{
									sId = sClass;
								
									iWkIndex = to.__getDayIndexInView(dThisDate);
									iLeftPos = to.tv.fADVDayLftPos[iWkIndex];
								
									sEventClass = "cdvEvent ";
									if(to.compareDates(dEndDateTime, $.CalenStyle.extra.dToday) < 0)
										sEventClass += "cBlurredEvent ";
									sEventClass += sId;
									if(to.setting.isTooltipInDetailView)
										sEventClass += " cEventTooltip";
								
									var oSegArgs = {};
									oSegArgs.iNumEvElem = iNumOfEventElements;
									oSegArgs.iId = oEvent.calEventId;
									oSegArgs.sId = sId;
									oSegArgs.dStart = dStartDateTime;
									oSegArgs.dEnd = dEndDateTime;
									oSegArgs.dTempStart = dTempStartDate;
									oSegArgs.dTempEnd = dTempEndDate;
									oSegArgs.dThisDate = dThisDate;
									oSegArgs.iEventElem = iEventElem;
									oSegArgs.iWkIndex = iWkIndex;
								
									var oSegProperties = to._createAndAddEventSeg(oSegArgs);
								
									var sElemTitle = sTitle + "\n" + oSegProperties.sElemTitle;
									var sName = oSegProperties.sName;
									sId = oSegProperties.sId;
									iTopPos = oSegProperties.iTopPos;
									iEventHeight = oSegProperties.iEventHeight;
								
									var sEventTime = to.getDateInFormat({"date": dStartDateTime}, "hh:mmsm", to.setting.is24Hour, true) + " - " + to.getDateInFormat({"date": dEndDateTime}, "hh:mmsm", to.setting.is24Hour, true);
								
									sStyle += "left: " + 0 + "px; top: " + 0 + "px; height: " + parseInt(iEventHeight) + "px; width: " + 10 + "px;";
								
									sTempStr = "";
									sTempStr += "<span id='" + sId + "' class='" + sEventClass + "' title='' style='" + sStyle + "' name='" + sName + "' title=''>";
									sTempStr += "<a class='cEventLink' style='color: " + sEventTextColor+ ";'>";											
									if(!to.setting.hideEventIcon)
										sTempStr += "<span class='cdvEventIcon "+sIcon+"' style='"+sEventIconStyle +"' align='left'></span>";
									sTempStr += "<div class='cdvEventDetails'>";
									sTempStr += "<div class='cdvEventTime'>" + sEventTime + "</div>";
									sTempStr += "<div class='" + "cdvEventTitle" + "'>" + sTitle + "</div>";
									sTempStr += "</div>";
									sTempStr += "</a>";
									sTempStr += "</span>";
								
									$(to.elem).find(".cdvContRow3Main .cdvContRow3Events").append(sTempStr);
								
									sIdElem = "#"+sId;
									oEventTooltip = {};
									sDateTime = to.getEventDateTimeString(dStartDateTime, dEndDateTime, bIsAllDay, "&&");
									var sArrDateTime = sDateTime.split("&&");
									oEventTooltip.title = sTitle;
									oEventTooltip.startDateTime = sArrDateTime[0];
									oEventTooltip.endDateTime = sArrDateTime[1];
									$(to.elem).find(sIdElem).data("tooltipcontent", oEventTooltip);

									iThisDate = iThisDate + $.CalenStyle.extra.iMS.d;
									dThisDate.setTime(iThisDate);
								
									if((sURL !== "" && sURL !== null && sURL !== undefined) || to.setting.eventClicked)
									{
										$(to.elem).find(sIdElem+" .cEventLink").on($.CalenStyle.extra.sClickHandler, {"url": sURL, "eventId": oEvent.calEventId, "eventElemSelector": sIdElem, prEventType: "Small", "view": "DetailView", "pluginId": to.tv.pluginId}, to.__bindClick);
									}
								}
							}
						}
					}
				}
			}
		
			if(to.compareStrings(sEventTypeToAdd, "AllDay") || to.compareStrings(sEventTypeToAdd, "Both"))
				to._makeEventEditableInDetailView(".cdvEventAllDay");
			if(to.compareStrings(sEventTypeToAdd, "Small") || to.compareStrings(sEventTypeToAdd, "Both"))
			{
				to._setPropertiesOfEventSeg();
				to._makeEventEditableInDetailView(".cdvEvent");
			}
		
			if(to.setting.isTooltipInDetailView)
				to._addTooltipInDetailView(".cEventTooltip");
		
			if(to.setting.eventsAddedInView)
				to.setting.eventsAddedInView.call(to, to.setting.visibleView, ".cdvEvent, .cdvEventAllDay");
		}
		else
			console.log("to.__addEventsInDetailView - No Events");
	},

	_takeActionOnTimeSlotTableClick: function()
	{
		var to = this;
	
		$(to.elem).find(".calendarCont").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			if(!$(to.elem).find(".cdvEvent").hasClass("cEditingEvent") && (to.setting.dayClicked || to.setting.cellClicked))
			{
				var pClickedAt = {};
				pClickedAt.x = e.pageX || e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
				pClickedAt.y = e.pageY || e.originalEvent.touches[0].pageY || e.originalEvent.changedTouches[0].pageY;
				var oArrElemsAtPt = to.__getElementsAtPoint(pClickedAt.x, pClickedAt.y);
				var dSelectedDateTime, iHours = 0, iMinutes = 0;
				var bElemAllDay, bElemSlot, bElemColumn;
				for(var iTempIndex = 0; iTempIndex < oArrElemsAtPt.length; iTempIndex++)
				{
					var $oTempElem = $(oArrElemsAtPt[iTempIndex]),
					bCDVAllDayColumns = $oTempElem.hasClass("cdvAllDayColumns"),
					bCDVTableColumns = $oTempElem.hasClass("cdvTableColumns"),
					bCDVSlotTableRow = $oTempElem.hasClass("cdvTimeSlotTableRow"),
					sDate;
					
					if(bCDVAllDayColumns)
					{
						sDate = $oTempElem.attr("title");
						dSelectedDateTime = new Date(sDate);
						bElemAllDay = true;
					}
					if(bCDVTableColumns)
					{
						sDate = $oTempElem.attr("title");
						dSelectedDateTime = new Date(sDate);
						bElemColumn = true;
					}
					if(bCDVSlotTableRow)
					{
						var sTime = $oTempElem.attr("class");
						sTime = sTime.replace(/cdvTimeSlotTableRow/g, "");
						sTime = sTime.replace(/ /g, "");
						iHours = parseInt(sTime.substr(0, 2));
						iMinutes = parseInt(sTime.substr(2, 2));
						bElemSlot = true;							
					}
				}
			
				if(bElemAllDay && to.setting.dayClicked)
					to.setting.dayClicked.call(to, dSelectedDateTime, pClickedAt);
				else if(bElemColumn && bElemSlot && to.setting.cellClicked)
				{
					dSelectedDateTime.setHours(iHours);
					dSelectedDateTime.setMinutes(iMinutes);
					to.setting.cellClicked.call(to, dSelectedDateTime, pClickedAt);
				}
			}
		
			e.stopPropagation();
			to._makeEventNonEditableInDetailView();
			to._callCommonEvents();
		});
	},

	_makeEventNonEditableInDetailView: function()
	{
		var to = this;
	
		if(to.tv.oEvEdt !== null)
		{
			$("body").css("cursor", "default");
		
			var sId = to.tv.oEvEdt.calEventId,
			dEndDateTime = to.tv.oEvEdt.end;
		
			to._changeViewPropertiesWhileEditing("AFTER", sId);
			to._setOpacityOfEventSeg(sId, dEndDateTime);
		
			if(to.compareStrings(to.tv.oDVEdtgEv.type, "cdvEvent"))
			{
				to._adjustEventsInDetailView();
				if($(to.elem).find(".Event-"+sId).hasClass("ui-resizable"))
					$(to.elem).find(".Event-"+sId).resizable("destroy"); // make event non-resizable
			}
			else
				to._adjustAllDayEventsInDetailView();
		
			to.tv.oEvEdt = null;
			to.tv.oDVEdtgEv = {};
		}
	},

	_makeEventEditableInDetailView: function(sClass)
	{
		var to = this;
	
		$(to.elem).find(sClass).on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
		});
	
		var sEditableClass, sDraggableClass, sResizableClass;			
		if(to.compareStrings(sClass, ".cdvEvent"))
		{
			sEditableClass = "EventEditable";
			sDraggableClass = "EventDraggable";
			sResizableClass = "EventResizable";
		}
		else if(to.compareStrings(sClass, ".cdvEventAllDay"))
		{
			sEditableClass = "EventAllDayEditable";
			sDraggableClass = "EventAllDayDraggable";
			sResizableClass = "EventAllDayResizable";
		}
	
		var oArrElements = $(to.elem).find(sClass);
		for(var iElemIndex = 0; iElemIndex < oArrElements.length; iElemIndex++)
		{
			var oElem = oArrElements[iElemIndex],
			sElemId = $(oElem).attr("id"),
			sArrElemId = sElemId.split("-"),
			sEventId = sArrElemId[1],
			oEvent = to.getEventWithId(sEventId);
		
			var sEventClass = "";
			if(oEvent.isDragNDropInDetailView || oEvent.isResizeInDetailView)
			{
				sEventClass += sEditableClass;					
				if(oEvent.isDragNDropInDetailView)
					sEventClass += (" "+sDraggableClass+" cDragNDrop");					
				if(oEvent.isResizeInDetailView)
					sEventClass += (" "+sResizableClass);
			}
		
			$(oElem).addClass(sEventClass);
		}
	
		if(to.setting.isDragNDropInDetailView)
			to._makeEventDraggableInDetailView(sClass, sDraggableClass);
		else
		{
			$(".cdvEvent").removeClass("EventDraggable cDragNDrop");
			$(".cdvEventAllDay").removeClass("EventAllDayDraggable cDragNDrop");
		}
	
		$(to.elem).find("." +sEditableClass).each(function()
		{
			var bMouseDown = false;
		
			var iMouseStartX, iMouseStartY;
			var iMouseEndX, iMouseEndY;
		
			var iRadius = 8;
			var iMinX, iMinY, iMaxX, iMaxY;
			var iTouchStartTime;
		
			var bChangedWidth = false;
		
			$(this).on(
			{
				mousedown: function(ev)
				{
					if(to.compareStrings(sClass, ".cdvEvent"))
					{
						if(to.tv.bDVScrlg)
							return false;
					}
				
					iTouchStartTime = ev.timeStamp;
					bMouseDown = true;
				
					iMouseStartX = ev.pageX;
					iMouseStartY = ev.pageY;
				
					iMinX = iMouseStartX - iRadius;
					iMinY = iMouseStartY - iRadius;
					iMaxX = iMouseStartX + iRadius;
					iMaxY = iMouseStartY + iRadius;
				
					bChangedWidth= false;
					setTimeout(function()
					{
						if(bMouseDown)
						{
							var iMouseHoldX = ev.pageX;
							var iMouseHoldY = ev.pageY;
					
							if(to.tv.oEvEdt === null)
							{
								var bSingleTouchX1 = (iMinX <= iMouseHoldX && iMouseHoldX <= iMaxX) ? true : false;
								var bSingleTouchY1 = (iMinY <= iMouseHoldY && iMouseHoldY <= iMaxY) ? true : false;
							
								if(bSingleTouchX1 && bSingleTouchY1)
									to.tv.bEvLgPresd = true;
							}
						
							if(to.tv.bEvLgPresd)
							{
								bMouseDown = false;
								if(to.tv.oEvEdt === null)
								{
									var oThisElem = ev.target;
									var bHasClass = $(to.elem).find(oThisElem).hasClass(sEditableClass);
									while(! bHasClass)
									{
										oThisElem = $(to.elem).find(oThisElem).parent();
										bHasClass = $(to.elem).find(oThisElem).hasClass(sEditableClass);
										if($(to.elem).find(oThisElem).attr("class") === undefined)
											break;
									}
								
									var sElemId = $(to.elem).find(oThisElem).attr("id");
									if(to.compareStrings(sClass, ".cdvEvent"))
										bChangedWidth = to._setSmallEventBeingEditedInDetailView(bChangedWidth, sElemId);
									else if(to.compareStrings(sClass, ".cdvEventAllDay"))
										to._setAllDayEventBeingEditedInDetailView(sElemId);
								}
							}
						}
					}, 80);							
				},
			
				mousemove: function(ev)
				{
					if(to.compareStrings(sClass, ".cdvEvent"))
					{
						if(to.tv.bDVScrlg)
							return false;
					}
				
					if(bMouseDown)
					{
						iMouseEndX = ev.pageX;
						iMouseEndY = ev.pageY;
				
						if(to.tv.oEvEdt === null)
						{
							var bSingleTouchX1 = (iMinX <= iMouseEndX && iMouseEndX <= iMaxX) ? true : false;
							var bSingleTouchY1 = (iMinY <= iMouseEndY && iMouseEndY <= iMaxY) ? true : false;
						
							if(bSingleTouchX1 && bSingleTouchY1)
							{
								var iTouchEndTime = ev.timeStamp;
								if((iTouchEndTime - iTouchStartTime) > 80)
									to.tv.bEvLgPresd = true;
							}
						}
				
						if(to.tv.bEvLgPresd)
						{
							var bMouseMovementX = (Math.abs(iMouseEndX - iMouseStartX) > 5) ? true : false;
							var bMouseMovementY = (Math.abs(iMouseEndY - iMouseStartY) > 1) ? true : false;
						
							if(bMouseDown && (bMouseMovementX || bMouseMovementY))
							{
								bMouseDown = false;
								if(to.tv.oEvEdt === null)
								{
									var oThisElem = ev.target;
									var bHasClass = $(to.elem).find(oThisElem).hasClass(sEditableClass);
									while(! bHasClass)
									{
										oThisElem = $(to.elem).find(oThisElem).parent();
										bHasClass = $(to.elem).find(oThisElem).hasClass(sEditableClass);
										if($(to.elem).find(oThisElem).attr("class") === undefined)
											break;
									}
								
									var sElemId = $(to.elem).find(oThisElem).attr("id");
									if(to.compareStrings(sClass, ".cdvEvent"))
										bChangedWidth = to._setSmallEventBeingEditedInDetailView(bChangedWidth, sElemId);
									else if(to.compareStrings(sClass, ".cdvEventAllDay"))
										to._setAllDayEventBeingEditedInDetailView(sElemId);
								}
							}
						}
					}
				},
				
				mouseup: function()
				{
					bMouseDown = false;
				}
				
			});
		});
	},

	_setSmallEventBeingEditedInDetailView: function(bChangedWidth, sElemId)
	{
		var to = this;
	
		var sElemDOMId = "#"+sElemId,
	
		iSlotTableCellHeight = (($(to.elem).find(".cdvTimeSlotTableRow" + ":eq(0)").outerHeight() + $(to.elem).find(".cdvTimeSlotTableRow" + ":eq(1)").outerHeight()) / 2),
		iEventWidth = $(to.elem).find(".cdvTableColumns").width() - 5,
		iElemPosLeft = $(to.elem).find(sElemDOMId).position().left,
		iElemPosLeftNew = iElemPosLeft,
		iElemWidth = $(to.elem).find(sElemDOMId).width(),
	
		dEditingDate = to._getDateBasedOnLeftPosition(iElemPosLeft),
	
		sArrElemId = sElemId.split("-"),
		sEventId = sArrElemId[1],
		iSegIndex = sArrElemId[2],
		sEventClass = ".Event-"+sEventId;
	
		if(!bChangedWidth)
		{
			iElemPosLeftNew = to._getLeftPositionOfEventSeg(iElemPosLeft);
			$(to.elem).find(".Event-"+sEventId).css({"width": iEventWidth});
		
			var oThisEvent = to.getEventWithId(sEventId),
			dDragStartDate = oThisEvent.start,
			dDragEndDate = oThisEvent.end,
			bIsAllDay = oThisEvent.isAllDay,
		
			dArrTempDates = to.__getStartAndEndDatesOfEventForView(bIsAllDay, dDragStartDate, dDragEndDate),
			dTempStartDate = dArrTempDates[0],
			dTempEndDate = dArrTempDates[1];
		
			$(to.elem).find(sElemDOMId).css({"left": iElemPosLeftNew});
		
			var bCompStartDate = to.compareDates(dEditingDate, dTempStartDate),
			bCompEndDate = to.compareDates(dEditingDate, dTempEndDate),
			bCompStartOrEndDate = ((bCompStartDate === 0) || (bCompEndDate === 0));
		
			if($(to.elem).find(".Event-"+sEventId).length > 1 && bCompStartOrEndDate)
			{
				var dThisDate, sOtherEventId;
				if(bCompStartDate === 0)
				{
					dThisDate = dTempEndDate;
					sOtherEventId = "#Event-"+sEventId+"-2";
				}
				else if(bCompEndDate === 0)
				{
					dThisDate = dTempStartDate;
					sOtherEventId = "#Event-"+sEventId+"-1";
				}
			
				var iWkIndex = to.__getDayIndexInView(dThisDate),
				iThisLeftPos = to.tv.fADVDayLftPos[iWkIndex];
				$(to.elem).find(sOtherEventId).css({"left": iThisLeftPos});
			}
		
			bChangedWidth = true;	
			to.tv.oEvEdt = to.getEventWithId(sEventId);
		
			to.tv.oDVEdtgEv = {};	
			to.tv.oDVEdtgEv.type = "cdvEvent";
			to.tv.oDVEdtgEv.sEventId = sEventId;		
		}
	
		to.tv.oDVEdtgEv.iSegIndex = iSegIndex;
		to.tv.oDVEdtgEv.dEditingDate = dEditingDate;
		to.tv.oDVEdtgEv.iElemLeft = iElemPosLeftNew;	
	
		to._changeViewPropertiesWhileEditing("BEFORE", sEventId);
	
		if(to.setting.isResizeInDetailView && to.tv.oEvEdt !== null)
		{
			if(to.tv.oEvEdt.isResizeInDetailView)
				to._makeEventResizableInDetailView(sEventClass);
		}		
		return bChangedWidth;
	},

	_setAllDayEventBeingEditedInDetailView: function(sElemId)
	{
		var to = this;
	
		var sEventId = sElemId.split("-")[1];
		to.tv.oEvEdt = to.getEventWithId(sEventId);
	
		to.tv.oDVEdtgEv = {};
		to.tv.oDVEdtgEv.type = "cdvEventAllDay";
		to.tv.oDVEdtgEv.sEventId = sEventId;	
	
		to._changeViewPropertiesWhileEditing("BEFORE", sEventId);
	},

	_makeEventDraggableInDetailView: function(sClass, sDraggableClass)
	{
		var to = this;
	
		var sScope;
		if(to.compareStrings(sClass, ".cdvEvent"))
			sScope = "Events";
		else if(to.compareStrings(sClass, ".cdvEventAllDay"))
			sScope = "AllDayEvents";

		var bCanDrag = false,
		iEventHeight, iEventWidth, iColumn1Width,
		iCalendarLeft, iCalendarMarginLeft, iLeft, iX1, iX2,
		iCalendarTop, iCalendarMarginTop, iY1, iY2,
		elemDragged, sElemId, sArrElemId, sEventId, iSegIndex;
	
		if(to.compareStrings(sClass, ".cdvEvent"))
		{
			var iDVTableColumnWidth = $(to.elem).find(".cdvTableColumns").width() - 5,
			iTimeSlotWidth = iDVTableColumnWidth + 6,
			iTimeSlotHeight = (($(to.elem).find(".cdvTimeSlotTableRow" + ":eq(0)").outerHeight() + $(to.elem).find(".cdvTimeSlotTableRow" + ":eq(1)").outerHeight()) / 2),
		
			iMoveLimitX = Math.round(iTimeSlotWidth / 2),
			iMoveLimitY = Math.round(iTimeSlotHeight / 2),
		
			iStartPosX, iStartPosY, iPrevPosX, iPrevPosY,
			iPrevSnapPosX, iPrevSnapPosY;

			iEventWidth = iDVTableColumnWidth;
		
			/* -----------------
		
			MouseDown and MouseMove events are just used to change the style of an element when user has started dragging.
			Position properties of an element could not be changed in jQuery Draggable so mousedown and mousemove events are used. 
		
			------------------- */
		
			iCalendarMarginLeft = $(to.elem).css("margin-left");
			iCalendarMarginLeft = parseInt(iCalendarMarginLeft.replace("px", ""));
		
			iColumn1Width = $(to.elem).find(".cdvDetailTableColumnTime").width();
			iX1 = $(to.elem).find(".cdvContRow3Events").position().left + iCalendarMarginLeft + iColumn1Width;
			iX2 = iX1 + ($(to.elem).find(".cdvContRow3Events").width() - iColumn1Width);
			iY2 = 1440;
			iY1 = - 1440;
		
			var $oOtherSeg, sOtherSegId, sThisSegId,
			iEventMidPoint, iDragStartDateMS, iDragEndDateMS,
			dArrTempDates, dTempStartDate, dTempEndDate,
			iPageX, iPageY,
			dDragStartDate, dDragEndDate, bIsAllDay;

			$(to.elem).find("."+sDraggableClass).draggable(
			{
				zIndex: 10,
				scope: sScope,
				grid: [iTimeSlotWidth, iTimeSlotHeight],
				scroll: false,
				containment: [iX1, iY1, iX2, iY2],
				delay: 300,
				cursor: "move",
			
				start: function(event, ui)
				{
					if(to.tv.bDVResEv || to.tv.bDVScrlg)
						return false;
				
					elemDragged = this;
					sElemId = $(to.elem).find(elemDragged).attr("id");
					sArrElemId = sElemId.split("-");
					sEventId = sArrElemId[1];
					iSegIndex = sArrElemId[2];
				
					bCanDrag = ((to.tv.oEvEdt !== null) && (to.tv.oDVEdtgEv.sEventId === sEventId)) ? true : false;
					if(bCanDrag)
					{
						to.tv.bDVDrgEv = true;
					
						var oThisEvent = to.getEventWithId(sEventId);
						dDragStartDate = oThisEvent.start;
						dDragEndDate = oThisEvent.end;
						bIsAllDay = oThisEvent.isAllDay;
					
						dArrTempDates = to.__getStartAndEndDatesOfEventForView(bIsAllDay, dDragStartDate, dDragEndDate);
						dTempStartDate = dArrTempDates[0];
						dTempEndDate = dArrTempDates[1];
					
						iStartPosX = ui.position.left;
						iPrevPosX = iStartPosX;
						iPrevSnapPosX = iStartPosX;
					
						iStartPosY = ui.position.top;
						iPrevPosY = iStartPosY;
						iPrevSnapPosY = iStartPosY;
					
						bDragStart = true;				
					}
					else
						return false;
				},
			
				drag: function(event, ui)
				{
					if(to.tv.bDVResEv || to.tv.bDVScrlg)
						return false;
				
					elemDragged = this;
					sElemId = $(to.elem).find(elemDragged).attr("id");
					sArrElemId = sElemId.split("-");
					sEventId = sArrElemId[1];
					iSegIndex = sArrElemId[2];
					bIsAllDay = to._getWhetherEventIsAllDay(sEventId);
				
					bCanDrag = ((to.tv.oEvEdt !== null) && (to.tv.oDVEdtgEv.sEventId === sEventId)) ? true : false;
					if(bCanDrag)
					{
						var iCurrentPosX = ui.position.left,
						iCurrentPosY = ui.position.top,
					
						bCurrentPosX = (iCurrentPosX >= 40) ? true : false,
						iCalculatedX = Math.round((iCurrentPosX - iStartPosX) / iTimeSlotWidth),
						iCalculatedY = Math.round((iCurrentPosY - iStartPosY) / iTimeSlotHeight),
						iCalculatedAbsX = Math.abs(iCalculatedX),
						iCalculatedAbsY = Math.abs(iCalculatedY),
						bSnappedX = (bCurrentPosX && (iCurrentPosX !== iPrevSnapPosX) && (iCalculatedAbsX >= 1)) ? true : false,
						bSnappedY = ((iCurrentPosY !== iPrevSnapPosY) && (iCalculatedAbsY >= 1)) ? true : false,

						iEventDaysPresent;
					
						if(bSnappedX)
						{
							var iCurrentSnapUnitsX = Math.round((iCurrentPosX - iPrevSnapPosX) / iTimeSlotWidth),
							iStartSnapUnitsX = Math.round((iCurrentPosX - iStartPosX) / iTimeSlotWidth),
						
							iCurrentDiffX = iCurrentPosX - iPrevPosX,
							sDirectionX = "None";
							if(iCurrentDiffX > 0)
								sDirectionX = "Right";
							else if(iCurrentDiffX < 0)
								sDirectionX = "Left";
						
							var bCompWkSDate = to.compareDates(to.tv.dVDSDt, to.tv.oDVEdtgEv.dEditingDate), //  EventSegment being dragged is On WeekStartDate ?
							bCompWkEDate = to.compareDates(to.tv.dVDEDt, to.tv.oDVEdtgEv.dEditingDate), //  EventSegment being dragged is on WeekEndDate ?
							bCompStartDate = to.compareDates(dDragStartDate, to.tv.oDVEdtgEv.dEditingDate), //  EventSegment Being Dragged is Event Starting Segment ?
							bCompEndDate = to.compareDates(dDragEndDate, to.tv.oDVEdtgEv.dEditingDate), //  EventSegment Being Dragged is Event Ending Segment ?
						
							dWeekStart2Date = to._getDateForDayNumber(2, true), // get Second Day of the Week
							dWeekEnd2Date = to._getDateForDayNumber(2, false), // get secondLast Day of the Week
							bCompWkS2Date = to.compareDates(dWeekStart2Date, to.tv.oDVEdtgEv.dEditingDate), //  EventSegment being dragged is on Second Day Of Week ?
							bCompWkE2Date = to.compareDates(dWeekEnd2Date, to.tv.oDVEdtgEv.dEditingDate); // EventSegment being dragged is on Second Last Day Of the Week ?
						
							iEventDaysPresent = $(to.elem).find(".Event-"+sEventId).length;
							if(to.compareStrings(sDirectionX, "Right") && bCompWkEDate !== 0)
							{
								iEventMidPoint = iCurrentPosX + (iTimeSlotWidth / 2);
								to.tv.oDVEdtgEv.dEditingDate = to._getDateBasedOnLeftPosition(iEventMidPoint);
							
								iDragStartDateMS = dDragStartDate.getTime();
								iDragStartDateMS += $.CalenStyle.extra.iMS.d;
								dDragStartDate = new Date(iDragStartDateMS);
							
								iDragEndDateMS = dDragEndDate.getTime();
								iDragEndDateMS += $.CalenStyle.extra.iMS.d;
								dDragEndDate = new Date(iDragEndDateMS); 
							
								dArrTempDates = to.__getStartAndEndDatesOfEventForView(bIsAllDay, dDragStartDate, dDragEndDate);
								dTempStartDate = dArrTempDates[0];
								dTempEndDate = dArrTempDates[1];
							
								if(iEventDaysPresent > 1)
								{
									if(iSegIndex === 1)
									{
										$oOtherSeg = $(to.elem).find("#Event-"+sEventId+"-2");
										if(bCompWkE2Date === 0)
											$oOtherSeg.remove();
									}
								}
								else
								{
									if(bCompWkSDate === 0 && bCompStartDate !== 0)
									{
										sThisSegId = "Event-"+sEventId+"-2";
										$(this).attr("id", sThisSegId);
									
										$oOtherSeg = $(this).clone();
										sOtherSegId = "Event-"+sEventId+"-1";
										$oOtherSeg.attr("id", sOtherSegId);
										$(to.elem).find(".cdvContRow3Events").append($oOtherSeg);
										to._makeEventEditableInDetailView(".cdvEvent");
									}
								}
								to._removeEventSegWithId(sEventId);
								to._createAndAddEventSegForId(sEventId, bIsAllDay, dDragStartDate, dDragEndDate);
							}
							else if(to.compareStrings(sDirectionX, "Left") && bCompWkSDate !== 0)
							{
								iEventMidPoint = iCurrentPosX + (iTimeSlotWidth / 2);
								to.tv.oDVEdtgEv.dEditingDate = to._getDateBasedOnLeftPosition(iEventMidPoint);
							
								iDragStartDateMS = dDragStartDate.getTime();
								iDragStartDateMS -= $.CalenStyle.extra.iMS.d;
								dDragStartDate = new Date(iDragStartDateMS);
							
								iDragEndDateMS = dDragEndDate.getTime();
								iDragEndDateMS -= $.CalenStyle.extra.iMS.d;
								dDragEndDate = new Date(iDragEndDateMS);
							
								dArrTempDates = to.__getStartAndEndDatesOfEventForView(bIsAllDay, dDragStartDate, dDragEndDate);
								dTempStartDate = dArrTempDates[0];
								dTempEndDate = dArrTempDates[1];
							
								if(iEventDaysPresent > 1)
								{
									if(iSegIndex === 2)
									{
										$oOtherSeg = $(to.elem).find("#Event-"+sEventId+"-1");
										if(bCompWkS2Date === 0)
											$oOtherSeg.remove();
									}
								}
								else
								{
									if(bCompWkEDate === 0 && bCompEndDate !== 0)
									{
										$oOtherSeg = $(this).clone();
										sOtherSegId = "Event-"+sEventId+"-2";
										$oOtherSeg.attr("id", sOtherSegId);									
										$(to.elem).find(".cdvContRow3Events").append($oOtherSeg);
										to._makeEventEditableInDetailView(".cdvEvent");
									}
								}
							
								to._removeEventSegWithId(sEventId);
								to._createAndAddEventSegForId(sEventId, bIsAllDay, dDragStartDate, dDragEndDate);
							}
							sDragStartDate = to.getDateInFormat({"date": dDragStartDate}, "hh:mm", to.setting.is24Hour, true);
							sDragEndDate = to.getDateInFormat({"date": dDragEndDate}, "hh:mm", to.setting.is24Hour, true);
						
							$(to.elem).find(".Event-"+sEventId+ " .cdvEventDetails .cdvEventTime").html(sDragStartDate + "-" + sDragEndDate);
						
							iPrevSnapPosX = iCurrentPosX;
						}
					
						if(bSnappedY)
						{
							var iCurrentDiffY = iCurrentPosY - iPrevSnapPosY,
							iStartDiffY = iCurrentPosY - iStartPosY,
						
							iCurrentSnapUnitsY = Math.round(iCurrentDiffY / iTimeSlotHeight),
							iStartSnapUnitsY = Math.round(iStartDiffY / iTimeSlotHeight),
							iDraggedAmount = iCurrentSnapUnitsY * to.tv.iUTmMS,
						
							sDirectionY  = "None",
							iNumOfEventElements, iWkIndex,
							sDragStartDate, sDragEndDate, bStartDate, bEndDate,

							iFirstElemTop, iFirstTwoRowsHeight, bMinHeightReached,
							iLastElemTop, iLastElemBottom, iLastTwoRowsHeight, bInLastRow, bMaxHeightReached,
							iCont3Top, iCont3ScrollTop, iPageYMap, iElemHeight, bWithinTwoRows, 
							iHeightOverhead, iTempHeight;

							if(iCurrentDiffY > 0)
								sDirectionY = "Down";
							else if(iCurrentDiffY < 0)
								sDirectionY = "Up";
						
							if(to.compareStrings(sDirectionY, "Up"))
							{
								iFirstElemTop = $(to.elem).find(".cdvTimeSlotTableRow").first().position().top;
								iFirstTwoRowsHeight = iFirstElemTop + (2 * iTimeSlotHeight);
							
								iPageX = event.pageX;
								iPageY = event.pageY;
							
								iCont3Top = $(to.elem).find(".cdvContRow3Main").position().top;
								iPageYMap = iPageY - iCont3Top;
							
								iElemHeight = $(this).height();					
								bWithinTwoRows = (iPageYMap < iFirstTwoRowsHeight);
								iVisibleHeight = iElemHeight - Math.abs(iCurrentPosY);
								iHeightOverhead = iElemHeight % iTimeSlotHeight;
								iTempHeight = (1 * iTimeSlotHeight) + iHeightOverhead;
								bMinHeightReached = ((iCurrentPosY < 0) && (iVisibleHeight < iTempHeight)) ? true : false;
							
								if(iCurrentPosY < 0)
									$(this).find(".cEventLink").css({"margin-top": Math.abs(iCurrentPosY)});
								else
									$(this).find(".cEventLink").css({"margin-top": 0});
							
								iDragStartDateMS = dDragStartDate.getTime();
								iDragStartDateMS += iDraggedAmount;
								dDragStartDate = new Date(iDragStartDateMS);
							
								iDragEndDateMS = dDragEndDate.getTime();
								iDragEndDateMS += iDraggedAmount;
								dDragEndDate = new Date(iDragEndDateMS);
							
								dArrTempDates = to.__getStartAndEndDatesOfEventForView(bIsAllDay, dDragStartDate, dDragEndDate);
								dTempStartDate = dArrTempDates[0];
								dTempEndDate = dArrTempDates[1];
							
								iNumOfEventElements = to._getNumberOfDaysOfEventForWeek(bIsAllDay, dDragStartDate, dDragEndDate, false, true);
								iEventDaysPresent = $(to.elem).find(".Event-"+sEventId).length;
								iWkIndex = to.__getDayIndexInView(to.tv.oDVEdtgEv.dEditingDate);
							
								if(iEventDaysPresent > 0 && iNumOfEventElements === 0)
								{
									$(this).remove();
									return false;
								}
								else if(iEventDaysPresent > 0 || iNumOfEventElements > 0)
								{
									if(iEventDaysPresent > iNumOfEventElements)
									{
										if(iEventDaysPresent > iNumOfEventElements)
										{
											sThisSegId = "#Event-"+sEventId+"-2";
											$(to.elem).find(sThisSegId).remove();
										}							
										to._performOperationsAfterDraggingStopsInDetailView(sEventId, dDragStartDate, dDragEndDate);
									}
								
									if(iEventDaysPresent < iNumOfEventElements)
									{
										bStartDate = to.compareDates(to.tv.oDVEdtgEv.dEditingDate, dTempStartDate);
										bEndDate = to.compareDates(to.tv.oDVEdtgEv.dEditingDate, dTempEndDate);
									
										if(bStartDate === 0)
											sOtherSegId = "Event-"+sEventId+"-2";
										else if(bEndDate === 0)
										{
											sOtherSegId = "Event-"+sEventId+"-1";
										
											sThisSegId = "Event-"+sEventId+"-2";
											$(this).attr("id", sThisSegId);
										}
									
										$oOtherSeg = $(this).clone();
										$oOtherSeg.attr("id", sOtherSegId);
										$(to.elem).find(".cdvContRow3Events").append($oOtherSeg);
										to._makeEventEditableInDetailView(".cdvEvent");
									
										to._removeEventSegWithId(sEventId);
										to._createAndAddEventSegForId(sEventId, bIsAllDay, dDragStartDate, dDragEndDate);
									}
									else if(iEventDaysPresent === iNumOfEventElements)
									{
										to._removeEventSegWithId(sEventId);
										to._createAndAddEventSegForId(sEventId, bIsAllDay, dDragStartDate, dDragEndDate);
									}
								}
							}
							else if(to.compareStrings(sDirectionY, "Down"))
							{
								iLastElemTop = $(to.elem).find(".cdvTimeSlotTableRow").last().position().top;
								iLastElemBottom = iLastElemTop + iTimeSlotHeight;
								iLastTwoRowsHeight = iLastElemTop - (1 * iTimeSlotHeight);
							
								iPageX = event.pageX;
								iPageY = event.pageY;
							
								iCont3Top = $(to.elem).find(".cdvContRow3Main").position().top;
								iCont3ScrollTop = $(to.elem).find(".cdvContRow3Main").scrollTop();
								iPageYMap = iPageY - iCont3Top + iCont3ScrollTop;
							
								iElemHeight = $(this).height();
								bInLastRow = (iPageYMap > iLastElemTop);
								bWithinTwoRows = (iPageYMap > iLastTwoRowsHeight);
								iHeightOverhead = iElemHeight % iTimeSlotHeight;
								iTempHeight = (1 * iTimeSlotHeight) + iHeightOverhead;
								bMaxHeightReached = (iElemHeight <= iTempHeight) ? true : false;

								if(iCurrentPosY < 0)
									$(this).find(".cEventLink").css({"margin-top": Math.abs(iCurrentPosY)});
								else
									$(this).find(".cEventLink").css({"margin-top": 0});
							
								iDragStartDateMS = dDragStartDate.getTime();
								iDragStartDateMS += iDraggedAmount;
								dDragStartDate = new Date(iDragStartDateMS);
							
								iDragEndDateMS = dDragEndDate.getTime();
								iDragEndDateMS += iDraggedAmount;
								dDragEndDate = new Date(iDragEndDateMS);
							
								iElemHeight = $(this).height();
								var iElemBottom = iCurrentPosY + iElemHeight;
								if((iElemBottom) > iLastElemBottom)
								{
									iElemHeight -= (iElemBottom - iLastElemBottom);
									$(this).css({"height": iElemHeight});
								}
							
								dArrTempDates = to.__getStartAndEndDatesOfEventForView(bIsAllDay, dDragStartDate, dDragEndDate);	
								dTempStartDate = dArrTempDates[0];
								dTempEndDate = dArrTempDates[1];
							
								sDragStartDate = to.getDateInFormat({"date": dDragStartDate}, "hh:mm", to.setting.is24Hour, true);
								sDragEndDate = to.getDateInFormat({"date": dDragEndDate}, "hh:mm", to.setting.is24Hour, true);
							
								iNumOfEventElements = to._getNumberOfDaysOfEventForWeek(bIsAllDay, dDragStartDate, dDragEndDate, false, true);
								iEventDaysPresent = $(to.elem).find(".Event-"+sEventId).length;
								iWkIndex = to.__getDayIndexInView(to.tv.oDVEdtgEv.dEditingDate);
							
								if(iEventDaysPresent > 0 && iNumOfEventElements === 0)
								{
									$(this).remove();
									return false;
								}
								else if(iEventDaysPresent > 0 || iNumOfEventElements > 0)
								{
									if(iEventDaysPresent > iNumOfEventElements)
									{
										var sSeg1Id = "Event-"+sEventId+"-1";
										sThisSegId = "#"+sSeg1Id;
										$(to.elem).find(sThisSegId).remove();
									
										sOtherSegId = "#Event-"+sEventId+"-2";
										$(to.elem).find(sOtherSegId).attr("id", sSeg1Id);
										to._performOperationsAfterDraggingStopsInDetailView(sEventId, dDragStartDate, dDragEndDate);
									}
									else if(iEventDaysPresent < iNumOfEventElements)
									{
										bStartDate = to.compareDates(to.tv.oDVEdtgEv.dEditingDate, dTempStartDate);
										bEndDate = to.compareDates(to.tv.oDVEdtgEv.dEditingDate, dTempEndDate);
									
										if(bStartDate === 0)
											sOtherSegId = "Event-"+sEventId+"-2";
										else if(bEndDate === 0)
										{
											sOtherSegId = "Event-"+ sEventId+"-1";
										
											sThisSegId = "Event-"+sEventId+"-2";
											$(this).attr("id", sThisSegId);
										}
									
										$oOtherSeg = $(this).clone();
										$oOtherSeg.attr("id", sOtherSegId);
										$(to.elem).find(".cdvContRow3Events").append($oOtherSeg);
										to._makeEventEditableInDetailView(".cdvEvent");
									
										to._removeEventSegWithId(sEventId);
										to._createAndAddEventSegForId(sEventId, bIsAllDay, dDragStartDate, dDragEndDate);
									}
									else if(iEventDaysPresent === iNumOfEventElements)
									{
										to._removeEventSegWithId(sEventId);
										to._createAndAddEventSegForId(sEventId, bIsAllDay, dDragStartDate, dDragEndDate);
									}
								}
							}				
							iPrevSnapPosY = iCurrentPosY;
						}
					
						if(to.tv.bDVDrgEv)
							ui.position.left = to.tv.oDVEdtgEv.iElemLeft;
					
						iPrevPosX = iCurrentPosX;
						iPrevPosY = iCurrentPosY;
					}
					else
						return false;
				},
			
				stop: function(event, ui)
				{
					if(to.tv.bDVResEv || to.tv.bDVScrlg)
						return false;
				
					elemDragged = this;
					sElemId = $(to.elem).find(elemDragged).attr("id");
					sArrElemId = sElemId.split("-");
					sEventId = sArrElemId[1];
					iSegIndex = sArrElemId[2];
				
					bCanDrag = ((to.tv.oEvEdt !== null) && (to.tv.oDVEdtgEv.sEventId === sEventId)) ? true : false;
					if(bCanDrag)
					{
						to._performOperationsAfterDraggingStopsInDetailView(sEventId, dDragStartDate, dDragEndDate);
						to.tv.bDVDrgEv = false;
					}
					else
						return false;
				}
			
			});
		}
		else if(to.compareStrings(sClass, ".cdvEventAllDay"))
		{
			iEventHeight = $(to.elem).find(".cdvEventAllDay").height();
			iEventWidth = $(to.elem).find(".cdvTableColumns").width();
			if(iEventWidth > 140)
				iEventWidth = 140;
		
			iColumn1Width = $(to.elem).find(".cdvDetailTableColumnTime").width();
			iCalendarLeft = $(to.elem).position().left;
			iCalendarMarginLeft = $(to.elem).css("margin-left");
			iCalendarMarginLeft = parseInt(iCalendarMarginLeft.replace("px", ""));
			iLeft = iCalendarLeft + iCalendarMarginLeft + $(to.elem).find(".cdvContRow2Main").position().left;
			iX1 = iLeft + iColumn1Width;
			iX2 = iX1 + $(to.elem).find(".cdvContRow2Main").width() - (iEventWidth + iScrollbarWidth + iColumn1Width);
		
			iCalendarTop = $(to.elem).position().top;
			iCalendarMarginTop = $(to.elem).css("margin-top");
			iCalendarMarginTop = parseInt(iCalendarMarginTop.replace("px", ""));
			iY1 = iCalendarTop + iCalendarMarginTop + $(to.elem).find(".cdvContRow2Main").position().top;
			iY2 = iY1 + $(to.elem).find(".cdvContRow2Main").height() - (iEventHeight);
		
			$(to.elem).find("."+sDraggableClass).draggable(
			{
				zIndex: 100,
				scope: sScope,
				cursorAt: { top: 5, left: 5 },
				containment: [iX1, iY1, iX2, iY2],
				cursor: "move",
			
				start: function()
				{
					elemDragged = this;
					sElemId = $(to.elem).find(elemDragged).attr("id");
					sArrElemId = sElemId.split("-");
					sEventId = sArrElemId[1];
				
					bCanDrag = ((to.tv.oEvEdt !== null) && (to.tv.oDVEdtgEv.sEventId === sEventId)) ? true : false;
					if(bCanDrag)
					{
						$(this).removeClass("cPartialEventLeft cPartialEventRight cPartialEventBoth");
						var oElementClone = $(this).clone();
						$(this).parent().append(oElementClone);
						$(this).css({"width": iEventWidth, "height": iEventHeight});
					}
					else
						return false;
				},
			
				revert: function()
				{
					return true;
				}
			});
		}
	},

	_performOperationsAfterDraggingStopsInDetailView: function(sId, dStartDateAfterDrop, dEndDateAfterDrop)
	{
		var to = this;
	
		var oDraggedEvent = to.getEventWithId(sId),
		bIsAllDay = oDraggedEvent.isAllDay,
		dStartDateTime = oDraggedEvent.start,
		dEndDateTime = oDraggedEvent.end;
	
		oDraggedEvent.start = dStartDateAfterDrop;
		oDraggedEvent.end = dEndDateAfterDrop;
				
		to._removeEventSegWithId(sId);
		to._createAndAddEventSegForId(sId, bIsAllDay, dStartDateAfterDrop, dEndDateAfterDrop);
	
		to._setPropertiesOfEventSeg();
		to.tv.oEvEdt = oDraggedEvent;
	
		$(to.elem).find(".cdvEvent").removeClass("ui-draggable-dragging");
	
		to.tv.bDVDrgEv = false;
		if(to.setting.saveChangesOnEventDrop)
		{
			to._makeEventNonEditableInDetailView();
			to.setting.saveChangesOnEventDrop.call(to, oDraggedEvent, dStartDateTime, dEndDateTime, dStartDateAfterDrop, dEndDateAfterDrop);
		}
	},

	_adjustAllDayEventsInDetailView: function()
	{
		var to = this;
	
		var iNumOfWkDays = to.tv.iNoVDayDis,
		iPosLeftDiff = 0,
		iPosTopDiff = 6,
		iEventHeight = 16,
		iEventWidth = 0,
		iTopPos = 0,
		iLeftPos = 0,	
		iMaxTopPos = 0;
	
		for(var iTempIndex = 0; iTempIndex < to.tv.oAADEvSeg.length; iTempIndex++)
		{
			var oAllDayEvent = to.tv.oAADEvSeg[iTempIndex], 
		
			sEventId = oAllDayEvent[0],
			iWidthUnits = oAllDayEvent[1],
			iNewLeftIndex = oAllDayEvent[2],
			iNewTopIndex = oAllDayEvent[3];
		
			iTopPos = ((iNewTopIndex - 1) * (iEventHeight + iPosTopDiff)) + iPosTopDiff;
			iLeftPos = to.tv.fADVDayLftPos[iNewLeftIndex];
			var iNewLeftIndexEnd = iNewLeftIndex + iWidthUnits;
			var iLeftPosEnd;
			if(iNewLeftIndexEnd >= iNumOfWkDays)
				iLeftPosEnd = to.tv.fADVDayLftPos[iNumOfWkDays - 1] + to.tv.fDVDayWth + 2;
			else
				iLeftPosEnd = to.tv.fADVDayLftPos[iNewLeftIndexEnd];
			iEventWidth = (iLeftPosEnd - iLeftPos) - 5;
		
			var $oEvent = $(to.elem).find("#"+sEventId);
			$oEvent.css({"top": iTopPos, "left": iLeftPos, "width": iEventWidth, "height": iEventHeight, "line-height": iEventHeight + "px"});
		
			if(iTopPos > iMaxTopPos)
				iMaxTopPos = iTopPos;
		
			var iEventWidthMinus = 0;
			iEventWidthMinus += $oEvent.find(".cdvEventIcon").outerWidth(true);
			iEventWidthMinus += $oEvent.find(".cPartialEventLeft").outerWidth(true);
			iEventWidthMinus += $oEvent.find(".cPartialEventRight").outerWidth(true);
			iEventWidthMinus += $oEvent.find(".cdvEventTimeLeft").outerWidth(true);
			iEventWidthMinus += $oEvent.find(".cdvEventTimeRight").outerWidth(true);
			iEventWidthMinus +=  (10 * $.CalenStyle.extra.iBorderOverhead);				
		
			var iEventTitleWidth = iEventWidth - iEventWidthMinus;
			$(to.elem).find("#"+sEventId).find(".cdvEventTitle").css({"max-height": iEventHeight, "line-height": iEventHeight + "px", "width": iEventTitleWidth});
		}
	
		var iRow2Height = iMaxTopPos + iEventHeight + (2 * iPosTopDiff);
		$(to.elem).find(".cdvContRow2Main").css({"height": iRow2Height});
		iRow2Height = $(to.elem).find(".cdvContRow2Main").height();
		$(to.elem).find(".cdvDetailTableRow2").css({"height": iRow2Height});
	
		var iRow2Top = $(to.elem).find(".cdvContRow2Main").position().top,
		iWeekTableHeight = $(to.elem).find(".cdvDetailTableMain").height(),
		iWeekTableRow1Height = $(to.elem).find(".cdvDetailTableRow1").height(),
		iRow3Top = iRow2Top + iRow2Height + $.CalenStyle.extra.iEventHeightOverhead,
		iRow3Height = iWeekTableHeight - (iWeekTableRow1Height + iRow2Height + $.CalenStyle.extra.iEventHeightOverhead);
		$(to.elem).find(".cdvContRow3Main").css({"height": iRow3Height, "top": iRow3Top});
	
		to._makeEventEditableInDetailView(".cdvEventAllDay");	
	},

	_getLeftColumnAndWidthOfAnEventSegInDetailView: function(sEventSegID)
	{
		var to = this;
	
		var iSegLength = to.tv.oASmEvSeg.length;
		for(var iSegIndex = 0; iSegIndex < iSegLength; iSegIndex++)
		{
			var oTempSeg = to.tv.oASmEvSeg[iSegIndex];
			if(oTempSeg.eventSegId === sEventSegID)
				return [oTempSeg.segLeftColumn, oTempSeg.segColumns];
		}	
		return 0;
	},

	_assignEventSegToColumnsInDetailView: function(oAEventsegs)
	{
		var to = this;
	
		var iEventSegsLength = oAEventsegs.length,
		oArrColumns = [],
		iSegLeftColumn = 0, iEventSegIndex, oCurrentSeg;
		if(iEventSegsLength > 0)
		{
			for(iEventSegIndex = 0; iEventSegIndex < iEventSegsLength; iEventSegIndex++)
			{
				oCurrentSeg = oAEventsegs[iEventSegIndex];
				if(iEventSegIndex === 0)
				{
					iSegLeftColumn = 1;
					oCurrentSeg.segLeftColumn = iSegLeftColumn;
					oArrColumns.push([iSegLeftColumn, [oCurrentSeg]]);
				}
				else if(iEventSegIndex === 1)
				{
					iSegLeftColumn = 2;
					oCurrentSeg.segLeftColumn = iSegLeftColumn;
					oArrColumns.push([iSegLeftColumn, [oCurrentSeg]]);
				}
				else
				{
					var bEventAddedInExistingColumn = false;		
					for(var iColumnIndex = 0; iColumnIndex < oArrColumns.length; iColumnIndex++)
					{
						var oArrTempColumn = oArrColumns[iColumnIndex],
						iTempLeftColumn = oArrTempColumn[0],
						oArrTempEventSegs = oArrTempColumn[1],
					
						bCollidingEventFound = false;					
						for(var iSegIndex = 0; iSegIndex < oArrTempEventSegs.length; iSegIndex++)
						{
							oTempSeg = oArrTempEventSegs[iSegIndex];
							var bIsColliding = to._whetherEventsAreColliding(oCurrentSeg, oTempSeg);
							if(bIsColliding)
							{
								bCollidingEventFound = true;
								break;
							}
						}					
						if(!bCollidingEventFound) // Event Added In Existing Column
						{
							oCurrentSeg.segLeftColumn = iTempLeftColumn;
							oArrTempEventSegs.push(oCurrentSeg);
							bEventAddedInExistingColumn = true;
							break;
						}
					}		
		
					if(!bEventAddedInExistingColumn)// Event Added In New Column
					{
						iSegLeftColumn++;
						oCurrentSeg.segLeftColumn = iSegLeftColumn;
						oArrColumns.push([iSegLeftColumn, [oCurrentSeg]]);
					}
				}
			}

			for(iEventSegIndex = 0; iEventSegIndex < iEventSegsLength; iEventSegIndex++)
			{
				oCurrentSeg = oAEventsegs[iEventSegIndex];
				oCurrentSeg.segColumns = iSegLeftColumn;
			}
		}	
		return oArrColumns;
	},

	_addTimeSlotTable: function()
	{
		var to = this;
	
		var sTempStr = "", sTimeSlotClass = "", sDVDaysClass = "", iTopPos = 0;
		to.tv.fAHrTpPos = [];
	
		sTempStr += "<table class='cdvTimeSlotTable'>";
		for(var iSlotIndex = 0; iSlotIndex < (24 * to.tv.iUTmSlt); iSlotIndex++)
		{
			var iSlotHours = Math.floor(iSlotIndex / to.tv.iUTmSlt),
			iSlotInnerIndex = iSlotIndex % to.tv.iUTmSlt,
			iSlotMinutes = iSlotInnerIndex * to.setting.unitTimeInterval;
		
			var dSlotDate = new Date(),
			dSlotStartDate = new Date(),
			dSlotEndDate = new Date();
		
			dSlotDate.setHours(iSlotHours);
			dSlotDate.setMinutes(iSlotMinutes);
			dSlotStartDate.setHours(to.tv.oBsHours.startTime[0]);
			dSlotStartDate.setMinutes(to.tv.oBsHours.startTime[1]);
			dSlotEndDate.setHours(to.tv.oBsHours.endTime[0]);
			dSlotEndDate.setMinutes(to.tv.oBsHours.endTime[1]);
		
			bAddRow = to.setting.excludeNonBusinessHours ? (to.compareDateTimes(dSlotDate, dSlotStartDate) >= 0 && to.compareDateTimes(dSlotDate, dSlotEndDate) < 0) : true;
		
			if(bAddRow)
			{
				var sSlotTime = to.getNumberStringInFormat(iSlotHours, 2, false) + to.getNumberStringInFormat(iSlotMinutes, 2, false),
				sHourStr = to.getDateInFormat({"iDate": {H: iSlotHours, m: iSlotMinutes}}, "hh:mm", to.setting.is24Hour, true);
			
				sTimeSlotClass = "cdvTimeSlotTableRow cdvTimeSlotTableRow"+sSlotTime;
				sTempStr += "<tr class='" + sTimeSlotClass + "' title='" + sHourStr + "'>";
			
				if(!to.setting.timeLabels[iSlotInnerIndex])
					sHourStr = "&nbsp;";
			
				sTempStr += "<td class='cdvDetailTableColumnTime'><span>" + sHourStr + "</span></td>";
			
				for(var iDateIndex = 0; iDateIndex < to.tv.iNoVDayDis; iDateIndex++)
				{
					var bArrTemp = to.tv.bADVCur[iDateIndex],
					bTemp = bArrTemp[iSlotIndex];
				
					sDVDaysClass = "cdvDetailTableColumn"+iDateIndex;		
					var sCellClass = "cdvTableColumns " +sDVDaysClass;		
					if(bTemp === 0)
						sCellClass += " cNonBusinessHoursBg";
					else if(bTemp === 2)
						sCellClass += " cBlockedTimeBg";
					else if(bTemp === 1)
						sCellClass += " cBusinessHoursBg";
										
					sTempStr += "<td class='" + sCellClass + "' title='"+ to.tv.dAVDt[iDateIndex] +"'> &nbsp; </td>";
				}	
				sTempStr += "</tr>";
			
				to.tv.fAHrTpPos.push(iTopPos);
				iTopPos += 32;
			}
		}
		sTempStr += "</table>";
		$(to.elem).find(".cdvContRow3Main").html(sTempStr);
	
		$(to.elem).find(".cdvContRow3Main").scroll(function()
		{
			to.tv.bDVScrlg = true;
			setTimeout(function()
		    {
				to.tv.bDVScrlg = false;
		   	}, 1000);
		});
	
		setTimeout(function()
		{
			to._showCurrentTimeIndicator();
		}, 100);
	
		to._makeViewDroppableInDetailView();
	},

	__updateTimeSlotTableView: function()
	{
		var to = this;
	
		$(to.elem).find(".cdvTableColumns").removeClass("cNonBusinessHoursBg cBlockedTimeBg cBusinessHoursBg");
	
		to._getTimeSlotsArrayForCurrentView();
		for(var iSlotIndex = 0; iSlotIndex < (24 * to.tv.iUTmSlt); iSlotIndex++)
		{
			var iSlotHours = Math.floor(iSlotIndex / to.tv.iUTmSlt),
			iSlotInnerIndex = iSlotIndex % to.tv.iUTmSlt,
			iSlotMinutes = iSlotInnerIndex * to.setting.unitTimeInterval,
			sSlotTime = to.getNumberStringInFormat(iSlotHours, 2, false) + to.getNumberStringInFormat(iSlotMinutes, 2, false),
			iDate = {"iDate": {"H": iSlotHours, "m": iSlotMinutes}},
			sHourStr = to.getDateInFormat(iDate, "hh:mm", to.setting.is24Hour, true),
			sTimeSlotClass = ".cdvTimeSlotTableRow"+sSlotTime;
		
			var rowElem = $(to.elem).find(sTimeSlotClass);				
			for(var iDateIndex = 0; iDateIndex < to.tv.iNoVDayDis; iDateIndex++)
			{
				var bArrTemp = to.tv.bADVCur[iDateIndex],
				bTemp = bArrTemp[iSlotIndex];
			
				var sCellClass = "";
				if(bTemp === 0)
					sCellClass = "cNonBusinessHoursBg";
				else if(bTemp === 2)
					sCellClass = "cBlockedTimeBg";
				else if(bTemp === 1)
					sCellClass = "cBusinessHoursBg";
			
				var sDVDaysClass = ".cdvDetailTableColumn"+iDateIndex;
				$(rowElem).find(sDVDaysClass).addClass(sCellClass);						
			}
		}
	},

	_makeViewDroppableInDetailView: function()
	{
		var to = this;
	
		$(to.elem).find(".cdvDetailTableRow2 .cdvAllDayColumns").droppable(
		{
			scope: "AllDayEvents",
			
			over: function(event, ui)
			{
				var sDroppableId = $(this).attr("id"),
				iDroppedDayIndex = parseInt(sDroppableId.replace("cdvAllDayColumn", "")),
			
				oDroppedElem = ui.draggable,
				sEventId = $(to.elem).find(oDroppedElem).attr("id"),
				iEventId = sEventId.replace("Event-", ""),
				oThisEvent = to.getEventWithId(iEventId),
				dThisStartDate = oThisEvent.start,
				dThisEndDate = oThisEvent.end,
				bIsAllDay = oThisEvent.isAllDay,
				iNumOfDays = to.getNumberOfDaysOfEvent(bIsAllDay, dThisStartDate, dThisEndDate, false, false, true);
			
				$(to.elem).find(".cdvAllDayColumns").removeClass("cActivatedCell");
				for(var iElemIndex = 0; iElemIndex < iNumOfDays; iElemIndex++)
				{
					var iNextDay = iDroppedDayIndex + iElemIndex;
					if(iNextDay <= (to.tv.dAVDt.length - 1))
					{
						var sElemId = "#cdvAllDayColumn"+iNextDay;
						$(to.elem).find(sElemId).addClass("cActivatedCell");
					}
				}
			},
		
			drop: function(event, ui)
			{
				var sDroppableId = $(this).attr("id"),
				iDroppedDayIndex = parseInt(sDroppableId.replace("cdvAllDayColumn", ""));
			
				$(to.elem).find(".cdvAllDayColumns").removeClass("cActivatedCell");
			
				var oDroppedElem = ui.draggable,
				sEventId = $(to.elem).find(oDroppedElem).attr("id"),
				iEventId = sEventId.replace("Event-", ""),	
				oDraggedEvent = to.getEventWithId(iEventId),
				dThisStartDate = oDraggedEvent.start,
				dThisEndDate = oDraggedEvent.end,
				bIsAllDay = oDraggedEvent.isAllDay,
				iNumOfDays = to.getNumberOfDaysOfEvent(bIsAllDay, dThisStartDate, dThisEndDate, false, false, true),
			
				dDroppedDate = to.tv.dAVDt[iDroppedDayIndex],
				dStartDateAfterDrop = null, dEndDateAfterDrop = null;
				dStartDateAfterDrop = to.setDateInFormat({"iDate": {d: dDroppedDate.getDate(), M: dDroppedDate.getMonth(), y: dDroppedDate.getFullYear(), H: dThisStartDate.getHours(), m: dThisStartDate.getMinutes(), s: dThisStartDate.getSeconds()}}, "");
				dEndDateAfterDrop = new Date(dStartDateAfterDrop.getTime() + (dThisEndDate.getTime() - dThisStartDate.getTime()));
			
				if(to.__updateEventWithId(iEventId, dStartDateAfterDrop, dEndDateAfterDrop))
				{
					$(to.elem).find(".cdvEventAllDay").remove();
					to.__addEventsInDetailView("AllDay");
					to._adjustAllDayEventsInDetailView();
					to._makeEventNonEditableInDetailView();
				}
				else
				{
					$(ui.draggable).remove();
					to._makeEventNonEditableInDetailView();
					return false;
				}
				
				to.tv.bDVDrgEv = false;
				if(to.setting.saveChangesOnEventDrop)
					to.setting.saveChangesOnEventDrop.call(to, oDraggedEvent, dThisStartDate, dThisEndDate, dStartDateAfterDrop, dEndDateAfterDrop);
			}
		});
	},

	_canEditEventInDetailView: function(sElemId)
	{
		var to = this;
	
		var sArrElemId = sElemId.split("-"),
		sEventId = sArrElemId[1],
		iSegIndex = sArrElemId[2],
		bCanEdit = ((to.tv.oEvEdt !== null) && (to.tv.oDVEdtgEv.sEventId === sEventId)) ? true : false;
		return [bCanEdit, sEventId, iSegIndex];
	},

	_makeEventResizableInDetailView: function(sEventClass)
	{
		var to = this;
	
		var iResizeGrid = (($(to.elem).find(".cdvTimeSlotTableRow" + ":eq(0)").outerHeight() + $(to.elem).find(".cdvTimeSlotTableRow" + ":eq(1)").outerHeight()) / 2),
		iResizeDistance = iResizeGrid / 4,
		iMaxHeight = iResizeGrid * 46,
	
		sTempEventClass, iNumOfEventSeg,
		sElemId, iSegId, iSegIndex, dSegStartDate, dSegEndDate,
		iTopPos, iPrevHeight,
	
		bCanResize = false;
		$(to.elem).find(sEventClass).resizable(
		{
			grid: iResizeGrid,
			distance: iResizeDistance,
			handles: "s",
			maxHeight: iMaxHeight,
			minHeight: (iResizeGrid / 2),
			containment: "parent",
		
			create: function(ev, ui)
			{
				$(to.elem).find(sEventClass).find(".ui-resizable-handle").css({"text-align": "center"});
			
				var oElem = $(to.elem).find(sEventClass + " .ui-resizable-s");	
				$(to.elem).find(oElem).css({"bottom": 0});
			
				if(!$.CalenStyle.extra.bTouchDevice)
				{
					$(to.elem).find(oElem).hover(
						function(e)
						{
							$(this).addClass("cEventResizeHandle");
							$(this).html("<div class ='cHandleSouth'></div>");
						},
						function(e)
						{
							$(this).removeClass("cEventResizeHandle");					
							$(this).html();
						}
					);
				}
			
				$(to.elem).find(oElem).on($.CalenStyle.extra.sClickHandler, function(e)
				{
					e.stopPropagation();
					$(this).html("<div class ='cHandleSouth'>=</div>");   
				});			
			},
		
			start: function(ev, ui)
			{
				if(to.tv.bDVDrgEv || to.tv.bDVScrlg)
					return false;
			
				sElemId = $(to.elem).find(ui.element).attr("id");
				var oArrCanEdit = to._canEditEventInDetailView(sElemId);
				bCanResize = oArrCanEdit[0];
				if(bCanResize)
				{
					to.tv.bDVResEv = true;
				
					sElemId = "#" + sElemId;
					iSegId = oArrCanEdit[1];
					iSegIndex = oArrCanEdit[2];
					iPrevHeight = $(to.elem).find(sElemId).height();
					sTempEventClass = "Event-"+iSegId;
					iTopPos = $(to.elem).find(sElemId).position().top;
				
					var dArrTempDates = to._getStartAndEndDatesOfEventWithId(iSegId);
					dSegStartDate = dArrTempDates[0];
					dSegEndDate = dArrTempDates[1];
				}
			},
		
			resize: function(ev, ui)
			{
				if(to.tv.bDVDrgEv || to.tv.bDVScrlg)
					return false;
			
				sElemId = $(to.elem).find(ui.element).attr("id");
				var oArrCanEdit = to._canEditEventInDetailView(sElemId);
				bCanResize = oArrCanEdit[0];
				if(bCanResize)
				{
					iNumOfEventSeg = to._getNumberOfDaysOfEventForWeek(0, dSegStartDate, dSegEndDate, false, true);
				
					sElemId = "#"+sElemId;
					var iCurrentHeight = $(to.elem).find(sElemId).height();
					var iCurrentTop = iTopPos;
					$(to.elem).find(sElemId).css({"top": iCurrentTop});
				
					var iTempHeight = 0;
					if(iCurrentTop < 0)
					{
						iTempHeight = iCurrentTop + iPrevHeight;
						if(iCurrentHeight >= (iTempHeight - 10) && iCurrentHeight <= (iTempHeight + 10))
							iTempHeight = 0;
					}
					else
						iTempHeight = iCurrentHeight;
				
					var bResize = ((iTempHeight > 0) && (Math.abs(iCurrentHeight - iPrevHeight)) > 10),
					iSegEndDateMS;
					if(bResize)
					{
						iSegEndDateMS = dSegEndDate.getTime();
						if(iCurrentHeight < iPrevHeight)
							iSegEndDateMS -= to.tv.iUTmMS;
						else if(iCurrentHeight > iPrevHeight)
							iSegEndDateMS += to.tv.iUTmMS;
						dSegEndDate = new Date(iSegEndDateMS);
					
						if((iCurrentTop + iCurrentHeight) <= 0)
						{
							to._performOperationsAfterResizingStopsInDetailView(iSegId, dSegStartDate, dSegEndDate);
							return false;
						}
						if(iNumOfEventSeg === 2 && iSegIndex === 1)
						{
							$(to.elem).find("#Event-"+iSegId+"-2").remove();	
														
							dSegEndDate = to.setDateInFormat({"iDate": {d: dSegStartDate.getDate(), M: dSegStartDate.getMonth(), y: dSegStartDate.getFullYear(), H: 23, m: 30}}, "");
						
							to._performOperationsAfterResizingStopsInDetailView(iSegId, dSegStartDate, dSegEndDate);
							return false;
						}
						iPrevHeight = iCurrentHeight;
					}
				}
			},
		
			stop: function(ev, ui)
			{
				if(to.tv.bDVDrgEv || to.tv.bDVScrlg)
					return false;
			
				sElemId = $(to.elem).find(ui.element).attr("id");
				var oArrCanEdit = to._canEditEventInDetailView(sElemId);
				bCanResize = oArrCanEdit[0];
			
				if(bCanResize)
				{
					to._performOperationsAfterResizingStopsInDetailView(iSegId, dSegStartDate, dSegEndDate);
					to.tv.bDVResEv = false;
				}
			}
		});
	},

	_performOperationsAfterResizingStopsInDetailView: function(sId, dStartDateAfterResizing, dEndDateAfterResizing)
	{
		var to = this;
	
		var oResizedEvent = to.getEventWithId(sId),
		bIsAllDay = oResizedEvent.isAllDay,
		dStartDateTime = oResizedEvent.start,
		dEndDateTime = oResizedEvent.end;
	
		oResizedEvent.start = dStartDateAfterResizing;
		oResizedEvent.end = dEndDateAfterResizing;
	
		to._removeEventSegWithId(sId);
		to._createAndAddEventSegForId(sId, bIsAllDay, dStartDateTime, dEndDateTime);
		to._setPropertiesOfEventSeg();
	
		to.tv.oEvEdt = oResizedEvent;
		$(to.elem).find(".cdvEvent").removeClass("ui-resizable-resizing");
	
		to.tv.bDVResEv = false;
		if(to.setting.saveChangesOnEventResize)
		{
			to._makeEventNonEditableInDetailView();
			to.setting.saveChangesOnEventResize.call(to, oResizedEvent, dStartDateTime, dEndDateTime, dStartDateAfterResizing, dEndDateAfterResizing);
		}
	},

	__adjustDetailViewTable: function(isLoading)
	{
		var to = this;
	
		var icdvCalendarContMaxHeight = $(to.elem).find(".cdvCalendarCont").css("max-height");
		icdvCalendarContMaxHeight = parseInt(icdvCalendarContMaxHeight.replace("px", ""));
		var icdvCalendarContMinHeight = $(to.elem).find(".cdvCalendarCont").css("min-height");
		icdvCalendarContMinHeight = parseInt(icdvCalendarContMinHeight.replace("px", ""));
	
		if(icdvCalendarContMaxHeight > 0 && $(to.elem).height() > icdvCalendarContMaxHeight)
			$(to.elem).css({"height": icdvCalendarContMaxHeight});
		else if(icdvCalendarContMinHeight > 0 && $(to.elem).height() < icdvCalendarContMinHeight)
			$(to.elem).css({"height": icdvCalendarContMinHeight});
		if(to.tv.iCalHeight !== 0)
			$(to.elem).css({"height": to.tv.iCalHeight});
	
		var bIsValidView = ($(to.elem).find(".cdvCalendarCont").length > 0) ? true : false;
		if(bIsValidView && !to.tv.bDVDrgEv && !to.tv.bDVResEv)
		{
			var iCalendarContWidth = $(to.elem).find(".calendarCont").parent().outerWidth(),
			iCalendarContHeight = $(to.elem).find(".calendarCont").outerHeight(),
		
			iCalendarContInnerHeight = iCalendarContHeight;
			$(to.elem).find(".calendarContInner").css({"width": iCalendarContWidth, "height": iCalendarContHeight});
		
			to.__adjustHeader();
		
			if(iScrollbarWidth > 0)
				$(to.elem).find(".cdvDetailTableScroll").css({"width": iScrollbarWidth});					
		
			$(to.elem).find(".calendarCont").css("overflow", "hidden");
			var icdvContRow2Left = 0,
			icdvContRow2Width = iCalendarContWidth,
		
			icContHeaderWidth = iCalendarContWidth;
			if($(to.elem).find(".cContHeader").length > 0)
				$(to.elem).find(".cContHeader").css({"width": icContHeaderWidth});
		
			var icdvDetailTableWidth = iCalendarContWidth,
			icContHeaderHeight = ($(to.elem).find(".cContHeader").length > 0) ? $(to.elem).find(".cContHeader").outerHeight() : 0;
		
			var icdvDetailTableHeight = iCalendarContHeight - icContHeaderHeight;
			icdvDetailTableHeight += $.CalenStyle.extra.iBorderOverhead;
			$(to.elem).find(".cdvDetailTableMain").css({"height": icdvDetailTableHeight, "width": icdvDetailTableWidth});
		
			var icdvContRow2Top = $(to.elem).find(".cdvDetailTableMain").position().top + $(to.elem).find(".cdvDetailTableRow1").outerHeight();	
			$(to.elem).find(".cdvContRow2Main").css({"left": icdvContRow2Left, "top": icdvContRow2Top, "width": icdvContRow2Width});
		
			var iBorderOverheadAllDays = to.tv.iNoVDay * $.CalenStyle.extra.iBorderOverhead;
		
			var icdvDetailTableColumnTimeWidth = $(to.elem).find(".cdvDetailTableColumnTime").width();
			icdvDetailTableColumnTimeWidth = (icdvDetailTableColumnTimeWidth !== 60) ? 60: icdvDetailTableColumnTimeWidth;
			var icdvTableColumnsWidth = (icdvContRow2Width - icdvDetailTableColumnTimeWidth - iScrollbarWidth - iBorderOverheadAllDays) / (to.tv.iNoVDayDis);
			$(to.elem).find(".cdvTableColumns").css({"width": icdvTableColumnsWidth});	
			$(to.elem).find(".cdvAllDayColumns").css({"width": icdvTableColumnsWidth});
		
			var icdvContRow3Left = 0,
			iPreviousRowsHeight = icdvContRow2Top + $(to.elem).find(".cdvContRow2Main").outerHeight(),
			icdvContRow3Top = iPreviousRowsHeight,
			icdvContRow3Height = iCalendarContHeight - iPreviousRowsHeight,
			icdvContRow3Width = iCalendarContWidth - $.CalenStyle.extra.iBorderOverhead;
			var icdvTimeSlotTableHeight = $(to.elem).find(".cdvTimeSlotTable").prop("scrollHeight");
			icdvContRow3Height = (icdvContRow3Height > icdvTimeSlotTableHeight) ? icdvTimeSlotTableHeight : icdvContRow3Height;
			$(to.elem).find(".cdvContRow3Main").css({"left": icdvContRow3Left, "top": icdvContRow3Top, "height": icdvContRow3Height, "width": icdvContRow3Width});
		
			if(iScrollbarWidth === 0)
				icdvContRow3Width = icdvContRow3Width + 1;
			else
            	icdvContRow3Width = (iScrollbarWidth > iBorderOverheadAllDays) ? (icdvContRow3Width - iScrollbarWidth) : (icdvContRow3Width - iBorderOverheadAllDays +iScrollbarWidth);
        
			$(to.elem).find(".cdvTimeSlotTable").css({"width": icdvContRow3Width});		
			icdvTimeSlotTableHeight = $(to.elem).find(".cdvTimeSlotTable").prop("scrollHeight");
			$(to.elem).find(".cdvContRow3Events").css({"height": icdvTimeSlotTableHeight, "width": icdvContRow3Width});
		
			icdvDetailTableColumnTimeWidth = $(to.elem).find(".cdvDetailTableColumnTime").width();
			icdvDetailTableColumnTimeWidth = (icdvDetailTableColumnTimeWidth !== 60) ? 60: icdvDetailTableColumnTimeWidth;
			icdvTableColumnsWidth = (iCalendarContWidth - icdvDetailTableColumnTimeWidth - iScrollbarWidth - iBorderOverheadAllDays) / (to.tv.iNoVDayDis);
			$(to.elem).find(".cdvTableColumns").css({"width": icdvTableColumnsWidth});	
			$(to.elem).find(".cdvAllDayColumns").css({"width": icdvTableColumnsWidth});
		
			to.tv.fADVDayLftPos = [];
			for(var iWeekDayIndex = 0; iWeekDayIndex < to.tv.iNoVDayDis; iWeekDayIndex++)
			{
				var sTempId = "#cdvCellDay"+iWeekDayIndex,
				fLeftPos = $(to.elem).find(sTempId).position().left;
				to.tv.fADVDayLftPos.push(fLeftPos);
			}
		
			to.tv.fDVDayWth = $(to.elem).find(".cdvTableColumns").width();
			var iTimeSlotLeft = to._getTimeSlotLeftPosition();		
			if($(to.elem).find(".cdvContRow3Main .cTimeline").length > 0)
				$(to.elem).find(".cdvContRow3Main .cTimeline").css({"left": iTimeSlotLeft, "width": to.tv.fDVDayWth});
		
			to._adjustEventsInDetailView();
			to._adjustAllDayEventsInDetailView();
		}
	
		//to.__adjustFontSize();
		to.setCalendarBorderColor();
	},

	_adjustEventsInDetailView: function()
	{
		var to = this;
	
		var iEventUnitHeight = (($(to.elem).find(".cdvTimeSlotTableRow" + ":eq(0)").outerHeight() + $(to.elem).find(".cdvTimeSlotTableRow" + ":eq(1)").outerHeight()) / 2),
		sArrEventElems = $(to.elem).find(".cdvEvent");
	
		for(var iElemIndex = 0; iElemIndex < sArrEventElems.length; iElemIndex++)
		{
			var oElem = sArrEventElems[iElemIndex],
			$oElem = $(oElem),
			sElemName = $oElem.attr("name"),
			sArrElemName = sElemName.split("|"),
			sElemRow = sArrElemName[0],
			iElemCol = parseInt(sArrElemName[1]),
			sRowClass = ".cdvTimeSlotTableRow"+sElemRow,
			iRowIndex = $(to.elem).find(".cdvTimeSlotTableRow").index($(to.elem).find(sRowClass)),
		
			sElemID = $oElem.attr("id"),
			iArrColumns = to._getLeftColumnAndWidthOfAnEventSegInDetailView(sElemID),
			iSegLeftColumn = iArrColumns[0],
			iSegColumns = iArrColumns[1],
		
			iLeftPos = to.tv.fADVDayLftPos[iElemCol],
			iTopPos = parseInt(sArrElemName[2]),
			iUnitWidth = 100 / iSegColumns,
			iEventWidth = (to.tv.fDVDayWth * iUnitWidth) / 100;	
		
			iLeftPos = iLeftPos + ((iSegLeftColumn - 1) * iEventWidth);
			iEventWidth -= (0.05 * iEventWidth);
			$oElem.css({"left": iLeftPos, "top": iTopPos, "width": iEventWidth});
			if(iTopPos < 0)
				$oElem.find(".cEventLink").css({"margin-top": Math.abs(iTopPos)});
		
			var iEventHeight = $oElem.height(),
			iEventTimeHeight = $oElem.find(".cdvEventTime").height(),
			iEventTitleHeight = iEventHeight - iEventTimeHeight - 10,
			iEventTitleMinHeight = $oElem.find(".cdvEventTitle").css("min-height");
			iEventTitleMinHeight = parseInt(iEventTitleMinHeight.replace("px", ""));
		
			if(iEventTitleMinHeight < iEventTitleHeight)
				$oElem.find(".cdvEventTitle").css({"max-height": iEventTitleHeight});
		}
	
		to._makeEventEditableInDetailView(".cdvEvent");
	},

	_displayWeekNumberInDetailView: function()
	{
		var to = this;
	
		var sWeekNumber = to.__getWeekNumber(to.tv.dVSDt, to.tv.dVEDt);	
		$(to.elem).find(".cdvCellWeekNumberLabel").html(to.setting.miscStrings.week);
		$(to.elem).find(".cdvCellWeekNumber").html(sWeekNumber);
	},

	_setDateStringsInDetailView: function()
	{
		var to = this;
	
		for(var iDateIndex = 0; iDateIndex < to.tv.iNoVDayDis; iDateIndex++)
		{
			var dTempDate = to.tv.dAVDt[iDateIndex],
			bFullDateMatched = to.compareDates(dTempDate, $.CalenStyle.extra.dToday),
		
			/* -------------------------- Table Row 1 Start ------------------------------- */	
			iDayOfWeek = dTempDate.getDay(),
			sTempId = ".cdvDetailTableMain #cdvCellDay"+iDateIndex,
			iDay = dTempDate.getDate(),
			iMonth = dTempDate.getMonth(),
			iThisDateMS = dTempDate.getTime(),
		
			bWeekDayUnavailable = to.tv.bABsDays[iDayOfWeek] ? false : true;
		
			if(bWeekDayUnavailable && bFullDateMatched === 0)
				$(to.elem).find(sTempId).addClass("cBlockedTodayBg cTodayHighlightTextColor");
			else
			{
				if(bWeekDayUnavailable)
					$(to.elem).find(sTempId).addClass("cNonBusinessHoursBg");				
				if(bFullDateMatched === 0)
					$(to.elem).find(sTempId).addClass("cTodayHighlightBg cTodayHighlightTextColor");
			}
		
			if(bFullDateMatched === 0)
				$(to.elem).find(sTempId).html("<span class='cdvCellDayLeft'>"+to.setting.miscStrings.today+"</span><span class='cdvCellDayRight'>" + to.getNumberStringInFormat(iDay, 0, true) + "</span>");
			else
				$(to.elem).find(sTempId).html("<span class='cdvCellDayLeft'>" + to.getDateInFormat({"iDate": {D: iDayOfWeek}}, "DDD", false, true) + "</span><span class='cdvCellDayRight'>" + to.getNumberStringInFormat(iDay, 0, true) + "</span>");
			//$(to.elem).find(sTempId).html(to.getDateInFormat({"iDate": {D: iDayOfWeek}}, "DDD", false, true) + ", " + to.getDateInFormat({"iDate": {M: iMonth}}, "MMM", false, true) + " " + to.getNumberStringInFormat(iDay, 0, true));
		
			/* -------------------------- Table Row 1 End ------------------------------- */

			/* -------------------------- Table Row 2 Start ------------------------------- */	
			if(bWeekDayUnavailable && bFullDateMatched === 0)
				$(to.elem).find(".cdvDetailTableMain #cdvAllDayColumn"+iDateIndex).addClass("cBlockedTodayBg cTodayHighlightTextColor");
			else
			{
				if(bWeekDayUnavailable)
					$(to.elem).find(".cdvDetailTableMain #cdvAllDayColumn"+iDateIndex).addClass("cNonBusinessHoursBg");	
				if(bFullDateMatched === 0)
					$(to.elem).find(".cdvDetailTableMain #cdvAllDayColumn"+iDateIndex).addClass("cTodayHighlightBg cTodayHighlightTextColor");
			}	
			/* -------------------------- Table Row 2 End ------------------------------- */

			/* -------------------------- Table Row 3 Start ------------------------------- */	
			if(bWeekDayUnavailable && bFullDateMatched === 0)
				$(to.elem).find(".cdvDetailTableMain .cdvDetailTableColumn"+iDateIndex).addClass("cBlockedTodayBg cTodayHighlightTextColor");
			else
			{
				if(bWeekDayUnavailable)
					$(to.elem).find(".cdvDetailTableMain .cdvDetailTableColumn"+iDateIndex).addClass("cNonBusinessHoursBg");
		
				if(bFullDateMatched === 0)
					$(to.elem).find(".cdvDetailTableMain .cdvDetailTableColumn"+iDateIndex).addClass("cTodayHighlightBg cTodayHighlightTextColor");
			}
			/* -------------------------- Table Row 3 End ------------------------------- */	
		}
	
		var oDVStart = to.getDateInFormat({"date": to.tv.dVSDt}, "object", false, true),
		oDVEnd = to.getDateInFormat({"date": to.tv.dVEDt}, "object", false, true);
	
		var sDVTitle;
		if(to.compareStrings(to.setting.visibleView, "WeekView"))
		{
			if(oDVStart.y === oDVEnd.y)
			{
				if(oDVStart.M === oDVEnd.M)
					sDVTitle = "<b>" + to.getDateInFormat({"iDate": oDVStart}, "MMM", false, true) + " " + to.getNumberStringInFormat(oDVStart.d, 0, true) + "</b>  -  <b>" + to.getNumberStringInFormat(oDVEnd.d, 0, true) + "</b>  " + to.getNumberStringInFormat(oDVEnd.y, 0, true);
				else
					sDVTitle = "<b>" + to.getDateInFormat({"iDate": oDVStart}, "MMM", false, true) + "  " + to.getNumberStringInFormat(oDVStart.d, 0, true) + "</b>  -  <b>" + to.getDateInFormat({"iDate": oDVEnd}, "MMM", false, true) + " " + to.getNumberStringInFormat(oDVEnd.d, 0, true) + "</b>  " + to.getNumberStringInFormat(oDVEnd.y, 0, true);
			}
			else
				sDVTitle = "<b>" + to.getDateInFormat({"iDate": oDVStart}, "MMM", false, true) + "  " + to.getNumberStringInFormat(oDVStart.d, 0, true) + "</b>  " + to.getNumberStringInFormat(oDVStart.y, 0, true) + "  -  <b>" + to.getDateInFormat({"iDate": oDVEnd}, "MMM", false, true) + " " + to.getNumberStringInFormat(oDVEnd.d, 0, true) + "</b>  " + to.getNumberStringInFormat(oDVEnd.y, 0, true);
		}
		else if(to.compareStrings(to.setting.visibleView, "DayView"))
			sDVTitle = "<b>" + to.getDateInFormat({"iDate": oDVStart}, "DDDD", false, true) + " " + to.getDateInFormat({"iDate": oDVEnd}, "MMMM", false, true) + " " + to.getNumberStringInFormat(oDVEnd.d, 0, true) + "</b>  " + to.getNumberStringInFormat(oDVEnd.y, 0, true);
	
		if(to.setting.modifyHeaderViewLabels)
			to.setting.modifyHeaderViewLabels.call(to, to.tv.dVSDt, to.tv.dVEDt, to.setting.selectedDate, sDVTitle, to.setting.visibleView);
	
		$(to.elem).find(".cContHeaderLabel").html(sDVTitle);
		if(to.compareStrings(to.setting.visibleView, "WeekView"))	
			to._displayWeekNumberInDetailView();
	},

	__goToPrevDetailView: function()
	{
		var to = this;
	
		if(to.setting.showTransition)
		{
			//-----------------------------------------------------------------------------------
			var $occCDVDetailTableMain = $(to.elem).find(".cdvDetailTableMain"),
			icdvDetailTableWidth = $occCDVDetailTableMain.width(),
			icdvDetailTableLeft = $occCDVDetailTableMain.position().left,
			icdvDetailTableTop = 0;
			if($(to.elem).find(".cContHeader").length > 0)
				icdvDetailTableTop = $(to.elem).find(".cContHeader").position().top +  $(to.elem).find(".cContHeader").outerHeight() - 1;
			else
				icdvDetailTableTop = $(to.elem).position().top;
		
			var newElem = $occCDVDetailTableMain.clone();
			$(newElem).removeClass("cdvDetailTableMain").addClass("cdvDetailTableTemp");
			$(newElem).css({"position": "absolute", "top": icdvDetailTableTop, "left": icdvDetailTableLeft});
			$occCDVDetailTableMain.parent().append(newElem);	
			
			icdvDetailTableLeft = icdvDetailTableLeft + icdvDetailTableWidth;
		
			//-----------------------------------------------------------------------------------
			
			var $occCDVContRow2Main = $(to.elem).find(".cdvContRow2Main"),
			icdvContRow2Left = $occCDVContRow2Main.position().left,
			icdvContRow2Width= $occCDVContRow2Main.width();
		
			var newElemCont2 = $occCDVContRow2Main.clone();
			$(newElemCont2).removeClass(".cdvContRow2Main").addClass("cdvContRow2Temp");	
			$occCDVContRow2Main.parent().append(newElemCont2);
		
			icdvContRow2Left = icdvContRow2Left + icdvContRow2Width;

			//-----------------------------------------------------------------------------------
			var $occCDVContRow3Main = $(to.elem).find(".cdvContRow3Main"),
			icdvContRow3Left = $occCDVContRow3Main.position().left,
			icdvContRow3Width= $occCDVContRow3Main.width();
		
			var newElemCont3 = $occCDVContRow3Main.clone();
			$(newElemCont3).removeClass(".cdvContRow3Main").addClass("cdvContRow3Temp");	
			$occCDVContRow3Main.parent().append(newElemCont3);
		
			icdvContRow3Left = icdvContRow3Left + icdvContRow3Width;
			
			//-----------------------------------------------------------------------------------
		
			$(to.elem).find(".cdvContRow3Main .cTimeline").remove();
			if($(to.elem).find(".cdvContRow3Temp .cTimeIndicator").length > 0)
			{
				var iTimeSlotTop = $(to.elem).find(".cdvContRow3Temp .cTimeIndicator").position().top;
				var iScrollTop = iTimeSlotTop - ($(to.elem).find(".cdvContRow3Temp").height() / 2);
				$(to.elem).find(".cdvContRow3Temp").scrollTop(iScrollTop);
			}
		
			//-----------------------------------------------------------------------------------
		
			$(newElem).animate({"left": icdvDetailTableLeft}, to.setting.transitionSpeed);
			$(newElemCont2).animate({"left": icdvContRow2Left}, to.setting.transitionSpeed);
			$(newElemCont3).animate({"left": icdvContRow3Left}, to.setting.transitionSpeed);
		
			setTimeout(function()
			{
				$(to.elem).find(".cdvDetailTableTemp").remove();
				$(to.elem).find(".cdvContRow2Temp").remove();
				$(to.elem).find(".cdvContRow3Temp").remove();

			}, to.setting.transitionSpeed);
		
			//-----------------------------------------------------------------------------------				
		}
	
		var iCurrentDateMS = to.tv.dVSDt.getTime();
		if(to.setting.daysInDetailView === 7)
			iCurrentDateMS -= (to.tv.iNoVDay * $.CalenStyle.extra.iMS.d);
		else
			iCurrentDateMS -= $.CalenStyle.extra.iMS.d;
		to.setting.selectedDate = to.setDateInFormat({"date": new Date(iCurrentDateMS)}, "START");
		to.tv.dLoadDt = to.setDateInFormat({"date": to.setting.selectedDate}, "START");
	
		to.tv.sLoadType = "Prev";
		to.__reloadCurrentView(true, true);					
	},

	__goToNextDetailView: function()
	{
		var to = this;
	
		if(to.setting.showTransition)
		{
			//-----------------------------------------------------------------------------------
			var $occCDVDetailTableMain = $(to.elem).find(".cdvDetailTableMain"),
			icdvDetailTableWidth = $occCDVDetailTableMain.width(),
			icdvDetailTableLeft = $occCDVDetailTableMain.position().left,
			icdvDetailTableTop = 0;
			if($(to.elem).find(".cContHeader").length > 0)
				icdvDetailTableTop = $(to.elem).find(".cContHeader").position().top +  $(to.elem).find(".cContHeader").outerHeight() - 1;
			else
				icdvDetailTableTop = $(to.elem).position().top;
		
			var newElem = $occCDVDetailTableMain.clone();
			$(newElem).removeClass("cdvDetailTableMain").addClass("cdvDetailTableTemp");
			$(newElem).css({"position": "absolute", "top": icdvDetailTableTop, "left": icdvDetailTableLeft});
			$occCDVDetailTableMain.parent().append(newElem);	
			
			icdvDetailTableLeft = icdvDetailTableLeft - icdvDetailTableWidth;
		
			//-----------------------------------------------------------------------------------
			
			var $occCDVContRow2Main = $(to.elem).find(".cdvContRow2Main"),
			icdvContRow2Left = $occCDVContRow2Main.position().left,
			icdvContRow2Width= $occCDVContRow2Main.width();
		
			var newElemCont2 = $occCDVContRow2Main.clone();
			$(newElemCont2).removeClass(".cdvContRow2Main").addClass("cdvContRow2Temp");	
			$occCDVContRow2Main.parent().append(newElemCont2);
		
			icdvContRow2Left = icdvContRow2Left - icdvContRow2Width;

			//-----------------------------------------------------------------------------------
			var $occCDVContRow3Main = $(to.elem).find(".cdvContRow3Main"),
			icdvContRow3Left = $occCDVContRow3Main.position().left,
			icdvContRow3Width= $occCDVContRow3Main.width();
		
			var newElemCont3 = $occCDVContRow3Main.clone();
			$(newElemCont3).removeClass(".cdvContRow3Main").addClass("cdvContRow3Temp");	
			$occCDVContRow3Main.parent().append(newElemCont3);
		
			icdvContRow3Left = icdvContRow3Left - icdvContRow3Width;
			
			//-----------------------------------------------------------------------------------
		
			$(to.elem).find(".cdvContRow3Main .cTimeline").remove();
		
			if($(to.elem).find(".cdvContRow3Temp .cTimeIndicator").length > 0)
			{
				var iTimeSlotTop = $(to.elem).find(".cdvContRow3Temp .cTimeIndicator").position().top;
				var iScrollTop = iTimeSlotTop - ($(to.elem).find(".cdvContRow3Temp").height() / 2);
				$(to.elem).find(".cdvContRow3Temp").scrollTop(iScrollTop);
			}
		
			//-----------------------------------------------------------------------------------
		
			$(newElem).animate({"left": icdvDetailTableLeft}, to.setting.transitionSpeed);
			$(newElemCont2).animate({"left": icdvContRow2Left}, to.setting.transitionSpeed);
			$(newElemCont3).animate({"left": icdvContRow3Left}, to.setting.transitionSpeed);
		
			setTimeout(function()
			{
				$(to.elem).find(".cdvDetailTableTemp").remove();
				$(to.elem).find(".cdvContRow2Temp").remove();
				$(to.elem).find(".cdvContRow3Temp").remove();		
			}, to.setting.transitionSpeed);

			//-----------------------------------------------------------------------------------
			
		}
	
		var iCurrentDateMS = to.tv.dVEDt.getTime();
		iCurrentDateMS += $.CalenStyle.extra.iMS.d;
		to.setting.selectedDate = to.setDateInFormat({"date": new Date(iCurrentDateMS)}, "START");
		to.tv.dLoadDt = to.setDateInFormat({"date": to.setting.selectedDate}, "START");
	
		to.tv.sLoadType = "Next";
		to.__reloadCurrentView(true, true);				
	},

	_showCurrentTimeIndicator: function()
	{
		var to = this;
		var bOCalenStyleExists = false, oTimeOut;
		for(var iTempIndex = 0; iTempIndex < $.CalenStyle.extra.oArrCalenStyle.length; iTempIndex++)
		{
			var oThisCalenStyle = $.CalenStyle.extra.oArrCalenStyle[iTempIndex]; 
			if(oThisCalenStyle.tv.pluginId === to.tv.pluginId)
			{
				bOCalenStyleExists = true;
				break;
			}
		}
	
		if(bOCalenStyleExists)
		{
			var sTempStr;
			var iUnitTimeSlotHeight = Math.floor((($(to.elem).find(".cdvTimeSlotTableRow" + ":eq(0)").outerHeight() + $(to.elem).find(".cdvTimeSlotTableRow" + ":eq(1)").outerHeight()) / 2) / to.setting.unitTimeInterval);
			if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView"))
			{
				var dCurrentTime = to._getCurrentDate(),
				iCurrentHours = dCurrentTime.getHours(),
				iCurrentMinutes = dCurrentTime.getMinutes(),
				iCurrentSecond = dCurrentTime.getSeconds(),
				iSlotInnerIndex = Math.floor(iCurrentMinutes / to.setting.unitTimeInterval),
				iSlotMinutes = iSlotInnerIndex * to.setting.unitTimeInterval,				
				iCurrentMinutesOverhead = (iCurrentMinutes % to.setting.unitTimeInterval),
				iCurrentMinutesOverheadHeight = iUnitTimeSlotHeight * iCurrentMinutesOverhead;
			
				iCurrentMinutes = iCurrentMinutes - iCurrentMinutesOverheadHeight;
			
				var sCurrentHour = to.getNumberStringInFormat(iCurrentHours, 2, false), 
				sCurrentMinutes = to.getNumberStringInFormat(iCurrentMinutes, 2, false),
				sTimeSlotClass = ".cdvContRow3Main .cdvTimeSlotTableRow"+sCurrentHour+sCurrentMinutes;
			
				if($(to.elem).find(sTimeSlotClass).length > 0)
				{
					var iTimeSlotTop = $(to.elem).find(sTimeSlotClass).position().top,
					iTimeSlotLeft = 0,
					iTimeSlotWidth = 0;
					if(to.tv.fDVDayWth > 0)
						iTimeSlotWidth = to.tv.fDVDayWth;
					iTimeSlotTop += iCurrentMinutesOverheadHeight;
				
					var bShowTimeline = to.__isDateInCurrentView(dCurrentTime);
					if(bShowTimeline)
					{
						iTimeSlotLeft = to._getTimeSlotLeftPosition();
						if($(to.elem).find(".cdvContRow3Main .cTimeline").length > 0)
							$(to.elem).find(".cdvContRow3Main .cTimeline").css({"left": iTimeSlotLeft, "top": iTimeSlotTop, "width": iTimeSlotWidth});
						else
						{
							sTempStr = "<div class='cTimeline'></div>";		
							$(to.elem).find(".cdvContRow3Main .cdvTimeSlotTable").append(sTempStr);
							$(to.elem).find(".cdvContRow3Main .cTimeline").css({"left": iTimeSlotLeft, "top": iTimeSlotTop, "width": iTimeSlotWidth});
						}
					}
					else
						$(to.elem).find(".cdvContRow3Main .cTimeline").remove();
				
					if($(to.elem).find(".cdvContRow3Main .cTimeIndicator").length > 0)
						$(to.elem).find(".cdvContRow3Main .cTimeIndicator").css({"top": iTimeSlotTop});
					else
					{
						sTempStr = "<div class='cTimeIndicator'></div>";
						$(to.elem).find(".cdvContRow3Main .cdvTimeSlotTable").append(sTempStr);
						$(to.elem).find(".cdvContRow3Main .cTimeIndicator").css({"top": iTimeSlotTop});
					}
				
					setTimeout(function()
					{
						var iScrollTop = iTimeSlotTop - ($(to.elem).find(".cdvContRow3Main").height() / 2);
						$(to.elem).find(".cdvContRow3Main").scrollTop(iScrollTop);
					}, 500);
				}
			
				oTimeOut = setTimeout(function()
				{
					to._showCurrentTimeIndicator();
				}, ($.CalenStyle.extra.iMS.m * to.setting.timeIndicatorUpdationInterval));
			}

			bOCalenStyleExists = false;
		}
		else
		{
			console.log("clearTimeout");
			clearTimeout(oTimeOut);
		}
	},

	_getTimeSlotLeftPosition: function()
	{
		var to = this;
	
		var iTimeSlotLeft = 0;
		if(to.tv.fADVDayLftPos.length > 0)
		{
			for(var iWkDatesIndex = 0; iWkDatesIndex < to.tv.dAVDt.length; iWkDatesIndex++)
			{
				if(to.compareDates($.CalenStyle.extra.dToday, to.tv.dAVDt[iWkDatesIndex]) === 0)
				{
					iTimeSlotLeft = to.tv.fADVDayLftPos[iWkDatesIndex];
					break;
				}
			}
		}
		return iTimeSlotLeft;
	},

	_addTooltipInDetailView: function()
	{
		var to = this;
	
		$(to.elem).find(".cEventTooltip").tooltip(
		{
			content: function()
			{
				var sTooltipText = "";
				if(to.compareStrings(to.setting.eventTooltipContent, "Default"))
				{
					var oTooltipContent = $(this).data("tooltipcontent");
					if(oTooltipContent.title !== undefined)
						sTooltipText += "<div class='cTooltipTitle'>" + oTooltipContent.title + "</div>";
					if(oTooltipContent.startDateTime !== undefined || oTooltipContent.endDateTime === undefined)
					{
						sTooltipText += "<div class='cTooltipTime'>";
						if(oTooltipContent.startDateTime !== undefined)
							sTooltipText += oTooltipContent.startDateTime;
						if(oTooltipContent.endDateTime !== undefined)
							sTooltipText += ("<br/>" + oTooltipContent.endDateTime);
						sTooltipText += "</div>";
					}
				}
				else
				{
					var sEventId = $(this).attr("id");
					var sId = sEventId.split("-")[1];
					var oEventRecord = to.getEventWithId(sId);
					sTooltipText = to.setting.eventTooltipContent.call(to, oEventRecord);
				}
				return sTooltipText;
			},
		
			position:
			{
				my: "left-25 bottom-15",
				at: "center top",
				using: function(position, feedback)
				{
					$(this).css(position);
					$("<div>")
					.addClass("tooltip-arrow")
					.addClass(feedback.vertical)
					.addClass(feedback.horizontal)
					.appendTo(this);
				}
			},
		
			track: true/*,
		
			hide:
			{
				delay: 3000000
			}*/
		});
	}

});

/*! ------------------------------------ CalenStyle Detail View End ------------------------------------ */




/*! ---------------------------------- CalenStyle Quick Agenda View Start --------------------------------- */

CalenStyle.prototype = $.extend(CalenStyle.prototype, {

	//----------------------------------------------------------------------------

	__updateQuickAgendaView: function(bLoadAllData)
	{
		var to = this;
	
		var sTempStr = "",
		iDateIndex, sDVDaysClass;

		//---------------------------------------------------------------------------------------------

		sTempStr += "<thead>";
		sTempStr += "<tr class='cqavTableRow1'>";
		for(iDateIndex = 0; iDateIndex < to.tv.iNoVDayDis; iDateIndex++)
		{
			var sTempId = "cqavDayColumn"+iDateIndex;
			sDVDaysClass = "cqavTableColumns";
			if(iDateIndex === (to.tv.iNoVDayDis - 1))
				sDVDaysClass += " cqavLastColumn";
			sTempStr += "<td id='" + sTempId + "' class='"+sDVDaysClass+"'>&nbsp;</td>";
		}
		sTempStr += "</tr>";
		sTempStr += "</thead>";

		//---------------------------------------------------------------------------------------------

		sTempStr += "<tbody>";
		sTempStr += "<tr class='cqavTableRow2'>";
		for(iDateIndex = 0; iDateIndex < to.tv.iNoVDayDis; iDateIndex++)
		{
			var sDVDaysId = "cqavDayColumn"+iDateIndex;
			sDVDaysClass = "cqavTableColumns";
			if(iDateIndex === (to.tv.iNoVDayDis - 1))
				sDVDaysClass += " cqavLastColumn";
			sTempStr += "<td id='"+sDVDaysId+"' class='"+sDVDaysClass+"' title='"+to.getDateInFormat({"date": to.tv.dAVDt[iDateIndex]}, "dd-MMM-yyyy", to.setting.is24Hour, true)+"'> &nbsp; </td>";
		}
		sTempStr += "</tr>";
		sTempStr += "</tbody>";

		$(to.elem).find(".cqavTableMain").html(sTempStr);

		//---------------------------------------------------------------------------------------------
	
		to._setDateStringsInHeaderOfQuickAgendaView();
		to._makeEventContDroppableInQuickAgendaView();
	},

	_setDateStringsInHeaderOfQuickAgendaView: function()
	{
		var to = this;
		for(var iDateIndex = 0; iDateIndex < to.tv.iNoVDayDis; iDateIndex++)
		{
			dTempDate = to.tv.dAVDt[iDateIndex];
			var bFullDateMatched = to.compareDates(dTempDate, $.CalenStyle.extra.dToday),
		
			/* -------------------------- Table Row 1 Start ------------------------------- */	
			iDayOfWeek = dTempDate.getDay(),
			sRow1Id = ".cqavTableRow1 #cqavDayColumn"+iDateIndex,
			iDay = dTempDate.getDate(),
			iMonth = dTempDate.getMonth(),
			iThisDateMS = dTempDate.getTime(),
		
			bWeekDayUnavailable = to.tv.bABsDays[iDayOfWeek] ? false : true;
		
			if(bWeekDayUnavailable && bFullDateMatched === 0)
				$(to.elem).find(sRow1Id).addClass("cBlockedTodayBg cTodayHighlightTextColor");
			else
			{
				if(bWeekDayUnavailable)
					$(to.elem).find(sRow1Id).addClass("cNonBusinessHoursBg");				
				if(bFullDateMatched === 0)
					$(to.elem).find(sRow1Id).addClass("cTodayHighlightBg cTodayHighlightTextColor");
			}
		
			if(bFullDateMatched === 0)
				$(to.elem).find(sRow1Id).html("<span class='cqavDayColumnLeft'>"+to.setting.miscStrings.today+"</span><span class='cqavDayColumnRight'>" + to.getNumberStringInFormat(iDay, 0, true) + "</span>");
			else
				$(to.elem).find(sRow1Id).html("<span class='cqavDayColumnLeft'>" + to.getDateInFormat({"iDate": {D: iDayOfWeek}}, "DDD", false, true) + "</span><span class='cqavDayColumnRight'>" + to.getNumberStringInFormat(iDay, 0, true) + "</span>");
		
			/* -------------------------- Table Row 1 End ------------------------------- */
		
			/* -------------------------- Table Row 2 Start ---------------------------- */	
			var sRow2Id = ".cqavTableRow2 #cqavDayColumn"+iDateIndex;
			if(bWeekDayUnavailable && bFullDateMatched === 0)
				$(to.elem).find(sRow2Id).addClass("cBlockedTodayBg cTodayHighlightTextColor");
			else
			{
				if(bWeekDayUnavailable)
					$(to.elem).find(sRow2Id).addClass("cNonBusinessHoursBg");	
				if(bFullDateMatched === 0)
					$(to.elem).find(sRow2Id).addClass("cTodayHighlightBg cTodayHighlightTextColor");
			}	
			/* -------------------------- Table Row 2 End ------------------------------- */
		}
	
		var oDVStart = to.getDateInFormat({"date": to.tv.dVSDt}, "object", false, true),
		oDVEnd = to.getDateInFormat({"date": to.tv.dVEDt}, "object", false, true);
	
		var sDVTitle;
		if(to.compareStrings(to.setting.quickAgendaViewDuration, "CustomDays") && to.setting.daysInQuickAgendaView === 1)
			sDVTitle = "<b>" + to.getDateInFormat({"iDate": oDVStart}, "DDDD", false, true) + " " + to.getDateInFormat({"iDate": oDVEnd}, "MMMM", false, true) + " " + to.getNumberStringInFormat(oDVEnd.d, 0, true) + "</b>  " + to.getNumberStringInFormat(oDVEnd.y, 0, true);
		else
		{
			if(oDVStart.y === oDVEnd.y)
			{
				if(oDVStart.M === oDVEnd.M)
					sDVTitle = "<b>" + to.getDateInFormat({"iDate": oDVStart}, "MMM", false, true) + " " + to.getNumberStringInFormat(oDVStart.d, 0, true) + "</b>  -  <b>" + to.getNumberStringInFormat(oDVEnd.d, 0, true) + "</b>  " + to.getNumberStringInFormat(oDVEnd.y, 0, true);
				else
					sDVTitle = "<b>" + to.getDateInFormat({"iDate": oDVStart}, "MMM", false, true) + "  " + to.getNumberStringInFormat(oDVStart.d, 0, true) + "</b>  -  <b>" + to.getDateInFormat({"iDate": oDVEnd}, "MMM", false, true) + " " + to.getNumberStringInFormat(oDVEnd.d, 0, true) + "</b>  " + to.getNumberStringInFormat(oDVEnd.y, 0, true);
			}
			else
				sDVTitle = "<b>" + to.getDateInFormat({"iDate": oDVStart}, "MMM", false, true) + "  " + to.getNumberStringInFormat(oDVStart.d, 0, true) + "</b>  " + to.getNumberStringInFormat(oDVStart.y, 0, true) + "  -  <b>" + to.getDateInFormat({"iDate": oDVEnd}, "MMM", false, true) + " " + to.getNumberStringInFormat(oDVEnd.d, 0, true) + "</b>  " + to.getNumberStringInFormat(oDVEnd.y, 0, true);
		}

		if(to.setting.modifyHeaderViewLabels)
			to.setting.modifyHeaderViewLabels.call(to, to.tv.dVSDt, to.tv.dVEDt, to.setting.selectedDate, sDVTitle, to.setting.visibleView);
	
		$(to.elem).find(".cContHeaderLabel").html(sDVTitle);
	},

	__goToPrevQuickAgendaView: function()
	{
		var to = this;

		if(to.setting.showTransition)
		{
			//-----------------------------------------------------------------------------------
			var $ocCQAVTableMain = $(to.elem).find(".cqavTableMain"),
			icqavTableWidth = $ocCQAVTableMain.width(),
			icqavTableLeft = $ocCQAVTableMain.position().left,
			icqavTableTop = 0;
			if($(to.elem).find(".cContHeader").length > 0)
				icqavTableTop = $(to.elem).find(".cContHeader").position().top +  $(to.elem).find(".cContHeader").outerHeight() - 1;
			else
				icqavTableTop = $(to.elem).position().top;
		
			var newElem = $ocCQAVTableMain.clone();
			$(newElem).removeClass("cqavTableMain").addClass("cqavTableTemp");
			$(newElem).css({"position": "absolute", "top": icqavTableTop, "left": icqavTableLeft});
			$ocCQAVTableMain.parent().append(newElem);	
		
			icqavTableLeft = icqavTableLeft + icqavTableWidth;
		
			//-----------------------------------------------------------------------------------
		
			var $ocCQAVContRow2Main = $(to.elem).find(".cqavContRow2Main"),
			icqavContRow2Left = $ocCQAVContRow2Main.position().left,
			icqavContRow2Width= $ocCQAVContRow2Main.width();
		
			var newElemCont2 = $ocCQAVContRow2Main.clone();
			$(newElemCont2).removeClass("cqavContRow2Main").addClass("cqavContRow2Temp");	
			$ocCQAVContRow2Main.parent().append(newElemCont2);
		
			icqavContRow2Left = icqavContRow2Left + icqavContRow2Width;

			//-----------------------------------------------------------------------------------
		
			$(newElem).animate({"left": icqavTableLeft}, to.setting.transitionSpeed);
			$(newElemCont2).animate({"left": icqavContRow2Left}, to.setting.transitionSpeed);
		
			setTimeout(function()
			{
				$(to.elem).find(".cqavTableTemp").remove();
				$(to.elem).find(".cqavContRow2Temp").remove();
			}, to.setting.transitionSpeed);
		
			//-----------------------------------------------------------------------------------				
		}
	
		var iCurrentDateMS = to.tv.dVSDt.getTime();
		if(to.setting.daysInQuickAgendaView === 7)
			iCurrentDateMS -= (to.tv.iNoVDay * $.CalenStyle.extra.iMS.d);
		else
			iCurrentDateMS -= $.CalenStyle.extra.iMS.d;
		to.setting.selectedDate = to.setDateInFormat({"date": new Date(iCurrentDateMS)}, "START");
		to.tv.dLoadDt = to.setDateInFormat({"date": to.setting.selectedDate}, "START");
	
		to.tv.sLoadType = "Prev";
		to.__reloadCurrentView(false, true);
	},

	__goToNextQuickAgendaView: function()
	{
		var to = this;

		if(to.setting.showTransition)
		{
			//-----------------------------------------------------------------------------------
		
			var $ocCQAVTableMain = $(to.elem).find(".cqavTableMain"),
			icqavTableWidth = $ocCQAVTableMain.width(),
			icqavTableLeft = $ocCQAVTableMain.position().left,
			icqavTableTop = 0;
			if($(to.elem).find(".cContHeader").length > 0)
				icqavTableTop = $(to.elem).find(".cContHeader").position().top +  $(to.elem).find(".cContHeader").outerHeight() - 1;
			else
				icqavTableTop = $(to.elem).position().top;
		
			var newElem = $ocCQAVTableMain.clone();
			$(newElem).removeClass("cqavTableMain").addClass("cqavTableTemp");
			$(newElem).css({"position": "absolute", "top": icqavTableTop, "left": icqavTableLeft});
			$ocCQAVTableMain.parent().append(newElem);	
		
			icqavTableLeft = icqavTableLeft - icqavTableWidth;
		
			//-----------------------------------------------------------------------------------
		
			var $ocCQAVContRow2Main = $(to.elem).find(".cqavContRow2Main"),
			icqavContRow2Left = $ocCQAVContRow2Main.position().left,
			icqavContRow2Width= $ocCQAVContRow2Main.width();
		
			var newElemCont2 = $ocCQAVContRow2Main.clone();
			$(newElemCont2).removeClass("cqavContRow2Main").addClass("cqavContRow2Temp");	
			$ocCQAVContRow2Main.parent().append(newElemCont2);
		
			icqavContRow2Left = icqavContRow2Left - icqavContRow2Width;
		
			//-----------------------------------------------------------------------------------
		
			$(newElem).animate({"left": icqavTableLeft}, to.setting.transitionSpeed);
			$(newElemCont2).animate({"left": icqavContRow2Left}, to.setting.transitionSpeed);
		
			setTimeout(function()
			{
				$(to.elem).find(".cqavTableTemp").remove();
				$(to.elem).find(".cqavContRow2Temp").remove();
			}, to.setting.transitionSpeed);
		
			//-----------------------------------------------------------------------------------				
		}
	
		var iCurrentDateMS = to.tv.dVEDt.getTime();
		iCurrentDateMS += $.CalenStyle.extra.iMS.d;
		to.setting.selectedDate = to.setDateInFormat({"date": new Date(iCurrentDateMS)}, "START");
		to.tv.dLoadDt = to.setDateInFormat({"date": to.setting.selectedDate}, "START");
	
		to.tv.sLoadType = "Next";
		to.__reloadCurrentView(false, true);
	},

	__adjustQuickAgendaView: function()
	{
		var to = this;
	
		var icqavCalendarContMaxHeight = $(to.elem).find(".cqavCalendarCont").css("max-height");
		icqavCalendarContMaxHeight = parseInt(icqavCalendarContMaxHeight.replace("px", ""));
		var icqavCalendarContMinHeight = $(to.elem).find(".cqavCalendarCont").css("min-height");
		icqavCalendarContMinHeight = parseInt(icqavCalendarContMinHeight.replace("px", ""));
	
		if(icqavCalendarContMaxHeight > 0 && $(to.elem).height() > icqavCalendarContMaxHeight)
			$(to.elem).css({"height": icqavCalendarContMaxHeight});
		else if(icqavCalendarContMinHeight > 0 && $(to.elem).height() < icqavCalendarContMinHeight)
			$(to.elem).css({"height": icqavCalendarContMinHeight});
		if(to.tv.iCalHeight !== 0)
			$(to.elem).css({"height": to.tv.iCalHeight});
	
		var bIsValidView = ($(to.elem).find(".cqavCalendarCont").length > 0) ? true : false;
		if(bIsValidView && !to.tv.bDVDrgEv && !to.tv.bDVResEv)
		{
			var iCalendarContWidth = $(to.elem).find(".calendarCont").parent().outerWidth(),
			iCalendarContHeight = $(to.elem).find(".calendarCont").outerHeight(),
		
			iCalendarContInnerHeight = iCalendarContHeight;
			$(to.elem).find(".calendarContInner").css({"width": iCalendarContWidth, "height": iCalendarContInnerHeight});
		
			to.__adjustHeader();
		
			//$(to.elem).find(".calendarCont").css("overflow", "hidden");
		
			var icqavContRow2Left = 0,
			icqavContRow2Width = iCalendarContWidth,
			icContHeaderWidth = iCalendarContWidth;
			if($(to.elem).find(".cContHeader").length > 0)
				$(to.elem).find(".cContHeader").css({"width": icContHeaderWidth});
		
			var icqavTableWidth = iCalendarContWidth,
			icContHeaderHeight = ($(to.elem).find(".cContHeader").length > 0) ? $(to.elem).find(".cContHeader").outerHeight() : 0;
		
			var icqavTableHeight = iCalendarContHeight - icContHeaderHeight - $.CalenStyle.extra.iBorderOverhead;
			$(to.elem).find(".cqavTableMain").css({"height": icqavTableHeight, "width": icqavTableWidth});
		
			var icqavContRow2Top = $(to.elem).find(".cqavTableMain").position().top + $(to.elem).find(".cqavTableRow1").outerHeight(),
			icqavContRow2Height = $(to.elem).find(".cqavTableRow2").height();	
			$(to.elem).find(".cqavContRow2Main").css({"left": icqavContRow2Left, "top": icqavContRow2Top, "width": icqavContRow2Width, "height": icqavContRow2Height});
		
			var iBorderOverheadAllDays = to.tv.iNoVDay * $.CalenStyle.extra.iBorderOverhead;
		
			var icqavTableColumnsWidth = (icqavContRow2Width - iBorderOverheadAllDays) / (to.tv.iNoVDayDis);
			$(to.elem).find(".cqavTableColumns").css({"width": icqavTableColumnsWidth});

			to.tv.fADVDayLftPos = [];
			for(var iWeekDayIndex = 0; iWeekDayIndex < to.tv.iNoVDayDis; iWeekDayIndex++)
			{
				fLeftPos = $(to.elem).find(".cqavTableRow2 #cqavDayColumn"+iWeekDayIndex).position().left;
				to.tv.fADVDayLftPos.push(fLeftPos);
			}
		
		}

		to._adjustEventsInQuickAgendaView();
	},

	__addEventsInQuickAgendaView: function()
	{
		var to = this;
		if($(to.elem).find(".cqavContRow2Main"))
			$(to.elem).find(".cqavContRow2Main").html("");
	
		var oArrTempEvents = to.getArrayOfEventsForView(to.tv.dVSDt, to.tv.dVEDt);
		to.tv.bAWkRw = [];
	
		if(oArrTempEvents.length > 0)
		{
			var iEventHeightForAllEvents = 16;
		
			for(var iEventIndex = 0; iEventIndex < oArrTempEvents.length; iEventIndex++)
			{
				var oEvent = oArrTempEvents[iEventIndex],					
				dStartDateTime = null, dEndDateTime = null, bIsAllDay = 0,
				sTitle = "", sDesc = "", sType = "", sURL = "", bDragNDrop = false,
			
				sId = "Event-" + oEvent.calEventId;
			
				if(oEvent.start !== null)
					dStartDateTime = oEvent.start;
			
				if(oEvent.end !== null)
					dEndDateTime = oEvent.end;
			
				if(oEvent.isAllDay !== null)
					bIsAllDay = oEvent.isAllDay;
			
				if(oEvent.title !== null)
					sTitle = oEvent.title;
			
				if(oEvent.desc !== null)
					sDesc = oEvent.desc;
			
				if(oEvent.type !== null)
					sType = oEvent.type;
			
				if(oEvent.url !== null)
					sURL = oEvent.url;
			
				if(oEvent.isDragNDropInQuickAgendaView !== null)
					bDragNDrop = oEvent.isDragNDropInQuickAgendaView;
			
				var iArrTempNum = to.getNumberOfDaysOfEvent(bIsAllDay, dStartDateTime, dEndDateTime, true, true, true),
				iNumOfEventElements = iArrTempNum[0],
				iNumberOfHours = iArrTempNum[1];
			
				if(iNumOfEventElements > 0)
				{
					var sDayId = "";							
					var iNumOfSegs = iNumOfEventElements,
					sPartialEvent = "",
					dTempStartDateTime = new Date(dStartDateTime),
					dTempEndDateTime = new Date(dEndDateTime);
				
					if(to.compareDates(dStartDateTime, to.tv.dVSDt) < 0)
					{
						sPartialEvent = "Left";
						dTempStartDateTime = new Date(to.tv.dVSDt);
					}
					if(to.compareDates(to.tv.dVEDt, dEndDateTime) < 0)	
					{
						sPartialEvent = "Right";
						dTempEndDateTime = new Date(to.tv.dVEDt);
					}
									
					var dTempSDT = new Date(dTempStartDateTime);
					bActualStartDate = true;
					while(!to.__findWhetherDateIsVisibleInCurrentView(dTempSDT, (bIsAllDay || iNumberOfHours > 23), dTempStartDateTime, dTempEndDateTime))
					{
						dTempSDT.setDate(dTempSDT.getDate() + 1);
						bActualStartDate = false;
						if(to.compareDates(dTempSDT, dTempEndDateTime) > 0)
							break;
					}
					dTempStartDateTime = new Date(dTempSDT);
					
					iColumn = to._getDayNumberFromDateInQuickAgendaView(dTempStartDateTime);
					sDayId = "#cqavDayColumn"+iColumn;			
					iNumOfDays = to.getNumberOfDaysOfEvent(bIsAllDay, dTempStartDateTime, dTempEndDateTime, true, true, bActualStartDate);
					iNumOfSegs = iNumOfDays[0];
					iNumberOfHours = iNumOfDays[0];
				
					if(iNumberOfHours > 0)
					{
				
						var sEventColor = oEvent.color;
						sEventColor = (to.compareStrings(sEventColor, "") || to.compareStrings(sEventColor, "transparent")) ? "transparent" : "#" + sEventColor;
						var sEventBorderColor = oEvent.borderColor || to.setting.borderColor;
						sEventBorderColor = (to.compareStrings(sEventBorderColor, "") || to.compareStrings(sEventBorderColor, "transparent")) ? "transparent" : "#" + sEventBorderColor;
						var sEventTextColor = oEvent.textColor || to.setting.textColor;
						sEventTextColor = (to.compareStrings(sEventTextColor, "") || to.compareStrings(sEventTextColor, "transparent")) ? to.setting.textColor : "#" + sEventTextColor;
					
						var sColorStyle = "",
						sEventIconStyle = "",
						sLinkStyle = "";
						if(bIsAllDay === true || iNumberOfHours > 23)
						{
							sColorStyle += "background: " + sEventColor + "; ";
							sColorStyle += "border-color: " + sEventBorderColor + "; ";
							sColorStyle += "color: " + sEventTextColor + "; ";
							sLinkStyle += "color: " + sEventTextColor + "; ";
							sEventIconStyle = "color: " + sEventTextColor + "; ";
						}
						else
						{
							sColorStyle += "color: " + sEventColor + "; ";
							iNumOfSegs = 1;
							sPartialEvent = "";
							sLinkStyle += "color: " + sEventColor + "; ";
							sEventIconStyle = "color: " + sEventColor + "; ";
						}
					
						var sIcon = oEvent.icon || to.setting.eventIcon;
					
						var sEventClass = "cqavEvent ";
						if(to.compareDates(dEndDateTime, to.tv.dAVDt[0]) < 0)
							sEventClass += ("cBlurredEvent ");							
						if(bDragNDrop)
							sEventClass += ("EventDraggable cDragNDrop ");
						if(to.setting.isTooltipInQuickAgendaView)
							sEventClass += ("cEventTooltip ");
						sEventClass += sId;
					
						var sEventTitle = sTitle,
						sEventContent = sDesc,
						iAddedDays = 0,
						iEventSegIndex = 0;
					
						var iEventRow = -1,
						bLeftPartial = false, bRightPartial = false;
					
						if(to.compareStrings(sPartialEvent, "Left"))
							bLeftPartial = (iAddedDays > 0) ? false : true;
					
						if(to.compareStrings(sPartialEvent, "Right"))
							bRightPartial = true;
					
						if(iAddedDays < iNumOfSegs)
						{
							var iEventRowTop = $(to.elem).find(".cqavContRow2Main").position().top,
							iEventColumn = (iAddedDays > 0) ? 0 : iColumn,
							iEventLengthInRow = (iNumOfSegs - iAddedDays),
							iEventLengthInWeek = to.tv.iNoVDayDis - iEventColumn;
						
							if(iEventLengthInRow > iEventLengthInWeek)
							{
								iEventLengthInRow = iEventLengthInWeek;
								bRightPartial = true;
							}
							if(iAddedDays > 0)
								bLeftPartial = true;
							var iMaxColumn = iEventColumn + iEventLengthInRow;
							var bInnerRow;
							for(var iTempIndex2 = 0; iTempIndex2 < to.tv.bAWkRw.length; iTempIndex2++)
							{
								bInnerRow = to.tv.bAWkRw[iTempIndex2];
							
								if(iEventRow !== -1)
									break;
							
								var iTempEventLengthInRow = 0;
								for(var iTempIndex3 = iEventColumn; iTempIndex3 < iMaxColumn; iTempIndex3++)
								{
									if(bInnerRow[iTempIndex3] === 0 && iTempEventLengthInRow < iEventLengthInRow)
									{
										iTempEventLengthInRow++;
										if(iTempEventLengthInRow === iEventLengthInRow)
										{
											iEventRow = iTempIndex2;
											break;
										}
									}
								}
							}
							if(iEventRow === -1)
							{
								to.tv.bAWkRw.push([0, 0, 0, 0, 0, 0, 0]);
								iEventRow = to.tv.bAWkRw.length - 1;
							}
						
							bInnerRow = to.tv.bAWkRw[iEventRow];
						
							var sEventSegId = sId + "-" + (++iEventSegIndex);
						
							//--------------------------- Add Event Start -----------------------------
						
							var sName = (iEventRow + 1) + "|" + iEventColumn + "|" + iEventLengthInRow;
						
							var sHeight = iEventHeightForAllEvents + "px";
							var sStyle = sColorStyle;
							sStyle += "height: " + sHeight + "; ";
						
							var sTempStr = "<div id='" + sEventSegId + "' class='" + sEventClass + "' style='" + sStyle + "'  name='" + sName + "' title=''>";
						
							sTempStr += "<a class='cEventLink' style='" + sLinkStyle + "'>";
						
							var sPartialClass = "";
							if(bRightPartial && bLeftPartial)
							{
								sPartialClass = "cPartialEvent";
								sTempStr += "<span class='" + sPartialClass + " cPartialEventLeft'></span>";
								sTempStr += "<span class='" + sPartialClass + " cPartialEventRight'></span>";
							}
							else if(bRightPartial || bLeftPartial)
							{
								sPartialClass = "cPartialEvent";
								if(bLeftPartial)
									sPartialClass += " cPartialEventLeft";
								if(bRightPartial)
									sPartialClass += " cPartialEventRight";
								sTempStr += "<span class='" + sPartialClass + "'></span>";
							}

							if(!to.setting.hideEventIcon)
								sTempStr += "<span class='cqavEventIcon "+sIcon+"' style='" + sEventIconStyle + "'></span>";
						
							if(bIsAllDay === false && ((iEventSegIndex === 1 && !bLeftPartial && iNumOfEventElements > 1) || iNumOfEventElements === 1))
								sTempStr += "<span class='cqavEventTime'>" + to.getDateInFormat({"date": dStartDateTime}, "hh:mmsm", to.setting.is24Hour, true) + "</span>";
						
							if(bIsAllDay === false && (iNumOfSegs > 1 || iEventLengthInRow > 1) && !bRightPartial)
								sTempStr += "<span class='cqavEventTimeRight'>" + to.getDateInFormat({"date": dEndDateTime}, "hh:mmsm", to.setting.is24Hour, true) + "</span>";
						
							sTempStr += "<span class='cqavEventTitle'>" + sTitle + "</span>";
						
							sTempStr += "</a>";
						
							sTempStr += "</div>";
						
							$(to.elem).find(".cqavContRow2Main").append(sTempStr);

							var sIdElem = "#"+sEventSegId;
							var oEventTooltip, sDateTime;
							oEventTooltip = {};
							sDateTime = to.getEventDateTimeString(dStartDateTime, dEndDateTime, bIsAllDay, "&&");
							var sArrDateTime = sDateTime.split("&&");
							oEventTooltip.title = sTitle;
							oEventTooltip.startDateTime = sArrDateTime[0];
							oEventTooltip.endDateTime = sArrDateTime[1];
							$(to.elem).find(sIdElem).data("tooltipcontent", oEventTooltip);
						
							if((sURL !== "" && sURL !== null && sURL !== undefined) || to.setting.eventClicked)
							{							
								$(to.elem).find(sIdElem+" .cEventLink").on($.CalenStyle.extra.sClickHandler, {"url": sURL, "eventId": oEvent.calEventId, "eventElemSelector": sIdElem, "view": "QuickAgendaView", "pluginId": to.tv.pluginId}, to.__bindClick);
							}
							//--------------------------- Add Event End -----------------------------
						
							for(var iTempIndex4 = iEventColumn; iTempIndex4 < iMaxColumn; iTempIndex4++)
							{
								bInnerRow[iTempIndex4] = 1;
								iAddedDays++;
							}
						}
						else
							break;
					}
				}
			}
		
			if(to.setting.isTooltipInQuickAgendaView)
				to._addTooltipInQuickAgendaView(".cEventTooltip");
		
			if(to.setting.isDragNDropInQuickAgendaView)
				to._makeEventDraggableInQuickAgendaView(".EventDraggable");
		
			if(to.setting.eventsAddedInView)
				to.setting.eventsAddedInView.call(to, to.setting.visibleView, ".cqavEvent");
		}
		else
			console.log("to._addEventsInMonthView - No Events");
	},

	_adjustEventsInQuickAgendaView: function()
	{
		var to = this;

		var iEventFirstRowTop = 10,
		iEventRowHeight = 20,
		iEventUnitWidth =  $(to.elem).find("cqavTableColumns").width(),
		sArrEventElems = $(to.elem).find(".cqavEvent");
	
		var iRowMaxHeight = to.tv.bAWkRw.length,
		iWeekRowHeight = iEventFirstRowTop + (iRowMaxHeight * iEventRowHeight);

		for(var iElemIndex = 0; iElemIndex < sArrEventElems.length; iElemIndex++)
		{
			var oElem = sArrEventElems[iElemIndex],
			sElemName = $(to.elem).find(oElem).attr("name"),
			sArrElemName = sElemName.split("|"),
		
			iInnerRowIndex = parseInt(sArrElemName[0]),
			iColumnNo = parseInt(sArrElemName[1]),
			iWidthUnits = parseInt(sArrElemName[2]),
		
			iEventTop = iEventFirstRowTop + ((iInnerRowIndex - 1) * iEventRowHeight),
			iEventLeft = $(to.elem).find("#cqavDayColumn"+iColumnNo).position().left + (2 * $.CalenStyle.extra.iBorderOverhead);

			if(iWidthUnits > 1)
			{
				var iEventEndColumnNo = iColumnNo + (iWidthUnits - 1),
				iEventEndColumnLeft = $(to.elem).find("#cqavDayColumn"+iEventEndColumnNo).position().left + (2 * $.CalenStyle.extra.iBorderOverhead),
				iEventEndColumnWidth = $(to.elem).find("#cqavDayColumn"+iEventEndColumnNo).width();
				iEventWidth = (iEventEndColumnLeft + iEventEndColumnWidth) - iEventLeft;
			}
			else
				iEventWidth = $(to.elem).find("#cqavDayColumn"+iColumnNo).width();
			iEventWidth -= (2 * $.CalenStyle.extra.iBorderOverhead);

			$(oElem).css({"left": iEventLeft, "top": iEventTop, "width": iEventWidth});
		
			var $oEventTitle = $(oElem).find(".cqavEventTitle"),
			iEventTitleHeight = $(oElem).height(),
			$oEventIcon = $(oElem).find(".cqavEventIcon"),
			iEventIconWidth = ($oEventIcon !== null) ? $oEventIcon.outerWidth(true) : 0,
			$oEventTime = $(oElem).find(".cqavEventTime"),
			iEventTimeWidth = ($oEventTime !== null) ? $oEventTime.outerWidth(true) : 0,
			iEventTimeWidthRight = 0,
			$oEventTimeRight = $(oElem).find(".cqavEventTimeRight");
			if($oEventTimeRight !== null)
				iEventTimeWidthRight = ($oEventTimeRight !== null) ? $oEventTimeRight.outerWidth(true) : 0;
			var iPartialSymbolWidth = $(oElem).find(".cPartialEventLeft").outerWidth(true) + $(oElem).find(".cPartialEventRight").outerWidth(true);
			var iEventTitleWidth = iEventWidth - (iEventIconWidth + iEventTimeWidth + iEventTimeWidthRight + (10 * $.CalenStyle.extra.iBorderOverhead) + iPartialSymbolWidth);
		
			$oEventTitle.css({"height": iEventTitleHeight, "line-height": iEventTitleHeight + "px", "width": iEventTitleWidth});
			$oEventTime.css({"height": iEventTitleHeight, "line-height": iEventTitleHeight + "px"});
			if($oEventTimeRight !== null)
				$oEventTimeRight.css({"height": iEventTitleHeight, "line-height": iEventTitleHeight + "px"});
		}
	},

	_makeEventContDroppableInQuickAgendaView: function()
	{
		var to = this;
		$(to.elem).find(".cqavTableRow2 .cqavTableColumns").droppable(
		{
			scope: "Events",
		
			over: function(event, ui)
			{
				var oDroppedElem = ui.draggable,
				sEventId = $(to.elem).find(oDroppedElem).attr("id"),
			
				sArrEventId = sEventId.split("-"),
				sId = sArrEventId[1],
				oDraggedEvent = to.getEventWithId(sId),
				sEventClass = "." + "Event" + sArrEventId[1],
				dStartDateTime = null, dEndDateTime = null, bIsAllDay = 0;

				$(to.elem).find(sEventClass).css({"opacity": 0.5});
				
				if(oDraggedEvent.start !== null)
					dStartDateTime = oDraggedEvent.start;
				if(oDraggedEvent.end !== null)
					dEndDateTime = oDraggedEvent.end;
				if(oDraggedEvent.isAllDay !== null)
					bIsAllDay = oDraggedEvent.isAllDay;
			
				var iArrNumOfDays = to.getNumberOfDaysOfEvent(bIsAllDay, dStartDateTime, dEndDateTime, true, false, true),
				iNumOfDays = iArrNumOfDays[0],
				iNumOfHours = iArrNumOfDays[1];
			
				var dNextDate = to._getDateBasedOnLeftPositionInQuickAgendaView(ui.position.left),
				iDroppedDayIndex = to._getDayNumberFromDateInQuickAgendaView(dNextDate);
			
				$(to.elem).find(".cqavTableColumns").removeClass("cActivatedCell");
				for(var iElemIndex = 0; iElemIndex < iNumOfDays; iElemIndex++)
				{
					var iNextDay = iDroppedDayIndex + iElemIndex;
					if(iNextDay <= (to.tv.dAVDt.length - 1))
					{
						$(to.elem).find(".cqavTableRow2 #cqavDayColumn"+iNextDay).addClass("cActivatedCell");
					}
				}
			},
		
			drop: function(event, ui)
			{
				var oDroppedElem = ui.draggable,
				sEventId = $(to.elem).find(oDroppedElem).attr("id"),
			
				sArrEventId = sEventId.split("-"),
				sId = sArrEventId[1],
				oDraggedEvent = to.getEventWithId(sId),
				sEventClass = "." + "Event" + sArrEventId[1],
				dStartDateTime = null, dEndDateTime = null, bIsAllDay = 0;

				if(oDraggedEvent.start !== null)
					dStartDateTime = oDraggedEvent.start;
				if(oDraggedEvent.end !== null)
					dEndDateTime = oDraggedEvent.end;
				if(oDraggedEvent.isAllDay !== null)
					bIsAllDay = oDraggedEvent.isAllDay;
			
				var iNumOfHours = to.getNumberOfDaysOfEvent(bIsAllDay, dStartDateTime, dEndDateTime, true, false)[1];
			
				var iComp = to.compareDates(dEndDateTime, $.CalenStyle.extra.dToday);
				if(iComp > 0)
					$(to.elem).find(sEventClass).css({"opacity": 1});
				else if(iComp < 0)
					$(to.elem).find(sEventClass).css({"opacity": 0.7});
			
				var dDroppedDate = to._getDateBasedOnLeftPositionInQuickAgendaView(ui.position.left),
				dStartDateAfterDrop = null, dEndDateAfterDrop = null;
				dStartDateAfterDrop = to.setDateInFormat({"iDate": {d: dDroppedDate.getDate(), M: dDroppedDate.getMonth(), y: dDroppedDate.getFullYear(), H: dStartDateTime.getHours(), m: dStartDateTime.getMinutes(), s: dStartDateTime.getSeconds()}}, "");
				dEndDateAfterDrop = new Date(dStartDateAfterDrop.getTime() + (dEndDateTime.getTime() - dStartDateTime.getTime()));
			
				if(to.__updateEventWithId(sId, dStartDateAfterDrop, dEndDateAfterDrop))
				{
					to.__addEventsInQuickAgendaView();
					to._adjustEventsInQuickAgendaView();
				}
				else
					console.log("to.__updateEventWithId : false");
				$(to.elem).find(".cqavTableColumns").removeClass("cActivatedCell");
			
				if(to.setting.saveChangesOnEventDrop)
					to.setting.saveChangesOnEventDrop.call(to, oDraggedEvent, dStartDateTime, dEndDateTime, dStartDateAfterDrop, dEndDateAfterDrop);
			}
		});
	},

	_makeEventDraggableInQuickAgendaView: function(sClass)
	{
		var to = this;
		var iEventHeight = $(to.elem).find(".cqavEvent").height(),
		iEventWidth = $(to.elem).find(".cqavTableColumns").width(),
		iTimeSlotWidth = $(to.elem).find(".cqavTableColumns").width() + 2,
	
		iCalendarLeft = $(to.elem).position().left,
		iCalendarMarginLeft = $(to.elem).css("margin-left");
		iCalendarMarginLeft = parseInt(iCalendarMarginLeft.replace("px", ""));
		var iLeft = iCalendarLeft + iCalendarMarginLeft + $(to.elem).find(".cqavContRow2Main").position().left,
		iX1 = iLeft,
		iX2 = iX1 + $(to.elem).find(".cqavContRow2Main").width() - iEventWidth,
	
		iCalendarTop = $(to.elem).position().top,
		iCalendarMarginTop = $(to.elem).css("margin-top");
		iCalendarMarginTop = parseInt(iCalendarMarginTop.replace("px", ""));
		var iY1 = iCalendarTop + iCalendarMarginTop + $(to.elem).find(".cqavContRow2Main").position().top;
		var iY2 = iY1 + $(to.elem).find(".cqavContRow2Main").height() - iEventHeight;
	
		var bCanDrag = false;
		$(to.elem).find(sClass).draggable(
		{
			zIndex: 100,
			scope: "Events",
			//cursorAt: { top: 5, left: 5 },
			grid: [iTimeSlotWidth, 1],
			containment: [iX1, iY1, iX2, iY2],
			cursor: "move",
		
			start: function()
			{
				var elemDragged = this,
				sElemId = $(to.elem).find(elemDragged).attr("id"),
				sArrElemId = sElemId.split("-"),
				sEventId = sArrElemId[1];

				$(to.elem).find(elemDragged).addClass("cEditingEvent");

				$(this).removeClass("cPartialEventLeft cPartialEventRight cPartialEventBoth");
				var oElementClone = $(this).clone();
				$(this).parent().append(oElementClone);
				$(this).css({"width": iEventWidth, "height": iEventHeight});
			},
		
			revert: function()
			{
				return true;
			}
		});
	},

	_addTooltipInQuickAgendaView: function(sClass)
	{
		var to = this;
		$(to.elem).find(sClass).tooltip(
		{
			
			content: function()
			{
				var sTooltipText = "";
				if(to.compareStrings(to.setting.eventTooltipContent, "Default"))
				{
					var oTooltipContent = $(this).data("tooltipcontent");
					if(oTooltipContent.title !== undefined)
						sTooltipText += "<div class='cTooltipTitle'>" + oTooltipContent.title + "</div>";
					if(oTooltipContent.startDateTime !== undefined || oTooltipContent.endDateTime === undefined)
					{
						sTooltipText += "<div class='cTooltipTime'>";
						if(oTooltipContent.startDateTime !== undefined)
							sTooltipText += oTooltipContent.startDateTime;
						if(oTooltipContent.endDateTime !== undefined)
							sTooltipText += ("<br/>" + oTooltipContent.endDateTime);
						sTooltipText += "</div>";
					}
				}
				else
				{
					var sEventId = $(this).attr("id"),
					sId = sEventId.split("-")[1],
					oEventRecord = to.getEventWithId(sId);
					sTooltipText = to.setting.eventTooltipContent.call(to, oEventRecord);
				}
				return sTooltipText;
			},
						
			position:
			{
				my: "center bottom-15",
				at: "center top",
				using: function(position, feedback)
				{
					$(this).css(position);
					$("<div>")
					.addClass("tooltip-arrow")
					.addClass(feedback.vertical)
					.addClass(feedback.horizontal)
					.appendTo(this);
				}
			}/*,
		
			hide:
			{
				delay: 3000000
			}*/
		});
	},

	//----------------------------------------------------------------------------

	_getDateBasedOnLeftPositionInQuickAgendaView: function(iLeftPos)
	{
		var to = this;

		var iDVTableColumnWidth = $(to.elem).find(".cqavTableColumns").width(),
		iArrDVDaysLength = to.tv.fADVDayLftPos.length,
		iTempIndex = 0, iThisIndex = 0;
	
		for(var iTempIndex1 = 0; iTempIndex1 < iArrDVDaysLength; iTempIndex1++)
		{
			var iHoriStartPos = to.tv.fADVDayLftPos[iTempIndex1] - 5,
			iHoriEndPos = iHoriStartPos + iDVTableColumnWidth - 5; 
		
			if(iTempIndex1 === (iArrDVDaysLength - 1))
				iHoriEndPos += 5;
		
			if(iLeftPos >= iHoriStartPos && iLeftPos <= iHoriEndPos)
			{
				iThisIndex = iTempIndex1 + 1;
				break;
			}
		}
	
		for(iTempIndex2 = 0; iTempIndex2 < to.tv.dAVDt.length; iTempIndex2++)
		{
			var dThisDate = to.tv.dAVDt[iTempIndex2];
			if(to.__isDateInCurrentView(dThisDate))
			{
				iTempIndex++;
				if(iTempIndex === iThisIndex)
					return dThisDate;
			}
		}
	},

	_getDayNumberFromDateInQuickAgendaView: function(dThisDate)
	{
		var to = this;
		for(var iTempIndex = 0; iTempIndex < to.tv.dAVDt.length; iTempIndex++)
		{
			if(to.compareDates(dThisDate, to.tv.dAVDt[iTempIndex]) === 0)
				return iTempIndex;
		}
		return -1;
	}

});

/*! ---------------------------------- CalenStyle Quick Agenda View End --------------------------------- */




/*! ---------------------------------- CalenStyle Agenda View Start --------------------------------- */

CalenStyle.prototype = $.extend(CalenStyle.prototype, {

	// Public Method
	updateAgendaView: function(bLoadAllData)
	{
		var to = this;
		var iTempIndex, iEventIndex, dTempViewDate, dTempViewStartDate, dTempViewEndDate, oAEventsForView;

		to.__getCurrentViewDates();
		if(to.compareStrings(to.tv.sLoadType, "Prev"))
			to.tv.dLoadDt = to.tv.dAVDt[0];
		else if(to.compareStrings(to.tv.sLoadType, "Next"))
			to.tv.dLoadDt = to.tv.dAVDt[(to.tv.dAVDt.length - 1)];
	
		to.__parseData(bLoadAllData, function()
		{
			if(to.setting.displayEventsForPeriodInListInAgendaView)
			{
				var oViewDetails = {};
				oViewDetails.viewStartDate = to.tv.dVSDt;
				oViewDetails.viewEndDate = to.tv.dVEDt;
			
				var iEventCount = 0;
				var oDateList = [];
				for(iTempIndex = 0; iTempIndex < to.tv.dAVDt.length; iTempIndex++)
				{
					dTempViewDate = to.tv.dAVDt[iTempIndex];
					dTempViewStartDate = to.setDateInFormat({"date": dTempViewDate}, "START");
					dTempViewEndDate = to.setDateInFormat({"date": dTempViewDate}, "END");
					oAEventsForView = to.getArrayOfEventsForView(dTempViewStartDate, dTempViewEndDate);
					var oDate = {};
					oDate.date = dTempViewStartDate;
				
					var oEventList = [];
					for(iEventIndex = 0; iEventIndex < oAEventsForView.length; iEventIndex++)
					{
						oEventList.push(oAEventsForView[iEventIndex]);
						iEventCount++;
					}
				
					oDate.events = oEventList;
					oDateList.push(oDate);				
				}
			
				oViewDetails.eventCount = iEventCount;
				oViewDetails.eventList = oDateList;
			
				sHTMLElements = to.setting.displayEventsForPeriodInListInAgendaView.call(to, oViewDetails);
				$(to.elem).find(".cListOuterCont").html(sHTMLElements);
			}
			else
			{
				$(to.elem).find(".cListOuterCont").html("<table class='cagvTable'></table>");
			
				var iEventId = 0, sSelectedDateElemId;
				for(iTempIndex = 0; iTempIndex < to.tv.dAVDt.length; iTempIndex++)
				{
					dTempViewDate = to.tv.dAVDt[iTempIndex];
					dTempViewStartDate = to.setDateInFormat({"date": dTempViewDate}, "START");
					dTempViewEndDate = to.setDateInFormat({"date": dTempViewDate}, "END");
					oAEventsForView = to.getArrayOfEventsForView(dTempViewStartDate, dTempViewEndDate);
				
					if(oAEventsForView.length !== 0)
					{
						var sFullDate = to.getDateInFormat({"date": dTempViewStartDate}, "dd-MM-yyyy", false, true);
						var sDateId = "Date-" +  sFullDate;
						var iColspan = to.setting.hideEventIcon ? 3 : 4;
						$(to.elem).find(".cagvTable").append("<tr><td colspan='"+iColspan+"'><div id='" + sDateId + "' class='cagvDate'>" + to.getDateInFormat({"date": dTempViewStartDate}, "DDDD MMM dd yyyy", false, true) + "</div></td></tr>");
					
						if(to.compareDates(dTempViewStartDate, to.setting.selectedDate) === 0)
							sSelectedDateElemId = "#"+sDateId;

						for(iEventIndex = 0; iEventIndex < oAEventsForView.length; iEventIndex++)
						{
							var oEvent = oAEventsForView[iEventIndex];
						
							var dStartDateTime = null, dEndDateTime = null,
							bIsAllDay = 0, sTitle = "",  sURL = "", sEventColor = "";
						
							if(oEvent.start !== null)
								dStartDateTime = oEvent.start;
						
							if(oEvent.end !== null)
								dEndDateTime = oEvent.end;
						
							if(oEvent.isAllDay !== null)
								bIsAllDay = oEvent.isAllDay;
						
							if(oEvent.title !== null)
								sTitle = oEvent.title;
						
							if(oEvent.url !== null)
								sURL = oEvent.url;
						
							var sArrEventDateTime = to.getEventDateTimeDataForAgendaView(dStartDateTime, dEndDateTime, bIsAllDay, dTempViewStartDate),
							sEventDateTime = sArrEventDateTime[0];
							if(sEventDateTime === "")
								sEventDateTime = "All Day";
						
							sEventColor = oEvent.color;
							sEventColor = (to.compareStrings(sEventColor, "") || to.compareStrings(sEventColor, "transparent")) ? "transparent" : "#" + sEventColor;
							var sId = "Event" + (++iEventId),
							sStyleColorHeight = sArrEventDateTime[1],
							sIcon = oEvent.icon || to.setting.eventIcon,
							sEventIconStyle = "background: " + sEventColor + "; ";
						
							var sTempStr = "";
							sTempStr += "<tr id='" + sId + "' class='cagvEvent'>";
							sTempStr += "<td class='cagvEventColor'><span style='background:" + sEventColor + "; height:" + sStyleColorHeight + ";'></span></td>";
							sTempStr += "<td class='cagvEventTime'>" + sEventDateTime + "</td>";
							if(!to.setting.hideEventIcon)
								sTempStr += "<td class='cagvEventIcon'><span class='"+sIcon+"' style='" + sEventIconStyle + "'></span></td>";
							sTempStr += "<td class='cagvEventTitle'><div>" + sTitle + "</div></td>";
							sTempStr += "</tr>";
							$(to.elem).find(".cagvTable").append(sTempStr);
						
							var sIdElem = "#" + sId;
							$(to.elem).find(sIdElem).on($.CalenStyle.extra.sClickHandler, {"url": sURL, "eventId": oEvent.calEventId, "eventElemSelector": sIdElem, "view": "AgendaView", "pluginId": to.tv.pluginId}, to.__bindClick);
						}
					}
				}

				console.log("Scroll To : " + sSelectedDateElemId + " " + $(to.elem).find(sSelectedDateElemId).position().top);
				$(to.elem).find(".cListOuterCont").animate(
				{
					scrollTop: $(to.elem).find(sSelectedDateElemId).position().top
				}, 300);
			}
		
			to._setDateStringsInHeaderOfAgendaView();
		
			if(to.setting.eventListAppended)
				to.setting.eventListAppended.call(to);
		});
	},

	_setDateStringsInHeaderOfAgendaView: function()
	{
		var to = this;
		var sHeader = "";

		if(to.compareStrings(to.setting.agendaViewDuration, "Month"))
		{
			var oSelectedDate = to.getDateInFormat({"date": to.setting.selectedDate}, "object", false, true),
			sHeader = "<span class='cContHeaderLabelMonth'><b>" + to.getDateInFormat({"iDate": oSelectedDate}, "MMMM", false, true) + "</b></span></span>";	
			sHeader += "<span class='cContHeaderLabelYear'>" + to.getNumberStringInFormat(oSelectedDate.y, 0, true) + "</span></span>";	
			
			if(to.setting.modifyHeaderViewLabels)
				to.setting.modifyHeaderViewLabels.call(to, to.tv.dVSDt, to.tv.dVEDt, to.setting.selectedDate, sHeader, to.setting.visibleView);

			$(to.elem).find(".cContHeaderLabel").html(sHeader);
		}
		else
		{
			var oAGVStart = to.getDateInFormat({"date": to.tv.dVSDt}, "object", false, true),
			oAGVEnd = to.getDateInFormat({"date": to.tv.dVEDt}, "object", false, true);
		
			if(to.tv.iNoVDay > 1)
			{
				if(iAGVStartYear === iAGVEndYear)
					sHeader = to.getDateInFormat({"iDate": oAGVStart}, "MMM", false, true) + " " + to.getNumberStringInFormat(oAGVStart.d, 0, true) + "  -  " + to.getDateInFormat({"iDate": oAGVEnd}, "MMM", false, true) + " " + to.getNumberStringInFormat(oAGVEnd.d, 0, true) + ",  " + to.getNumberStringInFormat(oAGVEnd.y, 0, true);
				else
					sHeader = to.getDateInFormat({"iDate": oAGVStart}, "MMM", false, true) + " " + to.getNumberStringInFormat(oAGVStart.d, 0, true) + ",  " + to.getNumberStringInFormat(oAGVStart.y, 0, true) + "  -  " + to.getDateInFormat({"iDate": oAGVEnd}, "MMM", false, true) + " " + to.getNumberStringInFormat(oAGVEnd.d, 0, true) + ",  " + to.getNumberStringInFormat(oAGVEnd.y, 0, true);
			}
			else
				sHeader = to.getDateInFormat({"iDate": oAGVStart}, "DDDD", false, true) + " " + to.getDateInFormat({"iDate": oAGVEnd}, "MMMM", false, true) + " " + to.getNumberStringInFormat(oAGVEnd.d, 0, true) + ",  " + to.getNumberStringInFormat(oAGVEnd.y, 0, true);
		
			if(to.setting.modifyHeaderViewLabels)
				to.setting.modifyHeaderViewLabels.call(to, to.tv.dVSDt, to.tv.dVEDt, to.setting.selectedDate, sHeader, to.setting.visibleView);

			$(to.elem).find(".cContHeaderLabel").html(sHeader);
		}
	},

	// Public Method
	getEventDateTimeDataForAgendaView: function(dEvStartDate, dEvEndDate, bIsAllDay, dThisDate)
	{
		var to = this;
		var sStyleColorHeight = "100%", sDateTimeString = "", sStartTimeString = "", sEndTimeString = "";
		var dThisEndDate = to.setDateInFormat({"iDate": {y: dThisDate.getFullYear(), M: dThisDate.getMonth(), d: (dThisDate.getDate() + 1)}}, "START");
	
		if(bIsAllDay)
		{
			if(to.compareDates(dEvStartDate, dEvEndDate) === 0)
				sDateTimeString = "<span class='cagvEventTimeMiddle cagvEventTimeStrings'>"+to.setting.miscStrings.allDay+"</span>";
			else
				sDateTimeString = "<span class='cagvEventTimeTop cagvEventTimeStrings'>"+to.setting.miscStrings.allDay+"</span><br/><span class='cagvEventTimeBottom cagvEventTimeDuration'>"+ (to.compareStrings(to.setting.duration, "Default") ? to._getDurationBetweenDates(dThisDate, dEvEndDate, "d", false, false) : to.setting.duration.call(to, dThisDate, dEvEndDate, "d")) +"</span>";
		}
		else
		{
			if(to.compareDates(dEvStartDate, dEvEndDate) === 0)
			{
				sStyleColorHeight = "50%";
				sDateTimeString = "<span class='cagvEventTimeTop'>" + to.getDateInFormat({"date": dEvStartDate}, "hh:mm", to.setting.is24Hour, true) + "</span><br/><span class='cagvEventTimeBottom cagvEventTimeDuration'>" + (to.compareStrings(to.setting.duration, "Default") ? to._getDurationBetweenDates(dEvStartDate, dEvEndDate, "dhm", false, false) : to.setting.duration.call(to, dEvStartDate, dEvEndDate, "dhm")) + "</span>";
			}
			else
			{
				var dCompStartDate = (to.compareDateTimes(dEvStartDate, dThisDate) >= 0 && to.compareDateTimes(dEvStartDate, dThisEndDate) <= 0) ? dEvStartDate : dThisDate;
				var dCompEndDate = (to.compareDateTimes(dEvEndDate, dThisEndDate) <= 0) ? dEvEndDate : dThisEndDate;
				var iHours = to._getDurationBetweenDates(dCompStartDate, dCompEndDate, "h", false, true).h;
				if(iHours < 23)
					sStyleColorHeight = "50%";
			
				if(to.compareDates(dEvStartDate, dThisDate) === 0)
					sDateTimeString = "<span class='cagvEventTimeTop'>" + to.getDateInFormat({"date": dEvStartDate}, "hh:mm", to.setting.is24Hour, true) + "</span><br/><span class='cagvEventTimeBottom cagvEventTimeDuration'>" + (to.compareStrings(to.setting.duration, "Default") ? to._getDurationBetweenDates(dEvStartDate, dEvEndDate, "dhm", false, false) : to.setting.duration.call(to, dEvStartDate, dEvEndDate, "dhm")) + "</span>";
				else if(to.compareDates(dEvEndDate, dThisDate) === 0)
					sDateTimeString = "<span class='cagvEventTimeTop cagvEventTimeStrings'>"+to.setting.miscStrings.ends+"</span><br/><span class='cagvEventTimeBottom'>" + to.getDateInFormat({"date": dEvEndDate}, "hh:mm", to.setting.is24Hour, true) + "</span>";
				else
					sDateTimeString = "<span class='cagvEventTimeTop cagvEventTimeStrings'>"+to.setting.miscStrings.allDay+"</span><br/><span class='cagvEventTimeBottom cagvEventTimeDuration'>"+ (to.compareStrings(to.setting.duration, "Default") ? to._getDurationBetweenDates(dThisDate, dEvEndDate, "dhm", false, false) : to.setting.duration.call(to, dThisDate, dEvEndDate, "dhm"))+"</span>";
			}
		}
		return [sDateTimeString, sStyleColorHeight];
	},

	__goToPrevAgendaView: function()
	{
		var to = this;
		if(to.compareStrings(to.setting.agendaViewDuration, "Month"))
		{
			var iMonth = to.tv.dVSDt.getMonth();
			to.tv.dVSDt.setMonth(iMonth - 1);
			to.setting.selectedDate = to.setDateInFormat({"date": to.tv.dVSDt}, "START");
		}
		else
		{
			var iCurrentDateMS = to.tv.dVSDt.getTime();
			if(to.setting.daysInAgendaView === 7)
				iCurrentDateMS -= (to.tv.iNoVDay * $.CalenStyle.extra.iMS.d);
			else
				iCurrentDateMS -= $.CalenStyle.extra.iMS.d;
			to.setting.selectedDate = to.setDateInFormat({"date": new Date(iCurrentDateMS)}, "START");
		}
		to.tv.dLoadDt = to.setDateInFormat({"date": to.setting.selectedDate}, "START");
	
		to.tv.sLoadType = "Prev";
		to.__reloadCurrentView(false, true);
	},

	__goToNextAgendaView: function()
	{
		var to = this;
		if(to.compareStrings(to.setting.agendaViewDuration, "Month"))
		{
			var iMonth = to.tv.dVSDt.getMonth();
			to.tv.dVSDt.setMonth(iMonth + 1);
			to.setting.selectedDate = to.setDateInFormat({"date": to.tv.dVSDt}, "START");
		}
		else
		{
			var iCurrentDateMS = to.tv.dVEDt.getTime();
			iCurrentDateMS += $.CalenStyle.extra.iMS.d;
			to.setting.selectedDate = to.setDateInFormat({"date": new Date(iCurrentDateMS)}, "START");
		}
		to.tv.dLoadDt = to.setDateInFormat({"date": to.setting.selectedDate}, "START");
		to.tv.sLoadType = "Next";
		to.__reloadCurrentView(false, true);
	},

	// Public Method
	adjustAgendaView: function()
	{
		var to = this;
		var icagvCalendarContMaxHeight = $(to.elem).find(".cagvCalendarCont").css("max-height");
		icagvCalendarContMaxHeight = parseInt(icagvCalendarContMaxHeight.replace("px", ""));
		var icagvCalendarContMinHeight = $(to.elem).find(".cagvCalendarCont").css("min-height");
		icagvCalendarContMinHeight = parseInt(icagvCalendarContMinHeight.replace("px", ""));

		if(icagvCalendarContMaxHeight > 0 && $(to.elem).height() > icagvCalendarContMaxHeight)
			$(to.elem).css({"height": icagvCalendarContMaxHeight});
		else if(icagvCalendarContMinHeight > 0 && $(to.elem).height() < icagvCalendarContMinHeight)
			$(to.elem).css({"height": icagvCalendarContMinHeight});
		if(to.tv.iCalHeight !== 0)
			$(to.elem).css({"height": to.tv.iCalHeight});
	
		var iCalendarContWidth = $(to.elem).find(".calendarCont").parent().outerWidth(),
		iCalendarContHeight = $(to.elem).find(".calendarCont").outerHeight();
	
		$(to.elem).find(".calendarContInner").css({"width": iCalendarContWidth, "height": iCalendarContHeight});
		to.__adjustHeader();
	
		iCalendarContHeight -= ($(to.elem).find(".cContHeader").length > 0) ? $(to.elem).find(".cContHeader").outerHeight() : 0;
	
		$(to.elem).find(".cListOuterCont").css({"height": iCalendarContHeight});
		$(to.elem).find(".cagvTable").css({"width": iCalendarContWidth});
	
		var iEventWidth = iCalendarContWidth,
		iEventColorWidth = $(to.elem).find(".cagvEventColor").outerWidth(true),
		oElems = $(to.elem).find(".cagvEventTime span");
		var iMaxWidth = Math.max.apply(null, $(oElems).map(function()
		{
			return $(oElems).outerWidth(true);
		}).get());
		$(to.elem).find(".cagvEventTime").css({"width": iMaxWidth});
	
		var iEventTitleWidth = iEventWidth - (iEventColorWidth + iMaxWidth) - 10;
		$(to.elem).find(".cagvEventTitle").css({"width": iEventTitleWidth});
	},

	_getDurationBetweenDates: function(dStartDate, dEndDate, sFormat, bAllowZero, bReturnObject)
	{
		var to = this;
		var iRem = Math.abs(dEndDate.getTime() - dStartDate.getTime()),
		oFormat = {}, 
		sDuration = "";
	
		for(var iTempIndex = 0; iTempIndex < sFormat.length; iTempIndex++)
			oFormat[sFormat.charAt(iTempIndex)] = 0;	
	
		if(oFormat.y !== undefined)
		{
			oFormat.y = Math.floor(iRem / iMS.y);
			iRem = iRem % iMS.y;
			if(!bReturnObject && oFormat.y !== undefined && (bAllowZero ? true: (oFormat.y !== 0)))
				sDuration += oFormat.y + ((oFormat.y === 1) ? to.setting.durationStrings.y[0]: to.setting.durationStrings.y[1]);
		}
		if(oFormat.M !== undefined)
		{
			oFormat.M = Math.floor(iRem / $.CalenStyle.extra.iMS.m);
			iRem = iRem % $.CalenStyle.extra.iMS.m;
			if(!bReturnObject && oFormat.M !== undefined && (bAllowZero ? true: (oFormat.M !== 0)))
				sDuration += oFormat.M + ((oFormat.M === 1) ? to.setting.durationStrings.M[0]: to.setting.durationStrings.M[1]);
		}
		if(oFormat.w !== undefined)
		{
			oFormat.w = Math.floor(iRem / $.CalenStyle.extra.iMS.w);
			iRem = iRem % $.CalenStyle.extra.iMS.w;
			if(!bReturnObject && oFormat.w !== undefined && (bAllowZero ? true: (oFormat.w !== 0)))
				sDuration += oFormat.w + ((oFormat.w === 1) ? to.setting.durationStrings.w[0]: to.setting.durationStrings.w[1]);
		}
		if(oFormat.d !== undefined)
		{
			oFormat.d = Math.floor(iRem / $.CalenStyle.extra.iMS.d);
			iRem = iRem % $.CalenStyle.extra.iMS.d;
			if(!bReturnObject && oFormat.d !== undefined && (bAllowZero ? true: (oFormat.d !== 0)))
				sDuration += oFormat.d + ((oFormat.d === 1) ? to.setting.durationStrings.d[0]: to.setting.durationStrings.d[1]);
		}
		if(oFormat.h !== undefined)
		{
			oFormat.h = Math.floor(iRem / $.CalenStyle.extra.iMS.h);
			iRem = iRem % $.CalenStyle.extra.iMS.h;
			if(!bReturnObject && oFormat.h !== undefined && (bAllowZero ? true: (oFormat.h !== 0)))
				sDuration += oFormat.h + ((oFormat.h === 1) ? to.setting.durationStrings.h[0]: to.setting.durationStrings.h[1]);
		}
		if(oFormat.M !== undefined)
		{
			oFormat.M = Math.floor(iRem / $.CalenStyle.extra.iMS.m);
			iRem = iRem % $.CalenStyle.extra.iMS.m;
			if(!bReturnObject && oFormat.M !== undefined && (bAllowZero ? true: (oFormat.M !== 0)))
				sDuration += oFormat.M + ((oFormat.M === 1) ? to.setting.durationStrings.M[0]: to.setting.durationStrings.M[1]);			
		}
		if(oFormat.s !== undefined)
		{
			oFormat.s = Math.floor(iRem / iMS.s);
			iRem = iRem % iMS.s;
			if(!bReturnObject && oFormat.s !== undefined && (bAllowZero ? true: (oFormat.s !== 0)))
				sDuration += oFormat.s + ((oFormat.s === 1) ? to.setting.durationStrings.s[0]: to.setting.durationStrings.s[1]);
		}
	
		if(bReturnObject)
			return oFormat;
		else
			return sDuration;
	}

});

/*! ---------------------------------- CalenStyle Agenda View End --------------------------------- */




/*! ---------------------------------- CalenStyle Month Picker Start --------------------------------- */

function CalenStyle_MonthPicker(cso, bIsPopup)
{
	this.showOrHideMonthList = showOrHideMonthListInMonthPicker;

	// Public Method
	function showOrHideMonthListInMonthPicker()
	{
		if($(cso.elem).find(".cmlvOuterCont").length > 0)
			removeMonthListInMonthPicker();
		else
			showMonthListInMonthPicker();
	
		$(document).on($.CalenStyle.extra.sClickHandler+".MonthPicker", function(e)
		{
			removeMonthListInMonthPicker();
		});
	}

	function showMonthListInMonthPicker()
	{
		var sTempStr = "",
		sPopupClass = (bIsPopup) ? "cmlvPopup" : "cmlvFull";	
		sTempStr += "<div class='cmlvOuterCont "+sPopupClass+"'>";	
		sTempStr += "<div class='cmlvCont cmlvThinBorder'>";
		if(bIsPopup)
			sTempStr += "<span class='cmlvContTooltip cmlvContTooltipBottom'></span>";
		sTempStr += "<table class='cmlvMonthListTable'>";
	
		var iCountMonth = 0;
		for(var iMonthIndex = 0; iMonthIndex < 3; iMonthIndex++)
		{
			sTempStr += "<tr>";
			for(var iMonthInnerIndex = 0; iMonthInnerIndex < 4; iMonthInnerIndex++)
			{
				var sMonthId = "cmlvMonth"+iCountMonth;
				if(cso.setting.selectedDate.getMonth() === iCountMonth)
					sTempStr += "<td id='" + sMonthId + "' class='cmlvMonth cmlvMonthCurrent'>" + cso.getDateInFormat({"iDate": {M: iCountMonth}}, "MMM", false, true) + "</td>";
				else
					sTempStr += "<td id='" + sMonthId + "' class='cmlvMonth cmlvMonthOther clickableLink'>" + cso.getDateInFormat({"iDate": {M: iCountMonth}}, "MMM", false, true) + "</td>";
				iCountMonth++;
			}
			sTempStr += "</tr>";
		}
	
		sTempStr += "</table>";
		sTempStr += "</div>";
		sTempStr += "</div>";			
		$(cso.elem).find(".calendarCont").append(sTempStr);
	
		adjustMonthListInMonthPicker();
		if(cso.setting.adjustViewOnWindowResize)
			$(window).bind("resize." + cso.tv.pluginId, function(e){ adjustMonthListInMonthPicker(); });
	
		if(!$.CalenStyle.extra.bTouchDevice)
		{
			$(cso.elem).find(".cmlvMonth").hover(		
				function(e)
				{	
					var iCMLVMonthId = $(this).attr("id");
					iCMLVMonthId = iCMLVMonthId.replace("cmlvMonth", "");
					if(iCMLVMonthId !== cso.setting.selectedDate.getMonth())
						$(this).addClass("cmlvMonthOtherHover");
				},
				function(e)
				{
					var iCMLVMonthId = $(this).attr("id");
					iCMLVMonthId = iCMLVMonthId.replace("cmlvMonth", "");
					if(iCMLVMonthId !== cso.setting.selectedDate.getMonth())
						$(this).removeClass("cmlvMonthOtherHover");
				}
			);
		}
	
		$(cso.elem).find(".cmlvMonth").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
			var sMonthId = $(this).attr("id"),
			iCurMonth = parseInt(sMonthId.replace("cmlvMonth", ""));
			setMonthInMonthPicker(iCurMonth);
		});
	
		$(cso.elem).find(".cmlvOuterCont").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
			showOrHideMonthListInMonthPicker();
		});
	}

	function adjustMonthListInMonthPicker()
	{
		var $occCMLVCont = $(cso.elem).find(".cmlvCont");

		if(bIsPopup)
		{
			var $occCContHeaderLabelMonth = $(cso.elem).find(".cContHeaderLabelMonth"),
			iCMLVContHalfWidth = $occCMLVCont.width() / 2,
			iCMLVContTop =  $(cso.elem).find(".calendarContInner").position().top + $occCContHeaderLabelMonth.height() + 4,
			iContHeaderLabelWidth = $occCContHeaderLabelMonth.width(),
			iContHeaderLabelLeft = $occCContHeaderLabelMonth.position().left || $(cso.elem).find(".cContHeaderLabelOuter").position().left,
			iContHeaderLabelMid = iContHeaderLabelLeft + (iContHeaderLabelWidth / 2),
			iCMLVContLeft = $(cso.elem).find(".calendarContInner").position().left + (iContHeaderLabelMid - iCMLVContHalfWidth) - 4;
			iCMLVContLeft = (iCMLVContLeft < 0) ? 2 : iCMLVContLeft;
			$occCMLVCont.css({"top": iCMLVContTop, "left": iCMLVContLeft});
			$(".cmlvContTooltipBottom").css({"left": (iCMLVContHalfWidth - 5)});
		}
	
		if($(cso.elem).find(".cContHeader").length > 0)
			$occCMLVCont.css({"font-size": $(cso.elem).find(".cContHeader").css("font-size")});
		else
			$occCMLVCont.css({"font-size": $(cso.elem).css("font-size")});
		cso.setCalendarBorderColor();
	}

	function removeMonthListInMonthPicker()
	{
		if(cso.setting.adjustViewOnWindowResize)
			$(window).unbind("resize." + cso.tv.pluginId, adjustMonthListInMonthPicker);
		$(cso.elem).find(".cmlvOuterCont").remove();
	}

	function setMonthInMonthPicker(iCurMonth)
	{
		var iPrevMonthNum = cso.setting.selectedDate.getMonth();
		$(cso.elem).find("#cmlvMonth"+iPrevMonthNum).removeClass("cmlvMonthCurrent cmlvMonthOtherHover").addClass("cmlvMonthOther " +"clickableLink");
	
		cso.setting.selectedDate.setDate(1);
		cso.setting.selectedDate.setMonth(iCurMonth);
		cso.tv.dLoadDt = cso.setDateInFormat({"date": cso.setting.selectedDate}, "START");
	
		if(iCurMonth === (iPrevMonthNum - 1))
			cso.tv.sLoadType = "Prev";
		else if(iCurMonth === (iPrevMonthNum + 1))
			cso.tv.sLoadType = "Next";
		else
			cso.tv.sLoadType = "Load";
		
		cso.modifyCalenStyleObject(cso);
		$(cso.elem).find("#cmlvMonth"+iCurMonth).removeClass("cmlvMonthOther clickableLink cmlvMonthOtherHover").addClass("cmlvMonthCurrent");
		removeMonthListInMonthPicker();
	
		setTimeout(function()
		{
			if(cso.compareStrings(cso.setting.visibleView, "AgendaView"))
			{
				cso.updateAgendaView(true);
				cso.adjustAgendaView();
			}
			else
			{
				cso.updateMonthTableAndContents(true);
				cso.adjustMonthTable();
			}
		}, cso.setting.transitionSpeed);
	}

}

/*! ---------------------------------- CalenStyle Month Picker End --------------------------------- */


/*! ---------------------------------- CalenStyle Year Picker Start --------------------------------- */

function CalenStyle_YearPicker(cso, bIsPopup)
{
	this.showOrHideYearList = showOrHideYearListInYearPicker;
	var iCYLVStartYear, iCYLVEndYear,
	bNextClicked = false, bPrevClicked = false;

	// Public Method
	function showOrHideYearListInYearPicker()
	{
		if($(cso.elem).find(".cylvOuterCont").length > 0)
			removeYearListInYearPicker();
		else 
			showYearListInYearPicker();
		$(document).on($.CalenStyle.extra.sClickHandler+".YearPicker", function(e)
		{
			removeYearListInYearPicker();
		});
	}

	function showYearListInYearPicker()
	{
		var iCurrentDateYear = cso.setting.selectedDate.getFullYear();
		iCYLVStartYear = iCurrentDateYear - 5;
		iCYLVEndYear = iCYLVStartYear + 12;
	
		var sTempStr = "",
		sPopupClass = (bIsPopup) ? "cylvPopup" : "cylvFull";	
		sTempStr += "<div class='cylvOuterCont "+sPopupClass+"'>";	
		sTempStr += "<div class='cylvCont cylvThinBorder'>";
		if(bIsPopup)	
			sTempStr += "<span class='cylvContTooltip cylvContTooltipBottom'></span>";
		sTempStr += "<table class='cylvYearListOuterTable'>";	
		sTempStr += "<tr class='cylvTableHeaderRow'>";	
		sTempStr += "<td class='cylvTableColumns cylvPrevYears clickableLink icon-Prev'></td>";
		sTempStr += "<td class='cylvTableColumns cylvSelectedYear clickableLink'>" + cso.getNumberStringInFormat(iCurrentDateYear, 0, true) + "</td>";
		sTempStr += "<td class='cylvTableColumns cylvNextYears clickableLink icon-Next'></td>";
		sTempStr += "</tr>";	
		sTempStr += "<tr class='cylvTableContRow'>";	
		sTempStr += "<td colspan='3'>";	
		sTempStr += "<table class='cylvYearListTable cylvYearListTableMain'>";	
		sTempStr += "</table>";	
		sTempStr += "</td>";	
		sTempStr += "</tr>";	
		sTempStr += "</table>";	
		sTempStr += "</div>";	
		sTempStr += "</div>";
		$(cso.elem).find(".calendarCont").append(sTempStr);
	
		$(cso.elem).find(".cylvPrevYears").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
			goToPrevYearListInYearPicker();
		});
	
		$(cso.elem).find(".cylvSelectedYear").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
			showCurrentYearInYearPicker();
		});
	
		$(cso.elem).find(".cylvNextYears").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
			goToNextYearListInYearPicker();
		});
	
		adjustYearListInYearPicker();
		if(cso.setting.adjustViewOnWindowResize)
			$(window).bind("resize." + cso.tv.pluginId, function(e){ adjustYearListInYearPicker(); });
	
		if(!$.CalenStyle.extra.bTouchDevice)
		{
			$(cso.elem).find(".cylvPrevYears, .cylvNextYears").hover(	
				function(e)
				{
					$(this).addClass("cylvTableColumnsHover");
				},
				function(e)
				{
					$(this).removeClass("cylvTableColumnsHover");
				}	
			);
			
			$(cso.elem).find(".cylvSelectedYear").hover(	
				function(e)
				{
					$(this).addClass("cylvSelectedYearHover");
				},
				function(e)
				{
					$(this).removeClass("cylvSelectedYearHover");
				}	
			);
		}
		updateYearListInYearPicker();
	
		$(cso.elem).find(".cylvOuterCont").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
			showOrHideYearListInYearPicker();
		});
	}

	function adjustYearListInYearPicker()
	{
		var $occCYLVCont = $(cso.elem).find(".cylvCont");

		if(bIsPopup)
		{
			var $occCContHeaderLabelYear = $(cso.elem).find(".cContHeaderLabelYear"),
			iCYLVContHalfWidth = $occCYLVCont.width() / 2,
			iCYLVContTop = $(cso.elem).find(".calendarContInner").position().top + $occCContHeaderLabelYear.height() + 4,
			iContHeaderLabelWidth = $occCContHeaderLabelYear.width(),
			iContHeaderLabelLeft = ($occCContHeaderLabelYear.position().left || $(cso.elem).find(".cContHeaderLabelOuter").position().left),
			iContHeaderLabelMid = iContHeaderLabelLeft + (iContHeaderLabelWidth / 2),
			iCYLVContLeft = $(cso.elem).find(".calendarContInner").position().left + (iContHeaderLabelMid - iCYLVContHalfWidth) - 4;
			iCYLVContLeft = (iCYLVContLeft < 0) ? 2 : iCYLVContLeft;
			$occCYLVCont.css({"top": iCYLVContTop, "left": iCYLVContLeft});
			$(".cylvContTooltipBottom").css({"left": (iCYLVContHalfWidth - 5)});
		}
	
		if($(cso.elem).find(".cContHeader").length > 0)
			$occCYLVCont.css({"font-size": $(cso.elem).find(".cContHeader").css("font-size")});
		else
			$occCYLVCont.css({"font-size": $(cso.elem).css("font-size")});
		cso.setCalendarBorderColor();
	}

	function updateYearListInYearPicker()
	{
		var iCurrentDateYear = cso.setting.selectedDate.getFullYear(),
		iCountYear = 0, sTempStr = "";	
		for(var iYearIndex = iCYLVStartYear; iYearIndex < iCYLVEndYear; iYearIndex++)
		{
			if(iCountYear === 0 || iCountYear === 4 || iCountYear === 8)
				sTempStr += "<tr class='cylvTableRow'>";
		
			var sYearId = "cylvYear"+iYearIndex;	
			if(iCurrentDateYear === iYearIndex)
				sTempStr += "<td id='" + sYearId + "' class='cylvYear cylvYearCurrent'>" + cso.getNumberStringInFormat(iYearIndex, 0, true) + "</td>";
			else
				sTempStr += "<td id='" + sYearId + "' class='cylvYear cylvYearOther clickableLink'>" + cso.getNumberStringInFormat(iYearIndex, 0, true) + "</td>";
		
			if(iCountYear === 3 || iCountYear === 7 || iCountYear === 11)
				sTempStr += "</tr>";
		
			iCountYear++;
		}
		$(cso.elem).find(".cylvYearListTableMain").html(sTempStr);
		
		$(cso.elem).find(".cylvYear").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
		
			var sYearId = $(this).attr("id"),
			iCurYear = parseInt(sYearId.replace("cylvYear", ""));
			setYearInYearPicker(iCurYear);
		});
		
		if(!$.CalenStyle.extra.bTouchDevice)
		{
			$(cso.elem).find(".cylvYear").hover(		
				function(e)
				{	
					if($(this).html() !== cso.setting.selectedDate.getFullYear())
						$(this).addClass("cylvYearOtherHover");
				},
				function(e)
				{
					if($(this).html() !== cso.setting.selectedDate.getFullYear())
						$(this).removeClass("cylvYearOtherHover");
				}
			);
		}
	}

	function removeYearListInYearPicker()
	{
		if(cso.setting.adjustViewOnWindowResize)
			$(window).unbind("resize." + cso.tv.pluginId, adjustYearListInYearPicker);
		$(cso.elem).find(".cylvOuterCont").remove();
	}

	function setYearInYearPicker(iCurYear)
	{
		var iPrevYearNum = cso.setting.selectedDate.getFullYear();
		$(cso.elem).find("#cylvYear"+iPrevYearNum).removeClass("cylvYearCurrent cylvYearOtherHover").addClass("cylvYearOther");
	
		cso.tv.sLoadType = "Load";
		cso.setting.selectedDate.setFullYear(iCurYear);
		cso.tv.dLoadDt = cso.setDateInFormat({"date": cso.setting.selectedDate}, "START");
	
		cso.modifyCalenStyleObject(cso);	
		$(cso.elem).find("#cylvYear"+iCurYear).removeClass("cylvYearOther cylvYearOtherHover").addClass("cylvYearCurrent");	
		removeYearListInYearPicker();
	
		setTimeout(function()
		{
			if(cso.compareStrings(cso.setting.visibleView, "AgendaView"))
			{
				cso.updateAgendaView(true);
				cso.adjustAgendaView();
			}
			else
			{
				cso.updateMonthTableAndContents(true);
				cso.adjustMonthTable();
			}
		}, cso.setting.transitionSpeed);
	}

	function goToPrevYearListInYearPicker()
	{
		$(cso.elem).find(".cylvPrevYears").addClass("cylvTableColumnsHover");
	
		var $oElemCYLVYearListTable = $(cso.elem).find(".cylvYearListTableMain"),
		iCYLVTableTop = $oElemCYLVYearListTable.position().top,
		iCYLVTableLeft = $oElemCYLVYearListTable.position().left,
		iCYLVTableWidth = $oElemCYLVYearListTable.width(),
		iCYLVTableHeight = $oElemCYLVYearListTable.height();
	
		var newElem = $oElemCYLVYearListTable.clone();
		$(newElem).removeClass("cylvYearListTableMain").addClass("cylvYearListTableTemp");
		$(newElem).css({"position": "absolute", "top": iCYLVTableTop, "left": iCYLVTableLeft, "height": iCYLVTableHeight});
		$oElemCYLVYearListTable.parent().append(newElem);
	
		iCYLVTableLeft = iCYLVTableLeft + iCYLVTableWidth;
		$(newElem).animate({"left": iCYLVTableLeft}, cso.setting.transitionSpeed);
	
		setTimeout(function()
		{
			$(cso.elem).find(".cylvYearListTableTemp").remove();
		}, cso.setting.transitionSpeed);
	
		$(cso.elem).find(".cylvPrevYears").removeClass("cylvTableColumnsHover");
	
		iCYLVStartYear = iCYLVStartYear - 12;
		iCYLVEndYear = iCYLVStartYear + 12;
	
		updateYearListInYearPicker();
	}

	function goToNextYearListInYearPicker()
	{
		$(cso.elem).find(".cylvNextYears").addClass("cylvTableColumnsHover");
	
		var $oElemCYLVYearListTable = $(cso.elem).find(".cylvYearListTableMain"),
		iCYLVTableTop = $oElemCYLVYearListTable.position().top,
		iCYLVTableLeft = $oElemCYLVYearListTable.position().left,
		iCYLVTableWidth = $oElemCYLVYearListTable.width(),
		iCYLVTableHeight = $oElemCYLVYearListTable.height();
	
		var newElem = $oElemCYLVYearListTable.clone();
		$(newElem).removeClass("cylvYearListTableMain").addClass("cylvYearListTableTemp");
		$(newElem).css({"position": "absolute", "top": iCYLVTableTop, "left": iCYLVTableLeft, "height": iCYLVTableHeight});
		$oElemCYLVYearListTable.parent().append(newElem);
	
		iCYLVTableLeft = iCYLVTableLeft - iCYLVTableWidth;
		$(newElem).animate({"left": iCYLVTableLeft}, cso.setting.transitionSpeed);
	
		setTimeout(function()
		{
			$(cso.elem).find(".cylvYearListTableTemp").remove();
		}, cso.setting.transitionSpeed);
	
		$(cso.elem).find(".cylvNextYears").removeClass("cylvTableColumnsHover");
	
		iCYLVStartYear = iCYLVStartYear + 12;
		iCYLVEndYear = iCYLVStartYear + 12;
	
		updateYearListInYearPicker();
	}

	function showCurrentYearInYearPicker()
	{
		var iCYLVPrevStartYear = iCYLVStartYear;
	
		var iCurrentDateYear = cso.setting.selectedDate.getFullYear();
		iCYLVStartYear = iCurrentDateYear - 5;
		iCYLVEndYear = iCYLVStartYear + 12;
	
		if(iCYLVPrevStartYear !== iCYLVStartYear)
		{
			$(cso.elem).find(".cylvSelectedYear").addClass("cylvTableColumnsClick");
		
			var $oElemCYLVYearListTable = $(cso.elem).find(".cylvYearListTableMain"),
			iCYLVTableTop = $oElemCYLVYearListTable.position().top,
			iCYLVTableLeft = $oElemCYLVYearListTable.position().left,
			iCYLVTableWidth = $oElemCYLVYearListTable.width(),
			iCYLVTableHeight = $oElemCYLVYearListTable.height();
		
			var newElem = $oElemCYLVYearListTable.clone();
			$(newElem).removeClass("cylvYearListTableMain").addClass("cylvYearListTableTemp");
			$(newElem).css({"position": "absolute", "top": iCYLVTableTop, "left": iCYLVTableLeft, "height": iCYLVTableHeight});
			$oElemCYLVYearListTable.parent().append(newElem);
		
			if(iCYLVPrevStartYear < iCYLVStartYear)
				iCYLVTableLeft = iCYLVTableLeft - iCYLVTableWidth;
			else
				iCYLVTableLeft = iCYLVTableLeft + iCYLVTableWidth;
			$(newElem).animate({"left": iCYLVTableLeft}, cso.setting.transitionSpeed);
		
			setTimeout(function()
			{
				$(cso.elem).find(".cylvYearListTableTemp").remove();
			}, cso.setting.transitionSpeed);
		
			$(cso.elem).find(".cylvSelectedYear").removeClass("cylvTableColumnsClick");
			updateYearListInYearPicker();					
		}
	}

}

/*! ---------------------------------- CalenStyle Year Picker End --------------------------------- */

