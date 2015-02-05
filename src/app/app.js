angular.module('app', [
    'ngRoute',
    'datainput',
    'statsview',
    //'highcharts-ng',
    'ngResource',
    'ngCookies',
    'pascalprecht.translate',
    'services.console',
    'directives.highcharts',
    'templates.app',
    'templates.common',
    'options',
    'delete'
]);

angular.module('app').config(['$routeProvider', '$locationProvider', '$translateProvider',

    function($routeProvider, $locationProvider, $translateProvider) {
        $locationProvider.html5Mode(false);
        $routeProvider.otherwise({
            redirectTo: '/customersatisfaction'
        });
        $translateProvider.translations('de', {
            '_': '',
            '_first': 'Anfang',
            '_highcharts.test.title': 'GreyLogix Mitarbeiter',
            '_highcharts.test.employees': 'Mitarbeiter',
            '_language': 'Sprache',
            '_last': 'Ende',
            '_logout': 'Abmelden',
            '_next': 'Weiter',
            '_no': 'Nein',
            '_number': 'Anzahl',
            '_pageSize': 'Elemente pro Seite',
            '_previous': 'Zurück',
            '_timekeeping': 'Arbeitszeiterfassung',
            '_users.costcenter': 'Kostenstelle',
            '_users.division': 'Standort',
            '_users.eMail': 'E-Mail',
            '_users.firstname': 'Vorname',
            '_users.iId': 'Kürzel',
            '_users.lastname': 'Nachname',
            '_users.mobilePhone': 'Handy',
            '_users.name': 'Name',
            '_users.phoneExtension': 'Durchwahl',
            '_users.roomNr': 'Raumnummer',
            '_users.user': 'Benutzer',
            '_yes': 'Ja',
            '_options': 'Einstellungen',
            '_delete.datarecord': 'Möchten sie den folgenden Datensatz wirklich löschen? ',
            '_data.delete': 'Daten Löschen',
            '_attention': 'Achtung !',
            '_note': 'Kommentar',
            '_date': 'Datum',
            '_days': 'Tage',
            '_date.otherdate': 'anderes Datum als heute?',
            '_back': 'Zurück',
            '_value': 'Wert',
            '_search': 'suche',
            '_delete': 'löschen',
            '_attribute': 'Attribut',
            '_views': 'Ansichten',
            '_succesfully.saved': 'Daten erfolgreich gespeichert',
            '_note.input.help': 'Bemerkung ?',
            '_customer.satisfaction': 'Kundenzufriedenheit',
            '_data.input': 'Dateneingabe',
            '_customer.name': 'Kundenname',
            '_projectnumber': 'Projektnummer',
            '_customer.name.input': 'Bitte Kundennamen eingeben',
            '_customer.satisfaction.input': 'Zahl zwischen 1 und 5 eingeben (1: sehr unzufrieden, 2: unzufrieden, 3: ok, 4: zufrieden, 5:sehr zufrieden)',
            '_customer.profjectnumber.input': 'Projektnummer des Projektes eingeben',
            '_customer.veryDissatisfied': 'sehr unzufrieden',
            '_customer.dissatisfied': 'unzufrieden',
            '_customer.ok': 'ok',
            '_customer.satisfied': 'zufrieden',
            '_customer.verySatisfied': 'sehr zufrieden',
            '_customer.number.ask.customers': 'Anzahl gefragter Kunden: ',
            '_customer.title': 'Kundenzufriedenheit',
            '_workingstepmistake': 'Fehler pro Arbeitsschritt',
            '_workingstepmistake.logistics': 'Logistik',
            '_workingstepmistake.logistics.input.help': 'Bitte Anzahl der Fehler in der Logistik eingeben',
            '_workingstepmistake.mechanicalconstruction': 'Mechanischer Aufbau',
            '_workingstepmistake.mechanicalconstruction.input.help': 'Bitte Anzahl der Fehler in dem Mechanischen Aufbau eingeben',
            '_workingstepmistake.assembly': 'Montage',
            '_workingstepmistake.assembly.input.help': 'Bitte Anzahl der Fehler in der Montage eingeben',
            '_workingstepmistake.finalassembly': 'Endmontage',
            '_workingstepmistake.finalassembly.input.help': 'Bitte Anzahl der Fehler in der Endmontage eingeben',
            '_workingstepmistake.check': 'Prüfen',
            '_workingstepmistake.check.input.help': 'Bitte Anzahl der Fehler bei der Prüfung eingeben',
            '_workingstepmistake.rework': 'Nacharbeit',
            '_workingstepmistake.rework.input.help': 'Bitte Anzahl der Fehler in der Nacharbeit eingeben',
            '_remainingPoints': 'Restpunkte',
            '_remainingPoints.construction': 'Konstruktion',
            '_remainingPoints.production': 'Produktion',
            '_remainingPoints.byDelivery': 'Bei Auslieferung',
            '_remainingPoints.construction.input.help': 'Bitte Konstruktion Wert eingeben',
            '_remainingPoints.production.input.help': 'Bitte Produktion Wert eingeben',
            '_remainingPoints.byDelivery.input.help': 'Bitte "Bei Auslieferung" Wert eingeben',
            '_remainingPoints.mistakes.per.cabinet': 'Fehler pro Schrank',
            '_month': 'Monat',
            '_year': 'Jahr',
            '_january': 'Januar',
            '_february': 'Februar',
            '_march': 'März',
            '_april': 'April',
            '_may': 'Mai',
            '_june': 'Juni',
            '_july': 'Junli',
            '_august': 'August',
            '_september': 'September',
            '_october': 'October',
            '_november': 'November',
            '_december': 'December',
            '_calendar.week': 'Kalenderwoche',
            '_data.already.existing.month': 'Daten für diesen Monat in dem Jahr schon vorhanden',
            '_data.already.existing.projectnumber': "Daten für diese Projektnummer sind schon vorhanden",
            '_data.already.existing.calendar.week': "Daten für diese Kalenderwoche sind schon vorhanden",
            '_wish.update.data': 'Möchten sie die Daten trotzdem ersetzen?',
            '_upstream.process.mistakes': 'Fehler vorgelagerter Prozess',
            '_upstream.process.mistakes.headline': 'Qualitätsgrad vorgelagerter Prozess / BU’s',
            '_upstream.process.mistakes.percent': 'Prozent %',
            '_upstream.process.mistakes.percent.input.help': 'Bitte Prozent wert zwischen 0 und 100 eingeben',
            '_upstream.process.mistakes.quality': 'Qualitätsgrad in %',
            '_upstream.process.mistakes.actual': 'IST %',
            '_upstream.process.mistakes.target': 'Soll %',
            '_portfolio': 'Bestand',
            '_portfolio.title': 'Anzahl Schaltschränke in der Produktion',
            '_portfolio.input.help': 'Bitte den Wert für den Bestand eingeben',
            '_labour.productivity': 'Arbeitsproduktivität',
            '_labour.productivity.avg.employee': 'Durchschnittliche Mitarbeiter Anzahl',
            '_labour.productivity.avg.employee.input.help': 'Bitte den Wert für die Durchschnittliche Mitarbeiter Anzahl eingeben',
            '_labour.productivity.completed.cabinets': 'Fertig gestellte Schränke',
            '_labour.productivity.completed.cabinets.input.help': 'BtranslateProvideritte die Anzahl der fertig gestellte Schränke dieses Jahres eingeben',
            '_labour.productivity.yAxis.title': 'Schaltschränke pro Mitarbeiter',
            '_scrapped.material': 'Ausschuss Material',
            '_scrapped.material.cost': 'Kosten €',
            '_scrapped.material.cost.input.help': 'bitte den Wert für die Kosten eingeben ',
            '_delivery.reliability.logistics': 'Liefertreue Logistik',
            '_delivery.reliability.logistics.number.commissioning.trolleys': 'Anzahl Kommissionierwagen',
            '_delivery.reliability.logistics.number.commissioning.trolleys.input.help': 'Bitte die absolute Anzahl Kommissionierwagen eingeben',
            '_delivery.reliability.logistics.number.incomplete.commissioning.trolleys': 'Anzahl vollständige Kommissionierwagen',
            '_delivery.reliability.logistics.number.incomplete.commissioning.trolleys.input.help': 'Bitte die prozentuale Anzahl der vollständigen Kommissionierwagen eingeben',
            '_delivery.reliability.logistics.deviation.in.days': 'Abweichung in Tagen',
            '_delivery.reliability.logistics.deviation.in.days.input.help': 'Bitte Wert für die Abweichung in Tagen eingeben',
            '_delivery.reliability.logistics.title': 'Anzahl Kommissionierungen',
            '_capacity': 'Auslastung',
            '_capacity.title': 'Auslastung in der Produktion',
            '_capacity.percent': 'Auslastung in Prozent',
            '_capacity.percent.input.help': 'Bitte den Wert für die Auslastung in Prozent eingeben(50%-150%)',
            '_ideas.process.improvements': 'Ideen Prozessverbesserung',
            '_ideas.process.improvements.number.ideas': 'Anzahl Ideen',
            '_ideas.process.improvements.ideas.overall': 'Ideen Gesamt',
            '_ideas.process.improvements.ideas.overall.input.help': 'Bitte die gesamte Anzahl der Ideen eingeben',
            '_ideas.process.improvements.implemented.ideas': 'Umgesetzte Ideen',
            '_ideas.process.improvements.implemented.ideas.input.help': 'Bitte die Anzahl der umgesetzten Ideen eingeben',
            '_processing.time': 'Durchlaufzeit',
            '_processing.time.title': 'Durchlaufzeiten',
            '_processing.time.ready.for.inspection': 'Prüfbereit',
            '_processing.time.ready.for.inspection.input.help': 'Bitte Prüfbereit Wert eingeben',
            '_processing.time.remaining.points.finished': 'Restpunkte erledigt',
            '_processing.time.remaining.points.finished.input.help': 'Bitte Restpunkte erledigt Wert eingeben',
            '_processing.time.delivered': 'Ausgeliefert',
            '_processing.time.delivered.input.help': 'Bitte Ausgeliefert Wert eingeben',
            '_presentation.interval': 'Präsentations intervall',
            '_presentation.interval.input.help': 'Bitte die Zeit in Sekunden für den Presentations Intervall eingeben',
            '_send.option.to.server': 'Zum Server schicken',
            '_send.option.to.server.input.help': 'Sendet die Optionen zum Server',
            '_get.server.updates': 'optionen updates vom Server erhalten',
            '_options.updates': 'Optionen updates',
            '_options.send.to.server': 'Optionen zum Server senden',
            '_succesfully.changed.in': 'Erfolgreich geändert auf',
            '_succesfully.send': 'Erfolgreich gesendet',
            '_seconds': " sekunden",
            '_admin.password': 'Admin Passwort',
            '_admin.password.new': 'neues Admin Passwort',
            '_admin.password.new.info': 'Ein neues admin Passwort erstellen',
            '_admin.password.repeat': 'Admin Passwort wiederholen',
            '_admin.password.old': 'Altes Admin Passwort',
            '_admin.password.enter': 'Bitte Admin Passwort eingeben',
            '_number.produced.cabinets': 'Anzahl gefertigte Schaltschränke',
            '_number.produced.cabinets.actual': 'Anzahl gefertigte Schaltschränke Ist',
            '_number.produced.cabinets.actual.input.help': 'Bitte die gesamte Anzahl der gefertigten Schaltschränke für dieses Jahr eingeben',
            '_number.produced.cabinets.target': 'Anzahl gefertigte Schaltschränke Soll',
            '_number.produced.cabinets.target.input.help': 'Bitte die zu erreichende Anzahl gefertigter Schaltschränke für das Jahr eingeben. Dieser Wert kann nur 1 mal pro Jahr eingeben werden!',
            '_delivery.reliability.upstream.construction': 'Liefertreue vorgelagerte Konstruktion',
            '_delivery.reliability.upstream.construction.deviation.in.days': 'Abweichung in Tagen',
            '_delivery.reliability.upstream.construction.deviation.in.days.input.help': 'Bitte die Abweichung in Tagen eingeben',
            '_under.target': 'Unter Soll',
            '_in.target': 'Im Soll',
            '_over.target': 'Über Soll',
            '_actual': 'Ist',
            '_target': 'Soll',
            '_actual.last': 'Ist letzen',
            '_target.for': 'Soll für',
            '_months': 'Monate',
            '_aspiration': 'Angestrebtes Ziel',
            '_yearly.average.target': 'Jahresdurchschnitt Soll',
            '_yearly.average.actual': 'Jahresdurchschnitt Ist',
            '_average.value.calendar.year': 'Durchschnittswert<br>des Kalenderjahres',
            '_average.cost': 'Kostendurchschnitt',
            '_target.delivered': 'Ausgeliefert Soll',
            '_target.remainingpoints.done': 'Restpunkte<br>erledigt',
            '_target.ready.for.inspection': 'Prüfbereit Soll',
            '_target.value': 'Sollwert',
            '_target.deviation.range': 'Soll Abweichungsbereich',
            '_average': 'durchschnitt'
        });
        $translateProvider.translations('en', {
            '_': '',
            '_first': 'First',
            '_highcharts.test.title': 'GreyLogix Employees',
            '_highcharts.test.employees': 'Employees',
            '_language': 'Language',
            '_last': 'Last',
            '_logout': 'Logout',
            '_next': 'Next',
            '_no': 'No',
            '_number': 'number',
            '_pageSize': 'Page Size',
            '_previous': 'Previous',
            '_timekeeping': 'Timekeeping',
            '_users.costcenter': 'Costcenter',
            '_users.division': 'Division',
            '_users.eMail': 'E-Mail',
            '_users.firstname': 'Firstname',
            '_users.iId': 'Abbreviation',
            '_users.lastname': 'Lastname',
            '_users.mobilePhone': 'Mobile',
            '_users.name': 'Name',
            '_users.phoneExtension': 'Phone Extension',
            '_users.roomNr': 'Room Number',
            '_users.user': 'User',
            '_yes': 'Yes',
            '_options': 'options',
            '_delete.datarecord': 'Do you really wish to delete the following record? ',
            '_data.delete': 'delete data',
            '_attention': 'Attention !',
            '_note': 'note',
            '_date': 'date',
            '_days': 'days',
            '_date.otherdate': 'other date than today?',
            '_back': 'back',
            '_value': 'value',
            '_search': 'search',
            '_delete': 'delete',
            '_attribute': 'attribute',
            '_views': 'views',
            '_succesfully.saved': 'Data successfully stored ',
            '_note.input.help': 'something special',
            '_customer.satisfaction': 'customersatisfaction',
            '_data.input': 'Data input',
            '_customer.name': 'customer name',
            '_projectnumber': 'projectnumber',
            '_customer.name.input': 'enter the customer name',
            '_customer.satisfaction.input': 'enter number between 1 and 5 (1: very dissatisfied, 2: dissatisfied, 3: ok, 4: satisfied, 5:very satisfied)',
            '_customer.profjectnumber.input': 'enter projectnumber from the project',
            '_customer.veryDissatisfied': 'very dissatisfied',
            '_customer.dissatisfied': 'dissatisfied',
            '_customer.ok': 'ok',
            '_customer.satisfied': 'satisfied',
            '_customer.verySatisfied': 'very satisfied',
            '_customer.number.ask.customers': 'number of customer demand: ',
            '_customer.title': 'customer satisfaction',
            '_workingstepmistake': 'workingstepmistake',
            '_workingstepmistake.logistics': 'logistics',
            '_workingstepmistake.logistics.input.help': 'please enter number of mistakes',
            '_workingstepmistake.mechanicalconstruction': 'mechanicalconstruction',
            '_workingstepmistake.mechanicalconstruction.input.help': 'please enter number of mistakes',
            '_workingstepmistake.assembly': 'assembly',
            '_workingstepmistake.assembly.input.help': 'please enter number of mistakes',
            '_workingstepmistake.finalassembly': 'finalassembly',
            '_workingstepmistake.finalassembly.input.help': 'please enter number of mistakes',
            '_workingstepmistake.check': 'check',
            '_workingstepmistake.check.input.help': 'please enter number of mistakes',
            '_workingstepmistake.rework': 'rework',
            '_workingstepmistake.rework.input.help': 'please enter number of mistakes',
            '_remainingPoints': 'remaining points',
            '_remainingPoints.construction': 'construction',
            '_remainingPoints.production': 'production',
            '_remainingPoints.byDelivery': 'by delivery',
            '_remainingPoints.construction.input.help': 'please enter construction value',
            '_remainingPoints.production.input.help': 'please enter production value',
            '_remainingPoints.byDelivery.input.help': 'please enter byDelivery value',
            '_remainingPoints.mistakes.per.cabinet': 'mistakes per catranslateProviderbinet',
            '_month': 'month',
            '_year': 'year',
            '_january': 'january',
            '_february': 'february',
            '_march': 'march',
            '_april': 'april',
            '_may': 'may',
            '_june': 'june',
            '_july': 'july',
            '_august': 'august',
            '_september': 'september',
            '_october': 'october',
            '_november': 'november',
            '_december': 'december',
            '_calendar.week': 'calendar week',
            '_data.already.existing.month': 'data already existing for this month in the year',
            '_data.already.existing.projectnumber': "data already existing for this projectnumber",
            '_data.already.existing.calendar.week': "data already existing for this calendar week",
            '_wish.update.data': "Do you wish to replace the data?",
            '_upstream.process.mistakes': 'upstream process mistakes',
            '_upstream.process.mistakes.headline': 'upstream process / BU´s mistakes',
            '_upstream.process.mistakes.percent': 'percent %',
            '_upstream.process.mistakes.percent.input.help': 'please enter the percentage value between 0 and 100',
            '_upstream.process.mistakes.quality': 'quality %',
            '_upstream.process.mistakes.actual': 'actual %',
            '_upstream.process.mistakes.target': 'target %',
            '_portfolio': 'portfolio',
            '_portfolio.title': 'number of switch cabinets in production',
            '_portfolio.input.help': 'please enter the value for the portfolio',
            '_labour.productivity': 'labour productivity',
            '_labour.productivity.avg.employee': 'Average number of employees',
            '_labour.productivity.avg.employee.input.help': 'please enter the average number of employees',
            '_labour.productivity.completed.cabinets': 'completed cabinets',
            '_labour.productivity.completed.cabinets.input.help': 'please enter the number of completed cabinets of the year',
            '_labour.productivity.yAxis.title': 'switch cabinets per employee',
            '_scrapped.material': 'scrapped material',
            '_scrapped.material.cost': 'cost €',
            '_scrapped.material.cost.input.help': 'please enter the value for the cost',
            '_delivery.reliability.logistics': 'delivery reliability logistics ',
            '_delivery.reliability.logistics.number.commissioning.trolleys': 'number commissioning trolleys',
            '_delivery.reliability.logistics.number.commissioning.trolleys.input.help': 'please enter the absolute number of commissioning trolleys',
            '_delivery.reliability.logistics.number.incomplete.commissioning.trolleys': 'number complete commissioning trolleys',
            '_delivery.reliability.logistics.number.incomplete.commissioning.trolleys.input.help': 'please enter the procentual number of completed commissioning trolleys',
            '_delivery.reliability.logistics.deviation.in.days': 'deviation in days',
            '_delivery.reliability.logistics.deviation.in.days.input.help': 'please enter value for deviation in days',
            '_delivery.reliability.logistics.title': 'number commissionings',
            '_capacity': 'capacity',
            '_capacity.title': 'capacity in the production',
            '_capacity.percent': 'percentage capacity',
            '_capacity.percent.input.help': 'please enter the value for the percentage capacity(50%-150%)',
            '_ideas.process.improvements': 'ideas process improvements',
            '_ideas.process.improvements.number.ideas': 'number of ideas',
            '_ideas.process.improvements.ideas.overall': 'Ideas overall',
            '_ideas.process.improvements.ideas.overall.input.help': 'please enter the number of all ideas ',
            '_ideas.process.improvements.implemented.ideas': 'implemented ideas',
            '_ideas.process.improvements.implemented.ideas.input.help': 'please enter the number of the implemented ideas',
            '_processing.time': 'processing time',
            '_processing.time.title': 'processingtimes',
            '_processing.time.ready.for.inspection': 'ready for inspection',
            '_processing.time.ready.for.inspection.input.help': 'please enter ready for inspection value',
            '_processing.time.remaining.points.finished': 'remaining points finished',
            '_processing.time.remaining.points.finished.input.help': 'please enter remaining points finished value',
            '_processing.time.delivered': 'delivered',
            '_processing.time.delivered.input.help': 'please enter delivered value',
            '_presentation.interval': 'presentation interval',
            '_presentation.interval.input.help': 'please enter time in seconds for the interval',
            '_send.option.to.server': 'Send to Server',
            '_send.option.to.server.input.help': 'sends the options to the server',
            '_get.server.updates': 'get option updates from the server',
            '_options.updates': 'options updates',
            '_options.send.to.server': 'sending options to server',
            '_succesfully.changed.in': 'succesfully changed in',
            '_succesfully.send': 'succesfully send',
            '_seconds': " seconds",
            '_admin.password': 'admin password',
            '_admin.password.new': 'new admin password',
            '_admin.password.new.info': 'create new admin password',
            '_admin.password.repeat': 'admin password repeat',
            '_admin.password.old': 'old admin password',
            '_admin.password.enter': 'please enter admin password',
            '_number.produced.cabinets': 'number produced cabinets',
            '_number.produced.cabinets.actual': 'actual number produced cabinets',
            '_number.produced.cabinets.actual.input.help': 'please enter the total number of produced cabinets for this year',
            '_number.produced.cabinets.target': 'target number produced cabinets',
            '_number.produced.cabinets.target.input.help': 'please enter the number to be reached produeced cabinets for the year. This value can only be enter one time in a year',
            '_delivery.reliability.upstream.construction': 'delivery reliability upstream construction',
            '_delivery.reliability.upstream.construction.deviation.in.days': 'deviation in days',
            '_delivery.reliability.upstream.construction.deviation.in.days.input.help': 'please enter the deviation in days',
            '_under.target': 'under target',
            '_in.target': 'in target',
            '_over.target': 'over target',
            '_actual': 'actual',
            '_target': 'target',
            '_actual.last': 'actual last',
            '_target.for': 'target for',
            '_months': 'months',
            '_aspiration': 'aspiration',
            '_yearly.average.target': 'target yearly average',
            '_yearly.average.actual': 'actual yearly average',
            '_average.value.calendar.year': 'average of the<br>calendar year ',
            '_average.cost': 'average cost',
            '_target.delivered': 'target delivered',
            '_target.remainingpoints.done': 'target remainingpoints<br>done',
            '_target.ready.for.inspection': 'target ready<br>for inspection',
            '_target.value': 'target value',
            '_target.deviation.range': 'target deviation range',
            '_average': 'average'
        });
        $translateProvider.preferredLanguage('de');
        $translateProvider.useCookieStorage();
    }
]);

