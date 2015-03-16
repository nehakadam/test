/*! ----------------------------------------------------------------------------- 

  CalenStyle - Modern Event Calendar
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

$.CalenStyle = $.CalenStyle || 
{
	name: "CalenStyle",

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
		slotTooltipContent: function(oSlotAvailability)
		{
			if(oSlotAvailability.status === "Available")
				return "Book Now";
			else if(oSlotAvailability.status === "Booked")
				return "";
		},
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
			DatePickerIcon: "<span class='cContHeaderButton cContHeaderDatePickerIcon clickableLink icon-Calendar'></span>",
			FullscreenButton: function(bIsFullscreen)
			{
				var sIconClass = (bIsFullscreen) ? "icon-Contract" : "icon-Expand";
				return "<span class='cContHeaderButton cContHeaderFullscreen clickableLink "+ sIconClass +"'></span>";
			},
			PreviousButton: "<span class='cContHeaderButton cContHeaderNavButton cContHeaderPrevButton clickableLink icon-Prev'></span>",
			NextButton: "<span class='cContHeaderButton cContHeaderNavButton cContHeaderNextButton clickableLink icon-Next'></span>",
			TodayButton: "<span class='cContHeaderButton cContHeaderToday clickableLink'>Today</span>",
			HeaderLabel: "<span class='cContHeaderLabelOuter'><span class='cContHeaderLabel'></span></span>",
			HeaderLabelWithDropdownMenuArrow: "<span class='cContHeaderLabelOuter clickableLink'><span class='cContHeaderLabel'></span><span class='cContHeaderButton cContHeaderDropdownMenuArrow'></span></span>",
			MenuSegmentedTab: "<span class='cContHeaderMenuSegmentedTab'></span>",
			MenuDropdownIcon: "<span class='cContHeaderButton cContHeaderMenuButton clickableLink'>&#9776;</span>"
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
		is24Hour: false,
		inputDateTimeFormat: "dd-MM-yyyy HH:mm:ss",
	
		eventDuration: 30, // In minutes
		allDayEventDuration: 1, // In days
	
		timeIndicatorUpdationInterval: 1,
		unitTimeInterval: 30, // [5, 10, 15, 20, 30]
		timeLabels: "Hour", // ["Hour", "All"]
	
		inputTZOffset: "+05:30",
		tz: "Asia/Calcutta", // For Google Calendar
		outputTZOffset: "+05:30",
	
		weekStartDay: 1,
		weekNumCalculation: "US", // ["US", "Europe/ISO"]
		daysInCustomView: 4,
		daysInDayListView: 7,
		daysInAppointmentView: 4,
	
		agendaViewDuration: "Month", // ["Month", "Week", "CustomDays"]
		daysInAgendaView: 15,

		quickAgendaViewDuration: "Week", // ["Week", "CustomDays"]
		daysInQuickAgendaView: 7,
	
		transitionSpeed: 600,
		showTransition: false,
	
		fixedNumOfWeeksInMonthView: false,
		displayWeekNumInMonthView: false,
		actionOnDayClickInMonthView: "ModifyEventList", // ["ModifyEventList", "ChangeDate", "DisplayEventListDialog", "CallbackFunction"]
	
		eventIndicatorInMonthView: "Events", // ["DayHighlight", "Events", "Custom"]
		eventIndicatorInDayListView: "DayHighlight", // ["DayHighlight", "Custom"]
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
	
		actionBarHeight: 30,
		filterBarPosition: "Top", // ["Top", "Bottom", "Left", "Right"]
		filterBarHeight: 200,
		filterBarWidth: 200,
		eventFilterCriteria: [],
		noneSelectedFilterAction: "SelectNone", //["SelectNone", "SelectAll"]
	
		calendarBorderColor: "FFFFFF",
		changeCalendarBorderColorInJS: false,
	
		// Events-specific properties
	
		extraMonthsForDataLoading: 1,
		deleteOldDataWhileNavigating: true,
		datasetModificationRule: "Default", //["Default", "ReplaceAll", "ReplaceSpecified"]
		changeColorBasedOn: "EventCalendar", // ["Event", "EventCalendar", "EventSource"]
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
				day: 0,
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
		displayEventsForPeriodInList: null,
		displayEventsForPeriodInListInAgendaView: null,
		eventListAppended: null,
		// Event Dialog related Callbacks
		displayEventListDialog: null,
		eventInADialogClicked: null,
	
		// Events and Appointment Time Slots related Callbacks
		eventsAddedInView: null,
		timeSlotsAddedInView: null, // For Appointment View
		eventClicked: null,
		timeSlotClicked: null,
		saveChangesOnEventDrop: null,
		saveChangesOnEventResize: null,
	
		modifyFilterBarView: null,
		modifyActionBarView: null
		//------------------ Callback Functions End --------------------------
	},

	tempDefaults: // Temporary Variables For Calculation Specific to CalenStyle Instance
	{
		sLoadType: "Load", 
		iLoadCnt: 0, // iLoadCounter
		dLoadDt: new Date(), // LoadDate
		bViewLoaded: false, // bViewLoaded
		dHighlightDPV: [], // dArrDatesToHighlightInDatePickerView
	
		bDisFBar: false, // bDisplayFilterBar
		bDisMenu: false, // bDisplayViewSelectionMenu
	
		iMaxEvId: 0, // iMaxEventId
		oAEvents: [], // oArrEvents
		oASmEvSeg: [], // oArrSmallEventSegments
		oAADEvSeg: [], // oArrAllDayEventSegments
		oASrcCnt: [], // oArrSourceCount
		oABlockTm: [], // oArrBlockedTime
		oASltAvail: [], // oArrSlotAvailability
		oAEvTskStatus: [], // oArrEventOrTaskStatus
		oAECalendar: [], // oArrEventCalendar
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
	
		dAVDt: [], // dArrViewDates
		dAVDDt: [], // dArrViewDisplayDates
		iNoVDay: 0, // iNumberOfViewDays
		iNoVDayDis: 0, // iNumberOfViewDaysToDisplay
		iSelDay: 0,
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
	
		bCMVDisEvLst: false, // bCMVDisplayEventList
		bDisABar: false, // bDisplayActionBar
		oAEvFltrCnt: [], // oArrEventFilterCount
	
		iCalHeight: 0, // iCalendarHeight
		bDyClDLV: false // bDayClickedInDayListView
	},

	extra: // Common Temporary Variables
	{
		iCalenStyleObjCount: 0,
		iBorderOverhead: 1,
		iEventHeightOverhead: 4,
		dToday: new Date(),
		iMS: { m: 6E4, h: 36E5, d: 864E5, w: 6048E5 },
		sArrInputDateTimeFormats: ["DateObject", "UnixTimestamp", "ISO8601", "ISO8601Compact", "dd-MM-yyyy hh:mm:ss AA", "dd-MM-yyyy HH:mm:ss", "MM-dd-yyyy hh:mm:ss AA", "MM-dd-yyyy HH:mm:ss", "yyyy-MM-dd hh:mm:ss AA", "yyyy-MM-dd HH:mm:ss"],
		sArrViewsTypes: ["DetailedMonthView", "MonthView", "WeekView", "DayView", "AgendaView", "QuickAgendaView", "CustomView", "DayEventListView", "DayEventDetailView", "AppointmentView", "DatePicker"],
		bTouchDevice: ("ontouchstart" in document.documentElement ? true : false),
		sClickHandler: ("ontouchstart" in document.documentElement ? "click" : "click"),
		sClickHandlerButtons: ("ontouchstart" in document.documentElement ? "touchstart" : "click"),
		oArrCalenStyle: []
	}
};

// --------------------------------- Global Variables End --------------------------------------

;(function ($, window, document, Hammer, undefined) 
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

})(jQuery, window, document, Hammer);

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

/*! -------------------------------------- Common Functions Start -------------------------------------- */

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
		if(bLoadData || (to.tv.bGCData && sPrevTZ !== sTZ))
			to.reloadData();
		else if(sPrevTZD !== sTZD)
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

			for(iTempIndex = 0; iTempIndex < to.tv.oASltAvail.length; iTempIndex++)
			{
				var oSlot = to.tv.oASltAvail[iTempIndex];
				if(!oSlot.isAllDay)
				{
					oSlot.start = to.normalizeDateTimeWithOffset(oSlot.start, sPrevTZD, sTZD);
					oSlot.end = to.normalizeDateTimeWithOffset(oSlot.end, sPrevTZD, sTZD);
				}
			}

			// Since a record in to.tv.oAEvTskStatus has Date field there is no need to convert it to output timezone 

			to.refreshView();					
		}
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

	__setHoverClass: function($oElem, sClass)
	{
		$oElem.on("touchstart", function(e)
		{
			$oElem.addClass(sClass);
		});

		$oElem.on("touchend", function(e)
		{
			$oElem.removeClass(sClass);
		});
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
		var sTimeToDisplay = "Array", iTempIndex;
	
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
		var dArrTempBlockedTimes = [], iTempIndex;
	
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
			
				if(to.compareDateTimes(new Date(dArrTempTimes1[0]), new Date(dArrTempTimes2[0])) === 0)
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
			if(oThisDate.D === parseInt(oTempBusinessHours.day))
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
	
		//console.log(dThisDate);
		//console.log(oArrTempBusinessHours);
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
		if(to.setting.viewsToDisplay.length > 1)
		{
			for(iTempIndex1 = 0; iTempIndex1 < to.setting.viewsToDisplay.length; iTempIndex1++)
			{
				var oViewToDisplay = to.setting.viewsToDisplay[iTempIndex1],
				sViewName = oViewToDisplay.viewName || "";
				if(to.compareStrings(sViewName, to.setting.visibleView))
					to.tv.bDisMenu = true;
			}
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
				var iWidth = eDiv.offsetWidth - eDiv.clientWidth;
				document.body.removeChild(eDiv);
				iScrollbarWidth =  iWidth;
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
		$oCalendarCont.removeClass("cmvCalendarCont cdvCalendarCont cdlvCalendarCont cagvCalendarCont cavCalendarCont cqavCalendarCont");
		$oCalendarCont.html("");
		$oCalendarCont.css({"width": "100%", "height": "100%"});
		$oCalendarCont.removeClass("cmvCalendarContWithBorders");

		if(to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DetailedMonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
		{
			$oCalendarCont.addClass("cmvCalendarCont");

			if(!to.compareStrings(to.setting.visibleView, "DatePicker"))
				$oCalendarCont.addClass("cmvCalendarContWithBorders");
		}
		else if(to.compareStrings(to.setting.visibleView, "DayEventListView"))
		{
			$oCalendarCont.addClass("cdlvCalendarCont");
		
			to.tv.iNoVDay = to.setting.daysInDayListView;			
			if(to.tv.iNoVDay === 7 && to.setting.excludeNonBusinessHours)
				to.tv.iNoVDay -= (to.tv.iNoVDay - to.tv.iBsDays);
			to.tv.iSelDay = Math.floor(to.tv.iNoVDay / 2);			
			to.tv.iNoVDayDis = 1;
		}
		else if(to.compareStrings(to.setting.visibleView, "AppointmentView"))
		{
			$oCalendarCont.addClass("cavCalendarCont");
		
			to.tv.iNoVDay = to.setting.daysInAppointmentView;
			if(to.tv.iNoVDay === 7 && to.setting.excludeNonBusinessHours)
				to.tv.iNoVDay -= (to.tv.iNoVDay - to.tv.iBsDays);
			to.tv.iNoVDayDis = to.tv.iNoVDay;
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
			else if(to.compareStrings(to.setting.visibleView, "CustomView"))
			{
				to.tv.iNoVDay = to.setting.daysInCustomView;
				if(to.tv.iNoVDay === 7 && to.setting.excludeNonBusinessHours)
					to.tv.iNoVDay -= (to.tv.iNoVDay - to.tv.iBsDays);
				to.tv.iNoVDayDis = to.tv.iNoVDay;
			}
			else if(to.compareStrings(to.setting.visibleView, "DayEventDetailView"))
			{
				to.tv.iNoVDay = to.setting.daysInDayListView;
				if(to.tv.iNoVDay === 7 && to.setting.excludeNonBusinessHours)
					to.tv.iNoVDay -= (to.tv.iNoVDay - to.tv.iBsDays);
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
			sTempStr += "<li id='cContHeaderMenuDatePicker' name='DatePicker' class='cContHeaderButton clickableLink'>Date Picker</li>";
	
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
				else if(to.compareStrings(sViewName, "DayView") || to.compareStrings(sViewName, "DayEventListView") || to.compareStrings(sViewName, "DayEventDetailView"))
					sViewNameDisplay = "Day";
				else if(to.compareStrings(sViewName, "CustomView"))
					sViewNameDisplay = to.setting.daysInCustomView + " Days";
				else if(to.compareStrings(sViewName, "QuickAgendaView"))
					sViewNameDisplay = "Quick Agenda";
				else if(to.compareStrings(sViewName, "AppointmentView"))
					sViewNameDisplay = "Appointment";
				else if(to.compareStrings(sViewName, "AgendaView"))
					sViewNameDisplay = "Agenda";				
			}
		
			sTempStr += "<li id='"+("cContHeaderMenu"+sViewName)+"' name='" + sViewName + "' class='cContHeaderButton clickableLink'>" + sViewNameDisplay + "</li>";
		}

		if(to.setting.dropdownMenuElements.length > 1 && to.compareStrings(to.setting.dropdownMenuElements[1], "DatePicker"))
			sTempStr += "<li id='cContHeaderMenuDatePicker' name='DatePicker' class='cContHeaderButton clickableLink'>Date Picker</li>";

		sTempStr += "</ul>";

		return sTempStr;
	},

	_refreshHeader: function()
	{
		var to = this;
	
		if($(to.elem).find(".cContHeader").length > 0)
			$(to.elem).find(".cContHeader").html(to._addContHeader());
		to._addMenuItemsInSegmentedTab();
		to._addEventsToHeaderElements();
		to._adjustViewSelectionMenu();
	},

	_addEventsToHeaderElements: function()
	{
		var to = this;

		$(to.elem).find(".cContHeaderMenuDropdown .cContHeaderMenuSections li").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
		});
	
		$(to.elem).find(".cContHeaderPrevButton").on($.CalenStyle.extra.sClickHandlerButtons, function(e)
		{
			e.stopPropagation();

			if($.CalenStyle.extra.bTouchDevice)
				$(this).addClass("cContHeaderButtonActive");
			to.navigateToPrevView();
		});

		$(to.elem).find(".cContHeaderPrevButton").on("touchend touchcancel", function(e) 
		{
			e.stopPropagation();
			setTimeout(function()
			{
				$(to.elem).find(".cContHeaderPrevButton").removeClass("cContHeaderButtonActive");
			}, 0);        	
    	});

		$(to.elem).find(".cContHeaderNextButton").on($.CalenStyle.extra.sClickHandlerButtons, function(e)
		{
			e.stopPropagation();
			if($.CalenStyle.extra.bTouchDevice)
				$(this).addClass("cContHeaderButtonActive");
			to.navigateToNextView();
		})

		$(to.elem).find(".cContHeaderNextButton").on("touchend touchcancel", function(e) 
		{
			e.stopPropagation();
			setTimeout(function()
			{
				$(to.elem).find(".cContHeaderNextButton").removeClass("cContHeaderButtonActive");
			}, 0);        	
    	});
	
		$(to.elem).find(".cContHeaderToday").html(to.getNumberStringInFormat($.CalenStyle.extra.dToday.getDate(), 0, true));
		$(to.elem).find(".cContHeaderToday").on($.CalenStyle.extra.sClickHandlerButtons, function(e)
		{
			e.stopPropagation();
			if($.CalenStyle.extra.bTouchDevice)
				$(this).addClass("cContHeaderButtonActive");
			to.navigateToToday();
		});

		$(to.elem).find(".cContHeaderToday").on("touchend touchcancel", function(e) 
		{
			e.stopPropagation();
			setTimeout(function()
			{
				$(to.elem).find(".cContHeaderToday").removeClass("cContHeaderButtonActive");
			}, 0);        	
    	});
	
		to._addEventsForMenu();
	
		$(to.elem).find(".cContHeaderMenuButton").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
			if($.CalenStyle.extra.bTouchDevice)
				$(this).addClass("cContHeaderButtonActive");
			if($(to.elem).find(".cContHeaderMenuDropdown").length > 0)
				to._collapseSubmenu();
			else
				to._expandSubmenu();
		});
	
		$(to.elem).find(".cContHeaderDatePickerIcon").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			e.stopPropagation();
			if($.CalenStyle.extra.bTouchDevice)
				$(this).addClass("cContHeaderButtonActive");
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
	
		$(to.elem).find(".cContHeaderFullscreen").on($.CalenStyle.extra.sClickHandlerButtons, function(e)
		{
			e.stopPropagation();
			if($.CalenStyle.extra.bTouchDevice)
				$(this).addClass("cContHeaderButtonActive");
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
		var to = this;
		var sTempStr = "";
	
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
			}, 60);			
		}
	},

	_addEventsForMenu: function()
	{
		var to = this;
		var sDarkColor = "#FF3B30", sLightColor = "#FFFFFF";

		if($.CalenStyle.extra.bTouchDevice)
		{
			to.__setHoverClass($(to.elem).find(".cContHeaderMenuSegmentedTab .cContHeaderMenuSections li"), "cSelectedMenu");
			to.__setHoverClass($(to.elem).find(".cContHeaderMenuDropdownBg .cContHeaderMenuSections li"), "cSelectedMenu");
		}

		$(to.elem).find(".cContHeaderMenuSegmentedTab .cContHeaderMenuSections li").removeClass("cSelectedMenu");
		$(to.elem).find(".cContHeaderMenuSegmentedTab #cContHeaderMenu"+to.setting.visibleView).addClass("cSelectedMenu");
	
		$(to.elem).find(".cContHeaderMenuDropdownBg .cContHeaderMenuSections li").removeClass("cSelectedMenu");
		$(to.elem).find(".cContHeaderMenuDropdownBg #cContHeaderMenu"+to.setting.visibleView).addClass("cSelectedMenu");
	
		$(to.elem).find(".cContHeaderMenuSections li").on($.CalenStyle.extra.sClickHandlerButtons, function(e)
		{
			e.stopPropagation();
		
			var sViewName = $(this).attr("name");
			if(!to.compareStrings(sViewName, "DatePicker"))
			{
				$(to.elem).find(".cContHeaderMenuSegmentedTab .cContHeaderMenuSections li").removeClass("cSelectedMenu");
				$(to.elem).find(".cContHeaderMenuSegmentedTab #cContHeaderMenu"+to.setting.visibleView).addClass("cSelectedMenu");
				
				$(to.elem).find(".cContHeaderMenuDropdownBg .cContHeaderMenuSections li").removeClass("cSelectedMenu");
				$(to.elem).find(".cContHeaderMenuDropdownBg #cContHeaderMenu"+to.setting.visibleView).addClass("cSelectedMenu");

				to._collapseSubmenu();
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
	
		$(to.elem).find(".cContHeaderMenuDropdownBg").on($.CalenStyle.extra.sClickHandler, function(e)
		{
			to._collapseSubmenu();
		});

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
	},

	// Public Method
	navigateToPrevView: function()
	{
		var to = this;
		$(to.elem).find(".cListOuterCont").html("");

		if(to.compareStrings(to.setting.visibleView, "DetailedMonthView") || to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
			to.__goToPrevMonthView();
		else if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView") || to.compareStrings(to.setting.visibleView, "CustomView") || to.compareStrings(to.setting.visibleView, "DayEventDetailView"))
			to.__goToPrevDetailView();
		else if(to.compareStrings(to.setting.visibleView, "DayEventListView"))
			to.__goToPrevDayListView();
		else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
			to.__goToPrevQuickAgendaView();
		else if(to.compareStrings(to.setting.visibleView, "AppointmentView"))
			to.__goToPrevAppointmentView();
		else if(to.compareStrings(to.setting.visibleView, "AgendaView"))
			to.__goToPrevAgendaView();
	
		if(to.setting.previousButtonClicked)
			to.setting.previousButtonClicked.call(to, to.setting.selectedDate, to.tv.dAVDt);
	},

	// Public Method
	navigateToNextView: function()
	{
		var to = this;
		$(to.elem).find(".cListOuterCont").html("");

		if(to.compareStrings(to.setting.visibleView, "DetailedMonthView") || to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
			to.__goToNextMonthView();
		else if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView") || to.compareStrings(to.setting.visibleView, "CustomView") || to.compareStrings(to.setting.visibleView, "DayEventDetailView"))
			to.__goToNextDetailView();		
		else if(to.compareStrings(to.setting.visibleView, "DayEventListView"))
			to.__goToNextDayListView();
		else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
			to.__goToNextQuickAgendaView();
		else if(to.compareStrings(to.setting.visibleView, "AppointmentView"))
			to.__goToNextAppointmentView();
		else if(to.compareStrings(to.setting.visibleView, "AgendaView"))
			to.__goToNextAgendaView();
	
		if(to.setting.nextButtonClicked)
			to.setting.nextButtonClicked.call(to, to.setting.selectedDate, to.tv.dAVDt);
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
					to._showOrHideDatePicker();
					to.setting.selectedDate = selectedDate;
					to.reloadData();
					to.setting.datePickerObject.highlightDatesInDatePicker(to.tv.dAVDt);
					
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

	__reloadDatePickerContentOnNavigation: function()
	{
		var to = this;
		to._reloadDatePickerContent();
	
		if(to.compareStrings(to.setting.visibleView, "DatePicker"))
			to.__highlightDaysInDatePicker();
		else if(to.compareStrings(to.setting.visibleView, "MonthView"))
		{
			if(to.compareStrings(to.setting.actionOnDayClickInMonthView, "ChangeDate"))
				to.__highlightDaysInDatePicker();
		}
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

			if(!$.CalenStyle.extra.bTouchDevice)
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
		
			iElemDatePickerTop = $(to.elem).find(".cContHeaderLabelOuter").height() + 10 + $(to.elem).find(".calendarContInner").position().top + (to.compareStrings(to.setting.sectionsList[0], "ActionBar") ? $(to.elem).find(".cActionBar").height() : 0);
		
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

	//--------------------------------- Header Related Functions End ---------------------------------

	//----------------------------- Common View Related Functions Start -----------------------------

	_addCommonView: function(bLoadData)
	{
		var to = this;
		var bFirstSection = true,
		iSectionTopPos = 0,
		$occCalendarCont = $(to.elem).find(".calendarCont"),
		iTempCalendarContInnerLeft = 0, iTempCalendarContInnerTop = 0,
		iTempCalendarContInnerWidth = 0, iTempCalendarContInnerHeight = 0,
		sTempStr = "", iTempIndex, sSectionName;
	
		for(iTempIndex = 0; iTempIndex < to.setting.sectionsList.length; iTempIndex++)
		{
			sSectionName = to.setting.sectionsList[iTempIndex];
			if(to.compareStrings(sSectionName, "FilterBar"))
			{
				to.tv.bDisFBar = true;
				break;
			}
		}
	
		if(to.tv.bDisFBar)
		{
			var iTempFilterBarLeft, iTempFilterBarTop,
			iTempFilterBarWidth, iTempFilterBarHeight,
			iCalendarContWidth = $occCalendarCont.outerWidth(),
			iCalendarContHeight = $occCalendarCont.outerHeight();
		
			if(to.compareStrings(to.setting.filterBarPosition, "Top") || to.compareStrings(to.setting.filterBarPosition, "Bottom"))
			{
				iTempFilterBarWidth = iCalendarContWidth;
				iTempFilterBarHeight = to.setting.filterBarHeight;
			
				iTempCalendarContInnerWidth = iCalendarContWidth;
				iTempCalendarContInnerHeight = iCalendarContHeight - iTempFilterBarHeight;
			
				iTempFilterBarLeft = 0;
				iTempCalendarContInnerLeft = 0;
			
				if(to.compareStrings(to.setting.filterBarPosition, "Top"))
				{
					iTempFilterBarTop = 0;
					iTempCalendarContInnerTop = to.setting.filterBarHeight - $.CalenStyle.extra.iBorderOverhead;
				}
				else if(to.compareStrings(to.setting.filterBarPosition, "Bottom"))
				{
					iTempCalendarContInnerTop = 0;
					iTempFilterBarTop = iTempCalendarContInnerHeight;
				}
			
				iTempFilterBarWidth = "100%";
				iTempFilterBarHeight += "px";
			}
			else if(to.compareStrings(to.setting.filterBarPosition, "Left") || to.compareStrings(to.setting.filterBarPosition, "Right"))
			{
				iTempFilterBarWidth = to.setting.filterBarWidth;
				iTempFilterBarHeight = iCalendarContHeight;
			
				iTempCalendarContInnerWidth = iCalendarContWidth - iTempFilterBarWidth;
				iTempCalendarContInnerHeight = iCalendarContHeight;
			
				iTempFilterBarTop = 0;
				iTempCalendarContInnerTop = 0;
			
				if(to.compareStrings(to.setting.filterBarPosition, "Left"))
				{
					iTempFilterBarLeft = 0;
					iTempCalendarContInnerLeft = to.setting.filterBarWidth;
				}
				else if(to.compareStrings(to.setting.filterBarPosition, "Right"))
				{
					iTempCalendarContInnerLeft = 0;
					iTempFilterBarLeft = iTempCalendarContInnerWidth;
				}
			
				iTempFilterBarWidth += "px";
				iTempFilterBarHeight = "100%";
			}
		
			sTempStr += "<div class='cFilterBar' style='left: " + iTempFilterBarLeft + "px; top: " + iTempFilterBarTop + "px; width: " + iTempFilterBarWidth + "; height: " + iTempFilterBarHeight + ";'></div>";
		}
		sTempStr += "<div class='calendarContInner' style='left: " + iTempCalendarContInnerLeft + "px; top: " + iTempCalendarContInnerTop + "px; width: " + iTempCalendarContInnerWidth + "px; height: " + iTempCalendarContInnerHeight + "px;'></div>"; 
		$occCalendarCont.append(sTempStr);
	
		for(iTempIndex = 0; iTempIndex < to.setting.sectionsList.length; iTempIndex++)
		{
			sSectionName = to.setting.sectionsList[iTempIndex];
			if(to.compareStrings(sSectionName, "ActionBar"))
				to.tv.bDisABar = true;
			else if(to.compareStrings(sSectionName, "EventList") && (to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DayEventListView")))
				to.tv.bCMVDisEvLst = true;
		}
	
		sTempStr = "";
		for(iTempIndex = 0; iTempIndex < to.setting.sectionsList.length; iTempIndex++)
		{
			sSectionName = to.setting.sectionsList[iTempIndex];

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
					if(to.tv.bDisABar)
						iSectionTopPos -= 1;
					else 
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
				else if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView") || to.compareStrings(to.setting.visibleView, "CustomView") || to.compareStrings(to.setting.visibleView, "DayEventDetailView"))
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
				else if(to.compareStrings(to.setting.visibleView, "DayEventListView"))
				{
					iSectionTopPos -= 2;
					sTempStr += "<table class='cTable cdlvDaysTable cdlvDaysTableList cdlvDaysTableMain' cellspacing='0' style='top: " + iSectionTopPos + "px;'></table>";
				}
				else if(to.compareStrings(to.setting.visibleView, "AppointmentView"))
				{
					iSectionTopPos -= 2;	
				
					sTempStr += "<table class='cTable cavTable cavTableMain' cellspacing='0' style='top: " + iSectionTopPos + "px;'></table>";
					sTempStr += "<div class='cavContRow2 cavContRow2Main'></div>";
				}
			}
			else if(to.compareStrings(sSectionName, "ActionBar"))
			{
				if(!bFirstSection)
				{
					if(!to.compareStrings(to.setting.visibleView, "MonthView"))
						iSectionTopPos -= 1;
				}
				else
					bFirstSection = false;
			
				sTempStr += "<div class='cActionBar' style='height: " + to.setting.actionBarHeight + "px; top: " + iSectionTopPos + "px;'></div>";
			}
			else if(to.compareStrings(sSectionName, "EventList") && (to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DayEventListView")))
			{
				if(!bFirstSection)
					iSectionTopPos -= 1;
				else
					bFirstSection = false;
			
				if(to.compareStrings(to.setting.visibleView, "DayEventListView"))
					iSectionTopPos -= 1;

				sTempStr += "<div class='cListOuterCont'></div>";
			}
		}
	
		if((to.compareStrings(to.setting.visibleView, "DayEventListView") && !to.tv.bCMVDisEvLst) || to.compareStrings(to.setting.visibleView, "AgendaView"))
		{
			if(!bFirstSection)
				iSectionTopPos -= 2;
		
			to.tv.bCMVDisEvLst = true;
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

		$(document).on($.CalenStyle.extra.sClickHandler+".CalenStyle", function(e)
		{
			to._callCommonEvents();
		});
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
		else if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView") || to.compareStrings(to.setting.visibleView, "CustomView"))
			to.__adjustDetailViewTable(0);
		else if(to.compareStrings(to.setting.visibleView, "DayEventDetailView"))
			to.__adjustDetailViewTable(0);
		else if(to.compareStrings(to.setting.visibleView, "DayEventListView"))
			to.__adjustDayListView(0);
		else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
			to.__adjustQuickAgendaView();
		else if(to.compareStrings(to.setting.visibleView, "AppointmentView"))
			to.__adjustAppointmentTable(0);
		else if(to.compareStrings(to.setting.visibleView, "AgendaView"))
			to.adjustAgendaView();
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
		else if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView") || to.compareStrings(to.setting.visibleView, "CustomView") || to.compareStrings(to.setting.visibleView, "DayEventDetailView"))
		{
			if(bLoadAll)
			{
				$(to.elem).find(".cdvContRow2Main").html("");
				$(to.elem).find(".cdvContRow3Main").html("");
			
				to.__updateDetailViewTable();
				to.__adjustDetailViewTable(1);

				if(to.setting.adjustViewOnWindowResize)
						$(window).bind("resize." + to.tv.pluginId, function(e){to.__adjustDetailViewTable();});
			
				to.__parseData(bLoadAllData, function()
				{
					if(to.compareStrings(to.setting.visibleView, "DayEventDetailView"))
					{
						if(to.tv.oAEvTskStatus.length > 0)
						{
							for(var iDateIndex = 0; iDateIndex < to.tv.iNoVDay; iDateIndex++)
							{
								$(to.elem).find("#cdlvRowDay"+iDateIndex).append("<div class='cdlvTableRowStatusGroup'> &nbsp; </div>");
							}
							to.__displayEventOrTaskStatusForDayListView();
						}								
						to.__setDateStringsForDayListView(to.tv.iNoVDay, to.tv.dAVDt, 0);
						//to.__adjustDayListView(0);
					}
				
					to.__updateTimeSlotTableView();
					to.__addEventsInDetailView("Both");
					to.__adjustDetailViewTable(1);
					to.__adjustDetailViewTable(0);
				
					to.__modifyFilterBarCallback();
				});
			}
		}
		else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
		{
			$(to.elem).find(".cqavContRow2Main").html("");
		
			to.__updateQuickAgendaView();
			to.__adjustQuickAgendaView();

			if(to.setting.adjustViewOnWindowResize)
				$(window).bind("resize." + to.tv.pluginId, function(e){to.__adjustQuickAgendaView();});
		
			to.__parseData(bLoadAllData, function()
			{
				to.__addEventsInQuickAgendaView();
				to.__adjustQuickAgendaView();
			
				to.__modifyFilterBarCallback();
			});
		}
		else if(to.compareStrings(to.setting.visibleView, "DayEventListView"))
		{
			to.__updateDayListViewTable(bLoadAllData, true);
			if(!bLoadAll)
				to.__adjustDayListView(1);
			to.__adjustDayListView(0);
		
			if(to.setting.adjustViewOnWindowResize)	
				$(window).bind("resize." + to.tv.pluginId, function(e){to.__adjustDayListView();});
		}
		else if(to.compareStrings(to.setting.visibleView, "AppointmentView"))
		{
			to.__updateAppointmentTable();
			to.__adjustAppointmentTable(0);

			if(to.setting.adjustViewOnWindowResize)	
				$(window).bind("resize." + to.tv.pluginId, function(e){to.__adjustAppointmentTable();});

			to.__parseData(bLoadAllData, function()
			{
				to.__updateAppointmentTable();
				to.__displayAppointments();
				to.__adjustAppointmentTable(1);
				to.__adjustAppointmentTable(0);
			
				to.__modifyFilterBarCallback();
			});
		}
		else if(to.compareStrings(to.setting.visibleView, "AgendaView"))
		{
			to.updateAgendaView(bLoadAllData);
			to.adjustAgendaView();
		
			if(to.setting.adjustViewOnWindowResize)	
				$(window).bind("resize." + to.tv.pluginId, function(e){to.adjustAgendaView();});
		}
	
		//if(to.tv.bDisFBar)
		//{
			if(to.setting.modifyFilterBarView)
				to.setting.modifyFilterBarView.call(to, $(to.elem).find(".cFilterBar"), to.setting.eventFilterCriteria, to.tv.oAEvFltrCnt);
		//}
	
		if(to.tv.bDisABar)
		{
			if(to.setting.modifyActionBarView)
				to.setting.modifyActionBarView.call(to, $(to.elem).find(".cActionBar"), to.setting.visibleView);
		}
	
		if(!to.tv.bViewLoaded)
		{
			if(to.setting.viewLoaded)
				to.setting.viewLoaded.call(to, to.setting.selectedDate, to.tv.dAVDt);
			to.tv.bViewLoaded = true;
		}
	},

	__modifyFilterBarCallback: function()
	{
		var to = this;
		//if(to.tv.bDisFBar)
		//{
			if(to.setting.modifyFilterBarView)
				to.setting.modifyFilterBarView.call(to, $(to.elem).find(".cFilterBar"), to.setting.eventFilterCriteria, to.tv.oAEvFltrCnt);
		//}
	},

	__adjustFontSize: function()
	{
		var to = this;
		var $occCalendarContInner = $(to.elem).find(".calendarContInner"),
		iCalendarContWidth = $occCalendarContInner.outerWidth(),
		iCalendarContHeight = $occCalendarContInner.outerHeight(),
	
		sFontClasses = "cFontLarge cFontMedium cFontSmall cFontExtraSmall";
	
		if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView") || to.compareStrings(to.setting.visibleView, "CustomView") || to.compareStrings(to.setting.visibleView, "DayEventDetailView") || to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
		{
			if(iCalendarContWidth <= 360 || iCalendarContHeight <= 360)
				$occCalendarContInner.removeClass(sFontClasses).addClass("cFontSmall");
			else if(iCalendarContWidth <= 710)
				$occCalendarContInner.removeClass(sFontClasses).addClass("cFontMedium");
			else
				$occCalendarContInner.removeClass(sFontClasses).addClass("cFontLarge");
		}
		else if(to.compareStrings(to.setting.visibleView, "DayEventListView") || to.compareStrings(to.setting.visibleView, "AppointmentView") || to.compareStrings(to.setting.visibleView, "DetailedMonthView"))
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
			if(to.tv.bCMVDisEvLst)
			{
				if(iCalendarContWidth <= 310 || iCalendarContHeight <= 310)
					$occCalendarContInner.removeClass(sFontClasses).addClass("cFontSmall");
				else if(iCalendarContWidth <= 400 || iCalendarContHeight <= 400)
					$occCalendarContInner.removeClass(sFontClasses).addClass("cFontMedium");
				else
					$occCalendarContInner.removeClass(sFontClasses).addClass("cFontLarge");
			}
			else
			{
				if(iCalendarContWidth <= 310 || iCalendarContHeight <= 310)
					$occCalendarContInner.removeClass(sFontClasses).addClass("cFontSmall");
				else if(iCalendarContWidth <= 410 || iCalendarContHeight <= 410)
					$occCalendarContInner.removeClass(sFontClasses).addClass("cFontMedium");
				else
					$occCalendarContInner.removeClass(sFontClasses).addClass("cFontLarge");
			}
		}
	},

	// Public Method
	setCalendarBorderColor: function()
	{
		var to = this;
		if(to.tv.bDisFBar)
		{
			if(to.compareStrings(to.setting.filterBarPosition, "Left"))
				$(to.elem).find(".cFilterBar").css({"border-right": "1px solid #DDD"});
			else if(to.compareStrings(to.setting.filterBarPosition, "Right"))
				$(to.elem).find(".cFilterBar").css({"border-left": "1px solid #DDD"});
		}
		
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
		
			if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView") || to.compareStrings(to.setting.visibleView, "CustomView") || to.compareStrings(to.setting.visibleView, "DayEventDetailView"))
			{
				sTemp += ", .cdvCalendarCont td";
				sTemp += ", .cdvDetailTable";
			}
			else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
			{
				sTemp += ", .cqavCalendarCont td";
				sTemp += ", .cqavTable";
			}
			else if(to.compareStrings(to.setting.visibleView, "AppointmentView"))
			{
				sTemp += ", .cavCalendarCont .cavTable td";
				sTemp += ", .cavCalendarCont .cavTable td:last-child";
				sTemp += ", .cavTableList";
			}
			else if(to.compareStrings(to.setting.visibleView, "DetailedMonthView") || to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
			{
				sTemp += ", .cmvCalendarContWithBorders"+ " td";
				sTemp += ", .cmvThinBorderTop";
				sTemp += ", .cmvThinBorderRight";
				sTemp += ", .cmvThinBorderBottom";
				sTemp += ", .cmvThinBorderLeft";
				sTemp += ", .cmvThinBorder";
				sTemp += ", .cdlvDaysTableList";
			}
			else if(to.compareStrings(to.setting.visibleView, "DayEventListView"))
				sTemp += ", .cdlvDaysTableList";
			
			sTemp += ", .cContHeader";
			sTemp += ", .cFilterBar";
			sTemp += ", .cActionBar";
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
		//console.log("Local Today : " + new Date());
		//console.log("UTC Today : " + to.convertToUTC(new Date()));
		var dToday = to.getDateByAddingOutputTZOffset(to.convertToUTC(new Date()), to.setting.outputTZOffset);
		//console.log("outputTZOffset " + to.setting.outputTZOffset + " Today : " + dToday);
		return dToday;
	},

	// Public Method
	convertToUTC: function(dIpDate, sIpTZOffset)
	{
		var to = this;
		return new Date(dIpDate.getTime() - ((sIpTZOffset === undefined || sIpTZOffset === "" || sIpTZOffset === null) ?  -(dIpDate.getTimezoneOffset() * $.CalenStyle.extra.iMS.m) : to._getTZOffsetInMS(sIpTZOffset)));
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
				
					var sArrTimeComponents;
					if(to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[4]) || to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[6]) || to.compareStrings(sInputDateTimeFormat, $.CalenStyle.extra.sArrInputDateTimeFormats[8]))
					{
						var sArrTempTimeComponents = sThisTime.split(" ");
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
					to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dArrTempDates[0], null, "Next");

					to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
					to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");
					
					to.tv.dVDSDt = new Date(to.tv.dVSDt);
					to.tv.dVDEDt = new Date(to.tv.dVEDt);
				}
				else if(to.compareStrings(to.setting.quickAgendaViewDuration, "CustomDays"))
				{
					if(to.tv.sLoadType === "Next" || to.tv.sLoadType === "Load")
						to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dCurrentDateStart, null, "Next");
					else if(to.tv.sLoadType === "Prev")
					{
						to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dCurrentDateStart, null, "Prev");
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
					to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dMonthStartDate, dMonthEndDate, "Next");

					to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
					to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");

					to.tv.dVDSDt = new Date(to.tv.dVSDt);
					to.tv.dVDEDt = new Date(to.tv.dVEDt);
				}
				else if(to.compareStrings(to.setting.agendaViewDuration, "Week"))
				{
					dArrTempDates = to._getWeekForDate(dCurrentDateStart, false);					
					to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dArrTempDates[0], null, "Next");

					to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
					to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");

					to.tv.dVDSDt = new Date(to.tv.dVSDt);
					to.tv.dVDEDt = new Date(to.tv.dVEDt);
				}
				else if(to.compareStrings(to.setting.agendaViewDuration, "CustomDays"))
				{
					if(to.tv.sLoadType === "Next" || to.tv.sLoadType === "Load")
					to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dCurrentDateStart, null, "Next");
					else if(to.tv.sLoadType === "Prev")
					{
						to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dCurrentDateStart, null, "Prev");
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
					to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dCurrentDateStart, null, "Next");
				else if(to.tv.sLoadType === "Prev")
				{
					to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dCurrentDateStart, null, "Prev");
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
					to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dArrTempDates[0], null, "Next");
					for(var iDateIndex = 0; iDateIndex < to.tv.iNoVDay; iDateIndex++)
					{
						if(to.compareDates(dCurrentDateStart, to.tv.dAVDt[iDateIndex]) === 0)
						{
							to.tv.iSelDay = iDateIndex;
							break;
						}
					}

					to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
					to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");
				}
				else
				{
					var oArrDates1 = to.__setCurrentViewDatesArray((to.tv.iSelDay + 1), dCurrentDateStart, null, "Prev"),
					iBalDays = (to.tv.iNoVDay - (to.tv.iSelDay + 1)) + 1,
					oArrDates2;
					oArrDates1.reverse();
					oArrDates2 = to.__setCurrentViewDatesArray(iBalDays, dCurrentDateStart, null, "Next");
					oArrDates2.shift();
					to.tv.dAVDt = oArrDates1.concat(oArrDates2);
				
					to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
					to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");

					console.log(to.tv.dVSDt + " " + to.tv.dVEDt);

					/*
				
					if(to.tv.sLoadType === "Next" || to.tv.sLoadType === "Load")
					{
						to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dCurrentDateStart, null, "Next");
					}
					else if(to.tv.sLoadType === "Prev")
					{
						to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dCurrentDateStart, null, "Prev");
						to.tv.dAVDt.reverse();
					}				
					to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
					to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");
				
					*/
				}
			
				to.tv.dVDSDt = to.setDateInFormat({"date": to.setting.selectedDate}, "START");
				to.tv.dVDEDt = to.setDateInFormat({"date": to.setting.selectedDate}, "END");
			}
			else if(to.compareStrings(to.setting.visibleView, "WeekView"))
			{
				dArrTempDates = to._getWeekForDate(dCurrentDateStart, false);
				to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dArrTempDates[0], null, "Next");

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
				
				to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dCurrentDateStart, null, "Next");
			}
			else if(to.compareStrings(to.setting.visibleView, "CustomView"))
			{
				if(to.tv.sLoadType === "Next" || to.tv.sLoadType === "Load")
					to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dCurrentDateStart, null, "Next");
				else if(to.tv.sLoadType === "Prev")
				{
					to.tv.dAVDt = to.__setCurrentViewDatesArray(to.tv.iNoVDay, dCurrentDateStart, null, "Prev");
					to.tv.dAVDt.reverse();
				}				
				to.tv.dVSDt = to.setDateInFormat({"date": to.tv.dAVDt[0]}, "START");
				to.tv.dVEDt = to.setDateInFormat({"date": to.tv.dAVDt[to.tv.iNoVDay - 1]}, "END");

				to.tv.dVDSDt = new Date(to.tv.dVSDt);
				to.tv.dVDEDt = new Date(to.tv.dVEDt);
			}
		}
	},

	__setCurrentViewDatesArray: function(iNoOfDays, dStartDate, dEndDate, sDir)
	{
		var to = this;
		var iDVDateMS = dStartDate.getTime(),
		oArrDates = [];
		for(var iDateIndex = 0; iDateIndex < iNoOfDays; iDateIndex++)
		{
			var dTempDate = new Date(iDVDateMS);
			if(dEndDate !== null && to.compareDates(dTempDate, dEndDate) === 0)
				break;

			if(!to.setting.excludeNonBusinessHours)
				oArrDates.push(dTempDate);
			else if(to._getBusinessHoursForCurrentView(dTempDate).length > 0)
				oArrDates.push(dTempDate);
			else
				iDateIndex--;
		
			if(to.compareStrings(sDir, "Prev"))
				iDVDateMS -= $.CalenStyle.extra.iMS.d;
			else if(to.compareStrings(sDir, "Next"))
				iDVDateMS += $.CalenStyle.extra.iMS.d;
		}

		return oArrDates;
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
		if(to.compareStrings(to.setting.visibleView, "DayEventDetailView"))
			iDayIndex = 0;	
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
				if(iWkNumberStart !== iWkNumberEnd)
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
			if(dWkStartDate.getFullYear() !== dWkEndDate.getFullYear())
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
						dOutputDate = new Date(iArrInput.y, iArrInput.M, iArrInput.d, iArrInput.H, iArrInput.M, 0, 0);
					else if(sFunction === "END")
						dOutputDate = new Date(iArrInput.y, iArrInput.M, iArrInput.d, iArrInput.H, iArrInput.M, 59, 999);
				}
				break;
			case "m":
				{
					if(sFunction === "START")
						dOutputDate = new Date(iArrInput.y, iArrInput.M, iArrInput.d, iArrInput.H, 0, 0, 0);
					else if(sFunction === "END")
						dOutputDate = new Date(iArrInput.y, iArrInput.M, iArrInput.d, iArrInput.H, 59, 59, 999);
				}
				break;
			case "h":
			case "T":
				{
					if(sFunction === "START")
						dOutputDate = new Date(iArrInput.y, iArrInput.M, iArrInput.d, 0, 0, 0, 0);
					else if(sFunction === "END")
						dOutputDate = new Date(iArrInput.y, iArrInput.M, iArrInput.d, 23, 59, 59, 999);
				}
				break;
			case "d":
			case "dE":
				{
					if(sFunction === "START")
						dOutputDate = new Date(iArrInput.y, iArrInput.M, 1, 0, 0, 0, 0);
					else if(sFunction === "END")
						dOutputDate = new Date(iArrInput.y, iArrInput.M, to.__getNumberOfDaysOfMonth(iArrInput.M, iArrInput.y), 0, 0, 0, 0);
				}
				break;
			case "M":
			case "ME":
			case "y":
			case "yE":
				{
					if(sFunction === "START")
						dOutputDate = new Date(iArrInput.y, 0, 1, 0, 0, 0, 0);
					else if(sFunction === "END")
						dOutputDate = new Date(iArrInput.y, 11, to.__getNumberOfDaysOfMonth(11, iArrInput.y), 0, 0, 0, 0);
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
		var iTempIndex, sFormattedString = "", sNumber = iNumber.toString(), iNumberLength = sNumber.length;
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
			oDateInFormat = (to.setting.formatDates.H !== undefined) ? to.setting.formatDates.H.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.H, 0, bIsLocalized);
		else if(sFormat === "h")
			oDateInFormat = (to.setting.formatDates.h !== undefined) ? to.setting.formatDates.h.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.h , 0, bIsLocalized);
		else if(sFormat === "m")
			oDateInFormat = (to.setting.formatDates.m !== undefined) ? to.setting.formatDates.m.call(to, oInput.iDate) : to.getNumberStringInFormat(oInput.iDate.m, 0, bIsLocalized);
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
		else if(sFormat === "DDDD MMMM dd yyyy")
			oDateInFormat = (to.setting.formatDates["DDDD MMMM dd yyyy"] !== undefined) ? to.setting.formatDates["DDDD MMMM dd yyyy"].call(to, oInput.iDate) : "<b>" + to.getDateInFormat({"iDate": oInput.iDate}, "DDDD", b24Hour, bIsLocalized) + " - " + to.getDateInFormat({"iDate": oInput.iDate}, "MMMM", b24Hour, bIsLocalized) + " " + to.getDateInFormat({"iDate": oInput.iDate}, "dd", b24Hour, bIsLocalized) + "</b> " + to.getDateInFormat({"iDate": oInput.iDate}, "yyyy", b24Hour, bIsLocalized);
		else if(sFormat === "yyyy-MM-dd")
			oDateInFormat = (to.setting.formatDates["yyyy-MM-dd"] !== undefined) ? to.setting.formatDates["yyyy-MM-dd"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "yyyy", b24Hour, bIsLocalized) + sDS + to.getDateInFormat({"iDate": oInput.iDate}, "MM", b24Hour, bIsLocalized) + sDS + to.getDateInFormat({"iDate": oInput.iDate}, "dd", b24Hour, bIsLocalized);
		else if(sFormat === "ISO8601Date")
			oDateInFormat = (to.setting.formatDates.ISO8601Date !== undefined) ? to.setting.formatDates.ISO8601Date.call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "yyyy", b24Hour, bIsLocalized) + "-" + to.getDateInFormat({"iDate": oInput.iDate}, "MM", b24Hour, bIsLocalized) + "-" + to.getDateInFormat({"iDate": oInput.iDate}, "dd", b24Hour, bIsLocalized);
	
		// getTimeStringCF
		else if(sFormat === "hh:mm sm" || sFormat === "hh:mm SM")
			oDateInFormat = (to.setting.formatDates["hh:mm"] !== undefined) ? to.setting.formatDates["hh:mm"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "hh", b24Hour, bIsLocalized) + sTS + to.getDateInFormat({"iDate": oInput.iDate}, "mm", b24Hour, bIsLocalized) + " " + ((sFormat === "hh:mm SM") ? oInput.iDate.sm.toUpperCase() : oInput.iDate.sm);
		else if(sFormat === "hh:mmsm" || sFormat === "hh:mmSM")
			oDateInFormat = (to.setting.formatDates["hh:mm"] !== undefined) ? to.setting.formatDates["hh:mm"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "hh", b24Hour, bIsLocalized) + sTS + to.getDateInFormat({"iDate": oInput.iDate}, "mm", b24Hour, bIsLocalized) + ((sFormat === "hh:mmSM") ? oInput.iDate.sm.toUpperCase() : oInput.iDate.sm);
		else if(sFormat === "hh:mm" || sFormat === "hh:mm me" || sFormat === "hh:mm ME")
			oDateInFormat = (to.setting.formatDates["hh:mm"] !== undefined) ? to.setting.formatDates["hh:mm"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "hh", b24Hour, bIsLocalized) + sTS + to.getDateInFormat({"iDate": oInput.iDate}, "mm", b24Hour, bIsLocalized) + " " + ((sFormat === "hh:mm ME") ? oInput.iDate.me.toUpperCase() : oInput.iDate.me);
		else if(sFormat === "hh:mm:ss" || sFormat === "hh:mm:ss me" || sFormat === "hh:mm:ss ME")
			oDateInFormat = (to.setting.formatDates["hh:mm:ss"] !== undefined) ? to.setting.formatDates["hh:mm:ss"].call(to, oInput.iDate) : to.getDateInFormat({"iDate": oInput.iDate}, "hh", b24Hour, bIsLocalized) + sTS + to.getDateInFormat({"iDate": oInput.iDate}, "mm", b24Hour, bIsLocalized) + sTS + to.getDateInFormat({"iDate": oInput.iDate}, "ss", b24Hour, bIsLocalized) + " " + ((sFormat === "hh:mm:ss ME") ? oInput.iDate.me.toUpperCase() : oInput.iDate.me);
	
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
		//console.log(dThisStartDate + " " + dThisEndDate + " " + bIsAllDay + " " + sDateTimeString);
	
		return sDateTimeString;
	},

	//------------------------------- Date Manipulation Functions End -------------------------------

	//------------------------------------ Events Manipulation Start ------------------------------------

	__isValidUrl: function(sURL)
	{
		 return sURL.match(/(((ftp|http|https):\/\/)|(\/)|(..\/)|())(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/) ? true : false;
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
			$oElem.parent().append("<div class='cEventLoaderBg'></div>");
			if(to.compareStrings(to.setting.visibleView, "DetailedMonthView") || to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
			{
				$(".cmvMonthTableMain tbody").addClass("cEventLoaderIndicator");
			}
			else if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView") || to.compareStrings(to.setting.visibleView, "CustomView"))
			{
				$(".cdvDetailTableMain tbody").addClass("cEventLoaderIndicator");
			}
			else if(to.compareStrings(to.setting.visibleView, "DayEventDetailView"))
			{
				$(".cdvDetailTableMain tbody").addClass("cEventLoaderIndicator");
				$(".cdlvDaysTableMain tbody").addClass("cEventLoaderIndicator");
			}
			else if(to.compareStrings(to.setting.visibleView, "DayEventListView"))
			{
				$(".cdlvDaysTableMain tbody").addClass("cEventLoaderIndicator");
			}
			else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
			{
				$(".cqavTableMain tbody").addClass("cEventLoaderIndicator");
			}
			else if(to.compareStrings(to.setting.visibleView, "AppointmentView"))
			{
				$(".cavTableMain").addClass("cEventLoaderIndicator");
			}
			else if(to.compareStrings(to.setting.visibleView, "AgendaView"))
			{
				$(".cListOuterCont").addClass("cEventLoaderIndicator");
			}
		
			var iMainLeftMargin = $oElem.css("margin-left");
			iMainLeftMargin = parseInt(iMainLeftMargin.replace("px", ""));
			var iMainTopMargin = $oElem.css("margin-top");
			iMainTopMargin = parseInt(iMainTopMargin.replace("px", ""));
			var iMainContLeft = $oElem.position().left + iMainLeftMargin,
			iMainContTop = $oElem.position().top + iMainTopMargin,
			iMainContWidth = $oElem.width(),
			iMainContHeight = $oElem.height();
			$(".cEventLoaderBg").css({"left": iMainContLeft, "top": iMainContTop, "width": iMainContWidth, "height": iMainContHeight, "line-height": iMainContHeight+"px"});
		
			$(".cEventLoaderBg").on("click touchstart touchmove", function(e)
			{
				e.stopPropagation();
			});

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
			if(to.compareStrings(to.setting.visibleView, "DetailedMonthView") || to.compareStrings(to.setting.visibleView, "MonthView") || to.compareStrings(to.setting.visibleView, "DatePicker"))
			{
				$(".cmvMonthTableMain tbody").removeClass("cEventLoaderIndicator");
			}
			else if(to.compareStrings(to.setting.visibleView, "WeekView") || to.compareStrings(to.setting.visibleView, "DayView") || to.compareStrings(to.setting.visibleView, "CustomView"))
			{
				$(".cdvDetailTableMain tbody").removeClass("cEventLoaderIndicator");
			}
			else if(to.compareStrings(to.setting.visibleView, "DayEventDetailView"))
			{
				$(".cdvDetailTableMain tbody").removeClass("cEventLoaderIndicator");
				$(".cdlvDaysTableMain tbody").removeClass("cEventLoaderIndicator");
			}
			else if(to.compareStrings(to.setting.visibleView, "DayEventListView"))
			{
				$(".cdlvDaysTableMain tbody").removeClass("cEventLoaderIndicator");
			}
			else if(to.compareStrings(to.setting.visibleView, "QuickAgendaView"))
			{
				$(".cqavTableMain tbody").removeClass("cEventLoaderIndicator");
			}
			else if(to.compareStrings(to.setting.visibleView, "AppointmentView"))
			{
				$(".cavTableMain").removeClass("cEventLoaderIndicator");
			}
			else if(to.compareStrings(to.setting.visibleView, "AgendaView"))
			{
				$(".cListOuterCont").removeClass("cEventLoaderIndicator");
			}

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
				else if(to.compareStrings(sSourceTitle, "slotAvailabilitySource"))
					to._getModifiedSlotAvailabilityArray(oArrTempJson, oConfig);
				else if(to.compareStrings(sSourceTitle, "eventOrTaskStatusSource"))
					to._getModifiedEventOrTaskStatusArray(oArrTempJson, oConfig);
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
				else if(to.compareStrings(sSourceTitle, "slotAvailabilitySource"))
					to.tv.oASltAvail = [];
				else if(to.compareStrings(sSourceTitle, "eventOrTaskStatusSource"))
					to.tv.oAEvTskStatus = [];
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
		if(oSourceJson.slotAvailabilitySource !== undefined)
			iDataLoadingCount++;
		if(oSourceJson.eventOrTaskStatusSource !== undefined)
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
		if(oSourceJson.slotAvailabilitySource !== undefined)
			to.parseDataSource("slotAvailabilitySource", oSourceJson.slotAvailabilitySource, dTempDurationStartDate, dTempDurationEndDate, loadViewCallback, oConfig, isGoogleCalendarURL);
		if(oSourceJson.eventOrTaskStatusSource !== undefined)
			to.parseDataSource("eventOrTaskStatusSource", oSourceJson.eventOrTaskStatusSource, dTempDurationStartDate, dTempDurationEndDate, loadViewCallback, oConfig, isGoogleCalendarURL);
	
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
			var bFetchAll = false, bFetchDateRange = false, 
			iSourceIndex, oSource, iSUParamIndex, oSourceParam;
		
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
					to.tv.oASltAvail = [];
					to.tv.oAEvTskStatus = [];
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

							if(bGoogleCalendar)
							{
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
								for(iSUParamIndex = 0; iSUParamIndex < oSourceURLParams.length; iSUParamIndex++)
								{
									oSourceParam = oSourceURLParams[iSUParamIndex];
									oUrlParam[oSourceParam.keyName] = oSourceParam.values;
								}
							
								if(to.compareStrings(oSource.sourceFetchType, "DateRange"))
								{
									oUrlParam.callback = "?";
									if(dTempLoadStartDate !== null && dTempLoadEndDate !== null)
									{
										oUrlParam.startdate = to.getDateInFormat({"date": dTempLoadStartDate}, "yyyy-MM-dd", false, false);
										oUrlParam.enddate = to.getDateInFormat({"date": dTempLoadEndDate}, "yyyy-MM-dd", false, false);
										oUrlParam.startdatetime = to.getDateInFormat({"date": to.convertToUTC(dTempLoadStartDate, sTZOffset)}, "yyyy-MM-ddTHH:mm:ss", false, false);
										oUrlParam.enddatetime = to.getDateInFormat({"date": to.convertToUTC(dTempLoadEndDate, sTZOffset)}, "yyyy-MM-ddTHH:mm:ss", false, false);
									}
								}
							}
						
							console.log("sBaseUrl : " + sBaseUrl);
							console.log(oUrlParam);
						
							to.incrementDataLoadingCount(1);
							$.getJSON(sBaseUrl, oUrlParam)
							.done(function(sJsonStr)
							{
								to.tv.iLoadCnt--;
								console.log("Json Response : ");
								console.log(sJsonStr);
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
		to.__addEventCalendarToEventFilterCriteriaArray();
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
		var iJsonObjCount = 0,
		oArrTempTypes = [],
		sColorArray = [],
		oEvent, iJsonIndex, oJsonRecord,
	
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
		var bEventMatched;
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
			for(var iTempIndex1 = 0; iTempIndex1 < oArrEntryIds.length; iTempIndex1++)
			{
				var iTempIdRecord = oArrEntryIds[iTempIndex1],
				iTempId = iTempIdRecord[0],
				iTempCount = iTempIdRecord[1],
				iTempCounter = 1;
			
				for(var iTempIndex2 = 0; iTempIndex2 < oArrEntry.length; iTempIndex2++) 
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
					for(var iEventIndex = 0; iEventIndex < to.tv.oAEvents.length; iEventIndex++)
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
		var sTempColor;

		//-------------------- Set Color For Event Calendar Start ----------------------
		if(to.compareStrings(sChangeColorBasedOn, "EventCalendar"))
		{
			sColorArray = [];
			for(var iCalIndex = 0; iCalIndex < to.tv.oAECalendar.length; iCalIndex++)
			{
				var oThisCalendar = to.tv.oAECalendar[iCalIndex];
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
			var oEventCalendar = to._getEventCalendarObject(oJsonRecord.calendar);
		
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
				for(var iEventIndex1 = 0; iEventIndex1 < oArrJson.length; iEventIndex1++)
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

	_getModifiedSlotAvailabilityArray: function(oArrJson, oConfig)
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
			if(oJsonRecord.start !== null && oJsonRecord.end !== null)
			{
				if(oJsonRecord.start !== null)
					oJsonRecord.start = to._getDateObjectFromString(oJsonRecord.start, oJsonRecord.isAllDay, sInputDateTimeFormat, sFormatSeparatorDateTime, sFormatSeparatorDate, sFormatSeparatorTime, sTZOffset);
				if(oJsonRecord.end !== null)
					oJsonRecord.end = to._getDateObjectFromString(oJsonRecord.end, oJsonRecord.isAllDay, sInputDateTimeFormat, sFormatSeparatorDateTime, sFormatSeparatorDate, sFormatSeparatorTime, sTZOffset);
				if(oJsonRecord.start !== "" && oJsonRecord.end !== "")
				{
					if(oJsonRecord.isAllDay)
					{
						oJsonRecord.start = to.setDateInFormat({"date": oJsonRecord.start}, "START");
						oJsonRecord.end = to.setDateInFormat({"date": oJsonRecord.end}, "END");
					}
					oJsonRecord.end = to._normalizeEndDateTime(oJsonRecord.end);
					oArrTemp.push(oJsonRecord);
				}					
			}
		}
	
		if(to.compareStrings(to.setting.datasetModificationRule, "Default"))
			to.tv.oASltAvail = to.tv.oASltAvail.concat(oArrTemp);
		else if(to.compareStrings(to.setting.datasetModificationRule, "ReplaceAll"))
			to.tv.oASltAvail = oArrTemp;
		else if(to.compareStrings(to.setting.datasetModificationRule, "ReplaceSpecified"))
		{
			for(var iTempIndex1 = 0; iTempIndex1 < oArrTemp.length; iTempIndex1++)
			{
				var bMatchedRecord = false,
				oRecord1 = oArrTemp[iTempIndex1];
				for(var iTempIndex2 = 0; iTempIndex2 < to.tv.oASltAvail.length; iTempIndex2++)
				{
					var oRecord2 = to.tv.oASltAvail[iTempIndex2];
					if(to.compareDateTimes(oRecord1.start, oRecord2.start) === 0 && to.compareDateTimes(oRecord1.end, oRecord2.end) === 0 && to.compareStrings(oRecord1.status, oRecord2.status))
					{
						oRecord2 = oRecord1;
						bMatchedRecord = true;
					}
				}
			
				if(!bMatchedRecord)
					to.tv.oASltAvail.append(oRecord1);
			}
		}
	},

	_getModifiedEventOrTaskStatusArray: function(oArrJson, oConfig)
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
			to.tv.oAEvTskStatus = to.tv.oAEvTskStatus.concat(oArrTemp);
		else if(to.compareStrings(to.setting.datasetModificationRule, "ReplaceAll"))
			to.tv.oAEvTskStatus = oArrTemp;
		else if(to.compareStrings(to.setting.datasetModificationRule, "ReplaceSpecified"))
		{
			for(var iTempIndex1 = 0; iTempIndex1 < oArrTemp.length; iTempIndex1++)
			{
				var bMatchedRecord = false,
				oRecord1 = oArrTemp[iTempIndex1];
				for(var iTempIndex2 = 0; iTempIndex2 < to.tv.oAEvTskStatus.length; iTempIndex2++)
				{
					var oRecord2 = to.tv.oAEvTskStatus[iTempIndex2];
					if(to.compareDateTimes(oRecord1.date, oRecord2.date) === 0)
					{
						oRecord2 = oRecord1;
						bMatchedRecord = true;
					}
				}
				if(!bMatchedRecord)
					to.tv.oAEvTskStatus.append(oRecord1);
			}
		}
	
		return oArrTemp;
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
		
			if(to.tv.oASltAvail.length > 0 && dDurationStartDate !== null && dDurationEndDate !== null)
				to._deleteSlotAvailabilityOutOfDuration(dDurationStartDate, dDurationEndDate);
		
			if(to.tv.oAEvTskStatus.length > 0 && dDurationStartDate !== null && dDurationEndDate !== null)
				to._deleteEventOrTaskStatusOutOfDuration(dDurationStartDate, dDurationEndDate);
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
				if(to.compareDateTimes(oThisEvent.end, dTempStartDate) < 0)
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
		var iTempIndex,oTemp; 
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

	_deleteSlotAvailabilityOutOfDuration: function(dDurationStartDate, dDurationEndDate)
	{
		var to = this;
		var iTempIndex, oTemp;
		for(iTempIndex = 0; iTempIndex < to.tv.oASltAvail.length; iTempIndex++)
		{
			oTemp = to.tv.oASltAvail[iTempIndex];
			var dTempStartDate = new Date(oTemp.start),
			dTempEndDate = new Date(oTemp.end);
		
			if(to.compareStrings(to.tv.sLoadType, "Prev"))
			{
				if(to.compareDateTimes(dTempStartDate, dDurationEndDate) > 0)
					oTemp.start = "DEL";
			}
			else if(to.compareStrings(to.tv.sLoadType, "Next"))
			{
				var iCompStartDate = to.compareDateTimes(dTempStartDate, dDurationStartDate),
				iCompEndDate = to.compareDateTimes(dTempEndDate, dDurationEndDate);
				if(iCompStartDate < 0 && iCompEndDate < 0)
					oTemp.start = "DEL";
			}
		}
	
		var oArrTemp = [];
		for(iTempIndex = 0; iTempIndex < to.tv.oASltAvail.length; iTempIndex++)
		{
			oTemp = to.tv.oASltAvail[iTempIndex];
			if(! to.compareStrings(oTemp.start, "DEL"))
				oArrTemp.push(oTemp);
		}
	
		to.tv.oASltAvail = oArrTemp;
	},

	_deleteEventOrTaskStatusOutOfDuration: function(dDurationStartDate, dDurationEndDate)
	{
		var to = this;
		var iTempIndex, oTemp;
		for(iTempIndex = 0; iTempIndex < to.tv.oAEvTskStatus.length; iTempIndex++)
		{
			oTemp = to.tv.oAEvTskStatus[iTempIndex];
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
		for(iTempIndex = 0; iTempIndex < to.tv.oAEvTskStatus.length; iTempIndex++)
		{
			oTemp = to.tv.oAEvTskStatus[iTempIndex];
			if(! to.compareStrings(oTemp.date, "DEL"))
				oArrTemp.push(oTemp);
		}
	
		to.tv.oAEvTskStatus = oArrTemp;
	},

	//----------------------------------------------------------------------------------------

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
			if(sExistingEventId === oEv.id)
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
				if(oTempEvent.id !== sArrRemoveIds[iTempIndex1])
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

	//-------------------------------------------------------------------------------------------

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
		for(var iEventIndex = 0; iEventIndex < to.tv.oAEvents.length; iEventIndex++)
		{
			var oEventRecord = to.tv.oAEvents[iEventIndex];
			if(oEventRecord.calEventId === parseInt(sId))
				return oEventRecord;				
		}
		return {};
	},

	__updateEventWithId: function(sId, dNewStartDate, dNewEndDate)
	{
		var to = this;
		var bSuccess = false;
		for(var iEventIndex = 0; iEventIndex < to.tv.oAEvents.length; iEventIndex++)
		{
			var oEvent = to.tv.oAEvents[iEventIndex];
			if(oEvent.calEventId === parseInt(sId))
			{
				oEvent.start = dNewStartDate;
				if(dNewEndDate !== null)
					oEvent.end = dNewEndDate;
				else
					oEvent.end = new Date(dNewStartDate.getTime() + ($.CalenStyle.extra.iMS.m * 30));
				to.tv.oAEvents[iEventIndex] = oEvent;
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
			iOuterEventHours = to.__getNumberOfHoursOfEvent(oOuterEvent.isAllDay, oOuterEvent.start, oOuterEvent.end),
			bOuterIsAllDay = oOuterEvent.isAllDay || (iOuterEventHours > 23);
		
			for(var iInnerIndex = (iOuterIndex + 1); iInnerIndex < oArrTempEvents.length; iInnerIndex++)
			{
				var oInnerEvent = oArrTempEvents[iInnerIndex],
				dInnerStartDate = oInnerEvent.start,
				iInnerEventHours = to.__getNumberOfHoursOfEvent(oInnerEvent.isAllDay, oInnerEvent.start, oInnerEvent.end),
				bInnerIsAllDay = oInnerEvent.isAllDay || (iInnerEventHours > 23),

				iCompDates = to.compareDates(dOuterStartDate, dInnerStartDate),
				iCompTimes = to.compareDateTimes(dOuterStartDate, dInnerStartDate),

				bCond1 = (iCompDates === 0) ? (((bOuterIsAllDay && bInnerIsAllDay) && iCompTimes > 0) || (!bOuterIsAllDay && bInnerIsAllDay)) : (iCompTimes > 0),
				// ((bOuterIsAllDay && bInnerIsAllDay) && iCompTimes > 0) ===> both are All Day Events but dStartDateTime of Outer Event is greater than dStartDateTime of Inner Event
				// (!bOuterIsAllDay && bInnerIsAllDay) ===> only Inner Event is All Day Event

				bCond2 = (iCompDates === 0) ? ((bOuterIsAllDay && bInnerIsAllDay) && iCompTimes === 0) : (iCompTimes === 0);

				var oTempEvent;
				if(bCond1)
				{
					oTempEvent = oOuterEvent;
					oOuterEvent = oInnerEvent;
					oInnerEvent = oTempEvent;
				
					oArrTempEvents[iOuterIndex] = oOuterEvent;
					oArrTempEvents[iInnerIndex] = oInnerEvent;
				
					dOuterStartDate = oOuterEvent.start;
				}
				else if(bCond2)
				{
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
				if(to.setting.eventFilterCriteria.length > 0)
				{
					if(to.__whetherToDisplayAnEventOnCalendar(oTempEvent))
						oArrTempEvents.push(oTempEvent);
				}
				else
					oArrTempEvents.push(oTempEvent);					
			}
		}

		if(to.setting.eventFilterCriteria.length > 0)
			to.__setEventCountBasedOnCriteria(oAEventsInRange);
	
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
				else if(to.compareStrings(sSourceCountType, "FreeTimeSlot") || to.compareStrings(sSourceCountType, "BusyTimeSlot"))
				{
					for(iTempIndex = 0; iTempIndex < to.setting.parentObject.tv.oASltAvail.length; iTempIndex++)
					{
						var oEvent = to.setting.parentObject.tv.oASltAvail[iTempIndex],
						dStartDate = oEvent.start,
						dEndDate = oEvent.end,

						bCompStart = (compareDates(dTemp, dStartDate) >= 0),
						bCompEnd = (compareDates(dTemp, dEndDate) <= 0);

						if(bCompStart && bCompEnd)
						{
							if((to.compareStrings(sSourceCountType, "FreeTimeSlot") && to.compareStrings(oEvent.status, "Free")) ||
							   (to.compareStrings(sSourceCountType, "BusyTimeSlot") && to.compareStrings(oEvent.status, "Busy")))
							   	iSourceCount++;
						}
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
			bMatchFound = true; 
			var i = 0;
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
		var iR = Math.floor(100 * Math.random()) + 100, 
		iG = Math.floor(100 * Math.random()) + 100,
		iB = Math.floor(100 * Math.random()) + 100;
	
		var sR = iR.toString(16); sR = (sR.length === 1) ? ("0"+sR) : sR;
		var sG = iG.toString(16); sG = (sG.length === 1) ? ("0"+sG) : sG;
		var sB = iB.toString(16); sB = (sR.length === 1) ? ("0"+sB) : sB;
	
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
	}

	//--------------------------------- Miscellaneous Functions End ---------------------------------

};

/*! ------------------------------------ Common Functions End ------------------------------------ */
