Router.configure({
   layoutTemplate: 'layout',
   loadingTemplate: 'loading',
   waitOn: function() {
	   return [Meteor.subscribe('goals'), Meteor.subscribe('triumphs')];
   }
});

Router.map(function() {
   this.route('goalBrowse', {path: '/'});
   
   this.route('goalPage', {
	   //routes a user to a specified goal page
	   path: '/goal/:_id',
	   data: function() { return Goals.findOne(this.params._id);}
   });
   
   this.route('goalSubmit', {
	   path:'/submit',
   });
   
   this.route('testPage', {path:'/test'});
   
   this.route('goalPersonal', {path:'/mylist'});

   this.route('goalSearch', {
	   //performs a query for a goal based on the name
	   path: '/search?',
	   data: function() {
		   console.log(this.params);
		   var params = this.params.summary;
		   if (params) {
			   var templateData = { goals : Goals.find({ summary : params })};
			   return templateData;
		   } else {
			   return;
		   };
	   }
   });

});

var IR_Filters = {
	    // All standard subscriptions you need before anything works
	    // the .wait() makes sure that it continues only if the subscription
	    // is ready and the data available
	    // Use: global
	    baseSubscriptions: function() {
	        this.subscribe('userData').wait();
	    },
	    // show login if a guest wants to access private areas
	    // Use: {only: [privateAreas] }
	    requireLogin: function (pause) {
	    	if (Meteor.loggingIn()) { //still logging in
	    		pause();
	    	}
	    	if (!Meteor.user()) {  //not logged in
	    	   this.render('accessDenied');
	    	   pause();
	    	} else { //logged in, life is good
	    	   console.log("requireLogin: logged in");
	    	}
	    },
	    // make sure to scroll to the top of the page on a new route
	    // Use: global
	    scrollUp: function() {
	        $('body,html').scrollTop(0);
	    },
	    // if this route depends on data, show the NProgess loading indicator
	    // http://ricostacruz.com/nprogress/
	    // Use: global
	    startNProgress: function() {
	        if (_.isFunction(this.data)) {
	          NProgress.start();
	        }
	    },
	    // tell google analytics that a page was viewed
	    // e.g. https://github.com/datariot/meteor-ganalytics
	    // Use: global
	    pageview: function() {
	        GAnalytics.pageview(this.path);
	    },
	    // only show route if you are an admin
	    // using https://github.com/alanning/meteor-roles
	    // Use: {only: [adminAreas]}
	    isAdmin: function(pause) {
	        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
	          this.render('login');
	          pause();
	        }
	    },
	    // animate old content out using
	    // http://daneden.github.io/animate.css/
	    // Use: global
	    animateContentOut: function() {
	        $('#content').removeClass("animated fadeIn fadeInRight");
	        $('footer').addClass("hide");
	    }
	};

Router.onBeforeAction(IR_Filters.requireLogin, {only:'goalSubmit'});