angular.module('app').controller('AppCtrl', [
    'Console',
    '$translate',
    '$rootScope',
    '$cookieStore',
    '$location',
    '$timeout',
    '$scope',
    '$http',
    '$filter',
    function(
        Console,
        $translate,
        $rootScope,
        $cookieStore,
        $location,
        $timeout,
        $scope,
        $http,
        $filter
    ) {
        Console.group("AppController entered");
        //The value for the Login Modal Loginbutton
        $scope.loginButtonValue = "Login";
        //The Text for the nav login field
        $scope.loginText = "Login";
        //state if the admin is logged in
        $scope.loginstate = false;
        //init the adminpassword
        $scope.data = {
            adminPassword: ""
        };
        //status text for login modal
        $scope.loginstatus = "";
        //css class value for nav-login
        $scope.navLogin = "";
        //init the index for the routchange Array operatingNumbersOptions
        $rootScope.index = 0;
        clearInterval($scope.interval);
        //init startButton
        $rootScope.startButton = "";
        $rootScope.locale = $cookieStore.get("sirius.locale");
        //init interval with 20 seconds
        $rootScope.intervalTime = 20000;
        //set options update from server to true
        $rootScope.optionsUpdates = {
            value: true
        };


        //The path to the correct smiley picture
        $rootScope.smileyPicturePath = "/assets/img/smileyYellow.svg";

        $scope.focusInput = false;
        //init the routes and active state
        $rootScope.operatingNumbersOptions = [{
            route: "/remainingPoints",
            active: true
        }, {
            route: "/workingstepmistakes",
            active: true
        }, {
            route: "/upstreamprocessmistakes",
            active: true
        }, {
            route: "/portfolio",
            active: true
        }, {
            route: "/labourproductivity",
            active: true
        }, {
            route: "/scrappedmaterial",
            active: true
        }, {
            route: "/deliveryreliabilitylogistics",
            active: true
        }, {
            route: "/processingtime",
            active: true
        }, {
            route: "/capacity",
            active: true
        }, {
            route: "/ideasprocessimprovements",
            active: true
        }, {
            route: "/customersatisfaction",
            active: true
        }, {
            route: "/numberproducedcabinets",
            active: true
        }, {
            route: "/deliveryreliabilityupstreamconstruction",
            active: true
        }];
        //by loading checking if there is a valid cookie
        $http({
            method: "GET",
            url: '/security/'
        }).
        success(function(data) {
            if (!data.error) {
                console.debug("data", data);
                if (data.pwcheck) {
                    //auth cookie is valid
                    $scope.setNavLoginTrue();
                } else {
                    //auth cookie is not valid
                    $scope.setNavLoginFalse();
                }
            }
        });
        //sets the smileyvalue
        $rootScope.setSmileyValue = function(value) {

            if (value > 0 || value < 4) {
                switch (value) {
                    case 1:
                        $rootScope.smileyPicturePath = "/assets/img/smileyGreen.svg";
                        break;
                    case 2:
                        $rootScope.smileyPicturePath = "/assets/img/smileyYellow.svg";
                        break;
                    case 3:
                        $rootScope.smileyPicturePath = "/assets/img/smileyRed.svg";
                        break;
                    default:
                        $rootScope.smileyPicturePath = "/assets/img/smileyYellow.svg";
                }
            }
        };
        //if the auth Cookie is valid. Admin is logged in
        $scope.setNavLoginTrue = function() {
            $scope.loginText = "admin";
            $scope.loginButtonValue = "Logout";
            $scope.loginstate = true;
        };

        // if the auth Cookie is not valid. User have to log in
        $scope.setNavLoginFalse = function() {
            $scope.loginText = "login";
            $scope.loginButtonValue = "Login";
            $scope.loginstate = false;
        };

        //checks if there is one route true. So there is no endless loop
        $scope.checkIfOneTrue = function() {
            for (var i = 0; i < $rootScope.operatingNumbersOptions.length; i++) {
                if ($rootScope.operatingNumbersOptions[i].active) {
                    return true;
                }
            }
            console.debug("there is no one true");
            return false;
        };

        //sets the index for the Routechange.
        $rootScope.setOperatingNumberOptionIndex = function(index) {
            //console.debug("setting rootscope index to: " + index)
            $rootScope.index = index;
        };

        //change Lang
        $scope.changeLang = function(key) {
            $cookieStore.put("glx_operating_numbers.locale", key);
            $rootScope.locale = key;
            $rootScope.$broadcast("event:changeLang");
            $translate.uses(key);
            $("#login_dropdown_box").removeClass("open");
        };

        $scope.changeLang("de");

        // generate the Options Object
        $rootScope.makeOptionsObject = function() {
            var optionsObject = {
                "remainingpoints": $rootScope.operatingNumbersOptions[0].active,
                "workingstepmistakes": $rootScope.operatingNumbersOptions[1].active,
                "upstreamprocessmistakes": $rootScope.operatingNumbersOptions[2].active,
                "portfolio": $rootScope.operatingNumbersOptions[3].active,
                "labourproductivity": $rootScope.operatingNumbersOptions[4].active,
                "scrappedmaterial": $rootScope.operatingNumbersOptions[5].active,
                "deliveryreliabilitylogistics": $rootScope.operatingNumbersOptions[6].active,
                "processingtime": $rootScope.operatingNumbersOptions[7].active,
                "capacity": $rootScope.operatingNumbersOptions[8].active,
                "ideasprocessimprovements": $rootScope.operatingNumbersOptions[9].active,
                "customersatisfaction": $rootScope.operatingNumbersOptions[10].active,
                "presentationinterval": $rootScope.intervalTime,
                "numberproducedcabinets": $rootScope.operatingNumbersOptions[11].active,
                "deliveryreliabilityupstreamconstruction": $rootScope.operatingNumbersOptions[12].active
            };
            return optionsObject;
        };

        //get the Options from the server and map them to the locale options
        $rootScope.getOptionsFromServer = function() {
            $http({
                method: "GET",
                url: '/options/'
            }).
            success(function(data) { 
                  
                if (!data.error) {
                    Console.debug("data", data);
                    $rootScope.operatingNumbersOptions[0].active = data.options[0].remainingpoints;
                    $rootScope.operatingNumbersOptions[1].active = data.options[0].workingstepmistakes;
                    $rootScope.operatingNumbersOptions[2].active = data.options[0].upstreamprocessmistakes;
                    $rootScope.operatingNumbersOptions[3].active = data.options[0].portfolio;
                    $rootScope.operatingNumbersOptions[4].active = data.options[0].labourproductivity;
                    $rootScope.operatingNumbersOptions[5].active = data.options[0].scrappedmaterial;
                    $rootScope.operatingNumbersOptions[6].active = data.options[0].deliveryreliabilitylogistics;
                    $rootScope.operatingNumbersOptions[7].active = data.options[0].processingtime;
                    $rootScope.operatingNumbersOptions[8].active = data.options[0].capacity;
                    $rootScope.operatingNumbersOptions[9].active = data.options[0].ideasprocessimprovements;
                    $rootScope.operatingNumbersOptions[10].active = data.options[0].customersatisfaction;
                    $rootScope.operatingNumbersOptions[11].active = data.options[0].numberproducedcabinets;
                    $rootScope.operatingNumbersOptions[12].active = data.options[0].deliveryreliabilityupstreamconstruction;
                    if ($rootScope.intervalTime !== data.options[0].presentationinterval) {
                        $rootScope.intervalTime = data.options[0].presentationinterval;
                        $rootScope.endRouteChange();
                        $rootScope.startRouteChange();
                    } else {
                        $rootScope.intervalTime = data.options[0].presentationinterval;
                    } 

                }
            });
        };

        //send the Options to the server.
        // method POST will try to save a record when no datarecord exists.
        // methods PUT will update a data record
        $rootScope.sendOptionsToServer = function(method) {
            Console.debug("Sending Options to Server");
            $http({
                url: '/options/',
                method: method,
                data: $rootScope.makeOptionsObject()
            }).success(function(data, status, headers, config) {
                console.debug("data", data);
            }).error(function(data, status, headers, config) {
                Console.debug(status);
                Console.debug(data);
                switch (status) {
                    //data not modified
                    case 304:
                        //console.debug("data not modified")
                        break;
                        //updating data failed
                    case 305:
                        Console.debug("data: ", data, "status: ", status);
                        Console.debug("updating data failed: No Document found, or more than one found");
                        break;
                    default:
                        Console.debug("data: ", data, "status: ", status);
                }
            });
        };

        $rootScope.getClass = function(path) {
            if ($location.path().substr(0, path.length) === path) {
                return "active";
            } else {
                return "";
            }
        };

        //init the route change for the Präsentation
        $rootScope.startRouteChange = function() {
            // console.log("starting rout changes");
            $rootScope.startButton = "active";
            $rootScope.changeRoute();
        };

        // the logic for the routchangediashow
        $rootScope.changeRoute = function() {
            if ($scope.interval) {
                clearInterval($scope.interval);
            }
            $scope.interval = setInterval(function() {
                $scope.$apply(function() {
                    //Try only when one route is active. so there is no endless loop
                    if ($scope.checkIfOneTrue()) {
                        if ($rootScope.index >= $rootScope.operatingNumbersOptions.length) {
                            $rootScope.index = 0;
                            if ($rootScope.optionsUpdates.value) {
                                $rootScope.getOptionsFromServer();
                            }
                        }
                        for (; !$rootScope.operatingNumbersOptions[$rootScope.index].active;) {
                            if ($rootScope.index >= ($rootScope.operatingNumbersOptions.length - 1)) {
                                $rootScope.index = 0;
                                if ($rootScope.optionsUpdates.value) {
                                    $rootScope.getOptionsFromServer();
                                }
                            } else {
                                $rootScope.index++;
                            }
                        }
                        $location.path($rootScope.operatingNumbersOptions[$rootScope.index].route);
                        $rootScope.index++;
                    }
                });
            }, $rootScope.intervalTime);
        };

        // clears the intervall for the route change
        $rootScope.endRouteChange = function() {
            clearInterval($scope.interval);
            $rootScope.startButton = "";
            //   console.log("ending Rout change");
        };

        // trys to login with the admin password
        $rootScope.login = function(pw) {
            if ($scope.loginstate) {
                //logout if the user is already logged in
                setCookie("auth", "", -1);
                //console.debug("try to close modeal");
                $('#loginModal').modal('hide');
                $scope.setNavLoginFalse();
            } else {
                //clears the adminPassword
                $scope.data.adminPassword = "";
                //console.debug("pw", pw);
                var getObject = {
                    actualPassword: pw
                };
                $http({
                    method: "POST",
                    url: '/security/',
                    data: getObject
                }).
                success(function(data) {
                    //pwcheck is true when no admin password is set or the admin password was correct.
                    if (data.pwcheck) {
                        //if there is a admin password, the cookie is not empty
                        if (data.cookie) {
                            //Console.debug("Cookie was not empty");
                            setCookie("auth", data.cookie, 7);
                            $scope.loginstatus = "Sucessfully login!";
                            $scope.setNavLoginTrue();
                            $timeout(function() {
                                $scope.loginstatus = "";
                                $('#loginModal').modal('hide');
                            }, 1000);
                        } else {
                            //Console.debug("Cookie was empty");
                            $scope.loginstatus = "there is no admin password! please create one";
                            $timeout(function() {
                                $scope.loginstatus = "";
                            }, 5000);
                        }
                    } else {
                        //Console.debug("Password was not correct")
                        $scope.loginstatus = "password was not correct";
                        $timeout(function() {
                            $scope.loginstatus = "";
                        }, 5000);
                    }
                });
            }
        };
        $(document).ready(function() {
            $('loginbuttonid').keypress(function(e) {
                if (e.keyCode === 13) {
                    console.debug("enter");
                }
            });
        });

        //set a cookie

        function setCookie(c_name, value, exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
            document.cookie = c_name + "=" + c_value;
        }

        //starts automatically the presentation
        $rootScope.startRouteChange();
        //sends the options to the server. the server will accept them only when there are no Datarecord with option.
        $rootScope.sendOptionsToServer('POST');
        $rootScope.getOptionsFromServer();


        // Highcharts Theme init
        Highcharts.theme = {

            exporting: {
                enabled: false
            },
            colors: ['#B10024',
                '#EE8D00',
                '#FFE400',
                '#008AD9',
                '#C9D200',
                '#4B0459',
                '#002043',
                '#204333'
            ],
            title: {
                style: {
                    fontFamily: '\'Lato\', sans-serif',
                    lineHeight: '26px',
                    fontSize: '35px'
                }
            },
            subtitle: {
                style: {
                    color: '#666666',
                    fontFamily: 'bold 12px "Trebuchet MS", Verdana, sans-serif',
                    fontSize: '15px'
                }
            },
            xAxis: {
                labels: {
                    y: 25,
                    style: {
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: '23px',
                        fontFamily: '25px Arial'
                    }
                },
                title: {
                    style: {
                        color: '#008AD9',
                        fontWeight: 'bold',
                        fontSize: '27px',
                        fontFamily: 'Arial'
                    }
                }
            },
            yAxis: {
                labels: {
                    style: {
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: '23px',
                        fontFamily: '25px Arial'
                    }
                },
                title: {
                    style: {
                        color: '#008AD9',
                        fontWeight: 'bold',
                        fontSize: '27px',
                        fontFamily: 'Arial'
                    }
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontFamily: '\'Lato\', sans-serif',
                            fontSize: '22px'
                        }
                    },
                    enableMouseTracking: false
                },
                series: {
                    lineWidth: 4
                }
            }
        };

        // Apply the theme
        var highchartsOptions = Highcharts.setOptions(Highcharts.theme);

        Console.groupEnd(); // .controller
    }
]);
